# Biblioteca de siglas — versão 1.0

Biblioteca comum às apps (periText, AvaLias, ExPropria e as que vierem a usá-la). Motor: `comum/siglas.js` (copiado para as apps por `tools/sync_comum.py`). Lista de partida dada pelo utilizador em 25/11/2026.

## Regras
- Cada sigla tem **sigla · significado · grupo**. Maiúsculas e minúsculas contam (Abp, Abd, MdE).
- **Uma sigla, um significado**, sempre que possível. Exceção atual: **AT** = Área de terreno (Áreas) **e** Autoridade Tributária e Aduaneira (Outras) — na lista do relatório fica o sentido que o texto também escreve por extenso; se não escrever nenhum, fica «Área de terreno».
- Números a seguir à sigla contam como a mesma sigla (PE1, PE2 → PE). Códigos com «_» (VB_001, OV_003) não contam.
- Sigla nova: acrescentar aqui e em `comum/siglas.js` (mesmo grupo), subir a versão e sincronizar as apps.

## Grupos e siglas
**Tipos de ativo:** MOR Moradia · FRH Fração habitacional · CSV Comércio ou serviços · PAV Pavilhão · AMZ Armazém · CPP Construções de pequeno porte · MUV Muros e vedações · BFT Benfeitorias · TAC Terreno apto para construção · TOF Terreno para outras finalidades (não edificativas) · VEI Veículos · MEQ Máquinas e equipamentos · MOB Mobiliário · SEP Sepulturas · OTS Outras situações

**Documentos e fontes:** CDP Caderneta predial · CRP Certidão de registo predial · BUPI Balcão Único do Prédio · LVT Levantamento topográfico · PLA Plantas · MdE Medição expedita · FTH Ficha técnica da habitação · CEN Certificado energético · AUT Autorização de utilização · PRJ Projeto · IMI Imposto Municipal sobre Imóveis · ETAR Estação de tratamento de águas residuais

**Áreas e quantidades:** AT Área de terreno · AI Área de implantação · Abp Área bruta privativa · Abd Área bruta dependente · SC Superfície coberta · SD Superfície descoberta · QTD Quantidade

**Informação:** NID Não identificado · NDT Não detetado · NTT Não testado · NFN Não fornecido · NAP Não aplicável

**Análise e valor:** HABU Máxima e melhor utilização (Highest and Best Use) · UC Uso continuado · UA Uso alternativo · VT Valor do terreno · VED Valor do edificado depreciado · PE Pressuposto especial · BAD Benefício económico de adjudicação direta · ESG Ambiente, social e governação · IFRS13 Norma internacional de relato financeiro 13 – justo valor

**Outras:** IS Instalação sanitária · AQS Águas quentes sanitárias · GPS Coordenadas geográficas · CMVM Comissão do Mercado de Valores Mobiliários · AT Autoridade Tributária e Aduaneira

## Funções do motor
- `siglaDe(s)` — significado(s) de uma sigla.
- `siglasUsadas(texto)` — siglas da biblioteca que aparecem no texto.
- `siglasDesconhecidas(texto)` — palavras em maiúsculas (2–6 carateres) que parecem siglas mas não estão na biblioteca (para a verificação antes de gerar).
- `siglasLista(texto)` — linhas da «Lista de siglas» do relatório: só as usadas, por ordem alfabética.

## Por decidir (propostas, ainda fora da biblioteca)
- Siglas já usadas nas apps e que faltam: EDC (Edifícios e construções), PDM, REN, RAN, CE (Código das Expropriações), DUP, VAPRM, CST/RES/VRF (métodos).
- Uso nas apps: 1) «Lista de siglas» no relatório (só as usadas); 2) aviso na verificação antes de gerar para siglas desconhecidas; 3) significado ao tocar numa sigla.

## Onde está aplicada
| App | Versão |
|---|---|
| — (biblioteca criada; ainda não ligada às apps) | — |
