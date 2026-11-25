# ProspeMerc — prospeção de mercado (app de ensaio)

App separada para testar a prospeção e a homogeneização sem complicar a AvaLias. Se funcionar, integra-se na AvaLias (ver docs/avalias/PROSPECAO.md).

## 0.1 (25/11/2026)
- Estudos: venda (€/m²) ou arrendamento (€/m²/mês); sujeito (ativo a avaliar) com área.
- Comparáveis C01, C02… (sequenciais): fonte, ligação, data, oferta/transação, preço ou renda, área, tipologia, ano, estado, localização, notas.
- Etiqueta de cada anúncio: imagem (captura do ecrã no iPhone) ou colar (PC); rodar, ver, eliminar.
- Texto colado do anúncio → «Ler preço e área» (só preenche o que estiver vazio).
- Matriz de homogeneização: negociação (sugerida nas ofertas, Definições: −10 %), localização, área, estado/idade, qualidade, outro; soma dos ajustes ou produto dos coeficientes; incluir/excluir comparáveis.
- Resultado: média, mediana, desvio-padrão, CV (aviso > 15 %), mín./máx.; valor unitário adotado (sugerido = média; fixar escrevendo outro) e justificação; valor ou renda de mercado = adotado × área.
- Saídas: Excel com fórmulas (para o Word como quadro Excel); imprimir/PDF com matriz e etiquetas (legenda por baixo, à esquerda); JSON do estudo (para levar para a AvaLias).

## Por fazer (se o ensaio correr bem)
- Marcas nas etiquetas (ferramenta comum das imagens).
- Fatores sugeridos para a área (elasticidade) e para o estado.
- Importação na AvaLias: estudo → método comparativo (venda) ou rendimento (renda).
