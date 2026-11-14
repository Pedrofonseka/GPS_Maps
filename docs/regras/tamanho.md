# Máximo de fotos e tamanho previsto dos ficheiros — v1.0 (2026-11-14)

## Onde está aplicada
| App | Versão | Unidade | Resolução de saída |
|---|---|---|---|
| Regi Anomalias | 0.16.2 | assunto (anomalia) | `outKB` — Como gravadas/300/200/150/100/60 KB |
| ExPropria | 0.13.3 | parcela | `outKB` — Original/300/200/150/100/60 KB; documentos com mínimo legível |
| Relat_Anomalias | 1.0.0 | assunto (anomalia) | herdada do Regi 0.16.4 |
| FullTopics | 1.07 | tópico | `docPhotoKB` existente (20…300 KB) |

## 1. Máximo de fotografias no relatório
- Opções: **2 · 4 · 6 · 8 · 9 · 10 · Sem limite**. **Por defeito 6.** Setting global `maxFotos` (0 = sem limite).
- Depende da rotina de reserva ([fotos.md](fotos.md)): as excedentes **não se perdem**, ficam na reserva.
- Ao importar: as fotos que excedem o máximo entram já na reserva e a app avisa quantas.
- «＋ Usar» com o relatório cheio: recusa e explica («retire primeiro uma»). Seleção múltipla: põe as que cabem e avisa das restantes.
- Mover fotos para outro assunto cheio: as movidas passam para a reserva do destino.
- Mudar o máximo: as excedentes de **todos** os processos passam para a reserva (ExPropria/FullTopics pedem confirmação com a contagem; Regi avisa com toast).
- Dados antigos não são alterados ao atualizar a app; o máximo só se aplica a novas entradas ou quando se muda a opção.
- Contadores visíveis «n/máx» (ex.: «3/6», «3 de 6 no relatório»).

## 2. Tamanho previsto — sem limite rígido, sempre com aviso
- Junto aos botões de exportar, linha sempre visível: **«Tamanho previsto: Word ≈ X MB · PDF ≈ Y MB · Pasta ≈ Z MB»**, com o nº de fotos e a resolução aplicada.
- Cálculo: soma dos tamanhos reais guardados de cada imagem, limitados ao alvo da resolução escolhida (×0,9), + base do documento (modelo, capa, mapa). Pasta = Word + PDF + fotos (incluindo reserva) + anexos originais.
- Cores/avisos: ≤ 8 MB normal; > 8 MB «Pode não seguir por e-mail (limite habitual 10–25 MB) — pode baixar a resolução»; > 20 MB «Ficheiro muito grande: baixe a resolução».
- Seletor da resolução ao lado da linha; mudar recalcula logo.
- Na FullTopics continua o diálogo após gerar quando passa o limite configurado (com opção de manter).

## 3. Resolução das imagens nos documentos (sem comprometer a legibilidade)
- Só afeta a saída (Word, PDF, Pasta); **as fotografias guardadas na app não são alteradas**. Cache por `id|rev|tipo|alvo`.
- Dois tipos:
  - **foto**: alvo = KB escolhido; lado maior entre 1600 e **mínimo 800 px**; qualidade JPEG ≥ 0,55.
  - **doc** (plantas, extratos de PDM, anexos digitalizados): alvo = máx(250 KB, 2× KB escolhido); lado maior até 2400 e **mínimo 1600 px**; qualidade ≥ 0,66.
- Algoritmo: reduz para o lado de topo, desce a qualidade de 0,82 em passos de 0,08 até ao mínimo; se não chegar ao alvo, reduz o lado 20% de cada vez até ao mínimo legível. Se o resultado for maior do que o original, fica o original.
- Mapas gerados, gráficos e imagens fixas do modelo não passam por aqui.

## 4. Testes mínimos
1. Máximo 2 e importar 4 → 2 no relatório, 2 na reserva, 1 aviso.
2. «＋ Usar» com o relatório cheio → recusa.
3. Linha do tamanho previsto presente; mudar a resolução recalcula.
4. Word com 60 KB menor do que com «Como gravadas»; a estimativa fica perto do real (Regi: 1,6 MB previsto / 1,65 MB real; 0,4 / 0,39).
5. Validação do .docx (ExPropria) nas 4 fases.
