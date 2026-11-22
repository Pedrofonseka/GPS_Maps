# Capas do relatório Word — versão 1.0

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

## Regras fixas
- Uma **linha de intervalo** entre o cabeçalho e a capa (todas as opções).
- Quadro de identificação: a 1.ª linha tem sempre **limite superior** (transição imagens → texto) e inferior.
- Centrar em altura / terço inferior: moldura = tabela de 1 célula com altura **exata** = área útil da página − linha de intervalo − folga de 1,3 cm (para a quebra de página não criar uma página em branco), `vAlign` center ou bottom. Área útil com margem superior de 4 cm: 23,2 cm (3 cm: 24,2 cm).
- Imagens: as de contextualização, se a app as tiver; senão, as das unidades (situações, verbas), baralhadas.
- Cada opção tem «👁 Ver» (pré-visualiza só a 1.ª página, com os dados do processo) e, na pré-visualização, «✓ Usar esta capa».

## Testes mínimos
1. Gerar o Word com cada opção, converter para PDF (LibreOffice) e confirmar que a página 2 é o índice (sem página em branco).
2. «Lado a lado» com 2 e com 6 fotos: bloco centrado. «Só texto»: quadro no fundo da área útil.

## Onde está aplicada
| App | Versão |
|---|---|
| Relatório de Peritagem (relat) | 1.28.5 |
| AvaLias (avalias) — fotos das verbas; título «Função – Relatório» | 1.1 |
