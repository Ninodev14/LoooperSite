document.querySelectorAll('.btn-modal').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();

    const modalId = btn.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');

    // Sauvegarde du bouton déclencheur
    modal.dataset.triggerButton = btn;

    // Focus sur le premier élément pertinent
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

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', e => {
    const container = modal.querySelector('.modal-container');
    if (!container.contains(e.target)) {
      closeModal(modal);
    }
  });
});

function closeModal(modal) {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');

  const trigger = modal.dataset.triggerButton;
  if (trigger) trigger.focus();
}

document.querySelectorAll('.modal a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const modal = link.closest('.modal');
    if (modal) {
      closeModal(modal);
    }

    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const target = document.querySelector(targetId);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
          target.focus?.();
        }, 300);
      }
    }
  });
});
