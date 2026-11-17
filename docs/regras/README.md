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
