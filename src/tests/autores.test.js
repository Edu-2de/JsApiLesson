const request = require('supertest');
const app = require('../../server');

describe('Testes CRUD de Autores', () => {
    it('Deve listar todos os autores', async () => {
        const res = await request(app).get('/autores');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('Deve cadastrar um novo autor', async () => {
        const res = await request(app).post('/autores').send({
            id: 1,
            nome: 'João Silva',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('Autor criado com sucesso!');
    });

    it('Deve atualizar um autor existente', async () => {
        await request(app).post('/autores').send({
            id: 2,
            nome: 'Maria Oliveira',
        });

        const res = await request(app).put('/autores/2').send({
            nome: 'Maria Santos',
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Autor atualizado com sucesso!');
    });

    it('Deve retornar erro ao tentar atualizar um autor inexistente', async () => {
        const res = await request(app).put('/autores/999').send({
            nome: 'Teste Inexistente',
        });

        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual('Autor não encontrado');
    });

    it('Deve deletar um autor existente', async () => {
        await request(app).post('/autores').send({
            id: 3,
            nome: 'Carlos Souza',
        });

        const res = await request(app).delete('/autores/3');
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Autor removido com sucesso!');
    });

    it('Deve retornar erro ao tentar deletar um autor inexistente', async () => {
        const res = await request(app).delete('/autores/999');
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual('Autor não encontrado');
    });
});