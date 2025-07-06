import { knex as setupKnex, Knex } from 'knex';
import { env } from './env';

export const dbConfig: Knex.Config = {
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: env.DATABASE_URL, // or ':memory:'
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
};

export const knex = setupKnex(dbConfig);
