document.addEventListener('DOMContentLoaded', () => {
  const old = document.getElementById('architecture');
  const projects = document.getElementById('projects');
  if (!old || !projects) return;
  old.remove();

  const style = document.createElement('style');
  style.textContent = `
    .architecture-section{padding:76px 0;background:var(--soft);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
    .architecture-intro{color:var(--muted);margin-top:-18px;margin-bottom:24px}
    .lab-legend{display:flex;flex-wrap:wrap;gap:14px;margin:0 0 16px;color:var(--muted);font:600 .68rem "JetBrains Mono",monospace}.lab-legend span{display:inline-flex;align-items:center;gap:7px}.legend-line{width:28px;height:0;border-top:2px solid #39d6ff}.legend-attack{border-top-color:#ff4d4d;border-top-style:dashed}.legend-vpn{border-top-color:#3fe58a;border-top-style:dotted}
    .lab-board{position:relative;min-height:720px;border:1px solid #1c3a55;border-radius:18px;overflow:hidden;background:radial-gradient(circle at 50% 25%,rgba(46,140,255,.09),transparent 34%),#07111e;box-shadow:0 20px 55px rgba(5,20,38,.18)}
    .lab-board:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(92,157,214,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(92,157,214,.08) 1px,transparent 1px);background-size:44px 44px;pointer-events:none}.lab-label{position:absolute;z-index:2;font:600 .68rem "JetBrains Mono",monospace;letter-spacing:.12em;color:#66b4ff}.lab-label.local{left:28px;top:25px}.lab-label.remote{right:28px;top:25px}.lab-label.siem{left:50%;top:25px;transform:translateX(-50%)}
    .lab-svg{position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none}.telemetry-path{stroke:#39d6ff;stroke-width:2;fill:none;filter:drop-shadow(0 0 4px rgba(57,214,255,.3))}.attack-path{stroke:#ff4d4d;stroke-width:2.5;stroke-dasharray:8 7;fill:none;filter:drop-shadow(0 0 5px rgba(255,77,77,.3))}.vpn-path{stroke:#3fe58a;stroke-width:2;stroke-dasharray:2 7;fill:none;filter:drop-shadow(0 0 4px rgba(63,229,138,.25))}
    .lab-node{position:absolute;z-index:3;width:220px;min-height:120px;padding:18px 19px;border:1px solid #294761;border-radius:14px;background:linear-gradient(145deg,#102238,#0a1727);color:#fff;box-shadow:0 14px 30px rgba(0,0,0,.2);cursor:grab;user-select:none;touch-action:none;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}.lab-node:active{cursor:grabbing}.lab-node:hover{transform:scale(1.035);border-color:#39d6ff;box-shadow:0 18px 42px rgba(0,0,0,.3),0 0 22px rgba(46,140,255,.12)}.lab-node.expanded{transform:scale(1.07);z-index:8;border-color:#65b2ff}.lab-node .node-kicker{font:600 .61rem "JetBrains Mono",monospace;letter-spacing:.09em;color:#79baff;margin-bottom:8px}.lab-node h3{font-size:1.05rem;margin:0 0 5px;font-weight:750}.lab-node p{margin:0;color:#9db3ca;font-size:.76rem;line-height:1.45}.node-badge{display:inline-block;margin-top:11px;padding:4px 7px;border-radius:5px;border:1px solid rgba(46,140,255,.3);background:rgba(46,140,255,.08);color:#6ec0ff;font:600 .57rem "JetBrains Mono",monospace}.node-badge.red{border-color:rgba(255,77,77,.4);background:rgba(255,77,77,.08);color:#ff8b8b}.node-badge.green{border-color:rgba(63,229,138,.35);background:rgba(63,229,138,.07);color:#73eaa3}
    .node-wazuh{width:270px;min-height:145px;left:50%;top:75px;transform:translateX(-50%);border-color:#2e8cff;box-shadow:0 18px 40px rgba(0,0,0,.25),0 0 25px rgba(46,140,255,.13)}.node-wazuh:hover{transform:translateX(-50%) scale(1.035)}.node-wazuh.expanded{transform:translateX(-50%) scale(1.07)}.node-ubuntu{left:5%;top:245px}.node-meta{left:27%;top:245px}.node-azure{right:5%;top:245px}.node-juice{right:27%;top:425px}.node-kali{left:50%;bottom:35px;transform:translateX(-50%);width:245px;border-color:#8b3030}.node-kali:hover{transform:translateX(-50%) scale(1.035)}.node-kali.expanded{transform:translateX(-50%) scale(1.07);border-color:#ff4d4d;box-shadow:0 18px 42px rgba(0,0,0,.3),0 0 25px rgba(255,77,77,.15)}.lab-hint{position:absolute;right:18px;bottom:14px;z-index:4;color:#607b96;font:500 .58rem "JetBrains Mono",monospace}.lab-note{margin-top:14px;padding:14px 17px;border:1px solid var(--line);border-radius:10px;background:var(--panel);color:var(--muted);font-size:.84rem}.lab-note strong{color:var(--text)}
    @media(max-width:991px){.lab-board{min-height:760px}.lab-node{width:190px}.node-wazuh{width:245px}.node-ubuntu{left:3%}.node-meta{left:26%}.node-azure{right:3%}.node-juice{right:25%}}
    @media(max-width:767px){.architecture-section{padding:58px 0}.lab-board{min-height:980px}.lab-label.local{left:17px}.lab-label.remote{right:17px}.lab-label.siem{top:18px}.lab-node{width:calc(50% - 24px);min-height:126px;padding:15px}.node-wazuh{width:calc(100% - 40px);left:20px;right:20px;top:65px;transform:none}.node-wazuh:hover,.node-wazuh.expanded{transform:scale(1.02)}.node-ubuntu{left:16px;top:245px}.node-meta{left:auto;right:16px;top:245px}.node-azure{left:16px;right:auto;top:405px}.node-juice{right:16px;top:405px}.node-kali{left:50%;bottom:30px;width:calc(100% - 100px);transform:translateX(-50%)}.node-kali:hover,.node-kali.expanded{transform:translateX(-50%) scale(1.035)}.lab-node h3{font-size:.94rem}.lab-node p{font-size:.68rem}.lab-hint{display:none}.lab-legend{font-size:.59rem;gap:9px}.lab-note{font-size:.78rem}}
  `;
  document.head.appendChild(style);

  const section = document.createElement('section');
  section.id = 'architecture';
  section.className = 'architecture-section';
  section.innerHTML = `
    <div class="container">
      <div class="section-heading"><span>04</span><h2>Lab Architecture</h2></div>
      <p class="architecture-intro">Interactive view of the controlled environment used for Wazuh monitoring, authorised testing and defensive validation.</p>
      <div class="lab-legend"><span><i class="legend-line"></i> Wazuh telemetry</span><span><i class="legend-line legend-attack"></i> Authorised attack traffic</span><span><i class="legend-line legend-vpn"></i> WireGuard VPN</span></div>
      <div class="lab-board" id="lab-board">
        <div class="lab-label siem">CENTRAL SIEM</div><div class="lab-label local">LOCAL VMs</div><div class="lab-label remote">REMOTE / CLOUD</div>
        <svg class="lab-svg" id="lab-svg" aria-hidden="true"><defs><marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#39d6ff"/></marker><marker id="arrow-red" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#ff4d4d"/></marker><marker id="arrow-green" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#3fe58a"/></marker></defs><g id="lab-lines"></g></svg>
        <article class="lab-node node-wazuh" data-node="wazuh"><div class="node-kicker">CENTRAL SIEM</div><h3>Wazuh Server</h3><p>Local virtual machine providing centralised log collection, alerting and security monitoring.</p><span class="node-badge">SIEM / MONITORING</span></article>
        <article class="lab-node node-ubuntu" data-node="ubuntu"><div class="node-kicker">LOCAL VM</div><h3>Ubuntu</h3><p>Monitored Linux endpoint sending telemetry to Wazuh.</p><span class="node-badge">WAZUH AGENT</span></article>
        <article class="lab-node node-meta" data-node="meta"><div class="node-kicker">LOCAL VM</div><h3>Metasploitable</h3><p>Intentionally vulnerable target used in controlled security exercises.</p><span class="node-badge">WAZUH AGENT</span></article>
        <article class="lab-node node-azure" data-node="azure"><div class="node-kicker">CLOUD VM</div><h3>Azure Ubuntu</h3><p>Cloud-hosted Ubuntu endpoint monitored by the Wazuh environment.</p><span class="node-badge">WAZUH AGENT</span></article>
        <article class="lab-node node-juice" data-node="juice"><div class="node-kicker">REMOTE SERVER</div><h3>Lecturer-hosted Server</h3><p>OWASP Juice Shop environment reached through the WireGuard VPN.</p><span class="node-badge green">WIREGUARD VPN</span></article>
        <article class="lab-node node-kali" data-node="kali"><div class="node-kicker">EXTERNAL / TESTING</div><h3>Kali Linux</h3><p>Authorised attack and penetration-testing machine. Deliberately kept outside the monitoring topology.</p><span class="node-badge red">ATTACK SIMULATION</span></article>
        <div class="lab-hint">DRAG NODES • HOVER TO EXPAND</div>
      </div>
      <div class="lab-note"><strong>Topology:</strong> Wazuh receives telemetry from the monitored endpoints. Azure is independently cloud-hosted. The lecturer-hosted Juice Shop environment is reached through WireGuard. Kali Linux is shown separately as the authorised testing machine, with red attack paths directed toward lab targets rather than toward the Wazuh server.</div>
    </div>`;
  projects.parentNode.insertBefore(section, projects);

  const board = document.getElementById('lab-board');
  const svg = document.getElementById('lab-svg');
  const lines = document.getElementById('lab-lines');
  const nodes = [...board.querySelectorAll('.lab-node')];
  const pairs = [['ubuntu','wazuh'],['meta','wazuh'],['azure','wazuh'],['juice','wazuh']];
  const attacks = ['ubuntu','meta','azure','juice'];

  function point(node, side){const br=board.getBoundingClientRect(),r=node.getBoundingClientRect(),x=r.left-br.left,y=r.top-br.top;if(side==='top')return[x+r.width/2,y];if(side==='bottom')return[x+r.width/2,y+r.height];if(side==='left')return[x,y+r.height/2];return[x+r.width,y+r.height/2]}
  function path(a,b,cls,marker,fromSide='top',toSide='bottom'){const p1=point(a,fromSide),p2=point(b,toSide),mid=(p1[1]+p2[1])/2;return `<path class="${cls}" marker-end="url(#${marker})" d="M ${p1[0]} ${p1[1]} C ${p1[0]} ${mid}, ${p2[0]} ${mid}, ${p2[0]} ${p2[1]}"/>`}
  function draw(){const w=board.clientWidth,h=board.clientHeight;svg.setAttribute('viewBox',`0 0 ${w} ${h}`);lines.innerHTML='';pairs.forEach(([a,b])=>{const from=document.querySelector(`[data-node="${a}"]`),to=document.querySelector(`[data-node="${b}"]`);lines.insertAdjacentHTML('beforeend',path(from,to,'telemetry-path','arrow-blue'));});const kali=document.querySelector('[data-node="kali"]');attacks.forEach(id=>{const target=document.querySelector(`[data-node="${id}"]`);const p1=point(kali,'top'),p2=point(target,'bottom'),mid=p1[1]-55;const d=`M ${p1[0]} ${p1[1]} C ${p1[0]} ${mid}, ${p2[0]} ${mid}, ${p2[0]} ${p2[1]}`;lines.insertAdjacentHTML('beforeend',`<path class="attack-path" marker-end="url(#arrow-red)" d="${d}"/>`);});const wNode=document.querySelector('[data-node="wazuh"]'),j=document.querySelector('[data-node="juice"]');const p1=point(wNode,'right'),p2=point(j,'left');lines.insertAdjacentHTML('beforeend',`<path class="vpn-path" marker-end="url(#arrow-green)" d="M ${p1[0]} ${p1[1]} C ${p1[0]+80} ${p1[1]}, ${p2[0]-80} ${p2[1]}, ${p2[0]} ${p2[1]}"/>`)}

  let active=null;
  nodes.forEach(node=>{
    node.addEventListener('mouseenter',()=>node.classList.add('expanded'));
    node.addEventListener('mouseleave',()=>{if(!active)node.classList.remove('expanded')});
    node.addEventListener('pointerdown',e=>{active={node,startX:e.clientX,startY:e.clientY,left:node.offsetLeft,top:node.offsetTop};node.setPointerCapture?.(e.pointerId);node.classList.add('expanded');node.style.transition='none';e.preventDefault()});
    node.addEventListener('pointermove',e=>{if(!active||active.node!==node)return;const dx=e.clientX-active.startX,dy=e.clientY-active.startY,maxX=board.clientWidth-node.offsetWidth-8,maxY=board.clientHeight-node.offsetHeight-8;node.style.left=`${Math.max(8,Math.min(maxX,active.left+dx))}px`;node.style.top=`${Math.max(8,Math.min(maxY,active.top+dy))}px`;node.style.right='auto';node.style.bottom='auto';node.style.transform='none';draw()});
    node.addEventListener('pointerup',()=>{if(!active||active.node!==node)return;active=null;node.style.transition='';draw()});
    node.addEventListener('pointercancel',()=>{active=null;node.style.transition='';draw()});
  });
  window.addEventListener('resize',draw);requestAnimationFrame(draw);
});
