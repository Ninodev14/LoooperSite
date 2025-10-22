document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu-tel');
    const html = document.documentElement;
    const barreToggles = document.querySelectorAll('.barre-toggle');

    let isMenuOpen = false;
    let lastClickTime = 0;
    const minDelay = 500;

    function openMenu() {
        menu.style.display = 'flex';
        html.style.overflow = 'hidden';
        menuToggle.classList.add("active");
        barreToggles.forEach(barre => barre.style.backgroundColor = '#fff');

        setTimeout(() => {
            menu.classList.add('open');
            isMenuOpen = true;
        }, 1);
    }

    function closeMenu() {
        menu.classList.remove('open');
        menuToggle.classList.remove("active");
        html.style.overflow = 'auto';
        isMenuOpen = false;

        setTimeout(() => {
            menu.classList.remove('slide-sub');
            menu.style.display = 'none';
        }, 400);
    }

    menuToggle.addEventListener('click', function () {
        const now = Date.now();
        if (now - lastClickTime < minDelay) return;
        lastClickTime = now;

        if (!isMenuOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    const btnClose = document.getElementById('btn-close');
    if (btnClose) {
        btnClose.addEventListener('click', () => {
            if (isMenuOpen) closeMenu();
        });
    }

    // Navigation slide
    const btnSlide = document.getElementById('btn-slide');
    const btnBack = document.getElementById('btn-back');

    if (btnSlide) {
        btnSlide.addEventListener('click', () => {
            menu.classList.add('slide-sub');
        });
    }

    if (btnBack) {
        btnBack.addEventListener('click', () => {
            menu.classList.remove('slide-sub');
        });
    }


    // function checkIntersection() {
    //     const stickyRect = menuToggle.getBoundingClientRect();
    //     const targetDivs = document.querySelectorAll('.target-content-index');
    //     let touching = false;

    //     for (const targetDiv of targetDivs) {
    //         const targetRect = targetDiv.getBoundingClientRect();
    //         if (
    //             stickyRect.bottom > targetRect.top &&
    //             stickyRect.top < targetRect.bottom &&
    //             stickyRect.right > targetRect.left &&
    //             stickyRect.left < targetRect.right
    //         ) {
    //             touching = true;
    //             break;
    //         }
    //     }

    //     if (!isMenuOpen) {
    //         barreToggles.forEach(barre =>
    //             barre.style.backgroundColor = touching ? '#000' : '#fff'
    //         );
    //     }
    // }


    //let ticking = false;
    //function onScroll() {
    //   if (!ticking) {
    //      requestAnimationFrame(() => {
    //          checkIntersection();
    //        ticking = false;
    //      });
    // ticking = true;
    //   }
    // }

    // document.body.addEventListener('scroll', onScroll, { passive: true });
    // window.addEventListener('resize', checkIntersection);
    // checkIntersection();
});
