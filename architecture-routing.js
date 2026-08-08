document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('lab-board');
  const lines = document.getElementById('lab-lines');
  if (!board || !lines) return;

  const targets = ['ubuntu','meta','azure','juice'];
  const routeAttackPaths = () => {
    const br = board.getBoundingClientRect();
    const kali = board.querySelector('[data-node="kali"]');
    if (!kali) return;
    const kr = kali.getBoundingClientRect();
    const kx = kr.left - br.left;
    const ky = kr.top - br.top;
    const kw = kr.width;
    const kh = kr.height;
    const attackPaths = [...lines.querySelectorAll('.attack-path')];

    targets.forEach((id, index) => {
      const target = board.querySelector(`[data-node="${id}"]`);
      const path = attackPaths[index];
      if (!target || !path) return;
      const tr = target.getBoundingClientRect();
      const tx = tr.left - br.left;
      const ty = tr.top - br.top;
      const rail = index < 2 ? Math.max(18, tx - 34 - index * 18) : Math.min(br.width - 18, tx - 34);
      const startX = index < 2 ? kx : kx + kw;
      const startY = ky;
      const targetX = tx;
      const targetY = ty + tr.height / 2;
      const exitY = startY - 24;
      const d = `M ${startX} ${startY} C ${startX} ${exitY}, ${rail} ${exitY}, ${rail} ${exitY} L ${rail} ${targetY} L ${targetX} ${targetY}`;
      path.setAttribute('d', d);
    });
  };

  const observer = new MutationObserver(() => requestAnimationFrame(routeAttackPaths));
  observer.observe(lines, {childList:true});
  window.addEventListener('resize', routeAttackPaths);
  requestAnimationFrame(routeAttackPaths);
});
