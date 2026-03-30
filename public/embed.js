"use strict";var TetsuzukiQuest=(()=>{var P=Object.defineProperty;var et=Object.getOwnPropertyDescriptor;var nt=Object.getOwnPropertyNames;var ot=Object.prototype.hasOwnProperty;var it=(e,t)=>{for(var n in t)P(e,n,{get:t[n],enumerable:!0})},rt=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of nt(t))!ot.call(e,o)&&o!==n&&P(e,o,{get:()=>t[o],enumerable:!(i=et(t,o))||i.enumerable});return e};var st=e=>rt(P({},"__esModule",{value:!0}),e);var ct={};it(ct,{default:()=>pt});var L="tq-bubble";function dt(e){return e==="happy"?"\u{1F60A}":e==="thinking"?"\u{1F914}":"\u{1F610}"}function j(e){return`
    <div style="
      width:56px;height:56px;border-radius:50%;
      background:linear-gradient(135deg,#3b82f6,#1d4ed8);
      display:flex;align-items:center;justify-content:center;
      font-size:28px;flex-shrink:0;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
    ">${dt(e)}</div>
  `}function h(e,t,n,i=!1){m();let o=document.createElement("div");o.id=L,o.style.cssText=`
    position:fixed;bottom:24px;left:24px;
    display:flex;align-items:flex-end;gap:12px;
    z-index:100000;max-width:420px;
    animation:tq-slide-in 0.3s ease;
  `;let r=document.createElement("div");r.style.cssText=`
    background:white;border-radius:16px 16px 16px 4px;
    padding:14px 16px;
    box-shadow:0 4px 20px rgba(0,0,0,0.15);
    flex:1;position:relative;
  `;let l=document.createElement("p");l.style.cssText=`
    margin:0 0 10px;font-size:14px;line-height:1.6;
    color:#1f2937;min-height:20px;
  `;let p=0,c=()=>{p<e.length&&(l.textContent+=e[p++],setTimeout(c,16))};if(c(),i)r.appendChild(l);else{let s=document.createElement("button");s.textContent="\u6B21\u3078 \u2192",s.style.cssText=`
      background:#3b82f6;color:white;border:none;
      padding:6px 16px;border-radius:8px;font-size:13px;
      cursor:pointer;font-weight:600;
      transition:background 0.15s;
    `,s.onmouseover=()=>{s.style.background="#2563eb"},s.onmouseout=()=>{s.style.background="#3b82f6"},s.onclick=()=>{m(),t()},r.appendChild(l),r.appendChild(s)}if(o.innerHTML=j(n),o.appendChild(r),document.body.appendChild(o),!document.getElementById("tq-styles")){let s=document.createElement("style");s.id="tq-styles",s.textContent=`
      @keyframes tq-slide-in {
        from { opacity:0; transform:translateY(20px); }
        to { opacity:1; transform:translateY(0); }
      }
      @keyframes tq-pulse-ring {
        0% { transform:scale(1); opacity:0.8; }
        100% { transform:scale(1.5); opacity:0; }
      }
    `,document.head.appendChild(s)}}function H(e,t,n){m();let i=document.createElement("div");i.id=L,i.style.cssText=`
    position:fixed;bottom:24px;left:24px;
    display:flex;align-items:flex-end;gap:12px;
    z-index:100000;max-width:420px;
    animation:tq-slide-in 0.3s ease;
  `;let o=document.createElement("div");o.style.cssText=`
    background:white;border-radius:16px 16px 16px 4px;
    padding:14px 16px;
    box-shadow:0 4px 20px rgba(0,0,0,0.15);
    flex:1;
  `;let r=document.createElement("p");r.style.cssText=`
    margin:0 0 12px;font-size:14px;line-height:1.6;color:#1f2937;font-weight:600;
  `;let l=0,p=()=>{l<e.length&&(r.textContent+=e[l++],setTimeout(p,16))};p();let c=document.createElement("div");c.style.cssText="display:flex;gap:8px;";let s=document.createElement("button");s.textContent="\u306F\u3044 \u2713",s.style.cssText=`
    background:#22c55e;color:white;border:none;
    padding:6px 18px;border-radius:8px;font-size:13px;
    cursor:pointer;font-weight:600;flex:1;
    transition:background 0.15s;
  `,s.onclick=()=>{m(),t()};let d=document.createElement("button");d.textContent="\u3044\u3044\u3048 \u2717",d.style.cssText=`
    background:#ef4444;color:white;border:none;
    padding:6px 18px;border-radius:8px;font-size:13px;
    cursor:pointer;font-weight:600;flex:1;
    transition:background 0.15s;
  `,d.onclick=()=>{m(),n()},c.appendChild(s),c.appendChild(d),o.appendChild(r),o.appendChild(c),i.innerHTML=j("thinking"),i.appendChild(o),document.body.appendChild(i)}function m(){var e;(e=document.getElementById(L))==null||e.remove()}var M="tq-overlay",V="tq-ring";function C(){f();let e=document.createElement("div");e.id=M,e.style.cssText=`
    position:fixed;inset:0;
    background:rgba(0,0,0,0.75);
    z-index:99998;
    pointer-events:all;
  `,document.body.appendChild(e)}function U(e,t){f();let n=document.querySelector(e);if(!n){C();return}let i=n.getBoundingClientRect(),o=8,r=i.left-o,l=i.top-o,p=i.right+o,c=i.bottom+o,s=document.createElement("div");s.id=M,s.style.cssText=`
    position:fixed;inset:0;
    background:rgba(0,0,0,0.75);
    z-index:99998;
    pointer-events:all;
    clip-path: polygon(
      evenodd,
      0% 0%, 100% 0%, 100% 100%, 0% 100%,
      ${r}px ${l}px, ${r}px ${c}px, ${p}px ${c}px, ${p}px ${l}px
    );
  `,s.style.clipPath="",s.style.background="transparent";let d="http://www.w3.org/2000/svg",a=document.createElementNS(d,"svg");a.setAttribute("width","100%"),a.setAttribute("height","100%"),a.style.cssText="position:absolute;inset:0;width:100%;height:100%;";let E=document.createElementNS(d,"defs"),b=document.createElementNS(d,"mask");b.id="tq-spotlight-mask";let g=document.createElementNS(d,"rect");g.setAttribute("x","0"),g.setAttribute("y","0"),g.setAttribute("width","100%"),g.setAttribute("height","100%"),g.setAttribute("fill","white");let u=document.createElementNS(d,"rect");u.setAttribute("x",String(r)),u.setAttribute("y",String(l)),u.setAttribute("width",String(p-r)),u.setAttribute("height",String(c-l)),u.setAttribute("rx","4"),u.setAttribute("fill","black"),b.appendChild(g),b.appendChild(u),E.appendChild(b),a.appendChild(E);let x=document.createElementNS(d,"rect");x.setAttribute("x","0"),x.setAttribute("y","0"),x.setAttribute("width","100%"),x.setAttribute("height","100%"),x.setAttribute("fill","rgba(0,0,0,0.75)"),x.setAttribute("mask","url(#tq-spotlight-mask)"),a.appendChild(x),s.appendChild(a),document.body.appendChild(s);let k=document.createElement("div");k.id=V,k.style.cssText=`
    position:fixed;
    left:${r}px;top:${l}px;
    width:${p-r}px;height:${c-l}px;
    border:3px solid #fbbf24;border-radius:6px;
    z-index:99999;pointer-events:none;
    animation:tq-pulse-ring 1.2s ease-out infinite;
  `,document.body.appendChild(k);let q=n.style.pointerEvents,$=n.style.position,J=n.style.zIndex;n.style.pointerEvents="auto",n.style.position=n.style.position||"relative",n.style.zIndex="99999";let tt=()=>{n.style.pointerEvents=q,n.style.position=$,n.style.zIndex=J,f(),t()};n.addEventListener("click",tt,{once:!0})}function f(){var e,t;(e=document.getElementById(M))==null||e.remove(),(t=document.getElementById(V))==null||t.remove()}var Y="tq-input-overlay";function Q(e,t){S();let n=document.getElementById(e.targetId);if(!n){h(e.message,t);return}let i=n.getBoundingClientRect(),o=12,r=i.left-o,l=i.top-o,p=i.right+o,c=i.bottom+o,s=document.createElement("div");s.id=Y,s.style.cssText=`
    position:fixed;inset:0;
    background:transparent;
    z-index:99998;
    pointer-events:all;
  `;let d="http://www.w3.org/2000/svg",a=document.createElementNS(d,"svg");a.setAttribute("width","100%"),a.setAttribute("height","100%"),a.style.cssText="position:absolute;inset:0;width:100%;height:100%;";let E=document.createElementNS(d,"defs"),b=document.createElementNS(d,"mask");b.id="tq-input-mask";let g=document.createElementNS(d,"rect");g.setAttribute("x","0"),g.setAttribute("y","0"),g.setAttribute("width","100%"),g.setAttribute("height","100%"),g.setAttribute("fill","white");let u=document.createElementNS(d,"rect");u.setAttribute("x",String(r)),u.setAttribute("y",String(l)),u.setAttribute("width",String(p-r)),u.setAttribute("height",String(c-l)),u.setAttribute("rx","4"),u.setAttribute("fill","black"),b.appendChild(g),b.appendChild(u),E.appendChild(b),a.appendChild(E);let x=document.createElementNS(d,"rect");x.setAttribute("x","0"),x.setAttribute("y","0"),x.setAttribute("width","100%"),x.setAttribute("height","100%"),x.setAttribute("fill","rgba(0,0,0,0.75)"),x.setAttribute("mask","url(#tq-input-mask)"),a.appendChild(x),s.appendChild(a),document.body.appendChild(s);let k=n.style.pointerEvents,q=n.style.zIndex;n.style.pointerEvents="auto",n.style.zIndex="99999",n.style.position=n.style.position||"relative",n.focus(),h(e.message,()=>{},void 0,!0);let $=()=>{if(!n.value.trim()){m(),h("\u5165\u529B\u3057\u3066\u304B\u3089\u6B21\u3078\u9032\u3093\u3067\u304F\u3060\u3055\u3044\u3002",()=>{},"thinking",!0),n.focus();return}n.style.pointerEvents=k,n.style.zIndex=q,S(),m(),t()};n.addEventListener("blur",$,{once:!0})}function S(){var e;(e=document.getElementById(Y))==null||e.remove()}var T="tq-doc-preview-btn",N="tq-doc-modal";function lt(e,t){if(e==="custom"&&t)return`<img src="${t}" alt="\u66F8\u985E\u306E\u898B\u672C" style="max-width:100%;border-radius:8px;">`;let n={"mynumber-card":`
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
    `};return n[e]??n["mynumber-card"]}function W(e,t){let n=document.getElementById(e.targetId),i=document.querySelector(`.${T}`);if(i==null||i.remove(),n){let o=document.createElement("button");o.className=T,o.textContent=`\u{1F50D} ${e.buttonLabel??"\u898B\u672C\u3092\u78BA\u8A8D"}`,o.style.cssText=`
      display:inline-block;margin-top:6px;margin-left:8px;
      background:transparent;border:1.5px solid #0d9488;
      color:#0d9488;padding:4px 12px;border-radius:6px;
      font-size:13px;cursor:pointer;font-weight:600;
      transition:all 0.15s;
    `,o.onmouseover=()=>{o.style.background="#0d9488",o.style.color="white"},o.onmouseout=()=>{o.style.background="transparent",o.style.color="#0d9488"},o.onclick=()=>at(e),n.insertAdjacentElement("afterend",o)}h(e.message,()=>{var o;(o=document.querySelector(`.${T}`))==null||o.remove(),t()})}function at(e){var l;(l=document.getElementById(N))==null||l.remove();let t=document.createElement("div");t.id=N,t.style.cssText=`
    position:fixed;inset:0;background:rgba(0,0,0,0.6);
    z-index:200000;display:flex;align-items:center;justify-content:center;
    animation:tq-slide-in 0.2s ease;
  `;let n=document.createElement("div");n.style.cssText=`
    background:white;border-radius:16px;padding:24px;
    max-width:480px;width:90%;
    box-shadow:0 20px 60px rgba(0,0,0,0.3);
  `;let i=document.createElement("h3");i.textContent="\u66F8\u985E\u306E\u898B\u672C",i.style.cssText="margin:0 0 16px;font-size:16px;font-weight:700;color:#1f2937;";let o=document.createElement("div");o.style.cssText="display:flex;justify-content:center;margin-bottom:20px;",o.innerHTML=lt(e.documentType,e.previewImageUrl);let r=document.createElement("button");r.textContent="\u9589\u3058\u308B",r.style.cssText=`
    width:100%;background:#f3f4f6;border:none;
    padding:10px;border-radius:8px;font-size:14px;
    cursor:pointer;font-weight:600;color:#374151;
    transition:background 0.15s;
  `,r.onmouseover=()=>{r.style.background="#e5e7eb"},r.onmouseout=()=>{r.style.background="#f3f4f6"},r.onclick=()=>t.remove(),t.onclick=p=>{p.target===t&&t.remove()},n.appendChild(i),n.appendChild(o),n.appendChild(r),t.appendChild(n),document.body.appendChild(t)}function O(){var e,t;(e=document.getElementById(N))==null||e.remove(),(t=document.querySelector(`.${T}`))==null||t.remove()}var R="tq-validation-tooltip";function Z(e,t){let n=document.querySelector(e.targetSelector);if(!n){h(e.message,t);return}h(e.message,()=>{},void 0,!0);let i=new RegExp(e.validationPattern),o=n.style.outline,r=n.style.boxShadow,l=()=>{document.querySelectorAll(`.${R}`).forEach(d=>d.remove())},p=()=>{l();let d=document.createElement("div");d.className=R,d.textContent=e.errorMessage,d.style.cssText=`
      position:absolute;
      background:white;color:#ef4444;
      border:1.5px solid #ef4444;border-radius:6px;
      padding:6px 10px;font-size:12px;font-weight:600;
      white-space:nowrap;
      box-shadow:0 2px 8px rgba(239,68,68,0.2);
      z-index:100001;
    `;let a=n.getBoundingClientRect();d.style.left=`${a.right+8+window.scrollX}px`,d.style.top=`${a.top+window.scrollY-2}px`,d.style.position="fixed",d.style.left=`${a.right+8}px`,d.style.top=`${a.top}px`,document.body.appendChild(d)},c=!1,s=()=>{let d=n.value;l(),i.test(d)?(n.style.outline="2px solid #22c55e",n.style.boxShadow="0 0 0 3px rgba(34,197,94,0.2)",m(),c=!0,n.removeEventListener("blur",s),t()):(n.style.outline="2px solid #ef4444",n.style.boxShadow="0 0 0 3px rgba(239,68,68,0.4)",p(),n.addEventListener("blur",s,{once:!0}))};n.addEventListener("blur",s,{once:!0})}function D(){document.querySelectorAll(`.${R}`).forEach(e=>e.remove())}var F="tq-progress-bar",B=null,w=null,y=null,_="steps";function K(e,t){I(),_=(t==null?void 0:t.format)??"steps";let n=document.createElement("div");n.id=F,n.style.cssText=`
    position:fixed;top:0;left:0;width:100%;height:48px;
    background:white;border-bottom:1px solid #e5e7eb;
    z-index:99997;display:flex;align-items:center;
    padding:0 16px;gap:12px;
    box-shadow:0 1px 4px rgba(0,0,0,0.05);
  `;let i=document.createElement("div");i.style.cssText=`
    font-size:13px;font-weight:600;color:#374151;white-space:nowrap;min-width:80px;
  `,i.textContent="0 / "+e;let o=document.createElement("div");o.style.cssText=`
    flex:1;height:8px;background:#f3f4f6;border-radius:9999px;overflow:hidden;
  `;let r=document.createElement("div");r.style.cssText=`
    height:100%;width:0%;background:#f97316;border-radius:9999px;
    transition:width 0.4s ease;
  `,o.appendChild(r),n.appendChild(i),n.appendChild(o),document.body.prepend(n),B=n,w=r,y=i}function G(e,t){if(!w||!y)return;let n=Math.min(100,Math.round(e/t*100));w.style.width=n+"%",_==="percent"?y.textContent=n+"%":y.textContent=`${e} / ${t}`}function X(e){!w||!y||(w.style.width="100%",_==="percent"?y.textContent="100%":y.textContent=`${e} / ${e}`,setTimeout(()=>{B&&(B.style.transition="opacity 0.4s ease",B.style.opacity="0",setTimeout(I,400))},800))}function I(){var e;(e=document.getElementById(F))==null||e.remove(),B=null,w=null,y=null}var A=class{scenario;currentBlockId;currentStep;totalSteps;constructor(t){this.scenario=t,this.currentBlockId=null,this.currentStep=0,this.totalSteps=t.totalSteps??t.blocks.length}start(){this.currentBlockId=this.scenario.startBlockId,this.currentStep=0,K(this.totalSteps),this.currentBlockId&&this.renderCurrentBlock()}next(t){if(!t){this.finish();return}this.currentBlockId=t,this.renderCurrentBlock()}renderCurrentBlock(){if(!this.currentBlockId)return;let t=this.scenario.blocks.find(n=>n.id===this.currentBlockId);if(!t){this.finish();return}this.currentStep++,G(this.currentStep,this.totalSteps),this.render(t)}render(t){switch(t.type){case"speech":C(),h(t.message,()=>this.next(t.nextId),t.characterMood);break;case"spotlight":U(t.targetSelector,()=>{m(),this.next(t.nextId)}),h(t.message,()=>{},void 0,!0);break;case"input-spotlight":Q(t,()=>this.next(t.nextId));break;case"document-preview":f(),W(t,()=>this.next(t.nextId));break;case"validation":f(),Z(t,()=>this.next(t.nextId));break;case"branch":C(),H(t.question,()=>this.next(t.yesNextId),()=>this.next(t.noNextId));break}}finish(){X(this.totalSteps),m(),f(),S(),O(),D();let t=document.createElement("div");t.style.cssText=`
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
    `,document.body.appendChild(t)}destroy(){m(),f(),S(),O(),D(),I(),document.querySelectorAll('[style*="z-index:100001"]').forEach(t=>t.remove())}};var v=null,z={async start(e){try{let t=await fetch(e);if(!t.ok)throw new Error(`Failed to fetch scenario: ${t.status}`);let n=await t.json();z.startWithScenario(n)}catch(t){console.error("[TetsuzukiQuest] Failed to load scenario:",t)}},startWithScenario(e){v&&v.destroy(),v=new A(e),v.start()},stop(){v&&(v.destroy(),v=null)}};window.addEventListener("message",e=>{var t,n;((t=e.data)==null?void 0:t.type)==="TETSUZUKI_QUEST_START"&&z.startWithScenario(e.data.scenario),((n=e.data)==null?void 0:n.type)==="TETSUZUKI_QUEST_STOP"&&z.stop()});var pt=z;return st(ct);})();
