document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".mini-card-container");
    const cards = container.querySelectorAll(".mini-card, .revers-mini-card");
    container.classList.add("mix-active");
    
    cards.forEach(card => {
        const randomX = (Math.random() - 0.5) * 600;
        const randomY = (Math.random() - 0.5) * 600;
        const randomRot = (Math.random() - 0.5) * 200;
        card.style.setProperty("--random-x", randomX);
        card.style.setProperty("--random-y", randomY);
        card.style.setProperty("--random-rot", randomRot);
    });

    const isMobile = window.innerWidth < 768;
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            container.classList.remove("mix-active");

            setTimeout(() => {
                cards.forEach(card => {
                    card.style.transition = "all 0.2s ease";
                    card.style.willChange = "auto";
                    container.classList.add("mix-done")
                });
            }, 2200);

            observer.unobserve(container);
        }
    }, { 
        threshold: isMobile ? 0.05 : 0.3,
        rootMargin: isMobile ? "0px 0px -50px 0px" : "0px"
    });

    observer.observe(container);
});