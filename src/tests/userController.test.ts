// src/tests/userController.test.ts
import request from 'supertest';
import app from '../app';
import util from "node:util";

describe('User API', () => {
    it('devera criar um novo user com o nome "User Teste"', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                nome: 'User Teste',
                email: 'Teste@teste.com',
                idade: 24,
                ativo: true
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.nome).toBe('User Teste');
        expect(response.body.email).toBe('Teste@teste.com');
        expect(response.body.idade).toBe(24);
        expect(response.body.ativo).toBe(true);
    });

    it('devera retornar a lista de users com ao menos um user', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Implementar os outros testes...
    it('devera retornar a lista de users com o nome "User Teste"', async () => {
        const response = await request(app).get('/api/users?nome=User Teste');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Implementar testes de casos de erro...
    it('devera retornar erro ao tentar criar um user sem o nome', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                email: 'Teste@teste.com',
                idade: 24,
                ativo: true
            });
        expect(response.status).toBe(400);
    });

    it('devera retornar erro ao tentar criar um user com email inválido', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                nome: 'User Teste',
                email: 'Teste',
                idade: 24,
                ativo: true
            });
        expect(response.status).toBe(400);
    });

    it('devera retornar erro ao tentar criar um user com idade inválida', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                nome: 'User Teste',
                email: 'Teste@teste.com',
                idade: '24',
                ativo: true
            });
        expect(response.status).toBe(400);
    });

    it('devera retornar erro ao tentar criar um user com idade negativa', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                nome: 'User Teste',
                email: 'Teste@teste.com',
                idade: -24,
                ativo: true
            });
        expect(response.status).toBe(400);
    });


    it('devera retornar erro ao tentar criar um user com email ja existente e/ou estar em um formato válido.', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                nome: 'User Teste',
                email: 'Teste@teste.com',
                idade: 24,
                ativo: true
            });
        expect(response.status).toBe(400);
    });

    it('devera retornar erro ao tentar deletar um user inexistente', async () => {
        const response = await request(app).delete('/api/users/0');
        expect(response.status).toBe(404);
    });

    it('devera retornar erro ao tentar atualizar um user inexistente', async () => {
        const response = await request(app)
            .put('/api/users/22ad8d91-508d-489b-bebf-0e22be0f5d9d')
            .send({
                nome: 'User Teste',
                email: 'Teste@teste.xpto',
                idade: 24,
                ativo: true
            });
        util.debuglog(response.body);
        util.debuglog(response.status.toString());
        expect(response.status).toBe(404);
    });

    it('devera retornar erro ao tentar atualizar um user com email ja existente e/ou estar em um formato válido.', async () => {
        const response = await request(app)
            .put('/api/users/1')
            .send({
                nome: 'User Teste',
                email: 'Teste@teste.com',
                idade: 24,
                ativo: true
            });
        expect(response.status).toBe(400);
    });

    it('devera retornar erro ao tentar atualizar um user com idade inválida', async () => {
        const response = await request(app)
            .put('/api/users/1')
            .send({
                nome: 'User Teste',
                email: 'Teste@teste.com',
                idade: '24',
                ativo: true
            });
        expect(response.status).toBe(400);
    });
});
