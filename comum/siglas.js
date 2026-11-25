/* @comum:siglas v1.0 — Biblioteca de siglas comum às apps (periText, AvaLias, ExPropria…). Cada sigla: [sigla, significado, grupo]. Maiúsculas/minúsculas contam (Abp ≠ ABP). Siglas com mais de um significado (AT) ficam com o sentido do grupo onde o texto as usa; por defeito, o 1.º. Regra: docs/regras/siglas.md */
const SIGLAS_GR=['Tipos de ativo','Documentos e fontes','Áreas e quantidades','Informação','Análise e valor','Outras'];
const SIGLAS=[
 ['MOR','Moradia','Tipos de ativo'],['FRH','Fração habitacional','Tipos de ativo'],['CSV','Comércio ou serviços','Tipos de ativo'],['PAV','Pavilhão','Tipos de ativo'],
 ['AMZ','Armazém','Tipos de ativo'],['CPP','Construções de pequeno porte','Tipos de ativo'],['MUV','Muros e vedações','Tipos de ativo'],['BFT','Benfeitorias','Tipos de ativo'],
 ['TAC','Terreno apto para construção','Tipos de ativo'],['TOF','Terreno para outras finalidades (não edificativas)','Tipos de ativo'],['VEI','Veículos','Tipos de ativo'],['MEQ','Máquinas e equipamentos','Tipos de ativo'],
 ['MOB','Mobiliário','Tipos de ativo'],['SEP','Sepulturas','Tipos de ativo'],['OTS','Outras situações','Tipos de ativo'],
 ['CDP','Caderneta predial','Documentos e fontes'],['CRP','Certidão de registo predial','Documentos e fontes'],['BUPI','Balcão Único do Prédio','Documentos e fontes'],['LVT','Levantamento topográfico','Documentos e fontes'],
 ['PLA','Plantas','Documentos e fontes'],['MdE','Medição expedita','Documentos e fontes'],['FTH','Ficha técnica da habitação','Documentos e fontes'],['CEN','Certificado energético','Documentos e fontes'],
 ['AUT','Autorização de utilização','Documentos e fontes'],['PRJ','Projeto','Documentos e fontes'],['IMI','Imposto Municipal sobre Imóveis','Documentos e fontes'],['ETAR','Estação de tratamento de águas residuais','Documentos e fontes'],
 ['AT','Área de terreno','Áreas e quantidades'],['AI','Área de implantação','Áreas e quantidades'],['Abp','Área bruta privativa','Áreas e quantidades'],['Abd','Área bruta dependente','Áreas e quantidades'],
 ['SC','Superfície coberta','Áreas e quantidades'],['SD','Superfície descoberta','Áreas e quantidades'],['QTD','Quantidade','Áreas e quantidades'],
 ['NID','Não identificado','Informação'],['NDT','Não detetado','Informação'],['NTT','Não testado','Informação'],['NFN','Não fornecido','Informação'],['NAP','Não aplicável','Informação'],
 ['HABU','Máxima e melhor utilização (Highest and Best Use)','Análise e valor'],['UC','Uso continuado','Análise e valor'],['UA','Uso alternativo','Análise e valor'],['VT','Valor do terreno','Análise e valor'],
 ['VED','Valor do edificado depreciado','Análise e valor'],['PE','Pressuposto especial','Análise e valor'],['BAD','Benefício económico de adjudicação direta','Análise e valor'],['ESG','Ambiente, social e governação','Análise e valor'],
 ['IFRS13','Norma internacional de relato financeiro 13 – justo valor','Análise e valor'],
 ['IS','Instalação sanitária','Outras'],['AQS','Águas quentes sanitárias','Outras'],['GPS','Coordenadas geográficas','Outras'],['CMVM','Comissão do Mercado de Valores Mobiliários','Outras'],
 ['AT','Autoridade Tributária e Aduaneira','Outras']];
/* significado(s) de uma sigla (pode haver mais de um: AT) */
const siglaDe=s=>SIGLAS.filter(x=>x[0]===s).map(x=>x[1]);
/* siglas da biblioteca que aparecem num texto (palavra inteira; PE1, PE2… contam como PE; VB_001 não conta) */
function siglasUsadas(txt){const t=String(txt||''),out=[];const seen=new Set();
 for(const [s] of SIGLAS){if(seen.has(s))continue;const re=new RegExp('(^|[^A-Za-zÀ-ÿ0-9_])'+s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(\\d{0,3})(?![A-Za-zÀ-ÿ_])');if(re.test(t)){seen.add(s);out.push(s)}}return out}
/* candidatas a sigla que não estão na biblioteca (2–6 maiúsculas/dígitos, começa por letra) */
function siglasDesconhecidas(txt){const known=new Set(SIGLAS.map(x=>x[0]));const ign=new Set(['N_REF','UTM','PDM','REN','RAN','CE','N.º','EN','IC','IP','A','II','III','IV','VI','VII','VIII','IX','XI','XII']);
 return [...new Set((String(txt||'').match(/\b[A-Z][A-Z0-9]{1,5}\b/g)||[]))].filter(s=>!known.has(s)&&!ign.has(s)&&!/^[IVXLC]+$/.test(s))}
/* linhas para a «Lista de siglas» do relatório: só as usadas, por ordem alfabética */
/* sigla com mais de um significado: fica o que o texto também escreve por extenso; senão, o 1.º */
const siglasLista=txt=>siglasUsadas(txt).sort((a,b)=>a.localeCompare(b,'pt')).map(s=>{const M=siglaDe(s);return [s,M.find(m=>String(txt).toLowerCase().includes(m.toLowerCase()))||M[0]]});
/* @fim:siglas */
