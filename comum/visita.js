/* @comum:visita v1.0 — Ordem de visita (OV_xxx): ordem real no terreno, separada do código do processo. O primeiro registo no local (foto tirada na app, GPS, «visitado hoje») sugere o número seguinte; o utilizador aceita ou corrige; os outros reajustam-se sem repetidos. Regra: docs/regras/visita.md */
const ovCod=n=>(+n>0)?'OV_'+String(+n).padStart(3,'0'):'';
const ovNext=L=>Math.max(0,...L.map(x=>+x.ov||0))+1;
function ovCompact(L){L.filter(x=>+x.ov>0).sort((a,b)=>a.ov-b.ov||L.indexOf(a)-L.indexOf(b)).forEach((x,i)=>x.ov=i+1)}
function ovTouch(L,it){if(!it||+it.ov>0)return false;it.ov=ovNext(L);it.ovSug=1;it.ovT=Date.now();return true}
function ovSet(L,it,n){n=Math.round(+n||0);if(n<1){it.ov=0;it.ovSug=0;ovCompact(L);return}const V=L.filter(x=>x!==it&&+x.ov>0).sort((a,b)=>a.ov-b.ov);V.splice(Math.min(n-1,V.length),0,it);V.forEach((x,i)=>x.ov=i+1);it.ovSug=0;if(!it.ovT)it.ovT=Date.now()}
const ovAccept=it=>{it.ovSug=0};
const ovSort=L=>L.slice().sort((a,b)=>((+a.ov||1e9)-(+b.ov||1e9))||(L.indexOf(a)-L.indexOf(b)));
function ovFromTimes(L,tsOf){const c=L.filter(x=>!(+x.ov>0)).map(x=>[x,tsOf(x)]).filter(([,t])=>t).sort((a,b)=>a[1]-b[1]);c.forEach(([x,t])=>{x.ov=ovNext(L);x.ovSug=1;x.ovT=t});return c.length}
/* @fim:visita */
