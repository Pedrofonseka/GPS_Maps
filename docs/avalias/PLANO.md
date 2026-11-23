# AvaLias 1.0 — plano de construção (17/11/2026)

App nova (sucessora do AVA_Input 2.91, que continua em `/ava/` até a AvaLias estar testada). Endereço previsto: `/avalias/`. Nome na régua: **AvaLias** · versão 1.0 · data.

## Princípio
Como no ExPropria: o formulário segue o **raciocínio da avaliação**, não o modelo Word. O Word é montado no fim a partir dos dados. Preenchimento fluido, transversal entre verbas (escritório / campo), em iPhone, iPad e PC.

## Base de código
- **Relatório de Peritagem** (`/relat/`, construído a partir do Regi + `relat_ext.js`): gabinetes (4, logótipo/cabeçalho), particular/institucional, singular/colegial com compromisso de honra e peritos com representação, N_Ref ≠ n.º de processo, questões ao(s) perito(s) (importar Word/Excel/manual; particular → «Pretende-se:»), documentos/anexos com visto, capa 3×3, quadro de identificação, índice, verificação antes de gerar, pré-visualização, PDF, ZIP, campo FILENAME no rodapé, GPS, fotos.
- **ExPropria**: n.º de unidades ao criar o processo; setas entre unidades mantendo a secção; troca por unidade.
- **AVA_Input**: tipos de ativo e características já levantadas (passar a Detalhado/Sucinto), fotos, quadro-resumo, BAD.
- Não partir do código do AVA_Input (1,8 MB, várias camadas presas ao Word).

## Estrutura
**A · Processo** — enquadramento (gabinete, particular/institucional, singular/colegial, compromisso); N_Ref, n.º do processo; contexto e finalidade; solicitante e partes; questões ao(s) perito(s); BAD aplicável? (algum interveniente com interesse especial em adquirir); n.º de verbas (cria VB_001…VB_n).

**B · Verba** (sempre esta ordem)
1. Identificação — código, ID (artigo matricial / matrícula / n.º da sepultura…), descrição sumária
2. Localização — morada, GPS
3. Visita — data, presenças
4. Tipo de ativo → Destino (lista dependente do tipo)
5. Estado — características do tipo, modo **Detalhado** (caixas) ou **Sucinto** (texto livre) + fotos
6. Utilidade
7. Métodos elegíveis (reservado — a tratar depois)
8. Valor calculado (+ renda mensal quando a base é renda de mercado; BAD «até %», defeito 10%)

**C · Relatório** — texto geral do processo → **quadro-resumo** (Verba · Designação · Tipo · Valor estimado · Renda mensal* · BAD (até); Total apurado) → notas N1–N3 e texto BAD (se aplicável) → análise específica de cada verba (ficha + fotos). Texto de referência: `Ava_Context_Cjv_2611_1.docx` (parágrafos 140–180).

## Tipos de ativo e destinos (proposta a validar no teste)
1 Edifícios · 2 Moradias · 3 Construções anexas · 4 Garagens autónomas · 5 Frações → afetações CIMI art. 41.º (habitação, comércio, serviços, armazéns e atividade industrial, estacionamento coberto/não coberto, arrecadações e arrumos) + comércio e serviços, aviário, outro.
6 Veículos → Código da Estrada art. 106.º e ss. (ligeiro de passageiros — particular / transporte de passageiros; ligeiro de mercadorias; ligeiro misto; pesado de passageiros; pesado de mercadorias; motociclo/ciclomotor; trator agrícola/florestal; máquina industrial; reboque/semirreboque).
7 Conjuntos de mobiliário · 9 Sepulturas · 10 Outras situações → descrição livre.
8 Terrenos → para construção; agroflorestal; outro.

## Regras comuns obrigatórias
`docs/regras/` — fotos (máximo por verba, reserva, substituir, repetidas), tamanho, imagens no Word em controlo de conteúdo, Word válido (ordem pPr, sem pastas no ZIP), nomes de ficheiros estritos, data na régua, service worker só apaga as suas reservas, n.º de unidades ao criar, navegação na mesma secção, FILENAME no rodapé, **troca em 3 níveis (sync.md)**, eliminar unidade visível no cartão com confirmação. Documentos em Calibri; rodapé «Reprodução proibida sem autorização expressa do autor» (Times New Roman itálico 7).

## Depois do teste
Validar destinos; perguntas de caracterização por tipo; métodos de avaliação; importar processos do AVA_Input 2.91.

## Estado — v1.0 (17/11/2026), publicada em `/avalias/`
- Construída a partir de `relat/index.html` com `docs/avalias/build/build.py` (+ `avalias_ext.js`, `body.js`, `lists.js`): `python3 build.py <versão> <AAAA-MM-DD>`.
- Feito: processo (enquadramento do Relatório de Peritagem + Contexto da avaliação: finalidade, base de valor, posse, BAD); n.º de verbas ao criar; lista de verbas com eliminar no cartão; ficha em 8 secções (Detalhado/Sucinto, copiar da verba anterior, setas na mesma secção); relatório Word/PDF/ZIP com contexto, visitas, quadro-resumo (renda e BAD condicionais), notas N1–N3/BAD e análise de cada verba com fotos; troca por verba.
- Por fazer (depois do teste): validar destinos e perguntas por tipo; métodos e cálculos; importar processos do AVA_Input 2.91; capa com mapa (precisa de rede ao gerar).

## v1.1 (22/11/2026) — capas
- A AvaLias 1.0 foi construída a partir do Relatório de Peritagem **1.3.2**; o `build.py` já não corre sobre o relat atual (1.28.x), cujas âncoras mudaram. A partir da 1.1, as melhorias do relat passam para a AvaLias **por rotina**, diretamente em `avalias/index.html`, com registo em `docs/regras/` (ex.: `capas.md`).
- 1.1: capas do relat 1.28.5 (7 opções, linha após o cabeçalho, limite no quadro, centradas em altura, «👁 Ver» + «✓ Usar esta capa»); fotos das verbas.
- 1.2 (22/11/2026): terreno de produção avaliado pelo rendimento usa a rotina de culturas do ExPropria (ver `docs/regras/culturas.md`).
- 1.4.1 (22/11/2026): Localização com Concelho → Freguesia (tabela comum `comum/concelhos.js`, a do ExPropria) e Endereço.
- 1.4.2 (22/11/2026): listas do contexto revistas — Aglomerado de referência, Centralidade, Envolvente, Consolidação, Padrão urbano (com NAP/NAN); valores antigos convertidos.
- 1.4.3 (22/11/2026): «Pressão urbanística» retirada (vem na consolidação); campo passa a «Consolidação urbanística».
- 1.5 (22/11/2026): anexos em ficheiro como no Relatório de Peritagem (nome, largura, PDF/imagens dentro do Word, página «ANEXOS», sub-tópicos no índice; cópias e envio levam os anexos); «Em anexo» com Planta(s), Levantamento topográfico, Esquematização de áreas, Extrato do PDM…
- 1.5.1 (22/11/2026): valor estimado da verba TOF automático (área × valor do cálculo / de referência), recalculado ao mostrar e ao exportar; escrever um valor fixa-o.
- 1.5.2 (22/11/2026): pasta completa (.zip) — Word, PDF, Excel geral das verbas, KML das verbas, e por verba (Verbas/VB_xxx/): ficha em Excel e fotografias (com a reserva); anexos originais.
- 1.6 (22/11/2026): quadros de cálculo no Word como folha do Excel embutida (editável no PC); a pasta leva também o cálculo em Excel por verba.
- 1.6.1 (22/11/2026): iPhone — com o teclado aberto o cabeçalho deixa de ser fixo e a caixa fica à vista; caixas de texto sem saltos.
- 1.7 (22/11/2026): listas revistas (tribunais, contexto processual, finalidade, tipos de ativo, destinos, NAP/NAN, execução, classe energética, utilidade, ordem alfabética); identificação cumulativa (CDP, CRP, BUPI, Outro — cada uma com o número); desfazer/refazer.
- 1.8 (22/11/2026): prédio — registo predial, artigos matriciais (freguesia, artigo, designação, AT/ABC/ABP/ABD), documentos com áreas, área a considerar com fundamentação e diferenças (%); base de peritos comum com o ExPropria.
- 1.8.1 (22/11/2026): revisão do texto (gralhas mecânicas corrigidas automaticamente, aceitar / manter o original) — bloco comum comum/revisao.js.
- 1.8.3 (22/11/2026): bases de valor segundo as EVS 2025 (acrescentado Valor Seguro e Valor de uso alternativo; Liquidação = venda forçada; referência EVS de cada base).
- 1.9 (22/11/2026): Diagnóstico (Definições); Fototeca para as fotos tiradas na app; procura de fotografias repetidas com eliminação e aviso na verificação.
- 1.10 (22/11/2026): status por verba (NIN/ECU/STB/END/ANL, descrições editáveis; ANL não sai no relatório; tabela de status opcional no Word) e cronologia do processo (ocorrências com data; opção de não incluir no Word).
- 1.11 (22/11/2026): grupos de ativo (EDC, TAC, TOF, MOB, MEQ, VEI, SEP, OTS, NID) derivados do tipo; novos tipos AES (substitui LUG), TCI, TCM, TUR (LOT passa a TCI); TER = Terreno rústico / outras finalidades (TOF); grupo na lista, na ficha, no Excel e no Word; subtotais por grupo no quadro-resumo.
- 1.12 (22/11/2026): quadro-resumo do Valor estimado em Excel embutido e editável (verba, designação, tipo, grupo, valor, % relativa; total; resumo por grupo com Qtd, parciais e % — fórmulas SUM/COUNTIF/SUMIF, como a OUT_Resumo do Best Value); também <codigo>_Resumo.xlsx no ZIP. Verbas ANL ficam de fora.
- 1.13 (22/11/2026): retirado o status manual por verba (NIN/ECU/STB/END/ANL), a tabela de status em Definições e no Word — a pedido do utilizador; substituído por indicação automática «Completa / Incompleta · falta n» conforme o preenchimento (designação, localização, visita, tipo/destino, fotos, caracterização, utilidade, métodos, valor); a verificação antes de gerar lista o que falta em cada verba.
- 1.14 (23/11/2026): quadro de métodos por verba (7 · Métodos aplicados): CST, RES, MER, RND, DCF, VRF, Outro; valor por método (à mão; em TOF, RND e VRF vêm das rotinas de culturas / valor de referência); botão «Adotar»; encargos/benfeitorias (BFT); análise de mercado quando há MER; fundamentação. Valor estimado = adotado + BFT (o valor escrito à mão prevalece). No Word: tabela «Métodos aplicados» em Excel embutido (SUMIF do adotado + BFT), análise de mercado e fundamentação; no Excel da verba, os valores por método.
- 1.15 (23/11/2026): CST — cálculo pelo custo de reposição depreciado: [A] solo (C × IUS × ILZ × Div × K_Ar + encargos de aquisição), [B] edificações com depreciação física Ross-Heidecke (comum/rhd.js; estado e idade vêm da caracterização; coeficiente adotado opcional), obsolescência funcional e económica, taxas/licenças (só se estado ≥ 50 %), margem do promotor, transformação/demolição. Valor do CST preenche-se sozinho; no Word e no ZIP (_Custo.xlsx) em Excel com fórmulas. Reproduz o exemplo VB_001 do Best Value (51 700 €).
- 1.15 (correção 23/11/2026): service worker passa a pedir sempre ao servidor (cache 'no-cache'), como no relat — o iPhone ficava até 10 min com a versão anterior (cópia do navegador do GitHub Pages). Aplicado também a ava, expropria, full, regi e revip.
- 1.15.1 (23/11/2026): CST preenchido em tabelas horizontais (solo, edificações, ajustes), com deslocamento lateral e 1.ª coluna fixa (painel congelado) no telemóvel; valores calculados nas próprias tabelas.
- 1.16 (23/11/2026): encargos/benfeitorias (BFT) em tabela como no Best Value (Utilidade · Vref · K1 · K2 · QTD · Vun · Parciais arredondados à centena; total [BFT]); o valor único antigo passa a 1.ª linha. RND para edifícios e outros (fora de TOF): tabela por linha — renda anual, n.º de períodos, taxa, [A] valor das rendas (−PV), fator residual, Δ taxa de saída, valor de saída (perpetuidade a 200 per.), [B] atualizado a N+1, total; Excel com fórmulas PV no Word e _Rendimento.xlsx no ZIP. Folha «Métodos» do Word inclui o detalhe BFT.
- 1.16.1 (23/11/2026): CST — idade e vida útil substituídas por «Idade %» (lista de 0 a 100 % de 10 em 10; ex. 20 anos em 60 = 30 %); estado só com a sigla, coluna «ECV», legenda por baixo; tabela mais estreita. Dados antigos (idade/vida) continuam a contar até se escolher a %.
