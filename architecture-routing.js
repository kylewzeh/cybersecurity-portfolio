document.addEventListener('DOMContentLoaded', () => {
  const projects = document.getElementById('projects');
  if (!projects || document.getElementById('lab-board')) return;

  const style = document.createElement('style');
  style.textContent = `
    .architecture-section{padding:72px 0;background:var(--soft);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
    .architecture-intro{color:var(--muted);margin:0 0 20px}
    .lab-legend{display:flex;flex-wrap:wrap;gap:14px;margin:0 0 14px;color:var(--muted);font:600 .68rem "JetBrains Mono",monospace}
    .lab-legend span{display:inline-flex;align-items:center;gap:7px}.legend-line{width:28px;border-top:2px solid #39d6ff}.legend-line.attack{border-top-color:#ff4d4d;border-top-style:dashed}.legend-line.vpn{border-top-color:#3fe58a;border-top-style:dotted}
    .lab-board{position:relative;min-height:680px;border:1px solid #1c3a55;border-radius:18px;overflow:hidden;background:radial-gradient(circle at 50% 20%,rgba(46,140,255,.09),transparent 38%),#07111e;box-shadow:0 20px 55px rgba(5,20,38,.18)}
    .lab-board:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(92,157,214,.075) 1px,transparent 1px),linear-gradient(90deg,rgba(92,157,214,.075) 1px,transparent 1px);background-size:44px 44px;pointer-events:none}
    .lab-svg{position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none}.telemetry{stroke:#39d6ff;stroke-width:2.4;fill:none;filter:drop-shadow(0 0 4px rgba(57,214,255,.22))}.attack{stroke:#ff4d4d;stroke-width:2.5;stroke-dasharray:8 7;fill:none;filter:drop-shadow(0 0 5px rgba(255,77,77,.2))}
    .lab-node{position:absolute;z-index:3;width:230px;min-height:125px;padding:17px 19px;border:1px solid #294761;border-radius:14px;background:linear-gradient(145deg,#102238,#0a1727);color:#fff;box-shadow:0 14px 30px rgba(0,0,0,.2);cursor:pointer;user-select:none;transition:opacity .25s,filter .25s,transform .2s,border-color .2s,box-shadow .2s}
    .lab-node:hover{transform:scale(1.02);border-color:#39d6ff;box-shadow:0 18px 40px rgba(0,0,0,.28),0 0 20px rgba(46,140,255,.12)}
    .node-wazuh{width:270px;left:50%;top:55px;transform:translateX(-50%);border-color:#2e8cff}.node-wazuh:hover{transform:translateX(-50%) scale(1.02)}
    .node-kali{width:250px;left:50%;bottom:28px;transform:translateX(-50%);border-color:#8b3030}.node-kali:hover{transform:translateX(-50%) scale(1.02)}
    .node-ubuntu{left:4%;top:280px}.node-meta{left:27%;top:280px}.node-juice{right:27%;top:280px}.node-azure{right:4%;top:280px}
    .node-kicker{font:600 .61rem "JetBrains Mono",monospace;letter-spacing:.09em;color:#79baff;margin-bottom:8px}.lab-node h3{font-size:1.06rem;margin:0 0 5px;font-weight:750}.lab-node p{margin:0;color:#9db3ca;font-size:.76rem;line-height:1.45}.node-badge{display:inline-block;margin-top:10px;padding:4px 7px;border-radius:5px;border:1px solid rgba(46,140,255,.3);background:rgba(46,140,255,.08);color:#6ec0ff;font:600 .56rem "JetBrains Mono",monospace}.node-badge.red{border-color:rgba(255,77,77,.4);background:rgba(255,77,77,.08);color:#ff8b8b}.node-badge.green{border-color:rgba(63,229,138,.35);background:rgba(63,229,138,.07);color:#73eaa3}
    .lab-label{position:absolute;z-index:4;top:18px;color:#66b4ff;font:600 .65rem "JetBrains Mono",monospace;letter-spacing:.12em}.lab-label.siem{left:50%;transform:translateX(-50%)}.lab-label.local{left:24px}.lab-label.remote{right:24px}
    .vpn-label{position:absolute;z-index:4;right:24px;top:238px;padding:6px 9px;border:1px solid rgba(63,229,138,.35);border-radius:7px;background:rgba(7,17,30,.9);color:#73eaa3;font:600 .56rem "JetBrains Mono",monospace}.lab-hint{position:absolute;z-index:4;right:18px;bottom:12px;color:#607b96;font:500 .56rem "JetBrains Mono",monospace}
    .lab-board.focus-mode .lab-node:not(.focus-visible){opacity:.14;filter:saturate(.2);pointer-events:none}.lab-board.focus-mode .lab-label,.lab-board.focus-mode .vpn-label,.lab-board.focus-mode .lab-hint{opacity:.14}
    .lab-board.focus-mode .lab-node.focus-visible{border-color:#39d6ff;box-shadow:0 18px 45px rgba(0,0,0,.3),0 0 25px rgba(46,140,255,.14)}.lab-board.focus-mode .node-kali.focus-visible{border-color:#ff4d4d;box-shadow:0 18px 45px rgba(0,0,0,.3),0 0 25px rgba(255,77,77,.12)}
    .architecture-modal{position:absolute;z-index:10;right:4%;top:50%;transform:translateY(-50%);width:min(440px,43%);padding:23px;border:1px solid #2e8cff;border-radius:14px;background:linear-gradient(145deg,rgba(13,31,48,.99),rgba(7,17,30,.99));box-shadow:0 24px 70px rgba(0,0,0,.55),0 0 35px rgba(46,140,255,.12)}
    .architecture-modal .modal-kicker{color:#68b8ff;font:600 .61rem "JetBrains Mono",monospace;letter-spacing:.12em;margin-bottom:7px}.architecture-modal h3{margin:0 0 9px;font-size:1.3rem}.architecture-modal p{margin:0 0 14px;color:#a8bdd2;font-size:.82rem;line-height:1.6}.modal-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px}.modal-item{padding:10px;border:1px solid #203b54;border-radius:8px;background:rgba(255,255,255,.02)}.modal-item span{display:block;color:#63839f;font:600 .55rem "JetBrains Mono",monospace;margin-bottom:4px}.modal-item strong{font-size:.72rem;line-height:1.45}.modal-evidence{margin-bottom:14px;padding:10px;border:1px dashed #294761;border-radius:8px;background:rgba(255,255,255,.015)}.modal-evidence span{display:block;color:#63839f;font:600 .55rem "JetBrains Mono",monospace;margin-bottom:4px}.modal-evidence p{margin:0;font-size:.7rem}.modal-close{width:100%;padding:10px;border:1px solid #2e8cff;background:rgba(46,140,255,.08);color:#8ac9ff;border-radius:8px;font:600 .62rem "JetBrains Mono",monospace;cursor:pointer}.modal-close:hover{background:rgba(46,140,255,.16);color:#fff}
    .architecture-detail{margin-top:14px;padding:13px 17px;border:1px solid var(--line);border-radius:10px;background:var(--panel);color:var(--muted);font-size:.78rem}.architecture-detail strong{color:var(--text)}
    @media(max-width:991px){.lab-board{min-height:730px}.lab-node{width:195px}.node-wazuh{width:245px}.node-ubuntu{left:3%}.node-meta{left:26%}.node-juice{right:26%}.node-azure{right:3%}.architecture-modal{right:3%;width:48%}}
    @media(max-width:767px){.architecture-section{padding:58px 0}.lab-board{min-height:880px}.lab-node{width:calc(50% - 24px);min-height:128px;padding:15px}.node-wazuh{width:calc(100% - 36px);left:18px;top:58px;transform:none}.node-wazuh:hover{transform:scale(1.02)}.node-ubuntu{left:16px;top:245px}.node-meta{right:16px;left:auto;top:245px}.node-azure{left:16px;right:auto;top:410px}.node-juice{right:16px;left:auto;top:410px}.node-kali{width:calc(100% - 90px);left:50%;bottom:25px;transform:translateX(-50%)}.node-kali:hover{transform:translateX(-50%) scale(1.02)}.lab-label{font-size:.57rem}.lab-label.local{left:16px}.lab-label.remote{right:16px}.vpn-label{top:570px;right:16px}.lab-hint{display:none}.lab-node h3{font-size:.94rem}.lab-node p{font-size:.68rem}.architecture-modal{left:16px;right:16px;top:auto;bottom:16px;width:auto;transform:none;padding:18px}.architecture-modal h3{font-size:1.1rem}.modal-grid{grid-template-columns:1fr 1fr}.architecture-detail{font-size:.7rem}}
  `;
  document.head.appendChild(style);

  const section=document.createElement('section');
  section.id='architecture';section.className='architecture-section';
  section.innerHTML=`<div class="container"><div class="section-heading"><span>04</span><h2>Lab Architecture</h2></div><p class="architecture-intro">Interactive view of the controlled environment used for Wazuh monitoring, authorised testing and defensive validation.</p><div class="lab-legend"><span><i class="legend-line"></i> Wazuh telemetry</span><span><i class="legend-line attack"></i> Authorised attack traffic</span><span><i class="legend-line vpn"></i> WireGuard VPN access</span></div><div class="lab-board" id="lab-board" aria-label="Interactive cybersecurity lab architecture"><div class="lab-label siem">CENTRAL SIEM</div><div class="lab-label local">LOCAL VMs</div><div class="lab-label remote">REMOTE / CLOUD</div><div class="vpn-label">WIREGUARD VPN • REMOTE JUICE SHOP</div><svg class="lab-svg" id="lab-svg" aria-hidden="true"><defs><marker id="arrow-blue-clean" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#39d6ff"/></marker><marker id="arrow-red-clean" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#ff4d4d"/></marker></defs><g id="lab-lines"></g></svg><article class="lab-node node-wazuh" data-node="wazuh" tabindex="0"><div class="node-kicker">CENTRAL SIEM</div><h3>Wazuh Server</h3><p>Local virtual machine providing centralised log collection, alerting and security monitoring.</p><span class="node-badge">SIEM / MONITORING</span></article><article class="lab-node node-ubuntu" data-node="ubuntu" tabindex="0"><div class="node-kicker">LOCAL VM / AGENT</div><h3>Ubuntu</h3><p>Monitored Linux endpoint sending telemetry to Wazuh.</p><span class="node-badge">WAZUH AGENT</span></article><article class="lab-node node-meta" data-node="meta" tabindex="0"><div class="node-kicker">LOCAL VM / AGENT</div><h3>Metasploitable</h3><p>Intentionally vulnerable target used in controlled security exercises.</p><span class="node-badge">WAZUH AGENT</span></article><article class="lab-node node-juice" data-node="juice" tabindex="0"><div class="node-kicker">REMOTE / VPN</div><h3>Lecturer-hosted Server</h3><p>Remote environment hosting OWASP Juice Shop, reached through WireGuard.</p><span class="node-badge green">WIREGUARD VPN</span></article><article class="lab-node node-azure" data-node="azure" tabindex="0"><div class="node-kicker">CLOUD VM / AGENT</div><h3>Azure Ubuntu</h3><p>Cloud-hosted Ubuntu endpoint monitored by the Wazuh environment.</p><span class="node-badge">WAZUH AGENT</span></article><article class="lab-node node-kali" data-node="kali" tabindex="0"><div class="node-kicker">EXTERNAL / AUTHORISED TESTING</div><h3>Kali Linux</h3><p>Testing machine kept outside the monitoring topology. Red paths represent authorised attack simulation traffic.</p><span class="node-badge red">ATTACK SIMULATION</span></article><div class="lab-hint">CLICK A NODE TO FOCUS • CLICK OUTSIDE TO RESET</div></div><div class="architecture-detail"><strong>Interactive topology:</strong> Select a node to isolate its security relationships. Related components remain visible while unrelated components fade. Click outside the topology, press Escape, or use the close button to reset.</div></div>`;
  projects.parentNode.insertBefore(section,projects);

  const board=document.getElementById('lab-board'),svg=document.getElementById('lab-svg'),lines=document.getElementById('lab-lines'),nodes=[...board.querySelectorAll('.lab-node')];
  const targets=['ubuntu','meta','juice','azure'];
  let focus=null;
  const info={
    wazuh:{k:'CENTRAL SIEM',title:'Wazuh Server',body:'Central monitoring point for the lab. Endpoint agents send telemetry here for log collection, alert generation and security event investigation.',role:'CENTRAL MONITORING',connection:'Receives telemetry from Ubuntu, Metasploitable, the lecturer-hosted Juice Shop environment and Azure Ubuntu.'},
    ubuntu:{k:'LOCAL VM • WAZUH AGENT',title:'Ubuntu',body:'Monitored Linux endpoint used to generate normal system and authentication telemetry for the SIEM.',role:'MONITORED ENDPOINT',connection:'Ubuntu sends endpoint telemetry to the central Wazuh server. Kali may be used for authorised testing against controlled targets.'},
    meta:{k:'LOCAL VM • WAZUH AGENT',title:'Metasploitable',body:'Intentionally vulnerable local target used in controlled security exercises. Its activity provides safe test data for detection and investigation.',role:'TEST TARGET',connection:'Kali performs authorised testing against the target; Wazuh monitors the resulting endpoint activity and alerts.'},
    juice:{k:'REMOTE SERVER • WIREGUARD',title:'Lecturer-hosted Server',body:'Remote lab environment hosting OWASP Juice Shop. Access to this environment was provided through a WireGuard VPN.',role:'REMOTE TEST ENVIRONMENT',connection:'The server is monitored by Wazuh while Kali can perform authorised testing against the Juice Shop environment.'},
    azure:{k:'CLOUD VM • WAZUH AGENT',title:'Azure Ubuntu',body:'Ubuntu virtual machine hosted in Microsoft Azure and monitored through the Wazuh environment.',role:'CLOUD MONITORED ENDPOINT',connection:'Azure Ubuntu sends endpoint telemetry to Wazuh; Kali can perform authorised testing against controlled targets.'},
    kali:{k:'EXTERNAL • AUTHORISED TESTING',title:'Kali Linux',body:'External security-testing machine used for authorised exercises. It is deliberately kept outside the Wazuh monitoring topology.',role:'ATTACK / TEST SOURCE',connection:'Kali generates authorised test traffic against controlled targets. Wazuh does not monitor Kali directly; it monitors the target endpoints.'}
  };
  const node=id=>board.querySelector(`[data-node="${id}"]`);
  const box=id=>{const b=board.getBoundingClientRect(),r=node(id).getBoundingClientRect();return {l:r.left-b.left,t:r.top-b.top,r:r.right-b.left,b:r.bottom-b.top,w:r.width,h:r.height,cx:r.left-b.left+r.width/2,cy:r.top-b.top+r.height/2};};
  const path=(d,cls,marker)=>`<path class="${cls}" marker-end="url(#${marker})" d="${d}"/>`;
  const orthogonal=(from,to,viaY,offset=0)=>{const x1=from.cx,x2=to.cx+offset;return `M ${x1} ${from.t} L ${x1} ${viaY} L ${x2} ${viaY} L ${x2} ${to.b}`;};
  const attackPath=(from,to,viaY)=>`M ${from.cx} ${from.t} L ${from.cx} ${viaY} L ${to.cx} ${viaY} L ${to.cx} ${to.b}`;

  function draw(){
    svg.setAttribute('viewBox',`0 0 ${board.clientWidth} ${board.clientHeight}`);lines.innerHTML='';
    const wz=box('wazuh'),ka=box('kali');
    const activeTargets=focus==='wazuh'?targets:(focus&&targets.includes(focus)?[focus]:targets);
    const telemetryChannels=[-48,-16,16,48];
    activeTargets.forEach((id,i)=>{
      const target=box(id);const busY=Math.max(220,target.t-30);lines.insertAdjacentHTML('beforeend',path(orthogonal(target,wz,busY,telemetryChannels[i]||0),'telemetry','arrow-blue-clean'));
    });
    const attackTargets=focus&&targets.includes(focus)?[focus]:targets;
    if(focus!=='wazuh') attackTargets.forEach(id=>{const target=box(id);const busY=Math.min(board.clientHeight-115,target.b+75);lines.insertAdjacentHTML('beforeend',path(attackPath(ka,target,busY),'attack','arrow-red-clean'));});
  }

  function showPanel(id){
    const d=info[id];board.querySelector('.architecture-modal')?.remove();
    const panel=document.createElement('aside');panel.className='architecture-modal';panel.setAttribute('role','dialog');panel.setAttribute('aria-label',`${d.title} details`);
    panel.innerHTML=`<div class="modal-kicker">${d.k}</div><h3>${d.title}</h3><p>${d.body}</p><div class="modal-grid"><div class="modal-item"><span>ROLE</span><strong>${d.role}</strong></div><div class="modal-item"><span>RELATIONSHIP</span><strong>${d.connection}</strong></div></div><div class="modal-evidence"><span>EVIDENCE / DOCUMENTATION</span><p>Setup screenshots, detection evidence and the detailed write-up can be added here as the portfolio repository is built out.</p></div><button class="modal-close" type="button">RETURN TO FULL TOPOLOGY</button>`;
    board.appendChild(panel);panel.querySelector('.modal-close').addEventListener('click',e=>{e.stopPropagation();reset();});panel.addEventListener('click',e=>e.stopPropagation());
  }

  function isVisible(id,selected){
    if(selected==='wazuh') return id==='wazuh'||targets.includes(id);
    if(targets.includes(selected)) return id==='wazuh'||id===selected||id==='kali';
    if(selected==='kali') return id==='kali'||targets.includes(id)||id==='wazuh';
    return id===selected;
  }
  function focusNode(id){focus=id;board.classList.add('focus-mode');nodes.forEach(n=>n.classList.toggle('focus-visible',isVisible(n.dataset.node,id)));draw();showPanel(id);}
  function reset(){focus=null;board.classList.remove('focus-mode');nodes.forEach(n=>n.classList.add('focus-visible'));board.querySelector('.architecture-modal')?.remove();draw();}

  nodes.forEach(n=>{
    n.addEventListener('click',e=>{e.stopPropagation();focusNode(n.dataset.node);});
    n.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();focusNode(n.dataset.node);}});
  });
  board.addEventListener('click',()=>{if(focus)reset();});
  document.addEventListener('click',e=>{if(focus&&!board.contains(e.target))reset();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&focus)reset();});
  window.addEventListener('resize',draw);
  reset();
});
