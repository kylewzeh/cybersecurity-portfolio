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
    .lab-svg{position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none;overflow:visible}
    .telemetry{stroke:#39d6ff;stroke-width:2.5;fill:none;filter:drop-shadow(0 0 4px rgba(57,214,255,.2));stroke-linecap:square;stroke-linejoin:miter}
    .telemetry.azure{stroke-dasharray:3 8;stroke-linecap:round}
    .vpn-path{stroke:#3fe58a;stroke-width:3;fill:none;filter:drop-shadow(0 0 5px rgba(63,229,138,.2));stroke-linecap:square;stroke-linejoin:miter}
    .attack{stroke:#ff4d4d;stroke-width:2.5;stroke-dasharray:9 8;fill:none;filter:drop-shadow(0 0 4px rgba(255,77,77,.18));stroke-linecap:square;stroke-linejoin:miter}
    .lab-node{position:absolute;z-index:3;width:238px;min-height:138px;padding:17px 19px;border:1px solid #294761;border-radius:14px;background:linear-gradient(145deg,#102238,#0a1727);color:#fff;box-shadow:0 14px 30px rgba(0,0,0,.2);cursor:pointer;user-select:none;transition:opacity .22s,filter .22s,transform .2s,border-color .2s,box-shadow .2s}
    .lab-node:hover{transform:translateY(-2px);border-color:#39d6ff;box-shadow:0 18px 40px rgba(0,0,0,.28),0 0 20px rgba(46,140,255,.12)}
    .node-wazuh{width:300px;left:50%;top:44px;transform:translateX(-50%);border-color:#2e8cff}.node-wazuh:hover{transform:translateX(-50%) translateY(-2px)}
    .node-kali{width:300px;left:50%;bottom:26px;transform:translateX(-50%);border-color:#8b3030}.node-kali:hover{transform:translateX(-50%) translateY(-2px)}
    .node-ubuntu{left:4%;top:350px}.node-meta{left:27%;top:350px}.node-juice{right:27%;top:350px}.node-azure{right:4%;top:350px}

    .node-azure{border:0;background:transparent;box-shadow:none;padding:25px 22px 20px;min-height:160px;isolation:isolate}
    .node-azure .azure-cloud-shape{position:absolute;inset:0;width:100%;height:100%;z-index:-1;overflow:visible}
    .node-azure .azure-cloud-fill{fill:url(#azure-cloud-gradient)}
    .node-azure .azure-cloud-stroke{fill:none;stroke:#294761;stroke-width:1.6}
    .node-azure:hover{transform:translateY(-2px);border-color:transparent;box-shadow:none}
    .node-azure:hover .azure-cloud-stroke{stroke:#39d6ff}
    .node-azure > *{position:relative;z-index:1}

    .node-kicker{font:600 .61rem "JetBrains Mono",monospace;letter-spacing:.09em;color:#79baff;margin-bottom:8px}.lab-node h3{font-size:1.06rem;margin:0 0 5px;font-weight:750}.lab-node p{margin:0;color:#9db3ca;font-size:.76rem;line-height:1.45}.node-badge{display:inline-block;margin-top:10px;padding:4px 7px;border-radius:5px;border:1px solid rgba(46,140,255,.3);background:rgba(46,140,255,.08);color:#6ec0ff;font:600 .56rem "JetBrains Mono",monospace}.node-badge.red{border-color:rgba(255,77,77,.4);background:rgba(255,77,77,.08);color:#ff8b8b}
    .lab-label{position:absolute;z-index:4;top:18px;color:#66b4ff;font:600 .65rem "JetBrains Mono",monospace;letter-spacing:.12em}.lab-label.siem{left:50%;transform:translateX(-50%)}.lab-label.local{left:24px}.lab-label.remote{right:24px}
    .lab-hint{position:absolute;z-index:4;right:18px;bottom:12px;color:#607b96;font:500 .56rem "JetBrains Mono",monospace}
    .lab-board.focus-mode .lab-node:not(.focus-visible){opacity:.38;filter:saturate(.35)}
    .lab-board.focus-mode .lab-svg .focus-dim{opacity:.07}
    .lab-board.focus-mode .lab-node.focus-visible{border-color:#39d6ff;box-shadow:0 18px 45px rgba(0,0,0,.3),0 0 25px rgba(46,140,255,.14)}
    .lab-board.focus-mode .node-kali.focus-visible{border-color:#ff4d4d;box-shadow:0 18px 45px rgba(0,0,0,.3),0 0 25px rgba(255,77,77,.12)}
    .node-azure.focus-visible{filter:none!important}
    .lab-board:not(.focus-mode) .lab-node{opacity:1;filter:none}
    .architecture-detail{display:none}
    @media(max-width:991px){.lab-board{min-height:800px}.lab-node{width:205px}.node-wazuh{width:270px}.node-ubuntu{left:3%}.node-meta{left:26%}.node-juice{right:26%}.node-azure{right:3%}}
    @media(max-width:767px){.architecture-section{padding:58px 0}.lab-board{min-height:1000px}.lab-node{width:calc(50% - 24px);min-height:146px;padding:15px}.node-wazuh{width:calc(100% - 36px);left:18px;top:58px;transform:none}.node-wazuh:hover{transform:translateY(-2px)}.node-ubuntu{left:16px;top:315px}.node-meta{right:16px;left:auto;top:315px}.node-azure{left:16px;right:auto;top:500px;min-height:146px;padding:21px 18px 16px}.node-juice{right:16px;left:auto;top:500px}.node-kali{width:calc(100% - 72px);left:36px;bottom:28px;transform:none}.node-kali:hover{transform:translateY(-2px)}.lab-label{font-size:.57rem}.lab-label.local{left:16px}.lab-label.remote{right:16px}.lab-hint{display:none}.lab-node h3{font-size:.94rem}.lab-node p{font-size:.68rem}}
  `;
  document.head.appendChild(style);

  const section=document.createElement('section');
  section.id='architecture';section.className='architecture-section';
  section.innerHTML=`<div class="container"><div class="section-heading"><span>04</span><h2>Lab Architecture</h2></div><p class="architecture-intro">Interactive view of the controlled environment used for Wazuh monitoring, authorised testing and defensive validation.</p><div class="lab-legend"><span><i class="legend-line"></i> Wazuh telemetry</span><span><i class="legend-line attack"></i> Authorised attack traffic</span><span><i class="legend-line vpn"></i> WireGuard VPN path</span></div><div class="lab-board" id="lab-board" aria-label="Interactive cybersecurity lab architecture"><div class="lab-label siem">CENTRAL SIEM</div><div class="lab-label local">LOCAL VMs</div><div class="lab-label remote">REMOTE / CLOUD</div><svg class="lab-svg" id="lab-svg" aria-hidden="true"><defs><linearGradient id="azure-cloud-gradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#102238"/><stop offset="1" stop-color="#0a1727"/></linearGradient><marker id="arrow-red-clean" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#ff4d4d"/></marker><marker id="arrow-blue-clean" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#39d6ff"/></marker><marker id="arrow-green-clean" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#3fe58a"/></marker></defs><g id="lab-lines"></g></svg><article class="lab-node node-wazuh" data-node="wazuh" tabindex="0"><div class="node-kicker">CENTRAL SIEM</div><h3>Wazuh Server</h3><p>Local virtual machine providing centralised log collection, alerting and security monitoring.</p><span class="node-badge">SIEM / MONITORING</span></article><article class="lab-node node-ubuntu" data-node="ubuntu" tabindex="0"><div class="node-kicker">LOCAL VM / AGENT</div><h3>Ubuntu</h3><p>Monitored Linux endpoint sending telemetry to Wazuh.</p><span class="node-badge">WAZUH AGENT</span></article><article class="lab-node node-meta" data-node="meta" tabindex="0"><div class="node-kicker">LOCAL VM / AGENT</div><h3>Metasploitable</h3><p>Intentionally vulnerable target used in controlled security exercises.</p><span class="node-badge">WAZUH AGENT</span></article><article class="lab-node node-juice" data-node="juice" tabindex="0"><div class="node-kicker">REMOTE / VPN</div><h3>Lecturer-hosted Server</h3><p>Remote environment hosting OWASP Juice Shop, reached through WireGuard.</p><span class="node-badge">WIREGUARD VPN</span></article><article class="lab-node node-azure" data-node="azure" tabindex="0"><svg class="azure-cloud-shape" viewBox="0 0 300 170" preserveAspectRatio="none" aria-hidden="true"><path class="azure-cloud-fill" d="M34 154C15 154 4 141 4 123C4 105 16 93 33 91C33 64 53 44 79 44C88 44 97 47 104 52C114 28 137 14 164 14C196 14 221 36 226 66C233 63 240 62 247 62C274 62 296 83 296 109C296 135 276 154 251 154Z"/><path class="azure-cloud-stroke" d="M34 154C15 154 4 141 4 123C4 105 16 93 33 91C33 64 53 44 79 44C88 44 97 47 104 52C114 28 137 14 164 14C196 14 221 36 226 66C233 63 240 62 247 62C274 62 296 83 296 109C296 135 276 154 251 154Z"/></svg><div class="node-kicker">CLOUD VM / AGENT</div><h3>Azure Ubuntu</h3><p>Cloud-hosted Ubuntu endpoint monitored by the Wazuh environment.</p><span class="node-badge">WAZUH AGENT</span></article><article class="lab-node node-kali" data-node="kali" tabindex="0"><div class="node-kicker">EXTERNAL / AUTHORISED TESTING</div><h3>Kali Linux</h3><p>Testing machine kept outside the monitoring topology. Red paths represent authorised attack simulation traffic.</p><span class="node-badge red">ATTACK SIMULATION</span></article><div class="lab-hint">CLICK A NODE TO FILTER ITS CONNECTIONS • CLICK OUTSIDE TO RESET</div></div></div>`;
  projects.parentNode.insertBefore(section,projects);

  const board=document.getElementById('lab-board'),lines=document.getElementById('lab-lines'),nodes=[...board.querySelectorAll('.lab-node')];
  const targets=['ubuntu','meta','juice','azure'];
  let focus=null;

  const node=id=>board.querySelector(`[data-node="${id}"]`);
  const box=id=>{const b=board.getBoundingClientRect(),r=node(id).getBoundingClientRect();return {l:r.left-b.left,t:r.top-b.top,r:r.right-b.left,b:r.bottom-b.top,w:r.width,h:r.height,cx:r.left-b.left+r.width/2,cy:r.top-b.top+r.height/2};};
  const path=(d,cls,marker,id)=>{const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',d);p.setAttribute('class',cls);p.dataset.edge=id;if(marker)p.setAttribute('marker-end',`url(#${marker})`);lines.appendChild(p);};

  function draw(){
    if(!board)return;
    lines.innerHTML='';
    const rect=board.getBoundingClientRect();if(!rect.width)return;
    const w=box('wazuh'),k=box('kali');
    const t=targets.map(id=>({id,b:box(id)}));
    const left=t.filter(x=>x.id==='ubuntu'||x.id==='meta').sort((a,b)=>a.b.cx-b.b.cx);
    const right=t.filter(x=>x.id==='juice'||x.id==='azure').sort((a,b)=>a.b.cx-b.b.cx);

    const telemetryLeftBase=Math.max(w.b+36,Math.min(...left.map(x=>x.b.t))-40);
    const telemetryRightBase=Math.max(w.b+36,Math.min(...right.map(x=>x.b.t))-40);
    const leftPorts=[w.cx-58,w.cx-20];
    const rightPorts=[w.cx+20,w.cx+58];

    left.forEach((x,i)=>{
      const laneY=telemetryLeftBase+(i*28);
      const port=leftPorts[i];
      path(`M ${x.b.cx} ${x.b.t} V ${laneY} H ${port} V ${w.b}`,'telemetry','arrow-blue-clean',`telemetry-${x.id}`);
    });
    right.forEach((x,i)=>{
      const laneY=telemetryRightBase+(i*28);
      const port=rightPorts[i];
      const cls=x.id==='azure'?'telemetry azure':x.id==='juice'?'vpn-path':'telemetry';
      const marker=x.id==='juice'?'arrow-green-clean':'arrow-blue-clean';
      path(`M ${x.b.cx} ${x.b.t} V ${laneY} H ${port} V ${w.b}` ,cls,marker,`telemetry-${x.id}`);
    });

    const kaliSideY=k.t-38;
    const kaliOuterY=k.t-72;
    const kaliPorts={ubuntu:k.l+26,meta:k.l+88,juice:k.r-88,azure:k.r-26};
    const targetPort={ubuntu:box('ubuntu').cx,meta:box('meta').cx,juice:box('juice').cx,azure:box('azure').cx};
    const attackLanes={ubuntu:kaliOuterY-12,meta:kaliSideY,juice:kaliSideY,azure:kaliOuterY-12};

    path(`M ${kaliPorts.ubuntu} ${k.t} V ${attackLanes.ubuntu} H ${targetPort.ubuntu} V ${box('ubuntu').b}`,'attack','arrow-red-clean','attack-ubuntu');
    path(`M ${kaliPorts.meta} ${k.t} V ${attackLanes.meta} H ${targetPort.meta} V ${box('meta').b}`,'attack','arrow-red-clean','attack-meta');
    path(`M ${kaliPorts.juice} ${k.t} V ${attackLanes.juice} H ${targetPort.juice} V ${box('juice').b}`,'attack','arrow-red-clean','attack-juice');
    path(`M ${kaliPorts.azure} ${k.t} V ${attackLanes.azure} H ${targetPort.azure} V ${box('azure').b}`,'attack','arrow-red-clean','attack-azure');

    applyEdgeFocus();
  }

  function connected(id){
    if(id==='wazuh')return ['wazuh',...targets];
    if(id==='kali')return ['kali',...targets];
    if(targets.includes(id))return [id,'wazuh','kali'];
    return [id];
  }
  function edgeConnected(edge,id){
    if(id==='wazuh')return edge.startsWith('telemetry-');
    if(id==='kali')return edge.startsWith('attack-');
    if(targets.includes(id))return edge===`telemetry-${id}`||edge===`attack-${id}`;
    return false;
  }
  function applyEdgeFocus(){lines.querySelectorAll('path').forEach(p=>p.classList.toggle('focus-dim',!!focus&&!edgeConnected(p.dataset.edge,focus)));}
  function reset(){focus=null;board.classList.remove('focus-mode');nodes.forEach(n=>n.classList.remove('focus-visible'));applyEdgeFocus();}
  function show(id){focus=id;board.classList.add('focus-mode');nodes.forEach(n=>n.classList.toggle('focus-visible',connected(id).includes(n.dataset.node)));applyEdgeFocus();}

  nodes.forEach(n=>{
    n.addEventListener('click',e=>{e.stopPropagation();show(n.dataset.node)});
    n.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show(n.dataset.node)}});
  });
  board.addEventListener('click',e=>{if(focus&&!e.target.closest('.lab-node'))reset()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&focus)reset()});
  window.addEventListener('resize',()=>requestAnimationFrame(draw));
  requestAnimationFrame(draw);
});
