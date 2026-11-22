/* @comum:peritos v1.0 — base de peritos e gabinetes partilhada entre apps (troca por ficheiro «Base_Peritos_….json», kind PFK_Peritos).
   FONTE ÚNICA: comum/peritos.js — não editar dentro das apps; editar e correr `python3 tools/sync_comum.py`.
   Modelo: settings.peritos = [{nome, esp, tel, email, res}] (o mesmo do ExPropria); settings.gabinetes = [{id, nome}] (se a app o tiver).
   Precisa, na app: settings, saveSettings(). */
const PER_KIND='PFK_Peritos';
const perNorm=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
function perBase(){if(!Array.isArray(settings.peritos))settings.peritos=[];return settings.peritos}
const perOrd=()=>perBase().filter(p=>p&&String(p.nome||'').trim()).sort((a,b)=>String(a.nome).localeCompare(String(b.nome),'pt',{sensitivity:'base'}));
/* acrescenta à base um nome escrito num processo (se ainda não existir) */
function perAddName(nome,extra={}){const n=String(nome||'').trim();if(n.length<3)return false;const L=perBase();if(L.some(p=>perNorm(p.nome)===perNorm(n)))return false;L.push({nome:n,esp:'',tel:'',email:'',res:'',...extra});return true}
function perLibExport(){const o={kind:PER_KIND,v:1,data:new Date().toISOString(),peritos:perOrd(),gabinetes:Array.isArray(settings.gabinetes)?settings.gabinetes.map(g=>({id:g.id||'',nome:g.nome||String(g)})):[]};
 const b=new Blob([JSON.stringify(o,null,1)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=`Base_Peritos_${new Date().toISOString().slice(0,10)}.json`;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500)}
/* junta por nome: acrescenta os que faltam e só preenche campos vazios (nunca apaga nem substitui o que já está) */
async function perLibImport(file){if(!file)return null;try{const o=JSON.parse(await file.text());if(o.kind!==PER_KIND||!Array.isArray(o.peritos))throw new Error('não é uma base de peritos');
  const L=perBase();let nN=0,nU=0;for(const p of o.peritos){if(!p||!String(p.nome||'').trim())continue;const q=L.find(x=>perNorm(x.nome)===perNorm(p.nome));
   if(!q){L.push({nome:String(p.nome).trim(),esp:p.esp||'',tel:p.tel||'',email:p.email||'',res:p.res||''});nN++}else{let ch=false;for(const k of ['esp','tel','email','res'])if(!String(q[k]||'').trim()&&String(p[k]||'').trim()){q[k]=p[k];ch=true}if(ch)nU++}}
  let nG=0;if(Array.isArray(settings.gabinetes)&&Array.isArray(o.gabinetes))for(const g of o.gabinetes){const n=String(g&&g.nome||'').trim();if(n&&!settings.gabinetes.some(x=>perNorm(x.nome||x)===perNorm(n))){settings.gabinetes.push({id:g.id||perNorm(n).replace(/[^a-z0-9]+/g,''),nome:n});nG++}}
  try{await saveSettings()}catch(e){}alert(`Base de peritos importada: ${nN} perito(s) novo(s), ${nU} completado(s)${nG?`, ${nG} gabinete(s) novo(s)`:''}.`);return nN+nU+nG}
 catch(e){alert('Não foi possível importar: '+e.message);return null}}
/* @fim:peritos */
