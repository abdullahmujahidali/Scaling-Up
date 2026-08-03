/* nav.js — shared course navigation, injected into every lesson.
   Single source of truth for the lesson list. Add a lesson here once and
   it appears in the sidebar on every page. Auto-highlights the current file. */

(function () {
  // The whole course, in order. `file` is relative to /lessons/.
  // Use null `file` for the home link (handled specially).
  var COURSE = [
    { kind: 'home' },
    { kind: 'week' },
    // AWS DVA-C02 track. Deferred 2026-08-03: the team lead redirected to the
    // Foundational certs (AI Practitioner + Cloud Practitioner) first, so this
    // track is kept intact and collapsed rather than deleted — it resumes after.
    { track: 'AWS', label: '☁️ AWS DVA-C02', header: true, collapsed: true, note: 'later' },
    { kind: 'awshub' },
    { kind: 'awsexams' },
    { kind: 'subhead', label: 'Lessons' },
    { file: '0045-aws-how-to-read-a-question.html', num: 'A1', title: 'How to Read an Exam Question' },
    { file: '0046-aws-lambda-limits.html',          num: 'A2', title: 'Lambda — the limits tested' },
    { file: '0047-aws-dynamodb-keys-and-indexes.html', num: 'A3', title: 'DynamoDB — Query vs Scan, LSI vs GSI' },
    { file: '0048-aws-iam-policy-evaluation.html',  num: 'A4', title: 'IAM — policy evaluation' },
    { file: '0049-aws-messaging-services.html',     num: 'A5', title: 'SQS vs SNS vs Kinesis' },
    { file: '0050-aws-deployment-strategies.html',  num: 'A6', title: 'Deployment strategies' },
    { file: '0051-aws-observability.html',          num: 'A7', title: 'CloudWatch, X-Ray, CloudTrail' },
    // Domain notes live in /reference/, so they use `ref` rather than `file`.
    { kind: 'subhead', label: 'Notes & tools' },
    { ref: 'dva-study-notes.html',            num: '★',  title: 'Master Study Notes' },
    { ref: 'dva-domain1-development.html',    num: 'D1', title: 'Domain 1 · Development (32%)' },
    { ref: 'dva-domain2-security.html',       num: 'D2', title: 'Domain 2 · Security (26%)' },
    { ref: 'dva-domain3-deployment.html',     num: 'D3', title: 'Domain 3 · Deployment (24%)' },
    { ref: 'dva-domain4-troubleshooting.html', num: 'D4', title: 'Domain 4 · Troubleshooting (18%)' },
    { ref: 'dva-numbers.html',                num: '★',  title: 'Numbers Cheat Sheet' },
    { ref: 'dva-resources.html',              num: '📚', title: 'Resources (bilingual)' },
    { ref: 'dva-booking-guide.html',          num: '🎫', title: 'How to book the exam' },
    { track: 'A', label: 'System Design', header: true, collapsed: true, note: 'paused' },
    { file: '0001-the-design-framework.html', num: '1',  title: 'The Design Framework' },
    { file: '0002-consistency-and-availability.html', num: '2a', title: 'Consistency' },
    { file: '0003-failover.html', num: '2b', title: 'Failover' },
    { file: '0004-the-nines.html', num: '2c', title: 'The "Nines"' },
    { file: '0005-load-balancers.html', num: '3',  title: 'Load Balancers' },
    { file: '0006-caching.html', num: '4',  title: 'Caching' },
    { file: '0008-cap-theorem.html', num: '5',  title: 'CAP Theorem' },
    { file: '0010-sql-vs-nosql.html', num: '6',  title: 'SQL vs NoSQL' },
    { file: '0012-replication-and-sharding.html', num: '7',  title: 'Replication & Sharding' },
    { file: '0013-message-queues.html', num: '8',  title: 'Message Queues' },
    { file: '0014-dns-and-cdn.html', num: '9',  title: 'DNS & CDN' },
    { file: '0016-monolith-vs-microservices.html', num: '10', title: 'Monolith vs Microservices' },
    { file: '0017-api-design-rest.html', num: '11', title: 'API Design (REST)' },
    { file: '0019-design-walkthrough-url-shortener.html', num: '12', title: 'Capstone: URL Shortener' },
    { file: '0020-rate-limiting.html', num: '13', title: 'Rate Limiting' },
    { file: '0021-websockets.html', num: '14', title: 'WebSockets' },
    { file: '0025-event-streaming-kafka.html', num: '15', title: 'Event Streaming (Kafka)' },
    { file: '0027-circuit-breaker.html', num: '16', title: 'Circuit Breakers' },
    { file: '0028-api-gateway.html', num: '17', title: 'API Gateway' },
    { file: '0030-consistent-hashing.html', num: '18', title: 'Consistent Hashing' },
    { file: '0031-object-storage.html', num: '19', title: 'Object Storage (S3)' },
    { file: '0034-observability.html', num: '20', title: 'Observability' },
    { file: '0035-feature-flags.html', num: '21', title: 'Feature Flags' },
    { file: '0036-health-checks.html', num: '22', title: 'Health Checks' },
    { track: 'B', label: 'Backend Depth', header: true, collapsed: true, note: 'paused' },
    { file: '0007-the-gil.html', num: 'B1', title: 'The GIL' },
    { file: '0009-database-indexes.html', num: 'B2', title: 'Database Indexes' },
    { file: '0011-n-plus-1-queries.html', num: 'B3', title: 'N+1 Queries' },
    { file: '0015-transactions-and-locking.html', num: 'B4', title: 'Transactions & Locking' },
    { file: '0018-async-await.html', num: 'B5', title: 'async / await' },
    { file: '0022-idempotency.html', num: 'B6', title: 'Idempotency' },
    { file: '0023-connection-pooling.html', num: 'B7', title: 'Connection Pooling' },
    { file: '0024-denormalization.html', num: 'B8', title: 'Denormalization' },
    { file: '0026-search-inverted-index.html', num: 'B9', title: 'Search & Inverted Index' },
    { file: '0029-bloom-filters.html', num: 'B10', title: 'Bloom Filters' },
    { file: '0032-webhooks.html', num: 'B11', title: 'Webhooks' },
    { file: '0033-database-migrations.html', num: 'B12', title: 'Safe DB Migrations' },
    { file: '0037-sessions-vs-jwt.html', num: 'B13', title: 'Sessions vs JWT' },
    { track: 'F', label: 'Fundamentals (DSA)', header: true, collapsed: true, note: 'paused' },
    { file: '0038-big-o.html', num: 'F1', title: 'Big-O Notation' },
    { file: '0039-hash-tables.html', num: 'F2', title: 'Hash Tables' },
    { file: '0040-arrays-vs-linked-lists.html', num: 'F3', title: 'Arrays vs Linked Lists' },
    { file: '0041-trees-and-bst.html', num: 'F4', title: 'Trees & BST' },
    { file: '0042-recursion.html', num: 'F5', title: 'Recursion' },
    { file: '0043-stacks-and-queues.html', num: 'F6', title: 'Stacks & Queues' },
    { file: '0044-two-pointer-sliding-window.html', num: 'F7', title: 'Two-Pointer & Sliding Window' },
    { kind: 'glossary' }
  ];

  // Which file are we on right now?
  var here = location.pathname.split('/').pop();

  // Figure out relative path prefixes. Lessons live in /lessons/, the glossary
  // in /reference/, the home page at root. We detect by folder.
  var inLessons = /\/lessons\//.test(location.pathname);
  var inReference = /\/reference\//.test(location.pathname);
  var inExams = /\/exams\//.test(location.pathname);
  var toRoot = (inLessons || inReference || inExams) ? '../' : '';
  var toLessons = toRoot + 'lessons/';

  // --- Collapsible track state -------------------------------------------
  // Saved per track in localStorage. Defaults come from `collapsed` in COURSE,
  // so a fresh visitor sees only the active track expanded.
  var OPEN_KEY = 'scaling-up-nav-open';
  var openState = {};
  try { openState = JSON.parse(localStorage.getItem(OPEN_KEY) || '{}'); } catch (e) { openState = {}; }

  // Which track does the current page belong to? A collapsed track must still
  // open when you are standing inside it, or the sidebar hides your location.
  var currentTrack = null;
  (function () {
    var t = null;
    for (var i = 0; i < COURSE.length; i++) {
      if (COURSE[i].header) { t = COURSE[i].track; continue; }
      if ((COURSE[i].file || COURSE[i].ref) === here) { currentTrack = t; return; }
    }
  })();

  function isOpen(track) {
    if (track === currentTrack) return true;              // never hide where you are
    if (Object.prototype.hasOwnProperty.call(openState, track)) return !!openState[track];
    var hdr = COURSE.find(function (c) { return c.header && c.track === track; });
    return !(hdr && hdr.collapsed);                        // fall back to the default
  }

  // Build the sidebar markup.
  var items = COURSE.map(function (it) {
    if (it.kind === 'home') {
      return '<a class="cnav-home" href="' + toRoot + 'index.html">🏠 Scaling Up — Home</a>' +
             '<a class="cnav-ref" href="' + toRoot + 'how-to-use.html" style="margin-top:0.4rem;border-top:none;padding-top:0.42rem;">📖 How to use</a>';
    }
    if (it.kind === 'week') {
      var w1cur = (here === 'this-week.html') ? ' cnav-current' : '';
      var w2cur = (here === 'this-week-2.html') ? ' cnav-current' : '';
      return '<a class="cnav-ref' + w1cur + '" href="' + toRoot + 'this-week.html" style="margin-top:0;border-top:none;padding-top:0.42rem;">🗓️ Week 1 plan</a>' +
             '<a class="cnav-ref' + w2cur + '" href="' + toRoot + 'this-week-2.html" style="margin-top:0;border-top:none;padding-top:0.42rem;">🗓️ Week 2 plan</a>';
    }
    if (it.kind === 'glossary') {
      // Match the glossary file itself, not merely "we're in /reference/" —
      // the AWS domain notes also live there and must not steal the highlight.
      var gcur = (here === 'glossary.html') ? ' cnav-current' : '';
      return '<a class="cnav-ref' + gcur + '" href="' + toRoot + 'reference/glossary.html">📑 Glossary</a>';
    }
    if (it.kind === 'awshub') {
      var acur = (here === 'aws-index.html') ? ' cnav-current' : '';
      return '<a class="cnav-ref' + acur + '" href="' + toRoot + 'aws-index.html" ' +
             'style="margin-top:0;border-top:none;padding-top:0.42rem;">☁️ AWS exam hub</a>';
    }
    if (it.kind === 'awsexams') {
      // Highlight on the hub itself and on any individual exam page (/exams/*).
      var ecur = (here === 'exams.html' || /\/exams\//.test(location.pathname)) ? ' cnav-current' : '';
      return '<a class="cnav-ref' + ecur + '" href="' + toRoot + 'exams.html" ' +
             'style="margin-top:0;border-top:none;padding-top:0.42rem;">📝 15 practice exams</a>';
    }
    if (it.kind === 'subhead') {
      return '<div class="cnav-subhead">' + it.label + '</div>';
    }
    if (it.header) {
      // Collapsible section header. Count how many entries it owns so the
      // collapsed state can say "(22)" without the user expanding it.
      var count = 0;
      for (var i = COURSE.indexOf(it) + 1; i < COURSE.length; i++) {
        if (COURSE[i].header) break;
        if (COURSE[i].file || COURSE[i].ref) count++;
      }
      var open = isOpen(it.track);
      return '<div class="cnav-track cnav-track-toggle' + (open ? ' cnav-open' : '') + '" ' +
                  'data-track="' + it.track + '" role="button" tabindex="0">' +
               '<span class="cnav-caret">' + (open ? '▾' : '▸') + '</span>' +
               '<span class="cnav-track-label">' + it.label + '</span>' +
               '<span class="cnav-track-meta">' + count +
                 (it.note ? ' · ' + it.note : '') + '</span>' +
             '</div>';
    }
    // `ref` items live in /reference/, `file` items live in /lessons/.
    var target = it.ref ? (toRoot + 'reference/' + it.ref) : (toLessons + it.file);
    var cur = ((it.ref || it.file) === here) ? ' cnav-current' : '';
    return '<a class="cnav-item' + cur + '" href="' + target + '">' +
             '<span class="cnav-num">' + it.num + '</span>' +
             '<span class="cnav-title">' + it.title + '</span>' +
           '</a>';
  }).join('');

  var nav = document.createElement('nav');
  nav.className = 'course-nav';
  nav.innerHTML =
    '<button class="cnav-toggle" aria-label="Toggle lessons menu">☰ Lessons</button>' +
    '<div class="cnav-panel">' +
      '<div class="cnav-heading">Course</div>' +
      items +
    '</div>';
  document.body.insertBefore(nav, document.body.firstChild);

  // Mobile toggle: show/hide the panel.
  var toggle = nav.querySelector('.cnav-toggle');
  toggle.addEventListener('click', function () {
    nav.classList.toggle('cnav-open');
  });

  // --- Expand / collapse a track ------------------------------------------
  // Everything between one track header and the next belongs to that header.
  function membersOf(headerEl) {
    var out = [], n = headerEl.nextElementSibling;
    while (n && !n.classList.contains('cnav-track')) { out.push(n); n = n.nextElementSibling; }
    return out;
  }
  function paint(headerEl, open) {
    membersOf(headerEl).forEach(function (el) { el.style.display = open ? '' : 'none'; });
    headerEl.classList.toggle('cnav-open', open);
    var caret = headerEl.querySelector('.cnav-caret');
    if (caret) caret.textContent = open ? '▾' : '▸';
  }
  nav.querySelectorAll('.cnav-track-toggle').forEach(function (h) {
    paint(h, h.classList.contains('cnav-open'));          // apply initial state
    function flip() {
      var nowOpen = !h.classList.contains('cnav-open');
      paint(h, nowOpen);
      openState[h.dataset.track] = nowOpen;
      try { localStorage.setItem(OPEN_KEY, JSON.stringify(openState)); } catch (e) {}
    }
    h.addEventListener('click', flip);
    h.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
    });
  });

  // Prev / Next footer buttons — auto-computed from the current position.
  // Scoped to the CURRENT TRACK: the tracks are separate courses, so "Next"
  // from the last AWS lesson must not fall through into System Design.
  var lessonsOnly = (function () {
    var out = [], t = null;
    COURSE.forEach(function (it) {
      if (it.header) { t = it.track; return; }
      if (it.file && t === currentTrack) out.push(it);
    });
    return out;
  })();
  var idx = lessonsOnly.findIndex(function (it) { return it.file === here; });
  if (idx !== -1) {
    var prev = lessonsOnly[idx - 1];
    var next = lessonsOnly[idx + 1];
    var bar = document.createElement('div');
    bar.className = 'cnav-prevnext';
    var left = prev
      ? '<a class="cnav-pn" href="' + toLessons + prev.file + '">← ' + prev.num + ' · ' + prev.title + '</a>'
      : '<span></span>';
    var right = next
      ? '<a class="cnav-pn cnav-pn-next" href="' + toLessons + next.file + '">' + next.num + ' · ' + next.title + ' →</a>'
      : '<span></span>';
    bar.innerHTML = left + right;
    // Put it just before the lesson footer if there is one, else at end of .wrap.
    var wrap = document.querySelector('.wrap');
    var foot = document.querySelector('.lesson-foot');
    if (foot) { foot.parentNode.insertBefore(bar, foot); }
    else if (wrap) { wrap.appendChild(bar); }
  }
})();
