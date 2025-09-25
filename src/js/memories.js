document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const gameImage = document.getElementById("game-image");
  const gameTitle = document.getElementById("game-message-title");
  const gameMessage = document.getElementById("game-message");
  const gameButtons = document.querySelectorAll(".game-button img");

  let flippedCards = [];
  let lockBoard = false;

  const contentsByImage = {
    "/src/svg/guyMemories.svg": {
      title: "Pensé pour tous les publics",
      text: "De 1 à 111 ans, chacun trouve sa place dans nos expériences interactives; ludiques, inclusives, accessibles.",
      image: "/src/svg/guyMemories.svg"
    },
    "/src/svg/linkMemories.svg": {
      title: "Expérience créatrice de lien",
      text: "Le jeu est un langage universel. Loooper! s’en sert pour tisser un lien vivant et unique avec votre public.",
      image: "/src/svg/linkMemories.svg"
    },
    "/src/svg/targetMemories.svg": {
      title: "Solutions adaptées sur mesure",
      text: "De l’idée à la mise en place, nous vous accompagnons de A à Z dans la création de formats ludiques alignés avec vos objectifs.",
      image: "/src/svg/targetMemories.svg"
    }
  };

  Object.keys(contentsByImage).forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  cards.forEach(card => {
    card.addEventListener("click", () => {
      if (lockBoard || card.classList.contains("flipped")) return;
      card.classList.add("flipped");
      card.style.backgroundImage = `url(${card.dataset.image})`;

      flippedCards.push(card);

      if (flippedCards.length === 2) {
        lockBoard = true;
        const [card1, card2] = flippedCards;

        if (card1.dataset.image === card2.dataset.image) {
          const content = contentsByImage[card1.dataset.image];
          if (content) {
            gameTitle.textContent = content.title;
            gameMessage.textContent = content.text;
            gameImage.src = content.image;

            for (let btn of gameButtons) {
              if (btn.src.includes("interogationMemories.svg")) {
                btn.src = content.image;
                btn.style.cursor = "pointer";
                btn.dataset.image = content.image;
                break;
              }
            }

            [card1, card2].forEach(card => {
              card.addEventListener("click", () => {
                const imgSrc = card.dataset.image;
                if (imgSrc && contentsByImage[imgSrc]) {
                  const c = contentsByImage[imgSrc];
                  gameTitle.textContent = c.title;
                  gameMessage.textContent = c.text;
                  gameImage.src = c.image;
                }
              });
            });
          }
          flippedCards = [];
          lockBoard = false;

        } else {
          setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.style.backgroundImage = "url(/src/svg/carteMemories.svg)";
            card2.style.backgroundImage = "url(/src/svg/carteMemories.svg)";
            card1.style.transform = "rotateY(0) rotateX(0)";
            card2.style.transform = "rotateY(0) rotateX(0)";
            flippedCards = [];
            lockBoard = false;
          }, 1000);
        }
      }
    });
  });

  gameButtons.forEach(btn => {
    btn.parentElement.addEventListener("click", () => {
      const imgSrc = btn.dataset.image;
      if (imgSrc && contentsByImage[imgSrc]) {
        const content = contentsByImage[imgSrc];
        gameTitle.textContent = content.title;
        gameMessage.textContent = content.text;
        gameImage.src = content.image;
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggleGameMemories");
  const gameContainer = document.querySelector(".memory-game-container");
  const noGameContainer = document.querySelector(".memory-no-game-container");

  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      gameContainer.style.display = "none";
      noGameContainer.style.display = "block";
    } else {
      gameContainer.style.display = "flex";
      noGameContainer.style.display = "none";
    }
  });
});
