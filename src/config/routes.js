module.exports = (app) => {
  app.route('/users')
    .get(app.routes.users.get)
    .post(app.routes.users.post);

  app.route('/accounts')
    .post(app.routes.accounts.post)
    .get(app.routes.accounts.get);

  app.route('/accounts/:id')
    .get(app.routes.accounts.getById);
};
