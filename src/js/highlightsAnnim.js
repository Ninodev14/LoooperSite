const highlights = document.querySelectorAll(".highlight");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.5 });

highlights.forEach(el => observer.observe(el));
