
/* =====================================================================
   AvaLias — avaliação de ativos. Base: Relatório de Peritagem (Regi + relat_ext).
   O preenchimento segue o raciocínio da avaliação (não o modelo Word):
   Processo → Verbas: 1 Identificação · 2 Localização · 3 Visita · 4 Tipo de ativo e destino ·
   5 Estado (características — Detalhado/Sucinto — e fotos) · 6 Utilidade · 7 Métodos · 8 Valor.
   ===================================================================== */
const AL_TIPOS=[['EDI','Edifício','imo'],['MOR','Moradia','imo'],['ANX','Construção anexa','imo'],['GAR','Garagem autónoma','imo'],['FRA','Fração','imo'],['VEI','Veículo','vei'],['MOB','Conjunto de mobiliário','mob'],['TER','Terreno','ter'],['SEP','Sepultura','sep'],['OUT','Outra situação','out']];
/* destinos: imóveis — afetações do CIMI (art. 41.º) + as indicadas pelo utilizador; veículos — categorias do Código da Estrada (art. 106.º e ss.) */
const AL_DEST={
 imo:['Habitação','Comércio','Serviços','Comércio e serviços','Armazéns e atividade industrial','Aviário','Estacionamento coberto','Estacionamento não coberto','Arrecadações e arrumos','Outro'],
 ter:['Construção','Produção agrícola','Produção florestal','Agroflorestal','Outro'],
 vei:['Ligeiro de passageiros — uso particular','Ligeiro de passageiros — transporte de passageiros','Ligeiro de mercadorias','Ligeiro misto','Pesado de passageiros','Pesado de mercadorias','Motociclo / ciclomotor','Trator agrícola / florestal','Máquina industrial','Reboque / semirreboque','Outro'],
 mob:['Habitação','Escritório','Comércio','Outro'],
 sep:['Uso funerário','Outro'],
 out:['Outro']};
const AL_IDTIPO={imo:['Artigo matricial','Descrição predial (CRP)','Outro'],ter:['Artigo matricial','Descrição predial (CRP)','Outro'],vei:['Matrícula','N.º de quadro (VIN)'],mob:['Referência / inventário'],sep:['N.º da sepultura','Alvará de concessão'],out:['Referência']};
const AL_CTX=[['aglomerado','Aglomerado','c','aglomerado'],['centralidade','Centralidade','c','centralidade'],['envolvente','Envolvente','c','envolvente'],['consolidacao','Consolidação','c','consolidacao'],['padrao','Padrão urbano','c','padrao_urbano'],['infra','Infraestruturas','c','infraestruturas'],['acessos','Acessos','c','acessos']];
const AL_CAR={
 imo:[['g','Contexto'],...AL_CTX,['g','Construção'],['tipologia','Tipologia (ex.: T3)','t'],['pisos','N.º de pisos','n'],['ano','Ano de construção (aprox.)','t'],['sist','Sistema construtivo','c','sist_construtivo'],['cob','Cobertura','c','cobertura'],['exec','Estado de execução','c','edc2_estado_execucao'],['estado','Estado de conservação','c','dep_rhd'],['energ','Classe energética','c','edc2_classe_energetica'],['inspecao','Inspeção','c','edc2_tipo_inspecao'],['g','Áreas'],['at','Área de terreno — AT (m²)','n'],['ai','Área de implantação — AI (m²)','n'],['abp','Área bruta privativa — Abp (m²)','n'],['abd','Área bruta dependente — Abd (m²)','n'],['fonteArea','Fonte das áreas','m','fonte_info']],
 ter:[['g','Contexto'],...AL_CTX,['g','Terreno'],['at','Área do terreno (m²)','n'],['morf','Morfologia','c','morfologia'],['trab','Trabalhabilidade','c','trabalhabilidade'],['restr','Restrições','c','restricoes'],['agua','Disponibilidade de água','m','disp_agua'],['energia','Disponibilidade de energia','m','disp_energia'],['pressao','Pressão urbanística','c','pressao_urb'],['fonteArea','Fonte das áreas','m','fonte_info']],
 vei:[['marca','Marca','t'],['modelo','Modelo / versão','t'],['data1m','Data da 1.ª matrícula','t'],['comb','Combustível','c','vei_combustivel'],['caixa','Caixa','c','vei_caixa'],['km','Quilómetros','n'],['kmVer','Quilómetros — verificação','c','vei_km_verif'],['estado','Estado geral','c','vei_estado'],['arranca','Funcionamento','c','vei_arranca'],['fonte','Fonte da informação','m','fonte_vei']],
 mob:[['tipoMob','Tipo de bens','m','mob_tipo'],['qtd','Quantidade (peças)','n'],['estado','Estado','c','bens_estado'],['func','Funcionamento','c','bens_func'],['fonte','Fonte da informação','m','fonte_bens']],
 sep:[['sepTipo','Tipo','c','sep_tipo'],['cemiterio','Cemitério','t'],['entidade','Entidade gestora','c','sep_entidade'],['regime','Regime','c','sep_regime'],['material','Material','c','sep_material'],['estado','Estado','c','sep_estado'],['fonte','Fonte da informação','m','fonte_sep']],
 out:[['estado','Estado','c','bens_estado']]};
const AL_SUC={imo:[['env','Envolvente e contexto'],['car','Características'],['est','Estado de conservação']],ter:[['env','Envolvente e contexto'],['car','Características do terreno'],['est','Estado / ocupação']],vei:[['car','Características'],['est','Estado']],mob:[['car','Características'],['est','Estado']],sep:[['car','Características'],['est','Estado']],out:[['car','Descrição / características'],['est','Estado']]};
const AL_METODOS=['Comparativo de mercado','Rendimento (capitalização)','Custo (reposição depreciado)','Residual','Outro'];
/* texto do modelo «Ava_Context» (Valor estimado — considerações e BAD) */
const AL_N=[
 'N1 - O Valor indicado refere-se à totalidade do ativo (100% de quota-parte), não incluindo taxas nem comissões de mediação imobiliária.',
 'Em situação de titularidade repartida, deverá ser feita a proporção em função da respetiva quota-parte.',
 'N2 – O valor indicado, pressupõe uma situação de transação em mercado normal, com exposição ao mercado durante adequado período de comercialização até se encontrar um comprador normal disponível em satisfazer o valor pedido, sem relação ou interesse especial o mova.'];
const AL_BAD=[
 'N3 - Na eventualidade de algum dos intervenientes manifestar interesse especial em adquirir o ativo, entende-se que deverá haver redução de preço relativamente ao valor estimado, pois, o ativo deixa de estar sujeito ao mercado normal e respetivo desgaste temporal de preço, até aparecer um comprador disponível.',
 'Muito embora esta perspetiva não corresponda a uma base institucional de valor, constitui uma prática corrente em situações desta natureza que pode ser adotada e se considera mais ajustada a esse tipo de contexto.',
 'Na prática, é um benefício de adjudicação direta – «BAD».'];
const alOpt=x=>{const t=String(x||'');const k=t.indexOf(' — ');return k>=0?t.slice(k+3):t};
const alFam=a=>(AL_TIPOS.find(t=>t[0]===a?.al?.tipo)||[])[2]||'';
const alTipoNome=a=>(AL_TIPOS.find(t=>t[0]===a?.al?.tipo)||[])[1]||'';
const alDestTxt=a=>{const d=a?.al?.destino||'';return d==='Outro'?(String(a.al.destinoOutro||'').trim()||'Outro'):d};
const alEur=v=>{const n=alNum(v);return n==null?'':n.toLocaleString('pt-PT',{minimumFractionDigits:0,maximumFractionDigits:0})+' €'};
const alNum=v=>{if(v==null||v==='')return null;const n=Number(String(v).replace(/\s/g,'').replace(/\.(?=\d{3}(\D|$))/g,'').replace(',','.'));return isFinite(n)?n:null};
function alP(p){const d={finalidade:'',finalidadeOutra:'',base:'Valor de mercado',posse:'Propriedade Plena',bad:false,badPct:'10'};p.al=p.al||{};for(const k in d)if(p.al[k]===undefined)p.al[k]=d[k];return p.al}
function alA(a){const d={codigo:'',designacao:'',idTipo:'',idValor:'',morada:'',tipo:'',destino:'',destinoOutro:'',modo:'det',car:{},suc:{},atr:'',util:'',met:{},metTxt:'',valor:'',renda:'',bad:'',valObs:''};a.al=a.al||{};for(const k in d)if(a.al[k]===undefined)a.al[k]=clone(d[k]);a.vis=a.vis||{data:'',presencas:'',gps:null};return a.al}
function alCode(p,a){const c=String(a?.al?.codigo||'').trim();if(c)return c;const i=(p?.anomalias||[]).indexOf(a);return 'VB_'+String((i<0?0:i)+1).padStart(3,'0')}
function alNew(p){const a=newAnom('local',1);alA(a);return a}
function alTemDados(a){const x=a.al||{};return !!(a.fotos?.length||String(a.descricao||'').trim()||x.tipo||x.valor||x.designacao||x.idValor||x.morada||a.vis?.gps||Object.values(x.car||{}).some(v=>Array.isArray(v)?v.length:String(v||'').trim())||Object.values(x.suc||{}).some(v=>String(v||'').trim()))}
function alFeita(a){const x=a.al||{};return !!(x.tipo&&(a.fotos?.length||alNum(x.valor)!=null))}

/* ---------- ficha da verba ---------- */
const AL_SECS=[['v1','1 · Identificação'],['v2','2 · Localização'],['v3','3 · Visita'],['v4','4 · Tipo de ativo e destino'],['v5','5 · Estado — características e fotografias'],['v6','6 · Utilidade'],['v7','7 · Métodos elegíveis'],['v8','8 · Valor']];
function alTk(on,label,attrs){return tickBox('',on,label,attrs)}
function alField(a,f){const [k,l,t,o]=f;const v=a.al.car[k];
 if(t==='c'){const L=AL_LISTS[o]||[];return `<label>${esc(l)}</label><div class="tks sm">${L.map(x=>alTk(v===x,esc(alOpt(x)),`data-alact="car1" data-k="${k}" data-v="${esc(x)}"`)).join('')}</div>`}
 if(t==='m'){const L=AL_LISTS[o]||[];const arr=Array.isArray(v)?v:[];return `<label>${esc(l)} <span class="muted">(pode marcar várias)</span></label><div class="tks sm">${L.map(x=>alTk(arr.includes(x),esc(alOpt(x)),`data-alact="carM" data-k="${k}" data-v="${esc(x)}"`)).join('')}</div>`}
 return `<label>${esc(l)}</label><input data-bind="alc.${k}" value="${esc(v??'')}" ${t==='n'?'inputmode="decimal"':''}>`}
function vFicha(){
 const p=cur(),a=curA();alP(p);alA(a);const x=a.al,L=p.anomalias,idx=L.indexOf(a),n=L.length,fam=alFam(a),code=alCode(p,a),prev=L[idx-1];const max=maxTxt();
 S.subNav=`<div class="fnav"><button class="secondary" data-act="backList">◀ Verbas</button><button class="secondary" data-alact="step" data-d="-1" ${idx?'':'disabled'} title="Verba anterior — fica na mesma secção">◀</button><b class="grow center">${esc(code)}<small class="vbpos">${idx+1}/${n}${x.designacao?' · '+esc(x.designacao):''}</small></b><button class="secondary" data-alact="step" data-d="1" ${idx<n-1?'':'disabled'} title="Verba seguinte — fica na mesma secção">▶</button></div>`;
 const ok=(c)=>pill(c?'✓':'—',c?'ok':'');
 let h='';
 /* 1 identificação */
 const idOpts=fam?AL_IDTIPO[fam]:[...new Set(Object.values(AL_IDTIPO).flat())];
 h+=sec('v1','1 · Identificação',`<div class="row2">${inp('al.codigo',`Código da verba (vazio = ${'VB_'+String(idx+1).padStart(3,'0')})`,x.codigo,'VB_001')}${inp('al.designacao','Designação (curta — sai no quadro-resumo)',x.designacao,'ex.: Moradia T3, Ligeiro Renault Clio…')}</div>
  <label>Identificação do ativo (ID)</label><div class="tks sm">${idOpts.map(o=>alTk(x.idTipo===o,esc(o),`data-alact="set" data-k="idTipo" data-v="${esc(o)}"`)).join('')}</div><input data-bind="al.idValor" value="${esc(x.idValor)}" placeholder="${esc(x.idTipo||'Artigo / matrícula / n.º…')}">
  ${txt('a.descricao','Descrição sumária',a.descricao,3)}`,{cnt:ok(x.designacao||a.descricao)});
 /* 2 localização */
 const prevLoc=prev&&(prev.vis?.gps||prev.al?.morada);
 h+=sec('v2','2 · Localização',`${prevLoc?`<div class="btns" style="margin-top:0"><button class="secondary mini" data-alact="copyLoc">⧉ Igual à ${esc(alCode(p,prev))}</button></div>`:''}${inp('al.morada','Morada / local',x.morada,'Rua, n.º, localidade — ou cemitério, parque…')}${gpsBlock(p)}`,{cnt:ok(a.vis.gps||x.morada)});
 /* 3 visita */
 const prevVis=prev&&(prev.vis?.data||prev.vis?.presencas);
 h+=sec('v3','3 · Visita',`${prevVis?`<div class="btns" style="margin-top:0"><button class="secondary mini" data-alact="copyVis">⧉ Igual à ${esc(alCode(p,prev))}</button></div>`:''}<label>Data da visita</label><div class="inrow"><input data-bind="vis.data" value="${esc(a.vis.data||'')}" placeholder="dd/mm/aaaa"><button class="secondary" data-act="visCal">📅</button><button class="secondary" data-act="visHoje">Hoje</button></div>${txt('vis.presencas','Presenças (nome – qualidade)',a.vis.presencas,3)}`,{cnt:ok(a.vis.data)});
 /* 4 tipo e destino */
 h+=sec('v4','4 · Tipo de ativo e destino',`<label>Tipo de ativo</label><div class="tks">${AL_TIPOS.map(([k,t])=>alTk(x.tipo===k,esc(t),`data-alact="tipo" data-v="${k}"`)).join('')}</div>
  ${fam?`<label>Destino</label><div class="tks">${AL_DEST[fam].map(d=>alTk(x.destino===d,esc(d),`data-alact="set" data-k="destino" data-v="${esc(d)}"`)).join('')}</div>${x.destino==='Outro'||fam==='out'?inp('al.destinoOutro','Destino — descrever',x.destinoOutro):''}`:'<p class="muted">Escolha o tipo de ativo para ver os destinos possíveis.</p>'}`,{cnt:ok(x.tipo&&x.destino)});
 /* 5 estado */
 {let body='';if(!fam)body='<p class="muted">Escolha primeiro o tipo de ativo (secção 4): as perguntas de caracterização dependem dele.</p>';
  else{body=`<label>Modo de caracterização</label><div class="seg"><button class="${x.modo!=='suc'?'on':''}" data-alact="set" data-k="modo" data-v="det">Detalhado (caixas)</button><button class="${x.modo==='suc'?'on':''}" data-alact="set" data-k="modo" data-v="suc">Sucinto (texto livre)</button></div>`;
   const prevSame=prev&&alFam(prev)===fam&&(Object.keys(prev.al?.car||{}).length||Object.values(prev.al?.suc||{}).some(v=>String(v||'').trim()));
   if(prevSame)body+=`<div class="btns"><button class="secondary mini" data-alact="copyCar">⧉ Copiar a caracterização da ${esc(alCode(p,prev))}</button></div>`;
   if(x.modo==='suc')body+=AL_SUC[fam].map(([k,l])=>`<label>${esc(l)}</label><textarea data-bind="als.${k}" rows="3">${esc(x.suc[k]||'')}</textarea>`).join('');
   else body+=AL_CAR[fam].map(f=>f[0]==='g'?`<div class="algrp">${esc(f[1])}</div>`:alField(a,f)).join('')}
  const RF=relF(a),RS=resF(a);const th=(f,i,res)=>`<div class="ph ${res?'res':''}"><img src="${fd(f)}" data-act="zoom" data-i="${i}"><div class="cap" data-act="zoom" data-i="${i}"><b>${res?'Reserva':imgCode(p,a,i)}</b> ${esc(f.legenda||(res?'':'— sem legenda (toque para editar)'))}</div><button class="phsel ${res?'':'on'}" data-act="selF" data-i="${i}" title="${res?'Passar para o relatório':'Retirar do relatório (fica em reserva)'}">${res?'＋ Usar':'✓ No relatório'}</button></div>`;
  body+=`<div class="algrp">Fotografias</div><p class="muted" style="margin-top:0">${RF.length}/${max} no relatório${RS.length?` · ${RS.length} em reserva`:''}. As que excedem o máximo ficam em reserva.</p><div class="photos">${RF.map((f,i)=>th(f,i,false)).join('')}</div>${RS.length?`<label style="margin-top:12px">Reserva — não vai para o relatório (${RS.length})</label><div class="photos">${RS.map((f,k)=>th(f,RF.length+k,true)).join('')}</div>`:''}
   ${a.fotos.length<MAXALL?`<div class="btns"><label class="btn green">📷 Tirar fotografia<input type="file" accept="image/*" capture="environment" data-act="addCam" hidden></label><label class="btn green">🖼 Escolher da fototeca<input type="file" accept="image/*" multiple data-act="addLib" hidden></label></div>`:`<p class="muted">Máximo de ${MAXALL} fotos guardadas nesta verba.</p>`}${S.camShots.length?`<div class="btns"><button class="secondary" data-act="saveCam">💾 Guardar ${S.camShots.length} foto(s) tirada(s) na fototeca</button></div>`:''}`;
  const nCar=x.modo==='suc'?Object.values(x.suc).filter(v=>String(v||'').trim()).length:Object.values(x.car).filter(v=>Array.isArray(v)?v.length:String(v??'').trim()).length;
  h+=sec('v5','5 · Estado — características e fotografias',body,{cnt:pill(`${nCar} · 📷 ${RF.length}`,nCar&&RF.length?'ok':'warn')})}
 /* 6 utilidade */
 h+=sec('v6','6 · Utilidade',`<label>Atratividade</label><div class="tks sm">${(AL_LISTS.atratividade||[]).map(o=>alTk(x.atr===o,esc(o),`data-alact="set" data-k="atr" data-v="${esc(o)}"`)).join('')}</div>${txt('al.util','Utilidade / aptidão (para que serve, procura, limitações)',x.util,3)}`,{cnt:ok(x.atr||x.util)});
 /* 7 métodos */
 h+=sec('v7','7 · Métodos elegíveis',`<p class="muted" style="margin-top:0">A desenvolver: por agora regista quais os métodos aplicáveis e porquê; os cálculos ainda não estão na app.</p><div class="tks">${AL_METODOS.map(m=>alTk(!!x.met[m],esc(m),`data-alact="met" data-v="${esc(m)}"`)).join('')}</div>${txt('al.metTxt','Fundamentação / notas',x.metTxt,2)}`,{cnt:ok(Object.values(x.met).some(Boolean))});
 /* 8 valor */
 const renda=p.al.base==='Valor de renda de mercado';
 h+=sec('v8','8 · Valor',`<div class="row2">${inp('al.valor','Valor estimado (€)',x.valor,'ex.: 185 000')}${renda?inp('al.renda','Renda mensal (€/mês)',x.renda,'ex.: 650'):''}</div>${p.al.bad?inp('al.bad',`BAD — redução até (%) — vazio = ${p.al.badPct||10}%`,x.bad,String(p.al.badPct||10)):'<p class="muted">BAD não aplicável neste processo (Processo › Contexto da avaliação).</p>'}${txt('al.valObs','Notas ao valor (opcional)',x.valObs,2)}${alNum(x.valor)!=null?`<p><b>${esc(alEur(x.valor))}</b>${renda&&alNum(x.renda)!=null?` · ${esc(alEur(x.renda))}/mês`:''}</p>`:''}`,{cnt:ok(alNum(x.valor)!=null)});
 h+=`<div class="btns"><button class="green" data-alact="step" data-d="1" ${idx<n-1?'':'disabled'}>Verba seguinte ▶</button><span class="grow"></span><button class="secondary mini" data-act="dupA">⧉ Duplicar</button><button class="del" data-alact="del" data-id="${a.id}">🗑 Eliminar a verba ${esc(code)}</button></div>`;
 return h}

/* ---------- lista de verbas ---------- */
function vAnoms(){const p=cur();alP(p);const L=p.anomalias;L.forEach(alA);const tot=L.reduce((s,a)=>s+(alNum(a.al.valor)||0),0),done=L.filter(alFeita).length;
 return `<h2>Verbas (${L.length})</h2><div class="card"><div class="steps3"><span><b>1</b> Identificar e localizar</span><span><b>2</b> Tipo, estado e fotos</span><span><b>3</b> Utilidade, métodos e valor</span></div>
 <div class="btns"><button class="green" data-alact="nova">+ Nova verba</button><button class="secondary" data-alact="trocar">⇄ Enviar / receber verbas</button></div>
 ${L.length?`<div class="bar"><i style="width:${Math.round(100*done/L.length)}%"></i></div><b>${done}/${L.length}</b> com tipo e fotos ou valor${tot?` · total estimado <b>${esc(alEur(tot))}</b>`:''}`:''}</div>
 <div class="list">${L.map((a,i)=>{const x=a.al;return `<div class="card alcard" data-act="openAnom" data-id="${a.id}"><button class="aldel" data-alact="del" data-id="${a.id}" title="Eliminar a verba ${esc(alCode(p,a))}" aria-label="Eliminar a verba">🗑</button><b>${esc(alCode(p,a))}</b> ${esc(x.designacao||'')}<div class="muted">${esc([alTipoNome(a),alDestTxt(a)].filter(Boolean).join(' · ')||'Tipo por definir')}${x.idValor?' · '+esc((x.idTipo?x.idTipo+' ':'')+x.idValor):''}</div><div style="margin-top:4px">${pill('📷 '+relF(a).length)}${a.vis?.gps?pill('GPS','ok'):''}${a.vis?.data?pill(a.vis.data):''}${alNum(x.valor)!=null?pill(alEur(x.valor),'ok'):pill('sem valor','warn')}</div></div>`}).join('')||'<p class="muted">Ainda não há verbas.</p>'}</div>`}

/* ---------- processo ---------- */
function vProc(){const p=cur(),P=alP(p);
 const fin=AL_LISTS.proc_finalidade||[],bases=AL_LISTS.proc_base||[],posse=AL_LISTS.proc_posse||[];
 return `<h2>Processo</h2>${blk('A · Processo','Identificação, enquadramento, questões e documentos')}
 ${sec('p1','1 · Dados do processo',`${inp('p.codigo','N_Ref — código interno do processo',p.codigo,'ex.: Ava 2611')}${inp('p.designacao','Designação',p.designacao)}${inp('p.local','Local / morada (geral, se houver)',p.local)}`,{cnt:falta([p.codigo,p.designacao].filter(x=>!String(x||'').trim()).length)})}
 ${relProcHTML(p)}
 ${blk('B · Contexto da avaliação','Finalidade, base de valor, posse e BAD — valem para todas as verbas')}
 ${sec('pctx','Contexto da avaliação',`<label>Finalidade</label><div class="tks sm">${[...fin,'Outra'].map(o=>alTk(P.finalidade===o,esc(o),`data-alact="pset" data-k="finalidade" data-v="${esc(o)}"`)).join('')}</div>${P.finalidade==='Outra'?inp('pal.finalidadeOutra','Finalidade — descrever',P.finalidadeOutra):''}
  <label>Base de valor</label><div class="tks sm">${bases.map(o=>alTk(P.base===o,esc(o),`data-alact="pset" data-k="base" data-v="${esc(o)}"`)).join('')}</div>${P.base==='Valor de renda de mercado'?'<p class="muted">Com renda de mercado, cada verba pede também a renda mensal e o quadro-resumo leva essa coluna.</p>':''}
  <label>Tipo de posse</label><div class="tks sm">${posse.map(o=>alTk(P.posse===o,esc(o),`data-alact="pset" data-k="posse" data-v="${esc(o)}"`)).join('')}</div>
  <label>BAD — benefício económico de adjudicação direta</label><p class="muted" style="margin-top:0">Aplica-se quando algum dos intervenientes manifesta interesse especial em adquirir o ativo: sugere-se uma redução ao valor estimado.</p><div class="seg"><button class="${!P.bad?'on':''}" data-alact="pset" data-k="bad" data-v="0">Não aplicável</button><button class="${P.bad?'on':''}" data-alact="pset" data-k="bad" data-v="1">Aplicável</button></div>${P.bad?inp('pal.badPct','Redução por defeito, até (%)',P.badPct,'10'):''}`,{cnt:falta([P.finalidade,P.base].filter(x=>!x).length)})}
 ${blk('C · Verbas',`${p.anomalias.length} verba(s)`)}<div class="btns"><button class="green" data-act="go" data-v="anom">Ir para as verbas ▶</button></div>
 <div class="btns" style="margin-top:24px"><button class="secondary" data-act="sendProc" data-id="${p.id}">📤 Enviar o processo inteiro</button><button class="del" data-act="delProc">Eliminar processo</button></div>`}

/* ---------- ações ---------- */
function alAnchor(){const hh=($('#hdr')?.getBoundingClientRect().bottom||0)+($('#sub')?.getBoundingClientRect().height||0)+8;const ds=[...document.querySelectorAll('#app details[data-key]')];let best=null;for(const d of ds){const r=d.getBoundingClientRect();if(r.top<=hh+40)best=d;else{if(!best)best=d;break}}return best?{key:best.dataset.key,top:best.getBoundingClientRect().top,open:best.open}:null}
document.addEventListener('click',async e=>{const el=e.target.closest('[data-alact]');if(!el)return;e.preventDefault();e.stopPropagation();const act=el.dataset.alact,p=cur(),a=curA();if(!p)return;
 const keep=async()=>{S.scrollTop=window.scrollY;await saveProc();render()};
 switch(act){
  case 'set':{alA(a);const k=el.dataset.k,v=el.dataset.v;a.al[k]=(k==='modo')?v:(a.al[k]===v?'':v);return keep()}
  case 'tipo':{alA(a);const v=el.dataset.v;if(a.al.tipo===v)return;if(a.al.tipo&&alFam(a)!==(AL_TIPOS.find(t=>t[0]===v)||[])[2]&&(Object.keys(a.al.car).length)&&!await ask('Mudar o tipo de ativo? A caracterização detalhada já registada fica guardada, mas só aparece a do novo tipo.',['Cancelar','Mudar'],1))return;a.al.tipo=v;if(!AL_DEST[alFam(a)].includes(a.al.destino))a.al.destino='';if(!a.al.idTipo||!AL_IDTIPO[alFam(a)].includes(a.al.idTipo))a.al.idTipo=AL_IDTIPO[alFam(a)][0];S.open.v5=true;return keep()}
  case 'car1':{alA(a);const k=el.dataset.k,v=el.dataset.v;a.al.car[k]=a.al.car[k]===v?'':v;return keep()}
  case 'carM':{alA(a);const k=el.dataset.k,v=el.dataset.v;const arr=Array.isArray(a.al.car[k])?a.al.car[k]:[];a.al.car[k]=arr.includes(v)?arr.filter(x=>x!==v):[...arr,v];return keep()}
  case 'met':{alA(a);const v=el.dataset.v;a.al.met[v]=!a.al.met[v];return keep()}
  case 'pset':{const P=alP(p),k=el.dataset.k,v=el.dataset.v;P[k]=k==='bad'?v==='1':(P[k]===v&&k==='finalidade'?'':v);return keep()}
  case 'copyLoc':{const pr=p.anomalias[p.anomalias.indexOf(a)-1];if(!pr)return;alA(a);a.al.morada=pr.al?.morada||'';a.vis.gps=pr.vis?.gps?{...pr.vis.gps}:null;a.vis.map=pr.vis?.map?{...pr.vis.map}:undefined;p.visita=a.vis;toast('Localização copiada.');return keep()}
  case 'copyVis':{const pr=p.anomalias[p.anomalias.indexOf(a)-1];if(!pr)return;a.vis.data=pr.vis?.data||'';a.vis.presencas=pr.vis?.presencas||'';toast('Visita copiada.');return keep()}
  case 'copyCar':{const pr=p.anomalias[p.anomalias.indexOf(a)-1];if(!pr)return;const tem=Object.keys(a.al.car).length||Object.values(a.al.suc).some(v=>String(v||'').trim());if(tem&&!await ask(`Substituir a caracterização desta verba pela da ${alCode(p,pr)}?`,['Cancelar','Substituir'],1))return;a.al.car=clone(pr.al.car||{});a.al.suc=clone(pr.al.suc||{});a.al.modo=pr.al.modo||'det';toast('Caracterização copiada — ajuste o que for diferente.');return keep()}
  case 'step':{const d=+el.dataset.d,L=p.anomalias,nx=L[L.indexOf(a)+d];if(!nx)return;const an=alAnchor();if(dirty)await saveProc();S.aid=nx.id;S.camShots=[];if(an){S.open[an.key]=an.open!==false}S.scrollTop=window.scrollY;render();
   if(an){requestAnimationFrame(()=>{const d2=document.querySelector(`#app details[data-key="${an.key}"]`);if(d2){if(an.open)d2.open=true;window.scrollTo(0,Math.max(0,window.scrollY+d2.getBoundingClientRect().top-an.top))}const t=(AL_SECS.find(s=>s[0]===an.key)||[])[1];toast(`${alCode(p,nx)} (${L.indexOf(nx)+1}/${L.length})${t?' · '+t.replace(/^\d+ · /,''):''}`)})}else window.scrollTo(0,0);return}
  case 'nova':{const na=alNew(p);p.anomalias.push(na);S.aid=na.id;S.view='anom';S.sub='ficha';S.scrollTop=0;S.open.v1=true;await saveProc();render();return}
  case 'del':{const x=p.anomalias.find(y=>y.id===el.dataset.id);if(!x)return;const code=alCode(p,x),nf=(x.fotos||[]).length;
   const seg=p.anomalias.slice(p.anomalias.indexOf(x)+1).filter(y=>!String(y.al?.codigo||'').trim()).map(y=>alCode(p,y));
   if(!await ask(`⚠ ELIMINAR A VERBA ${code}${x.al?.designacao?' — '+x.al.designacao:''}?\n\nVai ser apagado: ${nf} fotografia(s) e a ficha da verba.${seg.length?`\nAs verbas seguintes sem código próprio sobem um número (${seg[0]} → ${code}…).`:''}\nPode desfazer logo a seguir.`,['Cancelar','Eliminar'],1))return;
   if(alTemDados(x)){const r=prompt(`Para confirmar, escreva o código da verba:\n\n${code}`,'');if(r===null)return;if(r.trim().toUpperCase().replace(/\s+/g,'')!==code.toUpperCase().replace(/\s+/g,''))return toast(`Não eliminada: o código não corresponde a ${code}.`,1)}
   removeAnomUndo(p,x);if(S.aid===x.id){S.aid=null;S.sub=null}await saveProc();S.scrollTop=window.scrollY;render();return}
  case 'trocar':{alTrocaModal(p);return}
 }},true);

/* ---------- campos ligados ---------- */
document.addEventListener('input',e=>{const el=e.target,b=el.dataset?.bind;if(!b)return;const [scope,k]=b.split('.');if(!['al','alc','als','pal'].includes(scope))return;e.stopImmediatePropagation();const p=cur(),a=curA();
 if(scope==='pal')alP(p)[k]=el.value;else{alA(a);if(scope==='al')a.al[k]=el.value;else if(scope==='alc')a.al.car[k]=el.value;else a.al.suc[k]=el.value}
 if(typeof autosize==='function')autosize(el);saveProcSoon()},true);

/* ---------- troca por verba (regra sync.md) ---------- */
function alTrocaModal(p){const m=document.createElement('div');m.className='modal';m.innerHTML=`<div class="box"><b style="font-size:17px">Enviar / receber verbas</b><p class="muted">Envie só as verbas escolhidas (com fotos) para continuar noutro aparelho. Ao receber, escolhe verba a verba; as outras verbas e os dados gerais do processo não mudam.</p><div class="btns"><button class="secondary mini" data-x="all">Todas</button><button class="secondary mini" data-x="none">Nenhuma</button></div><div class="allist">${p.anomalias.map(a=>`<label class="tk ${a.id===S.aid?'on':''}"><input type="checkbox" data-vb="${a.id}" ${a.id===S.aid?'checked':''}><span><b>${esc(alCode(p,a))}</b> ${esc(a.al?.designacao||'')} · 📷 ${a.fotos.length}</span></label>`).join('')}</div><div class="btns"><button class="green" data-x="send">📤 Enviar verbas escolhidas</button><label class="btn secondary">📥 Receber verbas<input type="file" accept=".json,application/json" data-x="recv" hidden></label><button class="secondary" data-x="close">Fechar</button></div></div>`;
 m.addEventListener('click',async e=>{const b=e.target.closest('[data-x]');if(e.target===m||b?.dataset.x==='close')return m.remove();if(!b)return;
  if(b.dataset.x==='all'||b.dataset.x==='none'){m.querySelectorAll('[data-vb]').forEach(c=>{c.checked=b.dataset.x==='all';c.closest('.tk').classList.toggle('on',c.checked)});return}
  if(b.dataset.x==='send'){const ids=[...m.querySelectorAll('[data-vb]:checked')].map(c=>c.dataset.vb);if(!ids.length)return toast('Escolha pelo menos uma verba.',1);m.remove();await alEnviarVerbas(p,ids)}});
 m.addEventListener('change',e=>{const c=e.target;if(c.dataset.vb!==undefined)c.closest('.tk').classList.toggle('on',c.checked);if(c.dataset.x==='recv'){const f=c.files[0];m.remove();if(f)f.text().then(t=>alReceber(JSON.parse(t))).catch(err=>toast('Erro: '+err.message,1))}});document.body.appendChild(m)}
async function alEnviarVerbas(p,ids){if(dirty)await saveProc();await loadFotos(p);const V=p.anomalias.filter(a=>ids.includes(a.id));
 const one={...p,anomalias:V.map(a=>({...a,_code:alCode(p,a),fotos:a.fotos.map(f=>({...f,data:fd(f)})),vis:a.vis?.map?{...a.vis,map:{...a.vis.map,data:fotoCache.get(a.vis.map.id)||''}}:a.vis}))};
 const cods=V.map(a=>alCode(p,a));const nm=cods.length<=3?cods.join('-'):`${cods[0]}-a-${cods[cods.length-1]}_${cods.length}verbas`;
 await saveBlob(new Blob([JSON.stringify({app:'AvaLias',kind:'verbas',version:VERSION,date:new Date().toISOString(),procs:[one]})],{type:'application/json'}),`${safeName(p.codigo)}_Verbas_${safeName(nm)}.json`)}
const alHash=a=>{const c=JSON.parse(JSON.stringify({...a,fotos:(a.fotos||[]).map(f=>({id:f.id,legenda:f.legenda,sel:f.sel,rot:f.rot}))}));delete c._code;delete c.updatedAt;const s=JSON.stringify(c);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0).toString(36)};
async function alReceber(d){if(d.app!=='AvaLias'||d.kind!=='verbas'||!d.procs?.[0])throw new Error('Não é um ficheiro de verbas da AvaLias.');const pp=d.procs[0];
 let P=procs.find(x=>x.id===pp.id)||null;
 if(!P){const c=procs.filter(x=>String(x.codigo||'').trim().toLowerCase()===String(pp.codigo||'').trim().toLowerCase()&&pp.codigo);const ch=await ask(`As verbas vêm do processo ${pp.codigo||'(sem código)'}, que não existe com a mesma identificação neste aparelho.`,['Cancelar',...(c.length?[`Juntar ao processo ${c[0].codigo}`]:[]),'Criar processo novo']);if(!ch)return;if(c.length&&ch===1)P=c[0];else{P={...pp,id:uid(),anomalias:[],createdAt:Date.now(),updatedAt:Date.now()};procs.push(P)}}
 const lin=pp.anomalias.map(it=>{const loc=P.anomalias.find(x=>x.id===it.id)||P.anomalias.find(x=>alCode(P,x)===it._code&&!pp.anomalias.some(o=>o.id===x.id));if(!loc)return {it,loc:null,st:'nova'};if(alHash(loc)===alHash({...it,fotos:it.fotos.map(f=>({...f,data:undefined}))}))return {it,loc,st:'igual'};return {it,loc,st:'dif',newer:(it.updatedAt||0)>=(loc.updatedAt||0)}});
 const res=await new Promise(ok=>{const m=document.createElement('div');m.className='modal';m.innerHTML=`<div class="box"><b style="font-size:17px">Receber verbas — ${esc(P.codigo||'')}</b><p class="muted">Só estas verbas mudam. Os dados gerais do processo e as outras verbas ficam como estão.</p>${lin.map((l,i)=>`<div class="card"><b>${esc(l.it._code)}</b> ${esc(l.it.al?.designacao||'')}<div class="muted">${l.st==='nova'?'Nova neste aparelho':l.st==='igual'?'Igual à deste aparelho':'Diferente da deste aparelho'} · recebida: 📷 ${l.it.fotos.length}${l.loc?` · neste aparelho: 📷 ${l.loc.fotos.length}`:''}</div><select data-i="${i}">${(l.st==='nova'?[['add','Acrescentar'],['skip','Não acrescentar']]:l.st==='igual'?[['skip','Igual — nada a fazer']]:[['subst','Substituir pela recebida'],['keep','Manter a deste aparelho'],['both','Manter as duas']]).map(([v,t])=>`<option value="${v}">${t}</option>`).join('')}</select></div>`).join('')}<div class="btns"><button class="green" data-ok>Aplicar</button><button class="secondary" data-no>Cancelar</button></div></div>`;
  m.querySelector('[data-ok]').onclick=()=>{const r=[...m.querySelectorAll('select')].map(s=>s.value);m.remove();ok(r)};m.querySelector('[data-no]').onclick=()=>{m.remove();ok(null)};document.body.appendChild(m)});
 if(!res)return;const acts=lin.map((l,i)=>({...l,a:res[i]})).filter(l=>['add','subst','both'].includes(l.a));if(!acts.length)return toast('Nada foi alterado.');
 const antes=JSON.parse(JSON.stringify(P));
 for(const l of acts){const it=JSON.parse(JSON.stringify(l.it));delete it._code;
  if(l.a==='both'||(l.a==='add'&&P.anomalias.some(x=>x.id===it.id))){it.id=uid();for(const f of it.fotos)f.id=uid();if(it.vis?.map)it.vis.map.id='map_'+it.id;if(l.a==='both'){alA(it);it.al.codigo=(String(l.it.al?.codigo||'').trim()||l.it._code)+'b';it.al.designacao=(it.al.designacao?it.al.designacao+' ':'')+'(recebida)'}}
  for(const f of it.fotos||[]){if(f.data){await fotoPut(f.id,f.data);delete f.data}}
  if(it.vis?.map?.data){try{await fotoPut(it.vis.map.id,it.vis.map.data);fotoCache.set(it.vis.map.id,it.vis.map.data)}catch(_){}delete it.vis.map.data}
  if(l.a==='subst'){it.id=l.loc.id;const k=P.anomalias.indexOf(l.loc);P.anomalias[k]=it}else P.anomalias.push(it)}
 P.updatedAt=Date.now();await dbPut(P);S.pid=P.id;S.view='anom';S.sub=null;
 undoToast(`Verbas recebidas: ${acts.map(l=>l.it._code).join(', ')}`,async()=>{const k=procs.findIndex(x=>x.id===antes.id);if(k>=0)procs[k]=antes;await dbPut(antes);render()},()=>{});render()}

/* ---------- relatório: GPS da capa a partir das verbas; corpo de avaliação ---------- */
function alVisCapa(p){const v=p.anomalias.find(a=>a.vis?.gps)?.vis||p.anomalias.find(a=>a.vis?.data)?.vis||{data:'',presencas:'',gps:null};p.visita=v;return v}
function alCheck(p){const w=[];alP(p);if(!p.al.finalidade)w.push('Processo › Contexto da avaliação: falta a finalidade.');p.anomalias.forEach(a=>{alA(a);const c=alCode(p,a);if(!a.al.tipo)w.push(`${c}: falta o tipo de ativo.`);if(alNum(a.al.valor)==null)w.push(`${c}: falta o valor estimado.`);if(!relF(a).length)w.push(`${c}: sem fotografias no relatório.`)});return w}

function relCheck(p){alVisCapa(p);const w=relCheck_relat(p).filter(x=>!/Data da visita|Sem coordenadas GPS|Processo › 2/.test(x));if(!p.anomalias.some(a=>a.vis?.gps))w.push('Nenhuma verba tem GPS: a capa sai sem mapa — Verbas › 2 · Localização');return [...w,...alCheck(p)]}
function render(){const p=cur();if(p){p.anomalias.forEach(alA);if(S.sub==='ficha'&&curA())p.visita=curA().vis;else alVisCapa(p)}return render_relat()}
/* ecrã Relatório: só o que serve a avaliação (sem os blocos de anomalias do Regi) */
function vRel(){const p=cur();const box=document.createElement('div');box.innerHTML=vRel_relat();
 box.querySelectorAll('.card.chk,details[data-key="r1"],details[data-key="r5"],details[data-key="r2"],details[data-key="r3"],details[data-key="r4"],details[data-key="rr2"]').forEach(e=>e.remove());
 const V=p.anomalias,tot=V.reduce((s,a)=>s+(alNum(a.al?.valor)||0),0),nf=V.reduce((s,a)=>s+relF(a).length,0);
 const b=box.querySelector('.blk');if(b)b.outerHTML=blk('Resultado',`${V.length} verba(s) · ${V.filter(alFeita).length} com tipo e fotos/valor · ${nf} foto(s)${tot?' · total '+alEur(tot):''}`);
 box.insertAdjacentHTML('beforeend',sec('rf','Fotografias e tamanho dos documentos',maxUI().replace('cada anomalia','cada verba')+tamHTML(p)));
 return box.innerHTML}
