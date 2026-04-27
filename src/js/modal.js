document.addEventListener('DOMContentLoaded', () => {

    const allModals = document.querySelectorAll('.modal');

    // --- 1. FONCTIONS DE CŒUR ---

    function openModal(modalId, triggerElement = null) {
        const cleanId = modalId.replace('#', '');
        const modal = document.getElementById(cleanId);

        if (modal) {
            // Fermer les autres modals pour éviter les superpositions
            allModals.forEach(m => closeModal(m, false)); 

            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');

            // Mémorise l'élément qui a ouvert la modal
            if (triggerElement) {
                modal.dataset.triggerId = triggerElement.id || "";
            }

            // Focus accessibilité
            const focusable = modal.querySelector('h2, h3, button, a, input');
            if (focusable) {
                setTimeout(() => focusable.focus(), 50);
            }
        }
    }

    function closeModal(modal, clearHash = true) {
        if (!modal || !modal.classList.contains('active')) return;

        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');

        // Nettoyage URL si nécessaire
        if (clearHash && window.location.hash === `#${modal.id}`) {
            history.replaceState(null, null, ' ');
        }

        // Retour du focus au bouton d'origine
        if (modal.dataset.triggerId) {
            const trigger = document.getElementById(modal.dataset.triggerId);
            if (trigger) trigger.focus();
        }
    }

    // --- 2. ÉCOUTEURS D'ÉVÉNEMENTS ---

    // Clic sur les boutons ouvrant une modal
    document.querySelectorAll('.btn-modal').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const target = btn.getAttribute('data-modal') || btn.getAttribute('href');
            openModal(target, btn);
        });
    });

    // Clic sur les boutons de fermeture
    document.querySelectorAll('.btn-close').forEach(btn => {
        btn.addEventListener('click', () => closeModal(btn.closest('.modal')));
    });

    // Clic sur l'overlay (fond)
    allModals.forEach(modal => {
        modal.addEventListener('click', e => {
            const container = modal.querySelector('.modal-container');
            // Si on clique sur le fond (modal) et pas sur le contenu (container)
            if (container && !container.contains(e.target)) {
                closeModal(modal);
            }
        });
    });

    // Touche Échap
    document.addEventListener('keydown', e => {
        if (e.key === "Escape") {
            const active = document.querySelector('.modal.active');
            if (active) closeModal(active);
        }
    });

    // --- 3. LIENS INTERNES À LA MODAL (C'est la partie qui manquait !) ---
    // Gère le clic sur un lien qui pointe vers une ancre (ex: #contactForm)
    document.querySelectorAll('.modal a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Si la cible n'est pas une autre modal, on ferme l'actuelle et on scroll
            if (targetElement && !targetElement.classList.contains('modal')) {
                const currentModal = link.closest('.modal');
                closeModal(currentModal);

                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    targetElement.focus();
                }, 300); // Délai pour laisser la modal disparaître
            }
        });
    });

    // --- 4. GESTION DU HASH (Lien direct via URL) ---
    function handleHash() {
        const hash = window.location.hash;
        if (hash) {
            const target = document.querySelector(hash);
            if (target) {
                if (target.classList.contains('modal')) {
                    openModal(hash);
                } else if (target.closest('.modal')) {
                    // Si le lien pointe vers un titre à l'intérieur d'une modal
                    openModal(target.closest('.modal').id);
                }
            }
        }
    }

    window.addEventListener('DOMContentLoaded', handleHash);
    window.addEventListener('hashchange', handleHash);
});
