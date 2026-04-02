"use strict";var TetsuzukiQuest=(()=>{var K=Object.defineProperty;var ce=Object.getOwnPropertyDescriptor;var ue=Object.getOwnPropertyNames;var xe=Object.prototype.hasOwnProperty;var me=(t,e)=>{for(var n in e)K(t,n,{get:e[n],enumerable:!0})},ge=(t,e,n,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of ue(e))!xe.call(t,o)&&o!==n&&K(t,o,{get:()=>e[o],enumerable:!(i=ce(e,o))||i.enumerable});return t};var fe=t=>ge(K({},"__esModule",{value:!0}),t);var Se={};me(Se,{start:()=>Ee,startWithPrompt:()=>we,startWithScenario:()=>ke,stop:()=>Te});var S=0,$=0;function F(t){S=0,$=t}function G(t,e){S=t,$=e}function X(t){S=t}function J(){S=0,$=0}function N(){return{current:S,total:$}}var R="tq-bubble";function be(t){return t==="happy"?"\u{1F60A}":t==="thinking"?"\u{1F914}":"\u{1F610}"}function ee(t){return`
    <div style="
      width:56px;height:56px;border-radius:50%;
      background:linear-gradient(135deg,#3b82f6,#1d4ed8);
      display:flex;align-items:center;justify-content:center;
      font-size:28px;flex-shrink:0;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
    ">${be(t)}</div>
  `}function te(t,e){let n=e>0?Math.min(100,Math.round(t/e*100)):0,i=document.createElement("div");i.style.cssText="display:flex;align-items:center;gap:8px;margin-bottom:10px;";let o=document.createElement("div");o.style.cssText=`
    flex:1;height:4px;background:#f3f4f6;border-radius:9999px;overflow:hidden;
  `;let r=document.createElement("div");r.style.cssText=`
    height:100%;width:${n}%;background:#f97316;border-radius:9999px;
    transition:width 0.4s ease;
  `;let d=document.createElement("span");return d.style.cssText="font-size:11px;color:#9ca3af;white-space:nowrap;flex-shrink:0;",d.textContent=`${t} / ${e}`,o.appendChild(r),i.appendChild(o),i.appendChild(d),i}function h(t,e,n,i=!1,o){g();let{current:r,total:d}=N(),l=document.createElement("div");l.id=R,l.style.cssText=`
    position:fixed;bottom:24px;left:24px;
    display:flex;align-items:flex-end;gap:12px;
    z-index:100000;max-width:420px;
    animation:tq-slide-in 0.3s ease;
  `;let p=document.createElement("div");p.style.cssText=`
    background:white;border-radius:16px 16px 16px 4px;
    padding:14px 16px;
    box-shadow:0 4px 20px rgba(0,0,0,0.15);
    flex:1;position:relative;
  `,d>0&&p.appendChild(te(r,d));let m=document.createElement("p");m.style.cssText=`
    margin:0 0 10px;font-size:14px;line-height:1.6;
    color:#1f2937;min-height:20px;
  `;let c=0,u=()=>{c<t.length&&(m.textContent+=t[c++],setTimeout(u,16))};if(u(),p.appendChild(m),o||!i){let a=document.createElement("div");if(a.style.cssText="display:flex;justify-content:flex-end;align-items:center;gap:8px;margin-top:4px;",o){let s=document.createElement("button");s.textContent=o.label,s.style.cssText=`
        background:transparent;border:1.5px solid #0d9488;
        color:#0d9488;padding:5px 12px;border-radius:8px;font-size:12px;
        cursor:pointer;font-weight:600;transition:all 0.15s;
      `,s.onmouseover=()=>{s.style.background="#0d9488",s.style.color="white"},s.onmouseout=()=>{s.style.background="transparent",s.style.color="#0d9488"},s.onmousedown=y=>y.preventDefault(),s.onclick=o.onClick,a.appendChild(s)}if(!i){let s=document.createElement("button");s.textContent="\u6B21\u3078 \u2192",s.style.cssText=`
        background:#3b82f6;color:white;border:none;
        padding:6px 16px;border-radius:8px;font-size:13px;
        cursor:pointer;font-weight:600;transition:background 0.15s;
      `,s.onmouseover=()=>{s.style.background="#2563eb"},s.onmouseout=()=>{s.style.background="#3b82f6"},s.onclick=()=>{g(),e()},a.appendChild(s)}p.appendChild(a)}if(l.innerHTML=ee(n),l.appendChild(p),document.body.appendChild(l),!document.getElementById("tq-styles")){let a=document.createElement("style");a.id="tq-styles",a.textContent=`
      @keyframes tq-slide-in {
        from { opacity:0; transform:translateY(20px); }
        to { opacity:1; transform:translateY(0); }
      }
      @keyframes tq-pulse-ring {
        0% { transform:scale(1); opacity:0.8; }
        100% { transform:scale(1.5); opacity:0; }
      }
    `,document.head.appendChild(a)}}function ne(t,e,n){g();let{current:i,total:o}=N(),r=document.createElement("div");r.id=R,r.style.cssText=`
    position:fixed;bottom:24px;left:24px;
    display:flex;align-items:flex-end;gap:12px;
    z-index:100000;max-width:420px;
    animation:tq-slide-in 0.3s ease;
  `;let d=document.createElement("div");d.style.cssText=`
    background:white;border-radius:16px 16px 16px 4px;
    padding:14px 16px;
    box-shadow:0 4px 20px rgba(0,0,0,0.15);
    flex:1;
  `,o>0&&d.appendChild(te(i,o));let l=document.createElement("p");l.style.cssText=`
    margin:0 0 12px;font-size:14px;line-height:1.6;color:#1f2937;font-weight:600;
  `;let p=0,m=()=>{p<t.length&&(l.textContent+=t[p++],setTimeout(m,16))};m();let c=document.createElement("div");c.style.cssText="display:flex;gap:8px;";let u=document.createElement("button");u.textContent="\u306F\u3044 \u2713",u.style.cssText=`
    background:#22c55e;color:white;border:none;
    padding:6px 18px;border-radius:8px;font-size:13px;
    cursor:pointer;font-weight:600;flex:1;
    transition:background 0.15s;
  `,u.onclick=()=>{g(),e()};let a=document.createElement("button");a.textContent="\u3044\u3044\u3048 \u2717",a.style.cssText=`
    background:#ef4444;color:white;border:none;
    padding:6px 18px;border-radius:8px;font-size:13px;
    cursor:pointer;font-weight:600;flex:1;
    transition:background 0.15s;
  `,a.onclick=()=>{g(),n()},c.appendChild(u),c.appendChild(a),d.appendChild(l),d.appendChild(c),r.innerHTML=ee("thinking"),r.appendChild(d),document.body.appendChild(r)}function g(){var t;(t=document.getElementById(R))==null||t.remove()}var A="tq-overlay",H="tq-ring",C=null,I=null,oe="";function q(){oe=document.body.style.overflow,document.body.style.overflow="hidden"}function O(){document.body.style.overflow=oe}function j(t,e,n,i,o,r,d=!0){let l="http://www.w3.org/2000/svg",p=document.createElementNS(l,"svg");p.setAttribute("width","100%"),p.setAttribute("height","100%"),p.style.cssText="position:absolute;inset:0;width:100%;height:100%;";let m=document.createElementNS(l,"defs"),c=document.createElementNS(l,"mask");c.id=r;let u=document.createElementNS(l,"rect");u.setAttribute("x","0"),u.setAttribute("y","0"),u.setAttribute("width","100%"),u.setAttribute("height","100%"),u.setAttribute("fill","white");let a=document.createElementNS(l,"rect");a.setAttribute("x",String(e)),a.setAttribute("y",String(n)),a.setAttribute("width",String(i-e)),a.setAttribute("height",String(o-n)),a.setAttribute("rx","4"),a.setAttribute("fill","black"),c.appendChild(u),c.appendChild(a),m.appendChild(c),p.appendChild(m);let s=document.createElementNS(l,"rect");s.setAttribute("x","0"),s.setAttribute("y","0"),s.setAttribute("width","100%"),s.setAttribute("height","100%"),s.setAttribute("fill","rgba(0,0,0,0.75)"),s.setAttribute("mask",`url(#${r})`),d||(s.style.pointerEvents="none"),p.appendChild(s),t.appendChild(p)}function B(){E();let t=document.createElement("div");t.id=A,t.style.cssText=`
    position:fixed;inset:0;
    background:rgba(0,0,0,0.75);
    z-index:99998;
    pointer-events:all;
  `,document.body.appendChild(t)}function ie(t,e){E();let n=document.querySelector(t);if(!n){q(),B();return}n.scrollIntoView({block:"center",inline:"nearest"}),q();let i=()=>{var k,x;(k=document.getElementById(A))==null||k.remove(),(x=document.getElementById(H))==null||x.remove();let m=n.getBoundingClientRect(),c=8,u=m.left-c,a=m.top-c,s=m.right+c,y=m.bottom+c,v=document.createElement("div");v.id=A,v.style.cssText="position:fixed;inset:0;background:transparent;z-index:99998;pointer-events:all;",j(v,u,a,s,y,"tq-spotlight-mask"),document.body.appendChild(v);let w=document.createElement("div");w.id=H,w.style.cssText=`
      position:fixed;
      left:${u}px;top:${a}px;
      width:${s-u}px;height:${y-a}px;
      border:3px solid #fbbf24;border-radius:6px;
      z-index:99999;pointer-events:none;
      animation:tq-pulse-ring 1.2s ease-out infinite;
    `,document.body.appendChild(w)};i(),window.addEventListener("resize",i),I=()=>window.removeEventListener("resize",i);let o=n.style.pointerEvents,r=n.style.position,d=n.style.zIndex;n.style.pointerEvents="auto",n.style.position=n.style.position||"relative",n.style.zIndex="99999";let l=()=>{n.style.pointerEvents=o,n.style.position=r,n.style.zIndex=d,C=null};C=l;let p=()=>{l(),E(),e()};n.addEventListener("click",p,{once:!0})}function E(){var t,e;C==null||C(),I==null||I(),I=null,(t=document.getElementById(A))==null||t.remove(),(e=document.getElementById(H))==null||e.remove(),O()}var Q="tq-doc-modal";function he(t,e){if(t==="custom"&&e)return`<img src="${e}" alt="\u66F8\u985E\u306E\u898B\u672C" style="max-width:100%;border-radius:8px;">`;if(t.startsWith("cdoc-")){try{let o=JSON.parse(localStorage.getItem("tq_custom_doc_types")??"[]").find(r=>r.id===t);if(o)return`<img src="${o.imageBase64}" alt="${o.label}" style="max-width:100%;border-radius:8px;">`}catch{}return'<p style="color:#6b7280;text-align:center;">\u753B\u50CF\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093</p>'}let n={"mynumber-card":`
      <div style="
        width:340px;height:200px;background:linear-gradient(135deg,#1e40af,#3b82f6);
        border-radius:12px;padding:16px;color:white;
        display:flex;flex-direction:column;justify-content:space-between;
        box-shadow:0 4px 20px rgba(0,0,0,0.2);
      ">
        <div style="font-size:11px;opacity:0.8">\u500B\u4EBA\u756A\u53F7\u30AB\u30FC\u30C9 (\u30DE\u30A4\u30CA\u30F3\u30D0\u30FC\u30AB\u30FC\u30C9)</div>
        <div style="display:flex;gap:12px;align-items:center;">
          <div style="width:60px;height:80px;background:rgba(255,255,255,0.3);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:28px;">\u{1F464}</div>
          <div>
            <div style="font-size:16px;font-weight:bold;margin-bottom:4px;">\u5C71\u7530 \u592A\u90CE</div>
            <div style="font-size:11px;opacity:0.8">\u751F\u5E74\u6708\u65E5: \u662D\u548C60\u5E741\u67081\u65E5</div>
            <div style="font-size:11px;opacity:0.8">\u6027\u5225: \u7537</div>
            <div style="font-size:11px;opacity:0.8;margin-top:8px;">\u4F4F\u6240: \u6771\u4EAC\u90FD\u5343\u4EE3\u7530\u533A...</div>
          </div>
        </div>
        <div style="font-size:10px;opacity:0.7">\u6709\u52B9\u671F\u9650: \u4EE4\u548C15\u5E741\u67081\u65E5\u307E\u3067\u6709\u52B9</div>
      </div>
    `,receipt:`
      <div style="
        width:280px;background:white;border:1px solid #e5e7eb;
        border-radius:8px;padding:20px;
        font-family:monospace;font-size:12px;
        box-shadow:0 2px 8px rgba(0,0,0,0.1);
      ">
        <div style="text-align:center;font-size:16px;font-weight:bold;margin-bottom:12px;border-bottom:2px solid #1f2937;padding-bottom:8px;">\u9818 \u53CE \u66F8</div>
        <div style="margin-bottom:8px;">\u5C71\u7530 \u592A\u90CE \u69D8</div>
        <div style="margin:12px 0;padding:8px;background:#f9fafb;border-radius:4px;">
          <div style="display:flex;justify-content:space-between;">
            <span>\u624B\u6570\u6599</span><span>\xA5500</span>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;font-weight:bold;border-top:1px solid #e5e7eb;padding-top:8px;">
          <span>\u5408\u8A08</span><span>\xA5500</span>
        </div>
        <div style="margin-top:16px;text-align:right;font-size:10px;color:#6b7280;">
          \u25CB\u25CB\u5E02\u5F79\u6240<br>\u4EE4\u548C6\u5E741\u67081\u65E5
        </div>
      </div>
    `,"residence-certificate":`
      <div style="
        width:320px;background:white;border:2px solid #1f2937;
        border-radius:4px;padding:20px;
        font-size:12px;
        box-shadow:0 2px 8px rgba(0,0,0,0.1);
      ">
        <div style="text-align:center;font-size:16px;font-weight:bold;margin-bottom:16px;">\u4F4F \u6C11 \u7968 \u306E \u5199 \u3057</div>
        <table style="width:100%;border-collapse:collapse;font-size:11px;">
          <tr><td style="padding:4px 8px;border:1px solid #d1d5db;background:#f9fafb;width:100px;">\u6C0F\u540D</td><td style="padding:4px 8px;border:1px solid #d1d5db;">\u5C71\u7530 \u592A\u90CE</td></tr>
          <tr><td style="padding:4px 8px;border:1px solid #d1d5db;background:#f9fafb;">\u751F\u5E74\u6708\u65E5</td><td style="padding:4px 8px;border:1px solid #d1d5db;">\u662D\u548C60\u5E741\u67081\u65E5\u751F</td></tr>
          <tr><td style="padding:4px 8px;border:1px solid #d1d5db;background:#f9fafb;">\u6027\u5225</td><td style="padding:4px 8px;border:1px solid #d1d5db;">\u7537</td></tr>
          <tr><td style="padding:4px 8px;border:1px solid #d1d5db;background:#f9fafb;">\u4F4F\u6240</td><td style="padding:4px 8px;border:1px solid #d1d5db;">\u6771\u4EAC\u90FD\u5343\u4EE3\u7530\u533A\u5343\u4EE3\u75301-1</td></tr>
          <tr><td style="padding:4px 8px;border:1px solid #d1d5db;background:#f9fafb;">\u4E16\u5E2F\u4E3B</td><td style="padding:4px 8px;border:1px solid #d1d5db;">\u5C71\u7530 \u592A\u90CE</td></tr>
        </table>
        <div style="margin-top:16px;text-align:right;font-size:10px;color:#6b7280;">
          \u767A\u884C\u65E5\uFF1A\u4EE4\u548C6\u5E741\u67081\u65E5<br>\u5343\u4EE3\u7530\u533A\u9577
        </div>
      </div>
    `};return n[t]??n["mynumber-card"]}function re(t){var d;(d=document.getElementById(Q))==null||d.remove();let e=document.createElement("div");e.id=Q,e.style.cssText=`
    position:fixed;inset:0;background:rgba(0,0,0,0.6);
    z-index:200000;display:flex;align-items:center;justify-content:center;
    animation:tq-slide-in 0.2s ease;
  `;let n=document.createElement("div");n.style.cssText=`
    background:white;border-radius:16px;padding:24px;
    max-width:480px;width:90%;
    box-shadow:0 20px 60px rgba(0,0,0,0.3);
  `;let i=document.createElement("h3");i.textContent="\u66F8\u985E\u306E\u898B\u672C",i.style.cssText="margin:0 0 16px;font-size:16px;font-weight:700;color:#1f2937;";let o=document.createElement("div");o.style.cssText="display:flex;justify-content:center;margin-bottom:20px;",o.innerHTML=he(t.documentType,t.previewImageUrl);let r=document.createElement("button");r.textContent="\u9589\u3058\u308B",r.style.cssText=`
    width:100%;background:#f3f4f6;border:none;
    padding:10px;border-radius:8px;font-size:14px;
    cursor:pointer;font-weight:600;color:#374151;
    transition:background 0.15s;
  `,r.onmouseover=()=>{r.style.background="#e5e7eb"},r.onmouseout=()=>{r.style.background="#f3f4f6"},r.onclick=()=>e.remove(),e.onclick=l=>{l.target===e&&e.remove()},n.appendChild(i),n.appendChild(o),n.appendChild(r),e.appendChild(n),document.body.appendChild(e)}function Z(){var t;(t=document.getElementById(Q))==null||t.remove()}var V="tq-input-overlay",W="tq-input-error-tooltip";function se(t,e){z();let n=document.getElementById(t.targetId);if(!n){h(t.message,e);return}n.scrollIntoView({block:"center",inline:"nearest"}),q();let i=()=>{var Y;(Y=document.getElementById(V))==null||Y.remove();let x=n.getBoundingClientRect(),f=12,P=x.left-f,_=x.top-f,le=x.right+f,pe=x.bottom+f,M=document.createElement("div");M.id=V,M.style.cssText="position:fixed;inset:0;background:transparent;z-index:99998;pointer-events:none;",j(M,P,_,le,pe,"tq-input-mask",!1),document.body.appendChild(M)};i(),window.addEventListener("resize",i);let o=n.style.pointerEvents,r=n.style.zIndex,d=n.style.outline,l=n.style.boxShadow;n.style.pointerEvents="auto",n.style.zIndex="99999",n.style.position=n.style.position||"relative",n.focus();let p=t.documentType?{label:`\u{1F50D} ${t.buttonLabel??"\u898B\u672C\u3092\u78BA\u8A8D"}`,onClick:()=>re({id:t.id,type:"document-preview",message:"",targetId:t.targetId,targetLabel:t.targetLabel,documentType:t.documentType,buttonLabel:t.buttonLabel,nextId:t.nextId})}:void 0;h(t.message,()=>{},void 0,!0,p);let m=t.validationPattern?new RegExp(t.validationPattern):null,c=null,u=()=>{var x;c&&(window.removeEventListener("resize",c),c=null),(x=document.getElementById(W))==null||x.remove()},a=x=>{u();let f=document.createElement("div");f.id=W,f.textContent=x,f.style.cssText=`
      position:fixed;
      background:white;color:#ef4444;
      border:1.5px solid #ef4444;border-radius:6px;
      padding:6px 10px;font-size:12px;font-weight:600;
      white-space:nowrap;
      box-shadow:0 2px 8px rgba(239,68,68,0.2);
      z-index:100001;pointer-events:none;
    `;let P=()=>{let _=n.getBoundingClientRect();f.style.left=`${_.left}px`,f.style.top=`${_.bottom+8}px`};P(),document.body.appendChild(f),c=P,window.addEventListener("resize",c)},s=()=>{window.removeEventListener("resize",i),n.removeEventListener("keydown",k),n.style.pointerEvents=o,n.style.zIndex=r,n.style.outline=d,n.style.boxShadow=l,u(),z(),g(),O()},y=!1,v=()=>{if(y)return;let x=n.value.trim();if(m){if(!x){n.style.outline="2px solid #ef4444",n.style.boxShadow="0 0 0 3px rgba(239,68,68,0.2)",a("\u5165\u529B\u3057\u3066\u304B\u3089\u6B21\u3078\u9032\u3093\u3067\u304F\u3060\u3055\u3044"),g(),h("\u5165\u529B\u3057\u3066\u304B\u3089\u6B21\u3078\u9032\u3093\u3067\u304F\u3060\u3055\u3044\u3002",()=>{},"thinking",!0,p),n.focus(),n.addEventListener("blur",w,{once:!0});return}if(!m.test(x)){n.style.outline="2px solid #ef4444",n.style.boxShadow="0 0 0 3px rgba(239,68,68,0.2)",a(t.errorMessage||"\u5165\u529B\u5185\u5BB9\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093"),g(),h(t.errorMessage||"\u5165\u529B\u5185\u5BB9\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002\u3082\u3046\u4E00\u5EA6\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",()=>{},"thinking",!0,p),n.focus(),n.addEventListener("blur",w,{once:!0});return}}y=!0,n.removeEventListener("keydown",k),n.style.outline="2px solid #22c55e",n.style.boxShadow="0 0 0 3px rgba(34,197,94,0.2)",u(),setTimeout(()=>{s(),e()},400)},w=()=>v(),k=x=>{x.key==="Enter"&&(x.preventDefault(),v())};n.addEventListener("blur",w,{once:!0}),n.addEventListener("keydown",k)}function z(){var t,e;(t=document.getElementById(V))==null||t.remove(),(e=document.getElementById(W))==null||e.remove(),O()}var L=class{scenario;currentBlockId;currentStep;totalSteps;constructor(e){this.scenario=e,this.currentBlockId=null,this.currentStep=0,this.totalSteps=e.totalSteps??e.blocks.filter(n=>n.type!=="start"&&n.type!=="end").length}start(){this.currentBlockId=this.scenario.startBlockId,this.currentStep=0,F(this.totalSteps),this.currentBlockId&&this.renderCurrentBlock()}next(e){if(!e){this.cleanup();return}this.currentBlockId=e,this.renderCurrentBlock()}renderCurrentBlock(){if(!this.currentBlockId)return;let e=this.scenario.blocks.find(n=>n.id===this.currentBlockId);if(!e){this.cleanup();return}this.currentStep++,G(this.currentStep,this.totalSteps),window.parent.postMessage({type:"TETSUZUKI_QUEST_BLOCK_ACTIVE",blockId:e.id},"*"),this.render(e)}render(e){switch(e.type){case"start":this.currentStep--,e.message?(B(),h(e.message,()=>this.next(e.nextId),e.characterMood)):this.next(e.nextId);break;case"end":this.finish(e.message);break;case"speech":B(),h(e.message,()=>this.next(e.nextId),e.characterMood);break;case"spotlight":ie(e.targetSelector,()=>{g(),this.next(e.nextId)}),h(e.message,()=>{},void 0,!0);break;case"input-spotlight":E(),se(e,()=>this.next(e.nextId));break;case"branch":B(),ne(e.question,()=>this.next(e.yesNextId),()=>this.next(e.noNextId));break}}cleanup(){X(this.totalSteps),g(),E(),z(),Z(),window.parent.postMessage({type:"TETSUZUKI_QUEST_BLOCK_ACTIVE",blockId:null},"*")}finish(e){this.cleanup();let n=e??"\u624B\u7D9A\u304D\u306E\u6D41\u308C\u3092\u78BA\u8A8D\u3067\u304D\u307E\u3057\u305F\u3002",i=document.createElement("div");i.id="tq-completion-toast",i.style.cssText=`
      position:fixed;bottom:24px;right:24px;
      background:white;border-radius:16px;padding:20px 24px;
      box-shadow:0 8px 32px rgba(0,0,0,0.18);
      z-index:100001;display:flex;align-items:center;gap:16px;
      animation:tq-slide-in 0.3s ease;
      pointer-events:auto;
    `,i.innerHTML=`
      <div style="font-size:36px;">\u{1F389}</div>
      <div>
        <div style="font-size:15px;font-weight:700;color:#1f2937;margin-bottom:2px;">\u30C1\u30E5\u30FC\u30C8\u30EA\u30A2\u30EB\u5B8C\u4E86\uFF01</div>
        <div style="font-size:13px;color:#6b7280;">${n.replace(/</g,"&lt;")}</div>
      </div>
      <button id="tq-completion-close" style="
        background:transparent;border:none;color:#9ca3af;
        font-size:20px;cursor:pointer;padding:4px;line-height:1;
        margin-left:8px;
      ">\u2715</button>
    `,document.body.appendChild(i),document.getElementById("tq-completion-close").onclick=()=>i.remove(),setTimeout(()=>i.remove(),5e3),window.parent.postMessage({type:"TETSUZUKI_QUEST_FINISHED"},"*")}destroy(){var e;g(),E(),z(),Z(),J(),(e=document.getElementById("tq-completion-toast"))==null||e.remove()}};var b=null,ye="tq-pick-highlight";function U(t){if(t.id)return`#${t.id}`;let e=t.tagName.toLowerCase(),n=t.parentElement;if(!n)return e;let i=Array.from(n.children).filter(r=>r.tagName===t.tagName);if(i.length===1)return`${U(n)} > ${e}`;let o=i.indexOf(t)+1;return`${U(n)} > ${e}:nth-of-type(${o})`}var T=null;function ve(){T&&T();let t=document.createElement("div");t.id=ye,t.style.cssText=`
    position:fixed;pointer-events:none;z-index:999999;
    border:2px solid #f59e0b;border-radius:4px;
    background:rgba(245,158,11,0.15);transition:all 0.05s;
    display:none;
  `,document.body.appendChild(t);let e=document.createElement("div");e.style.cssText=`
    position:fixed;z-index:1000000;pointer-events:none;
    background:#1f2937;color:white;font-size:11px;font-family:monospace;
    padding:3px 8px;border-radius:4px;white-space:nowrap;display:none;
  `,document.body.appendChild(e);let n=o=>{let r=document.elementFromPoint(o.clientX,o.clientY);if(!r||r===t||r===e)return;let d=r.getBoundingClientRect();t.style.display="block",t.style.left=`${d.left-2}px`,t.style.top=`${d.top-2}px`,t.style.width=`${d.width+4}px`,t.style.height=`${d.height+4}px`;let l=U(r),p=r.id??"";e.textContent=p?`#${p}  (${r.tagName.toLowerCase()})`:l,e.style.display="block",e.style.left=`${Math.min(o.clientX+12,window.innerWidth-200)}px`,e.style.top=`${o.clientY+16}px`},i=o=>{o.preventDefault(),o.stopPropagation();let r=document.elementFromPoint(o.clientX,o.clientY);if(!r||r===t||r===e)return;let d=U(r),l=r.id??"";window.parent.postMessage({type:"TETSUZUKI_QUEST_ELEMENT_PICKED",selector:d,id:l},"*"),ae()};document.addEventListener("mousemove",n,!0),document.addEventListener("click",i,!0),document.body.style.cursor="crosshair",T=()=>{document.removeEventListener("mousemove",n,!0),document.removeEventListener("click",i,!0),document.body.style.cursor="",t.remove(),e.remove(),T=null}}function ae(){T&&T()}function de(t,e){let n=document.createElement("div");n.id="tq-start-dialog",n.style.cssText=`
    position:fixed;inset:0;
    background:rgba(0,0,0,0.45);
    z-index:100002;
    display:flex;align-items:center;justify-content:center;
  `;let i=document.createElement("div");i.style.cssText=`
    background:white;border-radius:20px;
    padding:32px 28px;max-width:360px;width:90%;
    box-shadow:0 16px 48px rgba(0,0,0,0.22);
    text-align:center;
  `,i.innerHTML=`
    <div style="font-size:48px;margin-bottom:12px;">\u{1F9ED}</div>
    <div style="font-size:17px;font-weight:700;color:#1f2937;margin-bottom:6px;">
      ${t.title.replace(/</g,"&lt;")}
    </div>
    <p style="font-size:13px;color:#6b7280;margin-bottom:24px;line-height:1.6;">
      \u3053\u306E\u30DA\u30FC\u30B8\u306E\u64CD\u4F5C\u624B\u9806\u3092\u30AC\u30A4\u30C9\u3057\u307E\u3059\u3002<br>\u30C1\u30E5\u30FC\u30C8\u30EA\u30A2\u30EB\u3092\u958B\u59CB\u3057\u307E\u3059\u304B\uFF1F
    </p>
    <div style="display:flex;flex-direction:column;gap:10px;">
      <button id="tq-start-btn" style="
        background:#3b82f6;color:white;border:none;
        border-radius:10px;padding:12px;font-size:15px;
        font-weight:700;cursor:pointer;
      ">\u25B6 \u958B\u59CB\u3059\u308B</button>
      <button id="tq-skip-btn" style="
        background:transparent;color:#9ca3af;
        border:1.5px solid #e5e7eb;border-radius:10px;
        padding:10px;font-size:14px;cursor:pointer;
      ">\u30B9\u30AD\u30C3\u30D7</button>
    </div>
  `,n.appendChild(i),document.body.appendChild(n);let o=()=>n.remove();document.getElementById("tq-start-btn").onclick=()=>{o(),e()},document.getElementById("tq-skip-btn").onclick=o,n.addEventListener("click",r=>{r.target===n&&o()})}var D={async start(t){try{let e=await fetch(t);if(!e.ok)throw new Error(`Failed to fetch scenario: ${e.status}`);let n=await e.json();D.startWithScenario(n)}catch(e){console.error("[TetsuzukiQuest] Failed to load scenario:",e)}},startWithScenario(t){b&&b.destroy(),b=new L(t),b.start()},stop(){b&&(b.destroy(),b=null)}};window.addEventListener("message",t=>{var e,n,i,o;((e=t.data)==null?void 0:e.type)==="TETSUZUKI_QUEST_START"&&D.startWithScenario(t.data.scenario),((n=t.data)==null?void 0:n.type)==="TETSUZUKI_QUEST_STOP"&&D.stop(),((i=t.data)==null?void 0:i.type)==="TETSUZUKI_QUEST_PICK_START"&&ve(),((o=t.data)==null?void 0:o.type)==="TETSUZUKI_QUEST_PICK_CANCEL"&&ae()});function we(t){let e=()=>{b&&b.destroy(),b=new L(t),b.start()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>de(t,e),{once:!0}):de(t,e)}var{start:Ee,startWithScenario:ke,stop:Te}=D;return fe(Se);})();
