const app = require('express')();
const consign = require('consign');
const knex = require('knex');
// const knexLogger = require('knex-logger');
const knexfile = require('../knexfile');

// TODO criar chaveamento dinâmico de bancos;
app.db = knex(knexfile.test);
// app.use(knexLogger(app.db));

consign({ cwd: 'src', verbose: false })
  .include('./config/middlewares.js')
  .then('./helpers')
  .then('./services')
  .then('./routes')
  .then('./config/routes.js')
  .into(app);

app.get('/', (req, resp) => {
  resp.status(200).send(req.headers);
});

// app.db.on('query', (data) => {
//   console.log({ sql: data.sql, content: data.bindings ? data.bindings.join(',') : '' });
// }).on('query-response', (resp) => {
//   console.log(resp);
// }).on('query-error', (error) => {
//   console.log(error);
// });

module.exports = app;
