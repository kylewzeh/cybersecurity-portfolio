document.addEventListener('DOMContentLoaded', () => {
  const projects = document.getElementById('projects');
  if (!projects || document.getElementById('lab-board')) return;

  const style = document.createElement('style');
  style.textContent = `
    .architecture-section{padding:72px 0;background:var(--soft);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
    .architecture-intro{color:var(--muted);margin:0 0 20px}
    .lab-legend{display:flex;flex-wrap:wrap;gap:14px;margin:0 0 14px;color:var(--muted);font:600 .68rem "JetBrains Mono",monospace}
    .lab-legend span{display:inline-flex;align-items:center;gap:7px}.legend-line{width:28px;border-top:2px solid #39d6ff}.legend-line.attack{border-top-color:#ff4d4d;border-top-style:dashed}.legend-line.vpn{border-top-color:#3fe58a}
    .lab-board{position:relative;min-height:760px;border:1px solid #1c3a55;border-radius:18px;overflow:hidden;background:radial-gradient(circle at 50% 17%,rgba(46,140,255,.09),transparent 38%),#07111e;box-shadow:0 20px 55px rgba(5,20,38,.18)}
    .lab-board:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(92,157,214,.075) 1px,transparent 1px),linear-gradient(90deg,rgba(92,157,214,.075) 1px,transparent 1px);background-size:44px 44px;pointer-events:none}
    .lab-svg{position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none;overflow:visible}.telemetry{stroke:#39d6ff;stroke-width:2.5;fill:none;filter:drop-shadow(0 0 4px rgba(57,214,255,.2))}.telemetry.azure{stroke-dasharray:3 7;stroke-linecap:round}.vpn-path{stroke:#3fe58a;stroke-width:3;fill:none;filter:drop-shadow(0 0 5px rgba(63,229,138,.2))}.attack{stroke:#ff4d4d;stroke-width:2.5;stroke-dasharray:9 8;fill:none;filter:drop-shadow(0 0 4px rgba(255,77,77,.18))}
    .lab-node{position:absolute;z-index:3;width:238px;min-height:138px;padding:17px 19px;border:1px solid #294761;border-radius:14px;background:linear-gradient(145deg,#102238,#0a1727);color:#fff;box-shadow:0 14px 30px rgba(0,0,0,.2);cursor:pointer;user-select:none;transition:opacity .25s,filter .25s,transform .2s,border-color .2s,box-shadow .2s}
    .lab-node:hover{transform:translateY(-2px);border-color:#39d6ff;box-shadow:0 18px 40px rgba(0,0,0,.28),0 0 20px rgba(46,140,255,.12)}
    .node-wazuh{width:300px;left:50%;top:44px;transform:translateX(-50%);border-color:#2e8cff}.node-wazuh:hover{transform:translateX(-50%) translateY(-2px)}
    .node-kali{width:300px;left:50%;bottom:26px;transform:translateX(-50%);border-color:#8b3030}.node-kali:hover{transform:translateX(-50%) translateY(-2px)}
    .node-ubuntu{left:4%;top:350px}.node-meta{left:27%;top:350px}.node-juice{right:27%;top:350px}.node-azure{right:4%;top:350px}
    .node-azure{border-radius:20px 20px 16px 16px;overflow:visible}.node-azure:before,.node-azure:after{content:"";position:absolute;border:1px solid #294761;background:linear-gradient(145deg,#102238,#0a1727);border-radius:50%;z-index:0}.node-azure:before{width:76px;height:58px;left:26px;top:-24px}.node-azure:after{width:92px;height:66px;right:28px;top:-30px}.node-azure > *{position:relative;z-index:1}.node-azure:after{box-shadow:-34px 8px 0 -2px #0d1d2f}.node-azure:focus-visible{outline:2px solid #39d6ff;outline-offset:3px}
    .node-kicker{font:600 .61rem "JetBrains Mono",monospace;letter-spacing:.09em;color:#79baff;margin-bottom:8px}.lab-node h3{font-size:1.06rem;margin:0 0 5px;font-weight:750}.lab-node p{margin:0;color:#9db3ca;font-size:.76rem;line-height:1.45}.node-badge{display:inline-block;margin-top:10px;padding:4px 7px;border-radius:5px;border:1px solid rgba(46,140,255,.3);background:rgba(46,140,255,.08);color:#6ec0ff;font:600 .56rem "JetBrains Mono",monospace}.node-badge.red{border-color:rgba(255,77,77,.4);background:rgba(255,77,77,.08);color:#ff8b8b}.node-badge.green{border-color:rgba(63,229,138,.35);background:rgba(63,229,138,.07);color:#73eaa3}
    .lab-label{position:absolute;z-index:4;top:18px;color:#66b4ff;font:600 .65rem "JetBrains Mono",monospace;letter-spacing:.12em}.lab-label.siem{left:50%;transform:translateX(-50%)}.lab-label.local{left:24px}.lab-label.remote{right:24px}
    .lab-hint{position:absolute;z-index:4;right:18px;bottom:12px;color:#607b96;font:500 .56rem "JetBrains Mono",monospace}
    .lab-board.focus-mode .lab-node:not(.focus-visible){opacity:.10;filter:saturate(.15);pointer-events:none}.lab-board.focus-mode .lab-svg .focus-dim{opacity:.08}.lab-board.focus-mode .lab-label,.lab-board.focus-mode .lab-hint{opacity:.12}.lab-board.focus-mode .lab-node.focus-visible{border-color:#39d6ff;box-shadow:0 18px 45px rgba(0,0,0,.3),0 0 25px rgba(46,140,255,.14)}.lab-board.focus-mode .node-kali.focus-visible{border-color:#ff4d4d;box-shadow:0 18px 45px rgba(0,0,0,.3),0 0 25px rgba(255,77,77,.12)}
    .architecture-modal{position:absolute;z-index:10;left:50%;top:22px;transform:translateX(-50%);width:min(820px,calc(100% - 48px));padding:22px 24px;border:1px solid #2e8cff;border-radius:14px;background:linear-gradient(145deg,rgba(13,31,48,.985),rgba(7,17,30,.985));box-shadow:0 24px 70px rgba(0,0,0,.55),0 0 35px rgba(46,140,255,.12)}
    .architecture-modal .modal-kicker{color:#68b8ff;font:600 .61rem "JetBrains Mono",monospace;letter-spacing:.12em;margin-bottom:7px}.architecture-modal h3{margin:0 0 8px;font-size:1.35rem}.architecture-modal p{margin:0;color:#a8bdd2;font-size:.82rem;line-height:1.55}.modal-body{display:grid;grid-template-columns:1.1fr 1fr 1fr;gap:10px;margin-top:14px}.modal-item{padding:11px;border:1px solid #203b54;border-radius:8px;background:rgba(255,255,255,.02)}.modal-item span{display:block;color:#63839f;font:600 .55rem "JetBrains Mono",monospace;margin-bottom:5px}.modal-item strong{font-size:.72rem;line-height:1.45}.modal-evidence{padding:11px;border:1px dashed #294761;border-radius:8px;background:rgba(255,255,255,.015)}.modal-evidence span{display:block;color:#63839f;font:600 .55rem "JetBrains Mono",monospace;margin-bottom:5px}.modal-evidence p{font-size:.7rem}.modal-close{margin-top:12px;width:100%;padding:10px;border:1px solid #2e8cff;background:rgba(46,140,255,.08);color:#8ac9ff;border-radius:8px;font:600 .62rem "JetBrains Mono",monospace;cursor:pointer}.modal-close:hover{background:rgba(46,140,255,.16);color:#fff}
    .architecture-detail{margin-top:14px;padding:13px 17px;border:1px solid var(--line);border-radius:10px;background:var(--panel);color:var(--muted);font-size:.78rem}.architecture-detail strong{color:var(--text)}
    @media(max-width:991px){.lab-board{min-height:800px}.lab-node{width:205px}.node-wazuh{width:270px}.node-ubuntu{left:3%}.node-meta{left:26%}.node-juice{right:26%}.node-azure{right:3%}.architecture-modal{width:calc(100% - 36px)}.modal-body{grid-template-columns:1fr 1fr}.modal-evidence{grid-column:1/-1}}
    @media(max-width:767px){.architecture-section{padding:58px 0}.lab-board{min-height:1000px}.lab-node{width:calc(50% - 24px);min-height:146px;padding:15px}.node-wazuh{width:calc(100% - 36px);left:18px;top:58px;transform:none}.node-wazuh:hover{transform:translateY(-2px)}.node-ubuntu{left:16px;top:315px}.node-meta{right:16px;left:auto;top:315px}.node-azure{left:16px;right:auto;top:500px}.node-juice{right:16px;left:auto;top:500px}.node-kali{width:calc(100% - 72px);left:36px;bottom:28px;transform:none}.node-kali:hover{transform:translateY(-2px)}.node-azure:before{left:18px}.node-azure:after{right:18px}.lab-label{font-size:.57rem}.lab-label.local{left:16px}.lab-label.remote{right:16px}.lab-hint{display:none}.lab-node h3{font-size:.94rem}.lab-node p{font-size:.68rem}.architecture-modal{left:12px;right:12px;top:18px;width:auto;transform:none;padding:17px}.architecture-modal h3{font-size:1.1rem}.modal-body{grid-template-columns:1fr}.modal-evidence{grid-column:auto}.architecture-detail{font-size:.7rem}}
  `;
  document.head.appendChild(style);

  const section=document.createElement('section');
  section.id='architecture';section.className='architecture-section';
  section.innerHTML=`<div class="container"><div class="section-heading"><span>04</span><h2>Lab Architecture</h2></div><p class="architecture-intro">Interactive view of the controlled environment used for Wazuh monitoring, authorised testing and defensive validation.</p><div class="lab-legend"><span><i class="legend-line"></i> Wazuh telemetry</span><span><i class="legend-line attack"></i> Authorised attack traffic</span><span><i class="legend-line vpn"></i> WireGuard VPN path</span></div><div class="lab-board" id="lab-board" aria-label="Interactive cybersecurity lab architecture"><div class="lab-label siem">CENTRAL SIEM</div><div class="lab-label local">LOCAL VMs</div><div class="lab-label remote">REMOTE / CLOUD</div><svg class="lab-svg" id="lab-svg" aria-hidden="true"><defs><marker id="arrow-red-clean" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#ff4d4d"/></marker><marker id="arrow-blue-clean" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#39d6ff"/></marker><marker id="arrow-green-clean" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#3fe58a"/></marker></defs><g id="lab-lines"></g></svg><article class="lab-node node-wazuh" data-node="wazuh" tabindex="0"><div class="node-kicker">CENTRAL SIEM</div><h3>Wazuh Server</h3><p>Local virtual machine providing centralised log collection, alerting and security monitoring.</p><span class="node-badge">SIEM / MONITORING</span></article><article class="lab-node node-ubuntu" data-node="ubuntu" tabindex="0"><div class="node-kicker">LOCAL VM / AGENT</div><h3>Ubuntu</h3><p>Monitored Linux endpoint sending telemetry to Wazuh.</p><span class="node-badge">WAZUH AGENT</span></article><article class="lab-node node-meta" data-node="meta" tabindex="0"><div class="node-kicker">LOCAL VM / AGENT</div><h3>Metasploitable</h3><p>Intentionally vulnerable target used in controlled security exercises.</p><span class="node-badge">WAZUH AGENT</span></article><article class="lab-node node-juice" data-node="juice" tabindex="0"><div class="node-kicker">REMOTE / VPN</div><h3>Lecturer-hosted Server</h3><p>Remote environment hosting OWASP Juice Shop, reached through WireGuard.</p><span class="node-badge green">WIREGUARD VPN</span></article><article class="lab-node node-azure" data-node="azure" tabindex="0"><div class="node-kicker">CLOUD VM / AGENT</div><h3>Azure Ubuntu</h3><p>Cloud-hosted Ubuntu endpoint monitored by the Wazuh environment.</p><span class="node-badge">WAZUH AGENT</span></article><article class="lab-node node-kali" data-node="kali" tabindex="0"><div class="node-kicker">EXTERNAL / AUTHORISED TESTING</div><h3>Kali Linux</h3><p>Testing machine kept outside the monitoring topology. Red paths represent authorised attack simulation traffic.</p><span class="node-badge red">ATTACK SIMULATION</span></article><div class="lab-hint">CLICK A NODE TO FOCUS • CLICK OUTSIDE TO RESET</div></div><div class="architecture-detail"><strong>Interactive topology:</strong> Select a node to isolate its security relationships. Related components and paths remain visible while unrelated components fade. Click anywhere else in the board, press Escape, or use the close button to reset.</div></div>`;
  projects.parentNode.insertBefore(section,projects);

  const board=document.getElementById('lab-board'),lines=document.getElementById('lab-lines'),nodes=[...board.querySelectorAll('.lab-node')];
  const targets=['ubuntu','meta','juice','azure'];
  let focus=null;
  const info={
    wazuh:{k:'CENTRAL SIEM',title:'Wazuh Server',body:'Central monitoring point for the lab. Endpoint agents send telemetry here for log collection, alert generation and security event investigation.',role:'CENTRAL MONITORING',connection:'Receives telemetry from Ubuntu, Metasploitable, the lecturer-hosted Juice Shop environment and Azure Ubuntu.',evidence:'Detection screenshots and Wazuh alert evidence can be linked here.'},
    ubuntu:{k:'LOCAL VM • WAZUH AGENT',title:'Ubuntu',body:'Monitored Linux endpoint used to generate normal system and authentication telemetry for the SIEM.',role:'MONITORED ENDPOINT',connection:'Ubuntu sends endpoint telemetry to Wazuh. Kali may perform authorised testing against controlled lab targets.',evidence:'Endpoint setup and Wazuh agent evidence can be linked here.'},
    meta:{k:'LOCAL VM • WAZUH AGENT',title:'Metasploitable',body:'Intentionally vulnerable local target used in controlled security exercises. Its activity provides safe test data for detection and investigation.',role:'TEST TARGET',connection:'Kali attacks Metasploitable in the authorised lab; Wazuh monitors the target and receives resulting telemetry.',evidence:'Attack/detection screenshots and the technical write-up can be linked here.'},
    juice:{k:'REMOTE SERVER • WIREGUARD',title:'Lecturer-hosted Server',body:'Remote lab environment hosting OWASP Juice Shop. Access to this environment was provided through a WireGuard VPN.',role:'REMOTE TEST ENVIRONMENT',connection:'Kali reaches the controlled Juice Shop environment through WireGuard. Wazuh monitors the relevant monitored endpoint telemetry.',evidence:'VPN setup, application testing and detection evidence can be linked here.'},
    azure:{k:'CLOUD VM • WAZUH AGENT',title:'Azure Ubuntu',body:'Ubuntu virtual machine hosted in Microsoft Azure and monitored through the Wazuh environment.',role:'CLOUD MONITORED ENDPOINT',connection:'Azure Ubuntu sends endpoint telemetry to Wazuh. Kali can perform authorised testing against the controlled cloud target.',evidence:'Azure deployment, agent configuration and monitoring evidence can be linked here.'},
    kali:{k:'EXTERNAL • AUTHORISED TESTING',title:'Kali Linux',body:'External security-testing machine used for authorised exercises. It is deliberately kept outside the Wazuh monitoring topology.',role:'ATTACK / TEST SOURCE',connection:'Kali attacks the controlled targets — Ubuntu, Metasploitable, the lecturer-hosted environment and Azure Ubuntu. Wazuh does not monitor Kali directly; it monitors the target endpoints.',evidence:'Screenshots and the technical write-up can be linked here as portfolio evidence is added.'}
  };
  const node=id=>board.querySelector(`[data-node="${id}"]`);
  const box=id=>{const b=board.getBoundingClientRect(),r=node(id).getBoundingClientRect();return {l:r.left-b.left,t:r.top-b.top,r:r.right-b.left,b:r.bottom-b.top,w:r.width,h:r.height,cx:r.left-b.left+r.width/2,cy:r.top-b.top+r.height/2};};
  const path=(d,cls,marker,id)=>{const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',d);p.setAttribute('class',cls);p.dataset.edge=id;if(marker)p.setAttribute('marker-end',`url(#${marker})`);lines.appendChild(p);};
  function draw(){
    if(!board) return; lines.innerHTML='';
    const rect=board.getBoundingClientRect(); if(!rect.width) return;
    const w=box('wazuh'),k=box('kali'),t=targets.map(id=>({id,b:box(id)}));
    const ordered=[...t].sort((a,b)=>a.b.cx-b.b.cx);
    const ports=[-0.36,-0.12,0.12,0.36].map(v=>w.cx+w.w*v);
    const gap=Math.max(26,Math.min(38,(ordered[0].b.t-w.b)/5));
    ordered.forEach((x,i)=>{
      const routeY=w.b+gap+(i*gap);
      const port=ports[i];
      const cls=x.id==='azure'?'telemetry azure':x.id==='juice'?'vpn-path':'telemetry';
      const marker=x.id==='juice'?'arrow-green-clean':'arrow-blue-clean';
      path(`M ${x.b.cx} ${x.b.t} V ${routeY} H ${port} V ${w.b}`,cls,marker,`telemetry-${x.id}`);
    });
    const attackY=Math.min(k.t-34,Math.max(...t.map(x=>x.b.b))+58);
    const attackLeft=Math.min(k.cx,...t.map(x=>x.b.cx)),attackRight=Math.max(k.cx,...t.map(x=>x.b.cx));
    path(`M ${attackLeft} ${attackY} H ${attackRight}`,'attack',null,'attack-bus');
    t.forEach(x=>path(`M ${x.b.cx} ${attackY} V ${x.b.b}`,'attack','arrow-red-clean',`attack-${x.id}`));
    path(`M ${k.cx} ${k.t} V ${attackY}`,'attack',null,'attack-kali');
    applyEdgeFocus();
  }
  function connected(id){
    if(id==='wazuh') return ['wazuh',...targets];
    if(id==='kali') return ['kali',...targets];
    if(targets.includes(id)) return [id,'wazuh','kali'];
    return [id];
  }
  function edgeConnected(edge,id){
    if(id==='wazuh') return edge.startsWith('telemetry-');
    if(id==='kali') return edge.startsWith('attack-');
    if(targets.includes(id)) return edge===`telemetry-${id}` || edge===`attack-${id}`;
    return false;
  }
  function applyEdgeFocus(){lines.querySelectorAll('path').forEach(p=>p.classList.toggle('focus-dim',!!focus&&!edgeConnected(p.dataset.edge,focus)));}
  function closeModal(){const m=board.querySelector('.architecture-modal');if(m)m.remove();}
  function reset(){focus=null;board.classList.remove('focus-mode');nodes.forEach(n=>n.classList.remove('focus-visible'));closeModal();draw();}
  function show(id){
    focus=id;board.classList.add('focus-mode');nodes.forEach(n=>n.classList.toggle('focus-visible',connected(id).includes(n.dataset.node)));closeModal();applyEdgeFocus();
    const d=info[id],m=document.createElement('aside');m.className='architecture-modal';m.setAttribute('role','dialog');m.setAttribute('aria-label',`${d.title} details`);
    m.innerHTML=`<div class="modal-kicker">${d.k}</div><h3>${d.title}</h3><p>${d.body}</p><div class="modal-body"><div class="modal-item"><span>ROLE</span><strong>${d.role}</strong></div><div class="modal-item"><span>CONNECTION</span><strong>${d.connection}</strong></div><div class="modal-evidence"><span>EVIDENCE / DOCUMENTATION</span><p>${d.evidence}</p></div></div><button class="modal-close" type="button">RETURN TO FULL TOPOLOGY</button>`;
    board.appendChild(m);m.querySelector('.modal-close').addEventListener('click',e=>{e.stopPropagation();reset()});
  }
  nodes.forEach(n=>{n.addEventListener('click',e=>{e.stopPropagation();show(n.dataset.node)});n.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show(n.dataset.node)}})});
  board.addEventListener('click',e=>{if(focus&&!e.target.closest('.lab-node,.architecture-modal'))reset()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&focus)reset()});
  window.addEventListener('resize',()=>requestAnimationFrame(draw));
  requestAnimationFrame(draw);
});
