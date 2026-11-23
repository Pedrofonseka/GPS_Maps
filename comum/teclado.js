/* @comum:teclado v1.0 — iPhone/iPad: não redesenhar o ecrã enquanto se escreve. Quando se passa de uma caixa de texto para outra, a mudança da primeira dispara «change»; se a app redesenhar nesse momento, o teclado fecha e reabre e o ecrã salta. O redesenho fica pendente e faz-se quando o foco sai das caixas. Regra: docs/regras/README.md (Teclado no iPhone). */
(function(){const txtEl=e=>!!e&&(e.tagName==='TEXTAREA'||(e.tagName==='INPUT'&&!/^(checkbox|radio|file|button|submit|range|color)$/i.test(e.type)));
 let chgT=0,pend=false;window.addEventListener('change',e=>{if(txtEl(e.target))chgT=Date.now()},true);
 const R0=render;render=function(...a){if(Date.now()-chgT<2500&&txtEl(document.activeElement)){pend=true;return}pend=false;return R0.apply(this,a)};
 document.addEventListener('focusout',()=>setTimeout(()=>{if(pend&&!txtEl(document.activeElement)){pend=false;try{if(typeof S==='object'&&S)S.scrollTop=window.scrollY}catch(_){}render()}},300))})();
/* @fim:teclado */
