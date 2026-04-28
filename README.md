<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=007bff&height=180&section=header"/>

# Sistema de Gestão de Funcionários (Node.js + MySQL)

Este projeto implementa uma **API REST em Node.js** para realizar cadastro, consulta, atualização e exclusão (CRUD) de funcionários em um banco de dados MySQL. Desenvolvido a partir de uma aula online do YouTube, o projeto foi incrementado com diversas melhorias e boas práticas. Foram adicionadas técnicas não ensinadas na aula original, como um arquivo de estilos global (`global.css`), um `.gitignore` adequado e estruturação em módulos separados (rotas, controladores e configuração). Todo o código conta com comentários explicativos visando fins educativos, e seguiu diretrizes de *clean code* e mensagens de commit claras para cada etapa do desenvolvimento. Uma documentação passo-a-passo do projeto também foi elaborada separadamente para detalhar todo o processo. Abaixo, apresentamos os principais aspectos e instruções de uso do projeto.

### 🛠 Tecnologias e Ferramentas

- **Node.js** – Plataforma de execução JavaScript no servidor.  
- **Express** – Framework web para Node.js, usado para criar o servidor e rotas.  
- **MySQL / mysql2** – Banco de dados relacional e pacote `mysql2` para conexão.  
- **dotenv** – Gerenciamento de variáveis de ambiente (credenciais do banco, porta, etc).  
- **JavaScript (ES Modules)** – Uso de módulos ES (`import`/`export`) no projeto.  
- **HTML5, CSS3 e JavaScript** – Front-end estático para interação com a API. Inclui um arquivo `global.css` (reset de estilos) e `style.css` (layout e responsividade).  
- **Git/GitHub** – Controle de versão. Vários commits descritivos foram realizados para cada funcionalidade.  
- **Editor de Código** – Recomendado usar [VS Code](https://code.visualstudio.com/) (com a extensão Live Server para testes locais).  
- **MySQL Workbench** (ou outro cliente) – Para criar o banco de dados e tabelas.

### ⚙️ Configuração Inicial

1. Faça um clone deste repositório em sua máquina.  
2. Entre na pasta do projeto no terminal e execute `npm install` para instalar as dependências (Express, mysql2, dotenv).  
3. No arquivo `package.json`, adicione a propriedade `"type": "module"` (após `"description"`) para habilitar ES Modules.  
4. Crie um arquivo `.env` na raiz do projeto copiando o modelo `.env.example`. Preencha as variáveis de ambiente com suas informações do MySQL e porta do servidor (veja detalhes abaixo).  
5. Edite o arquivo `.gitignore` para ignorar `node_modules/` e o arquivo `.env` oficial (que contém credenciais sensíveis). O repositório já inclui um `.gitignore` configurado.  
6. Crie o banco de dados e as tabelas necessários no MySQL (comandos SQL no próximo tópico).  
7. Inicie o servidor com o comando `node server.js`. Se tudo estiver configurado corretamente, verá no console a mensagem: **Servidor rodando em http://localhost:<PORT>**.  

### 💾 Banco de Dados

O projeto utiliza um banco de dados MySQL chamado `empresa_db`. Para configurar o banco, execute os seguintes comandos (por exemplo, no MySQL Workbench ou console MySQL):

```sql
CREATE DATABASE empresa_db;
USE empresa_db;
CREATE TABLE funcionarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  cargo VARCHAR(100),
  salario DECIMAL(10,2)
);
```

- **BD_HOST**: endereço do servidor (geralmente `localhost`).  
- **DB_USER**: usuário do MySQL (por exemplo, `root`).  
- **DB_PASSWORD**: senha do usuário MySQL.  
- **DB_NAME**: nome do banco de dados (`empresa_db`).  
- **PORT**: porta em que o servidor Express irá rodar (por exemplo, `3000`).  

Essas variáveis devem ser definidas no arquivo `.env`. O projeto já inclui um `.env.example` (sem valores) para servir de modelo: basta copiar para `.env` e preencher os campos. O `.env.example` e o `.gitignore` garantem que as credenciais não sejam expostas no repositório.

### 🔍 Estrutura do Projeto

O código foi organizado em módulos para facilitar a manutenção:

```
/ (raiz do projeto)
├── node_modules/
├── .gitignore
├── .env
├── .env.example
├── server.js             # Configuração do servidor 
    ├── config/
    │   └── db.js         # Conexão com o MySQL (mysql2 + dotenv)
    ├── controllers/
    │   └── funcionarioController.js  # Lógica de negócio (funções CRUD)
    ├── routes/
    │   └── funcionarioRoutes.js      # Definição das rotas /funcionarios
    └── public/
        ├── index.html    # Interface web (formulário e tabela de funcionários)
        ├── global.css    # Reset global de estilos e fontes
        ├── style.css     # Estilos específicos (layout, cores, responsividade)
        └── script.js     # Código cliente (fetch API para a API Node.js)
```

- **config/db.js**: Faz a conexão com o MySQL usando as variáveis do `.env`. Exibe no console se a conexão foi bem sucedida ou se ocorreu um erro.  
- **controllers/funcionarioController.js**: Contém as funções que executam as operações SQL no banco. Por exemplo, `listarFuncionarios` faz `SELECT * FROM funcionarios`, `inserirFuncionario` faz um `INSERT` com parâmetros (preparando as instruções para evitar SQL Injection, usando `?`), etc. Cada função envia a resposta JSON apropriada ao cliente ou retorna erro 500 em caso de falha.  
- **routes/funcionarioRoutes.js**: Define as rotas REST relativas aos funcionários, indicando qual função do controller será chamada em cada método HTTP.  
- **server.js**: Inicializa o servidor Express, aplica o middleware `express.json()` para ler JSON no corpo das requisições, faz o roteamento em `/funcionarios` e inicia a escuta na porta definida. A porta padrão é lida de `process.env.PORT` ou 3000.  

### 🔧 Rotas e Endpoints

A API fornece os seguintes endpoints para gestão de funcionários (todos sob o caminho base `/funcionarios`):

- **GET /** – Lista todos os funcionários cadastrados. Retorna JSON com um array de objetos, cada um contendo `id`, `nome`, `cargo` e `salario`.  
- **POST /** – Insere um novo funcionário. Recebe no corpo da requisição (JSON) os campos `nome`, `cargo` e `salario`. Em caso de sucesso, retorna uma mensagem de confirmação.  
- **PUT /:id** – Atualiza o funcionário com o `id` informado na URL. Recebe no corpo os novos valores `nome`, `cargo` e `salario`. Retorna mensagem de sucesso ou erro.  
- **DELETE /:id** – Remove o funcionário com o `id` informado. Retorna mensagem confirmando a exclusão.  

Exemplo de definição de rotas em `funcionarioRoutes.js`:

```js
router.get('/', listarFuncionarios);
router.post('/', inserirFuncionario);
router.put('/:id', atualizarFuncionario);
router.delete('/:id', excluirFuncionario);
```

### 💻 Interface Web (Front-end)

Para interagir com a API de forma visual, há uma página HTML em `src/public/index.html`. Ela contém:

- Um **formulário** para cadastrar ou atualizar funcionários, com campos para nome, cargo e salário. Ao submeter, dispara evento JavaScript.  
- Uma **tabela** que exibe a lista atual de funcionários. Cada linha tem botões **Editar** e **Excluir**.  

Os estilos são divididos em:
- `global.css`: armazena o reset global de estilos (zera margens/paddings, define `box-sizing: border-box` e fonte padrão) para consistência visual.  
- `style.css`: define o layout da página, incluindo fundo de tela, cores, sombras e responsividade (com media queries). Por exemplo, aplica efeito de vidro fosco nas caixas de formulário e tabela e estiliza botões.  

A lógica do front-end está em `script.js`. Ela usa a **Fetch API** para comunicar com o back-end. Por exemplo, a função `carregarFuncionarios()` faz um `fetch` para **GET /funcionarios** e atualiza a tabela:

```js
async function carregarFuncionarios() {
  const response = await fetch(API_URL);
  const funcionarios = await response.json();
  // Preenche a tabela com os dados recebidos...
}
```

Ao enviar o formulário, outro trecho de código decide se faz `POST` (novo funcionário) ou `PUT` (atualização), dependendo se um campo oculto de ID está preenchido. Os botões **Editar** preenchem o formulário com os dados existentes, e o botão **Excluir** chama `fetch` com o método DELETE para remover o registro. Há uma confirmação via `confirm()` antes de excluir. Todo esse fluxo mantém a interface sincronizada com o servidor em tempo real.

### 📋 Como Executar

Para testar o projeto localmente:

1. Garanta que você tenha o **Node.js** e o **MySQL** instalados. Inicie seu servidor MySQL e crie o banco de dados conforme indicado.  
2. No terminal, na pasta do projeto, rode `npm install` para instalar as dependências.  
3. Ajuste o arquivo `.env` com suas credenciais do MySQL e porta desejada.  
4. Execute `node server.js` (ou `npm start` se criar um script). O console exibirá a URL do servidor (ex: `http://localhost:3000`).  
5. Abra o arquivo `src/public/index.html` em um navegador (você pode arrastá-lo para a janela do navegador ou usar a extensão **Live Server** do VS Code). A página será carregada e o sistema estará pronto para uso.  
6. Use o formulário para cadastrar novos funcionários. A tabela será atualizada automaticamente. Teste também a edição e exclusão clicando nos botões correspondentes.

### 📝 Boas Práticas e Documentação

Este projeto enfatiza o uso de *clean code* e práticas recomendadas:

- **Comentários explicativos**: Cada função e trecho importante do código possui comentários em português, explicando seu propósito e funcionamento. Isso facilita o aprendizado e a manutenção futura.  
- **Commits organizados**: Foram feitos commits frequentes, cada um abordando uma etapa ou funcionalidade distinta (ex.: criação de banco, definição de rotas, implementação de CRUD, ajustes no front-end). As mensagens de commit são descritivas, seguindo boas práticas de versionamento.  
- **Segurança básica**: Variáveis sensíveis (como credenciais) não são colocadas no código-fonte; são carregadas via `.env`. As consultas SQL usam parâmetros (`?`) para evitar injeção de SQL.  
- **Arquitetura modular**: O código do servidor está separado em arquivos lógicos (configuração de DB, controladores, rotas), o que torna o projeto mais organizado e reutilizável.  
- **Documentação**: Além deste README, há documentação passo-a-passo que detalha o processo de desenvolvimento e cada funcionalidade implementada. Isso serve como guia adicional para quem quiser entender ou replicar o projeto.  

---

<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=007bff&height=100&section=footer"/>