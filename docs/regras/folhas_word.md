# Cálculos no Word como folha de cálculo embutida (editável)

**Objetivo:** os quadros de cálculo (rendimento de culturas, povoamentos, soma de rendimentos…) saem no Word como folha de cálculo do Excel embutida, para que se possam corrigir dentro do Word (duplo clique no quadro), sem voltar à app.

## Como se gera
- Cada quadro de cálculo traz, além das linhas para o Word, uma especificação de folha `x = {cols:[larguras], rows:[[célula…]]}`.
  - Célula: texto, número ou `{v, f, s}` — `v` valor guardado (o do relatório), `f` fórmula (sem `=`), `s` estilo.
  - Estilos: 0 normal · 1 negrito · 2 cabeçalho (negrito, linha inferior) · 3 `#,##0.00` · 4 idem negrito · 5 `0.00%` · 6 `#,##0.0000` · 7 `#,##0` · 8 `#,##0.0000` negrito · 9 `0%`.
- O .xlsx é escrito com JSZip (células `inlineStr`, fórmulas com valor em cache, `fullCalcOnLoad`, `oleSize` no workbook).
- No `document.xml`: parágrafo com `w:object` → `v:shape` (imagem de pré-visualização PNG, desenhada com os mesmos valores e o formato pt-PT) + `o:OLEObject Type="Embed" ProgID="Excel.Sheet.12"` com relação do tipo `package` para `word/embeddings/….xlsx`. `ShapeID` e `ObjectID` únicos; `v:shapetype _x0000_t75` só uma vez no documento.
- O Word mostra a imagem até se abrir o objeto; o LibreOffice mostra logo a folha.

## Regras
- Os valores da folha têm de ser os do relatório (o cálculo é refeito a partir dos dados guardados e só se usa se der o mesmo V_Un).
- Os parágrafos de fundamentação (fórmulas por extenso, totais) continuam como texto do Word.
- Onde não for possível embutir (ex.: relatório de várias parcelas num só Word), sai o mesmo quadro como tabela do Word (só a linha inferior do cabeçalho).
- Resumos de valor finais: quadro do Word (não folha embutida).

## Onde está aplicada
| App | Versão | Notas |
|---|---|---|
| AvaLias | 1.6 | motor comum `comum/tof.js` v1.2 (`calcXls` passou para o motor) · `alXlsx` (zip próprio) · `alXlsPng` · `alOlePara`; o cálculo é refeito ao exportar e só se embute se der o mesmo V_Un; a pasta ZIP leva também `VB_xxx_Calculo.xlsx` |
| ExPropria | 0.14.0 | `calcXls` (rotação, eucaliptal, pinhal, soma de rendimentos) · `xlsxBuild` · `oleInsert` · `xlsEmbedAll` |

## Aspeto de folha de Excel feita à mão (v1.1 — AvaLias 1.66)
- Todas as folhas embutidas no Word: as linhas com conteúdo levam limites finos em todas as células; cabeçalhos com fundo cinzento (D9D9D9) e totais com cinzento-claro (F2F2F2); um texto seguido de células vazias ocupa-as (células unidas), exceto a última coluna (valores).
- O mesmo aspeto na imagem que o Word mostra antes de abrir o objeto.
- Implementação no AvaLias: `gridSheet` (aplicada em `alOlePara`), estilos 12–23 (= 0–11 com limites) em `XL_STYLES`, `alXlsPng` com grelha e células unidas.
- Falta aplicar no periText e no ExPropria.

## v1.2 — alinhamento e largura (AvaLias 1.69)
- Todas as folhas do Word com a mesma largura (a da página, 84 car.): a folga vai para as colunas descritivas.
- Colunas estreitas (≤ 12 car.): cabeçalho e conteúdo centrados; colunas largas (descritivas): à esquerda.
- No ecrã (tabelas HTML): cada coluna com a largura do texto + 2 carateres, as mesmas regras de alinhamento e limite do cabeçalho arrastável.
