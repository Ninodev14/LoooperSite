document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu-tel');
    const html = document.documentElement;
    const barreToggles = document.querySelectorAll('.barre-toggle');
    const subMenus = document.querySelectorAll('.menu-tel-sub');

    let isMenuOpen = false;
    let lastClickTime = 0;
    const minDelay = 500;

    function resetSubs() {
        subMenus.forEach(s => s.classList.remove('active-sub'));
    }

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
            resetSubs();
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

    // Navigation slide (plusieurs sous-menus)
    document.querySelectorAll('.btn-slide').forEach(btn => {
        btn.addEventListener('click', () => {
            const sub = document.getElementById(btn.dataset.target);
            if (!sub) return;
            resetSubs();
            sub.classList.add('active-sub');
            menu.classList.add('slide-sub');
        });
    });

    document.querySelectorAll('.btn-back').forEach(btn => {
        btn.addEventListener('click', () => {
            menu.classList.remove('slide-sub');
            // on garde le sous-menu visible le temps de l'animation
            setTimeout(resetSubs, 400);
        });
    });
});

function setupAnimation(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const circles = container.querySelectorAll('.circle-group');
    let canAnimate = true;

    container.addEventListener('mouseenter', () => {
        if (!canAnimate || document.body.classList.contains('no-animation')) return;

        canAnimate = false;

        circles.forEach(circle => {
            circle.classList.add('animate');
            circle.addEventListener('animationend', () => {
                circle.classList.remove('animate');
            }, { once: true });
        });

        setTimeout(() => {
            canAnimate = true;
        }, 1100);
    });
}

setupAnimation('.img-container-header');
setupAnimation('.footerLogo');