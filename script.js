const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 450) backToTop.classList.add('show');
  else backToTop.classList.remove('show');
});

backToTop.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    const original = button.textContent;

    try {
      await navigator.clipboard.writeText(value);
      button.textContent = 'Copied';
      setTimeout(() => { button.textContent = original; }, 1400);
    } catch (error) {
      window.prompt('Copy this value:', value);
    }
  });
});
