import { schemaComposer } from 'graphql-compose';

export const Account = schemaComposer.createObjectTC({
  name: 'Account',
  fields: {
    email: 'String!',
    balance: 'Int!',
  },
});

Account.addResolver({
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
