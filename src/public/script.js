const API_URL = 'http://localhost:3000/funcionarios';

// configuração para poder receber a resposta do servidor 
async function carregarFuncionarios(){
    
    // pausa a execução da função até que a resposta do servidor seja recebida
    const response = await fetch(API_URL);
    // converte a resposta do servidor para um formato que possa ser manipulado em JavaScript
    const funcionarios = await response.json();

    const tabela = document.getElementById('tabela-funcionarios');
    tabela.innerHTML = '';


   
    funcionarios.forEach(func =>{
        // foi criado uma variavel para chamar cada funcionario e exibir seus dados na tabela
        const tr = document.createElement('tr');

        //um objeto (func) é criado para cada funcionário e seus dados 
        // são inseridos na tabela usando a propriedade innerHTML

        //criação dos botões de editar e excluir para cada funcionário

        tr.innerHTML = `
            <td>${func.id}</td>
            <td>${func.nome}</td>
            <td>${func.cargo}</td>
            <td>${parseFloat(func.salario).toFixed(2)}</td>
            <td>
                <button onclick="editarFuncionario(${func.id}, 
                ${func.nome}, ${func.cargo}, ${func.salario})">Editar</button>
                <button onclick="excluirFuncionario(${func.id})">Excluir</button>
            </td>
            `;
            tabela.appendChild(tr);
    });
};
// "e" de prevent default, para evitar que a página seja recarregada ao enviar o formulário 
document.getElementById('funcionarioForm').addEventListener('submit', async (e) =>{
    e.preventDefault();
// os valores dos campos do formulário são obtidos usando o método getElementById e 
// armazenados em variáveis
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const cargo = document.getElementById('cargo').value;
    const salario = document.getElementById('salario').value;
// um objeto é criado para armazenar os dados do funcionário, que serão enviados para o servidor
    const funcionario = { 
        nome,
        cargo,
        salario
    };

    if(id){

        await fetch(`${API_URL}/${id}`, {

            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(funcionario)
            });
        

    }else{
        await fetch(API_URL, {

            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(funcionario)
          
        });
    }

    e.target.reset();
    document.getElementById('id').value = '';
    carregarFuncionarios();

});

function editarFuncionario(id, nome, cargo, salario){
    document.getElementById('id').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('cargo').value = cargo;
    document.getElementById('salario').value = salario;

}

async function excluirFuncionario(id){
    if(confirm('Tem certeza que deseja excluir este funcionário?')){
        await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
        carregarFuncionarios();
    }
}
