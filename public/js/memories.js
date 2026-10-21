const INFOS = {
  "/svg/guyMemories.svg": {
    title: "Formats hybrides",
    text: "Numériques, physiques ou phygitaux, nos formats s’adaptent à vos usages. Conscients des enjeux liés aux écrans, nous veillons à proposer nos expériences sur le support le plus adapté aux besoins de chacun.",
    image: "/svg/guyMemories.svg",
    court: "une manette de jeu vidéo et des cartes à jouer",
    alt: "Une manette de jeu vidéo devant des cartes à jouer",
  },
  "/svg/linkMemories.svg": {
    title: "Valeurs humaines",
    text: "Chaque expérience est conçue pour être à la fois ludique, accessible et inclusive. Ces valeurs sont essentielles pour nous et guident chacune de nos créations.",
    image: "/svg/linkMemories.svg",
    court: "deux mains qui protègent un groupe de personnes",
    alt: "Deux mains ouvertes qui entourent et protègent deux adultes et un enfant",
  },
  "/svg/targetMemories.svg": {
    title: "Créations sur mesure",
    text: "De l’idée à la mise en œuvre, nous vous accompagnons pour imaginer et réaliser des formats ludiques qui vous ressemblent afin donner vie à une expérience unique alignée avec vos attentes.",
    image: "/svg/targetMemories.svg",
    court: "un engrenage avec une clé à molette au centre",
    alt: "Un engrenage avec une clé à molette au centre",
  },
};

const NB_CARTES = 6;
const NB_PAIRES = 3;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".memory-game-container");
  const board = document.querySelector(".game-board");
  if (!container || !board) return;

  const cards = [...document.querySelectorAll(".card")];
  const gameImage = document.getElementById("game-image");
  const gameTitle = document.getElementById("game-message-title");
  const gameMessage = document.getElementById("game-message");
  const gameBtns = [...document.querySelectorAll(".game-button")];

  let flippedCards = [];
  let lockBoard = false;
  let paires = 0;

  // ---------- Zones sr-only ----------
  const aide = document.createElement("p");
  aide.id = "memory-aide";
  aide.className = "sr-only";
  aide.textContent =
    "Jeu de mémoire : 6 cartes face cachée, 3 paires à retrouver. " +
    "Tab pour passer d'une carte à l'autre, ou touches 1 à 6 pour aller directement à une carte. " +
    "Entrée ou Espace pour retourner la carte. Chaque carte retournée est décrite à voix haute. " +
    "Quand une paire est trouvée, son contenu est lu. Touche I pour entendre l'état du jeu. " +
    "Pour lire directement le contenu sans jouer, activez le mode non ludique.";

  const live = document.createElement("div");
  live.className = "sr-only";
  live.setAttribute("aria-live", "polite");
  live.setAttribute("aria-atomic", "true");

  board.before(aide);
  container.appendChild(live);

  board.setAttribute("role", "group");
  board.setAttribute("aria-label", "Jeu de mémoire, 6 cartes, 3 paires");
  board.setAttribute("aria-describedby", "memory-aide");

  function annoncer(msg) {
    live.textContent = "";
    setTimeout(() => (live.textContent = msg), 50);
  }

  // ---------- Cartes ----------
  function labelCard(card, i) {
    const info = INFOS[card.dataset.image];
    if (card.dataset.trouve) return `Carte ${i + 1} sur ${NB_CARTES} : ${info.court}. Paire trouvée : ${info.title}.`;
    if (card.classList.contains("flipped")) return `Carte ${i + 1} sur ${NB_CARTES}, face visible : ${info.court}.`;
    return `Carte ${i + 1} sur ${NB_CARTES}, face cachée.`;
  }

  function majLabel(card) {
    card.setAttribute("aria-label", labelCard(card, cards.indexOf(card)));
  }

  cards.forEach((card, i) => {
    card.removeAttribute("alt"); // invalide sur une div
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    majLabel(card);
    card.addEventListener("click", () => retourner(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        retourner(card);
      }
    });
  });

  function afficherContenu(content) {
    gameTitle.textContent = content.title;
    gameMessage.textContent = content.text;
    gameImage.src = content.image;
    gameImage.alt = content.alt;
  }

  function debloquerBouton(content) {
    const btn = gameBtns.find((b) => !b.dataset.image);
    if (!btn) return;
    const img = btn.querySelector("img");
    img.src = content.image;
    img.alt = "";
    btn.dataset.image = content.image;
    btn.style.cursor = "pointer";
    btn.classList.add("discovered");
    btn.setAttribute("tabindex", "0");
    btn.removeAttribute("aria-disabled");
    btn.setAttribute("aria-label", `Relire : ${content.title}`);
  }

  function retourner(card) {
    const info = INFOS[card.dataset.image];
    const n = cards.indexOf(card) + 1;

    // carte d'une paire déjà trouvée : on relit le contenu
    if (card.dataset.trouve) {
      afficherContenu(info);
      annoncer(`${info.title}. ${info.text}`);
      return;
    }

    if (lockBoard || card.classList.contains("flipped")) return;

    card.classList.add("flipped");
    card.style.backgroundImage = `url(${card.dataset.image})`;
    majLabel(card);
    flippedCards.push(card);

    if (flippedCards.length === 1) {
      annoncer(`Carte ${n} : ${info.court}.`);
      return;
    }

    lockBoard = true;
    const [card1, card2] = flippedCards;

    if (card1.dataset.image === card2.dataset.image) {
      paires++;
      card1.dataset.trouve = card2.dataset.trouve = "1";
      [card1, card2].forEach(majLabel);

      afficherContenu(info);
      debloquerBouton(info);

      if (window.innerWidth <= 960) {
        gameImage.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      let msg = `Carte ${n} : ${info.court}. Paire trouvée ! ${info.title}. ${info.text} ${paires} paire${paires > 1 ? "s" : ""} sur ${NB_PAIRES}.`;
      if (paires === NB_PAIRES) msg += " Bravo, toutes les paires sont trouvées !";
      annoncer(msg);

      flippedCards = [];
      lockBoard = false;
    } else {
      annoncer(`Carte ${n} : ${info.court}. Ce n'est pas une paire, les cartes se retournent face cachée.`);

      setTimeout(() => {
        [card1, card2].forEach((c) => {
          c.classList.remove("flipped");
          c.style.backgroundImage = "url(/svg/carteMemories.svg)";
          c.style.transform = "rotateY(0) rotateX(0)";
          majLabel(c);
        });
        flippedCards = [];
        lockBoard = false;
      }, 1000);
    }
  }

  // ---------- Clavier sur le plateau : 1-6 = carte, I = état ----------
  board.addEventListener("keydown", (e) => {
    if (/^[1-6]$/.test(e.key)) {
      const card = cards[Number(e.key) - 1];
      if (card) {
        card.focus();
        retourner(card);
      }
    } else if (e.key === "i" || e.key === "I") {
      let msg = `${paires} paire${paires > 1 ? "s" : ""} sur ${NB_PAIRES} trouvée${paires > 1 ? "s" : ""}.`;
      if (flippedCards.length === 1) {
        const c = flippedCards[0];
        msg += ` Une carte est face visible : carte ${cards.indexOf(c) + 1}, ${INFOS[c.dataset.image].court}.`;
      }
      annoncer(msg);
    }
  });

  // ---------- Boutons "contenus débloqués" ----------
  gameBtns.forEach((btn, i) => {
    btn.setAttribute("role", "button");
    btn.setAttribute("tabindex", "-1");
    btn.setAttribute("aria-disabled", "true");
    btn.setAttribute("aria-label", `Contenu ${i + 1} sur ${NB_PAIRES} : pas encore débloqué`);
    btn.querySelector("img").alt = "";

    const relire = () => {
      const content = INFOS[btn.dataset.image];
      if (!content) return;
      afficherContenu(content);
      annoncer(`${content.title}. ${content.text}`);
    };

    btn.addEventListener("click", relire);
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        relire();
      }
    });
  });

  // ---------- Mode non ludique : descriptions des icônes ----------
  document.querySelectorAll(".memory-no-game .memory-item img").forEach((img) => {
    const key = new URL(img.src, window.location.href).pathname;
    if (INFOS[key]) img.alt = INFOS[key].alt;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggleGame");
  const gameContainer = document.querySelector(".memory-game-container");
  const noGameContainer = document.querySelector(".memory-no-game-container");
  if (!toggle || !gameContainer || !noGameContainer) return;

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

window.addEventListener("ludiqueReady", () => {
  const gameContainer = document.querySelector(".memory-game-container");
  const noGameContainer = document.querySelector(".memory-no-game-container");
  if (!gameContainer || !noGameContainer) return;

  if (sessionStorage.getItem("ludiqueMode") === "on") {
    gameContainer.style.display = "none";
    noGameContainer.style.display = "block";
  } else {
    gameContainer.style.display = "flex";
    noGameContainer.style.display = "none";
  }
});