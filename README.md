# API RESTful de Livros e Autores

Este projeto é uma API RESTful simples desenvolvida em Node.js com Express, que permite gerenciar livros e autores, incluindo autenticação via JWT. Os dados são mantidos em memória (não persistentes).

## Funcionalidades

- **Autenticação JWT** (`/auth/login`)
- **CRUD de Autores** (`/autores`)
- **CRUD de Livros** (`/livros`)
- **Listagem de livros com detalhes dos autores** (`/livros/detalhes`)
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

## Autenticação

Antes de acessar as rotas protegidas, obtenha um token JWT:

- **POST** `/auth/login`
  ```json
  {
    "username": "admin",
    "password": "1234"
  }
  ```
- O token será retornado no campo `token`.

Inclua o token no header das requisições protegidas:
```
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## Endpoints

### Autores

- `GET /autores` — Lista todos os autores
- `POST /autores` — Cria um novo autor
  ```json
  {
    "id": 1,
    "nome": "Nome do Autor"
  }
  ```
- `PUT /autores/:id` — Atualiza um autor existente
- `DELETE /autores/:id` — Remove um autor

### Livros

- `GET /livros` — Lista todos os livros
- `POST /livros` — Cria um novo livro
  ```json
  {
    "id": 1,
    "titulo": "Nome do Livro",
    "autorId": 1
  }
  ```
- `GET /livros/detalhes` — Lista livros com detalhes dos autores

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

---

## .gitignore

O projeto já inclui um `.gitignore` para evitar versionar arquivos desnecessários como `node_modules`, `logs`, `coverage`, etc.

---

## Licença

MIT