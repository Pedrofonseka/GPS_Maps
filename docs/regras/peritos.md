# Base de peritos e gabinetes partilhada — versão 1.0 (22/11/2026)

**Fonte única:** `comum/peritos.js` (bloco `@comum:peritos`, sincronizado com `tools/sync_comum.py`).

- Modelo: `settings.peritos = [{nome, esp, tel, email, res}]` (o do ExPropria); `settings.gabinetes = [{id, nome}]` quando a app o tem.
- Nos processos escolhe-se o perito da base (lista sugerida); um nome novo escrito num processo entra na base automaticamente.
- Troca entre apps / aparelhos por ficheiro `Base_Peritos_AAAA-MM-DD.json` (`kind: PFK_Peritos`): «⬇ Exportar base» / «⬆ Importar base». Importar junta por nome: acrescenta os que faltam e só preenche campos vazios — nunca apaga nem substitui.
- Não pôr dados pessoais reais no repositório: a base vive no aparelho (Definições).

## Onde está aplicada
| App | Versão | Onde |
|---|---|---|
| ExPropria | 0.15.9 | Definições › 1A · Base de peritos (botões exportar/importar) |
| AvaLias | 1.8 | Definições › Base de peritos; lista sugerida no nome do perito (assinatura) e nos peritos do colégio |
