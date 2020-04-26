import { schemaComposer } from 'graphql-compose';
import { Account } from './Account';

schemaComposer.Mutation.addFields({
  createAccount: Account.getResolver('create'),
});
