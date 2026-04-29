const hasMouse = window.matchMedia('(pointer: fine)').matches;

if (hasMouse) {
  const ring = document.querySelector('.cursor-ring');
  const cursor = document.querySelector('.cursor');

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let lastState = false;
  let isHoveringPointer = false;
  const ignoredElements = ['.no-cursor-color', '.cursor-dark-zone', '.cursor-light-zone'];

  let ringWidth = ring.offsetWidth;
  let ringHeight = ring.offsetHeight;

  window.addEventListener('resize', () => {
    ringWidth = ring.offsetWidth;
    ringHeight = ring.offsetHeight;
  });

  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    detectBackgroundColor(mouseX, mouseY);
  });

  window.addEventListener('pointerdown', () => {
    ring.classList.add('dragging');
    cursor.classList.add('dragging');
  });

  window.addEventListener('pointerup', () => {
    ring.classList.remove('dragging');
    cursor.classList.remove('dragging');
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
    const dx = mouseX - ringX;
    const dy = mouseY - ringY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    let speed = 0.12;
    if (isHoveringPointer) {
      speed = distance < 8 ? 1 : 0.2;
    }

    ringX += dx * speed;
    ringY += dy * speed;

    ring.style.left = `${ringX - ring.offsetWidth / 2}px`;
    ring.style.top = `${ringY - ring.offsetHeight / 2}px`;
    ring.style.borderRadius = '50%';

    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener('mouseleave', () => {
    ring.classList.add('hidden');
    cursor.classList.add('hidden');
  });

  document.addEventListener('mouseenter', (e) => {
    ringX = e.clientX;
    ringY = e.clientY;
    ring.classList.remove('hidden');
    cursor.classList.remove('hidden');
  });

  function detectBackgroundColor(x, y) {
    const elementsUnderCursor = document.elementsFromPoint(x, y);

    let overrideLightMode = null;
    for (const elUnder of elementsUnderCursor) {
      if (elUnder.classList.contains('cursor-dark-zone')) {
        overrideLightMode = false;
        break;
      }
      if (elUnder.classList.contains('cursor-light-zone')) {
        overrideLightMode = true;
        break;
      }
    }

    if (overrideLightMode === null) {
      for (const elUnder of elementsUnderCursor) {
        if (ignoredElements.some(sel => elUnder.matches(sel))) {
          return;
        }
      }
    }

    const el = elementsUnderCursor[0];
    if (!el) return;
    const style = window.getComputedStyle(el);

    function isInteractive(el) {
      while (el) {
        if (el.classList && el.classList.contains('vide')) return false;

        const tag = el.tagName;
        const interactiveTags = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'LABEL'];
        const interactiveClasses = ['swiper-button-prev', 'swiper-button-next', 'dropdown-toggle', 'faq-header', 'protagonistes-card', 'swiper-pagination-bullet', 'discovered', 'enCours', "card", "book-page-1", "book-page-2"];

        if (interactiveTags.includes(tag)) return true;
        if (el.classList && interactiveClasses.some(cls => el.classList.contains(cls))) return true;
        if (el.hasAttribute('onclick') || el.dataset.pointer === 'true') return true;

        el = el.parentElement;
      }
      return false;
    }

    const hasPointer = isInteractive(el);

    if (hasPointer && !isHoveringPointer) {
      isHoveringPointer = true;
      cursor.classList.remove('leaving-pointer');
      ring.classList.remove('leaving-pointer');
      cursor.classList.add('hovering-pointer');
      ring.classList.add('hovering-pointer');
    } else if (!hasPointer && isHoveringPointer) {
      isHoveringPointer = false;
      cursor.classList.remove('hovering-pointer');
      ring.classList.remove('hovering-pointer');
      cursor.classList.add('leaving-pointer');
      ring.classList.add('leaving-pointer');
      setTimeout(() => {
        cursor.classList.remove('leaving-pointer');
        ring.classList.remove('leaving-pointer');
      }, 800);
    }

    let isLight = null;

    if (overrideLightMode !== null) {
      isLight = overrideLightMode;
    } else {
      let computedBg = style.backgroundColor;
      let currentEl = el;

      while (currentEl && (computedBg === 'rgba(0, 0, 0, 0)' || computedBg === 'transparent')) {
        currentEl = currentEl.parentElement;
        if (currentEl) computedBg = window.getComputedStyle(currentEl).backgroundColor;
      }

      const rgb = computedBg.match(/\d+/g);
      isLight = rgb ? (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) > 200 : lastState;
    }

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

} else {
  document.querySelectorAll('.cursor, .cursor-ring').forEach(el => el.style.display = 'none');
}