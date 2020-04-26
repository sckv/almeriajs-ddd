import knex from 'knex';
import { options } from './knexfile';

export const connection = knex(options);
