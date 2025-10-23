document.querySelectorAll('.btn-modal').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();

    const modalId = btn.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');

    modal.dataset.triggerButton = btn;

    const focusable = modal.querySelector('h3, button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if (focusable) {
      focusable.setAttribute('tabindex', '-1');
      focusable.focus();
    }
  });
});

document.querySelectorAll('.btn-close').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    closeModal(modal);
  });
});

document.addEventListener('keydown', e => {
  if (e.key === "Escape") {
    document.querySelectorAll('.modal.active').forEach(modal => {
      closeModal(modal);
    });
  }
});

function closeModal(modal) {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');

  const trigger = modal.dataset.triggerButton;
  if (trigger) trigger.focus();
}

// Fermer la modal quand on clique sur un lien qui mène à une ancre (ex: #contactForm)
document.querySelectorAll('.modal a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const modal = link.closest('.modal');
    if (modal) {
      closeModal(modal); // ferme la modal
    }

    // Laisse le comportement de l'ancre se produire après un léger délai
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const target = document.querySelector(targetId);
      if (target) {
        // petit délai pour laisser la fermeture s'animer proprement
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
          target.focus?.(); // si focusable
        }, 300);
      }
    }
  });
});


