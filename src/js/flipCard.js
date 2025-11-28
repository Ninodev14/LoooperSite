document.querySelectorAll('.protagonistes-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});
function adjustCardsHeight() {
  const cards = document.querySelectorAll('.protagonistes-card');
  let maxHeight = 0;

  cards.forEach(card => {
    const front = card.querySelector('.protagonistes-card-front');
    const back = card.querySelector('.protagonistes-card-back');
    const cardMaxHeight = Math.max(front.scrollHeight, back.scrollHeight);
    if (cardMaxHeight > maxHeight) {
      maxHeight = cardMaxHeight;
    }
  });

  cards.forEach(card => {
    card.style.height = maxHeight + 'px';
  });
}

setTimeout(() => {
  window.addEventListener('load', adjustCardsHeight);
}, 1000);

window.addEventListener('resize', adjustCardsHeight);
