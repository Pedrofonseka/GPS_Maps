# Página dos documentos Word — REGRA FIXA — versão 1.0 (22/11/2026)

Todos os documentos Word gerados por todas as apps (relatórios, fichas, texto corrido, qualquer gabinete) usam **a mesma página**. Com áreas de texto iguais, passar texto ou fichas de um documento para outro não altera a paginação.

| Medida | Valor | OOXML (`w:pgMar`, twips) |
|---|---|---|
| Papel | A4 ao alto | `w:pgSz w:w="11906" w:h="16838" w:code="9"` |
| Margem superior (limite do papel → início do texto) | **3,5 cm** | `w:top="1984"` |
| Cabeçalho (limite do papel → cabeçalho) | **0,5 cm** | `w:header="284"` |
| Margem inferior | 1,5 cm | `w:bottom="851"` |
| Rodapé (limite do papel → rodapé) | 0,5 cm | `w:footer="284"` |
| Margem esquerda | 2,5 cm | `w:left="1418"` |
| Margem direita | 1,5 cm | `w:right="851"` |

Largura útil do texto: 17,0 cm (9638 twips). Altura útil estimada para cálculos de paginação: 23,7 cm.

## Cabeçalho
- O conteúdo do cabeçalho tem de caber nos **3,0 cm** entre 0,5 cm e 3,5 cm. Se não couber, ajusta-se o cabeçalho (tamanhos de letra, entrelinha exata, altura do logotipo) — **nunca** a margem.
- Proficis: logotipo 1,81 cm de altura numa tabela à esquerda; «p» Times New Roman 20 pt; linhas em Franklin Gothic 9 pt com entrelinha exata 11 pt; cidades 9 pt; contactos 9–11 pt — termina a ~3,4 cm (verificado no LibreOffice).
- Cabeçalhos em imagem (ex.: AVA_Input, Proficis): altura máxima 1640 twips (2,9 cm).
- Não há margens por gabinete: a mesma para todos.

## Onde está aplicada
| App | Versão | Como |
|---|---|---|
| Relatório de Peritagem (relat) | 1.28.6 | `MTOP` = 1984 para todos; `w:header` 284; `PAGE_HU` 23,7 cm; cabeçalho Proficis ajustado; documentos de fichas e de texto corrido com a mesma página |
| AvaLias (avalias) | 1.1.3 | igual ao relat |
| Regi Anomalias (regi) | 0.18.2 | documentos de fichas e de texto corrido |
| ExPropria (expropria) | 0.15.4 | 4 modelos Word internos |
| AVA_Input (ava) | 2.92 | 7 modelos Word internos; logotipo do cabeçalho ≤ 2,9 cm |
| FullTopics (full) | 1.08 | `PAGE_STD` (sup. 0,5 + cabeçalho 3,0; inf. 0,5 + rodapé 1,0; esq. 2,5; dir. 1,5) — margens deixam de ser editáveis |
| Revip (revip) | 1.03 | margens do Word e tabulações do rodapé (centro 4819, direita 9638) |

## Testes mínimos
1. Gerar um Word e confirmar `w:pgMar` igual à tabela.
2. Converter para PDF (LibreOffice) e confirmar com `pdftotext -bbox` que a última linha do cabeçalho termina antes de 99 pt (3,5 cm) e que o texto começa a 99,2 pt.
