const supertest = require('supertest');
const app = require('../../src/app');

const request = supertest(app);

const MAIN_ROUTE = '/accounts';
const ACCOUNT_NAME = 'Account 1';
let user;

beforeAll(async () => {
  const resp = await app.services.user.save({ name: 'User Account', email: 'userAccount@email.com', password: 1234 });
  user = { ...resp[0] };
});

test('Deve inserir uma conta com sucesso', () => {
  return request.post(MAIN_ROUTE).send({ name: ACCOUNT_NAME, userId: user.id }).then((resp) => {
    expect(resp.status).toBe(201);
    expect(resp.body).toHaveProperty('name');
    expect(resp.body.name).toBe(ACCOUNT_NAME);
  });
});

test('Devo listar todas as contas', () => {
  return request.post(MAIN_ROUTE).send({ name: ACCOUNT_NAME, userId: user.id })
    .then(() => {
      request.get(MAIN_ROUTE).then((resp) => {
        expect(resp.status).toBe(200);
        expect(typeof resp.body).toBe('object');
        expect(resp.body.length).toBeGreaterThan(0);
      });
    });
});

test('Devo listar uma conta por Id', () => {
  return request.post(MAIN_ROUTE).send({ name: ACCOUNT_NAME, userId: user.id })
    .then((resp) => request.get(`${MAIN_ROUTE}/${resp.body.id}`))
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name');
      expect(response.body.userId).toBe(user.id);
    });
});

afterAll(async () => {
  await app.services.account.removeManyByParam('name', 'Account 1');
  await app.services.user.remove(user.id);
});
