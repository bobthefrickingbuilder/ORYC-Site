// Production bootstrap for the ORYC site. Loaded before support.js on every page.
(function () {
  // Serve React from this site instead of unpkg.com (same files, same SRI hashes).
  window.__resources = Object.assign(window.__resources || {}, {
    'https://unpkg.com/react@18.3.1/umd/react.production.min.js': '/vendor/react.production.min.js',
    'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js': '/vendor/react-dom.production.min.js'
  });
  // Empty photo slots render as plain brand-colour blocks on the live site.
  // Add ?slots to any URL to see the shot-list labels for each slot.
  try { window.ORYC_SHOW_SLOT_SPECS = new URLSearchParams(location.search).has('slots'); } catch (e) { window.ORYC_SHOW_SLOT_SPECS = false; }
})();
