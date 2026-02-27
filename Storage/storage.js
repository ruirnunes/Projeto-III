export function guardarTransacoes(transacao){
   localStorage.setItem('transacoes',JSON.stringify(transacao))
}

export function carregarTransacoes(){
   const dados = localStorage.getItem('transacoes')
   if (dados === null){
      return []
   } else {
      return JSON.parse(dados)
   }
}