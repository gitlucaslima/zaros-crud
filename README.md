# Projeto CRUD ZAROS

Este é um projeto de CRUD (Create, Read, Update, Delete) para gerenciar usuários. O projeto foi desenvolvido com Node.js e Express, utilizando Sequelize como ORM para interagir com o banco de dados como desafio técnico para a empresa ZAROS.

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize
- MySQL
- TypeScript

## Pré-requisitos

Antes de executar o projeto, você precisará ter o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Docker](https://www.docker.com/) (para rodar o banco de dados)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node)

## Instalando o Projeto

1. Clone este repositório:

   ```bash
   https://github.com/gitlucaslima/zaros-crud.git

2. Navegue até o diretório do projeto:

   ```bash
   cd crud-zaros
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Configure seu banco de dados utilizando Docker. Crie um arquivo `docker-compose.yml` na raiz do projeto com o seguinte conteúdo:

   ```yaml
   version: '3.8'
   services:
     db:
       image: mysql:5.7
       restart: always
       environment:
         MYSQL_DATABASE: nome_do_banco
         MYSQL_ROOT_PASSWORD: sua_senha
       ports:
         - "3306:3306"
   ```

5. Crie e configure seu arquivo .env na raiz do projeto, com as variáveis de ambiente necessárias:

   ```
    DB_NAME=exemplo
    DB_USER=exemplo
    DB_PASS=exemplo
    DB_HOST=localhost
    PORT=3000 || A escolha
   ```

6. Para iniciar o banco de dados, execute:

   ```bash
   docker-compose up -d
   ```

## Executando o Projeto

Para iniciar o servidor em modo de desenvolvimento, execute:

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`.
<br>
O swagger estará disponível em `http://localhost:3000/api/docs`.
<br>
A coleção do Postman está disponível na raiz do projeto como `Zaros Api Crud.postman_collection.json`.

## Endpoints

### 1. Criar Usuário

- **Método**: `POST`
- **URL**: `/api/users`
- **Body**:
  ```json
  {
      "nome": "Nome do Usuário",
      "email": "email@exemplo.com",
      "idade": 30,
      "ativo": true
  }
  ```

### 2. Listar Usuários

- **Método**: `GET`
- **URL**: `/api/users`
- **Parâmetros Opcionais**:
    - `nome`: Para filtrar usuários pelo nome (busca parcial).
    - `idadeMin`: Para filtrar usuários pela idade mínima.
    - `idadeMax`: Para filtrar usuários pela idade máxima.
    - `email`: Para filtrar usuários pelo email.

### 3. Obter Usuário por ID

- **Método**: `GET`
- **URL**: `/api/users/:id`
- **Parâmetros**:
    - `id`: ID do usuário (UUID).

### 4. Atualizar Usuário

- **Método**: `PUT`
- **URL**: `/api/users/:id`
- **Body**:
  ```json
  {
      "nome": "Novo Nome",
      "email": "novoemail@exemplo.com",
      "idade": 31,
      "ativo": false
  }
  ```

### 5. Deletar Usuário

- **Método**: `DELETE`
- **URL**: `/api/users/:id`
- **Parâmetros**:
    - `id`: ID do usuário (UUID).

## Testes

Para executar os testes, você pode usar o seguinte comando:

```bash
npm test
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um "pull request" ou relatar problemas.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
