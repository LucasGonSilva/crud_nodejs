Como rodar o projeto baixado

Instalar todas as dependencias indicadas pelo package.json

### npm install

Criar a base de dados no MySQL

Copiar e colocar o ".env-example" para ".env"

Alterar as credenciais do banco de dados no arquivo ".env"

Executar as migrations

### npx sequelize-cli db:migrate

Executar as seeders

### npx sequelize-cli db:seed:all

Rodar o projeto

### node app.js

Rodar o projeto usando o nodemon

### nodemon app.js

Sequencia para criar o projeto

Criar o arquivo package

### npm init

Gerencia as requisições, rotas e URLs, entre outras funcionalidades.

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
