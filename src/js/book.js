const slides = [
    {
        chapitre: "Chapitre I",
        title: "La rencontre",
        img: "src/svg/book/table.svg",
        alt: "4 personnes assises",
        text: "Tout commence par un moment d’échange. On prend le temps d’écouter vos besoins, vos envies et vos objectifs afin de poser les bases d’un concept sur mesure.",
        color: "orange"
    },
    {
        chapitre: "Chapitre II",
        title: "La réflexion",
        img: "src/svg/book/bulle.svg",
        alt: "bulle de réfléxion",
        text: "A partir de vos idées, nous imaginons un scénario ludique et interactif pensé pour s'intégrer parfaitement à votre volonté et à votre public.",
        color: "purple"
    },
    {
        chapitre: "Chapitre III",
        title: "La création",
        img: "src/svg/book/ampoule.svg",
        alt: "Image d'ampoulle",
        text: "Après validation, nous passons à la production des éléments : graphismes, développement, narration, chaque élément prend vie dans un planning clair et transparent.",
        color: "blue"
    },
    {
        chapitre: "Chapitre IV",
        title: "Les tests",
        img: "src/svg/book/list.svg",
        alt: "Une cecklist",
        text: "Tout au long du processus, nous testons ensemble l’expérience afin de garantir qualité, fluidité et adéquation avec vos attentes.",
        color: "orange"
    },
    {
        chapitre: "Chapitre V",
        title: "La livraison",
        img: "src/svg/book/livraison.svg",
        alt: "Livraison",
        text: "Le projet final vous est livré prêt à l’emploi. Et parce qu’on ne s’arrête pas là, nous vous accompagnons aussi dans son déploiement pour en assurer le succès.",
        color: "purple"
    }
];

/* == Sélecteurs DOM == */
const chapitreEl = document.getElementById('book-page-part-1-container-chapitre');
const titleEl = document.getElementById('book-page-part-1-container-title');
const imgEl = document.getElementById('book-page-part-2-container-img');
const textEl = document.getElementById('book-page-part-2-container-text');

const prevBtn = document.querySelector('.book-nav-prev');
const nextBtn = document.querySelector('.book-nav-next');
const dotsContainer = document.querySelector('.book-dots');

let current = 0;

/* initialisation : créer les dots */
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

/* mise à jour du contenu visible */
function render() {
    const s = slides[current];

    if (chapitreEl) chapitreEl.textContent = s.chapitre;
    if (titleEl) {
        titleEl.textContent = s.title;
        // on retire les anciennes couleurs
        titleEl.classList.remove("orange", "purple", "blue");
        // et on ajoute la nouvelle
        if (s.color) titleEl.classList.add(s.color);
    }
    if (imgEl) {
        imgEl.src = s.img;
        imgEl.alt = s.alt || '';
    }
    if (textEl) textEl.textContent = s.text;

    // mise à jour des dots
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

    // Précharger verso
    const backImg = new Image();
    backImg.src = '/src/img/book-page-back.png';

    page.style.zIndex = 20;

    // Appliquer la classe turning (CSS gère le flip)
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
    current = Math.max(0, Math.min(index, slides.length - 1));
    render();
}


/* events */
if (prevBtn) prevBtn.addEventListener('click', prev);
if (nextBtn) nextBtn.addEventListener('click', next);

// clavier : flèches gauche / droite
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
});

/* swipe mobile facultatif (simple) */
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
