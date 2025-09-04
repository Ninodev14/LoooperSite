document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.white-container');
  if (!container) return;

  const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

  const targetRatio = 0.25; 

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const visible = Math.max(0, Math.min(1, entry.intersectionRatio));

      let progress = visible / targetRatio;
      progress = Math.min(progress, 1);

      // scale 0.9 -> 1
      const newScale = 0.9 + 0.1 * progress;
      container.style.transform = `scaleX(${newScale})`;
    });
  }, {
    root: null,
    threshold: thresholds
  });

  observer.observe(container);
});
