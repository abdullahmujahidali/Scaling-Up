/* i18n.js — hidden Roman Urdu toggle, saved to localStorage, applied site-wide.
   HOW IT WORKS
   - Any element with a data-ur="..." attribute has a Roman Urdu translation.
   - When Urdu mode is ON, we swap the element's visible text to its data-ur value
     (English is preserved in data-en so we can switch back cleanly).
   - The choice is stored in localStorage so it persists across pages and visits.

   HIDDEN TOGGLE
   - Type the letter "u" three times quickly (within ~800ms) anywhere on the page.
   - A tiny toast confirms the switch. No visible button.
   - (Also: Shift+Alt+U works, for keyboards/habits that prefer a combo.)  */

(function () {
  var KEY = 'scaling-up-lang';           // 'en' (default) or 'ur'
  var lang = 'en';
  try { lang = localStorage.getItem(KEY) || 'en'; } catch (e) {}

  // Swap every translatable element to the chosen language.
  function apply(l) {
    document.documentElement.setAttribute('data-lang', l);
    var nodes = document.querySelectorAll('[data-ur]');
    nodes.forEach(function (el) {
      // Stash the original English once, the first time we ever touch this node.
      if (!el.hasAttribute('data-en')) {
        el.setAttribute('data-en', el.innerHTML);
      }
      if (l === 'ur') {
        el.innerHTML = el.getAttribute('data-ur');
      } else {
        el.innerHTML = el.getAttribute('data-en');
      }
    });
  }

  // Little confirmation toast (so a hidden shortcut still gives feedback).
  function toast(msg) {
    var t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText =
      'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);' +
      'background:#1a1a1a;color:#fff;padding:0.6rem 1.1rem;border-radius:8px;' +
      'font-family:ui-sans-serif,sans-serif;font-size:0.85rem;z-index:9999;' +
      'box-shadow:0 4px 16px rgba(0,0,0,0.3);opacity:0;transition:opacity .2s;';
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.style.opacity = '1'; });
    setTimeout(function () { t.style.opacity = '0'; setTimeout(function () { t.remove(); }, 250); }, 1600);
  }

  function toggle() {
    lang = (lang === 'ur') ? 'en' : 'ur';
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    apply(lang);
    toast(lang === 'ur' ? 'Roman Urdu — ON  (press u u u to switch back)' : 'English — ON');
  }

  // --- Hidden trigger 1: "u" pressed 3× quickly ---
  var taps = [];
  document.addEventListener('keydown', function (e) {
    // ignore when typing in a field
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;

    // --- Hidden trigger 2: Shift+Alt+U ---
    if (e.altKey && e.shiftKey && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault(); toggle(); return;
    }

    if (e.key === 'u' || e.key === 'U') {
      var now = (window.performance && performance.now) ? performance.now() : (taps.length ? taps[taps.length-1]+1 : 0);
      taps.push(now);
      taps = taps.filter(function (t) { return now - t < 800; });   // keep recent taps
      if (taps.length >= 3) { taps = []; toggle(); }
    } else {
      taps = [];
    }
  });

  // Apply saved preference on load.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { apply(lang); });
  } else {
    apply(lang);
  }

  // Re-apply after nav.js injects the sidebar (it runs at end of body too).
  // A microtask delay ensures injected nodes with data-ur get translated.
  setTimeout(function () { apply(lang); }, 0);
})();
