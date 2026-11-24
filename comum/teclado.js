/* @comum:teclado v1.1 — iPhone/iPad: não redesenhar o ecrã enquanto se escreve. Quando se passa de uma caixa de texto para outra, a mudança da primeira dispara «change»; se a app redesenhar nesse momento, o teclado fecha e reabre e o ecrã salta. O redesenho fica pendente e faz-se quando o foco sai das caixas. v1.1: mantém à vista a caixa onde se escreve quando o teclado abre; se a app usa o motor morph (window.KBD_MORPH), redesenha logo, sem destruir a caixa com o foco; se o morph não puder (estrutura mudou à volta da caixa), marca window.KBD_PEND e redesenha à saída. Regra: docs/regras/README.md (Teclado no iPhone). */
(function(){const txtEl=e=>!!e&&(e.tagName==='TEXTAREA'||(e.tagName==='INPUT'&&!/^(checkbox|radio|file|button|submit|range|color)$/i.test(e.type)));
 let chgT=0,pend=false;window.addEventListener('change',e=>{if(txtEl(e.target))chgT=Date.now()},true);
 const R0=render;render=function(...a){if(!window.KBD_MORPH&&Date.now()-chgT<2500&&txtEl(document.activeElement)){pend=true;return}pend=false;return R0.apply(this,a)};
 /* manter à vista a caixa onde se escreve: quando o teclado abre (o ecrã visível encolhe) ou a caixa cresce, desloca só o necessário, sem animação (a animação lutava com o deslocamento do próprio iOS) */
 const vv=window.visualViewport;if(vv&&window.matchMedia&&matchMedia('(pointer:coarse)').matches){window.KBD_KEEP=true;let kt=0;
  const keep=()=>{clearTimeout(kt);kt=setTimeout(()=>{const el=document.activeElement;if(!txtEl(el)&&!(el&&el.tagName==='SELECT'))return;const r=el.getBoundingClientRect(),top=vv.offsetTop,h=vv.height,alvo=top+Math.min(h*0.3,120);
   if(r.top<top+8||r.bottom>top+h-8)window.scrollBy(0,(el.tagName==='TEXTAREA'&&r.height>h*0.5?Math.max(r.top,r.bottom-h*0.6):r.top)-alvo)},140)};
  vv.addEventListener('resize',keep);document.addEventListener('focusin',keep);document.addEventListener('input',e=>{if(e.target&&e.target.tagName==='TEXTAREA')keep()})}
 document.addEventListener('focusout',()=>setTimeout(()=>{if((pend||window.KBD_PEND)&&!txtEl(document.activeElement)){pend=false;window.KBD_PEND=false;try{if(typeof S==='object'&&S)S.scrollTop=window.scrollY}catch(_){}render()}},300))})();
/* @fim:teclado */
