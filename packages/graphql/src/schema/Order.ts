import { schemaComposer } from 'graphql-compose';
import { Product } from './Product';

export const Order = schemaComposer.createObjectTC<{ go: 'ok' }>({
  name: 'Order',
  fields: {
    id: 'String!',
    products: {
      type: () => [Product],
    },
    totalPrice: {
      type: 'Int!',
      resolve: (source: any) => {
        return source.products.reduce((acc: any, curr: any) => acc + curr.price * curr.amount, 0);
      },
    },
  },
});

Order.addResolver({
  kind: 'query',
  name: 'getOne',
  type: () => Order,
  args: {
    id: 'String',
  },
  resolve: ({ args, context }) => {
    console.log({ args, context });
    return {
      id: 'some',
      products: [
        { id: 'prod_ID', amount: 2, price: 2, name: 'NAME' },
        { id: 'prod_ID2', amount: 3, price: 7, name: 'NAME2' },
      ],
    };
  },
});
