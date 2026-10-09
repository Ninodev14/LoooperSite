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
        setTimeout(() => el.classList.add("visibleHighlight"), i * 300);
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



/* ---------- COMPTEURS (chiffres clés) ---------- */

const COUNT_DURATION = 1800;
const COUNT_STAGGER = 150; 
const counters = document.querySelectorAll(".number-value[data-count]");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const shouldSkipAnimation = () =>
  document.body.classList.contains("no-animation") || reducedMotionQuery.matches;

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const formatCount = (el, value) =>
  value.toLocaleString("fr-FR") + (el.dataset.suffix || "");

function runCounter(el, index) {
  if (el.dataset.counted) return;
  el.dataset.counted = "true";

  const target = Number(el.dataset.count);
  if (Number.isNaN(target)) return;

  const startTime = performance.now() + index * COUNT_STAGGER;

  function step(now) {
    if (shouldSkipAnimation()) {
      el.textContent = formatCount(el, target);
      return;
    }
    const progress = Math.min(Math.max((now - startTime) / COUNT_DURATION, 0), 1);
    el.textContent = formatCount(el, Math.round(target * easeOutCubic(progress)));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

if (!shouldSkipAnimation()) {
  counters.forEach((el) => (el.textContent = formatCount(el, 0)));
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      runCounter(entry.target, [...counters].indexOf(entry.target));
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((el) => counterObserver.observe(el));