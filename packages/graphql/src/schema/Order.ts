import { schemaComposer } from 'graphql-compose';

import { Product } from './Product';

export const Order = schemaComposer.createObjectTC({
  name: 'Order',
  fields: {
    id: 'String!',
    email: 'String!',
    address: 'String!',
    products: {
      type: () => [Product],
    },
  },
});

Order.addResolver({
  kind: 'query',
  name: 'getAll',
  type: () => [Order],
  args: {
    email: 'String!',
  },
  resolve: async ({ args, context }) => {
    const orders = await context.dataSources.orders.getOrders(args.email);

    const ordersWithProducts = orders.map((order) => {
      return getOrderProducts(order, context);
    });

    return Promise.all(ordersWithProducts);
  },
});

Order.addResolver({
  kind: 'query',
  name: 'getOne',
  type: () => Order,
  args: {
    id: 'String',
  },
  resolve: async ({ args, context }) => {
    const order = await context.dataSources.orders.getOrder(args.id);
    return await getOrderProducts(order, context);
  },
});

const ProductInput = schemaComposer.createInputTC({
  name: 'ProductInput',
  fields: {
    id: 'String!',
    amount: 'Int!',
  },
});

Order.addResolver({
  kind: 'mutation',
  name: 'placeOrder',
  type: () => Order,
  args: {
    address: 'String!',
    billingAddress: 'String',
    products: {
      type: () => [ProductInput],
    },
    tax: 'Float!',
    email: 'String!',
  },
  resolve: async ({ args, context }) => {
    const order = await context.dataSources.orders.placeOrder(args);

    return await getOrderProducts(order, context);
  },
});

// AUX

const getOrderProducts = async (order, context) => {
  return {
    ...order,
    products: await Promise.all(
      order.orderItems.map(async (product) => {
        const productDetails = await context.dataSources.products.getProduct(product.productId);
        return {
          ...productDetails,
          ...product,
        };
      })
    ),
  };
};
