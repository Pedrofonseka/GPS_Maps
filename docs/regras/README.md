# Biblioteca de regras — apps PFK

Regras e modelos comuns às apps HTML (Regi Anomalias, ExPropria, FullTopics, Revip, …).
Cada ficheiro descreve **uma rotina**: o que faz, o modelo de dados, a interface, as saídas e os testes.
Ao melhorar uma rotina numa app, atualizar o ficheiro respetivo e a tabela «Onde está aplicada».

| Rotina | Ficheiro | Versão |
|---|---|---|
| Fotografias (reserva, substituir, repetidas) | [fotos.md](fotos.md) | 1.0 |
| Backup e troca entre aparelhos em 3 níveis (geral / processo / unidade) | [sync.md](sync.md) | 1.0 |
| Máximo de fotos e tamanho previsto / resolução de saída | [tamanho.md](tamanho.md) | 1.0 |
| Imagens no Word: controlo de conteúdo «Imagem» (troca com um clique) | ver abaixo | 1.0 |
| Word válido: ordem do `w:pPr` e ZIP sem entradas de pasta | ver abaixo | 1.0 |
| Service worker: cada app só apaga as suas reservas | ver abaixo | 1.0 |
| Criar processo: pedir o n.º de unidades (parcelas/verbas) | ver abaixo | 1.0 |
| Navegar entre unidades sem sair da secção | ver abaixo | 1.0 |
| Nome do ficheiro no rodapé como campo FILENAME | ver abaixo | 1.0 |
| Verificação de gralhas e coerência (Word gerado e importado) | [verificacao.md](verificacao.md) | 1.0 |
| Cálculos no Word como folha de cálculo embutida (editável) | [folhas_word.md](folhas_word.md) | 1.0 |
| Marcas nas fotografias (setas, círculos, letras, texto, balões) | [marcas_fotos.md](marcas_fotos.md) | 1.0 |
| Relatórios Word dos gabinetes: cabeçalho a 0,7 cm, fontes do gabinete, títulos sem avanço | ver abaixo | 1.0 |
| Prioridade GUT (Gravidade × Urgência × Tendência) | ver abaixo | 1.0 |
| Revisão do texto antes de exportar (gralhas, ortografia pt-PT, redundâncias, coerência) | ver abaixo | 1.0 |
| Apoio de análise de fotografias por IA (sugestão, opcional) | ver abaixo | 1.1 |

### Imagens no Word — controlo de conteúdo
Cada imagem gerada para Word vai dentro de um controlo de conteúdo de imagem (`<w:sdt><w:sdtPr><w:alias w:val="Imagem"/><w:id/><w:picture/></w:sdtPr><w:sdtContent>…run com w:drawing…</w:sdtContent></w:sdt>`), para que no Word um clique sobre a imagem permita trocá-la. Aplicado em: Relat_Anomalias 1.0.0; AVA_Input 2.88 (no `JSZip.generateAsync`, para todos os .docx); ExPropria 0.13.6 (passagem final `picSdtAll` antes de gravar: envolve todas as imagens inline sozinhas no parágrafo que ainda não estejam num controlo; id único por controlo).

## Versão e data na régua

Cada app mostra na régua (cabeçalho) a versão **e a data da release**, ex.: `v0.13.6 · 15/11/2026`.
- No código: `const VERSION='x.y.z';const VERSION_DATA='AAAA-MM-DD';` (no X-Topics: `APP_VER` / `APP_VER_DATA`).
- Sempre que se muda `VERSION`, muda-se também `VERSION_DATA` para a data do dia da publicação.
- Mostrar em pt-PT: `VERSION_DATA.split('-').reverse().join('/')`.
- Aplicado em: AVA_Input 2.89, ExPropria 0.13.6, Relatório de Peritagem 1.3.2, Regi Anomalias 0.16.8, FullTopics 1.07, Revip 1.02, X-Topics 3.88.0.

## Word válido — ordem do `w:pPr` e ZIP sem pastas

- O Word recusa («conteúdo ilegível») parágrafos com os filhos de `w:pPr` fora da ordem do esquema (ex.: `w:pBdr` depois de `w:tabs` nos cabeçalhos). Ordem: pStyle, keepNext, keepLines, pageBreakBefore, framePr, widowControl, numPr, suppressLineNumbers, pBdr, shd, tabs, suppressAutoHyphens, kinsoku, wordWrap, overflowPunct, topLinePunct, autoSpaceDE, autoSpaceDN, bidi, adjustRightInd, snapToGrid, spacing, ind, contextualSpacing, mirrorIndents, suppressOverlap, jc, textDirection, textAlignment, textboxTightWrap, outlineLvl, divId, cnfStyle, rPr, sectPr, pPrChange.
- Ficheiros Office (.docx/.xlsx) sem entradas de pasta no ZIP (`word/`, `word/media/`…): o OneDrive/SharePoint pode não os abrir.
- Forma usada: passagem final antes de gravar (no AVA_Input, dentro do `JSZip.prototype.generateAsync`) que reordena o `w:pPr` em document/header/footer e retira as entradas de pasta quando o ZIP tem `[Content_Types].xml`.
- Teste: validador OOXML («All validations PASSED»). Aplicado em: AVA_Input 2.88.

## Service worker — cada app só apaga as suas reservas

- Todas as apps estão no mesmo endereço (pedrofonseka.github.io), por isso partilham o armazenamento de reservas (Cache Storage).
- No `activate`, apagar só as reservas antigas **da própria app**: `ks.filter(k => k !== CACHE && k.startsWith(CACHE.replace(/-v\d+$/, '')))`. Antes, cada app apagava as reservas das outras, e estas deixavam de abrir sem rede até voltarem a ser abertas com rede.
- Aplicado em (16/11/2026): ExPropria, Relatório de Peritagem, Regi Anomalias, FullTopics, Revip, AVA_Input.

## Criar processo — pedir o n.º de unidades

- Ao criar um processo, a app pergunta quantas unidades tem (ExPropria: parcelas; AVA_Input: verbas) e cria logo as fichas 1…n (ordem interna), com a designação oficial em campo próprio (ExPropria «P 703»; AVA_Input VB_001…, editável). 0 = criar mais tarde. O botão «＋ Nova …» mantém-se.
- Aplicado em: ExPropria 0.13.4, AVA_Input 2.88.

## Navegar entre unidades sem sair da secção

- Setas ◀ ▶ junto ao nome da unidade (parcela/verba), com a posição «k/N», e também na barra do fundo (AVA_Input).
- Ao mudar de unidade, a app fica **na mesma secção** (ex.: Fotografias da VB_001 → Fotografias da VB_002), à mesma altura do ecrã, e mostra um aviso curto «VB_002 (2/4) · Fotografias». Serve para introduzir o mesmo tipo de dados em várias unidades seguidas.
- AVA_Input: `avaVbAnchor()` identifica a secção visível (data-avasec ou título do `details`) e `avaVbGo(±1)` muda de verba e repõe a secção (aberta/fechada) e a posição.
- Aplicado em: ExPropria 0.13.4 (separadores processo/parcela), AVA_Input 2.89.

## Nome do ficheiro no rodapé — campo FILENAME

- No Word, o nome do ficheiro no rodapé é o campo `FILENAME` (com o nome no resultado guardado), para se atualizar sozinho se o ficheiro for renomeado (ex.: …_1.01VF.docx).
- Não envolver duas vezes: ignorar parágrafos que já têm um `instrText` FILENAME (o mesmo .docx pode passar mais de uma vez pelo pós-processamento).
- Aplicado em: Relatório de Peritagem 1.0, AVA_Input 2.89.

## Relatórios Word dos gabinetes — página, fontes e títulos

- **Margem do limite superior da folha ao cabeçalho = 0,7 cm** (`w:pgMar w:header="397"`), igual para todos os gabinetes (Proficis, Peritava, pfk, NID). Restantes margens do modelo: sup. 4 cm, inf. 1,5 cm, esq. 2,5 cm, dir. 1,5 cm, rodapé 0,5 cm.
- **Não alterar as fontes definidas para os gabinetes** (regra geral). Texto gerado pela app que entre no corpo do relatório sem estilo próprio (ex.: análise específica e resumo estatístico vindos do Regi) recebe o estilo de texto do modelo (`1-periTextogeral`), para herdar a fonte do gabinete; dentro de tabelas acrescenta-se `w:shd` sem preenchimento, para não tapar o fundo das células.
- **Resumo de análise — ordem dos quadros** (Relatório de Peritagem): Quantidade de situações → Tipo de situações → Relevância (quadro-resumo de prioridades; a seguir, Prioridade GUT se usada) → Gravidade → Urgência → Local (NUF / Piso / Local / Elemento). Cada quadro pode ser desligado por processo; a ordem é fixa (`RESUMO_ORD`).
- **Relatório particular — sem repetições** (Relatório de Peritagem 1.14): as situações apresentam-se no 1. Objeto da perícia (1.1 Colocadas pelo solicitante = lista das situações alegadas, seguida das questões escritas à mão; 1.2 Outras questões ou situações = constatadas pelo perito ou texto livre). Não há capítulo «Situações a analisar» nem «Apreciação das queixas» (as situações já são comentadas na Análise específica); respostas antigas nesse campo dão aviso na verificação antes de gerar. Tribunal mantém «Situações a analisar» e «Resposta ao solicitado».
- **Fases e cores do preenchimento** (Relatório de Peritagem 1.15, modelo «Per_Anomalias_MM_2611_01»): o ecrã segue a ordem do relatório e cada bloco tem a cor do tipo de texto — 🟩 verde = texto introdutório por defeito (editável, com «repor»); 🟨 amarelo = classificação por ticks (+ texto complementar); 🟫 castanho = texto livre. No Word, se a introdução não acabar em «:», o texto livre continua a mesma frase (1.ª letra passa a minúscula); se acabar em «:», sai em parágrafo próprio. Textos por defeito: objeto «Em função do que é solicitado, o presente relatório pretende», forma de inspeção «A inspeção foi realizada com recurso a:» + ticks e «Para efeitos de análise e caraterização, foram percorridos» + texto, contextualização «Trata-se de», causas «Tendo em atenção a configuração das situações e os locais onde se manifestam, interpreta-se que:», consequências «Sem prejuízo de outras considerações subsequentes…, configura:», passos «Sem prejuízo de outras recomendações…, nesta fase, sugere-se:». Particular: «1. Objeto de análise» (1.1 Pelo solicitante, 1.2 Por outros) e «4. Situações a analisar» (a análise específica).
- **Anexos dentro do Word** (Relatório de Peritagem 1.16): «📄 Anexar documento» (planta, certidão… PDF ou outro) e «🖼️ Anexar imagens». Ao juntar, a app pergunta a largura no Word (por defeito 19 cm = largura da página − 2 cm), editável depois em cada anexo. PDF → páginas JPEG (pdf.js, carregado só quando preciso, em `relat/pdfjs/`); imagens → rotina das fotografias (`compressImage`, mínimo 400 KB para leitura em página inteira). No Word: depois da lista «Em anexo», cada anexo em página nova com o título «Anexo 01 – Tipo: descrição» e as páginas centradas na página; se a página for alta demais, reduz para caber (máx. 22,5 cm). Outros formatos (docx, xlsx, dwg…) ficam só na lista e na pasta ZIP. O original vai sempre para a pasta ZIP.
- **Títulos de nível 1, 2 e 3 sem avanço**: começam na margem esquerda (`w:ind w:left="0" w:firstLine="0"`), com o texto depois do número numa tabulação a 1 cm. Aplica-se no parágrafo, no estilo (Cabeçalho 1–3) e nos níveis de numeração ligados a esses estilos.
- Frases comuns de articulação (ex.: «De acordo com o solicitado, pretende-se:», «De acordo com a análise específica, temos:», «Sob pena de outras considerações…, configuram:», «Sem prejuízo de outras recomendações…, sugere-se:») ficam como texto predefinido **editável por processo**.
- **Logótipo/cabeçalho do gabinete**: copiado tal como está no Word do gabinete, com as fontes de cada parte do texto (ex.: Peritava — «perit_Ava» e o e-mail em Bookman Old Style, a linha «peritagem de engenharia…» em Calibri 10). Nunca deixar partes do logótipo sem fonte explícita, porque herdariam a fonte do modelo do relatório.
- Aplicado em: Relatório de Peritagem 1.7.0 (logótipo Peritava corrigido na 1.8.0).

## Prioridade GUT (Gravidade × Urgência × Tendência)

- Campo da grelha (`type:'gut'`), desligado por defeito: só entra se for marcado em «Campos a atender».
- Cada fator de 1 a 5. G: sem gravidade … extremamente grave; U: pode esperar … ação imediata; T: não vai piorar … piora rapidamente.
- Prioridade = G × U × T (1–125). Classes nos cubos: ≥ 64 muito alta; 27–63 alta; 8–26 média; < 8 baixa.
- Saídas: linha de caracterização («G5 × U5 × T4 = 100 (prioridade muito alta)»), ordenação «Prioridade GUT (maior primeiro)» e quadro/gráfico no resumo estatístico (as 20 maiores).
- Aplicado em: Relatório de Peritagem 1.7.0.

## Revisão do texto antes de exportar

- Lê os textos **pela ordem em que saem no relatório** e assinala, em quatro grupos: **Gralha** (palavra repetida, espaços a mais, espaço antes da pontuação, falta de espaço depois de vírgula/ponto e vírgula, frase a começar com minúscula, parêntesis/aspas desequilibrados, texto longo sem ponto final), **Ortografia**, **Redundância** (frase igual noutro sítio, frases seguidas quase iguais, comentários de situações diferentes ≥ 85 % iguais) e **Coerência** (situação sem comentário, alegada sem Status, campos obrigatórios).
- Ortografia com Hunspell em WebAssembly e o dicionário **pt-PT (Acordo Ortográfico de 1990)** — pacote `dictionary-pt-pt` (não usar `dictionary-pt`, que é do Brasil). Ficheiros à parte (`spell/spell.js`, `spell/pt_PT.aff`, `spell/pt_PT.dic`, ≈ 2,3 MB), carregados **só quando se revê**; o service worker guarda-os na 1.ª utilização e depois funcionam sem internet. A página da app não aumenta.
- Não são assinalados: siglas em maiúsculas, palavras com algarismos, nomes próprios a meio da frase, termos técnicos da lista interna, valores das bases de dados (zonas, locais, elementos, tipos) e palavras «aceites sempre» pelo utilizador (`settings.spellOk`).
- Ao exportar (Word, PDF, pasta), se houver avisos, pergunta «Exportar mesmo assim / Rever agora». Cada aviso tem «Ir ▶», que abre o campo e realça o texto.
- Aplicado em: Relatório de Peritagem 1.11.0.

## Apoio de análise de fotografias por IA (opcional)

- É **sugestão para o perito validar**, nunca diagnóstico: nada entra no relatório sem o perito tocar em «Aplicar» ou «Juntar ao comentário».
- Só corre quando o perito pede (por ficha, ou «analisar as em falta» no Relatório), com **chave própria** (Definições › IA), **consentimento explícito** (as fotos saem do aparelho) e internet. A chave fica só no aparelho e **não entra nas cópias de segurança**.
- Envia até 6 fotografias da situação + identificação (NUF/Piso/Local/Elemento) + descrição; pede JSON com: sinais visíveis, resumo (2–4 frases, pt-PT AO90, linguagem prudente), tipos/gravidade/urgência/tendência **só das listas da app**, causas prováveis, o que verificar no local, limitações. Valores fora das listas são descartados.
- Proibido inventar medidas (sem escala não se estima largura de fissuras).
- A sugestão fica guardada na situação (`a.ia`) até ser descartada; o Relatório mostra um resumo por situação.
- Modelo: o das Definições, senão `claude-sonnet-5-5` → `claude-sonnet-5` → `claude-sonnet-4-6` (passa ao seguinte se o modelo não existir).
- Aplicado em: Relatório de Peritagem 1.13.0.
- **Custo visível** (v1.1): cada análise guarda os tokens que o serviço indica (`usage`) e mostra o custo estimado (tabela de preços por modelo na app, USD); a ficha soma o total da situação (reanálises incluídas) e o cartão do Relatório soma o gasto do processo. O valor faturado é o da consola do fornecedor.
