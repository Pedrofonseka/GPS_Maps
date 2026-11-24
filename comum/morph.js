/* @comum:morph v1.0 — redesenho sem saltos: em vez de substituir o HTML inteiro (o que destrói a caixa onde se está a escrever, fecha o teclado e faz o ecrã saltar no iPhone), compara o HTML novo com o que está no ecrã e só altera o que mudou. A caixa com o foco nunca é substituída nem perde o que lá está escrito. Se a estrutura mudou à volta da caixa com o foco (ex.: linha nova acima), devolve false e não mexe — a app redesenha quando o foco sair. Regra: docs/regras/README.md (Teclado no iPhone). */
const domMorph=(function(){
 const isTxt=e=>!!e&&(e.tagName==='TEXTAREA'||e.tagName==='SELECT'||(e.tagName==='INPUT'&&!/^(checkbox|radio|file|button|submit|range|color)$/i.test(e.type)));
 const pathOf=(root,el)=>{const p=[];while(el&&el!==root){p.unshift([...el.parentNode.childNodes].indexOf(el));el=el.parentNode}return el===root?p:null};
 const at=(root,p)=>{let n=root;for(const i of p){n=n&&n.childNodes[i];if(!n)return null}return n};
 const same=(a,b)=>!!a&&!!b&&a.nodeName===b.nodeName&&['data-bind','id','name','data-perb','data-pk','data-act','data-i'].every(k=>a.getAttribute(k)===b.getAttribute(k));
 function attrs(o,n){for(const at of [...o.attributes])if(!n.hasAttribute(at.name)&&!(o.tagName==='TEXTAREA'&&at.name==='style'))o.removeAttribute(at.name);for(const at of [...n.attributes])if(o.getAttribute(at.name)!==at.value)o.setAttribute(at.name,at.value)}
 function morph(o,n,act){
  if(o.nodeType!==n.nodeType||o.nodeName!==n.nodeName){o.parentNode.replaceChild(n,o);return}
  if(o.nodeType!==1){if(o.nodeValue!==n.nodeValue)o.nodeValue=n.nodeValue;return}
  attrs(o,n);const t=o.tagName;
  if(t==='INPUT'){if(o!==act){if(/^(checkbox|radio)$/i.test(o.type))o.checked=n.hasAttribute('checked');else if(o.type!=='file'&&o.value!==(n.getAttribute('value')||''))o.value=n.getAttribute('value')||''}return}
  if(t==='TEXTAREA'){if(o!==act&&o.value!==n.value)o.value=n.value;return}
  const oc=o.childNodes,nc=[...n.childNodes];
  for(let i=0;i<nc.length;i++){if(i<oc.length)morph(oc[i],nc[i],act);else o.appendChild(nc[i])}
  while(oc.length>nc.length)o.removeChild(o.lastChild);
  if(t==='SELECT'&&o!==act){const s=[...n.options].findIndex(x=>x.hasAttribute('selected'));o.selectedIndex=s<0?0:s}
  if(t==='DETAILS')o.open=n.hasAttribute('open')}
 return function(root,html){const act=document.activeElement,foco=isTxt(act)&&root.contains(act);
  const tp=document.createElement('template');tp.innerHTML=html;const nw=tp.content;
  if(foco){const p=pathOf(root,act);if(!p||!same(act,at(nw,p)))return false}
  const oc=root.childNodes,nc=[...nw.childNodes];
  for(let i=0;i<nc.length;i++){if(i<oc.length)morph(oc[i],nc[i],foco?act:null);else root.appendChild(nc[i])}
  while(oc.length>nc.length)root.removeChild(root.lastChild);return true}})();
/* @fim:morph */
