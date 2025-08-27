document.addEventListener('DOMContentLoaded', function () {
    var menuToggle = document.getElementById('menu-toggle');
    var menu = document.getElementById('menu-tel');
    var html = document.documentElement;

    var isMenuOpen = false;
    var lastClickTime = 0;
    var minDelay = 300;

    menuToggle.addEventListener('click', function () {
        var now = new Date().getTime();
        if (now - lastClickTime < minDelay) {
            return; 
        }

        lastClickTime = now;

        if (!isMenuOpen) {
            menu.style.display = 'flex';
            html.style.overflow = 'hidden';
            menuToggle.classList.toggle("active");
            setTimeout(function () {
                menu.style.opacity = '1';
                isMenuOpen = true;
            }, 1);

        } else {
            setTimeout(function () {

                menu.style.display = 'none';
            }, 300);
            menuToggle.classList.toggle("active");
            isMenuOpen = false;
            menu.style.opacity = '0';
            html.style.overflow = 'auto';
        }
    });
});
