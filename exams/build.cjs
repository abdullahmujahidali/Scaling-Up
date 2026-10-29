#!/usr/bin/env node
/* build.js — generates exam-NN.html pages from questions/exam-NN.json.
   The HTML shell is identical for every exam (it is just a host for the engine),
   so it lives here once rather than being copy-pasted into 15 files.

   Run:  node exams/build.cjs  (or npm run exams)
   Also validates each question bank and refuses to emit a broken exam. */

const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const QDIR = path.join(DIR, 'questions');

// Per-certification labels. `meta.cert` selects one; DVA stays the default so
// the 15 existing DVA exams keep building unchanged with no edits to their JSON.
const CERTS = {
  dva: {
    code: 'DVA-C02', name: 'AWS Certified Developer – Associate (DVA-C02)', pass: 720,
    domains: { 1: 'Development with AWS Services', 2: 'Security', 3: 'Deployment', 4: 'Troubleshooting & Optimization' },
    weights: { 1: 32, 2: 26, 3: 24, 4: 18 },
  },
  clf: {
    code: 'CLF-C02', name: 'AWS Certified Cloud Practitioner (CLF-C02)', pass: 700,
    domains: { 1: 'Cloud Concepts', 2: 'Security & Compliance', 3: 'Cloud Technology & Services', 4: 'Billing, Pricing & Support' },
    weights: { 1: 24, 2: 30, 3: 34, 4: 12 },
  },
  aif: {
    code: 'AIF-C01', name: 'AWS Certified AI Practitioner (AIF-C01)', pass: 700,
    domains: { 1: 'Fundamentals of AI & ML', 2: 'Fundamentals of GenAI', 3: 'Applications of Foundation Models', 4: 'Guidelines for Responsible AI', 5: 'Security, Compliance & Governance' },
    weights: { 1: 20, 2: 24, 3: 28, 4: 14, 5: 14 },
  },
};

function page(meta, questions) {
  const cert = CERTS[meta.cert || 'dva'];
  if (!cert) throw new Error(`unknown cert "${meta.cert}" — expected one of ${Object.keys(CERTS)}`);
  // Scaled scores are not a linear % of raw score, so this is the rough guide
  // AWS candidates actually use: pass mark as a fraction of the questions.
  const toPass = Math.round(questions.length * (cert.pass / 1000));
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${cert.code} ${meta.title}</title>
<link rel="stylesheet" href="../assets/lesson.css?v=17">
<link rel="stylesheet" href="../assets/exam-runner.css?v=17">
</head>
<body>
<div class="exam-shell">

  <div id="exam-intro">
    <div class="exam-intro-card">
      <h1>${meta.title}</h1>
      <p class="sub">${cert.name} · ${meta.kind || 'full-length mock'}${meta.focus ? ' · ' + meta.focus : ''}</p>

      <div class="exam-facts">
        <div class="exam-fact"><b>${questions.length}</b><span>questions</span></div>
        <div class="exam-fact"><b>${meta.minutes}</b><span>minutes</span></div>
        <div class="exam-fact"><b>${cert.pass}</b><span>pass mark / 1000</span></div>
        <div class="exam-fact"><b>~${toPass}</b><span>correct to pass</span></div>
      </div>

      <p style="font-size:0.88rem;line-height:1.6;">
        <strong>Sit this like the real thing.</strong> Phone away, no notes, no pausing.
        The timer does not stop. You get no feedback until you submit — that is deliberate,
        because guessing under uncertainty is a skill the real exam tests.
      </p>
      <p style="font-size:0.88rem;line-height:1.6;">
        <strong>Never leave a question blank.</strong> There is no penalty for a wrong answer,
        so a guess is always better than nothing. Flag anything you're unsure of and come
        back to it. Aim for about <strong>2 minutes per question</strong>.
      </p>
      <p style="font-size:0.85rem;color:var(--muted);line-height:1.55;">
        Tip: keyboard shortcuts work — press <strong>1–5</strong> to pick an answer,
        <strong>←</strong> / <strong>→</strong> to move between questions.
        Your progress is saved automatically if you close the tab by accident.
      </p>

      <div style="margin-top:1.3rem;">
        <button class="btn-primary" id="start-btn">Start ${meta.noun || 'exam'}</button>
        <button class="btn-secondary" id="resume-btn" style="display:none;"></button>
        <a class="btn-secondary" href="../${meta.backTo || 'exams.html'}">${meta.backLabel || 'Back to all exams'}</a>
      </div>
    </div>
  </div>

  <div id="exam-live" style="display:none;">
    <div class="exam-bar">
      <div><span class="exam-timer" id="exam-timer">${meta.minutes}:00</span></div>
      <div class="meta">${meta.title}</div>
      <div class="meta" id="answered-count">0 / ${questions.length} answered</div>
    </div>

    <div id="exam-body"></div>

    <div class="exam-nav">
      <button class="btn-secondary" id="prev-btn">← Previous</button>
      <button class="btn-secondary" id="next-btn">Next →</button>
      <button class="btn-primary btn-submit" id="submit-btn">Submit ${meta.noun || 'exam'}</button>
    </div>

    <div class="palette-wrap">
      <h3>Question navigator — click any number to jump</h3>
      <div id="exam-palette"></div>
    </div>
  </div>

  <div id="exam-results" style="display:none;"></div>

</div>

<script>
var EXAM_META = ${JSON.stringify({
  id: meta.id, title: meta.title, minutes: meta.minutes,
  pass: cert.pass, domainNames: cert.domains, domainWeights: cert.weights,
  backTo: meta.backTo, backLabel: meta.backLabel,
})};
var QUESTIONS = ${JSON.stringify(questions, null, 1)};
</script>
<script src="../assets/exam-engine.js?v=17"></script>
<script src="../assets/i18n.js?v=17"></script>
</body>
</html>
`;
}

// Question-bank shape per certification. DVA mocks are full-length and must
// reproduce the real paper exactly; CLF/AIF quizzes are short revision sets, so
// they are checked proportionally against the real domain weightings instead.
// A bank may be a short revision quiz (20 q) or a full-length mock (65 q). The
// proportional check adapts: tolerance scales with length, so a 65-question mock
// is held to the same *shape* without demanding impossible exact counts.
const CLF_W = { 1: 0.24, 2: 0.30, 3: 0.34, 4: 0.12 };
const AIF_W = { 1: 0.20, 2: 0.24, 3: 0.28, 4: 0.14, 5: 0.14 };
const SHAPES = {
  dva: { total: 65, exact: { 1: 21, 2: 17, 3: 15, 4: 12 } },
  clf: { totals: [20, 65], tolerance: 1.5, weights: CLF_W },
  aif: { totals: [20, 65], tolerance: 1.5, weights: AIF_W },
};

function validate(file, qs, cert) {
  const shape = SHAPES[cert];
  if (!shape) throw new Error(`${file}: unknown cert "${cert}"`);
  const validDomains = Object.keys(shape.exact || shape.weights).map(Number);
  const errs = [];
  const ids = new Set();
  const byDomain = {};
  qs.forEach(q => {
    if (ids.has(q.id)) errs.push(`dup id ${q.id}`);
    ids.add(q.id);
    byDomain[q.domain] = (byDomain[q.domain] || 0) + 1;
    if (!q.scenario) errs.push(`q${q.id} no scenario`);
    if (!q.explain) errs.push(`q${q.id} no explanation`);
    // Matching questions legitimately have as few as 3 answer choices.
    const minOpts = (q.type === 'matching' || q.type === 'ordering') ? 3 : 4;
    if (!Array.isArray(q.options) || q.options.length < minOpts) errs.push(`q${q.id} needs >=${minOpts} options`);
    if (!Array.isArray(q.correct) || !q.correct.length) errs.push(`q${q.id} no correct answer`);
    (q.correct || []).forEach(c => {
      if (c < 0 || c >= (q.options || []).length) errs.push(`q${q.id} correct index ${c} out of range`);
    });
    // Ordering and matching are scored all-or-nothing by AWS, so a malformed
    // bank would silently make a question unanswerable. Check them strictly.
    const type = q.type || (q.multi ? 'multi' : 'single');
    if (!['single', 'multi', 'ordering', 'matching'].includes(type)) {
      errs.push(`q${q.id} unknown type "${type}"`);
    } else if (type === 'ordering') {
      if ((q.correct || []).length !== (q.options || []).length) {
        errs.push(`q${q.id} ordering: correct must list every option exactly once`);
      }
      if (new Set(q.correct || []).size !== (q.correct || []).length) {
        errs.push(`q${q.id} ordering: duplicate index in correct order`);
      }
    } else if (type === 'matching') {
      if (!Array.isArray(q.prompts) || q.prompts.length < 3) {
        errs.push(`q${q.id} matching needs >=3 prompts`);
      }
      if ((q.correct || []).length !== (q.prompts || []).length) {
        errs.push(`q${q.id} matching: one correct index required per prompt`);
      }
    } else if (type === 'multi' && (q.correct || []).length < 2) {
      errs.push(`q${q.id} multi needs >=2 correct`);
    } else if (type === 'single' && (q.correct || []).length !== 1) {
      errs.push(`q${q.id} single needs exactly 1 correct`);
    }
    if (new Set(q.options || []).size !== (q.options || []).length) errs.push(`q${q.id} duplicate option text`);
    if (!validDomains.includes(q.domain)) errs.push(`q${q.id} bad domain ${q.domain}`);
  });

  if (shape.exact) {
    // Full-length DVA mocks reproduce the real paper exactly: 65 questions
    // weighted 21/17/15/12. A drifting distribution would make scores stop
    // predicting exam day, so this stays a hard equality check.
    if (qs.length !== shape.total) errs.push(`expected ${shape.total} questions, found ${qs.length}`);
    Object.keys(shape.exact).forEach(d => {
      const got = byDomain[d] || 0;
      if (got !== shape.exact[d]) errs.push(`domain ${d}: expected ${shape.exact[d]}, found ${got}`);
    });
  } else {
    // Short revision quizzes cannot hit the real paper's exact counts, so the
    // rule is proportional instead: every domain must appear, and none may run
    // more than `tolerance` questions away from its share of the real weighting.
    if (!shape.totals.includes(qs.length)) {
      errs.push(`expected ${shape.totals.join(' or ')} questions, found ${qs.length}`);
    }
    // Scale the allowance with paper length: a 65-question mock is 3.25x a
    // quiz, so holding it to ±1.5 would be stricter than the real exam's own
    // rounding. The proportional shape is what matters, not exact counts.
    const tol = shape.tolerance * Math.max(1, qs.length / 20);
    validDomains.forEach(d => {
      const got = byDomain[d] || 0;
      const want = shape.weights[d] * qs.length;
      if (got === 0) errs.push(`domain ${d}: no questions (every domain must be represented)`);
      else if (Math.abs(got - want) > tol) {
        errs.push(`domain ${d}: ${got} questions, expected ~${want.toFixed(1)} (±${tol.toFixed(1)})`);
      }
    });
  }
  return { errs, byDomain };
}

// The banks were authored with the correct answer first (~88% of AIF answers
// were option A), which a learner absorbs without noticing. Shuffle options at
// build time, seeded by exam + question id so the page is stable between
// builds (saved progress keeps pointing at the same options). Questions with
// "all/none of the above"-style options keep their authored order.
function seededRandom(seed) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}
// A plain shuffle can still cluster by luck (one bank landed 11 of 19 answers
// on D), so single-answer questions are dealt target positions round-robin
// (A, B, C, D, A, ...) in a seeded order: every letter is used about equally.
function shuffleOptions(examId, q, target) {
  const type = q.type || (q.multi ? 'multi' : 'single');
  if (type !== 'single' && type !== 'multi') return q;
  if (q.options.some(o => /\b(all|none) of the above\b|\bboth [A-E]\b/i.test(o))) return q;
  const rand = seededRandom(`${examId}#${q.id}`);
  const order = q.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  if (type === 'single' && target !== undefined && target < order.length) {
    const from = order.indexOf(q.correct[0]);
    [order[from], order[target]] = [order[target], order[from]];
  }
  return { ...q, options: order.map(i => q.options[i]),
           correct: q.correct.map(c => order.indexOf(c)).sort((a, b) => a - b) };
}
function shuffleBank(examId, qs) {
  const rand = seededRandom(`${examId}#targets`);
  const singles = qs.filter(q => (q.type || (q.multi ? 'multi' : 'single')) === 'single');
  const targets = singles.map((_, i) => i % 4);
  for (let i = targets.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [targets[i], targets[j]] = [targets[j], targets[i]];
  }
  return qs.map(q => shuffleOptions(examId, q, targets[singles.indexOf(q)]));
}

// "Pick the longest option" should be no better than chance. Hard banks
// (meta.hard) must keep the correct answer the strictly-longest option in at
// most 30% of single-answer questions; other banks only report the rate.
function longestRate(qs) {
  const singles = qs.filter(q => (q.type || (q.multi ? 'multi' : 'single')) === 'single');
  const hits = singles.filter(q => {
    const L = q.options.map(o => o.length);
    const c = L[q.correct[0]];
    return L.every((l, i) => i === q.correct[0] || l < c);
  }).length;
  return singles.length ? hits / singles.length : 0;
}

// Track every scenario across every exam so a question can never silently appear
// in two papers — the learner explicitly asked that all questions be unique.
const seenScenarios = new Map();

let built = 0, failed = 0;
fs.readdirSync(QDIR).filter(f => f.endsWith('.json')).sort().forEach(f => {
  const data = JSON.parse(fs.readFileSync(path.join(QDIR, f), 'utf8'));
  const { errs, byDomain } = validate(f, data.questions, data.meta.cert || 'dva');

  data.questions.forEach(q => {
    // Normalise so trivial whitespace/markup differences still count as duplicates.
    const key = q.scenario.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    if (seenScenarios.has(key)) {
      errs.push(`q${q.id} duplicates a scenario already used in ${seenScenarios.get(key)}`);
    } else {
      seenScenarios.set(key, data.meta.id);
    }
  });
  const longest = longestRate(data.questions);
  if (data.meta.hard && longest > 0.3) {
    errs.push(`correct answer is the longest option in ${Math.round(longest * 100)}% of questions (max 30% for a hard bank)`);
  }
  // AIF has five domains, DVA and CLF four — report whichever the bank uses.
  const dist = Object.keys(byDomain).map(Number).sort((a, b) => a - b)
    .map(d => byDomain[d]).join('/');
  if (errs.length) {
    failed++;
    console.error(`✘ ${f}: ${errs.length} problem(s)\n   ` + errs.slice(0, 8).join('\n   '));
    return;
  }
  const out = path.join(DIR, data.meta.id + '.html');
  fs.writeFileSync(out, page(data.meta, shuffleBank(data.meta.id, data.questions)));
  built++;
  console.log(`✔ ${data.meta.id}.html  ${data.questions.length} questions  domains ${dist}  longest-is-correct ${Math.round(longest * 100)}%`);
});
console.log(`\n${built} exam(s) built${failed ? `, ${failed} failed` : ''}.`);
if (failed) process.exit(1);
