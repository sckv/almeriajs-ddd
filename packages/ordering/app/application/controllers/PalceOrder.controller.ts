import e from 'express';

import { PlaceOrderCommand } from '../commands/PlaceOrder.command';

import { Order } from '~app/domain/entities/Order.ent';
import { OrderItem } from '~app/domain/value-objects/OrderItem.vo';
import { DataForInvoice } from '~app/domain/value-objects/InvoiceData.ent';
import { isDomainError } from '~app/tools';
import { Email } from '~app/domain/value-objects/Email.vo';

interface Deps {
  placeOrderCommand: PlaceOrderCommand;
}

export class PlaceOrderController {
  constructor(private deps: Deps) {}

  async handle(req: e.Request, res: e.Response) {
    const { address, billingAddress, products, tax, email } = req.body;

    const parsedEmail = Email.create(email);
    if (!parsedEmail) {
      return res.status(412).send('Incorrect email for order placement');
    }
    const orderItems = products.map((product: any) =>
      OrderItem.create({ amount: product.amount, productId: product.id })
    ) as OrderItem[];

    const order = new Order({ address, orderItems, email: parsedEmail });
    const toInvoice = new DataForInvoice({ tax, email: parsedEmail, orderId: order.id });

    const orderPlacement = await this.deps.placeOrderCommand
      .init(order, orderItems, toInvoice, billingAddress)
      .execute();

    if (isDomainError(orderPlacement)) {
      res.status(400).send(orderPlacement.message);
    } else {
      res.send(order);
    }
  }
}
