module.exports = (app) => {
  app.route('/users')
    .get(app.routes.users.get)
    .post(app.routes.users.post);

  app.route('/accounts')
    .post(app.routes.accounts.post);
};
