const logos = document.querySelectorAll(".logo-jump");

logos.forEach((logo) => {
  logo.addEventListener("mouseenter", () => {
    logo.classList.add("animate");
  });

  logo.addEventListener("animationend", () => {
    logo.classList.remove("animate");
  });
});
document.querySelectorAll(".logo-bump").forEach(el => {
  el.addEventListener("mouseenter", () => {
    el.classList.add("bump");
    el.addEventListener("animationend", () => {
      el.classList.remove("bump");
    }, { once: true });
  });
});
