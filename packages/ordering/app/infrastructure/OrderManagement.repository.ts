import Knex from 'knex';

import { OrderManagementService } from '~app/domain/services/OrderManagement.service';
import { Order } from '~app/domain/entities/Order.ent';
import { OrderItem } from '~app/domain/value-objects/OrderItem.vo';
import { Email } from '~app/domain/value-objects/Email.vo';

export class OrderManagementServiceRepository extends OrderManagementService {
  constructor(database: Knex) {
    super(database);
  }

  async createOrder(order: Order) {
    await this.database('order').insert({
      id: order.id,
      address: order.address,
      email: order.email,
    });

    const orderItemsBattery = order.orderItems.map((orderItem) => {
      return this.database('order_item').insert({
        order_id: order.id,
        product_id: orderItem.productId,
        price: orderItem.price,
        amount: orderItem.amount,
      });
    });

    await Promise.all(orderItemsBattery);

    return { isCreated: true };
  }

  async getAll(email: Email) {
    const ordersFromDb = await this.database('order').select().where({ email: email.value });

    const orders = await Promise.all(
      ordersFromDb.map(async (crudeOrder) => {
        const order = new Order(crudeOrder);

        const orderItemCrude = await this.database('order_item')
          .where({ order_id: crudeOrder.id })
          .select('product_id as productId', 'price', 'amount');
        const parsedOrderItems = orderItemCrude.map((oic) => OrderItem.create(oic));

        order.setOrderItems(parsedOrderItems);
        order.setOrderEmail(email);

        return order;
      })
    );

    return orders;
  }

  async getOne(orderId: string) {
    const orderFromDb = await this.database('order').select().where({ id: orderId }).first();

    const parsedEmail = Email.create(orderFromDb.email) as Email;
    const order = new Order(orderFromDb);
    order.setOrderEmail(parsedEmail);

    const orderItemCrude = await this.database('order_item')
      .where({ order_id: order.id })
      .select('product_id as productId', 'price', 'amount');
    const parsedOrderItems = orderItemCrude.map((oic) => OrderItem.create(oic));

    order.setOrderItems(parsedOrderItems);

    return order;
  }
}
