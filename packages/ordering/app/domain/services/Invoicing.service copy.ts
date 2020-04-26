import { Client } from 'ts-nats';
import { OrderItem } from '../value-objects/OrderItem.vo';

export abstract class InvoicingService {
  constructor(protected nats: Promise<Client>) {}
  abstract async invoceOrder(orderItems: OrderItem[]): Promise<{ stocksUpdated: boolean } | Error>;
}
