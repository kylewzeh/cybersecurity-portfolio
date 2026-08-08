document.addEventListener('DOMContentLoaded', () => {
  const projects = document.getElementById('projects');
  if (!projects || document.getElementById('lab-board')) return;

  const style = document.createElement('style');
  style.textContent = `
    .architecture-section{padding:72px 0;background:var(--soft);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
    .architecture-intro{color:var(--muted);margin:0 0 20px}
    .lab-legend{display:flex;flex-wrap:wrap;gap:14px;margin:0 0 14px;color:var(--muted);font:600 .68rem "JetBrains Mono",monospace}.lab-legend span{display:inline-flex;align-items:center;gap:7px}.legend-line{width:28px;border-top:2px solid #39d6ff}.legend-line.attack{border-top-color:#ff4d4d;border-top-style:dashed}.legend-line.vpn{border-top-color:#3fe58a;border-top-style:dotted}
    .lab-board{position:relative;min-height:700px;border:1px solid #1c3a55;border-radius:18px;overflow:hidden;background:radial-gradient(circle at 50% 22%,rgba(46,140,255,.09),transparent 36%),#07111e;box-shadow:0 20px 55px rgba(5,20,38,.18)}
    .lab-board:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(92,157,214,.075) 1px,transparent 1px),linear-gradient(90deg,rgba(92,157,214,.075) 1px,transparent 1px);background-size:44px 44px;pointer-events:none}
    .lab-svg{position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none}.telemetry{stroke:#39d6ff;stroke-width:2.3;fill:none;filter:drop-shadow(0 0 4px rgba(57,214,255,.25))}.attack{stroke:#ff4d4d;stroke-width:2.5;stroke-dasharray:8 7;fill:none;filter:drop-shadow(0 0 5px rgba(255,77,77,.25))}
    .lab-node{position:absolute;z-index:3;width:230px;min-height:125px;padding:17px 19px;border:1px solid #294761;border-radius:14px;background:linear-gradient(145deg,#102238,#0a1727);color:#fff;box-shadow:0 14px 30px rgba(0,0,0,.2);cursor:pointer;user-select:none;transition:opacity .22s,transform .22s,border-color .22s,box-shadow .22s}.lab-node:hover{transform:scale(1.025);border-color:#39d6ff;box-shadow:0 18px 40px rgba(0,0,0,.28),0 0 20px rgba(46,140,255,.12)}.node-wazuh{width:270px;left:50%;top:62px;transform:translateX(-50%);border-color:#2e8cff}.node-wazuh:hover{transform:translateX(-50%) scale(1.025)}.node-kali{width:250px;left:50%;bottom:28px;transform:translateX(-50%);border-color:#8b3030}.node-kali:hover{transform:translateX(-50%) scale(1.025)}
    .node-ubuntu{left:4%;top:285px}.node-meta{left:27%;top:285px}.node-juice{right:27%;top:285px}.node-azure{right:4%;top:285px}
    .node-kicker{font:600 .61rem "JetBrains Mono",monospace;letter-spacing:.09em;color:#79baff;margin-bottom:8px}.lab-node h3{font-size:1.06rem;margin:0 0 5px;font-weight:750}.lab-node p{margin:0;color:#9db3ca;font-size:.76rem;line-height:1.45}.node-badge{display:inline-block;margin-top:10px;padding:4px 7px;border-radius:5px;border:1px solid rgba(46,140,255,.3);background:rgba(46,140,255,.08);color:#6ec0ff;font:600 .56rem "JetBrains Mono",monospace}.node-badge.red{border-color:rgba(255,77,77,.4);background:rgba(255,77,77,.08);color:#ff8b8b}.node-badge.green{border-color:rgba(63,229,138,.35);background:rgba(63,229,138,.07);color:#73eaa3}
    .lab-label{position:absolute;z-index:4;top:20px;color:#66b4ff;font:600 .65rem "JetBrains Mono",monospace;letter-spacing:.12em}.lab-label.siem{left:50%;transform:translateX(-50%)}.lab-label.local{left:24px}.lab-label.remote{right:24px}.vpn-label{position:absolute;z-index:4;right:24px;top:245px;padding:6px 9px;border:1px solid rgba(63,229,138,.35);border-radius:7px;background:rgba(7,17,30,.9);color:#73eaa3;font:600 .56rem "JetBrains Mono",monospace}.lab-hint{position:absolute;z-index:4;right:18px;bottom:12px;color:#607b96;font:500 .56rem "JetBrains Mono",monospace}
    .lab-board.focus-mode .lab-node{opacity:.06;pointer-events:none}.lab-board.focus-mode .lab-node.focus-visible{opacity:1;pointer-events:auto;z-index:8}.lab-board.focus-mode .lab-label,.lab-board.focus-mode .vpn-label{opacity:.15}
    .architecture-detail{display:none;margin-top:14px;padding:18px 20px;border:1px solid #244661;border-radius:12px;background:linear-gradient(145deg,#0d1d30,#091522);box-shadow:0 12px 28px rgba(0,0,0,.14)}.architecture-detail.visible{display:flex;align-items:center;justify-content:space-between;gap:22px}.detail-kicker{color:#68b8ff;font:600 .62rem "JetBrains Mono",monospace;letter-spacing:.12em;margin-bottom:6px}.architecture-detail h3{margin:0 0 5px;font-size:1.08rem}.architecture-detail p{margin:0;color:#9db3ca;font-size:.82rem;line-height:1.55}.detail-close{border:1px solid #355b78;background:transparent;color:#9ec8ec;border-radius:8px;padding:8px 11px;font:600 .61rem "JetBrains Mono",monospace;cursor:pointer;white-space:nowrap}.detail-close:hover{border-color:#59baff;color:#fff}.lab-note{margin-top:13px;padding:14px 17px;border:1px solid var(--line);border-radius:10px;background:var(--panel);color:var(--muted);font-size:.82rem}.lab-note strong{color:var(--text)}
    @media(max-width:991px){.lab-board{min-height:740px}.lab-node{width:195px}.node-wazuh{width:245px}.node-ubuntu{left:3%}.node-meta{left:26%}.node-juice{right:26%}.node-azure{right:3%}}
    @media(max-width:767px){.architecture-section{padding:58px 0}.lab-board{min-height:900px}.lab-node{width:calc(50% - 24px);min-height:128px;padding:15px}.node-wazuh{width:calc(100% - 36px);left:18px;top:58px;transform:none}.node-wazuh:hover{transform:scale(1.02)}.node-ubuntu{left:16px;top:245px}.node-meta{right:16px;left:auto;top:245px}.node-azure{left:16px;right:auto;top:410px}.node-juice{right:16px;left:auto;top:410px}.node-kali{width:calc(100% - 90px);left:50%;bottom:25px;transform:translateX(-50%)}.node-kali:hover{transform:translateX(-50%) scale(1.02)}.lab-label{font-size:.57rem}.lab-label.local{left:16px}.lab-label.remote{right:16px}.lab-label.siem{top:18px}.vpn-label{top:570px;right:16px}.lab-hint{display:none}.lab-node h3{font-size:.94rem}.lab-node p{font-size:.68rem}.architecture-detail.visible{display:block}.detail-close{margin-top:12px}.lab-legend{font-size:.59rem;gap:9px}}
  `;
  document.head.appendChild(style);

  const section = document.createElement('section');
  section.id = 'architecture';
  section.className = 'architecture-section';
  section.innerHTML = `
    <div class="container">
      <div class="section-heading"><span>04</span><h2>Lab Architecture</h2></div>
      <p class="architecture-intro">Interactive view of the controlled environment used for Wazuh monitoring, authorised testing and defensive validation.</p>
      <div class="lab-legend"><span><i class="legend-line"></i> Wazuh telemetry</span><span><i class="legend-line attack"></i> Authorised attack traffic</span><span><i class="legend-line vpn"></i> WireGuard VPN access</span></div>
      <div class="lab-board" id="lab-board" aria-label="Interactive cybersecurity lab architecture">
        <div class="lab-label siem">CENTRAL SIEM</div><div class="lab-label local">LOCAL VMs</div><div class="lab-label remote">REMOTE / CLOUD</div>
        <div class="vpn-label">WIREGUARD VPN • REMOTE JUICE SHOP</div>
        <svg class="lab-svg" id="lab-svg" aria-hidden="true"><defs><marker id="arrow-blue-v2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#39d6ff"/></marker><marker id="arrow-red-v2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#ff4d4d"/></marker></defs><g id="lab-lines"></g></svg>
        <article class="lab-node node-wazuh" data-node="wazuh" tabindex="0"><div class="node-kicker">CENTRAL SIEM</div><h3>Wazuh Server</h3><p>Local virtual machine providing centralised log collection, alerting and security monitoring.</p><span class="node-badge">SIEM / MONITORING</span></article>
        <article class="lab-node node-ubuntu" data-node="ubuntu" tabindex="0"><div class="node-kicker">LOCAL VM / AGENT</div><h3>Ubuntu</h3><p>Monitored Linux endpoint sending telemetry to Wazuh.</p><span class="node-badge">WAZUH AGENT</span></article>
        <article class="lab-node node-meta" data-node="meta" tabindex="0"><div class="node-kicker">LOCAL VM / AGENT</div><h3>Metasploitable</h3><p>Intentionally vulnerable target used in controlled security exercises.</p><span class="node-badge">WAZUH AGENT</span></article>
        <article class="lab-node node-juice" data-node="juice" tabindex="0"><div class="node-kicker">REMOTE / VPN</div><h3>Lecturer-hosted Server</h3><p>Remote environment hosting OWASP Juice Shop, reached through WireGuard.</p><span class="node-badge green">WIREGUARD VPN</span></article>
        <article class="lab-node node-azure" data-node="azure" tabindex="0"><div class="node-kicker">CLOUD VM / AGENT</div><h3>Azure Ubuntu</h3><p>Cloud-hosted Ubuntu endpoint monitored by the Wazuh environment.</p><span class="node-badge">WAZUH AGENT</span></article>
        <article class="lab-node node-kali" data-node="kali" tabindex="0"><div class="node-kicker">EXTERNAL / AUTHORISED TESTING</div><h3>Kali Linux</h3><p>Testing machine kept outside the monitoring topology. Red paths represent authorised attack simulation traffic.</p><span class="node-badge red">ATTACK SIMULATION</span></article>
        <div class="lab-hint">CLICK A NODE TO FOCUS • CLICK AGAIN TO RESET</div>
      </div>
      <div class="architecture-detail" id="architecture-detail"><div><div class="detail-kicker" id="detail-kicker"></div><h3 id="detail-title"></h3><p id="detail-copy"></p></div><button class="detail-close" id="detail-close" type="button">RESET FULL VIEW</button></div>
      <div class="lab-note"><strong>Interactive topology:</strong> Click a node to isolate its relevant connections and read a fuller explanation. The topology is fixed deliberately; it cannot be accidentally dragged out of position.</div>
    </div>`;
  projects.parentNode.insertBefore(section, projects);

  const board = document.getElementById('lab-board');
  const svg = document.getElementById('lab-svg');
  const lines = document.getElementById('lab-lines');
  const detail = document.getElementById('architecture-detail');
  const close = document.getElementById('detail-close');
  const nodes = [...board.querySelectorAll('.lab-node')];
  const targets = ['ubuntu','meta','juice','azure'];
  let focus = null;
  const info = {
    wazuh:['CENTRAL SIEM','Wazuh Server','Central monitoring point. It receives endpoint telemetry, generates alerts and provides the environment used to investigate security events and validate defensive controls.'],
    ubuntu:['LOCAL VM • WAZUH AGENT','Ubuntu','A monitored local Linux endpoint. Its system and authentication activity is collected by the Wazuh environment for security monitoring.'],
    meta:['LOCAL VM • WAZUH AGENT','Metasploitable','An intentionally vulnerable local target used in controlled exercises. Activity against the target provides safe test data for detection and investigation.'],
    juice:['REMOTE SERVER • WIREGUARD','Lecturer-hosted Server','A remote lab server hosting OWASP Juice Shop. Access to this environment was provided through a WireGuard VPN; Azure is a separate cloud environment.'],
    azure:['CLOUD VM • WAZUH AGENT','Azure Ubuntu','An Ubuntu virtual machine hosted in Microsoft Azure and monitored through Wazuh, demonstrating endpoint visibility in a cloud environment.'],
    kali:['EXTERNAL • AUTHORISED TESTING','Kali Linux','The external testing machine used for authorised exercises against the controlled targets. It is intentionally separate from the Wazuh topology; red paths represent simulated attack traffic.']
  };

  const node = id => board.querySelector(`[data-node="${id}"]`);
  const pt = (el, side) => { const b=board.getBoundingClientRect(), r=el.getBoundingClientRect(); const x=r.left-b.left, y=r.top-b.top; if(side==='top') return [x+r.width/2,y]; return [x+r.width/2,y+r.height]; };
  const path = (cls, marker, d) => lines.insertAdjacentHTML('beforeend', `<path class="${cls}" marker-end="url(#${marker})" d="${d}"/>`);
  const telemetry = (from,to) => { const a=pt(from,'top'), b=pt(to,'bottom'), bend=Math.max(45,Math.abs(a[1]-b[1])*.38); return `M${a[0]} ${a[1]} C${a[0]} ${a[1]-bend},${b[0]} ${b[1]+bend},${b[0]} ${b[1]}`; };

  function draw(){
    const w=board.clientWidth,h=board.clientHeight; svg.setAttribute('viewBox',`0 0 ${w} ${h}`); lines.innerHTML='';
    const wazuh=node('wazuh'), kali=node('kali');
    const activeTargets = focus && focus !== 'wazuh' && focus !== 'kali' ? [focus] : targets;
    if(focus !== 'kali') activeTargets.forEach(id => path('telemetry','arrow-blue-v2',telemetry(node(id),wazuh)));
    if(focus !== 'wazuh'){
      const railY = Math.max(500, board.clientHeight-210); const kp=pt(kali,'top');
      const chosen = focus && focus !== 'kali' ? [focus] : targets;
      chosen.forEach(id=>{ const t=node(id), tp=pt(t,'bottom'), x=tp[0]; path('attack','arrow-red-v2',`M${kp[0]} ${kp[1]} C${kp[0]} ${kp[1]-55},${x} ${railY+45},${x} ${railY} L${x} ${tp[1]}`); });
    }
  }

  function setFocus(id){
    if(focus===id){ reset(); return; }
    focus=id; board.classList.add('focus-mode');
    nodes.forEach(n=>n.classList.remove('focus-visible'));
    const visible = id==='wazuh' ? ['wazuh',...targets] : id==='kali' ? ['kali',...targets] : ['wazuh','kali',id];
    visible.forEach(v=>node(v)?.classList.add('focus-visible'));
    const d=info[id]; document.getElementById('detail-kicker').textContent=d[0]; document.getElementById('detail-title').textContent=d[1]; document.getElementById('detail-copy').textContent=d[2]; detail.classList.add('visible');
    requestAnimationFrame(draw);
  }
  function reset(){ focus=null; board.classList.remove('focus-mode'); nodes.forEach(n=>n.classList.remove('focus-visible')); detail.classList.remove('visible'); requestAnimationFrame(draw); }

  nodes.forEach(n=>{ n.addEventListener('mouseenter',()=>{if(!focus)n.classList.add('expanded')}); n.addEventListener('mouseleave',()=>n.classList.remove('expanded')); n.addEventListener('click',()=>setFocus(n.dataset.node)); n.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setFocus(n.dataset.node)}}); });
  close.addEventListener('click',reset); document.addEventListener('keydown',e=>{if(e.key==='Escape')reset()}); window.addEventListener('resize',()=>requestAnimationFrame(draw)); requestAnimationFrame(draw);
});
