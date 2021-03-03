module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.helpers.validation;

  const findAll = (filter = {}) => {
    return app.db('users').where(filter);
  };

  const save = async (user) => {
    existsOrError(user.name, 'Nome é um atributo obrigatório');
    existsOrError(user.email, 'Email é um atributo obrigatório');
    existsOrError(user.password, 'Senha é um atributo obrigatório');

    const userAlreadyExists = await findAll({ email: user.email });
    notExistsOrError(userAlreadyExists, 'Email já cadastrado');

    return app.db('users').insert(user, '*');
  };

  const remove = async (id) => {
    await app.db('users').where({ id }).del();
  };

  return { findAll, save, remove };
};
