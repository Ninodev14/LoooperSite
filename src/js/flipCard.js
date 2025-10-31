document.querySelectorAll('.protagonistes-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});
function adjustCardsHeight() {
    const cards = document.querySelectorAll('.protagonistes-card');
    let maxHeight = 0;

    // trouver la hauteur la plus grande parmi toutes les cartes
    cards.forEach(card => {
        const front = card.querySelector('.protagonistes-card-front');
        const back = card.querySelector('.protagonistes-card-back');
        const cardMaxHeight = Math.max(front.scrollHeight, back.scrollHeight);
        if (cardMaxHeight > maxHeight) {
            maxHeight = cardMaxHeight;
        }
    });

    // appliquer la hauteur maximale à toutes les cartes
    cards.forEach(card => {
        card.style.height = maxHeight + 'px';
    });
}

window.addEventListener('load', adjustCardsHeight);
window.addEventListener('resize', adjustCardsHeight);
