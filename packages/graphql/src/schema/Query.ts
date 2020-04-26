import { schemaComposer } from 'graphql-compose';
import { Order } from './Order';
import { Product } from './Product';

schemaComposer.Query.addFields({
  products: Product.getResolver('getAll'),
  orders: Order.getResolver('getOne'),
});
