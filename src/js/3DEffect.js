const cards = document.querySelectorAll(".card");

// Détection mobile
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

cards.forEach((card) => {
  if (!isMobile) {
    // 🖱️ Desktop (souris) → effet tilt
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
    // 📱 Mobile (tactile) → tilt avec le doigt
    card.addEventListener("touchmove", (e) => {
      if (card.classList.contains("flipped")) return;
      e.preventDefault(); // ⛔ empêche le scroll mais pas le click

      const touch = e.touches[0];
      const rect = card.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -30;
      const rotateY = ((x - centerX) / centerX) * 30;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`;
    }, { passive: false });

    card.addEventListener("touchend", () => {
      if (card.classList.contains("flipped")) return;
      // ⚡ pas de preventDefault ici → le click peut se déclencher
      card.style.transition = "transform 0.2s ease-out";
      card.style.transform = "rotateX(0) rotateY(0)";
      setTimeout(() => {
        card.style.transition = ""; // reset pour garder l’effet fluide
      }, 200);
    });
  }
});
