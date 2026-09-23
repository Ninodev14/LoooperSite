(function () {
  const COLORS = ['#bb6ef6', '#f6b254', '#3c61f5'];
  const DURATION = 1000;
  const KEY = 'loooperTransition';
  let transitioning = false;

  function unhide() {
    const s = document.getElementById('ptr-hide');
    if (s) s.remove();
    document.documentElement.style.visibility = 'visible';
  }

  function makeOverlay(color, xPct, yPct, covered) {
    const el = document.createElement('div');
    el.id = 'page-transition-overlay';
    Object.assign(el.style, {
      position: 'fixed', inset: '0', zIndex: '999999999',
      background: color, pointerEvents: 'none',
      clipPath: `circle(${covered ? '150vmax' : '0%'} at ${xPct}% ${yPct}%)`,
      WebkitClipPath: `circle(${covered ? '150vmax' : '0%'} at ${xPct}% ${yPct}%)`,
      transition: `clip-path ${DURATION}ms cubic-bezier(.76,0,.24,1)`
    });
    document.documentElement.appendChild(el);
    return el;
  }

  let incoming = null;
  try { incoming = JSON.parse(sessionStorage.getItem(KEY)); } catch (e) {}

  if (incoming) {
    const el = makeOverlay(incoming.color, incoming.x, incoming.y, true);
    unhide(); 

    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.clipPath = `circle(0% at ${incoming.x}% ${incoming.y}%)`;
      el.style.WebkitClipPath = `circle(0% at ${incoming.x}% ${incoming.y}%)`;
    }));
    setTimeout(() => el.remove(), DURATION + 50);
    sessionStorage.removeItem(KEY);
  } else {
    unhide();
  }

  function leave(url, x, y) {
    transitioning = true;

    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const xPct = (x / window.innerWidth) * 100;
    const yPct = (y / window.innerHeight) * 100;
    sessionStorage.setItem(KEY, JSON.stringify({ color, x: xPct, y: yPct }));

    const el = makeOverlay(color, xPct, yPct, false);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.clipPath = `circle(150vmax at ${xPct}% ${yPct}%)`;
      el.style.WebkitClipPath = `circle(150vmax at ${xPct}% ${yPct}%)`;
    }));
    setTimeout(() => { window.location.href = url; }, DURATION);
  }

  document.addEventListener('click', (e) => {
    if (transitioning) { e.preventDefault(); return; }

    const link = e.target.closest('a[href]');
    if (!link) return;

    const url = link.getAttribute('href');
    const sameOrigin = link.origin === window.location.origin;
    const isHash = url.startsWith('#');
    const isModified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
    const newTab = link.target === '_blank';

    if (!sameOrigin || isHash || isModified || newTab) return;

    e.preventDefault();
    leave(url, e.clientX, e.clientY);
  }, true);

  setTimeout(unhide, 1000);
})();