// Variáveis globais para edição
let registroEmEdicao = null;
let localizacaoEmEdicao = null;

function mostrarFormulario(localizacao) {
    document.getElementById('localizacoes').style.display = 'none';
    document.getElementById('detalhes-da-localização').style.display = 'block';
    document.getElementById('localizacaonome').textContent = localizacao;

    const tabelaDiv = document.getElementById('tabelas');
    tabelaDiv.innerHTML = '';

    carregarTabela(localizacao);
}

function voltarParaEscolha() {
    document.getElementById('localizacoes').style.display = 'block';
    document.getElementById('detalhes-da-localização').style.display = 'none';

    // Limpar os campos do formulário
    limparFormulario();
}

function limparFormulario() {
    document.getElementById('tartaruga').value = '';
    document.getElementById('cor').value = '';
    document.getElementById('placas').value = '';
    document.getElementById('marcação').value = '';
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
    document.getElementById('local').value = '';
    document.getElementById('metodo').value = '';
    document.getElementById('observacoes').value = '';
    document.getElementById('ninhosPorTemp').value = '';
    document.getElementById('ovosPorNinho').value = '';
}

function carregarTabela(localizacao) {
    let tabelas = JSON.parse(localStorage.getItem('tabelas')) || {};
    const tabelaDiv = document.getElementById('tabelas');

    // Garantir que a div seja limpa antes de adicionar a tabela
    tabelaDiv.innerHTML = '';

    let tabela = tabelas[localizacao] || [];

    let tabelaHTML = document.createElement('div');
    tabelaHTML.id = `tabela-${localizacao}`;
    tabelaHTML.innerHTML = `
        <h3 class="tituloTabela">Dados de ${localizacao}</h3>
        <table>
            <thead>
                <tr>
                    <th id="marcaçãoTam">Marcação</th>
                    <th>Local</th>
                    <th>Espécie</th>
                    <th>Cor da Carapaça</th>
                    <th>Número de Placas</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Método de Captura</th>
                    <th>Observações</th>
                    <th>Ninhos</th>
                    <th>Ovos por Ninho</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="tbody-${localizacao}"></tbody>
        </table>
    `;
    tabelaDiv.appendChild(tabelaHTML);

    const tbody = document.getElementById(`tbody-${localizacao}`);

    tabela.forEach((dado, index) => {
        const linha = tbody.insertRow();
        linha.insertCell(0).textContent = dado.marcaçãoId;
        linha.insertCell(1).textContent = dado.local;
        linha.insertCell(2).textContent = dado.especie;
        linha.insertCell(3).textContent = dado.corCarapaça;
        linha.insertCell(4).textContent = dado.placasLaterais;
        linha.insertCell(5).textContent = dado.date;
        linha.insertCell(6).textContent = dado.time;
        linha.insertCell(7).textContent = dado.metodCapture;
        linha.insertCell(8).textContent = dado.observacoes;
        linha.insertCell(9).textContent = dado.ninhosPorTemp;
        linha.insertCell(10).textContent = dado.ovosPorNinho;

        // Ações (Editar e Excluir)
        const acoesCell = linha.insertCell(11);
        acoesCell.innerHTML = `
            <button onclick="editarRegistro(${index}, '${localizacao}')">Editar</button>
            <button onclick="excluirRegistro(${index}, '${localizacao}')">Excluir</button>
        `;
    });
}

function adicionarDados() {
    const localizacao = document.getElementById('localizacaonome').textContent;
    const registro = {
        especie: document.getElementById('tartaruga').value,
        corCarapaça: document.getElementById('cor').value,
        placasLaterais: document.getElementById('placas').value,
        marcaçãoId: document.getElementById('marcação').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        local: document.getElementById('local').value,
        metodCapture: document.getElementById('metodo').value,
        observacoes: document.getElementById('observacoes').value,
        ninhosPorTemp: document.getElementById('ninhosPorTemp').value,
        ovosPorNinho: document.getElementById('ovosPorNinho').value,
    };

    if (registro.especie && registro.corCarapaça) {
        let tabelas = JSON.parse(localStorage.getItem('tabelas')) || {};
        if (!tabelas[localizacao]) {
            tabelas[localizacao] = [];
        }

        tabelas[localizacao].push(registro);
        localStorage.setItem('tabelas', JSON.stringify(tabelas));

        carregarTabela(localizacao);
        limparFormulario();
    } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
    }
}

function editarRegistro(index, localizacao) {
    registroEmEdicao = index;
    localizacaoEmEdicao = localizacao;

    const tabelas = JSON.parse(localStorage.getItem('tabelas')) || {};
    const registro = tabelas[localizacao][index];

    // Preencher os campos com os dados do registro selecionado
    document.getElementById('tartaruga').value = registro.especie;
    document.getElementById('cor').value = registro.corCarapaça;
    document.getElementById('placas').value = registro.placasLaterais;
    document.getElementById('marcação').value = registro.marcaçãoId;
    document.getElementById('date').value = registro.date;
    document.getElementById('time').value = registro.time;
    document.getElementById('local').value = registro.local;
    document.getElementById('metodo').value = registro.metodCapture;
    document.getElementById('observacoes').value = registro.observacoes;
    document.getElementById('ninhosPorTemp').value = registro.ninhosPorTemp;
    document.getElementById('ovosPorNinho').value = registro.ovosPorNinho;

    // Continuar na mesma seção
    mostrarFormulario(localizacao);
}

function salvarEdicao() {
    if (registroEmEdicao !== null && localizacaoEmEdicao !== null) {
        const tabelas = JSON.parse(localStorage.getItem('tabelas')) || {};

        const registro = {
            especie: document.getElementById('tartaruga').value,
            corCarapaça: document.getElementById('cor').value,
            placasLaterais: document.getElementById('placas').value,
            marcaçãoId: document.getElementById('marcação').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            local: document.getElementById('local').value,
            metodCapture: document.getElementById('metodo').value,
            observacoes: document.getElementById('observacoes').value,
            ninhosPorTemp: document.getElementById('ninhosPorTemp').value,
            ovosPorNinho: document.getElementById('ovosPorNinho').value,
        };

        tabelas[localizacaoEmEdicao][registroEmEdicao] = registro;

        localStorage.setItem('tabelas', JSON.stringify(tabelas));

        carregarTabela(localizacaoEmEdicao);
        limparFormulario();
        registroEmEdicao = null;
        localizacaoEmEdicao = null;

        alert("Registro atualizado com sucesso!");
    }
}

function excluirRegistro(index, localizacao) {
    let tabelas = JSON.parse(localStorage.getItem('tabelas')) || {};
    tabelas[localizacao].splice(index, 1);
    localStorage.setItem('tabelas', JSON.stringify(tabelas));

    carregarTabela(localizacao);
    alert("Registro excluído com sucesso!");
}
