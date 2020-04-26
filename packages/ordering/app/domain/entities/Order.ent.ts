import { OrderItem } from '../value-objects/OrderItem.vo';
import { Email } from '../value-objects/Email.vo';

type WannabeOrder = {
  id?: string;
  address: number;
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
    return this.order.id;
  }

  get orderItems() {
    return this.order.orderItems;
  }

  constructor(private order: WannabeOrder) {}

  private toJSON() {
    return {
      id: this.id,
      email: this.email,
      address: this.address,
      orderItems: this.orderItems,
    };
  }
}
