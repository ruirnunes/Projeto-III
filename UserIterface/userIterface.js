/*
OBJETIVO:
Atualizar a interface sempre que o estado mudar.

PENSAMENTO:

1) Selecionar o container da lista.
2) Limpar o conteúdo antes de renderizar novamente.
3) Para cada transação:
   - Criar elemento HTML dinamicamente.
   - Inserir no DOM.
4) Atualizar os cards com os valores calculados.

REFLEXÃO:
- Por que limpar antes de renderizar?
- O que acontece se não limpar?

DESAFIO:
Como aplicar classes diferentes para receita e despesa?
*/

import { getTransacoes } from "../State/state.js";
import { calcularTotais } from "../Transactions/transactions.js";

const listaTransacoes = document.querySelector('.lista-transacoes');

export function renderLista(){
   const transacoes = getTransacoes()
   listaTransacoes.innerHTML = '';
   transacoes.forEach(t => {

      // 1) linha da transação
      const item = document.createElement('div');
      item.classList.add('item-transacao');

      const nome = document.createElement('span');
      nome.classList.add('nome-transacao');
      nome.innerText = t.descricao;

      const tipo = document.createElement('span');
      tipo.classList.add('etiqueta');
      tipo.innerText = t.tipo;

      if (t.tipo === 'receita') {
         tipo.classList.add('etiqueta-receita');
      } else {
         tipo.classList.add('etiqueta-despesa');
      }

      // 4) coluna: data
      const data = document.createElement('span');
      data.classList.add('data-transacao');
      data.innerText = new Date().toLocaleDateString();

      // 5) coluna: valor
      const valor = document.createElement('span');
      valor.classList.add('valor-transacao');
      valor.innerText = `${t.valor} €`;

      if (t.tipo === 'receita') {
         valor.classList.add('positivo');
      } else {
         valor.classList.add('negativo');
      }

      // montar a linha
      item.appendChild(nome)
      item.appendChild(tipo)
      item.appendChild(data);
      item.appendChild(valor);

      // adicionar à lista
      listaTransacoes.appendChild(item);
   });
}

export function atualizarCards(){
   const totais = calcularTotais(getTransacoes())

   const valoresCards = document.querySelectorAll('.card .valor')
   
   const cardBalanco = valoresCards[0]
   const cardReceita = valoresCards[1]
   const cardDespesa = valoresCards[2]

   cardBalanco.innerText = totais.total
   cardReceita.innerText = totais.totalReceita
   cardReceita.classList.add('positivo')
   cardDespesa.innerText = totais.totalDespesa
}