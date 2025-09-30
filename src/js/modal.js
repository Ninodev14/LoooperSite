document.querySelectorAll('.btn-project').forEach(btn => {
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
