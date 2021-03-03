module.exports = (app) => {
  const save = async (account) => {
    return app.db('accounts').insert(account, '*');
  };

  const remove = async (id) => {
    await app.db('accounts').where({ id }).del();
  };

  return { save, remove };
};
