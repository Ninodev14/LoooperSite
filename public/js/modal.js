document.addEventListener('DOMContentLoaded', () => {

    const allModals = document.querySelectorAll('.modal');

    const COLOR_CLASSES = ['blue', 'purple', 'orange'];

    function openModal(modalId, triggerElement = null) {
        const cleanId = modalId.replace('#', '');
        const modal = document.getElementById(cleanId);

        if (modal) {
            allModals.forEach(m => closeModal(m, false));
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');

            if (triggerElement) {
                modal.dataset.triggerId = triggerElement.id || "";

                const colorSource =
                    triggerElement.closest('[class*="-blue"], [class*="-purple"], [class*="-orange"]') ||
                    triggerElement.closest('article, .swiper-slide')?.querySelector('.highlight-no-annim');

                const modalContainer = modal.querySelector('.modal-container');
                const highlights = modal.querySelectorAll('.highlight-no-annim');

                if (modalContainer) {
                    COLOR_CLASSES.forEach(c => {
                        modalContainer.classList.remove(`modal-${c}`);
                    });

                    if (colorSource) {
                        const colorClass = COLOR_CLASSES.find(c =>
                            [...colorSource.classList].some(cls => cls.includes(`-${c}`) || cls === c)
                        );
                        if (colorClass) {
                            modalContainer.classList.add(`modal-${colorClass}`);

                            highlights.forEach(h => {
                                COLOR_CLASSES.forEach(c => h.classList.remove(c));
                                h.classList.add(colorClass);
                            });
                        }
                    }
                }
            }

            const focusable = modal.querySelector('h2, h3, button, a, input');
            if (focusable) setTimeout(() => focusable.focus(), 50);
        }
    }

    function closeModal(modal, clearHash = true) {
        if (!modal || !modal.classList.contains('active')) return;

        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');

        if (clearHash && window.location.hash === `#${modal.id}`) {
            history.replaceState(null, null, ' ');
        }

        if (modal.dataset.triggerId) {
            const trigger = document.getElementById(modal.dataset.triggerId);
            if (trigger) trigger.focus();
        }
    }


    document.querySelectorAll('.btn-modal').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const target = btn.getAttribute('data-modal') || btn.getAttribute('href');
            openModal(target, btn);
        });
    });

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

    document.addEventListener('keydown', e => {
        if (e.key === "Escape") {
            const active = document.querySelector('.modal.active');
            if (active) closeModal(active);
        }
    });

    document.querySelectorAll('.modal a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement && !targetElement.classList.contains('modal')) {
                const currentModal = link.closest('.modal');
                closeModal(currentModal);

                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    targetElement.focus();
                }, 300); 
            }
        });
    });

    function handleHash() {
        const hash = window.location.hash;
        if (hash) {
            const target = document.querySelector(hash);
            if (target) {
                if (target.classList.contains('modal')) {
                    openModal(hash);
                } else if (target.closest('.modal')) {
                    openModal(target.closest('.modal').id);
                }
            }
        }
    }

    window.addEventListener('DOMContentLoaded', handleHash);
    window.addEventListener('hashchange', handleHash);
});
