const request = require('supertest');
const app = require('../../server');

let adminToken;

beforeAll(async () => {
    // Login como admin para obter o token
    const res = await request(app)
        .post('/auth/login')
        .send({ username: 'admin', password: '1234' });
    adminToken = res.body.token;

    // Garante que existe pelo menos um autor
    await request(app)
        .post('/autores')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
            id: 1,
            nome: 'Autor Teste'
        });
});

describe('Testes CRUD de Livros', () => {
    it('Deve listar todos os livros', async () => {
        const res = await request(app)
            .get('/livros')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('Deve cadastrar um livro', async () => {
        const res = await request(app)
            .post('/livros')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                id: 1,
                titulo: 'Livro Teste',
                autorId: 1,
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('Livro criado com sucesso!');
    });

    it('Deve retornar erro ao cadastrar um livro com autor inexistente', async () => {
        const res = await request(app)
            .post('/livros')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                id: 2,
                titulo: 'Outro Livro',
                autorId: 999,
            });
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual('Autor não encontrado');
    });

    it('Deve listar livros com detalhes dos autores', async () => {
        const res = await request(app)
            .get('/livros/detalhes')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});