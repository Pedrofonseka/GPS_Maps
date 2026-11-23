# AvaLias — métodos de avaliação por verba (interpretação do livro Best Value)

Estado: **interpretação apenas**, para implementar mais tarde. Fonte: folhas de exemplo VB_001 (EDC, custo), VB_002 (TAC, mercado) e VB_004 (TOF, valores de referência) do livro Excel *Ava_BestValue*. Não há aqui dados reais dos processos.

## 1. Siglas dos métodos

| Sigla | Método | Nota |
|---|---|---|
| CST | Custo (custo de reposição depreciado) | antes previsto como «CUS» — corrigido para CST |
| RES | Valor residual | |
| MER | Mercado (comparativo) | reserva um tópico de análise de mercado |
| RND | Rendimento (capitalização) | em TOF, o rendimento é a rotina das culturas já implementada |
| DCF | Fluxos de caixa (cash-flow) | |
| VRF | Valores referenciais | sigla confirmada (VRF) |
| Outros | — | |
| BFT | Encargos / benfeitorias | não é método: parcela que se soma ao valor do método |

## 1A. Decisões do utilizador (22/11/2026)

- Sigla dos valores referenciais: **VRF**.
- **ILZ** = percentagem do valor da construção imputável ao solo (lógica do Código das Expropriações) — confirmado.
- **Depreciação** tem várias componentes: Ross-Heidecke trata só a **física**; o utilizador pode desvalorizar também por **obsolescência** (funcional, económica/externa).
- Os ponderadores do topo da folha Excel servem apenas para **escolher** o método do caso (a folha tem vários métodos). Na app: podem aplicar-se **vários métodos** à mesma verba e o perito **decide qual o mais adequado** (valor adotado), com fundamentação — sem média ponderada obrigatória.

## 2. Estrutura comum a todas as folhas de verba

1. **Quadro de métodos** (topo): uma linha por método (M1…M6) com
   - peso `F` (0 a 1; a soma dos pesos tem de dar 1),
   - valor do método `K` = soma das parcelas desse método × fator temporal, arredondado à centena,
   - ponderado `M = F × K`; `%` = M / valor final.
   - **Valor da verba** = Σ(F × K) + BFT (encargos/benfeitorias).
2. **Repartição por grupo de ativo**: o mesmo valor é também somado por grupo (EDC, TAC, TOF, MOB, VEI, OTS…) e por parcelas especiais (BFT, TRF = transformação/demolição). Permite dizer, por exemplo, «terreno 16 900 € + construção 34 800 €».
3. **Fator temporal** `X14 = 1/(1+Tx)^T` (atualização pelo horizonte de concretização). Tabela de horizontes: Imediato (T 1, Tx 3%), Curto prazo (3; 4%), Médio prazo (5; 5%), Longo prazo (10; 7%), Inverosímil (100; 90%), Não aplicável (0; 0). Nos exemplos não está ativo (=1); a atratividade da verba sugere T e Tx.
4. **Arredondamentos**: parcelas e totais à centena (ROUND(…,-2)).
5. **BAD**: redução «até x %» (situação elegível do processo) — já existe na AvaLias.
6. Fecho: «Montante calculado em função da metodologia» → «Valor estimado (arredondado)».

## 3. CST — Custo (exemplo VB_001, moradia)

**[A] Solo** (terreno afeto à construção, por mercado/índices):
- `V_un = C × IUS × ILZ × Div × K_Ar × fator temporal`
  - C = custo de construção de referência (€/m², ex. 850),
  - IUS = índice de utilização do solo (ex. 0,30),
  - ILZ = percentagem do valor da construção imputável ao solo (ex. 6,5 %),
  - Div = coeficiente de divisão/ajuste (ex. 1),
  - K_Ar = correção de área: com Ar = área real e Ap = área padrão do tipo,
    `K_Ar = (Ap/Ar)^0,25` se |Ar−Ap|/Ap < 30 %, senão `(Ap/Ar)^0,125`.
- Parcela = área × V_un; + **encargos de aquisição** (ex. 7,5 %) → [A] arredondado.

**[B] Edificações** — uma linha por área (Abp privativa, Abd dependências…):
- `V_Novo = Área × K1 × C_NV × K_CNv` (custo a novo),
- depreciação **Ross-Heidecke**: tabela estado de conservação (8-Novo … 1-Impróprio) × idade relativa VUT = idade/vida útil (0 a 1) → coeficiente; `V_EFA = V_Novo × (1 − dep)` (o valor adotado «Adot» pode ser corrigido à mão).
- Somam-se: **TXL** taxas/licenças/projetos (% do custo a novo, ex. 7 %; só conta se o estado for ≥ 50 %), **DPF** depreciação funcional/de localização, **MLR** margem do promotor (% sobre o subtotal, ex. 15 %), **TRF** custos de transformação/demolição (negativo, % do custo a novo).
- Total = [A] + [B] + TXL − DPF + MLR + TRF.
- Indicadores calculados: valor a novo (NV), estado global EFA/NV, valor da construção sem terreno (VED), €/m² de terreno, €/m² de construção, €/m² do ativo.

## 4. MER — Mercado (exemplo VB_002, terreno parcialmente apto para construção)

Uma linha por **parcela/padrão** do terreno, com a fração da área (EXE, ex. 0,1 apta + 0,9 periurbana):
- `V_un = C × IUS × ILZ × K_Trf × Div × K_Fis × K_Imo`
  - K_Trf = transformação, K_Fis = características físicas, K_Imo = imóvel/localização (ex. 0,93), K_Area como acima.
- Parcela = área × V_un; [A] = soma arredondada; + [B] encargos/benfeitorias.
- **Testemunhos de mercado** (colunas à direita): por testemunho — preço, nº, área de terreno, área de construção/€ por m², IUS; calcula
  - €/m² de terreno = preço / área,
  - ILZ implícito = preço / (área × IUS × C) — serve para **calibrar o ILZ** adotado;
  - médias dos testemunhos no fim.
- Este bloco é o «tópico de análise de mercado» a reservar quando o método MER é escolhido.
- Para edifícios (bloco MER da VB_001, vazio no exemplo): áreas Abp, Abd, Abc, coeficiente de área equivalente K_Aec, área equivalente Aeq, valor adotado, K_Div e V_un de mercado.

## 5. RND — Rendimento (bloco da VB_001, vazio no exemplo)

Por linha: rendimento anual, nº de períodos, taxa, valor residual:
- [A] valor da renda = valor atual de N rendas (`−PV(taxa; N; renda)`) × fator temporal,
- [B] valor de saída (reversão) = renda perpétua aproximada (`PV` a 200 períodos) atualizada a N+1 com taxa + delta de saída (ex. +1 %),
- Total = [A] + [B]. (Para TOF usa-se a rotina das culturas.)

## 6. VRF / REF — Valores referenciais (exemplo VB_004, terreno florestal)

- Linha por povoamento/utilidade (ex. «FLO_04 – Florestal») com Vref (€/m², da tabela de valores de referência), K_Ar (correção de área), **K_Aju** e QTD.
- **K_Aju = K_LCZ × K_Prd × K_Res** — caracterização sucinta com pesos configuráveis:
  - K_LCZ (localização): enquadramento urbano, pressão urbana, infraestruturas, acessos;
  - K_Prd (produção): disponibilidade de água, energia, morfologia, potencial produtivo;
  - K_Res: restrições (RAN, REN, servidões…);
  - cada fator tem uma tabela de coeficientes por grupo (TAC/TOF) e cada conjunto tem pesos que somam 1.
- `Vun = Vref × K_Ar × K_Aju`; parcela = Vun × área, arredondada; + encargos/benfeitorias.
- Já existe na AvaLias o **valor de referência** para TOF; falta o K_Aju ponderado.

## 7. Encargos / benfeitorias (BFT), em todas as folhas

Linhas com Vref (da tabela), K1, K2, QTD → `parcela = QTD × Vref × K1 × K2 × fator temporal`; [B] = soma. Entram no valor final fora da ponderação dos métodos.

## 8. Tabelas de apoio necessárias

- Métodos (M1…M6: sigla, descrição, aplicabilidade por grupo).
- Valores de referência (código, grupo, área padrão, unidade, Vref, fonte).
- Depreciação Ross-Heidecke (8 estados × idade relativa 0…1).
- Horizonte temporal (T, Tx).
- Coeficientes de caracterização (centralidade, pressão urbana, infraestruturas, acessos, água, energia, morfologia, potencial produtivo, restrições) por grupo, e respetivos pesos.

## 9. Proposta de implementação gradual (a decidir)

1. ✅ (1.14) Quadro de métodos por verba: vários métodos, valor de cada um (à mão), escolha do método adotado + fundamentação; BFT à parte; síntese no Word.
2. ✅ (1.15) CST com depreciação física Ross-Heidecke (`comum/rhd.js`) + obsolescência funcional e económica; testado com o exemplo VB_001 (51 700 €).
3. MER com testemunhos e calibração do ILZ (tópico de análise de mercado).
4. VRF com K_Aju ponderado (aproveitando a caracterização sucinta já existente).
5. RND para edifícios ✅ (1.16, com BFT em tabela); DCF; RES.
Cada cálculo sai no Word como Excel embutido (regra das tabelas de cálculo).

## 10. Resumo do processo (feito na 1.12)

Como a folha OUT_Resumo: por verba — valor apurado e % relativa ao total; total apurado; por grupo — Qtd, parciais e %. Sai no Word como Excel embutido editável e no ZIP como `<codigo>_Resumo.xlsx`. Quando houver métodos, o valor de cada verba é o do método adotado + BFT.

## 11. Obras inacabadas, em curso ou em ruína parcial (CST, 1.18)

Lógica do perito (custo evolutivo / residual): valor = terreno + % de obra realizada ou aproveitável × valor da construção − custos de demolição, limpeza e transformação. Ex.: 20 + 20 % × 150 − 3 = 47.

- Coluna «Exec. %» por construção: V. novo × Exec. × (1 − dep. física).
- Custos de demolição/limpeza/transformação em € (a deduzir), além da % sobre o valor novo.
- Tabela de estado de execução por capítulos (pesos somam 100 %; realizado 0–100 % de 10 em 10). Estruturas de custo **indicativas** (capítulos principais; a confirmar/corrigir pelo perito — não são de fonte oficial):
  - Moradia: estaleiro 3, terras e fundações 8, estrutura 22, alvenarias 10, cobertura 8, águas/esgotos 6, eletricidade/telecom 6, rebocos/isolamentos 8, caixilharia/serralharias 8, carpintarias 5, revestimentos 8, pinturas 3, louças/equipamentos/climatização 5.
  - Habitação coletiva: 3, 7, 24, 9, 4, 7 (águas/esgotos/gás), 7 (eletricidade/ITED), 5 (elevadores/climatização), 8, 8, 5, 8, 3, 2.
  - Pavilhão: estaleiro 3, terras e fundações 12, estrutura 30, cobertura e revest. laterais 22, alvenarias 6, pavimento industrial 12, águas/esgotos 4, eletricidade 6, portões/caixilharia 5.
  - Anexo / apoio: terras e fundações 12, estrutura e alvenarias 40, cobertura 20, rebocos e pinturas 10, caixilharia e portas 10, instalações 8.
