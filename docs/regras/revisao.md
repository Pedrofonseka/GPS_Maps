# Revisão do texto — REGRA PARA TODAS AS APPS — versão 1.0 (22/11/2026)

**Fonte única:** `comum/revisao.js` (bloco `@comum:revisao`): `RV_ABBR`, `fixMech(t)`, `rvRun(items, keep)`, `rvModal(done, keep, onChange)`.

- As **gralhas mecânicas** corrigem-se **automaticamente**: espaços no fim da linha, espaços a mais, espaço antes da pontuação, falta de espaço depois da pontuação/ponto, pontuação repetida, maiúscula no início da frase, ponto final em textos longos (abreviaturas como «art.», «n.º», «Eng.» são respeitadas; endereços web e e-mails ficam como estão).
- Depois aparece a lista do que mudou (antes riscado / depois a verde) e o utilizador **aceita** (✓) ou **mantém o original** (↶ — fica lembrado no processo em `rel.rvKeep` e não volta a ser corrigido). «✓ Aceitar todas».
- Cada app fornece a sua lista de textos `[{sec, lbl, key, get(), set(v)}]`.
- O Relatório de Peritagem tem, além disto, a verificação ortográfica (português europeu) — a juntar ao bloco comum numa versão seguinte.

## Onde está aplicada
| App | Versão | Onde |
|---|---|---|
| Relatório de Peritagem | 1.24+ | Relatório › Revisão do texto (com ortografia); `fixMech` é a origem do bloco comum |
| AvaLias | 1.8.1 | Relatório › «🔍 Rever o texto» (processo, questões, verbas, características de texto, legendas) |
| ExPropria · AVA_Input · Regi · FullTopics · Revip | — | por aplicar (cada uma precisa da lista dos seus textos) |
