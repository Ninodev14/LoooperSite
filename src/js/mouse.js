const ring = document.querySelector('.cursor-ring');
const cursor = document.querySelector('.cursor');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = `${mouseX}px`;
  cursor.style.top = `${mouseY}px`;

  detectBackgroundColor(mouseX, mouseY);
  adaptCursorToElement(mouseX, mouseY); // <-- nouvelle fonction
});

function animate() {
  // Si on n'est pas sur un élément cliquable, on fait suivre le ring normalement
  if (!ring.classList.contains('hover-pointer')) {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    ring.style.left = `${ringX - ring.offsetWidth / 2}px`;
    ring.style.top = `${ringY - ring.offsetHeight / 2}px`;
    ring.style.borderRadius = '50%';
    ring.style.width = '2rem';
    ring.style.height = '2rem';
  }
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

let lastState = false;

function detectBackgroundColor(x, y) {
  const el = document.elementFromPoint(x, y);
  if (!el) return;

  const style = window.getComputedStyle(el);
  const bg = style.backgroundColor;

  let currentEl = el;
  let computedBg = bg;
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

// ---------------------------
// Nouvelle fonction
// ---------------------------
function adaptCursorToElement(x, y) {
  const el = document.elementFromPoint(x, y);
  if (!el) return;

  const style = window.getComputedStyle(el);
  const isPointer = style.cursor === 'pointer' || el.tagName === 'A' || el.tagName === 'BUTTON';

  if (isPointer) {
    const rect = el.getBoundingClientRect();
    ring.style.width = `${rect.width}px`;
    ring.style.height = `${rect.height}px`;
    ring.style.left = `${rect.left}px`;
    ring.style.top = `${rect.top}px`;
    ring.style.borderRadius = style.borderRadius || '0px';
    ring.classList.add('hover-pointer');
  } else {
    ring.classList.remove('hover-pointer');
  }
}
