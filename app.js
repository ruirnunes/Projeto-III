/*
OBJETIVO:
Conectar tudo.

PASSO A PASSO:

1) Capturar inputs do formulário.
2) Escutar clique do botão.
3) Validar dados.
4) Criar objeto transação.
5) Atualizar estado.
6) Re-renderizar UI.
7) Limpar formulário.

IMPORTANTE:
Sempre que adicionar uma transação:
- Atualizar lista
- Atualizar cards

Pergunta:
O que deve acontecer quando a página recarrega?
*/

import {adicionarTransacao, getTransacoes} from './State/state.js'
import { renderLista, atualizarCards } from './UserIterface/userIterface.js'

const inputDescricao = document.getElementById('descricao')
const inputValor = document.getElementById('quantidade')
const tipoTransacao = document.getElementById('tipo-transacao')
const btnAdicionar = document.querySelector('.adiciona-historia');
const alertaInput = document.getElementById('alerta-input');


btnAdicionar.addEventListener('click',()=>{
    const novaTransacao = objectTransacao(inputDescricao, inputValor, tipoTransacao);
   
    if (!novaTransacao) {
        // Mostra alerta de input inválido
        alertaInput.style.display = 'block';
        // Esconde o alerta após 3 segundos
        setTimeout(() => {
            alertaInput.style.display = 'none';
        }, 3000);
        return; // para a execução aqui, não adiciona nada
    }
    // Se passar na validação, esconde o alerta
    alertaInput.style.display = 'none';
    
    adicionarTransacao(novaTransacao)
    renderLista()   
    atualizarCards()

    // limpar inputs
    inputDescricao.value = '';
    inputValor.value = '';
})


function validarTexto(descricaoAdicionar){
    const textotest = descricaoAdicionar.value.trim();

    if (textotest.length < 4) return false;

    for (let char of textotest){
        if (!isNaN(Number(char)) && char !== ' ') {
            return false; 
        }
    }
    return true
}

function validarNumeros(valorAdicionar){
    const valorTest = Number(valorAdicionar.value)
    if (isNaN(valorTest) || valorTest <= 0){
        return false
    } else {
        return true
    }
}

function validarInputs(inputTexto,inputNumero){
    if (validarTexto(inputTexto) && validarNumeros(inputNumero)){
        return true
    }
    return false
}

function objectTransacao(inputTexto,inputNumero,selectTipo){
    if (!validarInputs(inputTexto,inputNumero)) return null
    
    return {
        descricao: inputTexto.value.trim(),
        valor: Number(inputNumero.value),
        tipo: selectTipo.value
    }
    
}

renderLista()
atualizarCards()
