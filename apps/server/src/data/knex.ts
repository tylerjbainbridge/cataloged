import knexConnect from 'knex';

export const knex = knexConnect({
  client: 'pg',
  connection: process.env.POSTGRESQL_URL,
});
