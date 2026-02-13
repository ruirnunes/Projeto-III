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
const inputDate = document.getElementById('data-transacao')
const mesFiltro = document.getElementById('mes-filtro')
const anoFiltro = document.getElementById('ano-filtro')
const tituloFiltro = document.querySelector('.sub-titulo-historico')
const extratoCompleto = document.querySelector('.link-extrato')

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

meses.forEach((mes,index)=>{
    const opcaoMes = document.createElement('option')
    opcaoMes.value = index
    opcaoMes.innerText = mes
    mesFiltro.appendChild(opcaoMes)
})

const anoAtual = new Date().getFullYear()
for (let i = anoAtual; i >= anoAtual - 10; i--){
    const opcaoAno = document.createElement('option')
    opcaoAno.value = i
    opcaoAno.innerText = i
    anoFiltro.appendChild(opcaoAno)
}

mesFiltro.value = new Date().getMonth()
anoFiltro.value = new Date().getFullYear() 

mesFiltro.addEventListener('click',filtrarHistorico)
anoFiltro.addEventListener('click',filtrarHistorico)

btnAdicionar.addEventListener('click',()=>{
    const novaTransacao = objectTransacao(inputDescricao, inputValor, tipoTransacao, inputDate);
   
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
    filtrarHistorico()
    // renderLista()   
    atualizarCards()

    // limpar inputs
    inputDescricao.value = '';
    inputValor.value = '';
    inputDate.value = ''
})

extratoCompleto.addEventListener('click',()=>{
    renderLista(getTransacoes());
    tituloFiltro.innerText = 'Histórico — Todas as transações'
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

function objectTransacao(inputTexto, inputNumero, selectTipo, inputDate){
    if (!validarInputs(inputTexto,inputNumero)) return null
    
    return {
        id: Date.now(),
        descricao: inputTexto.value.trim(),
        valor: Number(inputNumero.value),
        tipo: selectTipo.value,
        date: inputDate.value
    }
    
}

function filtrarHistorico() {
    const mesSelecionado = Number(mesFiltro.value)
    const anoSelecionado = Number(anoFiltro.value)

    // pega todas as transações
    const todasTransacoes = getTransacoes()

    // filtra pelo mês e ano
    const transacoesFiltradas = todasTransacoes.filter(t => {
        const data = new Date(t.date)
        return data.getMonth() === mesSelecionado && data.getFullYear() === anoSelecionado
    })

    const nomeMes = meses[mesSelecionado]
    tituloFiltro.innerText = `Histórico - ${nomeMes} ${anoSelecionado}`
    
    // renderiza apenas as transações filtradas
    renderLista(transacoesFiltradas)
}

filtrarHistorico()
// renderLista()
atualizarCards()
