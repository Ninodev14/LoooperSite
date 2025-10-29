const hasMouse = window.matchMedia('(pointer: fine)').matches;

if (hasMouse) {
  const ring = document.querySelector('.cursor-ring');
  const cursor = document.querySelector('.cursor');

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let lastState = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    detectBackgroundColor(mouseX, mouseY);
  });

  ['scroll', 'wheel', 'touchmove'].forEach(evt => {
    window.addEventListener(evt, handleScrollUpdate, { passive: true });
    document.querySelectorAll('*').forEach(el => {
      el.addEventListener(evt, handleScrollUpdate, { passive: true });
    });
  });

  function handleScrollUpdate() {
    detectBackgroundColor(mouseX, mouseY);
  }

  function animate() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    ring.style.left = `${ringX - ring.offsetWidth / 2}px`;
    ring.style.top = `${ringY - ring.offsetHeight / 2}px`;
    ring.style.borderRadius = '50%';
    ring.style.width = '3rem';
    ring.style.height = '3rem';

    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener('mouseleave', () => {
    ring.classList.add('hidden');
    cursor.classList.add('hidden');
  });

  document.addEventListener('mouseenter', () => {
    ring.classList.remove('hidden');
    cursor.classList.remove('hidden');
  });

  function detectBackgroundColor(x, y) {
    const el = document.elementFromPoint(x, y);
    if (!el) return;

    const style = window.getComputedStyle(el);
    let computedBg = style.backgroundColor;

    let currentEl = el;
    while (
      currentEl &&
      (computedBg === 'rgba(0, 0, 0, 0)' || computedBg === 'transparent')
    ) {
      currentEl = currentEl.parentElement;
      if (currentEl) {
        computedBg = window.getComputedStyle(currentEl).backgroundColor;
      }
    }

    const rgb = computedBg.match(/\d+/g);
    if (rgb) {
      const brightness = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
      const isLight = brightness > 200;
      if (isLight !== lastState) {
        lastState = isLight;
        if (isLight) {
          cursor.classList.add('light');
          ring.classList.add('light');
        } else {
          cursor.classList.remove('light');
          ring.classList.remove('light');
        }
      }
    }
  }

} else {
  document.querySelectorAll('.cursor, .cursor-ring').forEach(el => el.style.display = 'none');
}
