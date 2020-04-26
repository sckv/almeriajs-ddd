import { schemaComposer } from 'graphql-compose';
import { Product } from './Product';

const pa = Promise.all;

export const Order = schemaComposer.createObjectTC({
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

    return pa(ordersWithProducts);
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
    const order = context.dataSources.orders.getOrder(args.id);
    return {
      ...order,
      products: await getOrderProducts(order, context),
    };
  },
});

// AUX

const getOrderProducts = async (order, context) => {
  return {
    ...order,
    products: await pa(
      order.products.map(async (product) => {
        const productDetails = await context.dataSources.products.getProduct(product.id);
        return {
          ...product,
          ...productDetails,
        };
      })
    ),
  };
};
