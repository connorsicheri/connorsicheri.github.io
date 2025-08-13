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
    var buttons = document.querySelectorAll('[data-theme-toggle]');
    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var current = root.getAttribute('data-theme');
        var next = current === 'light' ? 'dark' : 'light';
        setTheme(next);
        buttons.forEach(function(b) { b.textContent = next === 'light' ? 'Dark mode' : 'Light mode'; });
      });
      var current = root.getAttribute('data-theme');
      btn.textContent = current === 'light' ? 'Dark mode' : 'Light mode';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();

