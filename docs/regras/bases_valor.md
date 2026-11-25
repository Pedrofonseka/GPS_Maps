# Biblioteca de bases de valor — versão 1.0

Motor comum `comum/bases.js` (copiado para as apps por `tools/sync_comum.py`). Referência: EVS 2025 (TEGoVA) — EVS 1 Valor de mercado; EVS 2 Bases de valor que não o valor de mercado. Definições em redação própria, fiéis ao conceito (não são transcrição das normas).

## Regra
- O processo tem **uma base de valor** (campo já existente; AvaLias: Processo › Contexto de análise).
- O relatório junta a **definição da base escolhida** ao fecho do resumo: «Considerações sobre o valor estimado» → **N2 – Base de valor: … (EVS n). definição + nota**; e a resposta «Valor estimado» diz «na base «X» (EVS n)».
- No ecrã, ao escolher a base, aparece a definição e a nota (o que vai sair no relatório).
- Valor especial: o relatório tem de dizer que pode diferir do valor de mercado; se a vantagem estiver ao alcance de vários interessados, é valor de mercado (EVS 2).
- Liquidação e uso alternativo não são bases autónomas: são pressupostos especiais do valor de mercado.

## Bases
| Base | Referência |
|---|---|
| Valor de mercado | EVS 1 |
| Valor de renda de mercado | EVS 1 |
| Valor Especial | EVS 2 |
| Valor de Investimento | EVS 2 |
| Justo Valor | EVS 2 / IFRS 13 |
| Valor Hipotecário | EVS 2 |
| Valor Seguro | EVS 2 |
| Valor de Liquidação | EVS 1 — pressuposto especial |
| Valor de uso alternativo | EVS 1 — pressuposto especial |

## Onde está aplicada
| App | Versão |
|---|---|
| AvaLias | 1.51 |
