module.exports = (app) => {
  const save = async (account) => {
    return app.db('accounts').insert(account, '*');
  };

  const findAll = async () => {
    return app.db('accounts');
  };

  const findOne = async (id) => {
    return app.db('accounts').where({ id }).first();
  };

  const removeById = async (id) => {
    await app.db('accounts').where({ id }).del();
  };

  const removeManyByParam = async (param, value) => {
    await app.db('accounts').where({ [param]: value }).del();
  };

  return { save, removeById, removeManyByParam, findAll, findOne };
};
