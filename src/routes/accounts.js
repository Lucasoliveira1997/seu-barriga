module.exports = (app) => {
  const { save, remove, findAll, findOne } = app.services.account;

  const post = async (req, resp) => {
    try {
      let account = await save(req.body);
      [account] = account;
      return resp.status(201).json(account);
    } catch (error) {
      return resp.status(400).json({ error });
    }
  };

  const get = async (req, resp) => {
    try {
      const accounts = await findAll();

      return resp.status(200).json(accounts);
    } catch (error) {
      return resp.status(400).json({ error });
    }
  };

  const getById = async (req, resp) => {
    try {
      const account = await findOne(req.params.id);
      return resp.status(200).json(account);
    } catch (error) {
      return resp.status(400).json({ error });
    };
  };

  const deleted = async (req, resp) => {
    try {
      const accountDeleted = await remove(req.params.id);
      resp.status(204).send(accountDeleted);
    } catch (error) {
      resp.status(400).json({ error });
    }
  };

  return { post, deleted, get, getById };
};
