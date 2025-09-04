const cards = document.querySelectorAll(".card");

// Détection si on est sur mobile (tactile)
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

cards.forEach((card) => {
  if (!isMobile) {
    // 🖱️ Effet desktop (souris)
    card.addEventListener("mousemove", (e) => {
      if (card.classList.contains("flipped")) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -30;
      const rotateY = ((x - centerX) / centerX) * 30;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`;
    });

    card.addEventListener("mouseleave", () => {
      if (card.classList.contains("flipped")) return;
      card.style.transform = "rotateX(0) rotateY(0)";
    });
  } else {
    // 📱 Sur mobile : uniquement petit zoom, pas de rotation
    card.addEventListener("touchstart", () => {
      if (card.classList.contains("flipped")) return;
      card.style.transform = "scale(1.06)";
    });

    card.addEventListener("touchend", () => {
      if (card.classList.contains("flipped")) return;
      card.style.transform = "scale(1)";
    });
  }
});
