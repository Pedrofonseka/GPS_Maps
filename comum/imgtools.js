/* @comum:imgtools v1.0 — ferramentas comuns para QUALQUER imagem anexada ao processo (extratos do PDM, páginas de anexos, imagens fornecidas…):
   🔍 Ver · ⟳ Rodar · ✏️ Marcar · 🗑 Eliminar — as mesmas das fotografias. Regra: docs/regras/imagens_anexas.md.
   Uso: ao desenhar, a app chama IMGT.bar(chave, objeto, {del:()=>…}); o objeto é {id,w,h,marks}; a imagem lê-se com fd(objeto) e guarda-se com fotoPut(id,data).
   Precisa, na app: fd, fotoPut, saveProc, render, S; para marcar: openMarker e prepMark (rotina de marcas, docs/regras/marcas_fotos.md). */
const IMGT=(function(){const R=new Map();
 const bar=(k,o,opt={})=>{if(!o)return '';R.set(k,{o,...opt});const n=(o.marks||[]).length;return `<div class="imgt"><button type="button" class="secondary mini" data-imgt="zoom" data-k="${k}">🔍 Ver</button><button type="button" class="secondary mini" data-imgt="rot" data-k="${k}">⟳ Rodar</button>${typeof openMarker==='function'?`<button type="button" class="secondary mini" data-imgt="mark" data-k="${k}">✏️ Marcar${n?` (${n})`:''}</button>`:''}${opt.del?`<button type="button" class="del mini" data-imgt="del" data-k="${k}">🗑 Eliminar</button>`:''}</div>`};
 async function rot(f){const src=fd(f);if(!src)return;const im=await new Promise((ok,no)=>{const x=new Image;x.onload=()=>ok(x);x.onerror=()=>no(new Error('Imagem ilegível'));x.src=src});
  const c=document.createElement('canvas');c.width=im.naturalHeight;c.height=im.naturalWidth;const g=c.getContext('2d',{alpha:false});g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);g.translate(c.width,0);g.rotate(Math.PI/2);g.drawImage(im,0,0);
  const d=c.toDataURL('image/jpeg',.86);await fotoPut(f.id,d);if(f.data)delete f.data;f.w=c.width;f.h=c.height;const cl=v=>Math.max(0.02,Math.min(.98,+v||0));
  (f.marks||[]).forEach(m=>{[m.x,m.y]=[cl(1-m.y),cl(m.x)];if(m.x2!=null)[m.x2,m.y2]=[cl(1-m.y2),cl(m.x2)]})}
 const out=f=>(typeof fdOut==='function'?fdOut(f):fd(f));
 async function after(f){await saveProc();try{if(typeof prepMark==='function')await prepMark(f)}catch(_){}try{if(typeof S==='object')S.scrollTop=window.scrollY}catch(_){}render()}
 function zoom(k){const e=R.get(k);if(!e)return;document.getElementById('imgtZ')?.remove();const m=document.createElement('div');m.className='modal';m.id='imgtZ';
  m.innerHTML=`<div class="box" style="max-width:900px;max-height:94vh;overflow:auto;text-align:center"><img src="${out(e.o)}" style="max-width:100%;max-height:72vh;object-fit:contain;background:#f3f3f3">${bar(k,e.o,e)}<div class="btns"><button class="secondary" data-imgtz="x">Fechar</button></div></div>`;document.body.appendChild(m)}
 document.addEventListener('click',async ev=>{const z=ev.target.closest('[data-imgtz]');if(z){ev.preventDefault();ev.stopImmediatePropagation();document.getElementById('imgtZ')?.remove();return}
  const b=ev.target.closest('[data-imgt]');if(!b)return;ev.preventDefault();ev.stopImmediatePropagation();const k=b.dataset.k,e=R.get(k);if(!e)return;const act=b.dataset.imgt,zm=!!document.getElementById('imgtZ');
  try{if(act==='zoom')return zoom(k);
   if(act==='rot'){await rot(e.o);await after(e.o);if(zm)zoom(k);return}
   if(act==='mark'){document.getElementById('imgtZ')?.remove();e.o.marks=e.o.marks||[];openMarker(null,e.o,'');return}
   if(act==='del'){if(!confirm('Eliminar esta imagem?'))return;document.getElementById('imgtZ')?.remove();e.del();R.delete(k);await after(e.o);return}}
  catch(err){if(typeof toast==='function')toast(err.message||String(err),1)}},true);
 return {bar,rot}})();
/* @fim:imgtools */
