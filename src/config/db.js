// estamos usando o mysql2 para criar uma conexão com o banco de dados
// MySQL. As credenciais do banco de dados são carregadas a partir do arquivo .env usando a biblioteca dotenv,
// que é uma prática comum para manter as informações sensíveis fora do código-fonte. A conexão é configurada com as variáveis
// de ambiente definidas no arquivo .env, como BD_HOST, DB_USER, DB_PASSWORD e DB_NAME.


import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//If que indica um erro na conexão, caso haja, ele exibe a
// mensagem de erro no console. Se a conexão for bem-sucedida,
// ele exibe uma mensagem de sucesso no console.

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySql:', err);
  } else {
    console.log('Conectado a MySql com sucesso!');
  }
});

export default connection;