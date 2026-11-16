# Backup e troca entre aparelhos em 3 níveis — v1.0 (2026-11-16)

**Princípio (válido para todas as apps/formulários):** ações independentes, que só mexem no que foi escolhido, sem obrigar a backup geral e sem risco de estragar o que já está carregado. Serve para trabalhar partes diferentes de um processo em aparelhos diferentes (iPhone ↔ PC), em dias diferentes.

## Os 3 níveis
| Nível | O que leva | Ao receber |
|---|---|---|
| **Geral** | todos os processos, fotografias e definições | acrescentar (recomendado) ou substituir tudo |
| **Por processo** | um processo inteiro (com fotos) | acrescentar, substituir esse processo, ou manter os dois |
| **Por unidade** (verba, parcela…) | só as unidades escolhidas de um processo, com as fotos e as visitas a que pertencem | escolha **unidade a unidade**; os dados gerais do processo e as outras unidades não mudam |

## Receção por unidade
- Processo de destino: o mesmo identificador (id) de origem; se não existir, procurar pelo código (N_Ref) e perguntar; em último caso, criar um processo novo com essas unidades.
- Cada unidade recebida é classificada: **nova** (acrescentar / não acrescentar), **igual** (nada a fazer — comparação por assinatura do conteúdo), **diferente** (substituir pela recebida / manter a deste aparelho / manter as duas).
- Quando há data de alteração por unidade (AVA_Input: `t.mod`, atualizada ao gravar só na verba que mudou), indicar qual é a mais recente e propor por defeito a mais recente.
- «Manter as duas»: a recebida entra com identificadores novos e marcada (AVA: código `VB_002b` e «(recebida)»; ExPropria: «(cópia recebida)»).
- Correspondência: primeiro pelo id; depois pelo código/designação (VB_00n, n.º da parcela), sem reutilizar uma unidade que já corresponde a outra recebida.

## Rede de segurança
- «Desfazer» imediato depois de receber.
- Ponto de reposição guardado: AVA_Input — «↩ Repor como estava antes» na secção Por verba (até à receção seguinte); ExPropria — cópia automática do processo em Definições › 7 (30 dias).
- As fotografias substituídas só são apagadas depois de deixarem de estar referenciadas por uma cópia de reposição.

## Nomes dos ficheiros
`<Código>_Verbas_VB_001-VB_002_<data>.zip` (AVA) · `Exprop_parcelas_<N_Ref>_P701-P702_<data>.json` (ExPropria). Sem espaços nem acentos.

## Onde está aplicada
| App | Versão | Unidade | Onde |
|---|---|---|---|
| AVA_Input | 2.91 | verba | Mais › Backup › «Por verba» (+ atalho «⇄ Enviar / receber verbas» no ecrã das verbas); «Receber processo» aceita também ficheiros de verbas |
| ExPropria | 0.13.7 | parcela | separador Processo › «⇄ Trocar com outro aparelho»; importação de parcela isolada usa o mesmo caminho |

## Testes mínimos
Dois perfis de browser (A = iPhone, B = PC): A cria processo com 3 unidades e envia o processo a B; A altera as unidades 1 e 2, B altera a 3; A envia só 1 e 2; B recebe → 1 e 2 substituídas, a 3 de B intacta; repor → 1 e 2 voltam ao estado anterior, a 3 mantém-se.
