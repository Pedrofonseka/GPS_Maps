# Rotina de fotografias — v1.0 (2026-11-14)

## Onde está aplicada
| App | Versão | Notas |
|---|---|---|
| Regi Anomalias | 0.14.2–0.16.0 | origem; 0.16.0 tem máximo de fotos por assunto (maxF/enforceMax) |
| ExPropria | 0.13.2 | sem limite por parcela |
| FullTopics | 1.06 | assinaturas guardadas no registo da foto (store 'fotos') |

## 1. Fotografias em reserva
- Campo `sel` na meta da foto: ausente = no relatório; `sel:false` = reserva. Fotos antigas ficam no relatório sem migração.
- Helpers: `inRel(f)`, `relF(t)` (no relatório), `resF(t)` (reserva), `setSel(f,on)`.
- **Ordem**: as do relatório vêm sempre primeiro. `normFotos(t)` reordena **no próprio array** (splice), mantendo a ordem relativa; é chamado ao gravar (saveCurrent e savePhotoAndProcess), cobrindo importar, mover entre tópicos e desfazer.
- Numeração: `codePhoto(t,i)` só para as do relatório; a reserva aparece como «n-Reserva k» (`photoLbl`).
- Setas ◀ ▶ só trocam fotos do mesmo grupo.
- Interface: botão «✓ No relatório» / «＋ Usar no relatório» em cada miniatura e no editor; secção «Reserva — n fotografia(s) (não saem no relatório)» com cartões a tracejado; ações na seleção múltipla «＋ No relatório» e «→ Reserva»; contadores «n foto(s) +m reserva».
- **Saídas** (pré-visualização, PDF, Word, Excel, capa): só fotos do relatório. Forma mais segura: a função que devolve os tópicos para saída devolve cópias com `fotos: relF(t)`. Quem navegar a partir de avisos deve voltar a mapear para o tópico real (por id).
- Pasta/ZIP: reserva numa subpasta `Reserva/` com nomes `n-RES_001.jpg`; a estimativa de tamanho do ZIP conta-as.
- Verificações: «sem fotos no relatório» quando só há reserva; legendas em falta contam só as do relatório.

## 2. Substituir fotografia no editor
- Botões «📷 Substituir» (input dinâmico com `capture=environment`) e «🖼 Substituir da fototeca». O input é anexado ao body e removido depois (iOS).
- Mantém o **id**, a legenda e a posição; atualiza w/h, takenAt (EXIF), fromCamera/libSaved, rotation=0, `rev+1`.
- Se houver marcações, perguntar se se mantêm (Cancelar = remover).
- Guardar a legenda que está a ser escrita antes de substituir.
- Desfazer (offerUndo): repõe o registo antigo da foto e a meta antiga; `revoke(id)` para limpar o URL em cache.
- Depois de substituir, verificar repetidas e avisar.

## 3. Aviso automático de repetidas
- Assinatura: dHash 9×8 (+ cor média na FullTopics, `photoDHash` → `hex:rgb`); comparação `sigClose` (Hamming ≤4 e cor próxima). Na ExPropria/Regi: dHash simples e `hamm ≤ SAME(2)`.
- Critério extra: mesma proporção (±0,02) e, se ambas tiverem takenAt, a mesma hora — assim fotos em rajada não contam como repetidas.
- **Não guardar a assinatura na meta do processo** se for longa (a da FullTopics tem ~1,5 KB): guardar no registo da foto (`r.sig`, `r.sigRev=rev`) + cache em memória `id|rev`. Rodar ou substituir altera `rev` e obriga a recalcular.
- Cálculo em segundo plano (`fillSigs`, com bloqueio para não correr duas vezes): primeiro o tópico aberto, depois o resto do processo; no fim atualiza só as etiquetas no DOM (não re-renderiza, para não interromper a escrita).
- Comparação em **todo o processo** (apanha a mesma foto em tópicos diferentes).
- Avisos:
  1. ao importar da fototeca — alerta com a lista «1-IMG_001 = 1-IMG_004» (máx. 12 linhas); com a câmara não interrompe, só marca;
  2. etiqueta «⚠ repetida» na miniatura (title = com quais);
  3. no editor «⚠ Parece repetida de: …»;
  4. ao substituir;
  5. verificação antes de exportar: «n fotografia(s) repetida(s) no relatório» (só fotos do relatório), com atalho para corrigir.
- A procura manual de repetidas, se existir, passa a usar a mesma cache.

## 4. Opcional — máximo de fotos por assunto (Regi 0.16.0)
- `maxF` configurável; `enforceMax` passa as excedentes para a reserva em vez de as rejeitar.

## 5. Testes mínimos (Playwright)
1. Importar 4 fotos com uma cópia → 1 alerta, 2 etiquetas visíveis.
2. Passar uma para a reserva → códigos 1-IMG_001…003 + «1-Reserva 1»; saídas com 3 fotos.
3. Repetida no relatório → aparece na verificação antes de exportar.
4. Word: nº de imagens em `word/media` = fotos do relatório (+ imagens fixas do modelo).
5. ZIP com `Reserva/`.
6. Substituir pela fototeca → rev+1, mesmo id; Desfazer → meta original.
