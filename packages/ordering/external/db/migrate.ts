import { database } from './index';

database.migrate
  .latest()
  .then(() => console.log('Migrated successfully'))
  .catch((err) => console.error('Error during migration', err));
