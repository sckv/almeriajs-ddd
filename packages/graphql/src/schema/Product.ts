import { schemaComposer } from 'graphql-compose';

export const Product = schemaComposer.createObjectTC({
  name: 'Product',
  fields: {
    id: 'String!',
    name: 'String!',
    price: 'Int!',
    amount: 'Int!',
  },
});

Product.addResolver({
  kind: 'query',
  name: 'getAll',
  type: () => [Product],
  resolve: ({ context }: any) => {
    return context.dataSources.products.getProducts();
  },
});
