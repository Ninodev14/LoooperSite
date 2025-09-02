const logos = document.querySelectorAll(".logo-jump");

logos.forEach((logo) => {
  logo.addEventListener("mouseenter", () => {
    logo.classList.add("animate");
  });

  logo.addEventListener("animationend", () => {
    logo.classList.remove("animate");
  });
});
