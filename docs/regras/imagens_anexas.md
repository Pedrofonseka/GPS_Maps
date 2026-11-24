# Imagens anexadas — as mesmas ferramentas das fotografias

Versão 1.0 (24/11/2026). Motor comum: `comum/imgtools.js` (sincronizado por `tools/sync_comum.py`).

## Regra
Qualquer imagem anexada em qualquer parte do processo (extratos do PDM, páginas de anexos em PDF ou imagem, imagens fornecidas, plantas, mapas…) tem as mesmas ferramentas das fotografias:
- 🔍 **Ver** (em grande, com as ferramentas);
- ⟳ **Rodar** 90° (roda também as marcas);
- ✏️ **Marcar** — setas, círculos, letras, texto, balões (rotina `marcas_fotos.md`);
- 🗑 **Eliminar**.

A imagem original nunca é alterada pelas marcas; o Word, o PDF e a pré-visualização usam a imagem com as marcas (`fdOut`).

## Dados
Cada imagem é um objeto `{id, w, h, marks}`; a imagem guarda-se com `fotoPut(id, data)` e lê-se com `fd(objeto)`.

## Uso
`IMGT.bar(chave, objeto, {del: () => …})` devolve a barra de botões; a app chama-a ao desenhar cada imagem.

## Onde está aplicada
- AvaLias 1.41 — extratos do PDM; páginas dos anexos (PDF e imagens).
- periText 1.30.7 — páginas dos anexos (PDF e imagens).
- ExPropria 0.17.0 — extratos do PDM (até 4, numa página), imagens fornecidas e páginas dos anexos: ✏️ Marcar e ⟳ Rodar (com as marcas); as fotografias do ExPropria têm as suas ferramentas próprias (sem marcas, por agora).
