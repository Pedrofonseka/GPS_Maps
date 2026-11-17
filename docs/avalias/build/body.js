  // ---- AvaLias: contexto, visitas, valor estimado (quadro-resumo + BAD) e análise de cada verba ----
  {const AP=alP(p),V=p.anomalias;V.forEach(alA);const TWb=9638,renda=AP.base==='Valor de renda de mercado',bad=!!AP.bad;
   const B4='<w:tblBorders>'+['top','left','bottom','right','insideH','insideV'].map(k=>`<w:${k} w:val="single" w:sz="4" w:space="0" w:color="808080"/>`).join('')+'</w:tblBorders>';
   const tc=(t,w,o={})=>`<w:tc><w:tcPr><w:tcW w:w="${w}" w:type="dxa"/>${o.span?`<w:gridSpan w:val="${o.span}"/>`:''}${o.fill?`<w:shd w:val="clear" w:color="auto" w:fill="${o.fill}"/>`:''}<w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:pStyle w:val="1-periTextogeral"/><w:spacing w:before="30" w:after="30"/><w:jc w:val="${o.jc||'left'}"/></w:pPr>${R(t,{b:o.b,sz:o.sz||9})}</w:p></w:tc>`;
   const tbl=(W,rows,bd=true)=>`<w:tbl><w:tblPr><w:tblW w:w="${W.reduce((x,y)=>x+y,0)}" w:type="dxa"/>${bd?B4:`<w:tblBorders>${['top','left','bottom','right','insideH','insideV'].map(k=>`<w:${k} w:val="nil"/>`).join('')}</w:tblBorders>`}<w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="70" w:type="dxa"/><w:right w:w="70" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>${W.map(w=>`<w:gridCol w:w="${w}"/>`).join('')}</w:tblGrid>${rows}</w:tbl>`;
   const tr=(cells,hdr)=>`<w:tr><w:trPr><w:cantSplit/>${hdr?'<w:tblHeader/>':''}</w:trPr>${cells}</w:tr>`;
   const KV=(l,v)=>`<w:p><w:pPr><w:pStyle w:val="1-periTextogeral"/><w:tabs><w:tab w:val="left" w:pos="2268"/></w:tabs></w:pPr>${R(l,{b:true})}<w:r><w:tab/></w:r>${R(v||'—')}</w:p>`;
   // contexto da avaliação
   body+=E()+H1('Contexto da avaliação')+E();
   body+=KV('Finalidade:',AP.finalidade==='Outra'?AP.finalidadeOutra:AP.finalidade)+KV('Base de valor:',AP.base)+KV('Tipo de posse:',AP.posse)+KV('Verbas:',String(V.length));
   // visitas
   body+=E()+H1('Da visita aos locais')+E();
   const Wv=[1300,1500,TWb-2800];
   body+=tbl(Wv,tr(tc('Verba',Wv[0],{b:1,fill:'D9D9D9'})+tc('Data',Wv[1],{b:1,fill:'D9D9D9'})+tc('Presenças',Wv[2],{b:1,fill:'D9D9D9'}),1)+V.map(a=>tr(tc(alCode(p,a),Wv[0])+tc(a.vis?.data||'—',Wv[1])+tc(String(a.vis?.presencas||'').trim()||'—',Wv[2]))).join(''));
   body+=H2('Decurso das diligências')+T(String(r.decurso||'').trim()||'Com o acompanhamento dos presentes, foram visitados os ativos identificados, para os caracterizar e recolher o levantamento fotográfico.',{jc:'both'});
   body+=H2('Constrangimentos, impedimentos ou dúvidas relevantes')+T(String(r.constrang||'').trim()||'Nada a considerar.')+E();
   // valor estimado — quadro-resumo
   body+=H1('Valor estimado')+E()+T('Em face do exposto, de acordo com a caraterização, abordagem e critérios:')+E();
   const cV=1100,cT=2900,cVal=1500,cR=renda?1300:0,cB=bad?950:0,cD=TWb-cV-cT-cVal-cR-cB;const W=[cV,cD,cT,cVal,...(renda?[cR]:[]),...(bad?[cB]:[])];
   const H=['Verba','Designação','Tipo','Valor estimado',...(renda?['Renda mensal']:[]),...(bad?['BAD (até)']:[])];
   let rows=tr(H.map((h,k)=>tc(h,W[k],{b:1,fill:'D9D9D9',jc:k>=3?'center':''})).join(''),1);let tot=0,totR=0;
   for(const a of V){const x=a.al,v=alNum(x.valor),rr=alNum(x.renda);if(v!=null)tot+=v;if(rr!=null)totR+=rr;
    rows+=tr([alCode(p,a),x.designacao||String(a.descricao||'').split('\n')[0].slice(0,80),[alTipoNome(a),alDestTxt(a)].filter(Boolean).join(' · '),v!=null?alEur(v):'—',...(renda?[rr!=null?alEur(rr)+'/mês':'—']:[]),...(bad?[`${String(x.bad||'').trim()||AP.badPct||10}%`]:[])].map((t,k)=>tc(t,W[k],{jc:k>=3?'center':''})).join(''))}
   rows+=tr([tc('Total apurado',cV+cD+cT,{b:1,span:3,fill:'F2F2F2'}),tc(alEur(tot)||'—',cVal,{b:1,jc:'center',fill:'F2F2F2'}),...(renda?[tc(totR?alEur(totR)+'/mês':'—',cR,{b:1,jc:'center',fill:'F2F2F2'})]:[]),...(bad?[tc('',cB,{fill:'F2F2F2'})]:[])].join(''));
   body+=tbl(W,rows);
   body+=H2('Considerações sobre o valor estimado')+E();for(const t of AL_N)body+=T(t,{jc:'both'});
   if(bad){body+=E();for(const t of AL_BAD)body+=T(t,{jc:'both'});body+=E();body+=P(R('Nota:',{b:true}),{bdrT:1})+T(`Havendo especial interesse de algum dos intervenientes, considera-se aplicável o conceito de BAD – Benefício económico de adjudicação direta – sugerindo-se uma redução de valor até à percentagem indicada no quadro, para cada verba.`,{jc:'both'})}
   // análise específica de cada verba
   body+=E()+H1('Análise específica de cada verba');
   const L1=2700,L2=TWb-L1;const krow=(l,v)=>String(v??'').trim()?tr(tc(l,L1,{b:1,fill:'F2F2F2'})+tc(v,L2)):'';
   for(const a of V){const x=a.al,fam=alFam(a),g=a.vis?.gps;
    body+=H2(`${alCode(p,a)}${x.designacao?' – '+x.designacao:''}`)+E();
    let kr='';
    kr+=krow('Identificação',[x.idTipo,x.idValor].filter(s=>String(s||'').trim()).join(': '));
    kr+=krow('Descrição sumária',a.descricao);
    kr+=krow('Localização',[x.morada,g?`GPS ${g.lat.toFixed(6)}°, ${g.lon.toFixed(6)}°`:''].filter(Boolean).join('\n'));
    kr+=krow('Visita',[a.vis?.data,String(a.vis?.presencas||'').trim()?'Presenças: '+a.vis.presencas:''].filter(Boolean).join('\n'));
    kr+=krow('Tipo de ativo',alTipoNome(a));kr+=krow('Destino',alDestTxt(a));
    if(fam){if(x.modo==='suc')for(const [k,l] of AL_SUC[fam])kr+=krow(l,x.suc[k]);
     else for(const f of AL_CAR[fam]){if(f[0]==='g')continue;const v=x.car[f[0]];kr+=krow(f[1],Array.isArray(v)?v.map(alOpt).join(', '):(f[2]==='c'?alOpt(v):v))}}
    kr+=krow('Utilidade',[x.atr?'Atratividade: '+x.atr:'',x.util].filter(s=>String(s||'').trim()).join('\n'));
    kr+=krow('Métodos elegíveis',[Object.keys(x.met||{}).filter(k=>x.met[k]).join(', '),x.metTxt].filter(s=>String(s||'').trim()).join('\n'));
    kr+=krow('Valor estimado',[alNum(x.valor)!=null?alEur(x.valor):'',renda&&alNum(x.renda)!=null?'Renda mensal: '+alEur(x.renda)+'/mês':'',bad?`BAD: redução até ${String(x.bad||'').trim()||AP.badPct||10}%`:'',x.valObs].filter(s=>String(s||'').trim()).join('\n'));
    if(kr)body+=tbl([L1,L2],kr)+E();
    const F=relF(a).filter(f=>fd(f));if(F.length){body+=P(R('Levantamento fotográfico',{b:true}),{keep:1,sp:[120,60]});const CW2=Math.floor(TWb/2);let pr='';
     for(let k=0;k<F.length;k+=2){let cells='',caps='';for(let c=0;c<2;c++){const f=F[k+c],i=k+c;cells+=`<w:tc><w:tcPr><w:tcW w:w="${CW2}" w:type="dxa"/></w:tcPr><w:p><w:pPr><w:pStyle w:val="1-periTextogeral"/><w:keepNext/><w:spacing w:before="40" w:after="0"/><w:jc w:val="center"/></w:pPr>${f?imgRun(await cropTo(fd(f),4/3,1000),8.0,6.0,'Foto'):''}</w:p></w:tc>`;caps+=`<w:tc><w:tcPr><w:tcW w:w="${CW2}" w:type="dxa"/></w:tcPr><w:p><w:pPr><w:pStyle w:val="1-periTextogeral"/><w:spacing w:before="20" w:after="80"/><w:jc w:val="center"/></w:pPr>${f?R(`${imgCode(p,a,i)}${f.legenda?' – '+f.legenda:''}`,{i:true,sz:8}):''}</w:p></w:tc>`}
      pr+=`<w:tr><w:trPr><w:cantSplit/></w:trPr>${cells}</w:tr><w:tr><w:trPr><w:cantSplit/></w:trPr>${caps}</w:tr>`}
     body+=tbl([CW2,TWb-CW2],pr,false)+E()}}}
