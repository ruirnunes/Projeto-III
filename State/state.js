import { guardarTransacoes, carregarTransacoes } from "../Storage/storage.js";

let transacoes = carregarTransacoes()

export function adicionarTransacao(transacao){
   transacoes.push(transacao)
   guardarTransacoes(transacoes)
}

export function getTransacoes(){
   return [...transacoes]
}

export function removerTransacao(id){
   transacoes = transacoes.filter(t => t.id !== id);
   guardarTransacoes(transacoes)
}