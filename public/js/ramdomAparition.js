document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".mini-card-container");
    const cards = container.querySelectorAll(".mini-card, .revers-mini-card");
    const isMobile = window.innerWidth < 768;

    function initAnimation() {
        if (document.body.classList.contains('no-animation')) {
            container.classList.add("mix-done");
            return;
        }

        container.classList.add("mix-active");

        cards.forEach(card => {
            const randomX = (Math.random() - 0.5) * 600;
            const randomY = (Math.random() - 0.5) * 600;
            const randomRot = (Math.random() - 0.5) * 200;
            card.style.setProperty("--random-x", randomX);
            card.style.setProperty("--random-y", randomY);
            card.style.setProperty("--random-rot", randomRot);
        });

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                container.classList.remove("mix-active");

                setTimeout(() => {
                    cards.forEach(card => {
                        card.style.transition = "all 0.2s ease";
                        card.style.willChange = "auto";
                        container.classList.add("mix-done");
                    });
                }, 2200);

                observer.unobserve(container);
            }
        }, {
            threshold: isMobile ? 0.05 : 0.3,
            rootMargin: isMobile ? "0px 0px -50px 0px" : "0px"
        });

        observer.observe(container);
    }

    const bodyObserver = new MutationObserver(() => {
        const noAnim = document.body.classList.contains('no-animation');

        if (!noAnim && !container.classList.contains('mix-active') && !container.classList.contains('mix-done')) {
            initAnimation();
        }

        if (noAnim) {
            container.classList.remove("mix-active");
            container.classList.add("mix-done");
            cards.forEach(card => {
                card.style.removeProperty("--random-x");
                card.style.removeProperty("--random-y");
                card.style.removeProperty("--random-rot");
                card.style.transition = "";
                card.style.willChange = "";
            });
        }
    });

    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    initAnimation();
});