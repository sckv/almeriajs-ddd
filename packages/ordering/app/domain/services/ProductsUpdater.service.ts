// import { Product } from '../entities/Order.ent';
import { Client } from 'ts-nats';
import { OrderItem } from '../value-objects/OrderItem.vo';

export abstract class ProductsUpdaterService {
  constructor(protected nats: Promise<Client>) {}
  abstract async updateProductsStock(orderItems: OrderItem[]): Promise<{ stocksUpdated: boolean } | Error>;
}
