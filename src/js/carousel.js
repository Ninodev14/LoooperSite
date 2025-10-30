const colors = ['#F6B254', '#BB6EF6', '#3C61F5'];

function applyColors(swiper) {
  Array.from(swiper.slides).forEach(slide => {
    const img = slide.querySelector('.slide-media img');
    if (!img) return;
    let origIndex = slide.getAttribute('data-swiper-slide-index');
    if (origIndex === null) {
      origIndex = Array.from(swiper.slides).indexOf(slide);
    }

    const color = colors[Number(origIndex) % colors.length];
    img.style.boxShadow = `20px 20px 0 0 ${color}`;
  });
}

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
      applyColors(this);
    },

    observerUpdate() {
      applyColors(this);
    }
  }
});

applyColors(swiper);
