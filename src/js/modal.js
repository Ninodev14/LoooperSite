/**
 * GESTIONNAIRE DE MODALES
 * Permet l'ouverture par clic, par URL (hash) et gère l'accessibilité.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SÉLECTEURS ET VARIABLES ---
    const allModals = document.querySelectorAll('.modal');
    const modalButtons = document.querySelectorAll('.btn-modal');
    const closeButtons = document.querySelectorAll('.btn-close');

    // --- 2. FONCTIONS DE CŒUR ---

    /**
     * Ouvre une modale spécifique
     * @param {string} modalId - L'ID de la modale (avec ou sans #)
     * @param {HTMLElement} triggerElement - Le bouton qui a déclenché l'ouverture
     */
    function openModal(modalId, triggerElement = null) {
        const cleanId = modalId.replace('#', '');
        const modal = document.getElementById(cleanId);

        if (modal) {
            // On ferme les éventuelles autres modales ouvertes d'abord
            allModals.forEach(m => {
                if (m !== modal) closeModal(m);
            });

            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');

            // Mémorisation du bouton déclencheur pour le retour du focus
            if (triggerElement) {
                modal.setAttribute('data-last-focus', triggerElement.id);
            }

            // Focus sur le titre ou le premier élément interactif
            const focusable = modal.querySelector('h2, h3, button, a, input');
            if (focusable) {
                setTimeout(() => focusable.focus(), 50); // Petit délai pour le rendu
            }
        }
    }

    /**
     * Ferme une modale
     * @param {HTMLElement} modal - L'élément DOM de la modale
     */
    function closeModal(modal) {
        if (!modal || !modal.classList.contains('active')) return;

        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');

        // Nettoyage de l'URL (enlève le hash sans recharger la page)
        if (window.location.hash === `#${modal.id}`) {
            history.replaceState(null, null, ' ');
        }

        // Retour du focus sur le bouton d'origine s'il existe
        const lastFocusId = modal.getAttribute('data-last-focus');
        if (lastFocusId) {
            const btn = document.getElementById(lastFocusId);
            if (btn) btn.focus();
        }
    }

    // --- 3. ÉCOUTEURS D'ÉVÉNEMENTS ---

    // Clic sur les boutons de la page
    modalButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = btn.getAttribute('data-modal') || btn.getAttribute('href');
            openModal(target, btn);
        });
    });

    // Clic sur les boutons de fermeture
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.closest('.modal'));
        });
    });

    // Fermeture par la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) closeModal(activeModal);
        }
    });

    // Fermeture au clic sur l'overlay (fond sombre)
    allModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            // Si on clique sur .modal (le fond) et non sur .modal-container
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // --- 4. GESTION DU LIEN DIRECT (URL) ---

    /**
     * Vérifie si l'URL contient un hash correspondant à une modale
     */
    function handleHash() {
        const hash = window.location.hash;
        if (hash) {
            // On vérifie que l'élément est bien une modale pour éviter les bugs
            const target = document.querySelector(hash);
            if (target && target.classList.contains('modal')) {
                openModal(hash);
            }
        }
    }

    // On vérifie au chargement et si l'utilisateur change manuellement l'URL
    handleHash();
    window.addEventListener('hashchange', handleHash);

});