import { schemaComposer } from 'graphql-compose';

export const Billing = schemaComposer.createObjectTC({
  name: 'Billing',
  fields: {
    accountId: 'Int!',
    balance: 'Int!',
  },
});

Billing.addResolver({
  kind: 'query',
  name: 'getInfo',
  type: () => Account,
  args: {
    email: 'String!',
  },
  resolve: async ({ args, context }) => {
    const balance = await context.dataSources.accounts.getBalance(args.email);
    return {
      balance,
      email: args.email,
    };
  },
});

Account.addResolver({
  kind: 'mutation',
  name: 'create',
  type: () => Account,
  args: {
    email: 'String!',
    password: 'String!',
  },
  resolve: ({ args, context }) => {
    return context.dataSources.accounts.createAccount(args);
  },
});
