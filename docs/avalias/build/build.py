import re,sys,os,shutil
B='/tmp/claude-0/-home-claude/5e22659e-6bdd-51f5-85a1-6ff68b89cf41/scratchpad/avalias/'
G='/home/claude/gps_maps/'
VER,VDATA=sys.argv[1],sys.argv[2]
s=open(G+'relat/index.html').read()
def rep(o,n,c=1):
    global s;k=s.count(o);assert (k==c if c else k>=1),(k,o[:100]);s=s.replace(o,n)
# ---- marca ----
rep("const DB_NAME='RelatAnomalias_DB'","const DB_NAME='AvaLias_DB'")
s=re.sub(r"const VERSION='[^']+'",f"const VERSION='{VER}'",s)
s=re.sub(r"const VERSION_DATA='[^']+'",f"const VERSION_DATA='{VDATA}'",s)
s=s.replace('Relatório de Peritagem','AvaLias').replace('content="Rel. Peritagem"','content="AvaLias"')
s=s.replace("app:'RelatAnomalias'","app:'AvaLias'")
rep("if(!['RelatAnomalias','RegiAnomalias'].includes(d.app)||!Array.isArray(d.procs))throw new Error('Ficheiro não é uma cópia desta app');",
    "if(d.app==='AvaLias'&&d.kind==='verbas'){await alReceber(d);return}if(!['AvaLias'].includes(d.app)||!Array.isArray(d.procs))throw new Error('Ficheiro não é uma cópia desta app');")
s=s.replace("_Processo_Relat.json","_Processo_AvaLias.json")
rep('<meta name="theme-color" content="#E3AE1F">','<meta name="theme-color" content="#34383d">')
rep(":root{--pri:#E3AE1F;--pri2:#E3AE1F;--priTx:#6b4f00;--bg:#f7f4ea;--line:#e2d9bf}",
    ":root{--pri:#c2540f;--pri2:#c2540f;--priTx:#9a3d06;--bg:#f1eeeb;--line:#ddd7d1}#hdr{background:#34383d!important;color:#fff!important;border-bottom:3px solid #f28c28}#hdr .ver,#hdr .crumbs{color:#e9e6e3}#hdr .mini{background:#4a4f55;color:#fff;border-color:#4a4f55}#hdr .mini.on{background:#f28c28;color:#202b36;border-color:#f28c28}.secondary,button.sm,.btn:not(.green){border-color:#e3b08a}.algrp{margin:16px 0 4px;font-weight:700;color:#9a3d06;border-bottom:1px solid #ddd7d1;padding-bottom:3px}.vbpos{display:block;font-size:11.5px;font-weight:600;color:var(--mute)}.row2{display:grid;grid-template-columns:1fr 1fr;gap:0 10px}@media(max-width:520px){.row2{grid-template-columns:1fr}}.alcard{position:relative;padding-right:58px}.aldel{position:absolute;right:8px;bottom:10px;width:40px;min-height:36px;padding:0;border-radius:9px;background:#fff;color:#c62828;border:1.5px solid #e3a19c;font-size:17px}.allist{max-height:300px;overflow:auto;margin:8px 0}.tks.sm .tk{font-size:13.5px}")
# ---- funções substituídas pela AvaLias ----
rep("function vFicha(){","function vFicha_relat(){")
rep("function vAnoms(){","function vAnoms_relat(){")
rep("function vProc(){","function vProc_relat(){")
rep("function relCheck(p){","function relCheck_relat(p){")
rep("function render(){","function render_relat(){")
rep("function vRel(){","function vRel_relat(){")
s=s.replace("'R3 · Objeto da perícia — '+QW[1]","'R3 · Questões colocadas ao(s) perito(s)'")
s=s.replace('Data e «Compareceram» vêm de «2 · Vistoria».','A data e as presenças registam-se em cada verba (3 · Visita).')
s=re.sub(r"const anCode=\(p,a\)=>`\$\{parteSig\(p,parteOf\(p,a\)\)\}\.\$\{String\(numOf\(p,a\)\)\.padStart\(3,'0'\)\}`;","const anCode=(p,a)=>alCode(p,a);",s,count=1)
assert "const anCode=(p,a)=>alCode(p,a);" in s
s=re.sub(r"const isDone=a=>\{const p=cur\(\);return Object\.entries\(a\.vals\|\|\{\}\)\.some\(\(\[k,v\]\)=>useK\(p,k\)&&\(Array\.isArray\(v\)\?v\.length:v\)\)\|\|a\.fotos\.length>0\};","const isDone=a=>alFeita(a);",s,count=1)
assert "const isDone=a=>alFeita(a);" in s
rep("[['proc','Processo'],['anom','Anomalias'],['rel','Relatório']]","[['proc','Processo'],['anom','Verbas'],['rel','Relatório']]")
rep("case 'newProc':{const np=newProc();procs.push(np);",
    "case 'newProc':{const nq=prompt('Quantas verbas tem este processo?\\n\\nSão criadas já as fichas VB_001, VB_002… (o código de cada verba pode ser alterado). Pode acrescentar mais depois com «+ Nova verba».\\n\\n0 = criar as verbas mais tarde.','1');if(nq===null)return;const np=newProc();np.funcao='Avaliação';alP(np);for(let i=0;i<Math.max(0,Math.min(300,parseInt(nq,10)||0));i++)np.anomalias.push(alNew(np));procs.push(np);")
s=s.replace("funcao:'Peritagem'","funcao:'Avaliação'")
rep("async function buildRelat(p){ensureRel(p);","async function buildRelat(p){ensureRel(p);alVisCapa(p);p.anomalias.forEach(alA);")
# listas de documentos e anexos (das fontes de informação do AVA_Input)
s=re.sub(r"const DOCS_R=\[[^\]]*\];","const DOCS_R=['Questões colocadas ao(s) perito(s)','Cadernetas prediais','Certidões de registo predial','Plantas','Levantamento topográfico','BUPi','Licença de utilização','Certificado energético','Documento único automóvel (DUA) / certificado de matrícula','Inventário / rol de bens','Alvará de concessão (sepultura)','Outros'];",s,count=1)
s=re.sub(r"const ANEX_R=\[[^\]]*\];","const ANEX_R=['Plantas','Levantamento topográfico','Cadernetas prediais','Certidões de registo predial','Fichas de caracterização','Outros'];",s,count=1)
rep("body+=H1('Objeto da perícia')","body+=H1('Objeto da avaliação')")
rep("const ip=(runs,jc)=>`<w:p><w:pPr><w:spacing","const ip=(runs,jc)=>`<w:p><w:pPr><w:pStyle w:val=\"1-periTextogeral\"/><w:spacing")
rep("const cpara=runs=>`<w:p><w:pPr><w:spacing","const cpara=runs=>`<w:p><w:pPr><w:pStyle w:val=\"1-periTextogeral\"/><w:spacing")
# ---- corpo do relatório: visitas, contexto, valor (quadro-resumo + BAD), análise de cada verba ----
i=s.index("  body+=E()+H1('Da visita ao local')");j=s.index("  // 7 — resposta ao solicitado")
s=s[:i]+open(B+'body.js').read()+s[j:]
# ---- código da AvaLias ----
ext=open(B+'lists.js').read()+open(B+'avalias_ext.js').read()
anchor="document.addEventListener('click',async e=>{\n  const el=e.target.closest('[data-act]');"
rep(anchor,ext+"\n"+anchor)
os.makedirs(G+'avalias',exist_ok=True)
open(G+'avalias/index.html','w').write(s)
for f in ['icon-180.png','icon-192.png','icon-512.png']:shutil.copy(B+f,G+'avalias/'+f)
sw=open(G+'relat/sw.js').read()
sw=re.sub(r"const CACHE *= *'[^']+'","const CACHE = 'avalias-v1'",sw).replace('Relatório de Peritagem','AvaLias').replace('Relat_Anomalias','AvaLias')
open(G+'avalias/sw.js','w').write(sw)
open(G+'avalias/manifest.webmanifest','w').write('''{
  "name": "AvaLias",
  "short_name": "AvaLias",
  "description": "Avaliação de ativos — processo, verbas, fotografias, valor e relatório Word/PDF",
  "lang": "pt-PT",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#f1eeeb",
  "theme_color": "#34383d",
  "icons": [
    { "src": "icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" }
  ]
}
''')
print('ok',len(s))
