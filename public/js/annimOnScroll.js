const VISIBLE_CLASSES = {
  backgroundType1Annim: "visibleBackgroundType1Annim",
  backgroundType2Annim: "visibleBackgroundType2Annim",
};

const elements = document.querySelectorAll(
  ".backgroundType1Annim, .backgroundType2Annim, .highlight"
);

function triggerElement(target) {
  if (target.classList.contains("backgroundType1Annim")) {
    target.classList.add("visibleBackgroundType1Annim");
  }

  if (target.classList.contains("backgroundType2Annim")) {
    target.classList.add("visibleBackgroundType2Annim");
  }

  if (target.classList.contains("highlight")) {
    if (document.body.classList.contains("no-animation")) {
      document.querySelectorAll(".highlight").forEach(el => {
        el.classList.add("visibleHighlight");
      });
    } else {
      document.querySelectorAll(".highlight").forEach((el, i) => {
        setTimeout(() => el.classList.add("visibleHighlight"), i * 200);
      });
    }
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) triggerElement(entry.target);
  });
}, { threshold: 0.1 });

elements.forEach(el => observer.observe(el));

const bodyObserver = new MutationObserver(() => {
  if (document.body.classList.contains("no-animation")) return;

  elements.forEach(el => {
    if (el.classList.contains("highlight")) return;
    const { top, bottom } = el.getBoundingClientRect();
    if (top < window.innerHeight && bottom > 0) triggerElement(el);
  });
});

bodyObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });