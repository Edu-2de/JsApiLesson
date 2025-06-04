# RESTful API for Books and Authors

This project is a simple RESTful API developed in Node.js with Express, allowing you to manage books and authors, including JWT authentication. All data is stored in memory (not persistent).

## Features

- **JWT Authentication** (`/auth/login`, `/auth/register`, `/auth/logout`)
- **User registration** (`/auth/register`)
- **CRUD for Authors** (`/autores`)
- **CRUD for Books** (`/livros`)
- **List books with author details** (`/livros/detalhes`)
- **List books by a specific author** (`/autores/:id/livros`)
- **Role-based permissions (admin and regular user)**
- **Automated tests with Jest and Supertest**

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## Usage

### Start the server

```bash
npm start
```

The server will be available at `http://localhost:3000`.

---

## Authentication and Registration

Before accessing protected routes, obtain a JWT token:

- **POST** `/auth/register`  
  Registers a new user (default role: `user`).  
  Example:
  ```json
  {
    "username": "user",
    "password": "password"
  }
  ```
  The registered user will only be able to view books and authors.

- **POST** `/auth/login`  
  Logs in and returns a JWT token.  
  Example:
  ```json
  {
    "username": "admin",
    "password": "1234"
  }
  ```
  The `admin` user can create, update, and delete books/authors.

- **POST** `/auth/logout`  
  Symbolic logout. Just remove the token on the client side.

Include the token in the header of protected requests:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## Permissions

- **Regular user** (`user`):  
  - Can only view (`GET`) books and authors.
- **Admin** (`admin`):  
  - Can create, update, and delete books and authors.

---

## Endpoints

### Authentication

- `POST /auth/register` — Register a new user
- `POST /auth/login` — Log in and get a JWT token
- `POST /auth/logout` — Symbolic logout (remove token on client)

### Authors

- `GET /autores` — List all authors
- `GET /autores/:id` — Get a specific author
- `GET /autores/:id/livros` — List all books by a specific author
- `POST /autores` — Create a new author (**admin only**)
  ```json
  {
    "id": 1,
    "nome": "Author Name"
  }
  ```
- `PUT /autores/:id` — Update an existing author (**admin only**)
  ```json
  {
    "nome": "New Name"
  }
  ```
- `DELETE /autores/:id` — Delete an author (**admin only**)

### Books

- `GET /livros` — List all books (with author name)
- `GET /livros/:id` — Get a specific book (with author name)
- `GET /livros/detalhes` — List books with all details (includes full author object)
- `POST /livros` — Create a new book (**admin only**)
  ```json
  {
    "id": 1,
    "titulo": "Book Title",
    "autorId": 1
  }
  ```
- `PUT /livros/:id` — Update an existing book (**admin only**)
  ```json
  {
    "titulo": "New Title",
    "autorId": 2
  }
  ```
- `DELETE /livros/:id` — Delete a book (**admin only**)

---

## Tests

Run all automated tests with:

```bash
npm test
```

---

## Notes

- Data is stored only in memory (everything is lost on restart).
- JWT authentication is for demonstration purposes only.
- Do not use the default secret key in production.
- Regular users can only view data; only the admin can modify it.
- To access protected routes, always send the JWT token in the header.

---

## .gitignore

The project already includes a `.gitignore` to avoid versioning unnecessary files such as `node_modules`, `logs`, `coverage`, etc.

---

## License

MIT
