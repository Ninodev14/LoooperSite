document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const cards = Array.from(track.children);
  const gap = 32; 
  const cardWidth = cards[0].offsetWidth + gap;

  // Dupliquer toutes les cartes pour l'effet infini
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add("clone");
    track.appendChild(clone);
  });

  let index = 0;
  let isMoving = false;

  const moveCarousel = () => {
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${cardWidth * index}px)`;
  };

  const next = () => {
    if (isMoving) return;
    isMoving = true;
    index++;
    moveCarousel();
  };

  const prev = () => {
    if (isMoving) return;
    isMoving = true;
    index--;
    moveCarousel();
  };

  track.addEventListener("transitionend", () => {
    const totalCards = track.children.length;
    if (index >= totalCards / 2) {
      track.style.transition = "none";
      index = 0;
      track.style.transform = `translateX(-${cardWidth * index}px)`;
    }
    if (index < 0) {
      track.style.transition = "none";
      index = totalCards / 2 - 1;
      track.style.transform = `translateX(-${cardWidth * index}px)`;
    }
    setTimeout(() => {
      track.style.transition = "transform 0.5s ease";
      isMoving = false;
    }, 0);
  });

  document.querySelector(".carousel-btn.next").addEventListener("click", next);
  document.querySelector(".carousel-btn.prev").addEventListener("click", prev);

  // --- GESTION DU DRAG / SWIPE ---
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  const startDrag = (x) => {
    startX = x;
    isDragging = true;
    track.style.transition = "none"; // désactiver transition pour fluidité
  };

  const moveDrag = (x) => {
    if (!isDragging) return;
    currentX = x;
    const delta = currentX - startX;
    track.style.transform = `translateX(${-index * cardWidth + delta}px)`;
  };

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;

    const delta = currentX - startX;
    if (Math.abs(delta) > cardWidth / 4) {
      if (delta < 0) {
        index++;
      } else {
        index--;
      }
    }
    moveCarousel();
  };

  // Souris
  track.addEventListener("mousedown", (e) => startDrag(e.pageX));
  track.addEventListener("mousemove", (e) => moveDrag(e.pageX));
  track.addEventListener("mouseup", endDrag);
  track.addEventListener("mouseleave", endDrag);

  // Tactile
  track.addEventListener("touchstart", (e) => startDrag(e.touches[0].clientX));
  track.addEventListener("touchmove", (e) => moveDrag(e.touches[0].clientX));
  track.addEventListener("touchend", endDrag);
});
