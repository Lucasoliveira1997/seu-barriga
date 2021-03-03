const supertest = require('supertest');

const app = require('../../src/app');

const request = supertest(app);

// email to test with insertion and duplicate validation at same time
const email = `${Date.now()}@email.com`;

test('Deve listar os usuários', () => {
  return request.get('/users').then((resp) => {
    expect(resp.status).toBe(200);
    expect(resp.body.length).toBeGreaterThan(0);
  });
});

test('Deve inserir usuário com sucesso', () => {
  return request.post('/users').send({ name: 'Lucas', email, password: '1234' }).then((resp) => {
    expect(resp.status).toBe(201);
    expect(resp.body).toHaveProperty('name');
    expect(resp.body.name).toBe('Lucas');
  });
});

test('Não deve aceitar usuário sem nome', () => {
  return request.post('/users').send({ email: 'teste@email.com', password: 1234 }).then((resp) => {
    expect(resp.status).toBe(400);
    expect(resp.body.error).toBe('Nome é um atributo obrigatório');
  });
});

test('Não deve aceitar usuário sem email', async () => {
  const result = await request.post('/users').send({ name: 'Lucas', password: 1234 });

  expect(result.status).toBe(400);
  expect(result.body.error).toBe('Email é um atributo obrigatório');
});

test('Não deve aceitar usuário sem senha', (done) => {
  request.post('/users').send({ name: 'Lucas', email: 'teste@email.com' }).then((resp) => {
    expect(resp.status).toBe(400);
    expect(resp.body.error).toBe('Senha é um atributo obrigatório');
    done();
  }).catch((error) => done(error));
});

test('Não deve inserir usuário com email duplicado', () => {
  return request.post('/users').send({ name: 'Lucas', email: 'lucas@email.com', password: '1234' }).then((resp) => {
    expect(resp.status).toBe(400);
    expect(resp.body.error).toBe('Email já cadastrado');
  });
});
