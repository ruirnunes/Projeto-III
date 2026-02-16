import {adicionarTransacao, getTransacoes, removerTransacao} from './State/state.js'
import { renderLista, atualizarCards } from './UserIterface/userIterface.js'
import { validarInputs } from './Validations/validations.js'

// Captura dos elementos do DOM
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

// Lista de meses para o filtro
const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

// Preenche o select dos meses
meses.forEach((mes,index)=>{
    const opcaoMes = document.createElement('option')
    opcaoMes.value = index
    opcaoMes.innerText = mes
    mesFiltro.appendChild(opcaoMes)
})

// Preenche o select dos anos (últimos 10 anos)
const anoAtual = new Date().getFullYear()
for (let i = anoAtual; i >= anoAtual - 10; i--){
    const opcaoAno = document.createElement('option')
    opcaoAno.value = i
    opcaoAno.innerText = i
    anoFiltro.appendChild(opcaoAno)
}

// Define filtros iniciais com o mês/ano atual
mesFiltro.value = new Date().getMonth()
anoFiltro.value = new Date().getFullYear() 

// Atualiza a lista quando os filtros mudam
mesFiltro.addEventListener('change', () => {
   renderLista(filtrarHistorico(), onRemoverTransacao)
})
anoFiltro.addEventListener('change', () => {
   renderLista(filtrarHistorico(), onRemoverTransacao)
})

// Adiciona nova transação ao clicar no botão
btnAdicionar.addEventListener('click',()=>{
    const novaTransacao = objectTransacao(inputDescricao, inputValor, tipoTransacao, inputDate);
   
    if (!novaTransacao) {
        // Mostra alerta de input inválido
        alertaInput.style.display = 'block';
        setTimeout(() => {
            alertaInput.style.display = 'none';
        }, 3000);
        return; 
    }
    // Se passar na validação, esconde o alerta
    alertaInput.style.display = 'none';
    
    // Adiciona a transação ao estado e atualiza a UI
    adicionarTransacao(novaTransacao)
    renderLista(filtrarHistorico(),onRemoverTransacao)  
    atualizarCards(getTransacoes())

    // limpar inputs
    inputDescricao.value = '';
    inputValor.value = '';
    inputDate.value = ''
})

// Mostra todas as transações ao clicar no link de extrato completo
extratoCompleto.addEventListener('click',()=>{
    renderLista(getTransacoes(),onRemoverTransacao);
    tituloFiltro.innerText = 'Histórico — Todas as transações'
})

// Cria objeto de transação a partir dos inputs
function objectTransacao(inputTexto, inputNumero, selectTipo, inputDate){
    if (!validarInputs(inputTexto,inputNumero,inputDate)) return null
    
    return {
        id: Date.now(),
        descricao: inputTexto.value.trim(),
        valor: Number(inputNumero.value),
        tipo: selectTipo.value,
        date: inputDate.value
    }   
}

// Filtra as transações pelo mês e ano selecionados
function filtrarHistorico() {
    const mesSelecionado = Number(mesFiltro.value)
    const anoSelecionado = Number(anoFiltro.value)

    const todasTransacoes = getTransacoes()

    // filtra pelo mês e ano
    const transacoesFiltradas = todasTransacoes.filter(t => {
        const data = new Date(t.date)
        return data.getMonth() === mesSelecionado && data.getFullYear() === anoSelecionado
    })

    // Atualiza o título do Histórico
    const nomeMes = meses[mesSelecionado]
    tituloFiltro.innerText = `Histórico - ${nomeMes} ${anoSelecionado}`
    
    return transacoesFiltradas
}

// Remove transação pelo ID e atualiza UI
function onRemoverTransacao(id){
   removerTransacao(id);
   renderLista(filtrarHistorico(),onRemoverTransacao);
   atualizarCards(getTransacoes());
}

// Render inicial ao carregar a página
renderLista(filtrarHistorico(),onRemoverTransacao)
atualizarCards(getTransacoes())

