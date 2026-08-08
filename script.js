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
const progressBar = document.getElementById('scroll-progress-bar');

function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressBar) progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  if (backToTop) backToTop.classList.toggle('show', window.scrollY > 450);
}

window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

backToTop?.addEventListener('click', (event) => {
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

const navLinks = [...document.querySelectorAll('.site-nav .nav-link[href^="#"]')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });
  sections.forEach((section) => observer.observe(section));
}

const navCollapse = document.getElementById('navbarNav');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 992 && navCollapse?.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
    }
  });
});
