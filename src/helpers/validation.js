module.exports = () => {
  const existsOrError = (value, msg) => {
    if (!value) throw msg;
    if (Array.isArray(value) && !value.length) throw msg;
    if (typeof value === 'string' && !value.trim()) throw msg;
  };

  const notExistsOrError = (value, msg) => {
    try {
      existsOrError(value, msg);
    } catch (error) {
      return;
    }
    throw msg;
  };

  return { existsOrError, notExistsOrError };
};
