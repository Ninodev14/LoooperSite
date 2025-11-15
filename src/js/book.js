const slides = [
    {
        chapitre: "Chapitre I",
        title: "La rencontre",
        img: "src/svg/book/table.svg",
        alt: "4 personnes assises",
        text: "Tout commence par <b>un moment d’échange</b>. On prend le temps d’écouter <b>vos besoins</b>, <b>vos envies</b> et <b>vos objectifs</b> afin de poser les bases <b>d’un concept sur mesure</b>.",
        color: "orange"
    },
    {
        chapitre: "Chapitre II",
        title: "La réflexion",
        img: "src/svg/book/bulle.svg",
        alt: "bulle de réfléxion",
        text: "À partir de vos idées, nous imaginons <b>un scénario ludique et interactif</b> pensé pour s'intégrer parfaitement à <b>votre volonté</b> et à <b>votre public</b>.",
        color: "purple"
    },
    {
        chapitre: "Chapitre III",
        title: "La création",
        img: "src/svg/book/ampoule.svg",
        alt: "Image d'ampoulle",
        text: "Après validation, nous passons à <b>la production des éléments</b> : graphismes, développement, narration, chaque élément prend vie dans <b>un planning clair et transparent.</b>",
        color: "blue"
    },
    {
        chapitre: "Chapitre IV",
        title: "Les tests",
        img: "src/svg/book/list.svg",
        alt: "Une cecklist",
        text: "Tout au long du processus, nous <b>testons</b> ensemble l’expérience afin de garantir <b>qualité, fluidité et adéquation avec vos attentes</b>.",
        color: "orange"
    },
    {
        chapitre: "Chapitre V",
        title: "La livraison",
        img: "src/svg/book/livraison.svg",
        alt: "Livraison",
        text: "Le projet final vous est livré <b>prêt à l’emploi</b>. Et parce qu’on ne s’arrête pas là, nous vous accompagnons aussi dans <b>son déploiement</b> pour en assurer le succès.",
        color: "purple"
    }
];

const chapitreEl = document.getElementById('book-page-part-1-container-chapitre');
const titleEl = document.getElementById('book-page-part-1-container-title');
const imgEl = document.getElementById('book-page-part-2-container-img');
const textEl = document.getElementById('book-page-part-2-container-text');

const prevBtn = document.querySelector('.book-nav-prev');
const nextBtn = document.querySelector('.book-nav-next');
const dotsContainer = document.querySelector('.book-dots');

let current = 0;

function initDots() {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.className = 'book-dot';
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', i === current ? 'true' : 'false');
        btn.setAttribute('aria-label', `Aller au chapitre ${i + 1}`);
        btn.dataset.index = i;
        btn.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(btn);
    });
}

function render() {
    const s = slides[current];

    if (chapitreEl) chapitreEl.textContent = s.chapitre;
    if (titleEl) {
        titleEl.textContent = s.title;
        titleEl.classList.remove("orange", "purple", "blue");
        if (s.color) titleEl.classList.add(s.color);
    }
    if (imgEl) {
        imgEl.src = s.img;
        imgEl.alt = s.alt || '';
    }
    if (textEl) textEl.innerHTML = s.text;

    const dots = dotsContainer.querySelectorAll('.book-dot');
    dots.forEach((d, i) =>
        d.setAttribute('aria-selected', i === current ? 'true' : 'false')
    );
}
function animateTurn(direction) {
    const page = direction === 'next'
        ? document.querySelector('.book-page-2')
        : document.querySelector('.book-page-1');

    if (!page) return;

    const content = page.querySelector('div');

    const backImg = new Image();
    backImg.src = '/src/img/book-page-back.png';

    page.style.zIndex = 20;
    page.classList.add('turning');

    setTimeout(() => {
        page.style.backgroundImage = 'url(/src/img/book-page-back.png)';
        if (content) content.classList.add('hidden');
    }, 200);

    setTimeout(() => {
        if (direction === 'next') {
            current = (current + 1) % slides.length;
        } else {
            current = (current - 1 + slides.length) % slides.length;
        }
        render();
    }, 300);

    page.addEventListener('transitionend', () => {
        setTimeout(() => {
            page.style.backgroundImage = 'url(/src/img/book-page.png)';
            if (content) content.classList.remove('hidden');
        }, 200);
        page.classList.remove('turning');
        page.style.zIndex = 10;

        const otherPage = direction === 'next'
            ? document.querySelector('.book-page-1')
            : document.querySelector('.book-page-2');
        if (otherPage) otherPage.style.zIndex = 5;
    }, { once: true });
}




function prev() { animateTurn('prev'); }
function next() { animateTurn('next'); }

function goToSlide(index) {
    if (index === current) return;

    const direction = index > current ? 'next' : 'prev';
    const page = direction === 'next'
        ? document.querySelector('.book-page-2')
        : document.querySelector('.book-page-1');

    if (!page) return;

    const content = page.querySelector('div');
    const backImg = new Image();
    backImg.src = '/src/img/book-page-back.png';

    page.style.zIndex = 20;
    page.classList.add('turning');

    setTimeout(() => {
        page.style.backgroundImage = 'url(/src/img/book-page-back.png)';
        if (content) content.classList.add('hidden');
    }, 200);

    setTimeout(() => {
        current = Math.max(0, Math.min(index, slides.length - 1));
        render();
    }, 300);

    page.addEventListener('transitionend', () => {
        setTimeout(() => {
            page.style.backgroundImage = 'url(/src/img/book-page.png)';
            if (content) content.classList.remove('hidden');
        }, 200);
        page.classList.remove('turning');
        page.style.zIndex = 10;

        const otherPage = direction === 'next'
            ? document.querySelector('.book-page-1')
            : document.querySelector('.book-page-2');
        if (otherPage) otherPage.style.zIndex = 5;
    }, { once: true });
}

if (prevBtn) prevBtn.addEventListener('click', prev);
if (nextBtn) nextBtn.addEventListener('click', next);


(function addSwipe() {
    const el = document.querySelector('.book-container-center');
    if (!el) return;
    let startX = 0;
    let startY = 0;
    el.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        startX = t.clientX;
        startY = t.clientY;
    }, { passive: true });
    el.addEventListener('touchend', (e) => {
        const t = e.changedTouches[0];
        const dx = t.clientX - startX;
        const dy = t.clientY - startY;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) next();
            else prev();
        }
    });
})();


initDots();
render();

const mobileChapitre = document.getElementById('mobile-chapitre');
const mobileTitle = document.getElementById('mobile-title');
const mobileImg = document.getElementById('mobile-img');
const mobileText = document.getElementById('mobile-text');
const mobileDots = document.querySelector('.book-mobile-dots');
const bookMobileContent = document.querySelector('.book-mobile-content ');
const mobilePrev = document.querySelector('.book-mobile-nav.prev');
const mobileNext = document.querySelector('.book-mobile-nav.next');
const mobilePage = document.querySelector('.book-mobile-page');

let currentMobile = 0;

function initMobileDots() {
  mobileDots.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goToMobileSlide(i));
    mobileDots.appendChild(dot);
  });
}

function renderMobile() {
  const s = slides[currentMobile];
  mobileChapitre.textContent = s.chapitre;
  mobileTitle.textContent = s.title;
  mobileTitle.classList.remove('orange', 'purple', 'blue');
  if (s.color) mobileTitle.classList.add(s.color);
  mobileImg.src = s.img;
  mobileImg.alt = s.alt;
 mobileText.innerHTML = s.text;

  mobileDots.querySelectorAll('button').forEach((dot, i) => {
    dot.setAttribute('aria-selected', i === currentMobile ? 'true' : 'false');
  });
}

function animateMobile(direction, targetIndex = null) {
  bookMobileContent.classList.add('fading-out');

  setTimeout(() => {
    if (targetIndex !== null) {
      currentMobile = targetIndex;
    } else if (direction === 'next') {
      currentMobile = (currentMobile + 1) % slides.length;
    } else {
      currentMobile = (currentMobile - 1 + slides.length) % slides.length;
    }

    renderMobile();
    bookMobileContent.classList.remove('fading-out');
  }, 400);
}

function nextMobile() {
  animateMobile('next');
}

function prevMobile() {
  animateMobile('prev');
}

function goToMobileSlide(i) {
  if (i === currentMobile) return;
  animateMobile(null, i);
}


mobileNext.addEventListener('click', nextMobile);
mobilePrev.addEventListener('click', prevMobile);

const page1 = document.querySelector('.book-page-1');
const page2 = document.querySelector('.book-page-2');

if (page1) {
    page1.addEventListener('click', () => {
        prev();
    });
}

if (page2) {
    page2.addEventListener('click', () => {
        next();
    });
}


// swipe sur mobile
(function addSwipe() {
  const el = document.querySelector('.book-mobile-container');
  let startX = 0, startY = 0;
  el.addEventListener('touchstart', e => {
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
  }, { passive: true });
  el.addEventListener('touchend', e => {
    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) nextMobile();
      else prevMobile();
    }
  });
})();

initMobileDots();
renderMobile();