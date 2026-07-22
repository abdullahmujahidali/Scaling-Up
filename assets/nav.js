/* nav.js — shared course navigation, injected into every lesson.
   Single source of truth for the lesson list. Add a lesson here once and
   it appears in the sidebar on every page. Auto-highlights the current file. */

(function () {
  // The whole course, in order. `file` is relative to /lessons/.
  // Use null `file` for the home link (handled specially).
  var COURSE = [
    { kind: 'home' },
    { kind: 'week' },
    { track: 'A', label: 'System Design', header: true },
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
    { track: 'B', label: 'Backend Depth', header: true },
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
    { track: 'F', label: 'Fundamentals (DSA)', header: true },
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
  var toRoot = (inLessons || inReference) ? '../' : '';
  var toLessons = toRoot + 'lessons/';

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
      var gcur = inReference ? ' cnav-current' : '';
      return '<a class="cnav-ref' + gcur + '" href="' + toRoot + 'reference/glossary.html">📑 Glossary</a>';
    }
    if (it.header) {
      return '<div class="cnav-track">Track ' + it.track + ' · ' + it.label + '</div>';
    }
    var cur = (it.file === here) ? ' cnav-current' : '';
    return '<a class="cnav-item' + cur + '" href="' + toLessons + it.file + '">' +
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

  // Prev / Next footer buttons — auto-computed from the current position.
  var lessonsOnly = COURSE.filter(function (it) { return it.file; });
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
