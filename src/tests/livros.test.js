const request = require('supertest');
const app = require('../../server');

describe('Testes CRUD de Livros', () => {
    it('Deve listar todos os livros', async () => {
        const res = await request(app).get('/livros');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('Deve cadastrar um livro', async () => {
        const res = await request(app).post('/livros').send({
            id: 1,
            titulo: 'Livro Teste',
            autorId: 1, // Certifique-se de que o autorId existe
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('Livro criado com sucesso!');
    });

    it('Deve retornar erro ao cadastrar um livro com autor inexistente', async () => {
        const res = await request(app).post('/livros').send({
            id: 2,
            titulo: 'Outro Livro',
            autorId: 999, // Autor inexistente
        });
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual('Autor não encontrado');
    });

    it('Deve listar livros com detalhes dos autores', async () => {
        const res = await request(app).get('/livros/detalhes');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});