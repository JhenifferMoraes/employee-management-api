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