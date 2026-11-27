# Terrenos TOF (não aptos para construção) — motor comum `comum/tof.js` — versão 1.1

**Fonte única: `comum/tof.js`.** Não se edita dentro das apps: edita-se `comum/tof.js` e corre-se `python3 tools/sync_comum.py` (copia o bloco `/* @comum:tof vX.Y … */ … /* @fim:tof */` para cada app que o tem; `--check` só verifica e lista as versões). As apps continuam num ficheiro único (funcionam sem rede).

Dois métodos para TOF: **valores de referência** (€/m² com fonte) e **rendimento das culturas** (abaixo).

## Biblioteca de referências (partilhada por ficheiro)
- Valores de referência do perito por *cultura | método* (`settings.calcRefs`, chave `cultura normalizada|método`; `ref` = valor de referência direto), com fonte.
- «⬇ Exportar» gera `Biblioteca_TOF_AAAA-MM-DD.json` (`kind: PFK_TOF_Biblioteca`); «⬆ Importar» junta-a na outra app/aparelho (as entradas importadas atualizam as da mesma chave). Está na janela do cálculo (as duas apps) e no bloco «Valores de referência» da AvaLias.
- No iPhone cada app instalada guarda os seus dados à parte: a troca faz-se por este ficheiro.

## v1.1 — valores por defeito fundamentados e histórico (regra [sugestoes.md](sugestoes.md))
- Cada parâmetro pode ter uma sugestão com fonte (`CALC_SUG`): olival tradicional — 90 árvores/ha e 650 kg/ha (CEPAAL, Carta Digital do Azeite 2024: 80–100 árv./ha; 500–800 kg/ha), preço da azeitona para azeite 0,57 €/kg (SIMA/GPP, semana 1/2026 — atualizar), taxa 4 % (relatórios de arbitragem de exemplo — fundamentar). Sem fonte (encargos, idades, vinha), a caixa fica vazia.
- O último valor usado em cada parâmetro (por método) passa a sugestão seguinte («último valor usado (data)») e vai na biblioteca exportada.
- ✓ / ✕ campo a campo e «✓ Aceitar todas as sugestões».

## Terrenos — enquadramento e infraestruturas (AvaLias 1.4)
- **PDM obrigatório em terrenos** (como no ExPropria, 2.6): instrumentos em vigor, publicação, classe de solo, categoria/qualificação, designação no PDM, RAN, REN, perigosidade de incêndio, outras restrições, regime de edificabilidade/índices. A verificação avisa se faltar a classe de solo.
- **Acessos e infraestruturas pela lógica do Código das Expropriações** (todas as verbas com contexto): «Acesso ao local» escalonado — Sem acesso direto · Caminho de pé · Caminho em terra · Caminho tipo agroflorestal · Rua não pavimentada · Rua em construção · Rua pavimentada · Estrada não pavimentada · Estrada em construção · Estrada; depois «Disponibilidade, em frente ao local, de»: Passeios · Rede de água · Rede pluvial · Rede de saneamento · Rede de telecomunicações · Rede de energia · Rede de iluminação. Os antigos «Acessos» passam para a nova escala; «Infraestruturas» (Bom/Mau) deixou de existir.

## Rendimento das culturas

Origem: **ExPropria 0.15.x** (🧮 Calcular nos preços unitários — «Calculadoras do V_Un»). Métodos:
rotação de culturas (rendimento fundiário: RF = quota × (RB − DE), capitalizado), olival / pomar sem fim de vida (renda perpétua, curva de produção até à plena produção), vinha / pomar (ciclo), eucaliptal (valor atual dos cortes, desconto contínuo), pinhal (plano de cortes, desconto discreto), as 6 classes de rendas e a soma de rendimentos (blocos autónomos). Valores por defeito dos relatórios de exemplo; referências com fonte (📚); «Valor de referência» com fonte obrigatória como alternativa ao calculado (fica guardado por cultura e método).

Resultado: **V_Un em €/m²**, os parágrafos e quadros do cálculo (`W`) e a fundamentação (`fund`).

## Onde está aplicada
| App | Versão | Quando | Saída |
|---|---|---|---|
| ExPropria | 0.15.6 | preços unitários das parcelas, ocupação temporária | Word com o cálculo e folha Excel embutida |
| AvaLias | 1.4 | verba **Terreno** com destino Produção agrícola / florestal / Agroflorestal **e** método «Rendimento (capitalização)» assinalado | ficha › 8 · Valor: «🧮 Calcular» (método proposto pela «Cultura / ocupação»); valor estimado = área do terreno × V_Un; Word: «Cálculo pelo rendimento» na análise da verba (parágrafos, quadros e «Valor do terreno = área × V_Un»). Sem folha Excel embutida. |

## Na AvaLias
- O bloco `@comum:tof` fica isolado em `const CULT=(()=>{…})()`; sem `calcXls` (sem folha Excel embutida).
- TOF = Terreno com destino Produção agrícola / florestal / Agroflorestal. Em «7 · Métodos»: «Valores de referência» → bloco com sugestões da biblioteca, valor (€/m²) + fonte obrigatória, «Aplicar» (valor = área × €/m²; guarda na biblioteca com a chave `cultura|ref`); «Rendimento (capitalização)» → «🧮 Calcular». Word: «Valor de referência» e/ou «Cálculo pelo rendimento» na análise da verba.
- A chave da biblioteca usa a «Cultura / ocupação» (ex.: «Olival»), a mesma designação que no ExPropria.
- Dados na verba: `al.refV`, `al.refF`, `al.tofRef`, `al.calc` (método, parâmetros, referência), `al.calcW`, `al.calcTxt`, `al.vun`, `al.fund`, `al.cultTipo`.

## Testes mínimos
Terreno de 5000 m², olival de 40 anos, plena produção aos 15, 3000 kg/ha × 0,55 €/kg, encargos 60 %, taxa 4 % → RF 660 €/ha/ano, 16 500 €/ha, 1,65 €/m², valor 8250 €; o Word mostra o quadro e o valor do terreno.
