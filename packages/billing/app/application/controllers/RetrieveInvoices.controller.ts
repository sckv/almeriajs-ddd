import e from 'express';

import { RetrieveInvoicesQuery } from '../queries/RetrieveInvoices.query';
import { isDomainError } from '~app/tools';
import { Email } from '~app/domain/value-objects/Email.vo';

interface Deps {
  retrieveInvoices: RetrieveInvoicesQuery;
}

export class RetrieveInvoicesController {
  constructor(private deps: Deps) {}

  async handle(req: e.Request, res: e.Response) {
    const email = Email.create(req.params.email);
    if (!email) return res.status(400).send('Incorrect email');

    const invoices = await this.deps.retrieveInvoices.init(email).execute();

    if (isDomainError(invoices)) {
      res.status(400).send(invoices.message);
    } else {
      //* EXTRACT TO MAPPER
      const mapInvoices = invoices.map((i) => ({
        id: i.id,
        tax: i.tax,
        paid: i.paid,
        price: i.price,
        totalPrice: i.totalPrice,
        orderId: i.orderId,
        address: i.address,
        charged: i.charged,
        email: i.email,
      }));

      res.send(mapInvoices);
    }
  }
}
