const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('.theme-icon');
const themeLabel = themeToggle?.querySelector('.theme-label');

function applyTheme(theme) {
  root.dataset.theme = theme;
  const light = theme === 'light';
  if (themeIcon) themeIcon.textContent = light ? '☾' : '☼';
  if (themeLabel) themeLabel.textContent = light ? 'Dark' : 'Light';
  if (themeToggle) themeToggle.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
}

const savedTheme = localStorage.getItem('portfolio-theme');
applyTheme(savedTheme === 'light' ? 'light' : 'dark');

themeToggle?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('portfolio-theme', next);
});

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
