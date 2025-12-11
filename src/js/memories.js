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
      title: "Formats hybrides",
      text: "Numériques, physiques ou phygitaux, nos formats s’adaptent à vos usages. Conscients des enjeux liés aux écrans, nous veillons à proposer nos expériences sur le support le plus adapté aux besoins de chacun.",
      image: "/src/svg/guyMemories.svg"
    },
    "/src/svg/linkMemories.svg": {
      title: "Valeurs humaines",
      text: "Chaque expérience est conçue pour être à la fois ludique, accessible et inclusive. Ces valeurs sont essentielles pour nous et guident chacune de nos créations.",
      image: "/src/svg/linkMemories.svg"
    },
    "/src/svg/targetMemories.svg": {
      title: "Créations sur mesure",
      text: "De l’idée à la mise en œuvre, nous vous accompagnons pour imaginer et réaliser des formats ludiques qui vous ressemblent afin donner vie à une expérience unique alignée avec vos attentes.",
      image: "/src/svg/targetMemories.svg"
    }
  };

  // Préchargement des images
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
                btn.closest(".game-button").classList.add("discovered");

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
  const toggle = document.getElementById("toggleGame");
  const gameContainer = document.querySelector(".memory-game-container");
  const noGameContainer = document.querySelector(".memory-no-game-container");

  function updateGameDisplay() {
    if (toggle.checked) {
      gameContainer.style.display = "none";
      noGameContainer.style.display = "block";
    } else {
      gameContainer.style.display = "flex";
      noGameContainer.style.display = "none";
    }
  }
  toggle.addEventListener("change", updateGameDisplay);
});

window.addEventListener("load", () => {
  const gameContainer = document.querySelector(".memory-game-container");
  const noGameContainer = document.querySelector(".memory-no-game-container");
  let ludiqueMode = sessionStorage.getItem("ludiqueMode");
  if (ludiqueMode === "on") {
    gameContainer.style.display = "none";
    noGameContainer.style.display = "block";
  } else {
    gameContainer.style.display = "flex";
    noGameContainer.style.display = "none";
  }
});
