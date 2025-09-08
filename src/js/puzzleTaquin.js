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

        if (pos === taille * taille - 1) {
            div.classList.add("vide");
        } else {
            const x = pos % taille;
            const y = Math.floor(pos / taille);
            div.style.backgroundPosition = `-${x * 100}px -${y * 100}px`;
            div.addEventListener("click", () => deplacer(i));
        }

        puzzle.appendChild(div);
    });
}

function deplacer(i) {
    const vide = positions.indexOf(taille * taille - 1);

    const voisins = [vide - 1, vide + 1, vide - taille, vide + taille];
    if (voisins.includes(i)) {
        [positions[i], positions[vide]] = [positions[vide], positions[i]];
        afficherPuzzle();
    }
}

initPuzzle();