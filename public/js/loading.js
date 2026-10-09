(function () {
  const COLORS = ['#bb6ef6', '#f6b254', '#3c61f5'];
  const DURATION = 700;
  const KEY = 'loooperTransition';
  let transitioning = false;

  function unhide() {
    const s = document.getElementById('ptr-hide');
    if (s) s.remove();
    document.documentElement.style.visibility = 'visible';
  }

  function removeOverlay() {
    const o = document.getElementById('page-transition-overlay');
    if (o) o.remove();
  }

  function makeOverlay(color, xPct, yPct, covered) {
    removeOverlay(); // évite les doublons
    const el = document.createElement('div');
    el.id = 'page-transition-overlay';
    Object.assign(el.style, {
      position: 'fixed',
      inset: '0',
      zIndex: '999999999',
      background: color,
      pointerEvents: 'none',
      clipPath: `circle(${covered ? '150vmax' : '0%'} at ${xPct}% ${yPct}%)`,
      WebkitClipPath: `circle(${covered ? '150vmax' : '0%'} at ${xPct}% ${yPct}%)`,
      transition: `clip-path ${DURATION}ms cubic-bezier(.76,0,.24,1)`,
    });
    document.documentElement.appendChild(el);
    return el;
  }

  let incoming = null;
  try {
    incoming = JSON.parse(sessionStorage.getItem(KEY));
  } catch (e) {}

  if (incoming) {
    const el = makeOverlay(incoming.color, incoming.x, incoming.y, true);
    unhide();
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        el.style.clipPath = `circle(0% at ${incoming.x}% ${incoming.y}%)`;
        el.style.WebkitClipPath = `circle(0% at ${incoming.x}% ${incoming.y}%)`;
      }),
    );
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
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        el.style.clipPath = `circle(150vmax at ${xPct}% ${yPct}%)`;
        el.style.WebkitClipPath = `circle(150vmax at ${xPct}% ${yPct}%)`;
      }),
    );
    setTimeout(() => {
      window.location.href = url;
    }, DURATION);
  }

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      transitioning = false;
      removeOverlay();
      sessionStorage.removeItem(KEY);
      unhide();
    }
  });

  function normalizePath(p) {
    return p.replace(/\/index\.html$/, '/').replace(/\/+$/, '') || '/';
  }

  document.addEventListener(
    'click',
    (e) => {
      if (transitioning) {
        e.preventDefault();
        return;
      }

      const link = e.target.closest('a[href]');
      if (!link) return;

      const isModified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
      const newTab = link.target === '_blank';
      const isDownload = link.hasAttribute('download');
      if (isModified || newTab || isDownload) return;

      const dest = new URL(link.href, window.location.href);

      // autre site, mailto:, tel:... : comportement normal
      if (dest.origin !== window.location.origin) return;

      const samePage =
        normalizePath(dest.pathname) === normalizePath(window.location.pathname) &&
        dest.search === window.location.search;

      if (samePage) {
        // même page + ancre (ex: /#foot-inx2) : saut natif, pas de transition
        if (dest.hash) return;

        // même page sans ancre (ex: clic sur le logo depuis l'accueil) : retour en haut
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: document.body.classList.contains('no-animation') ? 'auto' : 'smooth',
        });
        return;
      }

      // vraie autre page : transition
      e.preventDefault();
      leave(dest.href, e.clientX, e.clientY);
    },
    true,
  );
  setTimeout(unhide, 1000);
})();
