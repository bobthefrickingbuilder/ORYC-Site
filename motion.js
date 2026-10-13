// ORYC motion layer. Attribute-driven, Web Animations API only (never rewrites React-managed styles except `translate`).
// data-reveal[=fade|scale] data-delay · data-stagger (children reveal) · data-countup=N · data-sweep (highlight)
// data-magnetic · data-parallax-root + data-depth · data-spin=s · data-float · data-marquee=s · data-hover-root + data-hover-drop
// data-enter (animates on mount) · data-drag-scroll · data-title (heading whose words carry their own reveal/depth; skipped by data-stagger). Honors prefers-reduced-motion and <html data-motion="full|subtle|off">.
(function () {
  if (window.__orycMotion) return; window.__orycMotion = true;
  const rm = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const lvl = () => rm.matches ? 'off' : (document.documentElement.dataset.motion || 'full');
  const EASE = 'cubic-bezier(.2,.7,.2,1)';
  const anims = new Set(), touched = new Set();
  const track = a => (anims.add(a), a);
  const once = (el, k) => { el.__oy = el.__oy || {}; if (el.__oy[k]) return true; el.__oy[k] = 1; touched.add(el); return false; };
  const bind = (el, k) => { el.__oyL = el.__oyL || {}; if (el.__oyL[k]) return true; el.__oyL[k] = 1; return false; };

  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; io.unobserve(e.target);
    (e.target.__oyGo || []).forEach(f => f()); e.target.__oyGo = [];
  }), { threshold: 0, rootMargin: '0px 0px -8% 0px' });
  const onView = (el, f) => { (el.__oyGo = el.__oyGo || []).push(f); touched.add(el); io.observe(el); };

  function reveal(el, delay, kind) {
    const k = kind === 'fade' ? [{ opacity: 0 }, { opacity: 1 }]
      : kind === 'scale' ? [{ opacity: 0, scale: '.85' }, { opacity: 1, scale: '1' }]
      : [{ opacity: 0, translate: '0 36px' }, { opacity: 1, translate: '0 0' }];
    const a = track(el.animate(k, { duration: 850, delay, easing: EASE, fill: 'backwards' }));
    a.pause(); onView(el, () => a.play());
  }

  function scan(root) {
    const q = s => root.querySelectorAll(s);
    q('[data-drag-scroll]').forEach(el => {
      if (bind(el, 'd')) return;
      let sx = 0, sl = 0, down = false, moved = false, snap = '';
      el.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' || e.button !== 0) return; down = true; moved = false; sx = e.clientX; sl = el.scrollLeft; });
      el.addEventListener('selectstart', e => { if (down) e.preventDefault(); });
      window.addEventListener('pointermove', e => {
        if (!down) return; const dx = e.clientX - sx;
        if (!moved && Math.abs(dx) > 6) { moved = true; snap = el.style.scrollSnapType; el.style.scrollSnapType = 'none'; el.style.cursor = 'grabbing'; }
        if (moved) el.scrollLeft = sl - dx;
      });
      window.addEventListener('pointerup', () => { if (!down) return; down = false; if (moved) { el.style.scrollSnapType = snap; el.style.cursor = ''; setTimeout(() => moved = false, 0); } });
      el.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
      el.addEventListener('dragstart', e => e.preventDefault());
    });

    const L = lvl(); if (L === 'off') return;

    q('[data-reveal]').forEach(el => { if (!once(el, 'r')) reveal(el, +el.dataset.delay || 0, el.dataset.reveal); });
    q('[data-stagger]').forEach(el => {
      if (once(el, 's')) return;
      [...el.children].filter(c => !c.hasAttribute('data-stagger') && !c.hasAttribute('data-reveal') && !c.hasAttribute('data-title') && getComputedStyle(c).position !== 'absolute')
        .forEach((c, i) => { if (!once(c, 'r')) reveal(c, (i % 4) * 100, el.dataset.stagger); });
    });
    q('[data-countup]').forEach(el => {
      const tn = [...el.childNodes].find(n => n.nodeType === 3); if (!tn || once(el, 'c')) return;
      const target = parseFloat(el.dataset.countup); el.__oyTN = tn; el.__oyTxt = tn.nodeValue; tn.nodeValue = '0';
      onView(el, () => { const t0 = performance.now(); const step = t => { const p = Math.min(1, (t - t0) / 1600); tn.nodeValue = String(Math.round(target * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); });
    });
    q('[data-sweep]').forEach(el => {
      if (once(el, 'w')) return;
      const a = track(el.animate([{ backgroundSize: '0% 100%' }, { backgroundSize: '100% 100%' }], { duration: 900, delay: 500, easing: EASE, fill: 'backwards' }));
      a.pause(); onView(el, () => a.play());
    });
    q('[data-enter]').forEach(el => { if (!once(el, 'e')) track(el.animate([{ opacity: 0, translate: '0 -10px' }, { opacity: 1, translate: '0 0' }], { duration: 420, easing: EASE })); });

    q('[data-magnetic]').forEach(el => {
      if (bind(el, 'm')) return;
      el.addEventListener('pointermove', e => {
        if (!fine.matches || lvl() !== 'full') return;
        const r = el.getBoundingClientRect();
        el.style.translate = ((e.clientX - r.left - r.width / 2) * .25).toFixed(1) + 'px ' + ((e.clientY - r.top - r.height / 2) * .35).toFixed(1) + 'px';
        touched.add(el);
      });
      el.addEventListener('pointerleave', () => {
        const cur = el.style.translate; if (!cur) return; el.style.translate = '';
        el.animate([{ translate: cur }, { translate: '0 0' }], { duration: 600, easing: 'cubic-bezier(.3,1.6,.5,1)' });
      });
    });
    q('[data-parallax-root]').forEach(root => {
      if (bind(root, 'p')) return;
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
      const tick = () => {
        cx += (tx - cx) * .07; cy += (ty - cy) * .07;
        root.querySelectorAll('[data-depth]').forEach(it => { const d = +it.dataset.depth; it.style.translate = (cx * d).toFixed(2) + 'px ' + (cy * d).toFixed(2) + 'px'; touched.add(it); });
        raf = (Math.abs(tx - cx) > .002 || Math.abs(ty - cy) > .002) ? requestAnimationFrame(tick) : 0;
      };
      const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
      root.addEventListener('pointermove', e => { if (!fine.matches || lvl() !== 'full') return; const r = root.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width * 2 - 1; ty = (e.clientY - r.top) / r.height * 2 - 1; kick(); });
      root.addEventListener('pointerleave', () => { tx = 0; ty = 0; kick(); });
    });
    q('[data-hover-root]').forEach(root => {
      if (bind(root, 'h')) return;
      root.addEventListener('pointerenter', () => {
        if (lvl() === 'off') return; const el = root.querySelector('[data-hover-drop]'); if (!el) return;
        if (!root.__oyH) { root.__oyH = track(el.animate([{ translate: '0 0' }, { translate: '0 14px' }], { duration: 420, easing: 'cubic-bezier(.3,1.5,.5,1)', fill: 'forwards' })); touched.add(root); }
        else { root.__oyH.playbackRate = 1; root.__oyH.play(); }
      });
      root.addEventListener('pointerleave', () => { if (root.__oyH) { root.__oyH.playbackRate = -1; root.__oyH.play(); } });
    });

    if (L !== 'full') return;
    q('[data-spin]').forEach(el => { if (!once(el, 'sp')) track(el.animate([{ rotate: '0deg' }, { rotate: '360deg' }], { duration: (+el.dataset.spin || 60) * 1000, iterations: Infinity })); });
    q('[data-float]').forEach((el, i) => { if (!once(el, 'f')) track(el.animate([{ translate: '0 0' }, { translate: '0 -16px' }], { duration: 2400 + (i % 3) * 600, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' })); });
    q('[data-marquee]').forEach(el => {
      const t = el.firstElementChild; if (!t || once(el, 'mq')) return;
      el.__oyMq = track(t.animate([{ translate: '0 0' }, { translate: '-50% 0' }], { duration: (+el.dataset.marquee || 40) * 1000, iterations: Infinity }));
      if (!bind(el, 'mq')) { el.addEventListener('pointerenter', () => el.__oyMq && (el.__oyMq.playbackRate = .2)); el.addEventListener('pointerleave', () => el.__oyMq && (el.__oyMq.playbackRate = 1)); }
    });
  }

  function reset() {
    anims.forEach(a => a.cancel()); anims.clear();
    touched.forEach(el => {
      if (el.__oyTN) { el.__oyTN.nodeValue = el.__oyTxt; delete el.__oyTN; }
      if (el.style.translate) el.style.translate = '';
      delete el.__oy; delete el.__oyH; delete el.__oyMq; el.__oyGo = []; io.unobserve(el);
    });
    touched.clear();
  }
  const rescan = () => { reset(); scan(document); };
  rm.addEventListener('change', rescan);
  new MutationObserver(rescan).observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });

  let pend = 0;
  const mo = new MutationObserver(() => { if (!pend) pend = requestAnimationFrame(() => { pend = 0; scan(document); }); });
  const start = () => { scan(document); mo.observe(document.body, { childList: true, subtree: true }); };
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
