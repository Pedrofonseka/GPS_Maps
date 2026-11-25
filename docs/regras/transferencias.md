# Transferências entre aparelhos com data-hora — REGRA GERAL (todas as apps) — versão 1.0

Objetivo: nunca substituir, sem aviso, dados mais recentes por dados mais antigos ao passar processos, verbas, parcelas (ou outras unidades) de um aparelho para outro.

## Regra
1. **Cada unidade transferível guarda «alterado em»** (processo, verba, parcela…), atualizado sozinho quando o seu conteúdo muda — não basta a data do processo.
2. **O nome do ficheiro enviado leva a data-hora do envio** (AAAA-MM-DD_HHMM), para se distinguirem as versões na pasta.
3. **Ao receber**, cada unidade mostra as duas datas: 📱 neste aparelho e 📄 no ficheiro, com a marca «mais recente» / «mais antigo».
4. **A escolha sugerida é sempre a mais recente**: se o ficheiro for mais antigo, vem selecionado «Manter a deste aparelho».
5. **Substituir dados mais recentes por mais antigos pede confirmação expressa**, com as datas de cada unidade em causa.
6. Mantém-se a cópia automática antes de substituir, onde a app a tiver (ExPropria: Definições › 7).

Motor comum: `comum/datahora.js` (DH.fmt, DH.tag, DH.qual, DH.linhas, DH.html, DH.marca, DH.aviso) — copiado por `tools/sync_comum.py`.

## Onde está aplicada
| App | Versão | Unidades |
|---|---|---|
| AvaLias | 1.54 | processo · verbas |
| periText | 1.32.0 | processo |
| ExPropria | 0.19.0 | processo · parcela · parcelas |
| ProspeMerc | — | em espera (stand-by) |
