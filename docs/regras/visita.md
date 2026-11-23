# Ordem de visita (OV_xxx) — v1.0

Rotina comum às apps com vários itens no mesmo processo (verbas, parcelas, anomalias, tópicos). Motor: `comum/visita.js` (bloco `@comum:visita`).

## Regra (decidida pelo perito, 23/11/2026)

- Cada item tem **dois números separados**: o **código do processo** (VB_xxx, P_xx…), que nunca muda e segue a ordem da relação/listagem, e a **ordem de visita** `OV_xxx` = ordem real no terreno.
- **Sugestão automática**: o primeiro registo no local (fotografia tirada na app, GPS, botão «Hoje» da data de visita, ou «Visitada agora») sugere o número seguinte. A sugestão fica marcada (OV_003?) até o utilizador **aceitar** ou **corrigir**.
- **Correção**: escrevendo outro n.º, o item entra nessa posição e os restantes reajustam-se — sem números repetidos nem buracos. «Limpar» devolve o item a «por visitar».
- **Sugestão pelas fotografias** (fotos importadas): propõe a ordem pela hora da primeira foto de cada item ainda sem OV (para aceitar ou corrigir).
- **Lista**: alternar «Ordem: Processo | Visita (OV)»; os itens por visitar ficam no fim.
- **Relatório**: **por defeito na ordem do processo** (como foram listados); por opção, na ordem de visita. Os códigos não mudam, só a sequência (Word, quadro-resumo, livro Excel). A coluna OV aparece sempre no resumo e na ficha do item.

## Modelo de dados (por item)
`ov` (n.º, 0 = por visitar) · `ovSug` (1 = sugerida, por confirmar) · `ovT` (hora do registo) · fotografias com `ts`.

## Testes mínimos
1. Visitar 3 de 4 itens fora da ordem do processo → OV 1, 2, 3 sugeridas pela ordem real.
2. Corrigir um item para 1 → os outros passam a 2 e 3, sem repetidos.
3. Relatório com «ordem de visita» → sequência OV no Word e no resumo; itens sem OV no fim.

## Onde está aplicada
- AvaLias 1.21 (verbas).
- A seguir: ExPropria (parcelas), Relatório de Peritagem, Regi, FullTopics; AVA_Input já tinha ordem de visita própria — passará a este motor.
