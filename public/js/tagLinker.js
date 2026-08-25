function activateTagFilter(tag) {
  const targetBtn = document.querySelector(
    `.filter-tag[data-tag="${CSS.escape(tag)}"]`,
  );

  if (targetBtn) {
    targetBtn.click();
  } else {
    document.querySelector('.filter-tag[data-tag="all"]')?.click();
  }

  const url = new URL(window.location.href);
  if (tag === 'all') {
    url.searchParams.delete('tag');
  } else {
    url.searchParams.set('tag', tag);
  }
  window.history.replaceState({}, '', url);

  document
    .querySelector('.filters-ressources')
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('.tag-link').forEach((btn) => {
  btn.addEventListener('click', () => {
    activateTagFilter(btn.dataset.tag || 'all');
  });
});

const initialParams = new URLSearchParams(window.location.search);
const initialTag = initialParams.get('tag');
if (initialTag) {
  activateTagFilter(initialTag);
}