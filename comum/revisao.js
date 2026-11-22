/* @comum:revisao v1.0 — revisão do texto: correção automática das gralhas mecânicas (espaços, pontuação, maiúscula no início da frase, ponto final), com «✓ aceitar» ou «↶ manter o original» por texto.
   FONTE ÚNICA: comum/revisao.js — não editar dentro das apps; editar e correr `python3 tools/sync_comum.py`.
   A app fornece a lista de textos: [{sec, lbl, key, get(), set(v)}] e um objeto «keep» (key → texto original a manter, guardado no processo). Precisa: esc(). */
const RV_ABBR=/(?:^|\s)(?:ex|n\.º|art|arts|p|pág|págs|sr|sra|dr|dra|eng|arq|cf|etc|aprox|nº|n|al|v|vs|fl|fls|proc|ref|tel|séc|av|lda|s\.a|cód)\.$/i;
function fixMech(t){const ch=[];let x=String(t);const ap=(rx,rep,msg)=>{const y=x.replace(rx,rep);if(y!==x){ch.push(msg);x=y}};
  ap(/[ \t]+$/gm,'','espaços no fim da linha');
  ap(/(\S)[ \t]{2,}(?=\S)/g,'$1 ','espaços a mais');
  ap(/[ \t]+([,.;:!?])(?!\d)/g,'$1','espaço antes da pontuação');
  ap(/([,;])(?=\p{L})/gu,'$1 ','falta espaço depois da pontuação');
  ap(/([!?,;:])\1+/g,'$1','pontuação repetida');ap(/(?<!\.)\.\.(?!\.)/g,'.','ponto repetido');
  {const y=x.replace(/(\S+)/g,tok=>/[@\/]|www|https?|\.(pt|com|org|net|eu)\b/i.test(tok)||!/\p{L}{2,}[.!?]\p{Ll}/u.test(tok)?tok:tok.replace(/(\p{L}{2,})([.!?])(\p{Ll}+)/gu,(m,a,pn,b2)=>RV_ABBR.test(' '+a+pn)?m:a+pn+' '+b2));if(y!==x){ch.push('falta espaço depois do ponto');x=y}}
  {const y=x.replace(/([.!?])(\s+)(\p{Ll})/gu,(m,a,sp,c,i)=>RV_ABBR.test(' '+x.slice(Math.max(0,i-8),i+1))?m:a+sp+c.toUpperCase());if(y!==x){ch.push('maiúscula no início da frase');x=y}}
  {const L=x.replace(/\s+$/,'').split('\n'),last=(L[L.length-1]||'').trim();if(x.trim().length>60&&/[\p{L}\d)»]$/u.test(last)&&!/^[-–•]/.test(last)){x=x.replace(/\s+$/,'')+'.';ch.push('ponto final')}}
  return {t:x,ch}}
/* corrige já os textos da lista (exceto os marcados para manter) e devolve o que mudou */
function rvRun(items,keep){const done=[];for(const it of items){const c0=String(it.get()??'');if(!c0.trim()||keep[it.key]===c0)continue;const f=fixMech(c0);if(!f.ch.length)continue;it.set(f.t);done.push({...it,before:c0,after:f.t,ch:f.ch})}return done}
/* janela com o que foi corrigido: ✓ aceitar · ↶ manter o original (fica lembrado) · «Aceitar todas» */
function rvModal(done,keep,onChange){const m=document.createElement('div');m.className='modal';m.id='rvModal';const close=()=>{m.remove();onChange&&onChange()};
 const draw=()=>{const L=done.filter(d=>!d.ok&&!d.kept);m.innerHTML=`<div class="box" style="max-width:720px;max-height:90vh;overflow:auto;text-align:left"><h3 style="margin-top:0">🔍 Revisão do texto — gralhas mecânicas</h3>
  ${done.length?`<p class="muted">${done.length} texto(s) corrigido(s) automaticamente. Confirme (✓) ou mantenha o original (↶ — fica lembrado e não volta a ser corrigido).</p>`:'<p>Sem gralhas mecânicas. ✓</p>'}
  ${L.map(d=>{const i=done.indexOf(d);return `<div style="border-top:1px solid #ddd;padding:8px 0"><div class="muted" style="font-size:12px">${esc(d.sec)}${d.lbl?' › '+esc(d.lbl):''} — ${esc(d.ch.join(', '))}</div><div style="font-size:13px;color:#8a1c1c;text-decoration:line-through;white-space:pre-wrap">${esc(d.before.length>400?d.before.slice(0,400)+'…':d.before)}</div><div style="font-size:13px;color:#1b5e20;white-space:pre-wrap">${esc(d.after.length>400?d.after.slice(0,400)+'…':d.after)}</div><div class="btns" style="margin:4px 0 0"><button class="secondary mini" data-rvok="${i}">✓ Aceitar</button><button class="secondary mini" data-rvkeep="${i}">↶ Manter o original</button></div></div>`}).join('')}
  <div class="btns" style="margin-top:12px">${L.length?'<button class="green" data-rvall="1">✓ Aceitar todas</button>':''}<button class="secondary" data-rvclose="1">Fechar</button></div></div>`};
 m.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;e.stopPropagation();if(b.dataset.rvclose)return close();if(b.dataset.rvall){done.forEach(d=>{if(!d.kept)d.ok=true});return close()}
  if(b.dataset.rvok!==undefined)done[+b.dataset.rvok].ok=true;if(b.dataset.rvkeep!==undefined){const d=done[+b.dataset.rvkeep];d.set(d.before);keep[d.key]=d.before;d.kept=true}draw();if(!done.some(d=>!d.ok&&!d.kept))close()});
 draw();document.body.appendChild(m)}
/* @fim:revisao */
