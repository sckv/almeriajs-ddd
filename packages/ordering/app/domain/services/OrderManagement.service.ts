import Knex from 'knex';

import { Order } from '../entities/Order.ent';
import { Email } from '../value-objects/Email.vo';

export abstract class OrderManagementService {
  constructor(protected database: Knex) {}
  abstract async createOrder(order: Order): Promise<{ isCreated: boolean } | Error>;
  abstract async getAll(email: Email): Promise<Order[] | Error>;
  abstract async getOne(orderId: string): Promise<Order | Error>;
}
