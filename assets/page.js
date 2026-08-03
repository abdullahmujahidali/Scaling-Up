/* page.js — the ONE place that knows which stylesheets and scripts a page needs.

   WHY THIS EXISTS
   Every page used to hard-code its own <link> and <script> tags with a
   ?v=N cache-buster. Changing a stylesheet meant editing that version in
   ~128 places with sed, and forgetting one meant a page silently rendered
   with stale CSS. Now each page includes this single file and gets
   everything else automatically.

   HOW TO USE IT
   In <head>, as the only asset tag a page needs:

       <script src="../assets/page.js" data-root=".."></script>

   `data-root` is the relative path back to the repo root ("." at the root,
   ".." from /lessons/, /reference/ or /exams/). If omitted it is inferred
   from the URL, so most pages can just write:

       <script src="../assets/page.js"></script>

   TO BUST THE CACHE AFTER EDITING CSS OR JS
   Change VERSION below. That is the whole job — one number, one file.

   NOTE ON ORDERING
   Stylesheets are written synchronously via document.write so they land in
   <head> before first paint (no flash of unstyled content). The scripts are
   appended at the end of <body> on DOMContentLoaded, matching where pages
   used to put them, so i18n.js and nav.js still see a complete DOM. */

(function () {
  var VERSION = '8';               // ← bump this when you change any CSS or JS

  var me = document.currentScript;
  // Work out the path back to the repo root. Prefer an explicit data-root;
  // otherwise infer it from which subfolder we are in.
  var root = me && me.getAttribute('data-root');
  if (!root) {
    root = /\/(lessons|reference|exams)\//.test(location.pathname) ? '..' : '.';
  }
  root = root.replace(/\/$/, '');

  // Exam pages deliberately omit the sidebar: a nav during a timed exam is a
  // distraction. They opt out with data-nav="false".
  var wantsNav = !(me && me.getAttribute('data-nav') === 'false');

  var STYLES  = ['lesson.css', 'exam.css'];
  var SCRIPTS = ['i18n.js'].concat(wantsNav ? ['nav.js'] : []);

  function url(f) { return root + '/assets/' + f + '?v=' + VERSION; }

  // Styles must be in place before first paint.
  STYLES.forEach(function (f) {
    document.write('<link rel="stylesheet" href="' + url(f) + '">');
  });

  // Scripts go at the end of body, where they used to live.
  function addScripts() {
    SCRIPTS.forEach(function (f) {
      var s = document.createElement('script');
      s.src = url(f);
      s.async = false;            // preserve order: i18n before nav
      document.body.appendChild(s);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addScripts);
  } else {
    addScripts();
  }
})();
