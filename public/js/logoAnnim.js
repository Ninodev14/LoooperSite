const hasNoAnimation = () => document.body.classList.contains("no-animation");

document.querySelectorAll(".logo-jump").forEach((logo) => {
  logo.addEventListener("mouseenter", () => {
    if (hasNoAnimation()) return;
    logo.classList.add("animate");
  });
  logo.addEventListener("animationend", () => {
    logo.classList.remove("animate");
  });
});

document.querySelectorAll(".logo-bump").forEach(el => {
  el.addEventListener("mouseenter", () => {
    if (hasNoAnimation()) return;
    el.classList.add("bump");
    el.addEventListener("animationend", () => {
      el.classList.remove("bump");
    }, { once: true });
  });
});