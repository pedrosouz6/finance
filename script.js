const lista = document.getElementById("lista");
const despesa = document.querySelector(".saldo--despesas--receitas .minio");
const receita = document.querySelector(".saldo--despesas--receitas .plus");
const totalReceita = document.querySelector(".saldo--despesas--receitas h1");
const h4SaldoAtual = document.querySelector('#saldo-atual');
const form = document.getElementById("form");
const nome = document.getElementById("nome--transacao")
const senha = document.getElementById("senha--transacao")
const messageValidate = document.getElementById('message-validate')

const localStorageProdutos = JSON.parse(localStorage.getItem("produtos"))
let produtos = localStorage.getItem('produtos') !== null ? localStorageProdutos : [];

function numAleatorio() {
    const num = Math.round(Math.random()*5000);
    return num;
}

const pegarProdutos = (prod) =>{
    const operador = prod.preco > 0 ? "+" : "-";
    const callName = prod.preco > 0 ? "plus" : "minio";
    const precoSemOperador = Math.abs(prod.preco);
    const li = document.createElement("li");
    li.className = callName;
    li.innerHTML = `
        ${prod.nome}
        <span class=${callName}> ${operador} R$ ${precoSemOperador}</span>
        <button class="deletar" onClick="excluir(${prod.id})">x</button>`
        lista.append(li);
}
    
function excluir(id){
    produtos = produtos.filter(item => item.id !== id);
    ini();
    updateLocalStorage();
}
    
function somaDosValores(){
    const pegandoPreco = produtos.map(item => item.preco);

    const total = (pegandoPreco
    .reduce((ac, ini) => ac + ini, 0))
    .toFixed(2);

    const positivo = (pegandoPreco
    .filter(item => item > 0)
    .reduce((ac, iniciar) => ac + iniciar, 0))
    .toFixed(2);
    
    const negativo = (pegandoPreco
    .filter(item => item < 0)
    .reduce((ac, iniciar) => ac + iniciar, 0))
    .toFixed(2);
    
    totalReceita.innerHTML = `R$ ${total}`
    despesa.innerHTML = `R$ ${negativo}`
    receita.innerHTML = `R$ ${positivo}`
}

const ini = ()=>{
    lista.innerHTML = "";
    nome.value = "";
    senha.value = "";
    produtos.map(item => pegarProdutos(item));
    somaDosValores();
}

const updateLocalStorage = () => {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

function validar(){
    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        
        if(senha.value.trim() === "" || nome.value.trim() === ""){
            return messageValidate.classList.add('error');
        }
        
        if(senha.value.trim() && nome.value.trim()){
            messageValidate.classList.remove('error');
            
            const addLista = {
                id: numAleatorio(), 
                nome: nome.value, 
                preco: Number(senha.value)
            }
            produtos.push(addLista);
            ini();
            updateLocalStorage();
        }
    })
}

validar();
ini();