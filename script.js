const lista = document.getElementById("lista");
const despesa = document.querySelector(".saldo--despesas--receitas .minio");
const receita = document.querySelector(".saldo--despesas--receitas .plus");
const totalReceita = document.querySelector(".saldo--despesas--receitas h1");
const form = document.getElementById("form");
const nome = document.getElementById("nome--transacao")
const senha = document.getElementById("senha--transacao")
let id = 0

const localStorageProdutos = JSON.parse(localStorage.getItem("produtos"))
let produtos = localStorage.getItem('produtos') !== null ? localStorageProdutos : []

const pegarProdutos = (prod) =>{
    console.log(prod)
    const operador = prod.preco > 0 ? "+" : "-";
    const callName = prod.preco > 0 ? "plus" : "minio"
    const precoSemOperador = Math.abs(prod.preco)
    const li = document.createElement("li");
    li.className = callName
    li.innerHTML = `${prod.nome} 
    <span class=${callName}> ${operador} R$ ${precoSemOperador}</span>
    <button class="deletar" onClick="excluir(${prod.id})">x</button>`
    lista.append(li)
}

function excluir(id){
    produtos = produtos.filter(item => item.id !== id);
    ini();
    updateLocalStorage();
}

function somaDosValores(){
    const pegandoPreco = produtos
    .map(item => item.preco);
    const total = Math.abs(pegandoPreco
    .reduce((ac, ini) => ac + ini, 0))
    .toFixed(2);

    const positivo = Math.abs(pegandoPreco
    .filter(item => item > 0)
    .reduce((ac, iniciar) => ac + iniciar, 0))
    .toFixed(2);
    
    const negativo = Math.abs(pegandoPreco
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
    nome.focus();
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
            alert("Preencha os campos");
            return
        }

        if(senha.value.trim() && nome.value.trim()){

            const produtosLocal = localStorage.getItem('produtos');
            console.log(produtos)

            id++;
            const addLista = {
                id: id, 
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