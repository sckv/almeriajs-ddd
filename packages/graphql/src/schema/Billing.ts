import { schemaComposer } from 'graphql-compose';

export const Billing = schemaComposer.createObjectTC({
  name: 'Billing',
  fields: {
    email: 'String!',
    id: 'String!',
    tax: 'Int!',
    paid: 'Boolean!',
    price: 'Int!',
    orderId: 'String!',
    address: 'String!',
    charged: 'Boolean!',
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
    return context.dataSources.billing.getInvoices(args.email);
  },
});
