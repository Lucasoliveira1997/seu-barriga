const supertest = require('supertest');
const app = require('../../src/app');

const request = supertest(app);

const MAIN_ROUTE = '/accounts';
let user;
let accountId;

beforeAll(async () => {
  const resp = await app.services.user.save({ name: 'User Account', email: 'userAccount@email.com', password: 1234 });
  user = { ...resp[0] };
});

test('Deve inserir uma conta com sucesso', () => {
  return request.post(MAIN_ROUTE).send({ name: 'Account 1', userId: user.id }).then((resp) => {
    accountId = resp.body.id;
    expect(resp.status).toBe(201);
    expect(resp.body).toHaveProperty('name');
    expect(resp.body.name).toBe('Account 1');
  });
});

afterAll(async () => {
  await app.services.account.remove(accountId);
  await app.services.user.remove(user.id);
});
