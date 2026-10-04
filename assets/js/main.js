/* ============ Portfolio v2 — main.js ============ */
(function(){
"use strict";
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const fine=matchMedia("(pointer:fine)").matches;
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- seeded random ---------- */
function rng(seed){let s=seed;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}

/* ---------- SVG mockup builders ---------- */
const INK="#e9e7de", DIM="#9aa0a6", FAINT="#62676d", VOLT="#d9ff4b", VIOLET="#9a8cff",
      CYAN="#57e6d9", VOLT_DIM="rgba(217,255,75,.12)", PANEL="#16181c", PANEL2="#1d2025", LINE="rgba(255,255,255,.08)",
      TXTL="#262b31", TXTM="#2e343b";
const traffic=`<circle cx="22" cy="20" r="6" fill="#ff5f57"/><circle cx="42" cy="20" r="6" fill="#febc2e"/><circle cx="62" cy="20" r="6" fill="#28c840"/>`;
function textLines(x,y,widths,h=9,gap=16,fill=TXTL){
  return widths.map((w,i)=>`<rect x="${x}" y="${y+i*(h+gap)}" width="${w}" height="${h}" rx="4.5" fill="${fill}"/>`).join("");
}
function wave(x,y,w,n,seed,maxH=64,color=VOLT){
  const r=rng(seed);let s="";
  const bw=w/n;
  for(let i=0;i<n;i++){
    const h=8+r()*maxH, bx=x+i*bw+bw*.22;
    s+=`<rect x="${bx.toFixed(1)}" y="${(y+(maxH-h)/2).toFixed(1)}" width="${(bw*.56).toFixed(1)}" height="${h.toFixed(1)}" rx="2.5" fill="${color}" opacity="${(.35+r()*.65).toFixed(2)}"/>`;
  }
  return s;
}

const MOCKUPS={};

/* ===== 1. Vocalis — desktop TTS app ===== */
MOCKUPS.vocalis=(()=>{
  const voices=["Kokoro · af_sarah","Kokoro · am_adam","macOS · say","SAPI · David"]
    .map((v,i)=>`<g>
      <rect x="28" y="${118+i*62}" width="212" height="50" rx="12" fill="${i===0?"rgba(217,255,75,.10)":"none"}" stroke="${i===0?"rgba(217,255,75,.45)":LINE}"/>
      <circle cx="56" cy="${143+i*62}" r="11" fill="${i===0?VOLT:"#2a2f36"}"/>
      <rect x="76" y="${136+i*62}" width="${120-i*14}" height="9" rx="4.5" fill="${i===0?INK:TXTM}"/>
      <rect x="76" y="${150+i*62}" width="70" height="7" rx="3.5" fill="${TXTL}"/>
    </g>`).join("");
  return `<svg viewBox="0 0 800 560" role="img" aria-label="Vocalis app interface mockup">
  <rect x="4" y="4" width="792" height="552" rx="22" fill="#101216" stroke="${LINE}"/>
  ${traffic}<text x="88" y="25" font-family="monospace" font-size="13" fill="${FAINT}">Vocalis — local text-to-speech</text>
  <rect x="28" y="62" width="212" height="32" rx="16" fill="${PANEL}" stroke="${LINE}"/><text x="134" y="83" text-anchor="middle" font-family="monospace" font-size="11" fill="${DIM}">LIBRARY · 3 DOCS</text>
  ${voices}
  <rect x="28" y="392" width="212" height="120" rx="14" fill="${PANEL}" stroke="${LINE}"/>
  <text x="48" y="420" font-family="monospace" font-size="11" fill="${FAINT}">SPEED · 1.0×</text>
  <rect x="48" y="436" width="172" height="6" rx="3" fill="#2a2f36"/><circle cx="140" cy="439" r="9" fill="${VOLT}"/>
  <text x="48" y="472" font-family="monospace" font-size="11" fill="${FAINT}">PITCH · 1.0</text>
  <rect x="48" y="486" width="172" height="6" rx="3" fill="#2a2f36"/><circle cx="118" cy="489" r="9" fill="${VIOLET}"/>
  <rect x="268" y="96" width="504" height="300" rx="16" fill="${PANEL}" stroke="${LINE}"/>
  <text x="296" y="130" font-family="monospace" font-size="12" fill="${FAINT}">chapter-04.txt</text>
  ${textLines(296,152,[440,452,380,448,300,442,420,360],9,17)}
  <rect x="268" y="412" width="504" height="100" rx="16" fill="${PANEL}" stroke="${LINE}"/>
  ${wave(300,428,330,42,7,60)}
  <circle cx="682" cy="462" r="26" fill="${VOLT}"/><path d="M676 450l18 12-18 12z" fill="#0a0b0d"/>
  <circle cx="622" cy="462" r="15" fill="none" stroke="${DIM}" stroke-width="2"/><rect x="614" y="454" width="16" height="16" fill="${DIM}"/>
  <g><rect x="620" y="112" width="62" height="26" rx="13" fill="${VOLT_DIM}" stroke="rgba(217,255,75,.4)"/><text x="651" y="130" text-anchor="middle" font-family="monospace" font-size="11" fill="${VOLT}">WAV</text>
  <rect x="690" y="112" width="62" height="26" rx="13" fill="none" stroke="${LINE}"/><text x="721" y="130" text-anchor="middle" font-family="monospace" font-size="11" fill="${DIM}">MP3</text></g>
  </svg>`;
})();

/* ===== 2. myagent — terminal ===== */
MOCKUPS.myagent=(()=>{
  const rows=[
    ["$","myagent \"What are my upcoming events?\"","#e9e7de",1],
    ["→","tool · list_upcoming_events()","#9a8cff",0],
    ["✓","Team standup — Tue 09:30","#57e6d9",0],
    ["✓","Design review — Tue 14:00","#57e6d9",0],
    ["✓","Dentist — Wed 17:30","#57e6d9",0],
    ["$","myagent \"What is 1234 + 5678?\"","#e9e7de",1],
    ["→","tool · add_numbers(1234, 5678)","#9a8cff",0],
    ["=","6912","#d9ff4b",0],
  ];
  let y=86, s="";
  rows.forEach(([p,t,c,bold])=>{
    s+=`<text x="46" y="${y}" font-family="monospace" font-size="15" fill="${p==="$"?"#d9ff4b":p==="→"?"#9a8cff":p==="✓"?"#57e6d9":"#d9ff4b"}">${p}</text>
        <text x="74" y="${y}" font-family="monospace" font-size="15" fill="${c}" ${bold?'font-weight="bold"':""}>${t.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</text>`;
    y+=44;
  });
  return `<svg viewBox="0 0 800 560" role="img" aria-label="myagent terminal mockup">
  <rect x="4" y="4" width="792" height="552" rx="22" fill="#0c0e10" stroke="${LINE}"/>
  ${traffic}<text x="88" y="25" font-family="monospace" font-size="13" fill="${FAINT}">nethusara — myagent · zsh</text>
  ${s}
  <text x="46" y="${y}" font-family="monospace" font-size="15" fill="#d9ff4b">$</text>
  <rect x="74" y="${y-14}" width="11" height="22" fill="#d9ff4b"><animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite"/></rect>
  <rect x="560" y="470" width="196" height="46" rx="23" fill="${VOLT_DIM}" stroke="rgba(217,255,75,.4)"/>
  <text x="658" y="499" text-anchor="middle" font-family="monospace" font-size="12" fill="${VOLT}">groq · gpt-oss-120b</text>
  </svg>`;
})();

/* ===== 3. Smart Financial Tracker — dashboard ===== */
MOCKUPS.sft=(()=>{
  const r=rng(21);
  const pts=[];let v=120;
  for(let i=0;i<=24;i++){v+=(r()-.42)*36;v=Math.max(30,Math.min(190,v));pts.push([216+i*(160/24),500-v]);}
  const line=pts.map((p,i)=>(i?"L":"M")+p[0].toFixed(0)+","+p[1].toFixed(0)).join(" ");
  const area=line+" L376,500 L216,500 Z";
  const txns=[["Salary · Oct","#57e6d9","+$2,400"],["Groceries","#ff8f8f","−$86.20"],["Freelance","#57e6d9","+$450"],["Rent","#ff8f8f","−$620"]]
    .map((t,i)=>`<g><rect x="420" y="${400+i*38}" width="316" height="30" rx="10" fill="${i%2?PANEL:"#141619"}"/>
      <circle cx="440" cy="${415+i*38}" r="6" fill="${t[1]}" opacity=".8"/>
      <text x="456" y="${420+i*38}" font-family="monospace" font-size="12" fill="${DIM}">${t[0]}</text>
      <text x="716" y="${420+i*38}" text-anchor="end" font-family="monospace" font-size="12" fill="${t[1]}">${t[2]}</text></g>`).join("");
  return `<svg viewBox="0 0 800 560" role="img" aria-label="Smart Financial Tracker dashboard mockup">
  <rect x="4" y="4" width="792" height="552" rx="22" fill="#101216" stroke="${LINE}"/>
  <rect x="4" y="4" width="150" height="552" rx="22" fill="${PANEL}" stroke="${LINE}"/>
  <rect x="30" y="40" width="98" height="34" rx="10" fill="${VOLT_DIM}"/><text x="79" y="63" text-anchor="middle" font-family="monospace" font-size="13" fill="${VOLT}" font-weight="bold">SFT</text>
  ${["Dashboard","Transactions","Budgets","Forecast","Settings"].map((n,i)=>`
    <rect x="30" y="${110+i*48}" width="98" height="36" rx="10" fill="${i===0?"rgba(217,255,75,.10)":"none"}"/>
    <rect x="44" y="${122+i*48}" width="70" height="9" rx="4.5" fill="${i===0?VOLT:TXTM}"/>`).join("")}
  <text x="196" y="70" font-family="sans-serif" font-size="24" font-weight="700" fill="${INK}">October overview</text>
  <text x="196" y="94" font-family="monospace" font-size="12" fill="${FAINT}">forecast confidence · 87%</text>
  ${[["Balance","$4,218","#e9e7de"],["Income","$2,850","#57e6d9"],["Expenses","$1,132","#ff8f8f"]].map((c,i)=>`
    <rect x="${196+i*200}" y="120" width="182" height="104" rx="14" fill="${PANEL}" stroke="${LINE}"/>
    <text x="${216+i*200}" y="152" font-family="monospace" font-size="11" fill="${FAINT}">${c[0].toUpperCase()}</text>
    <text x="${216+i*200}" y="190" font-family="sans-serif" font-size="27" font-weight="700" fill="${c[2]}">${c[1]}</text>`).join("")}
  <rect x="196" y="248" width="200" height="292" rx="14" fill="${PANEL}" stroke="${LINE}"/>
  <defs><linearGradient id="sftg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9ff4b" stop-opacity=".5"/><stop offset="1" stop-color="#d9ff4b" stop-opacity="0"/></linearGradient></defs>
  <text x="216" y="280" font-family="monospace" font-size="11" fill="${FAINT}">SPENDING FORECAST</text>
  <path d="${area}" fill="url(#sftg)" opacity=".55"/><path d="${line}" fill="none" stroke="${VOLT}" stroke-width="3"/>
  <circle cx="${pts[24][0].toFixed(0)}" cy="${pts[24][1].toFixed(0)}" r="6" fill="${VOLT}" stroke="#0a0b0d" stroke-width="2"/>
  <text x="216" y="524" font-family="monospace" font-size="11" fill="${FAINT}">OCT → DEC</text>
  <rect x="412" y="248" width="332" height="292" rx="14" fill="${PANEL}" stroke="${LINE}"/>
  <text x="432" y="280" font-family="monospace" font-size="11" fill="${FAINT}">RECENT</text>
  ${txns}
  </svg>`;
})();

/* ===== 4. SLIATE ScheduleTimeLine ===== */
MOCKUPS.sliate=(()=>{
  const days=["MON","TUE","WED","THU","FRI"];
  const evts=[
    [0,1,"OOP · Lab",VIOLET,120],[0,3,"DBMS",CYAN,90],
    [1,0,"Web Tech",VOLT,110],[1,2,"Maths",CYAN,90],
    [2,1,"SE · Lecture",VIOLET,130],[2,4,"Club",VOLT,80],
    [3,0,"DBMS · Lab",CYAN,120],[3,2,"OOP",VIOLET,90],
    [4,1,"Project",VOLT,150],
  ];
  const evSvg=evts.map(([d,slot,name,c,w])=>{
    const x=170+d*118, y=120+slot*72;
    return `<rect x="${x}" y="${y}" width="106" height="60" rx="12" fill="${c}" opacity=".16" stroke="${c}" stroke-opacity=".55"/>
      <rect x="${x+10}" y="${y+10}" width="${w*.32}" height="8" rx="4" fill="${c}"/>
      <text x="${x+10}" y="${y+38}" font-family="monospace" font-size="10.5" fill="${INK}">${name}</text>`;
  }).join("");
  return `<svg viewBox="0 0 800 560" role="img" aria-label="SLIATE ScheduleTimeLine mockup">
  <rect x="4" y="4" width="792" height="552" rx="22" fill="#101216" stroke="${LINE}"/>
  ${traffic}<text x="88" y="25" font-family="monospace" font-size="13" fill="${FAINT}">SLIATE · Semester timeline</text>
  <text x="40" y="78" font-family="sans-serif" font-size="22" font-weight="700" fill="${INK}">Week 07 <tspan fill="${FAINT}" font-weight="400" font-size="15">· Y2S1</tspan></text>
  <rect x="640" y="52" width="118" height="34" rx="17" fill="${VOLT}"/><text x="699" y="74" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#0a0b0d">Today →</text>
  ${days.map((d,i)=>{const cx=223+i*118;const bg=i===2?`<rect x="${cx-32}" y="99" width="64" height="22" rx="11" fill="#101216"/>`:"";return bg+`<text x="${cx}" y="115" text-anchor="middle" font-family="monospace" font-size="12" fill="${i===2?VOLT:FAINT}" ${i===2?'font-weight="bold"':""}>${d}</text>`;}).join("")}
  ${[0,1,2,3,4,5].map(i=>`<line x1="150" y1="${120+i*72}" x2="760" y2="${120+i*72}" stroke="${LINE}" stroke-dasharray="3 6"/>`).join("")}
  ${[8,10,12,14,16,18].map((h,i)=>`<text x="150" y="${124+i*72}" text-anchor="end" font-family="monospace" font-size="10" fill="${FAINT}">${h}:00</text>`).join("")}
  ${evSvg}
  <line x1="459" y1="112" x2="459" y2="528" stroke="${VOLT}" stroke-width="2" stroke-dasharray="6 5"/>
  <circle cx="459" cy="112" r="5" fill="${VOLT}"/>
  </svg>`;
})();

/* inject mockups */
$$("[data-mockup]").forEach(m=>{const k=m.dataset.mockup;if(MOCKUPS[k])m.innerHTML=MOCKUPS[k];});

/* ---------- footer year ---------- */
$$("[data-year]").forEach(e=>e.textContent=new Date().getFullYear());

/* ---------- safety: if GSAP/Lenis missing, show content ---------- */
function showAll(){
  $$("[data-reveal]").forEach(e=>{e.style.opacity=1;e.style.transform="none";});
  const l=$("#loader"); if(l)l.style.display="none";
  $$(".hero h1 .line > span, .p-hero h1 .line > span").forEach(e=>{e.style.transform="none";});
}
if(reduced || typeof gsap==="undefined"){document.documentElement.classList.add("no-anim");showAll();}
else initMotion();

function initMotion(){
  gsap.registerPlugin(ScrollTrigger);
  /* Lenis smooth scroll */
  let lenis=null;
  if(typeof Lenis!=="undefined" && !reduced){
    lenis=new Lenis({duration:1.15,smoothWheel:true});
    lenis.on("scroll",ScrollTrigger.update);
    gsap.ticker.add(t=>lenis.raf(t*1000));
    gsap.ticker.lagSmoothing(0);
  }
  const scrollTo=(target)=>{ if(lenis)lenis.scrollTo(target,{offset:-70}); else target.scrollIntoView({behavior:"smooth"}); };
  $$('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
    const t=$(a.getAttribute("href")); if(t){e.preventDefault();scrollTo(t);closeMenu();}
  }));

  /* ---------- preloader ---------- */
  const loader=$("#loader"), count=$("#loader .l-count b"), bar=$("#loader .l-bar i");
  const heroLines=$$(".hero h1 .line > span, .p-hero h1 .line > span");
  gsap.set(heroLines,{yPercent:115});
  gsap.set([".eyebrow",".hero-copy",".hero-actions",".p-tagline",".p-crumb",".p-num",".p-links",".p-meta"],{opacity:0,y:26});
  gsap.set(".hero-meta div",{opacity:0,y:30});
  gsap.set(".nav",{y:-80,opacity:0});
  const prog={v:0};
  const intro=gsap.timeline();
  intro.to("#loader .l-word span",{y:0,duration:.8,ease:"power4.out",stagger:.06},0)
    .to(prog,{v:100,duration:1.15,ease:"power2.inOut",
      onUpdate:()=>{count.textContent=Math.round(prog.v);bar.style.width=prog.v+"%";}},0)
    .to(loader,{yPercent:-100,duration:.9,ease:"power4.inOut",delay:.15})
    .set(loader,{display:"none"})
    .to(".nav",{y:0,opacity:1,duration:.8,ease:"power3.out",
      onComplete:()=>gsap.set(".nav",{clearProps:"transform"})},"-=.55")
    .to(heroLines,{yPercent:0,duration:1.1,ease:"power4.out",stagger:.09},"-=.6")
    .to([".eyebrow",".p-crumb",".p-num"],{opacity:1,y:0,duration:.7,ease:"power3.out",stagger:.08},"-=.8")
    .to([".hero-copy",".p-tagline"],{opacity:1,y:0,duration:.7,ease:"power3.out"},"-=.6")
    .to([".hero-actions",".p-links"],{opacity:1,y:0,duration:.7,ease:"power3.out"},"-=.55")
    .to(".p-meta",{opacity:1,y:0,duration:.7,ease:"power3.out"},"-=.5")
    .to(".hero-meta div",{opacity:1,y:0,duration:.7,ease:"power3.out",stagger:.1,
      onComplete:()=>ScrollTrigger.refresh()},"-=.55");

  /* ---------- scroll reveals ---------- */
  $$("[data-reveal]").forEach(elm=>{
    gsap.to(elm,{opacity:1,y:0,duration:1,ease:"power3.out",
      delay:parseFloat(elm.dataset.delay||0),
      scrollTrigger:{trigger:elm,start:"top 88%",once:true}});
  });

  /* ---------- parallax orbs ---------- */
  $$(".orb").forEach((o,i)=>{
    gsap.to(o,{y:i%2?120:-120,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});
  });

  /* ---------- card tilt ---------- */
  if(fine)$$(".work-card").forEach(card=>{
    const frame=$(".mock-frame",card); if(!frame)return;
    card.addEventListener("mousemove",e=>{
      const r=frame.getBoundingClientRect();
      const rx=((e.clientY-r.top)/r.height-.5)*-10, ry=((e.clientX-r.left)/r.width-.5)*12;
      gsap.to(frame,{rotateX:rx,rotateY:ry,duration:.5,ease:"power2.out",transformPerspective:1100});
    });
    card.addEventListener("mouseleave",()=>gsap.to(frame,{rotateX:0,rotateY:0,duration:.8,ease:"elastic.out(1,.5)"}));
  });

  /* ---------- custom cursor ---------- */
  if(fine){
    const dot=$(".cursor-dot"), ring=$(".cursor-ring");
    let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
    addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;
      dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;});
    (function loop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;
      ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;requestAnimationFrame(loop);})();
    const hoverSel="a,button,.chip,.tool-cell li";
    document.addEventListener("mouseover",e=>{
      if(e.target.closest(".work-card")){ring.classList.add("is-view");ring.classList.remove("is-hover");}
      else if(e.target.closest(hoverSel)){ring.classList.add("is-hover");ring.classList.remove("is-view");}
    });
    document.addEventListener("mouseout",e=>{
      if(e.target.closest(".work-card,.cursor-ring"))ring.classList.remove("is-view");
      if(e.target.closest(hoverSel))ring.classList.remove("is-hover");
    });
  }

  /* ---------- magnetic ---------- */
  if(fine)$$(".btn,.nav-cta,.big-arrow,.link-more .circle").forEach(b=>{
    b.addEventListener("mousemove",e=>{
      const r=b.getBoundingClientRect();
      gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.28,y:(e.clientY-r.top-r.height/2)*.28,duration:.4,ease:"power2.out"});
    });
    b.addEventListener("mouseleave",()=>gsap.to(b,{x:0,y:0,duration:.7,ease:"elastic.out(1,.4)"}));
  });

  /* ---------- nav state ---------- */
  const nav=$(".nav");
  const onScroll=()=>nav.classList.toggle("scrolled",(lenis?lenis.scroll:scrollY)>40);
  if(lenis)lenis.on("scroll",onScroll); else addEventListener("scroll",onScroll,{passive:true});

  /* ---------- page wipe transitions ---------- */
  const wipe=$("#wipe"), wWord=$("#wipe .w-word");
  $$('a[href$=".html"]').forEach(a=>{
    if(a.hostname&&a.hostname!==location.hostname)return;
    a.addEventListener("click",e=>{
      if(e.metaKey||e.ctrlKey||e.shiftKey)return;
      e.preventDefault();
      const label=a.dataset.wipe||"";
      wWord.textContent=label;
      gsap.timeline({onComplete:()=>location.href=a.href})
        .set(wipe,{pointerEvents:"auto"})
        .to(wipe,{scaleY:1,transformOrigin:"bottom",duration:.55,ease:"power4.inOut"})
        .to(wWord,{opacity:1,duration:.3},"-=.2");
    });
  });
}

/* ---------- mobile menu ---------- */
const burger=$(".burger"), navLinks=$(".nav-links");
function closeMenu(){burger&&burger.classList.remove("open");navLinks&&navLinks.classList.remove("open");document.body.style.overflow="";}
if(burger)burger.addEventListener("click",()=>{
  const open=navLinks.classList.toggle("open");burger.classList.toggle("open",open);
  document.body.style.overflow=open?"hidden":"";
});
})();
