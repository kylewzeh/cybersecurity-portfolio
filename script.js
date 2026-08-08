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

const architectureStyle = document.createElement('style');
architectureStyle.textContent = `
.architecture-section{padding:70px 0;background:var(--soft)}
.architecture-frame{border:1px solid var(--line);border-radius:16px;overflow:hidden;background:#07111e;box-shadow:0 18px 45px rgba(10,30,60,.12)}
.architecture-frame img{display:block;width:100%;height:auto}
.architecture-note{margin-top:14px;padding:15px 18px;border:1px solid var(--line);border-radius:10px;background:var(--panel);color:var(--muted);font-size:.88rem}
.architecture-note strong{color:var(--text)}
@media(max-width:767px){.architecture-section{padding:58px 0}.architecture-frame{border-radius:12px}.architecture-note{font-size:.82rem}}
`;
document.head.appendChild(architectureStyle);

const projectsSection = document.getElementById('projects');
if (projectsSection) {
  const architecture = document.createElement('section');
  architecture.id = 'architecture';
  architecture.className = 'architecture-section';
  architecture.innerHTML = `
    <div class="container">
      <div class="section-heading"><span>04.5</span><h2>Lab Architecture</h2></div>
      <p class="section-intro">A controlled multi-node environment used for security monitoring, authorised testing and defensive validation.</p>
      <div class="architecture-frame"><img src="architecture.svg" alt="Diagram of the controlled Wazuh cybersecurity lab architecture" loading="lazy"></div>
      <div class="architecture-note"><strong>How it worked:</strong> Kali Linux was used for authorised testing against lab targets. Endpoint and IDS telemetry was collected centrally by Wazuh for alert generation, investigation and validation of defensive controls.</div>
    </div>`;
  projectsSection.parentNode.insertBefore(architecture, projectsSection);
}
