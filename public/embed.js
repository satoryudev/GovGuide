"use strict";var TetsuzukiQuest=(()=>{var L=Object.defineProperty;var ot=Object.getOwnPropertyDescriptor;var it=Object.getOwnPropertyNames;var rt=Object.prototype.hasOwnProperty;var st=(e,t)=>{for(var n in t)L(e,n,{get:t[n],enumerable:!0})},dt=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of it(t))!rt.call(e,o)&&o!==n&&L(e,o,{get:()=>t[o],enumerable:!(r=ot(t,o))||r.enumerable});return e};var at=e=>dt(L({},"__esModule",{value:!0}),e);var gt={};st(gt,{default:()=>mt});var k=0,T=0;function U(e){k=0,T=e}function j(e,t){k=e,T=t}function H(e){k=e}function V(){k=0,T=0}function q(){return{current:k,total:T}}var _="tq-bubble";function lt(e){return e==="happy"?"\u{1F60A}":e==="thinking"?"\u{1F914}":"\u{1F610}"}function K(e){return`
    <div style="
      width:56px;height:56px;border-radius:50%;
      background:linear-gradient(135deg,#3b82f6,#1d4ed8);
      display:flex;align-items:center;justify-content:center;
      font-size:28px;flex-shrink:0;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
    ">${lt(e)}</div>
  `}function Y(e,t){let n=t>0?Math.min(100,Math.round(e/t*100)):0,r=document.createElement("div");r.style.cssText="display:flex;align-items:center;gap:8px;margin-bottom:10px;";let o=document.createElement("div");o.style.cssText=`
    flex:1;height:4px;background:#f3f4f6;border-radius:9999px;overflow:hidden;
  `;let i=document.createElement("div");i.style.cssText=`
    height:100%;width:${n}%;background:#f97316;border-radius:9999px;
    transition:width 0.4s ease;
  `;let s=document.createElement("span");return s.style.cssText="font-size:11px;color:#9ca3af;white-space:nowrap;flex-shrink:0;",s.textContent=`${e} / ${t}`,o.appendChild(i),r.appendChild(o),r.appendChild(s),r}function h(e,t,n,r=!1){m();let{current:o,total:i}=q(),s=document.createElement("div");s.id=_,s.style.cssText=`
    position:fixed;bottom:24px;left:24px;
    display:flex;align-items:flex-end;gap:12px;
    z-index:100000;max-width:420px;
    animation:tq-slide-in 0.3s ease;
  `;let l=document.createElement("div");l.style.cssText=`
    background:white;border-radius:16px 16px 16px 4px;
    padding:14px 16px;
    box-shadow:0 4px 20px rgba(0,0,0,0.15);
    flex:1;position:relative;
  `,i>0&&l.appendChild(Y(o,i));let p=document.createElement("p");p.style.cssText=`
    margin:0 0 10px;font-size:14px;line-height:1.6;
    color:#1f2937;min-height:20px;
  `;let c=0,a=()=>{c<e.length&&(p.textContent+=e[c++],setTimeout(a,16))};if(a(),r)l.appendChild(p);else{let d=document.createElement("button");d.textContent="\u6B21\u3078 \u2192",d.style.cssText=`
      background:#3b82f6;color:white;border:none;
      padding:6px 16px;border-radius:8px;font-size:13px;
      cursor:pointer;font-weight:600;
      transition:background 0.15s;
    `,d.onmouseover=()=>{d.style.background="#2563eb"},d.onmouseout=()=>{d.style.background="#3b82f6"},d.onclick=()=>{m(),t()},l.appendChild(p),l.appendChild(d)}if(s.innerHTML=K(n),s.appendChild(l),document.body.appendChild(s),!document.getElementById("tq-styles")){let d=document.createElement("style");d.id="tq-styles",d.textContent=`
      @keyframes tq-slide-in {
        from { opacity:0; transform:translateY(20px); }
        to { opacity:1; transform:translateY(0); }
      }
      @keyframes tq-pulse-ring {
        0% { transform:scale(1); opacity:0.8; }
        100% { transform:scale(1.5); opacity:0; }
      }
    `,document.head.appendChild(d)}}function Q(e,t,n){m();let{current:r,total:o}=q(),i=document.createElement("div");i.id=_,i.style.cssText=`
    position:fixed;bottom:24px;left:24px;
    display:flex;align-items:flex-end;gap:12px;
    z-index:100000;max-width:420px;
    animation:tq-slide-in 0.3s ease;
  `;let s=document.createElement("div");s.style.cssText=`
    background:white;border-radius:16px 16px 16px 4px;
    padding:14px 16px;
    box-shadow:0 4px 20px rgba(0,0,0,0.15);
    flex:1;
  `,o>0&&s.appendChild(Y(r,o));let l=document.createElement("p");l.style.cssText=`
    margin:0 0 12px;font-size:14px;line-height:1.6;color:#1f2937;font-weight:600;
  `;let p=0,c=()=>{p<e.length&&(l.textContent+=e[p++],setTimeout(c,16))};c();let a=document.createElement("div");a.style.cssText="display:flex;gap:8px;";let d=document.createElement("button");d.textContent="\u306F\u3044 \u2713",d.style.cssText=`
    background:#22c55e;color:white;border:none;
    padding:6px 18px;border-radius:8px;font-size:13px;
    cursor:pointer;font-weight:600;flex:1;
    transition:background 0.15s;
  `,d.onclick=()=>{m(),t()};let b=document.createElement("button");b.textContent="\u3044\u3044\u3048 \u2717",b.style.cssText=`
    background:#ef4444;color:white;border:none;
    padding:6px 18px;border-radius:8px;font-size:13px;
    cursor:pointer;font-weight:600;flex:1;
    transition:background 0.15s;
  `,b.onclick=()=>{m(),n()},a.appendChild(d),a.appendChild(b),s.appendChild(l),s.appendChild(a),i.innerHTML=K("thinking"),i.appendChild(s),document.body.appendChild(i)}function m(){var e;(e=document.getElementById(_))==null||e.remove()}var N="tq-overlay",Z="tq-ring";function B(){y();let e=document.createElement("div");e.id=N,e.style.cssText=`
    position:fixed;inset:0;
    background:rgba(0,0,0,0.75);
    z-index:99998;
    pointer-events:all;
  `,document.body.appendChild(e)}function W(e,t){y();let n=document.querySelector(e);if(!n){B();return}let r=n.getBoundingClientRect(),o=8,i=r.left-o,s=r.top-o,l=r.right+o,p=r.bottom+o,c=document.createElement("div");c.id=N,c.style.cssText=`
    position:fixed;inset:0;
    background:rgba(0,0,0,0.75);
    z-index:99998;
    pointer-events:all;
    clip-path: polygon(
      evenodd,
      0% 0%, 100% 0%, 100% 100%, 0% 100%,
      ${i}px ${s}px, ${i}px ${p}px, ${l}px ${p}px, ${l}px ${s}px
    );
  `,c.style.clipPath="",c.style.background="transparent";let a="http://www.w3.org/2000/svg",d=document.createElementNS(a,"svg");d.setAttribute("width","100%"),d.setAttribute("height","100%"),d.style.cssText="position:absolute;inset:0;width:100%;height:100%;";let b=document.createElementNS(a,"defs"),f=document.createElementNS(a,"mask");f.id="tq-spotlight-mask";let g=document.createElementNS(a,"rect");g.setAttribute("x","0"),g.setAttribute("y","0"),g.setAttribute("width","100%"),g.setAttribute("height","100%"),g.setAttribute("fill","white");let x=document.createElementNS(a,"rect");x.setAttribute("x",String(i)),x.setAttribute("y",String(s)),x.setAttribute("width",String(l-i)),x.setAttribute("height",String(p-s)),x.setAttribute("rx","4"),x.setAttribute("fill","black"),f.appendChild(g),f.appendChild(x),b.appendChild(f),d.appendChild(b);let u=document.createElementNS(a,"rect");u.setAttribute("x","0"),u.setAttribute("y","0"),u.setAttribute("width","100%"),u.setAttribute("height","100%"),u.setAttribute("fill","rgba(0,0,0,0.75)"),u.setAttribute("mask","url(#tq-spotlight-mask)"),d.appendChild(u),c.appendChild(d),document.body.appendChild(c);let E=document.createElement("div");E.id=Z,E.style.cssText=`
    position:fixed;
    left:${i}px;top:${s}px;
    width:${l-i}px;height:${p-s}px;
    border:3px solid #fbbf24;border-radius:6px;
    z-index:99999;pointer-events:none;
    animation:tq-pulse-ring 1.2s ease-out infinite;
  `,document.body.appendChild(E);let P=n.style.pointerEvents,C=n.style.position,et=n.style.zIndex;n.style.pointerEvents="auto",n.style.position=n.style.position||"relative",n.style.zIndex="99999";let nt=()=>{n.style.pointerEvents=P,n.style.position=C,n.style.zIndex=et,y(),t()};n.addEventListener("click",nt,{once:!0})}function y(){var e,t;(e=document.getElementById(N))==null||e.remove(),(t=document.getElementById(Z))==null||t.remove()}var F="tq-input-overlay";function X(e,t){S();let n=document.getElementById(e.targetId);if(!n){h(e.message,t);return}let r=n.getBoundingClientRect(),o=12,i=r.left-o,s=r.top-o,l=r.right+o,p=r.bottom+o,c=document.createElement("div");c.id=F,c.style.cssText=`
    position:fixed;inset:0;
    background:transparent;
    z-index:99998;
    pointer-events:none;
  `;let a="http://www.w3.org/2000/svg",d=document.createElementNS(a,"svg");d.setAttribute("width","100%"),d.setAttribute("height","100%"),d.style.cssText="position:absolute;inset:0;width:100%;height:100%;";let b=document.createElementNS(a,"defs"),f=document.createElementNS(a,"mask");f.id="tq-input-mask";let g=document.createElementNS(a,"rect");g.setAttribute("x","0"),g.setAttribute("y","0"),g.setAttribute("width","100%"),g.setAttribute("height","100%"),g.setAttribute("fill","white");let x=document.createElementNS(a,"rect");x.setAttribute("x",String(i)),x.setAttribute("y",String(s)),x.setAttribute("width",String(l-i)),x.setAttribute("height",String(p-s)),x.setAttribute("rx","4"),x.setAttribute("fill","black"),f.appendChild(g),f.appendChild(x),b.appendChild(f),d.appendChild(b);let u=document.createElementNS(a,"rect");u.setAttribute("x","0"),u.setAttribute("y","0"),u.setAttribute("width","100%"),u.setAttribute("height","100%"),u.setAttribute("fill","rgba(0,0,0,0.75)"),u.setAttribute("mask","url(#tq-input-mask)"),u.style.pointerEvents="none",d.appendChild(u),c.appendChild(d),document.body.appendChild(c);let E=n.style.pointerEvents,P=n.style.zIndex;n.style.pointerEvents="auto",n.style.zIndex="99999",n.style.position=n.style.position||"relative",n.focus(),h(e.message,()=>{},void 0,!0);let C=()=>{if(!n.value.trim()){m(),h("\u5165\u529B\u3057\u3066\u304B\u3089\u6B21\u3078\u9032\u3093\u3067\u304F\u3060\u3055\u3044\u3002",()=>{},"thinking",!0),n.focus(),n.addEventListener("blur",C,{once:!0});return}n.style.pointerEvents=E,n.style.zIndex=P,S(),m(),t()};n.addEventListener("blur",C,{once:!0})}function S(){var e;(e=document.getElementById(F))==null||e.remove()}var I="tq-doc-preview-btn",M="tq-doc-modal";function ct(e,t){if(e==="custom"&&t)return`<img src="${t}" alt="\u66F8\u985E\u306E\u898B\u672C" style="max-width:100%;border-radius:8px;">`;if(e.startsWith("cdoc-")){try{let o=JSON.parse(localStorage.getItem("tq_custom_doc_types")??"[]").find(i=>i.id===e);if(o)return`<img src="${o.imageBase64}" alt="${o.label}" style="max-width:100%;border-radius:8px;">`}catch{}return'<p style="color:#6b7280;text-align:center;">\u753B\u50CF\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093</p>'}let n={"mynumber-card":`
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
    `};return n[e]??n["mynumber-card"]}function G(e,t){let n=document.getElementById(e.targetId),r=document.querySelector(`.${I}`);if(r==null||r.remove(),n){let o=document.createElement("button");o.className=I,o.textContent=`\u{1F50D} ${e.buttonLabel??"\u898B\u672C\u3092\u78BA\u8A8D"}`,o.style.cssText=`
      display:inline-block;margin-top:6px;margin-left:8px;
      background:transparent;border:1.5px solid #0d9488;
      color:#0d9488;padding:4px 12px;border-radius:6px;
      font-size:13px;cursor:pointer;font-weight:600;
      transition:all 0.15s;
    `,o.onmouseover=()=>{o.style.background="#0d9488",o.style.color="white"},o.onmouseout=()=>{o.style.background="transparent",o.style.color="#0d9488"},o.onclick=()=>pt(e),n.insertAdjacentElement("afterend",o)}h(e.message,()=>{var o;(o=document.querySelector(`.${I}`))==null||o.remove(),t()})}function pt(e){var s;(s=document.getElementById(M))==null||s.remove();let t=document.createElement("div");t.id=M,t.style.cssText=`
    position:fixed;inset:0;background:rgba(0,0,0,0.6);
    z-index:200000;display:flex;align-items:center;justify-content:center;
    animation:tq-slide-in 0.2s ease;
  `;let n=document.createElement("div");n.style.cssText=`
    background:white;border-radius:16px;padding:24px;
    max-width:480px;width:90%;
    box-shadow:0 20px 60px rgba(0,0,0,0.3);
  `;let r=document.createElement("h3");r.textContent="\u66F8\u985E\u306E\u898B\u672C",r.style.cssText="margin:0 0 16px;font-size:16px;font-weight:700;color:#1f2937;";let o=document.createElement("div");o.style.cssText="display:flex;justify-content:center;margin-bottom:20px;",o.innerHTML=ct(e.documentType,e.previewImageUrl);let i=document.createElement("button");i.textContent="\u9589\u3058\u308B",i.style.cssText=`
    width:100%;background:#f3f4f6;border:none;
    padding:10px;border-radius:8px;font-size:14px;
    cursor:pointer;font-weight:600;color:#374151;
    transition:background 0.15s;
  `,i.onmouseover=()=>{i.style.background="#e5e7eb"},i.onmouseout=()=>{i.style.background="#f3f4f6"},i.onclick=()=>t.remove(),t.onclick=l=>{l.target===t&&t.remove()},n.appendChild(r),n.appendChild(o),n.appendChild(i),t.appendChild(n),document.body.appendChild(t)}function D(){var e,t;(e=document.getElementById(M))==null||e.remove(),(t=document.querySelector(`.${I}`))==null||t.remove()}var O="tq-validation-tooltip";function J(e,t){let n=document.querySelector(e.targetSelector);if(!n){h(e.message,t);return}h(e.message,()=>{},void 0,!0);let r=new RegExp(e.validationPattern),o=n.style.outline,i=n.style.boxShadow,s=()=>{document.querySelectorAll(`.${O}`).forEach(a=>a.remove())},l=()=>{s();let a=document.createElement("div");a.className=O,a.textContent=e.errorMessage,a.style.cssText=`
      position:absolute;
      background:white;color:#ef4444;
      border:1.5px solid #ef4444;border-radius:6px;
      padding:6px 10px;font-size:12px;font-weight:600;
      white-space:nowrap;
      box-shadow:0 2px 8px rgba(239,68,68,0.2);
      z-index:100001;
    `;let d=n.getBoundingClientRect();a.style.left=`${d.right+8+window.scrollX}px`,a.style.top=`${d.top+window.scrollY-2}px`,a.style.position="fixed",a.style.left=`${d.right+8}px`,a.style.top=`${d.top}px`,document.body.appendChild(a)},p=!1,c=()=>{let a=n.value;s(),r.test(a)?(n.style.outline="2px solid #22c55e",n.style.boxShadow="0 0 0 3px rgba(34,197,94,0.2)",m(),p=!0,n.removeEventListener("blur",c),t()):(n.style.outline="2px solid #ef4444",n.style.boxShadow="0 0 0 3px rgba(239,68,68,0.4)",l(),n.addEventListener("blur",c,{once:!0}))};n.addEventListener("blur",c,{once:!0})}function R(){document.querySelectorAll(`.${O}`).forEach(e=>e.remove())}var A=class{scenario;currentBlockId;currentStep;totalSteps;constructor(t){this.scenario=t,this.currentBlockId=null,this.currentStep=0,this.totalSteps=t.totalSteps??t.blocks.filter(n=>n.type!=="start"&&n.type!=="end").length}start(){this.currentBlockId=this.scenario.startBlockId,this.currentStep=0,U(this.totalSteps),this.currentBlockId&&this.renderCurrentBlock()}next(t){if(!t){this.finish();return}this.currentBlockId=t,this.renderCurrentBlock()}renderCurrentBlock(){if(!this.currentBlockId)return;let t=this.scenario.blocks.find(n=>n.id===this.currentBlockId);if(!t){this.finish();return}this.currentStep++,j(this.currentStep,this.totalSteps),this.render(t)}render(t){switch(t.type){case"start":this.currentStep--,this.next(t.nextId);break;case"end":this.finish();break;case"speech":B(),h(t.message,()=>this.next(t.nextId),t.characterMood);break;case"spotlight":W(t.targetSelector,()=>{m(),this.next(t.nextId)}),h(t.message,()=>{},void 0,!0);break;case"input-spotlight":y(),X(t,()=>this.next(t.nextId));break;case"document-preview":y(),G(t,()=>this.next(t.nextId));break;case"validation":y(),J(t,()=>this.next(t.nextId));break;case"branch":B(),Q(t.question,()=>this.next(t.yesNextId),()=>this.next(t.noNextId));break}}finish(){H(this.totalSteps),m(),y(),S(),D(),R();let t=document.createElement("div");t.style.cssText=`
      position:fixed;inset:0;background:rgba(0,0,0,0.7);
      z-index:100001;display:flex;align-items:center;justify-content:center;
      animation:tq-slide-in 0.3s ease;
    `,t.innerHTML=`
      <div style="
        background:white;border-radius:20px;padding:40px;text-align:center;
        max-width:360px;box-shadow:0 20px 60px rgba(0,0,0,0.3);
      ">
        <div style="font-size:56px;margin-bottom:16px;">\u{1F389}</div>
        <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#1f2937;">\u30C1\u30E5\u30FC\u30C8\u30EA\u30A2\u30EB\u5B8C\u4E86\uFF01</h2>
        <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">\u624B\u7D9A\u304D\u306E\u6D41\u308C\u3092\u78BA\u8A8D\u3067\u304D\u307E\u3057\u305F\u3002</p>
        <button onclick="this.closest('div[style]').remove()" style="
          background:#3b82f6;color:white;border:none;
          padding:10px 32px;border-radius:10px;font-size:14px;
          cursor:pointer;font-weight:600;
        ">\u9589\u3058\u308B</button>
      </div>
    `,document.body.appendChild(t)}destroy(){m(),y(),S(),D(),R(),V(),document.querySelectorAll('[style*="z-index:100001"]').forEach(t=>t.remove())}};var v=null,ut="tq-pick-highlight";function z(e){if(e.id)return`#${e.id}`;let t=e.tagName.toLowerCase(),n=e.parentElement;if(!n)return t;let r=Array.from(n.children).filter(i=>i.tagName===e.tagName);if(r.length===1)return`${z(n)} > ${t}`;let o=r.indexOf(e)+1;return`${z(n)} > ${t}:nth-of-type(${o})`}var w=null;function xt(){w&&w();let e=document.createElement("div");e.id=ut,e.style.cssText=`
    position:fixed;pointer-events:none;z-index:999999;
    border:2px solid #f59e0b;border-radius:4px;
    background:rgba(245,158,11,0.15);transition:all 0.05s;
    display:none;
  `,document.body.appendChild(e);let t=document.createElement("div");t.style.cssText=`
    position:fixed;z-index:1000000;pointer-events:none;
    background:#1f2937;color:white;font-size:11px;font-family:monospace;
    padding:3px 8px;border-radius:4px;white-space:nowrap;display:none;
  `,document.body.appendChild(t);let n=o=>{let i=document.elementFromPoint(o.clientX,o.clientY);if(!i||i===e||i===t)return;let s=i.getBoundingClientRect();e.style.display="block",e.style.left=`${s.left-2}px`,e.style.top=`${s.top-2}px`,e.style.width=`${s.width+4}px`,e.style.height=`${s.height+4}px`;let l=z(i),p=i.id??"";t.textContent=p?`#${p}  (${i.tagName.toLowerCase()})`:l,t.style.display="block",t.style.left=`${Math.min(o.clientX+12,window.innerWidth-200)}px`,t.style.top=`${o.clientY+16}px`},r=o=>{o.preventDefault(),o.stopPropagation();let i=document.elementFromPoint(o.clientX,o.clientY);if(!i||i===e||i===t)return;let s=z(i),l=i.id??"";window.parent.postMessage({type:"TETSUZUKI_QUEST_ELEMENT_PICKED",selector:s,id:l},"*"),tt()};document.addEventListener("mousemove",n,!0),document.addEventListener("click",r,!0),document.body.style.cursor="crosshair",w=()=>{document.removeEventListener("mousemove",n,!0),document.removeEventListener("click",r,!0),document.body.style.cursor="",e.remove(),t.remove(),w=null}}function tt(){w&&w()}var $={async start(e){try{let t=await fetch(e);if(!t.ok)throw new Error(`Failed to fetch scenario: ${t.status}`);let n=await t.json();$.startWithScenario(n)}catch(t){console.error("[TetsuzukiQuest] Failed to load scenario:",t)}},startWithScenario(e){v&&v.destroy(),v=new A(e),v.start()},stop(){v&&(v.destroy(),v=null)}};window.addEventListener("message",e=>{var t,n,r,o;((t=e.data)==null?void 0:t.type)==="TETSUZUKI_QUEST_START"&&$.startWithScenario(e.data.scenario),((n=e.data)==null?void 0:n.type)==="TETSUZUKI_QUEST_STOP"&&$.stop(),((r=e.data)==null?void 0:r.type)==="TETSUZUKI_QUEST_PICK_START"&&xt(),((o=e.data)==null?void 0:o.type)==="TETSUZUKI_QUEST_PICK_CANCEL"&&tt()});var mt=$;return at(gt);})();
