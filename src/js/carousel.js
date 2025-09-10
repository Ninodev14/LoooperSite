// palette qui suit ton exemple : 1 orange, 2 rose, 3 bleu, 4 orange, 5 rouge, puis répétition
const colors = ['#F6B254', '#BB6EF6', '#3C61F5', '#BB6EF6'];

function applyColors(swiper) {
  // swiper.slides contient les slides + clones
  Array.from(swiper.slides).forEach(slide => {
    const img = slide.querySelector('.slide-media img');
    if (!img) return;

    // Swiper ajoute data-swiper-slide-index aux clones — c'est l'index "réel"
    let origIndex = slide.getAttribute('data-swiper-slide-index');

    // fallback si pas présent (peu probable), on prend l'index DOM
    if (origIndex === null) {
      origIndex = Array.from(swiper.slides).indexOf(slide);
    }

    const color = colors[Number(origIndex) % colors.length];
    img.style.boxShadow = `20px 20px 0 0 ${color}`;
  });
}

// Initialisation du slider (ton config, avec hook init)
const swiper = new Swiper('.swiper', {
  loop: true,
  grabCursor: true,
  slidesPerView: 1,
  spaceBetween: 16,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 7000,
    disableOnInteraction: false,
  },
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
  a11y: { enabled: true },

  on: {
    init() {
      applyColors(this); // applique les couleurs dès la création (clones inclus)
    },
    // Si tu ajoutes/enlèves dynamiquement des slides ou changes layout,
    // tu peux rappeler applyColors après update
    observerUpdate() {
      applyColors(this);
    }
  }
});

// Au cas où (double sécurité) : appliquer aussi après l'instanciation
applyColors(swiper);
