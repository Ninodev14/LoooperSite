const puzzle = document.getElementById("puzzle");
const taille = 3;
const CASE_VIDE = 6;
let positions = [];
let estGagne = false;
let enMouvement = false;
let focusPos = null;

const DESCRIPTION_PHOTO =
  "Photo de l'équipe Loooper! : Élodie, Nino et Julie, trois personnes debout côte à côte en extérieur, devant un mur en pierre et un feuillage vert. " +
  "À gauche, Julie avec des longues tresses dont certaines sont bleues, avec des lunettes, une chemise noire et un jean clair déchiré aux genoux. " +
  "Au centre, Elodie aux cheveux courts châtains, avec des lunettes, une chemise blanche et un jean large bleu foncé, les mains dans les poches. " +
  "À droite, Nino aux cheveux longs attachés, avec des lunettes et une barbe, un t-shirt noir et un pantalon beige.";

const CONTENU = [
  "mur en pierre et feuillage, avec le visage de la personne aux longues tresses, lunettes et grand sourire",
  "feuillage vert, avec le visage de la personne aux cheveux courts châtains et aux lunettes",
  "feuillage et mur en pierre, avec le visage de l'homme aux cheveux longs attachés, lunettes et barbe",
  "buste de la personne aux tresses : chemise noire aux manches ajourées, collier avec un pendentif doré, bras croisés, haut du jean clair",
  "buste de la personne en chemise blanche, mains dans les poches, haut du jean bleu foncé",
  "buste de l'homme : t-shirt noir avec un petit écusson rouge et blanc sur la poche, bras le long du corps, haut du pantalon beige",
  "",
  "jambes de la personne au jean large bleu foncé, avec des plantes et du gravier au sol",
  "jambes de l'homme en pantalon beige avec ses chaussures, un poteau en bois à droite, des plantes et du gravier",
];

const LIEUX = [
  "en haut à gauche",
  "en haut au centre",
  "en haut à droite",
  "au milieu à gauche",
  "au centre",
  "au milieu à droite",
  "en bas à gauche",
  "en bas au centre",
  "en bas à droite",
];

const DIRECTIONS = {
  gauche: "vers la gauche",
  droite: "vers la droite",
  haut: "vers le haut",
  bas: "vers le bas",
};

// Zones sr-only : consignes + annonces vocales
const aide = document.createElement("p");
aide.id = "puzzle-aide";
aide.className = "sr-only";
aide.textContent =
  "Puzzle coulissant de 8 pièces sur 9 cases. Le but est de remettre chaque pièce à sa place pour reconstituer la photo. " +
  "Tab pour passer d'une pièce à l'autre. Entrée ou Espace pour déplacer la pièce dans la case vide. " +
  "Les flèches du clavier déplacent une pièce vers la case vide dans la direction choisie. " +
  "Touche I pour entendre l'état du puzzle.";

const live = document.createElement("div");
live.className = "sr-only";
live.setAttribute("aria-live", "polite");
live.setAttribute("aria-atomic", "true");

puzzle.after(aide, live);

function annoncer(msg) {
  live.textContent = "";
  setTimeout(() => (live.textContent = msg), 50);
}

function voisinsDe(i) {
  const r = Math.floor(i / taille);
  const c = i % taille;
  const v = [];
  if (r > 0) v.push(i - taille);
  if (r < taille - 1) v.push(i + taille);
  if (c > 0) v.push(i - 1);
  if (c < taille - 1) v.push(i + 1);
  return v;
}

// direction dans laquelle la pièce i se déplacerait (ou null si bloquée)
function directionPiece(i, vide) {
  if (!voisinsDe(vide).includes(i)) return null;
  if (i === vide - 1) return "droite";
  if (i === vide + 1) return "gauche";
  if (i === vide - taille) return "bas";
  return "haut";
}

function nbBienPlacees() {
  return positions.filter((p, i) => p !== CASE_VIDE && p === i).length;
}

function etat() {
  const vide = positions.indexOf(CASE_VIDE);
  return `${nbBienPlacees()} pièces bien placées sur 8. La case vide est ${LIEUX[vide]}.`;
}

function labelPiece(i) {
  const pos = positions[i];
  const vide = positions.indexOf(CASE_VIDE);
  const dir = directionPiece(i, vide);

  let txt = `Pièce ${pos + 1} : ${CONTENU[pos]}. Elle est ${LIEUX[i]}. `;
  txt += pos === i ? "Bien placée. " : `Elle doit aller ${LIEUX[pos]}. `;
  txt += dir ? `Déplaçable ${DIRECTIONS[dir]}.` : "Ne peut pas bouger.";
  return txt;
}

function majAccessibilite() {
  if (estGagne) {
    puzzle.setAttribute("role", "img");
    puzzle.setAttribute("aria-label", DESCRIPTION_PHOTO);
    puzzle.removeAttribute("aria-describedby");
  } else {
    puzzle.setAttribute("role", "group");
    puzzle.setAttribute(
      "aria-label",
      `Puzzle à reconstituer. La photo complète représente : ${DESCRIPTION_PHOTO}`
    );
    puzzle.setAttribute("aria-describedby", "puzzle-aide");
  }
}

function melanger() {
  positions = Array.from({ length: taille * taille }, (_, i) => i);
  let vide = CASE_VIDE;
  let prev = -1;
  // on mélange avec de vrais coups : le puzzle est toujours résolvable
  for (let n = 0; n < 150; n++) {
    const voisins = voisinsDe(vide).filter((v) => v !== prev);
    const v = voisins[Math.floor(Math.random() * voisins.length)];
    [positions[vide], positions[v]] = [positions[v], positions[vide]];
    prev = vide;
    vide = v;
  }
  if (positions.every((p, i) => p === i)) melanger();
}

function initPuzzle() {
  estGagne = false;
  melanger();
  afficherPuzzle();
}

function afficherPuzzle() {
  puzzle.innerHTML = "";
  positions.forEach((pos, i) => {
    const div = document.createElement("div");
    div.classList.add("piece");
    if (!estGagne) div.classList.add("enCours");

    if (pos === CASE_VIDE) {
      div.classList.add("vide");
      div.setAttribute("aria-hidden", "true");
    } else {
      const x = pos % taille;
      const y = Math.floor(pos / taille);

      div.style.backgroundSize = `${taille * 100}% ${taille * 100}%`;
      div.style.backgroundPosition = `${(x * 100) / (taille - 1)}% ${(y * 100) / (taille - 1)}%`;
      div.dataset.pos = pos;

      if (estGagne) {
        div.setAttribute("aria-hidden", "true");
      } else {
        div.setAttribute("role", "button");
        div.setAttribute("tabindex", "0");
        div.setAttribute("aria-label", labelPiece(i));
        div.addEventListener("click", () => deplacer(i));
      }
    }

    puzzle.appendChild(div);
  });

  majAccessibilite();

  if (focusPos !== null) {
    const p = puzzle.querySelector(`.piece[data-pos="${focusPos}"]`);
    if (p) p.focus();
    focusPos = null;
  }
}

function deplacer(i) {
  if (estGagne || enMouvement) return;

  const vide = positions.indexOf(CASE_VIDE);
  const dir = directionPiece(i, vide);

  if (!dir) {
    annoncer(`Pièce ${positions[i] + 1} bloquée. La case vide est ${LIEUX[vide]}.`);
    return;
  }

  const pieces = puzzle.querySelectorAll(".piece");
  const div = pieces[i];
  const pieceVide = pieces[vide];

  const dx = (vide % taille) - (i % taille);
  const dy = Math.floor(vide / taille) - Math.floor(i / taille);

  div.style.transform = `translate(${dx * 100}%, ${dy * 100}%)`;
  pieceVide.style.transform = `translate(${-dx * 100}%, ${-dy * 100}%)`;

  enMouvement = true;
  const numPiece = positions[i];

  setTimeout(() => {
    [positions[i], positions[vide]] = [positions[vide], positions[i]];
    focusPos = numPiece;
    enMouvement = false;
    afficherPuzzle();

    if (!verifierVictoire()) {
      annoncer(`Pièce ${numPiece + 1} déplacée ${DIRECTIONS[dir]}. ${etat()}`);
    }
  }, 200);
}

function verifierVictoire() {
  const gagne = positions.every((val, idx) => val === idx);
  if (!gagne) return false;

  estGagne = true;
  puzzle.classList.add("gagne");
  afficherPuzzle();
  puzzle.setAttribute("tabindex", "-1");
  puzzle.focus();
  annoncer(`Bravo, puzzle terminé ! ${DESCRIPTION_PHOTO}`);
  lancerConfettis();
  return true;
}

function lancerConfettis() {
  const duration = 2000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      startVelocity: 60,
      spread: 120,
      gravity: 3,
      ticks: 400,
      origin: {
        x: Math.random(),
        y: 0,
      },
      colors: ["#3C61F5", "#BB6EF6", "#F6B254"],
    });

    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

function afficherResolu() {
  positions = Array.from({ length: taille * taille }, (_, i) => i);
  estGagne = true;
  puzzle.classList.add("gagne");
  afficherPuzzle();
}

// Clavier : flèches = direction dans laquelle la pièce bouge, I = état
puzzle.addEventListener("keydown", (e) => {
  if (estGagne) return;

  const vide = positions.indexOf(CASE_VIDE);
  const cibles = {
    ArrowLeft: vide + 1,
    ArrowRight: vide - 1,
    ArrowUp: vide + taille,
    ArrowDown: vide - taille,
  };

  if (e.key in cibles) {
    e.preventDefault();
    const i = cibles[e.key];
    if (voisinsDe(vide).includes(i)) {
      deplacer(i);
    } else {
      annoncer("Aucune pièce ne peut aller dans cette direction.");
    }
  } else if (e.key === "i" || e.key === "I") {
    annoncer(etat());
  } else if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("piece")) {
    e.preventDefault();
    e.target.click();
  }
});

majAccessibilite();

document.addEventListener("DOMContentLoaded", () => {
  const togglePuzzle = document.getElementById("toggleGame");
  if (!togglePuzzle) return;

  togglePuzzle.addEventListener("change", () => {
    if (togglePuzzle.checked) {
      afficherResolu();
    } else {
      puzzle.classList.remove("gagne");
      puzzle.removeAttribute("tabindex");
      initPuzzle();
    }
  });
});

window.addEventListener("ludiqueReady", () => {
  if (sessionStorage.getItem("ludiqueMode") === "on") {
    afficherResolu();
  } else {
    puzzle.classList.remove("gagne");
    puzzle.removeAttribute("tabindex");
    initPuzzle();
  }
});