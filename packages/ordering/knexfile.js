module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'common',
      host: process.env.DB_IP,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/db',
      tableName: 'knex_migrations',
    },
  },
};
