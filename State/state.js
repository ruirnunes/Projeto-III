/*
OBJETIVO:
Centralizar o controle das transações em memória.

PENSAMENTO:

1) Carregar as transações salvas quando o sistema iniciar.
2) Criar função para:
   - Retornar lista atual.
   - Adicionar nova transação.
   - (Opcional) remover transação.
3) Sempre que alterar o estado:
   - Atualizar o localStorage.

REFLEXÃO:
- Por que não manipular o localStorage diretamente no UI?
- O que significa separar responsabilidade?

DESAFIO:
Como garantir que o array nunca fique fora de sincronia?
*/


import { guardarTransacoes, carregarTransacoes } from "../Storage/storage.js";



export function adicionarTransacao(transacao){
   let transacoes = carregarTransacoes()
   transacoes.push(transacao)
   guardarTransacoes(transacoes)
}

export function getTransacoes(){
   let transacoes = carregarTransacoes() 
   return transacoes
}