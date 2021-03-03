const supertest = require('supertest');

const app = require('../src/app');

const request = supertest(app);

test('Deve responder na raiz', () => request.get('/').then((resp) => expect(resp.status).toBe(200)));
