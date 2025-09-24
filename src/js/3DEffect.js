const cards = document.querySelectorAll(".card");

const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

cards.forEach((card) => {
  if (!isMobile) {
    // Effet PC (souris)
    card.addEventListener("mousemove", (e) => {
      if (card.classList.contains("flipped")) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // inversion verticale + lissage
      let rotateX = -((y - centerY) / (centerY * 2)) * 50;
      let rotateY = ((x - centerX) / (centerX * 2)) * 50;

      const maxAngle = 15;
      rotateX = Math.max(-maxAngle, Math.min(maxAngle, rotateX));
      rotateY = Math.max(-maxAngle, Math.min(maxAngle, rotateY));

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`;
    });

    card.addEventListener("mouseleave", () => {
      if (card.classList.contains("flipped")) return;
      card.style.transition = "transform 0.2s ease-out";
      card.style.transform = "rotateX(0) rotateY(0)";
      setTimeout(() => {
        card.style.transition = "";
      }, 200);
    });
  } else {
    // Effet Mobile (touch)
    card.addEventListener(
      "touchmove",
      (e) => {
        if (card.classList.contains("flipped")) return;
        e.preventDefault();

        const touch = e.touches[0];
        const rect = card.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // inversion verticale + lissage
        let rotateX = -((y - centerY) / (centerY * 2)) * 50;
        let rotateY = ((x - centerX) / (centerX * 2)) * 50;

        const maxAngle = 70;
        rotateX = Math.max(-maxAngle, Math.min(maxAngle, rotateX));
        rotateY = Math.max(-maxAngle, Math.min(maxAngle, rotateY));

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`;
      },
      { passive: false }
    );

    card.addEventListener("touchend", () => {
      if (card.classList.contains("flipped")) return;
      card.style.transition = "transform 0.2s ease-out";
      card.style.transform = "rotateX(0) rotateY(0)";
      setTimeout(() => {
        card.style.transition = "";
      }, 200);
    });
  }
});
