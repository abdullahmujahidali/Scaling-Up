#!/usr/bin/env node
/* build.js — generates exam-NN.html pages from questions/exam-NN.json.
   The HTML shell is identical for every exam (it is just a host for the engine),
   so it lives here once rather than being copy-pasted into 15 files.

   Run:  node exams/build.js
   Also validates each question bank and refuses to emit a broken exam. */

const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const QDIR = path.join(DIR, 'questions');

function page(meta, questions) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DVA-C02 ${meta.title}</title>
<link rel="stylesheet" href="../assets/lesson.css?v=7">
<link rel="stylesheet" href="../assets/exam-runner.css?v=7">
</head>
<body>
<div class="exam-shell">

  <div id="exam-intro">
    <div class="exam-intro-card">
      <h1>${meta.title}</h1>
      <p class="sub">AWS Certified Developer – Associate (DVA-C02) · full-length mock${meta.focus ? ' · ' + meta.focus : ''}</p>

      <div class="exam-facts">
        <div class="exam-fact"><b>${questions.length}</b><span>questions</span></div>
        <div class="exam-fact"><b>${meta.minutes}</b><span>minutes</span></div>
        <div class="exam-fact"><b>720</b><span>pass mark / 1000</span></div>
        <div class="exam-fact"><b>~47</b><span>correct to pass</span></div>
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
        <button class="btn-primary" id="start-btn">Start exam</button>
        <button class="btn-secondary" id="resume-btn" style="display:none;"></button>
        <a class="btn-secondary" href="../exams.html">Back to all exams</a>
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
      <button class="btn-primary btn-submit" id="submit-btn">Submit exam</button>
    </div>

    <div class="palette-wrap">
      <h3>Question navigator — click any number to jump</h3>
      <div id="exam-palette"></div>
    </div>
  </div>

  <div id="exam-results" style="display:none;"></div>

</div>

<script>
var EXAM_META = ${JSON.stringify({ id: meta.id, title: meta.title, minutes: meta.minutes })};
var QUESTIONS = ${JSON.stringify(questions, null, 1)};
</script>
<script src="../assets/exam-engine.js?v=7"></script>
<script src="../assets/i18n.js?v=7"></script>
</body>
</html>
`;
}

function validate(file, qs) {
  const errs = [];
  const ids = new Set();
  const byDomain = {};
  qs.forEach(q => {
    if (ids.has(q.id)) errs.push(`dup id ${q.id}`);
    ids.add(q.id);
    byDomain[q.domain] = (byDomain[q.domain] || 0) + 1;
    if (!q.scenario) errs.push(`q${q.id} no scenario`);
    if (!q.explain) errs.push(`q${q.id} no explanation`);
    if (!Array.isArray(q.options) || q.options.length < 4) errs.push(`q${q.id} needs >=4 options`);
    if (!Array.isArray(q.correct) || !q.correct.length) errs.push(`q${q.id} no correct answer`);
    (q.correct || []).forEach(c => {
      if (c < 0 || c >= (q.options || []).length) errs.push(`q${q.id} correct index ${c} out of range`);
    });
    if (q.multi && (q.correct || []).length < 2) errs.push(`q${q.id} multi needs >=2 correct`);
    if (!q.multi && (q.correct || []).length !== 1) errs.push(`q${q.id} single needs exactly 1 correct`);
    if (new Set(q.options || []).size !== (q.options || []).length) errs.push(`q${q.id} duplicate option text`);
    if (![1, 2, 3, 4].includes(q.domain)) errs.push(`q${q.id} bad domain ${q.domain}`);
  });
  // Enforce real-exam shape: 65 questions weighted 21/17/15/12 across the four
  // domains. A drifting distribution would make scores stop predicting exam day.
  const EXPECTED = { 1: 21, 2: 17, 3: 15, 4: 12 };
  if (qs.length !== 65) errs.push(`expected 65 questions, found ${qs.length}`);
  Object.keys(EXPECTED).forEach(d => {
    const got = byDomain[d] || 0;
    if (got !== EXPECTED[d]) errs.push(`domain ${d}: expected ${EXPECTED[d]}, found ${got}`);
  });
  return { errs, byDomain };
}

// Track every scenario across every exam so a question can never silently appear
// in two papers — the learner explicitly asked that all questions be unique.
const seenScenarios = new Map();

let built = 0, failed = 0;
fs.readdirSync(QDIR).filter(f => f.endsWith('.json')).sort().forEach(f => {
  const data = JSON.parse(fs.readFileSync(path.join(QDIR, f), 'utf8'));
  const { errs, byDomain } = validate(f, data.questions);

  data.questions.forEach(q => {
    // Normalise so trivial whitespace/markup differences still count as duplicates.
    const key = q.scenario.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    if (seenScenarios.has(key)) {
      errs.push(`q${q.id} duplicates a scenario already used in ${seenScenarios.get(key)}`);
    } else {
      seenScenarios.set(key, data.meta.id);
    }
  });
  const dist = [1, 2, 3, 4].map(d => byDomain[d] || 0).join('/');
  if (errs.length) {
    failed++;
    console.error(`✘ ${f}: ${errs.length} problem(s)\n   ` + errs.slice(0, 8).join('\n   '));
    return;
  }
  const out = path.join(DIR, data.meta.id + '.html');
  fs.writeFileSync(out, page(data.meta, data.questions));
  built++;
  console.log(`✔ ${data.meta.id}.html  ${data.questions.length} questions  domains ${dist}`);
});
console.log(`\n${built} exam(s) built${failed ? `, ${failed} failed` : ''}.`);
if (failed) process.exit(1);
