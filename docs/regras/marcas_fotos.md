# Marcas nas fotografias (setas, círculos, letras, texto, balões)

Origem: AVA_Input 2.91. Incorporada no Relatório de Peritagem (periText) 1.6.0, no Regi Anomalias 0.18.0 e na AvaLias 1.33 (miniaturas da ficha, Word, PDF/pré-visualização e capa).

## Funcionamento
- Botão «✏️ Marcar» em cada fotografia (com o n.º de marcas).
- Marcadores: ➜ Seta · ◯ Círculo · Letra (A, B, C… automática) · T Texto · 💬 Balão de comentário.
- 6 cores: branco, preto, azul, verde, amarelo, vermelho.
- Selecionar com um toque; arrastar para deslocar; pontos azuis para as pontas da seta (roda e muda o comprimento) e para o tamanho do círculo/letra; «↶ Rodar / Rodar ↷» roda a seta 15°; toque duplo edita o texto.
- Duplicar, Eliminar, Ocultar/Mostrar marcas.

## Dados
- As marcas ficam na fotografia: `f.marks = [{id,type,color,x,y,x2,y2,r,label,text,size}]`, coordenadas de 0 a 1; `f.marksHidden` oculta-as.
- A fotografia original nunca é alterada.
- Rodar a fotografia 90° roda também as marcas.

## Saída
- Word, PDF, pré-visualização e miniaturas usam `fdOut(f)`: a fotografia com as marcas desenhadas (canvas, JPEG 0,86), guardada em cache por fotografia + marcas.
- As cópias de segurança guardam o original e as marcas (vetoriais).

## Código
`markClamp`, `MARK_COLORS`, `annotationSvg`, `updateMarkGeometry`, `drawMarkerLayer` (copiados do AVA_Input) · `fdOut`, `prepMarks`, `openMarker` (editor em janela própria).
