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

// Smooth in-page navigation. Links to a section on the current page (e.g. /about#team while on
// About) glide there instead of jumping, and stop just below the sticky header. Arriving from
// another page with a #section also lands below the header. Reduced-motion users get an instant jump.
(function () {
  const norm = p => { p = p.toLowerCase().replace(/\.dc\.html$/, '').replace(/\/+$/, ''); return (p === '' || p === '/home') ? '/' : p; };
  const headerOffset = () => {
    const h = [...document.querySelectorAll('header, [style*="sticky"]')].find(el => getComputedStyle(el).position === 'sticky');
    return h ? h.getBoundingClientRect().height : 0;
  };
  const goTo = (el, smooth) => {
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset() - 16;
    const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: Math.max(0, top), behavior: smooth && !rm ? 'smooth' : 'auto' });
    if (!el.matches('a,button,input,select,textarea,[tabindex]')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  };
  document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest('a[href*="#"]');
    if (!a || (a.target && a.target !== '_self')) return;
    let url; try { url = new URL(a.getAttribute('href'), location.href); } catch (_) { return; }
    if (url.origin !== location.origin || !url.hash || norm(url.pathname) !== norm(location.pathname)) return;
    const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!el) return;
    e.preventDefault();
    if (location.hash !== url.hash) history.pushState(null, '', location.pathname + location.search + url.hash);
    goTo(el, true);
  });
  window.addEventListener('popstate', () => {
    const el = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (el) goTo(el, true);
  });
  // Arriving with a #section: the page renders after load, so wait for the target to exist.
  if (location.hash) {
    let tries = 0;
    const t = setInterval(() => {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (el || ++tries > 40) { clearInterval(t); if (el) setTimeout(() => goTo(el, false), 150); }
    }, 100);
  }
})();
