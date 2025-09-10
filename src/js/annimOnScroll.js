
const elements = document.querySelectorAll(".backgroundType1Annim, .highlight");

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;

      if (target.classList.contains("backgroundType1Annim")) {
        target.classList.add("visibleBackgroundType1Annim");
      }

      if (target.classList.contains("highlight")) {
        const highlights = document.querySelectorAll(".highlight");
        const highlightsInView = [...highlights].filter(
          h => h.getBoundingClientRect().top < window.innerHeight
        );

        highlightsInView.forEach((el, i) => {
          setTimeout(() => {
            el.classList.add("visibleHighlight");
          }, i * 500);
        });

      }
    }
  });
}, { threshold: 0.1 });

elements.forEach(el => observer.observe(el));
