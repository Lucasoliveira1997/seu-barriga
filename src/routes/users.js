module.exports = (app) => {
  const { findAll, save, remove } = app.services.user;

  const get = async (req, resp) => {
    const users = await findAll();
    resp.status(200).json(users);
  };

  const post = async (req, resp) => {
    try {
      let user = await save(req.body);
      [user] = user;
      resp.status(201).json(user);
    } catch (error) {
      resp.status(400).json({ error });
    }
  };

  const deleted = async (req, resp) => {
    try {
      const userDeleted = await remove(req.params.id);
      resp.status(204).send(userDeleted);
    } catch (error) {
      resp.status(400).json({ error });
    }
  };

  return { get, post, deleted };
};
