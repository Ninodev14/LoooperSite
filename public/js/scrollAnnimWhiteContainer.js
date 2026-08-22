document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.zoom-container');
  if (!containers.length) return;

  const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

  let targetRatio;

  if (window.innerWidth <= 600) {
    targetRatio = 0.12;
  } else if (window.innerWidth <= 1024) {
    targetRatio = 0.18;
  } else {
    targetRatio = 0.25;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const container = entry.target;

      if (document.body.classList.contains('no-animation')) {
        container.style.transform = 'scaleX(1)';
        return;
      }

      // Hauteur visible du container, en px, par rapport à la hauteur de l'écran
      const visibleHeight = entry.intersectionRect.height;
      const screenRatio = visibleHeight / window.innerHeight;

      let progress = Math.min(screenRatio / targetRatio, 1);
      const newScale = 0.8 + 0.2 * progress;
      container.style.transform = `scaleX(${newScale})`;
    });
  }, {
    root: null,
    threshold: thresholds
  });

  containers.forEach(container => observer.observe(container));

  const bodyObserver = new MutationObserver(() => {
    if (document.body.classList.contains('no-animation')) {
      containers.forEach(container => {
        container.style.transform = 'scaleX(1)';
      });
    }
  });

  bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
});