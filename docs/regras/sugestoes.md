# Sugestões nas caixas de preenchimento — REGRA GERAL — versão 1.0 (22/11/2026)

Em **todas as apps**, sempre que uma caixa que o utilizador tem de preencher tiver um valor ou texto sugerido, a sugestão aparece **junto da caixa** e o utilizador:
- **✓ aceita** (passa para a caixa),
- **✕ rejeita** (a sugestão desaparece nessa caixa),
- ou **corrige** (escreve por cima; a caixa é sempre editável).

Quando há várias sugestões num formulário, há também **«✓ Aceitar todas»**.

## Origem das sugestões (por esta ordem)
1. **Valor por defeito fundamentado** — com a fonte escrita ao lado (ex.: «CEPAAL 2024 – 80 a 100 árvores/ha»). Sem fonte não há valor por defeito: a caixa fica vazia.
2. **Histórico do perito** — o último valor usado nesse campo (noutra verba/parcela/processo, ou no último cálculo do mesmo método), com a indicação «último valor usado (data)».
3. **Textos-tipo** (introduções, frases guardadas) — ver as zonas de cor do Relatório de Peritagem.

A sugestão nunca entra sozinha no documento: só depois de aceite (ou escrita).

## Onde está aplicada
| App | Versão | Onde |
|---|---|---|
| Motor TOF `comum/tof.js` (ExPropria e AvaLias) | 1.1 | parâmetros do cálculo pelo rendimento: valores fundamentados (`CALC_SUG`) e histórico (`settings.calcHist`, também na biblioteca exportada) |
| AvaLias | 1.4 | caixas de texto da ficha da verba vazias: sugestão pelo histórico (mesmo campo noutras verbas) |
| Relatório de Peritagem | 1.12+ | textos sugeridos (zonas castanhas) com «aceitar» e frases guardadas |
