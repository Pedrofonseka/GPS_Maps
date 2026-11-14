# Biblioteca de regras — apps PFK

Regras e modelos comuns às apps HTML (Regi Anomalias, ExPropria, FullTopics, Revip, …).
Cada ficheiro descreve **uma rotina**: o que faz, o modelo de dados, a interface, as saídas e os testes.
Ao melhorar uma rotina numa app, atualizar o ficheiro respetivo e a tabela «Onde está aplicada».

| Rotina | Ficheiro | Versão |
|---|---|---|
| Fotografias (reserva, substituir, repetidas) | [fotos.md](fotos.md) | 1.0 |
| Máximo de fotos e tamanho previsto / resolução de saída | [tamanho.md](tamanho.md) | 1.0 |
| Imagens no Word: controlo de conteúdo «Imagem» (troca com um clique) | ver abaixo | 1.0 |

### Imagens no Word — controlo de conteúdo
Cada imagem gerada para Word vai dentro de um controlo de conteúdo de imagem (`<w:sdt><w:sdtPr><w:alias w:val="Imagem"/><w:id/><w:picture/></w:sdtPr><w:sdtContent>…run com w:drawing…</w:sdtContent></w:sdt>`), para que no Word um clique sobre a imagem permita trocá-la. Aplicado em: Relat_Anomalias 1.0.0.
