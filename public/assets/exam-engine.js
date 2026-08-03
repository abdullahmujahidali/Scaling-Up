/* exam-engine.js — full mock-exam runner for the AWS DVA-C02 track.
   Every exam page is just a data file (QUESTIONS array + EXAM_META) plus this script.

   WHAT IT DOES
   - Real exam conditions: one question at a time, 130-minute countdown, flag for review.
   - No feedback during the exam. Feedback is the whole point of the REVIEW screen after.
   - Scores on the AWS scale (100–1000, pass = 720) and per-domain, so weak areas surface.
   - Saves progress to localStorage, so closing the tab mid-exam doesn't lose the attempt.
   - Records the best score per exam so the hub page can show progress.

   QUESTION FORMAT (in each exam file):
     { id: 1,
       domain: 1,                       // 1..4, used for per-domain scoring
       multi: false,                    // true => "choose TWO/THREE", checkboxes not radios
       scenario: 'HTML string',
       scenarioUr: 'Roman Urdu',        // optional; shown when Urdu mode is on
       options: ['a','b','c','d'],
       correct: [1],                    // zero-based indices
       explain: 'why the right answer is right AND the others are wrong',
       explainUr: 'Roman Urdu'          // optional
     }
   Practice questions stay in ENGLISH on purpose — the real exam is English-only.
   Roman Urdu is available for explanations, where it helps comprehension not muscle memory. */

(function () {
  'use strict';

  if (typeof QUESTIONS === 'undefined' || typeof EXAM_META === 'undefined') return;

  var PASS_SCORE = 720;
  var SCALE_MIN = 100, SCALE_MAX = 1000;
  var DOMAIN_NAMES = {
    1: 'Development with AWS Services',
    2: 'Security',
    3: 'Deployment',
    4: 'Troubleshooting & Optimization'
  };
  var DOMAIN_WEIGHTS = { 1: 32, 2: 26, 3: 24, 4: 18 };

  var STORE_PROGRESS = 'dva-exam-progress-' + EXAM_META.id;
  var STORE_RESULTS  = 'dva-exam-results';

  var state = {
    idx: 0,
    answers: {},            // qIndex -> array of selected option indices
    flagged: {},            // qIndex -> true
    startedAt: null,
    endsAt: null,
    submitted: false,
    reviewFilter: 'all'
  };

  // ---------- storage helpers (all wrapped: private browsing can throw) ----------
  function save() {
    try { localStorage.setItem(STORE_PROGRESS, JSON.stringify(state)); } catch (e) {}
  }
  function load() {
    try {
      var raw = localStorage.getItem(STORE_PROGRESS);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
  }
  function clearProgress() {
    try { localStorage.removeItem(STORE_PROGRESS); } catch (e) {}
  }
  function recordResult(res) {
    try {
      var all = JSON.parse(localStorage.getItem(STORE_RESULTS) || '{}');
      var prev = all[EXAM_META.id];
      // Keep the BEST attempt, but always update attempt count and last date.
      all[EXAM_META.id] = {
        best: (prev && prev.best > res.scaled) ? prev.best : res.scaled,
        last: res.scaled,
        attempts: (prev ? prev.attempts : 0) + 1,
        passed: (prev && prev.passed) || res.scaled >= PASS_SCORE,
        when: new Date().toISOString().slice(0, 10)
      };
      localStorage.setItem(STORE_RESULTS, JSON.stringify(all));
    } catch (e) {}
  }

  function isUrdu() {
    return document.documentElement.getAttribute('data-lang') === 'ur';
  }

  // ---------- scoring ----------
  function isCorrect(qi) {
    var q = QUESTIONS[qi];
    var given = (state.answers[qi] || []).slice().sort().join(',');
    var want = q.correct.slice().sort().join(',');
    return given === want && given !== '';
  }

  function computeResult() {
    var correct = 0, byDomain = {};
    for (var d = 1; d <= 4; d++) byDomain[d] = { correct: 0, total: 0 };

    QUESTIONS.forEach(function (q, i) {
      var d = q.domain || 1;
      byDomain[d].total++;
      if (isCorrect(i)) { correct++; byDomain[d].correct++; }
    });

    var pct = correct / QUESTIONS.length;
    // AWS reports 100–1000 scaled. Real scaling is proprietary; this is a linear
    // approximation, which is honest enough for practice and keeps 720 ≈ 72%.
    var scaled = Math.round(SCALE_MIN + pct * (SCALE_MAX - SCALE_MIN));

    return {
      correct: correct,
      total: QUESTIONS.length,
      pct: pct,
      scaled: scaled,
      passed: scaled >= PASS_SCORE,
      byDomain: byDomain
    };
  }

  // ---------- timer ----------
  var timerHandle = null;
  function startTimer() {
    if (timerHandle) clearInterval(timerHandle);
    timerHandle = setInterval(tickTimer, 1000);
    tickTimer();
  }
  function tickTimer() {
    if (state.submitted) return;
    var left = Math.max(0, Math.floor((state.endsAt - Date.now()) / 1000));
    var el = document.getElementById('exam-timer');
    if (el) {
      var m = Math.floor(left / 60), s = left % 60;
      el.textContent = m + ':' + (s < 10 ? '0' : '') + s;
      el.className = 'exam-timer' + (left < 300 ? ' danger' : left < 900 ? ' warn' : '');
    }
    if (left <= 0) {
      clearInterval(timerHandle);
      submitExam(true);
    }
  }

  // ---------- rendering: the exam itself ----------
  function renderQuestion() {
    var q = QUESTIONS[state.idx];
    var root = document.getElementById('exam-body');
    var sel = state.answers[state.idx] || [];
    var needed = q.correct.length;

    var opts = q.options.map(function (opt, i) {
      var on = sel.indexOf(i) !== -1;
      return '<button class="eopt' + (on ? ' selected' : '') + '" data-i="' + i + '">' +
               '<span class="eopt-mark">' + (q.multi ? (on ? '☑' : '☐') : (on ? '●' : '○')) + '</span>' +
               '<span class="eopt-text">' + opt + '</span>' +
             '</button>';
    }).join('');

    var multiNote = q.multi
      ? '<p class="multi-note">Choose ' + (needed === 2 ? 'TWO' : needed === 3 ? 'THREE' : needed) + '.</p>'
      : '';

    root.innerHTML =
      '<div class="exam-qhead">' +
        '<span class="exam-qnum">Question ' + (state.idx + 1) + ' of ' + QUESTIONS.length + '</span>' +
        '<button class="flag-btn' + (state.flagged[state.idx] ? ' on' : '') + '" id="flag-btn">' +
          (state.flagged[state.idx] ? '🚩 Flagged' : '⚑ Flag for review') +
        '</button>' +
      '</div>' +
      '<div class="exam-scenario">' + q.scenario + '</div>' +
      multiNote +
      '<div class="eopts">' + opts + '</div>';

    root.querySelectorAll('.eopt').forEach(function (b) {
      b.addEventListener('click', function () { pick(parseInt(b.dataset.i, 10)); });
    });
    document.getElementById('flag-btn').addEventListener('click', function () {
      state.flagged[state.idx] = !state.flagged[state.idx];
      save(); renderQuestion(); renderPalette();
    });

    document.getElementById('prev-btn').disabled = state.idx === 0;
    document.getElementById('next-btn').disabled = state.idx === QUESTIONS.length - 1;
    renderPalette();
  }

  function pick(i) {
    var q = QUESTIONS[state.idx];
    var sel = state.answers[state.idx] || [];
    if (q.multi) {
      var at = sel.indexOf(i);
      if (at === -1) sel = sel.concat([i]); else sel = sel.filter(function (x) { return x !== i; });
    } else {
      sel = [i];
    }
    state.answers[state.idx] = sel;
    save();
    renderQuestion();
  }

  function renderPalette() {
    var p = document.getElementById('exam-palette');
    if (!p) return;
    p.innerHTML = QUESTIONS.map(function (q, i) {
      var cls = 'pal';
      if (state.answers[i] && state.answers[i].length) cls += ' answered';
      if (state.flagged[i]) cls += ' flagged';
      if (i === state.idx) cls += ' current';
      return '<button class="' + cls + '" data-i="' + i + '">' + (i + 1) + '</button>';
    }).join('');
    p.querySelectorAll('.pal').forEach(function (b) {
      b.addEventListener('click', function () {
        state.idx = parseInt(b.dataset.i, 10); save(); renderQuestion();
      });
    });

    var answered = Object.keys(state.answers).filter(function (k) {
      return state.answers[k] && state.answers[k].length;
    }).length;
    var c = document.getElementById('answered-count');
    if (c) c.textContent = answered + ' / ' + QUESTIONS.length + ' answered';
  }

  // ---------- rendering: results ----------
  function submitExam(auto) {
    var answered = Object.keys(state.answers).filter(function (k) {
      return state.answers[k] && state.answers[k].length;
    }).length;

    if (!auto && answered < QUESTIONS.length) {
      var miss = QUESTIONS.length - answered;
      if (!confirm(miss + ' question' + (miss > 1 ? 's are' : ' is') +
                   ' unanswered. Blank answers score as wrong — there is no penalty for ' +
                   'guessing, so it is always better to guess.\n\nSubmit anyway?')) return;
    }

    state.submitted = true;
    if (timerHandle) clearInterval(timerHandle);

    var res = computeResult();
    recordResult(res);
    clearProgress();
    renderResults(res);
    window.scrollTo(0, 0);
  }

  function renderResults(res) {
    document.getElementById('exam-live').style.display = 'none';
    var root = document.getElementById('exam-results');
    root.style.display = 'block';

    var timeUsed = Math.round((Date.now() - state.startedAt) / 60000);

    var domainRows = [1, 2, 3, 4].map(function (d) {
      var b = res.byDomain[d];
      if (!b.total) return '';
      var p = Math.round((b.correct / b.total) * 100);
      var cls = p >= 72 ? 'ok' : p >= 55 ? 'mid' : 'bad';
      return '<tr>' +
        '<td>Domain ' + d + ' · ' + DOMAIN_NAMES[d] + ' <span class="wt">' + DOMAIN_WEIGHTS[d] + '%</span></td>' +
        '<td class="num">' + b.correct + '/' + b.total + '</td>' +
        '<td class="num"><span class="pill ' + cls + '">' + p + '%</span></td>' +
        '<td><div class="bar"><i class="' + cls + '" style="width:' + p + '%"></i></div></td>' +
      '</tr>';
    }).join('');

    // Name the weakest domain explicitly — that's the actionable output of a mock exam.
    var weakest = null, weakestPct = 2;
    [1, 2, 3, 4].forEach(function (d) {
      var b = res.byDomain[d];
      if (b.total && (b.correct / b.total) < weakestPct) { weakestPct = b.correct / b.total; weakest = d; }
    });

    var advice;
    if (res.scaled >= 800) {
      advice = 'Strong pass. You are comfortably above the 720 line. Keep doing exams to hold this level, ' +
               'and read every explanation below — even for questions you got right by guessing.';
    } else if (res.passed) {
      advice = 'You passed — but ' + res.scaled + ' is close enough to 720 that a slightly harder exam form ' +
               'could push you under. Aim for 800+ consistently before booking.';
    } else if (res.scaled >= 620) {
      advice = 'Close. You are within reach of 720. Focus on your weakest domain below rather than ' +
               'studying everything again — that is where the fastest points are.';
    } else {
      advice = 'More study needed before booking. Do not treat this as failure — this is exactly what a ' +
               'practice exam is FOR: finding gaps while it is still free to find them.';
    }
    if (weakest) {
      advice += ' Your weakest area is <strong>Domain ' + weakest + ' — ' + DOMAIN_NAMES[weakest] +
                '</strong>; revisit those notes first.';
    }

    root.innerHTML =
      '<div class="result-hero ' + (res.passed ? 'pass' : 'fail') + '">' +
        '<div class="result-verdict">' + (res.passed ? 'PASS' : 'NOT YET') + '</div>' +
        '<div class="result-score">' + res.scaled + '<span>/1000</span></div>' +
        '<div class="result-sub">' + res.correct + ' of ' + res.total + ' correct · ' +
          Math.round(res.pct * 100) + '% · pass mark is 720 · ' + timeUsed + ' min used</div>' +
      '</div>' +
      '<div class="result-advice">' + advice + '</div>' +
      '<h2>Score by domain</h2>' +
      '<p class="hint-line">The real exam is compensatory — you only need to pass overall, not each domain. ' +
      'But a weak domain here tells you exactly where to study next.</p>' +
      '<table class="domain-table"><tbody>' + domainRows + '</tbody></table>' +
      '<h2>Review every question</h2>' +
      '<p class="hint-line">This is the most valuable part. Read the explanation for each one you got ' +
      'wrong — and work out <em>why</em>: did you not know the service, or did you misread the question?</p>' +
      '<div class="review-filters">' +
        '<button class="rf active" data-f="all">All ' + res.total + '</button>' +
        '<button class="rf" data-f="wrong">Wrong ' + (res.total - res.correct) + '</button>' +
        '<button class="rf" data-f="flagged">Flagged</button>' +
      '</div>' +
      '<div id="review-list"></div>' +
      '<div class="result-actions">' +
        '<button class="btn-primary" id="retake-btn">Retake this exam</button> ' +
        '<a class="btn-secondary" href="../exams.html">All exams</a>' +
      '</div>';

    root.querySelectorAll('.rf').forEach(function (b) {
      b.addEventListener('click', function () {
        root.querySelectorAll('.rf').forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        state.reviewFilter = b.dataset.f;
        renderReview();
      });
    });
    document.getElementById('retake-btn').addEventListener('click', function () {
      if (confirm('Start this exam again from question 1?')) { clearProgress(); location.reload(); }
    });

    renderReview();
    if (window.__applyLang) window.__applyLang();
  }

  function renderReview() {
    var list = document.getElementById('review-list');
    if (!list) return;

    var html = QUESTIONS.map(function (q, i) {
      var ok = isCorrect(i);
      if (state.reviewFilter === 'wrong' && ok) return '';
      if (state.reviewFilter === 'flagged' && !state.flagged[i]) return '';

      var sel = state.answers[i] || [];
      var opts = q.options.map(function (opt, oi) {
        var right = q.correct.indexOf(oi) !== -1;
        var chose = sel.indexOf(oi) !== -1;
        var cls = right ? 'r-correct' : (chose ? 'r-wrong' : '');
        var tag = right ? '<span class="tag good">correct</span>'
                        : (chose ? '<span class="tag bad">you chose</span>' : '');
        return '<li class="' + cls + '">' + opt + ' ' + tag + '</li>';
      }).join('');

      var explainUr = q.explainUr ? ' data-ur="' + q.explainUr.replace(/"/g, '&quot;') + '"' : '';

      return '<div class="review-item ' + (ok ? 'ok' : 'no') + '">' +
        '<div class="review-head">' +
          '<span class="rq">Q' + (i + 1) + '</span>' +
          '<span class="rd">Domain ' + q.domain + '</span>' +
          '<span class="rv">' + (ok ? '✔ correct' : (sel.length ? '✘ wrong' : '— unanswered')) + '</span>' +
        '</div>' +
        '<div class="review-scenario">' + q.scenario + '</div>' +
        '<ul class="review-opts">' + opts + '</ul>' +
        '<div class="review-explain"' + explainUr + '><strong>Why:</strong> ' + q.explain + '</div>' +
      '</div>';
    }).join('');

    list.innerHTML = html || '<p class="hint-line">Nothing matches this filter.</p>';
    if (window.__applyLang) window.__applyLang();
  }

  // ---------- boot ----------
  function begin(resumed) {
    if (!resumed) {
      state.startedAt = Date.now();
      state.endsAt = state.startedAt + EXAM_META.minutes * 60 * 1000;
    }
    document.getElementById('exam-intro').style.display = 'none';
    document.getElementById('exam-live').style.display = 'block';
    save();
    renderQuestion();
    startTimer();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var prev = load();
    var resumeBtn = document.getElementById('resume-btn');

    // Only offer resume if the saved attempt is unsubmitted AND still has time left.
    if (prev && !prev.submitted && prev.endsAt > Date.now() && resumeBtn) {
      resumeBtn.style.display = 'inline-block';
      var mins = Math.ceil((prev.endsAt - Date.now()) / 60000);
      resumeBtn.textContent = 'Resume attempt (' + mins + ' min left)';
      resumeBtn.addEventListener('click', function () {
        state = prev;
        begin(true);
      });
    } else if (prev) {
      clearProgress();
    }

    document.getElementById('start-btn').addEventListener('click', function () {
      clearProgress();
      state = { idx: 0, answers: {}, flagged: {}, startedAt: null, endsAt: null,
                submitted: false, reviewFilter: 'all' };
      begin(false);
    });

    document.getElementById('prev-btn').addEventListener('click', function () {
      if (state.idx > 0) { state.idx--; save(); renderQuestion(); }
    });
    document.getElementById('next-btn').addEventListener('click', function () {
      if (state.idx < QUESTIONS.length - 1) { state.idx++; save(); renderQuestion(); }
    });
    document.getElementById('submit-btn').addEventListener('click', function () {
      submitExam(false);
    });

    // Keyboard: 1-9 to answer, arrows to move. Matches how people work fast under time.
    document.addEventListener('keydown', function (e) {
      if (state.submitted || !document.getElementById('exam-live') ||
          document.getElementById('exam-live').style.display === 'none') return;
      if (e.key === 'ArrowRight' && state.idx < QUESTIONS.length - 1) { state.idx++; save(); renderQuestion(); }
      if (e.key === 'ArrowLeft' && state.idx > 0) { state.idx--; save(); renderQuestion(); }
      var n = parseInt(e.key, 10);
      if (n >= 1 && n <= QUESTIONS[state.idx].options.length) pick(n - 1);
    });
  });
})();
