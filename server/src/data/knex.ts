import knexConnect = require('knex');

export const knex = knexConnect({
  client: 'pg',
  connection: process.env.POSTGRESQL_URL,
});
