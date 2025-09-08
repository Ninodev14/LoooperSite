const puzzle = document.getElementById("puzzle");
const taille = 3;
let positions = [];

function initPuzzle() {
    positions = [];
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

    if (pos === 0) {
      div.classList.add("vide");
    } else {
      const x = pos % taille;
      const y = Math.floor(pos / taille);


      div.style.backgroundSize = `${taille * 100}% ${taille * 100}%`;
      div.style.backgroundPosition = `${(x * 100) / (taille - 1)}% ${(y * 100) / (taille - 1)}%`;

      div.addEventListener("click", () => deplacer(i));
    }

    puzzle.appendChild(div);
  });
}


function deplacer(i) {
    const vide = positions.indexOf(0);

    const memeLigneGauche = (i === vide - 1 && Math.floor(i / taille) === Math.floor(vide / taille));
    const memeLigneDroite = (i === vide + 1 && Math.floor(i / taille) === Math.floor(vide / taille));
    const auDessus = (i === vide - taille);
    const enDessous = (i === vide + taille);

    if (memeLigneGauche || memeLigneDroite || auDessus || enDessous) {
        [positions[i], positions[vide]] = [positions[vide], positions[i]];
        afficherPuzzle();
        verifierVictoire();
    }
}

function verifierVictoire() {
    const estGagne = positions.every((val, idx) => val === idx);
    if (estGagne) {
        lancerConfettis();
    }
}

function lancerConfettis() {
    confetti({
        particleCount: 500, 
        spread: 36000,      
        startVelocity: 20,   
        origin: { y: 0.5 }    
    });
}

initPuzzle();