# Gerenciador de tarefas

Este é o backend de um aplicativo de gerenciamento de tarefas, com uma suíte de testes para garantir o funcionamento correto da API. Os testes simulam interações com a API, assegurando que todas as operações sejam realizadas corretamente e garantindo a estabilidade da aplicação.

## Como rodar o projeto localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [MySQL](https://www.mysql.com/)
- Gerenciador de pacotes ([npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/))

### Passos

1. **Clone o repositório:**
   
   ```bash
   git clone https://github.com/OswaldBarbosa/backend.git
   ```
   
2. **Navegue até o diretório do projeto:**
   
   ```bash
   cd backend
   ```
   
3. **Instale as dependências:**
 
   ```bash
   npm install
   ```

4. **Crie um arquivo .env na raiz do projeto e defina a variável DATABASE_URL com a URL de conexão do seu banco de dados MySQL:**

   ```env
   DATABASE_URL=mysql://usuario:senha@localhost:3306/nome_do_banco
   ```

5. **Rode as migrações do Prisma:**

   ```bash
   npx prisma migrate dev
   ```

6. **Inicie o servidor:**

   ```bash
   npm start
   ```

A API estará disponível em http://localhost:8080.

Com o servidor rodando, utilize o Postman ou qualquer outra ferramenta para testar as rotas da API.

## Endpoints

A API oferece os seguintes endpoints:

### `GET /tasks`: Retorna todas as tarefas.

### `GET /tasks/:id`: Retorna uma tarefa específica por ID.

### `POST /tasks`: Cria uma nova tarefa.

### `PUT /tasks/:id`: Atualiza uma tarefa existente.

### `DELETE /tasks/:id`: Exclui uma tarefa.

## Como rodar os testes

* Para rodar os testes, execute o comando:

  ```bash
  npm test
  ```
  
Isso irá rodar todos os testes automaticamente e mostrar o resultado no terminal.

## Decisões técnicas

* **Estrutura MVC:** Implementação do padrão MVC para separar a lógica de negócios (Model), controle de requisições (Controller) e gerenciamento de rotas (View), promovendo organização e escalabilidade.

* **Prisma como ORM:** Uso do Prisma para interação com o banco de dados MySQL, oferecendo abstração para operações CRUD e facilitando migrações.

* **Testes Automatizados:** Testes unitários com Jest e testes de integração das rotas com Supertest, para garantir a estabilidade.

* **Deploy no Railway:** Deploy do backend na plataforma Railway, garantindo facilidade de configuração e escalabilidade.

## Possíveis melhorias futuras

* **Documentação com Swagger:** Adicionar documentação de API interativa utilizando Swagger para facilitar o uso e entendimento da API.

* **Autenticação e Autorização:** Implementar autenticação de usuários para a criação e manipulação de tarefas, garantindo que apenas usuários autenticados possam criar, editar ou excluir tarefas.

* **Testes mais abrangentes:** Melhorar a cobertura de testes para verificar todos os fluxos possíveis, incluindo erros e exceções, garantindo que a API se comporte conforme esperado em diferentes cenários.
  
* **Paginação de resultados:** Implementar a funcionalidade de paginação para a lista de tarefas, especialmente útil se o número de tarefas crescer consideravelmente, melhorando a performance e a experiência do usuário ao listar as tarefas.

## Tecnologias utilizadas

* Node.js

* Express

* MySQL

* Prisma

* Jest

* Supertest

## Deploy

A API também está disponível online através do Railway. Você pode acessá-la [aqui](https://backend-production-3faa.up.railway.app/tasks).
