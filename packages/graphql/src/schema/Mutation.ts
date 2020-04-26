import { schemaComposer } from 'graphql-compose';
import { Account } from './Account';
import { Order } from './Order';

schemaComposer.Mutation.addFields({
  createAccount: Account.getResolver('create'),
  placeOrder: Order.getResolver('placeOrder'),
});
