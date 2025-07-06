import { knex as setupKnex, Knex } from 'knex';

export const dbConfig: Knex.Config = {
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: './db/app.db', // or ':memory:'
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
};

export const knex = setupKnex(dbConfig);
