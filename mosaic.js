// Home page header: a living contact sheet of choir photos.
// On the first visit of a browser session, a giant ORYC wordmark fills the header, then breaks
// apart: every tile flips over to reveal a photo, and the last tile flips back into a fixed ORYC tile.
// After that, tiles flip on random timers: single swaps, merges into bigger photos, and splits back
// into smaller ones. Each photo has a focal point and the tile shapes it is allowed to use, so faces
// stay in frame however it is cropped. Reduced-motion visitors get a still grid.
(function () {
  'use strict';
  if (window.__orycMosaic) return; window.__orycMosaic = true;

  // shapes: s = 1x1, w = 2x1 (wide), t = 1x2 (tall), b = 2x2 (big). fx/fy = focal point (0-1).
  const PHOTOS = [
    { src: 'photos/mosaic/01-jamie-leading.jpg', w: 1120, h: 1400, fx: 0.44, fy: 0.40, shapes: 'sbt', alt: "Jamie Loback leading a rehearsal beside the piano" },
    { src: 'photos/mosaic/02-james-window.jpg', w: 1120, h: 1400, fx: 0.40, fy: 0.30, shapes: 'bt', alt: "James Clemens laughing with choristers by a window" },
    { src: 'photos/mosaic/03-james-conversation.jpg', w: 1120, h: 1400, fx: 0.56, fy: 0.42, shapes: 'sbt', alt: "James Clemens in conversation at rehearsal" },
    { src: 'photos/mosaic/04-three-laughing.jpg', w: 1120, h: 1400, fx: 0.50, fy: 0.46, shapes: 'sbtw', alt: "Three members of the ORYC team sharing a laugh" },
    { src: 'photos/mosaic/05-folder-smile.jpg', w: 1120, h: 1400, fx: 0.43, fy: 0.40, shapes: 'sbt', alt: "A chorister smiling with her music folder between the pews" },
    { src: 'photos/mosaic/06-score-together.jpg', w: 1120, h: 1400, fx: 0.52, fy: 0.44, shapes: 'sbt', alt: "Matthew Menard and Jamie Loback laughing over a score" },
    { src: 'photos/mosaic/07-pew-chat.jpg', w: 1400, h: 933, fx: 0.52, fy: 0.55, shapes: 'w', alt: "Two choristers chatting across the pews" },
    { src: 'photos/mosaic/08-break-time.jpg', w: 1400, h: 933, fx: 0.55, fy: 0.45, shapes: 'wsb', alt: "Choristers laughing together on a rehearsal break" },
    { src: 'photos/mosaic/09-bootcamp-score.jpg', w: 933, h: 1400, fx: 0.55, fy: 0.37, shapes: 'sbt', alt: "A chorister with her score and pencil at a Saturday Bootcamp" },
    { src: 'photos/mosaic/10-jamie-conducting.jpg', w: 1400, h: 933, fx: 0.60, fy: 0.42, shapes: 'wsb', alt: "Jamie Loback conducting a rehearsal" },
    { src: 'photos/mosaic/11-concert-wide.jpg', w: 1400, h: 933, fx: 0.50, fy: 0.62, shapes: 'wb', alt: "The choir and chamber ensemble in concert by candlelight" },
    { src: 'photos/mosaic/12-chorister-smile.jpg', w: 1120, h: 1400, fx: 0.56, fy: 0.38, shapes: 'sbt', alt: "A smiling chorister among her section" },
    { src: 'photos/mosaic/13-rehearsal-sing.jpg', w: 1400, h: 934, fx: 0.50, fy: 0.48, shapes: 'wsb', alt: "Choristers singing in rehearsal as a student conducts" },
    { src: 'photos/mosaic/14-piano-sectional.jpg', w: 1400, h: 1049, fx: 0.50, fy: 0.55, shapes: 'wsb', alt: "A sectional gathered around the piano" },
    { src: 'photos/mosaic/15-dress-rehearsal.jpg', w: 1400, h: 787, fx: 0.50, fy: 0.58, shapes: 'wb', alt: "The choir and instrumentalists setting up for a dress rehearsal" },
    { src: 'photos/mosaic/16-concert-front.jpg', w: 1400, h: 933, fx: 0.50, fy: 0.52, shapes: 'wb', alt: "The choir performing in concert with the conductor in front" },
    { src: 'photos/mosaic/17-laughing-pair.jpg', w: 1120, h: 1400, fx: 0.53, fy: 0.42, shapes: 'sbtw', alt: "Two choristers laughing together with their folders" },
    { src: 'photos/mosaic/18-voice-lesson.jpg', w: 1120, h: 1400, fx: 0.46, fy: 0.44, shapes: 'sbt', alt: "A vocal instructor laughing during a lesson" },
    { src: 'photos/mosaic/19-candlelit-nave.jpg', w: 1400, h: 1049, fx: 0.50, fy: 0.64, shapes: 'wb', alt: "A candlelit concert seen from the back of the church" },
    { src: 'photos/mosaic/20-kyrie-score.jpg', w: 1120, h: 1400, fx: 0.58, fy: 0.42, shapes: 'sbt', alt: "A chorister holding the score of Misa a Buenos Aires" },
    { src: 'photos/mosaic/21-piano-circle.jpg', w: 1120, h: 1400, fx: 0.52, fy: 0.55, shapes: 'bt', alt: "Choristers gathered around the piano at rehearsal" },
    { src: 'photos/mosaic/22-office-sectional.jpg', w: 1400, h: 933, fx: 0.55, fy: 0.45, shapes: 'wsb', alt: "A sectional rehearsing in the music office at St. Joseph's" },
    { src: 'photos/mosaic/23-pencil-laugh.jpg', w: 1120, h: 1400, fx: 0.50, fy: 0.40, shapes: 'sbt', alt: "A chorister laughing with a pencil tucked behind her ear" },
    { src: 'photos/mosaic/24-curly-score.jpg', w: 1120, h: 1400, fx: 0.48, fy: 0.45, shapes: 'sbt', alt: "Choristers singing from their scores" },
    { src: 'photos/mosaic/25-risers-candles.jpg', w: 1120, h: 1400, fx: 0.52, fy: 0.42, shapes: 'sbt', alt: "The choir on the risers behind a row of candles" },
    { src: 'photos/mosaic/26-folder-pews.jpg', w: 1400, h: 933, fx: 0.48, fy: 0.48, shapes: 'wsb', alt: "A chorister smiling over her music folder in the pews" },
    { src: 'photos/mosaic/27-pointing-pews.jpg', w: 1120, h: 1400, fx: 0.36, fy: 0.55, shapes: 'sbt', alt: "A chorister laughing and pointing during a break" },
    { src: 'photos/mosaic/28-organist.jpg', w: 1120, h: 1400, fx: 0.62, fy: 0.48, shapes: 'sbt', alt: "The organist playing by lamplight in concert" },
    { src: 'photos/mosaic/29-baton-bokeh.jpg', w: 1120, h: 1400, fx: 0.44, fy: 0.42, shapes: 'sbt', alt: "Jamie Loback conducting with his baton raised" },
    { src: 'photos/mosaic/30-singer-profile.jpg', w: 1120, h: 1400, fx: 0.62, fy: 0.38, shapes: 'sbt', alt: "A tenor singing in concert" },
    { src: 'photos/mosaic/31-singer-glow.jpg', w: 1120, h: 1400, fx: 0.50, fy: 0.42, shapes: 'sbt', alt: "A chorister singing in concert, seen through the candlelight" },
    { src: 'photos/mosaic/32-conductor-strings.jpg', w: 1120, h: 1400, fx: 0.66, fy: 0.42, shapes: 'bt', alt: "Jamie Loback conducting the choir and string players" },
    { src: 'photos/mosaic/33-balcony-candles.jpg', w: 1120, h: 1400, fx: 0.52, fy: 0.62, shapes: 'sbtw', alt: "The candlelit concert seen from the balcony" }
  ];

  const SH = { s: [1, 1], w: [2, 1], t: [1, 2], b: [2, 2] };
  const RED = '#E41E26';
  const KEY = 'oryc-intro-played';
  const DEPTH = [10, -16, 14, -9];
  const motionOff = () => matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'off';
  const rand = (a, b) => a + Math.random() * (b - a);
  const randInt = (a, b) => Math.floor(rand(a, b + 1));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const wOrder = (items, weights) => { const out = [], it = items.slice(), wt = weights.slice(); while (it.length) { let t = wt.reduce((x, y) => x + y, 0), r = Math.random() * t, i = 0; for (; i < it.length - 1; i++) { if ((r -= wt[i]) <= 0) break; } out.push(it[i]); it.splice(i, 1); wt.splice(i, 1); } return out; };
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const imgCache = new Map();
  const loadImg = src => {
    if (!imgCache.has(src)) imgCache.set(src, new Promise(res => { const im = new Image(); im.onload = () => (im.decode ? im.decode().catch(() => {}) : Promise.resolve()).then(() => res(true)); im.onerror = () => res(false); im.src = src; }));
    return imgCache.get(src);
  };

  const CSS = `
.om{position:absolute;inset:0;overflow:hidden;background:${RED};transition:background-color .9s ease;contain:layout paint;}
.om.om-live{background:#fff;}
.om-tile{position:absolute;perspective:1400px;}
.om-card{position:absolute;inset:0;transform-style:preserve-3d;}
.om-face{position:absolute;inset:0;-webkit-backface-visibility:hidden;backface-visibility:hidden;overflow:hidden;}
.om-front.om-slice{inset:-.5px;}
.om-ph{position:absolute;inset:2px;overflow:hidden;background:#DFEDEA;}
.om-img{position:absolute;inset:0;background-repeat:no-repeat;transition:transform .9s cubic-bezier(.2,.7,.2,1);}
.om-tile:hover .om-img{transform:scale(1.045);}
.om-layer{position:absolute;display:flex;align-items:center;justify-content:center;background:${RED};color:#fff;font-family:'Glacial Indifference',sans-serif;font-weight:700;letter-spacing:-.03em;line-height:.78;white-space:nowrap;}
.om-layer span,.om-logo span{display:inline-block;transform:translate(calc(var(--mx,0) * var(--d) * 1px),calc(var(--my,0) * var(--d) * 1px));}
.om-logo{position:absolute;inset:2px;background:${RED};color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;font-family:'Glacial Indifference',sans-serif;font-weight:700;line-height:.8;letter-spacing:-.02em;}
.om-logo div{display:flex;}
.om-flipper .om-card{transition:transform .7s cubic-bezier(.2,.7,.2,1);}
.om-flipper.om-flip .om-card{transform:rotateY(180deg);}
.om-flipper{cursor:pointer;}
.om-hint{position:absolute;left:50%;bottom:9%;transform:translateX(-50%);font-family:'Glacial Indifference',sans-serif;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#fff;opacity:.85;white-space:nowrap;display:flex;align-items:center;gap:.5em;}
.om-back{position:absolute;inset:2px;background:#000;color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;font-family:'Glacial Indifference',sans-serif;}
.om-back p{margin:0;font-style:italic;font-weight:700;line-height:1.1;}
.om-back nav{display:flex;flex-direction:column;align-items:stretch;}
.om-btn{display:flex;align-items:center;justify-content:center;border-radius:999px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;white-space:nowrap;border:2px solid #fff;transition:background-color .25s,color .25s,border-color .25s,transform .25s;}
.om-btn:hover{transform:translateY(-2px);}
.om-btn-a{background:${RED};border-color:${RED};color:#fff;}.om-btn-a:hover{background:#fff;border-color:#fff;color:#000;}
.om-btn-b{background:transparent;color:#fff;}.om-btn-b:hover{background:#fff;color:#000;}
@media (prefers-reduced-motion: reduce){.om-flipper .om-card{transition:none;}}
`;

  function letters(extra) {
    return ['O', 'R', 'Y', 'C'].map((ch, i) => `<span style="--d:${DEPTH[i] * (extra || 1)};${ch === 'R' ? 'margin-left:-.15em;opacity:.8;' : ''}">${ch}</span>`).join('');
  }

  function bgFor(p, tw, th) {
    const sc = Math.max(tw / p.w, th / p.h), sw = p.w * sc, sh = p.h * sc;
    const x = Math.min(0, Math.max(tw - sw, tw / 2 - p.fx * sw)), y = Math.min(0, Math.max(th - sh, th / 2 - p.fy * sh));
    return `background-image:url('${p.src}');background-size:${sw.toFixed(1)}px ${sh.toFixed(1)}px;background-position:${x.toFixed(1)}px ${y.toFixed(1)}px;`;
  }

  function Mosaic(host) {
    const root = document.createElement('div');
    root.className = 'om';
    host.appendChild(root);
    let G, grid, tiles, logoEl, nextId = 1, timer = 0, busy = false, live = false, visible = true, destroyed = false;
    const recent = [];

    function geometry() {
      // Roughly square cells: 3 rows on wide screens, 4 columns on phones (more rows if the header is tall).
      const W = host.clientWidth, H = host.clientHeight;
      const cell = W < 700 ? W / 4 : H / 3;
      const cols = Math.min(16, Math.max(4, Math.round(W / Math.max(cell, 1))));
      const rows = Math.min(5, Math.max(3, Math.round(H / Math.max(cell, 1))));
      const lc = cols >= 7 ? 1 : 0;
      return { W, H, rows, cols, cw: W / cols, ch: H / rows, logo: { c: lc, r: 0, w: 2, h: 2 } };
    }
    const rect = (c, r, shape) => { const [w, h] = SH[shape] || shape; return { x: c * G.cw, y: r * G.ch, w: w * G.cw, h: h * G.ch }; };
    const fits = (c, r, shape) => { const [w, h] = SH[shape]; if (c + w > G.cols || r + h > G.rows) return false; for (let y = r; y < r + h; y++) for (let x = c; x < c + w; x++) if (grid[y][x] !== null) return false; return true; };
    const occupy = (t, val) => { const [w, h] = SH[t.shape]; for (let y = t.r; y < t.r + h; y++) for (let x = t.c; x < t.c + w; x++) grid[y][x] = val; };
    const inUse = () => new Set([...tiles.values()].map(t => t.photo));

    function choosePhoto(shape, exclude) {
      const used = inUse(); exclude = exclude || new Set();
      let cands = PHOTOS.map((p, i) => i).filter(i => PHOTOS[i].shapes.includes(shape) && !used.has(i) && !exclude.has(i));
      if (!cands.length) return null;
      const fresh = cands.filter(i => !recent.includes(i));
      return pick(fresh.length ? fresh : cands);
    }
    const remember = i => { recent.push(i); if (recent.length > 6) recent.shift(); };

    function layout() {
      grid = Array.from({ length: G.rows }, () => Array(G.cols).fill(null));
      const L = G.logo; for (let y = L.r; y < L.r + L.h; y++) for (let x = L.c; x < L.c + L.w; x++) grid[y][x] = 'logo';
      const specs = []; const taken = new Set();
      for (let r = 0; r < G.rows; r++) for (let c = 0; c < G.cols; c++) {
        if (grid[r][c] !== null) continue;
        let placed = false;
        for (const shape of wOrder(['b', 'w', 't', 's'], [0.34, 0.3, 0.16, 0.2])) {
          if (!fits(c, r, shape)) continue;
          const cands = PHOTOS.map((p, i) => i).filter(i => PHOTOS[i].shapes.includes(shape) && !taken.has(i));
          if (!cands.length) continue;
          const photo = pick(cands); taken.add(photo);
          const t = { c, r, shape, photo }; specs.push(t); occupy(t, 'x'); placed = true; break;
        }
        if (!placed) { const photo = pick(PHOTOS.map((p, i) => i).filter(i => PHOTOS[i].shapes.includes('s'))); const t = { c, r, shape: 's', photo }; specs.push(t); occupy(t, 'x'); }
      }
      return specs;
    }

    function tileEl(spec, withSlice) {
      const R = rect(spec.c, spec.r, spec.shape), p = PHOTOS[spec.photo];
      const el = document.createElement('div'); el.className = 'om-tile'; el.setAttribute('aria-hidden', 'true');
      el.style.cssText = `left:${R.x}px;top:${R.y}px;width:${R.w}px;height:${R.h}px;`;
      const photo = `<div class="om-ph"><div class="om-img" style="${bgFor(p, R.w - 4, R.h - 4)}"></div></div>`;
      el.innerHTML = withSlice
        ? `<div class="om-card"><div class="om-face om-front om-slice">${sliceHTML(R)}</div><div class="om-face" style="transform:rotateY(180deg)">${photo}</div></div>`
        : `<div class="om-card"><div class="om-face">${photo}</div></div>`;
      el.addEventListener('pointerenter', () => { const t = tiles.get(spec.id); if (t) t.hover = true; });
      el.addEventListener('pointerleave', () => { const t = tiles.get(spec.id); if (t) t.hover = false; });
      return el;
    }
    function sliceHTML(R) {
      const F = Math.min(G.H * 0.98, G.W / 2.8);
      return `<div class="om-layer" style="left:${-R.x}px;top:${-R.y}px;width:${G.W}px;height:${G.H}px;font-size:${F}px;"><div style="display:flex;transform:translateY(4%)">${letters()}</div></div>`;
    }
    function logoHTML() {
      const R = rect(G.logo.c, G.logo.r, [G.logo.w, G.logo.h]); const f = Math.min(R.w, R.h) * 0.36;
      return `<div class="om-logo" style="font-size:${f}px"><div><span style="--d:4">O</span><span style="--d:-6;margin-left:-.15em;opacity:.8">R</span></div><div><span style="--d:5">Y</span><span style="--d:-3">C</span></div></div>`;
    }
    function frontHTML() {
      const R = rect(G.logo.c, G.logo.r, [G.logo.w, G.logo.h]); const f = Math.min(R.w, R.h);
      return logoHTML().replace(/<\/div>$/, `<span class="om-hint" aria-hidden="true" style="font-size:${Math.max(10, f * 0.032)}px">Sing with us <svg width="1.1em" height="1.1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg></span></div>`);
    }
    function backHTML() {
      const R = rect(G.logo.c, G.logo.r, [G.logo.w, G.logo.h]); const f = Math.min(R.w, R.h);
      const bh = Math.max(36, f * 0.12), bf = Math.max(11, f * 0.034), pad = Math.max(14, f * 0.07);
      return `<div class="om-back" style="gap:${Math.max(12, f * 0.06)}px;padding:${pad}px;"><p style="font-size:${Math.max(15, f * 0.075)}px">Young Ottawa voices, <span style="white-space:nowrap">15–25.</span></p><nav aria-label="Get involved" style="gap:${Math.max(8, f * 0.025)}px;width:min(100%, ${Math.max(170, f * 0.62)}px)"><a class="om-btn om-btn-a" href="/sing" style="min-height:${bh}px;font-size:${bf}px;padding:0 ${bf * 1.4}px">Join the Choir</a><a class="om-btn om-btn-b" href="/events" style="min-height:${bh}px;font-size:${bf}px;padding:0 ${bf * 1.4}px">See the Season</a></nav></div>`;
    }

    function addTile(spec, withSlice) {
      spec.id = nextId++; spec.el = tileEl(spec, withSlice); spec.card = spec.el.firstChild;
      tiles.set(spec.id, spec); occupy(spec, spec.id); root.appendChild(spec.el); remember(spec.photo);
      return spec;
    }
    function addLogo(withSlice) {
      const R = rect(G.logo.c, G.logo.r, [G.logo.w, G.logo.h]);
      logoEl = document.createElement('div'); logoEl.className = 'om-tile'; logoEl.setAttribute('aria-hidden', 'true');
      logoEl.style.cssText = `left:${R.x}px;top:${R.y}px;width:${R.w}px;height:${R.h}px;z-index:2;`;
      logoEl.innerHTML = withSlice
        ? `<div class="om-card"><div class="om-face om-front om-slice">${sliceHTML(R)}</div><div class="om-face" style="transform:rotateY(180deg)">${logoHTML()}</div></div>`
        : `<div class="om-card"><div class="om-face">${frontHTML()}</div><div class="om-face" style="transform:rotateY(180deg)">${backHTML()}</div></div>`;
      root.appendChild(logoEl);
      if (!withSlice) makeFlippable(logoEl);
    }
    // ORYC tile: hover (desktop) or tap (touch) flips it to the Join / Season buttons.
    // Keyboard focus on a button flips it too; tapping elsewhere or Esc flips it back.
    function makeFlippable(el) {
      el.classList.add('om-flipper'); el.removeAttribute('aria-hidden');
      el.setAttribute('role', 'group'); el.setAttribute('aria-label', 'Join the choir or see the season');
      const front = el.querySelector('.om-card > .om-face'); front.setAttribute('aria-hidden', 'true');
      const hover = () => matchMedia('(hover: hover) and (pointer: fine)').matches;
      const set = on => el.classList.toggle('om-flip', on);
      el.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse' && hover()) set(true); });
      el.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse' && hover() && !el.contains(document.activeElement)) set(false); });
      el.addEventListener('click', e => { if (e.target.closest('a')) return; if (!hover() || e.pointerType !== 'mouse') set(!el.classList.contains('om-flip')); });
      el.addEventListener('focusin', () => set(true));
      el.addEventListener('focusout', e => { if (!el.contains(e.relatedTarget) && !el.matches(':hover')) set(false); });
      el.addEventListener('keydown', e => { if (e.key === 'Escape') { set(false); document.activeElement && document.activeElement.blur(); } });
      const outside = e => { if (!el.isConnected) return document.removeEventListener('pointerdown', outside); if (!el.contains(e.target)) set(false); };
      document.addEventListener('pointerdown', outside);
    }

    function build(withSlice) {
      G = geometry(); tiles = new Map(); root.innerHTML = '';
      const specs = layout();
      grid = Array.from({ length: G.rows }, () => Array(G.cols).fill(null));
      const L = G.logo; for (let y = L.r; y < L.r + L.h; y++) for (let x = L.c; x < L.c + L.w; x++) grid[y][x] = 'logo';
      specs.forEach(s => addTile(s, withSlice));
      addLogo(withSlice);
    }

    // ---- living operations ----
    const eligible = t => !t.hover && !t.busy && (performance.now() - (t.born || 0)) > 5000;
    function opSwap() {
      const ts = shuffle([...tiles.values()].filter(eligible));
      for (const t of ts) { const ph = choosePhoto(t.shape); if (ph != null) return { remove: [t], add: [{ c: t.c, r: t.r, shape: t.shape, photo: ph }] }; }
      return null;
    }
    function opMerge() {
      for (let k = 0; k < 40; k++) {
        const shape = pick(['b', 'b', 'w', 'w', 't']); const [w, h] = SH[shape];
        const c = randInt(0, G.cols - w), r = randInt(0, G.rows - h);
        const ids = new Set(); let ok = true;
        for (let y = r; y < r + h && ok; y++) for (let x = c; x < c + w; x++) { const v = grid[y][x]; if (v === 'logo' || v === null) { ok = false; break; } ids.add(v); }
        if (!ok || ids.size < 2) continue;
        const parts = [...ids].map(id => tiles.get(id));
        if (!parts.every(t => { const [tw, th] = SH[t.shape]; return t.c >= c && t.r >= r && t.c + tw <= c + w && t.r + th <= r + h && eligible(t); })) continue;
        const ph = choosePhoto(shape, new Set(parts.map(t => t.photo)));
        if (ph == null) continue;
        return { remove: parts, add: [{ c, r, shape, photo: ph }] };
      }
      return null;
    }
    const SPLITS = {
      b: [[['s', 0, 0], ['s', 1, 0], ['s', 0, 1], ['s', 1, 1]], [['w', 0, 0], ['w', 0, 1]], [['t', 0, 0], ['t', 1, 0]], [['w', 0, 0], ['s', 0, 1], ['s', 1, 1]], [['s', 0, 0], ['s', 1, 0], ['w', 0, 1]], [['t', 0, 0], ['s', 1, 0], ['s', 1, 1]], [['s', 0, 0], ['s', 0, 1], ['t', 1, 0]]],
      w: [[['s', 0, 0], ['s', 1, 0]]], t: [[['s', 0, 0], ['s', 0, 1]]]
    };
    function opSplit() {
      const ts = shuffle([...tiles.values()].filter(t => t.shape !== 's' && eligible(t)));
      for (const t of ts) for (const pat of shuffle(SPLITS[t.shape])) {
        const ex = new Set([t.photo]), add = [];
        for (const [shape, dx, dy] of pat) { const ph = choosePhoto(shape, ex); if (ph == null) { add.length = 0; break; } ex.add(ph); add.push({ c: t.c + dx, r: t.r + dy, shape, photo: ph }); }
        if (add.length === pat.length) return { remove: [t], add };
      }
      return null;
    }
    function nextOp() {
      const n = tiles.size, target = (G.cols * G.rows - 4) / 2.3;
      const order = wOrder([opSwap, opMerge, opSplit], [0.34, n > target ? 0.5 : 0.25, n < target ? 0.5 : 0.25]);
      for (const f of order) { const op = f(); if (op) return op; }
      return null;
    }

    async function apply(op) {
      busy = true;
      op.remove.forEach(t => { t.busy = true; });
      await Promise.all(op.add.map(a => loadImg(PHOTOS[a.photo].src)));
      if (destroyed) return;
      const box = op.add.length === 1 ? SH[op.add[0].shape] : [2, 1];
      const ax = box[0] >= box[1] ? (Math.random() < 0.75 ? 'Y' : 'X') : 'X';
      const out = op.remove.map((t, i) => t.card.animate([{ transform: `rotate${ax}(0deg)` }, { transform: `rotate${ax}(90deg)` }], { duration: 300, delay: i * 80, easing: 'cubic-bezier(.55,0,.8,.3)', fill: 'forwards' }).finished);
      await Promise.all(out);
      op.remove.forEach(t => { occupy(t, null); tiles.delete(t.id); t.el.remove(); });
      const born = performance.now();
      const added = op.add.map(a => { const t = addTile(a, false); t.born = born; return t; });
      await Promise.all(added.map((t, i) => t.card.animate([{ transform: `rotate${ax}(-90deg)` }, { transform: `rotate${ax}(0deg)` }], { duration: 420, delay: i * 90, easing: 'cubic-bezier(.2,.8,.3,1)', fill: 'backwards' }).finished));
      busy = false;
    }

    function schedule() { clearTimeout(timer); if (!host.isConnected) { destroyed = true; return; } if (live && !destroyed) timer = setTimeout(tick, rand(1800, 4200)); }
    async function tick() {
      if (!visible || document.hidden || busy || motionOff()) return schedule();
      const op = nextOp(); if (op) { try { await apply(op); } catch (e) { busy = false; } }
      schedule();
    }

    // ---- cursor drift on the ORYC letters ----
    let tx = 0, ty = 0, mx = 0, my = 0, raf = 0;
    const drift = () => { mx += (tx - mx) * 0.08; my += (ty - my) * 0.08; root.style.setProperty('--mx', mx.toFixed(3)); root.style.setProperty('--my', my.toFixed(3)); raf = (Math.abs(tx - mx) > 0.002 || Math.abs(ty - my) > 0.002) ? requestAnimationFrame(drift) : 0; };
    const kick = () => { if (!raf) raf = requestAnimationFrame(drift); };
    host.addEventListener('pointermove', e => { if (motionOff() || !matchMedia('(hover: hover)').matches) return; const r = host.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width * 2 - 1; ty = (e.clientY - r.top) / r.height * 2 - 1; kick(); });
    host.addEventListener('pointerleave', () => { tx = 0; ty = 0; kick(); });

    async function intro() {
      build(true);
      await Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), sleep(1200)]);
      const spans = [...root.querySelectorAll('.om-slice .om-layer span')];
      const byLetter = i => spans.filter((s, k) => k % 4 === i);
      [0, 1, 2, 3].forEach(i => byLetter(i).forEach(s => s.animate([{ opacity: 0, translate: '0 40px' }, { opacity: i === 1 ? 0.8 : 1, translate: '0 0' }], { duration: 750, delay: i * 90, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' })));
      const first = [...tiles.values()].map(t => loadImg(PHOTOS[t.photo].src));
      await Promise.all([sleep(1700), Promise.race([Promise.all(first), sleep(4000)])]);
      if (destroyed) return;
      const all = [...tiles.values()];
      const flips = all.map(t => { const R = rect(t.c, t.r, t.shape); const d = (R.x + R.w / 2) / G.W * 750 + rand(0, 160); return t.card.animate([{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(180deg)' }], { duration: 760, delay: d, easing: 'cubic-bezier(.65,0,.25,1)', fill: 'forwards' }).finished; });
      flips.push(logoEl.firstChild.animate([{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(180deg)' }], { duration: 760, delay: 1150, easing: 'cubic-bezier(.65,0,.25,1)', fill: 'forwards' }).finished);
      setTimeout(() => root.classList.add('om-live'), 500);
      await Promise.all(flips);
      if (destroyed) return;
      // Swap the double-sided intro tiles for plain photo tiles (no visible change).
      const specs = all.map(t => ({ c: t.c, r: t.r, shape: t.shape, photo: t.photo }));
      root.innerHTML = ''; tiles = new Map();
      grid = Array.from({ length: G.rows }, () => Array(G.cols).fill(null));
      const L = G.logo; for (let y = L.r; y < L.r + L.h; y++) for (let x = L.c; x < L.c + L.w; x++) grid[y][x] = 'logo';
      specs.forEach(s => addTile(s, false)); addLogo(false);
      goLive();
    }
    function goLive() {
      root.classList.add('om-live'); live = true;
      // Warm the cache for the rest of the pool in the background.
      setTimeout(() => PHOTOS.forEach(p => loadImg(p.src)), 1500);
      if (!motionOff()) schedule();
    }
    function startStatic(fade) {
      build(false); root.classList.add('om-live');
      if (fade && !motionOff()) [...root.children].forEach((el, i) => el.animate([{ opacity: 0, transform: 'scale(.96)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 600, delay: i * 40, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }));
      goLive();
    }

    let played = false; try { played = sessionStorage.getItem(KEY) === '1'; } catch (e) {}
    if (played || motionOff()) startStatic(!motionOff());
    else { try { sessionStorage.setItem(KEY, '1'); } catch (e) {} intro(); }

    new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(host);
    let rt = 0, lastW = host.clientWidth, lastH = host.clientHeight;
    new ResizeObserver(() => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        if (!live || (Math.abs(host.clientWidth - lastW) < 2 && Math.abs(host.clientHeight - lastH) < 2)) return;
        lastW = host.clientWidth; lastH = host.clientHeight; clearTimeout(timer); busy = false; build(false); root.classList.add('om-live'); schedule();
      }, 250);
    }).observe(host);
  }

  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  // Attach to the header that is actually rendered (the page's raw template holds an unrendered copy
  // with the same id), and keep watching in case the page re-renders it.
  const boot = () => {
    document.querySelectorAll('#photo-mosaic').forEach(h => {
      if (h.__om || !h.isConnected || !h.getClientRects().length || h.clientWidth < 50 || h.clientHeight < 50) return;
      h.__om = true; Mosaic(h);
    });
  };
  let pend = 0;
  const watch = () => { boot(); new MutationObserver(() => { if (!pend) pend = requestAnimationFrame(() => { pend = 0; boot(); }); }).observe(document.body, { childList: true, subtree: true }); window.addEventListener('resize', boot); };
  document.body ? watch() : document.addEventListener('DOMContentLoaded', watch);
})();
