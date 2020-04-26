import { connection } from './connection';

export const migration = connection.migrate.latest().then(() => console.log('Migrated successfully'));
