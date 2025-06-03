# API RESTful de Livros e Autores

Este projeto é uma API RESTful simples desenvolvida em Node.js com Express, que permite gerenciar livros e autores, incluindo autenticação via JWT. Os dados são mantidos em memória (não persistentes).

## Funcionalidades

- **Autenticação JWT** (`/auth/login`, `/auth/register`, `/auth/logout`)
- **Registro de usuários comuns** (`/auth/register`)
- **CRUD de Autores** (`/autores`)
- **CRUD de Livros** (`/livros`)
- **Listagem de livros com detalhes dos autores** (`/livros/detalhes`)
- **Listagem de livros de um autor específico** (`/autores/:id/livros`)
- **Permissões por papel (admin e usuário comum)**
- **Testes automatizados com Jest e Supertest**

---

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

---

## Uso

### Iniciar o servidor

```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`.

---

## Autenticação e Registro

Antes de acessar as rotas protegidas, obtenha um token JWT:

- **POST** `/auth/register`  
  Registra um novo usuário (role padrão: `user`).  
  Exemplo:
  ```json
  {
    "username": "usuario",
    "password": "senha"
  }
  ```
  O usuário registrado só poderá visualizar livros e autores.

- **POST** `/auth/login`  
  Faz login e retorna um token JWT.  
  Exemplo:
  ```json
  {
    "username": "admin",
    "password": "1234"
  }
  ```
  O usuário `admin` pode criar, atualizar e deletar livros/autores.

- **POST** `/auth/logout`  
  Logout simbólico. Basta remover o token do cliente.

Inclua o token no header das requisições protegidas:
```
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## Permissões

- **Usuário comum** (`user`):  
  - Só pode visualizar (`GET`) livros e autores.
- **Admin** (`admin`):  
  - Pode criar, atualizar e deletar livros e autores.

---

## Endpoints

### Autenticação

- `POST /auth/register` — Registra um novo usuário
- `POST /auth/login` — Faz login e retorna um token JWT
- `POST /auth/logout` — Logout simbólico (remova o token do cliente)

### Autores

- `GET /autores` — Lista todos os autores
- `GET /autores/:id` — Retorna um autor específico
- `GET /autores/:id/livros` — Lista todos os livros de um autor específico
- `POST /autores` — Cria um novo autor (**apenas admin**)
  ```json
  {
    "id": 1,
    "nome": "Nome do Autor"
  }
  ```
- `PUT /autores/:id` — Atualiza um autor existente (**apenas admin**)
  ```json
  {
    "nome": "Novo Nome"
  }
  ```
- `DELETE /autores/:id` — Remove um autor (**apenas admin**)

### Livros

- `GET /livros` — Lista todos os livros (com nome do autor)
- `GET /livros/:id` — Retorna um livro específico (com nome do autor)
- `GET /livros/detalhes` — Lista livros com todos os detalhes (inclui objeto autor completo)
- `POST /livros` — Cria um novo livro (**apenas admin**)
  ```json
  {
    "id": 1,
    "titulo": "Nome do Livro",
    "autorId": 1
  }
  ```
- `PUT /livros/:id` — Atualiza um livro existente (**apenas admin**)
  ```json
  {
    "titulo": "Novo Título",
    "autorId": 2
  }
  ```
- `DELETE /livros/:id` — Remove um livro (**apenas admin**)

---

## Testes

Execute todos os testes automatizados com:

```bash
npm test
```

---

## Observações

- Os dados são armazenados apenas em memória (ao reiniciar, tudo é perdido).
- O projeto utiliza autenticação JWT apenas para exemplificação.
- Não utilize a chave secreta padrão em produção.
- Usuários comuns só podem visualizar dados; apenas o admin pode modificar.
- Para acessar rotas protegidas, sempre envie o token JWT no header.

---

## .gitignore

O projeto já inclui um `.gitignore` para evitar versionar arquivos desnecessários como `node_modules`, `logs`, `coverage`, etc.

---

## Licença

MIT