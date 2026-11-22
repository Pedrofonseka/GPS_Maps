# Rotina de culturas — capitalização do rendimento — versão 1.0

Origem: **ExPropria 0.15.x** (🧮 Calcular nos preços unitários — «Calculadoras do V_Un»). Métodos:
rotação de culturas (rendimento fundiário: RF = quota × (RB − DE), capitalizado), olival / pomar sem fim de vida (renda perpétua, curva de produção até à plena produção), vinha / pomar (ciclo), eucaliptal (valor atual dos cortes, desconto contínuo), pinhal (plano de cortes, desconto discreto), as 6 classes de rendas e a soma de rendimentos (blocos autónomos). Valores por defeito dos relatórios de exemplo; referências com fonte (📚); «Valor de referência» com fonte obrigatória como alternativa ao calculado (fica guardado por cultura e método).

Resultado: **V_Un em €/m²**, os parágrafos e quadros do cálculo (`W`) e a fundamentação (`fund`).

## Onde está aplicada
| App | Versão | Quando | Saída |
|---|---|---|---|
| ExPropria | 0.15.x | preços unitários das parcelas, ocupação temporária | Word com o cálculo e folha Excel embutida |
| AvaLias | 1.2 | verba **Terreno** com destino Produção agrícola / florestal / Agroflorestal **e** método «Rendimento (capitalização)» assinalado | ficha › 8 · Valor: «🧮 Calcular» (método proposto pela «Cultura / ocupação»); valor estimado = área do terreno × V_Un; Word: «Cálculo pelo rendimento» na análise da verba (parágrafos, quadros e «Valor do terreno = área × V_Un»). Sem folha Excel embutida. |

## Na AvaLias
- O código é o do ExPropria, copiado tal como está e isolado (`const CULT=(()=>{…})()`), para se poder atualizar copiando de novo o mesmo troço (de «Calculadoras do V_Un» até `calcUsado`), substituindo só `calcRun` (sem `calcXls`).
- Dados na verba: `al.calc` (método, parâmetros, referência), `al.calcW`, `al.calcTxt`, `al.vun`, `al.fund`, `al.cultTipo`.

## Testes mínimos
Terreno de 5000 m², olival de 40 anos, plena produção aos 15, 3000 kg/ha × 0,55 €/kg, encargos 60 %, taxa 4 % → RF 660 €/ha/ano, 16 500 €/ha, 1,65 €/m², valor 8250 €; o Word mostra o quadro e o valor do terreno.
