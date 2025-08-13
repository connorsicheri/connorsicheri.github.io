// Theme toggle with localStorage persistence
(function() {
  var root = document.documentElement;
  var storageKey = 'theme-preference';

  function setTheme(theme) {
    if (theme) {
      root.setAttribute('data-theme', theme);
      try { localStorage.setItem(storageKey, theme); } catch (e) {}
    } else {
      root.removeAttribute('data-theme');
      try { localStorage.removeItem(storageKey); } catch (e) {}
    }
  }

  function getStoredTheme() {
    try { return localStorage.getItem(storageKey); } catch (e) { return null; }
  }

  // Initialize
  var saved = getStoredTheme();
  if (saved === 'light' || saved === 'dark') {
    setTheme(saved);
  }

  // Wire up buttons with [data-theme-toggle]
  function wire() {
    var switches = document.querySelectorAll('[data-theme-toggle]');
    switches.forEach(function(sw) {
      sw.addEventListener('click', function() {
        var current = root.getAttribute('data-theme');
        var next = current === 'light' ? 'dark' : 'light';
        setTheme(next);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();

