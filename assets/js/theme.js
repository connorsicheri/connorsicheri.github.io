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

    // Make cards fully clickable when they have a destination
    // Priority: data-href on the card; fallback to first nested anchor
    var cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
      if (card.dataset.cardWired === 'true') return;

      var href = card.getAttribute('data-href');
      if (!href) {
        var firstAnchor = card.querySelector('a[href]');
        if (firstAnchor) href = firstAnchor.getAttribute('href');
      }
      if (!href) return;

      card.dataset.cardWired = 'true';
      card.classList.add('card-clickable');
      card.setAttribute('role', 'link');
      card.setAttribute('tabindex', '0');

      function isInteractive(el) {
        return !!(el && el.closest('a, button, input, textarea, select, [role="button"], [data-no-card-click]'));
      }

      function navigate() {
        window.location.href = href;
      }

      card.addEventListener('click', function(e) {
        if (e.defaultPrevented) return;
        if (isInteractive(e.target)) return; // let inner controls handle click
        navigate();
      });

      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          if (isInteractive(document.activeElement)) return;
          e.preventDefault();
          navigate();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();

