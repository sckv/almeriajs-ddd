import { schemaComposer } from 'graphql-compose';

export const Billing = schemaComposer.createObjectTC({
  name: 'Billing',
  fields: {
    email: 'String!',
    balance: 'Int!',
  },
});

Billing.addResolver({
  kind: 'query',
  name: 'getAccountInvoices',
  type: () => [Billing],
  args: {
    email: 'String!',
  },
  resolve: async ({ args, context }) => {
    const balance = await context.dataSources.billing.getInvoices(args.email);
    return {
      balance,
      email: args.email,
    };
  },
});
