document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.zoom-container');
  if (!containers.length) return;

  const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);
  const targetRatio = 0.25;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const container = entry.target;
      const visible = Math.max(0, Math.min(1, entry.intersectionRatio));

      let progress = visible / targetRatio;
      progress = Math.min(progress, 1);

      const newScale = 0.9 + 0.1 * progress;
      container.style.transform = `scaleX(${newScale})`;
    });
  }, {
    root: null,
    threshold: thresholds
  });

  containers.forEach(container => observer.observe(container));
});
