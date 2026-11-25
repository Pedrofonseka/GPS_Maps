/* @comum:vistas v1.0 — atalhos de vistas do local, junto à localização GPS: imagens históricas (Google Earth), Street View com datas anteriores, satélite e ortofotomapas oficiais da DGT (1995 → 2021, «Portugal Visto do Céu»). Abrem fora da app; a captura de ecrã entra depois como imagem anexa (rodar, marcar, legendar). */
const VISTAS={
 html(lat,lon){if(lat==null||lon==null||isNaN(lat)||isNaN(lon))return `<div id="vistas" class="muted" style="margin:4px 0">Vistas do local (Google Earth histórico, Street View, DGT): obtenha primeiro as coordenadas GPS.</div>`;
  const L=(+lat).toFixed(6),G=(+lon).toFixed(6),c=`${L}, ${G}`,e=s=>String(s).replace(/"/g,'&quot;');
  const B=[['🌍 Google Earth — histórico',`https://earth.google.com/web/@${L},${G},150a,600d,35y,0h,0t,0r`,'No Google Earth: botão «Imagens históricas» (globo com seta) para ver anos anteriores'],
   ['🚶 Street View — datas',`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${L},${G}`,'No Street View: «Ver mais datas» mostra as imagens antigas da rua'],
   ['🛰 Satélite',`https://www.google.com/maps/@?api=1&map_action=map&center=${L},${G}&zoom=19&basemap=satellite`,'Vista de satélite atual'],
   ['🇵🇹 DGT — ortofotos 1995-2021','https://geo2.dgterritorio.gov.pt/portugal-visto-ceu','As coordenadas ficam copiadas: cole-as na pesquisa do visualizador; o comparador divide o ecrã entre dois anos']];
  return `<div id="vistas" style="margin:6px 0"><div class="muted" style="font-size:12px;margin-bottom:4px">Vistas do local (abrem fora da app — faça captura de ecrã e junte-a como imagem anexa):</div><div class="btns" style="margin-top:0">${B.map(([t,u,h],i)=>`<a class="btn secondary mini" href="${e(u)}" target="_blank" rel="noopener" title="${e(h)}"${i===3?` data-vistacopy="${e(c)}"`:''}>${t}</a>`).join('')}</div></div>`}};
document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('[data-vistacopy]');if(!a)return;try{navigator.clipboard.writeText(a.dataset.vistacopy)}catch(_){}},true);
/* @fim:vistas */
