import db from '../config/db.js';


// Função para listar funcionários
export const listarFuncionarios = (req, res) => {
    db.query('SELECT * FROM funcionarios', (err, results) => {
        if (err) return res.status(500).json( {erro: 'Erro ao buscar funcionários'});
        res.json(results);
    });


};

// Função para inserir um novo funcionário
export const inserirFuncionario = (req, res) => {


    const { nome, cargo, salario } = req.body;

// tecnica de proteção contra SQL Injection, onde os valores são passados como parâmetros separados, evitando a concatenação direta
// de strings na consulta SQL. Isso ajuda a prevenir ataques de injeção de SQL, onde um invasor poderia tentar inserir código malicioso na consulta.

    const sql = 'INSERT INTO funcionarios (nome, cargo, salario) VALUES (?,?,?)';
    db.query(sql, [nome, cargo, salario], err => {
         if (err) return res.status(500).json( {erro: 'Erro ao inserir funcionário'});
        res.json({ menssagem:'Funcionário inserido com sucesso!'});
    });

};

//Função para atualizar
export const atualizarFuncionario = (req, res) => {

    const { id } = req.params;
    const { nome, cargo, salario } = req. body;

    //Aqui estamos indicando para o sql que queremos deixar separado os valores, usando o ponto de interrogação 
    // como um marcador de posição para os valores que serão passados posteriormente como um array. 
    // Isso é uma prática recomendada para evitar vulnerabilidades de SQL Injection, onde um 
    // invasor poderia tentar inserir código malicioso na consulta SQL.

    const sql = 'UPDATE funcionarios SET nome=?, cargo=?, salario=? WHERE id=?';
    db.query(sql, [nome, cargo, salario, id], err => {

    if(err) return res. status(500).json( {erro: 'Erro ao atualizar funcionário'});
    res.json({ mensagem:'Funcionário atualizado com sucesso!'});
    });
};

export const excluirFuncionario = (req, res) => {
//Qual id irei fazer a exclusão, por isso pego o id dos parâmetros da requisição
    const { id } = req.params;

    //adicionar o where separado para não excluir todos os funcionários, 
    // e o id é passado como um array para evitar SQL Injection
    db.query('DELETE FROM funcionarios WHERE id=?', [id], err=>{
        if(err) return res.status(500).json( {erro: 'Erro ao excluir funcionário'} );

        //emnsagem de exclusão bem sucedida
        res.json( {mensagem: 'Funcionário excluído com sucesso!'} );
    });
};