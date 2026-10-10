(() => {
  const dialog = document.getElementById('image-dialog');
  const dialogImage = dialog.querySelector('img');
  const dialogCaption = dialog.querySelector('p');
  let opener;
  document.addEventListener('click', event => {
    const imageButton = event.target.closest('button[data-image]');
    if (imageButton) {
      opener = imageButton;
      dialogImage.src = imageButton.dataset.image;
      dialogImage.alt = imageButton.dataset.caption;
      dialogCaption.textContent = imageButton.dataset.caption;
      dialog.showModal();
    }
    if (event.target.closest('.dialog-close') || event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => opener?.focus({ preventScroll: true }));
  const links = Array.from(document.querySelectorAll('.case-nav a'));
  const sections = Array.from(document.querySelectorAll('.case-section'));
  const observer = new IntersectionObserver(entries => {
    const active = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!active) return;
    for (const link of links) {
      if (link.getAttribute('href') === `#${active.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }, { rootMargin: '-100px 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));
})();
