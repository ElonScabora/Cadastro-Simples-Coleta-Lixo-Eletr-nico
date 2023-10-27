// Cache DOM elements
const btnEnviar = document.querySelector('#botoes button:nth-child(1)');
const btnExcluir = document.querySelector('#botoes button:nth-child(2)');
const btnEditar = document.querySelector('#botoes button:nth-child(3)');
const inputs = document.querySelectorAll('#wrap input');
const tabela = document.querySelector('#saida table');
const checkboxes = tabela.querySelectorAll('input[type="checkbox"]');

// Event listeners
btnEnviar.addEventListener('click', cadastrarProduto);
btnExcluir.addEventListener('click', excluirProdutos);
btnEditar.addEventListener('click', editarProdutos);
checkboxes.forEach(checkbox => checkbox.addEventListener('change', verificar));

const BD = [];

function cadastrarProduto() {
    const produto = {
        nome: inputs[0].value,
        quantidade: inputs[1].value,
        preco: inputs[2].value,
        prateleira: inputs[3].value,
        descricao: inputs[4].value,
        categoria: inputs[5].value,
        id: BD.length
    };
    BD.push(produto);
    atualizarTabela();
}

function excluirProdutos() {
    for (let i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            BD.splice(i, 1);
        }
    }
    atualizarTabela();
}

function editarProdutos() {
    let selectedCount = 0;
    let selectedId = null;
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedCount++;
            selectedId = index;
        }
    });

    if (selectedCount === 1) {
        BD[selectedId].nome = inputs[0].value;
        BD[selectedId].quantidade = inputs[1].value;
        BD[selectedId].preco = inputs[2].value;
        BD[selectedId].prateleira = inputs[3].value;
        BD[selectedId].descricao = inputs[4].value;
        BD[selectedId].categoria = inputs[5].value;
        atualizarTabela();
    } else if (selectedCount > 1) {
        alert('Não é possível selecionar mais de 1 elemento.');
    }
}

function verificar() {
    let selectedCount = 0;
    let selectedId = null;
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedCount++;
            selectedId = index;
        }
    });

    if (selectedCount === 1) {
        inputs[0].value = BD[selectedId].nome;
        inputs[1].value = BD[selectedId].quantidade;
        inputs[2].value = BD[selectedId].preco;
        inputs[3].value = BD[selectedId].prateleira;
        inputs[4].value = BD[selectedId].descricao;
        inputs[5].value = BD[selectedId].categoria;
    }
}

function atualizarTabela() {
    tabela.innerHTML = `<tr><td width="30px"></td><td>Nome</td><td>Quant.</td><td>Preço</td></tr>`;
    BD.forEach(produto => {
        tabela.innerHTML += `<tr><td width="30px"><input type="checkbox"></td><td>${produto.nome}</td><td>${produto.quantidade}</td><td>${produto.preco}</td></tr>`;
    });
}
