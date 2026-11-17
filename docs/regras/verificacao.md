# Verificação de gralhas e coerência nos ficheiros Word

**Princípio:** a mesma verificação corre sobre os ficheiros **gerados** (antes de exportar) e sobre os **importados** para produzir a versão final. Só avisa — nunca altera o texto. Funciona sem rede e sem IA.

## O que verifica

| Verificação | Regra |
|---|---|
| Número de outra unidade | «Parcela N» (ou verba) diferente da unidade do relatório. Não conta subparcelas da própria (`722.1`, `722-1`) nem ocupações temporárias com a forma `NT` (ex.: 5T). |
| Áreas | «com área de X m²» / «área expropriada de X m²» com X que não existe em nenhuma área do formulário. |
| Montante | «justa indemnização … X €» (ou «€ X») diferente do total calculado no formulário. |
| Valor por extenso | Texto entre parênteses com «euros» a seguir ao montante, comparado com o extenso do número que está no Word (ignora «e» e «de»). |
| Palavras repetidas | «de de», «a a»… (até 8 exemplos). |
| Espaços | Espaços duplos entre palavras; espaço antes de «,», «;», «:», «!» e «?». |
| Texto por preencher | `[…]`, `[...]`, `[… por indicar …]`, `[FOTOS]` que ficou, `xxx`. |
| Gralhas frequentes do vocabulário | benfeitoras → benfeitorias; expropia… → expropria…; indeminiza… / idemniza… → indemniza…; remanecente → remanescente; perícial → pericial; acordão → acórdão. Acrescentar aqui as que forem aparecendo. |

**Ortografia geral:** fica para o corretor do Word, com o idioma Português (Portugal). Um dicionário embutido pesaria vários MB e seria pior.

**Erros de raciocínio** (fórmulas, critérios, valores que não batem com o cálculo): não são verificáveis por regras fixas. Ficam para a revisão pelo Claude.

## Saída

Os avisos juntam-se aos que a app já mostra ao gerar ou importar, com o prefixo «Verificação ·» e um excerto de contexto («…texto…»).

## Teste

- Os 5 relatórios de arbitragem da Brisa (C-BGI-E26-0706) apanharam:
  - o extenso errado na 1018;
  - «quarente» na 997;
  - «benfeitoras» nos 5;
  - espaços duplos e espaço antes de «:».
- O Word gerado pela app com dados de teste: 0 avisos, sem falsos positivos.

## Onde está aplicada

- ExPropria 0.13.9: `verificarDoc(doc, parcela, v, c, {semValor})`, chamada em `buildWordARB` (Word, PDF, Pastas) e em `importarFinal`.
