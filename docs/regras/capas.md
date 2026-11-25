# Capas do relatório Word — versão 1.1

Rotina comum às apps que geram relatório Word com capa (Relatório de Peritagem, AvaLias).

## Opções (lista `CAPAS`, campo `rel.capa`)
| Chave | Nome | Composição |
|---|---|---|
| `fotosLoc` | Mapa + fotos | mapa à largura + 3 ou 6 fotos; coordenadas; quadro de identificação |
| `destaque` | Uma imagem grande | uma imagem a toda a largura; quadro de identificação |
| `fotos` | Grelha de fotos | até 9 fotos (3 × 3); quadro de identificação |
| `nenhuma` | Só texto | quadro de identificação no **terço inferior** (por cima, o espaço onde estariam imagens) |
| `titulo` | Título em destaque | título grande, uma imagem, dados por baixo — **centrado em altura** |
| `colunas` | Fotografias e dados lado a lado | 2 colunas: até 6 miniaturas (4:3) à esquerda, dados à direita — **centrado em altura e largura** |
| `ficha` | Ficha técnica | faixa baixa com N_Ref e título, dados em caixas, 3 fotos — tudo num **caixilho**, centrado em altura |
| `faixa` | Faixa lateral | faixa vertical na cor do gabinete (toda a altura útil) com N_Ref e título ao alto; à direita uma fotografia, o título com um traço curto, a finalidade e os dados (1.1) |
| `mosaico` | Mosaico | uma fotografia grande (2/3) e duas pequenas empilhadas; N_Ref, título em destaque, filete e dados em 2 colunas — **centrado em altura** (1.1) |
| `carimbo` | Carimbo técnico | folha de desenho com margem desenhada; título, finalidade e fotografia em cima; carimbo no canto inferior direito (referência, dados aos pares, versão, folha); linhas do carimbo com altura fixa (dupla se o texto for longo) para a capa ocupar exatamente a área útil (1.1) |

## Regras fixas
- Uma **linha de intervalo** entre o cabeçalho e a capa (todas as opções).
- Quadro de identificação: a 1.ª linha tem sempre **limite superior** (transição imagens → texto) e inferior.
- Centrar em altura / terço inferior: moldura = tabela de 1 célula com altura **exata** = área útil da página − linha de intervalo − folga de 1,3 cm (para a quebra de página não criar uma página em branco), `vAlign` center ou bottom. Área útil com margem superior de 4 cm: 23,2 cm (3 cm: 24,2 cm).
- Imagens: as de contextualização, se a app as tiver; senão, as das unidades (situações, verbas), baralhadas.
- Cada opção tem «👁 Ver» (pré-visualiza só a 1.ª página, com os dados do processo) e, na pré-visualização, «✓ Usar esta capa».

- A escolha da capa fica numa **secção própria «Capa»**, com o tipo escolhido no resumo da secção; os dados da capa ficam com os dados do processo.

## Testes mínimos
1. Gerar o Word com cada opção, converter para PDF (LibreOffice) e confirmar que a página 2 é o índice (sem página em branco).
2. «Lado a lado» com 2 e com 6 fotos: bloco centrado. «Só texto»: quadro no fundo da área útil.

## Onde está aplicada
| App | Versão |
|---|---|
| Relatório de Peritagem (relat) | 1.28.5 · Faixa lateral e Mosaico 1.31.1 · Carimbo técnico 1.31.2 |
| AvaLias (avalias) — fotos das verbas; título «Função – Relatório»; escolha em **Relatório › Capa** (secção própria, aberta), dados em Processo › R2 | 1.1.1 · Faixa lateral e Mosaico 1.46 · Carimbo técnico 1.47 |

**ExPropria 0.18.0:** «Estilo da capa» (Relatório › layout): Modelo do gabinete (quadro N_Ref, por defeito) · Faixa lateral · Mosaico · Carimbo técnico. Os dados vêm do quadro N_Ref já preenchido (uma ou várias parcelas; Finalidade em destaque, Versões em rodapé da capa) e da equipa do processo — «Perito(s)» ou, na arbitragem, «Árbitro(s)», com a função quando há mais de um. Imagens: fotografias marcadas «Capa», depois as outras; sem fotografias, o mapa. A capa substitui toda a página 1 do modelo; o índice continua na página 2.

**Sem lista de capas:** FullTopics (página de rosto com mapa), Regi e Revip (capa do modelo Word) — as capas novas entram quando essas apps passarem a ter escolha de capa.
