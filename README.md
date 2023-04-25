Sequencia para criar o projeto

Criar o arquivo package

### npm init

Gerencia as requisi��es, rotas e URLs, entre outras funcionalidades.

### npm install --save express

Rodar o projeto

### node app.js

### npm install -g nodemon

### npm install --save-dev nodemon

Comando SLQ para criar a base de dados

### CREATE DATABASE tutorial_nodejs CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

### npm install --save sequelize

### npm install --save mysql2

### npm install --save-dev sequelize-cli

### npx sequelize-cli init

### npm install dotenv --save

Criar a Models usuarios

### npx sequelize-cli model:generate --name Users --attributes name:string,email:string

Executar as migrations

### npx sequelize-cli db:migrate
