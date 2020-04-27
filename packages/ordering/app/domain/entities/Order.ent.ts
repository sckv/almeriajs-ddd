import uuid from 'uuid';
import { OrderItem } from '../value-objects/OrderItem.vo';
import { Email } from '../value-objects/Email.vo';

type WannabeOrder = {
  id?: string;
  address: string;
  email: Email;
  orderItems: Array<OrderItem>;
};

export class Order {
  get address() {
    return this.order.address;
  }

  get email() {
    return this.order.email.value;
  }

  get id() {
    return this.order.id!;
  }

  get orderItems() {
    return this.order.orderItems;
  }

  constructor(private order: WannabeOrder) {
    if (!order.id) order.id = uuid.v1();
    this.order = order;
  }

  setOrderItems(orderItems: OrderItem[]) {
    this.order.orderItems = orderItems;
    return this;
  }

  setOrderEmail(email: Email) {
    this.order.email = email;
    return this;
  }

  private toJSON() {
    return {
      id: this.id,
      email: this.email,
      address: this.address,
      orderItems: this.orderItems,
    };
  }
}
