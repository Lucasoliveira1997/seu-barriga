module.exports = (app) => {
  const { save, remove } = app.services.account;

  const post = async (req, resp) => {
    try {
      let account = await save(req.body);
      [account] = account;
      return resp.status(201).json(account);
    } catch (error) {
      return resp.status(400).json({ error });
    }
  };

  const deleted = async (req, resp) => {
    try {
      const accountDeleted = await remove(req.params.id);
      resp.status(204).send(accountDeleted);
    } catch (error) {
      resp.status(400).json({ error });
    }
  };

  return { post, deleted };
};
