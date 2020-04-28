import knex from 'knex';

import { options } from './knexfile';

export const database = knex(options);
