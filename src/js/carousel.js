// Initialisation du slider
    const swiper = new Swiper('.swiper', {
      loop: true,                 // boucle infinie
      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 16,

      // Dots (pagination) cliquables
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      // Flèches de navigation
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // Autoplay (facultatif) — désactivez si vous n'en voulez pas
      autoplay: {
        delay: 7000,
        disableOnInteraction: false,
      },

      // Responsive
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },

      // Accessibilité de base
      a11y: { enabled: true },
    });