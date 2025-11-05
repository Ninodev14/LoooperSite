const puzzle = document.getElementById("puzzle");
const taille = 3;
let positions = [];
let estGagne = false;

function initPuzzle() {
  positions = [];
  estGagne = false;
  for (let i = 0; i < taille * taille; i++) {
    positions.push(i);
  }
  positions.sort(() => Math.random() - 0.5);
  afficherPuzzle();
}

function afficherPuzzle() {
  puzzle.innerHTML = "";
  positions.forEach((pos, i) => {
    const div = document.createElement("div");
    div.classList.add("piece");
    if (!estGagne) {
      div.classList.add("enCours");
    }

    if (pos === 0) {
      div.classList.add("vide");
    } else {
      const x = pos % taille;
      const y = Math.floor(pos / taille);

      div.style.backgroundSize = `${taille * 100}% ${taille * 100}%`;
      div.style.backgroundPosition = `${(x * 100) / (taille - 1)}% ${(y * 100) / (taille - 1)}%`;
      div.addEventListener("click", () => deplacer(i, div));
    }

    puzzle.appendChild(div);
  });
}

function deplacer(i, div) {
  if (estGagne) return;

  const vide = positions.indexOf(0);

  const memeLigneGauche = (i === vide - 1 && Math.floor(i / taille) === Math.floor(vide / taille));
  const memeLigneDroite = (i === vide + 1 && Math.floor(i / taille) === Math.floor(vide / taille));
  const auDessus = (i === vide - taille);
  const enDessous = (i === vide + taille);

  if (memeLigneGauche || memeLigneDroite || auDessus || enDessous) {
    const pieces = puzzle.querySelectorAll(".piece");
    const pieceVide = pieces[vide];

    const dx = (vide % taille) - (i % taille);
    const dy = Math.floor(vide / taille) - Math.floor(i / taille);

    div.style.transform = `translate(${dx * 100}%, ${dy * 100}%)`;
    pieceVide.style.transform = `translate(${-dx * 100}%, ${-dy * 100}%)`;

    setTimeout(() => {
      [positions[i], positions[vide]] = [positions[vide], positions[i]];
      afficherPuzzle();
      verifierVictoire();
    }, 200);
  }
}

function verifierVictoire() {
  const gagne = positions.every((val, idx) => val === idx);
  if (gagne) {
    estGagne = true;
    puzzle.classList.add("gagne");
    const piecesEnCours = puzzle.querySelectorAll(".piece.enCours");
    piecesEnCours.forEach(p => p.classList.remove("enCours"));

    lancerConfettis();
  }
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
        y: 0
      },
      colors: ['#3C61F5', '#BB6EF6', '#F6B254']
    });

    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

document.addEventListener("DOMContentLoaded", () => {
  const togglePuzzle = document.getElementById("toggleGame");

  const savedMode = sessionStorage.getItem("ludiqueMode");


  function updatePuzzleDisplay() {
    if (togglePuzzle.checked) {
      positions = [];
      for (let i = 0; i < taille * taille; i++) {
        positions.push(i);
      }
      estGagne = true;
      puzzle.classList.add("gagne");
      afficherPuzzle();
    } else {
      initPuzzle();
      puzzle.classList.remove("gagne");
    }
  }


  togglePuzzle.addEventListener("change", updatePuzzleDisplay);


});

window.addEventListener("load", () => {
  let ludiqueMode = sessionStorage.getItem("ludiqueMode");
  if (ludiqueMode === "on") {
    positions = [];
    for (let i = 0; i < taille * taille; i++) {
      positions.push(i);
    }
    estGagne = true;
    puzzle.classList.add("gagne");
    afficherPuzzle();
  } else {
    initPuzzle();
    puzzle.classList.remove("gagne");
  }
});
