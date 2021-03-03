module.exports = {
  test: {
    client: 'pg',
    version: '9.6',
    connection: {
      host: '127.0.0.1',
      port: '5432',
      user: 'postgres',
      password: '1234',
      database: 'srbarriga',
    },
    migrations: {
      directory: 'src/migrations',
    },
  },
};
