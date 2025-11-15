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
      const visible = Math.max(0, Math.min(1, entry.intersectionRatio));

      let progress = visible / targetRatio;
      progress = Math.min(progress, 1);

      const newScale = 0.8 + 0.2 * progress;
      container.style.transform = `scaleX(${newScale})`;
    });
  }, {
    root: null,
    threshold: thresholds
  });

  containers.forEach(container => observer.observe(container));
});
