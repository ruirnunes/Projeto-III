/*
OBJETIVO:
Calcular saldo total, total de receitas e total de despesas.

PENSAMENTO:

1) O saldo começa em 0.
2) Para cada transação:
   - Se for receita, soma.
   - Se for despesa, subtrai.
3) Para calcular totais separados:
   - Filtrar por tipo.
   - Somar valores.

DICA IMPORTANTE:
Use reduce().

Pergunta:
- O que é o acumulador?
- Qual deve ser o valor inicial?

Exemplo mental:
[100, -50, 200]
Resultado esperado: 250

Não escreva loops tradicionais.
*/


export function calcularTotais(transacoes){
   const totais = transacoes.reduce((acc,transacao)=>{
      if (transacao.tipo === 'receita'){
         acc.receita += transacao.valor
      } else if (transacao.tipo === 'despesa'){
         acc.despesa += transacao.valor
      }
      return acc
   },{ receita:0, despesa:0 }) 

   let saldo = totais.receita - totais.despesa

   return {
      total: saldo, 
      totalReceita: totais.receita, 
      totalDespesa: totais.despesa
   }
}