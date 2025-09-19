document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu-tel');
    const html = document.documentElement;
    const barreToggles = document.querySelectorAll('.barre-toggle');

    let isMenuOpen = false;
    let lastClickTime = 0;
    const minDelay = 300;

    menuToggle.addEventListener('click', function () {
        const now = Date.now();
        if (now - lastClickTime < minDelay) return;
        lastClickTime = now;

        if (!isMenuOpen) {
            menu.style.display = 'flex';
            html.style.overflow = 'hidden';
            menuToggle.classList.add("active");
            barreToggles.forEach(barre => barre.style.backgroundColor = '#fff');
            setTimeout(() => {
                menu.style.opacity = '1';
                isMenuOpen = true;
            }, 1);
        } else {
            setTimeout(() => menu.style.display = 'none', 300);
            menuToggle.classList.remove("active");
            isMenuOpen = false;
            menu.style.opacity = '0';
            html.style.overflow = 'auto';
        }
    });

    function checkIntersection() {
        const stickyRect = menuToggle.getBoundingClientRect();
        const targetDivs = document.querySelectorAll('.target-content-index');
        let touching = false;

        for (const targetDiv of targetDivs) {
            const targetRect = targetDiv.getBoundingClientRect();
            if (
                stickyRect.bottom > targetRect.top &&
                stickyRect.top < targetRect.bottom &&
                stickyRect.right > targetRect.left &&
                stickyRect.left < targetRect.right
            ) {
                touching = true;
                break;
            }
        }

        if (!isMenuOpen) {
            barreToggles.forEach(barre =>
                barre.style.backgroundColor = touching ? '#000' : '#fff'
            );
        }
    }

    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                checkIntersection();
                ticking = false;
            });
            ticking = true;
        }
    }

    document.body.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', checkIntersection);
    checkIntersection();
});
