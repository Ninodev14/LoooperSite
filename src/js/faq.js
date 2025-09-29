document.querySelectorAll(".faq-container-info").forEach(faq => {
  const header = faq.querySelector(".faq-header");
  header.addEventListener("click", () => {
    faq.classList.toggle("active");
  });
});
