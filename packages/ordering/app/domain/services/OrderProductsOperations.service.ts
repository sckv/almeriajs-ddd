import { Client } from 'ts-nats';
import { Fetcher } from '~external/http';

import { OrderItem } from '../value-objects/OrderItem.vo';

export abstract class OrderProductsOperationsService {
  constructor(protected nats: Promise<Client>, protected http: Fetcher) {}
  abstract async updateProductsStock(orderItems: OrderItem[]): Promise<{ stocksUpdated: boolean } | Error>;
  abstract async getProduct(productId: string): Promise<OrderItem | Error>;
}
