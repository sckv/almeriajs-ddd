import Knex from 'knex';

import { InvoicingService } from '~app/domain/services/Invoicing.service';
import { Invoice } from '~app/domain/entities/Invoice.ent';
import { Email } from '~app/domain/value-objects/Email.vo';

export class InvoicingServiceRepository extends InvoicingService {
  constructor(db: Knex) {
    super(db);
  }

  async createInvoice(invoice: Invoice) {
    await this.db.table('invoice').insert({
      id: invoice.id,
      tax: invoice.tax,
      price: invoice.price,
      order_id: invoice.orderId,
      email: invoice.email,
      address: invoice.address,
    });

    return { isCreated: true };
  }

  async setInvoiceCharged(invoiceId: string) {
    await this.db.table('invoice').where({ id: invoiceId }).update({
      charged: true,
    });
    return { isCharged: true };
  }

  async payInvoice(orderId: string) {
    await this.db.table('invoice').where({ order_id: orderId }).update({
      paid: true,
    });

    return { isPaid: true };
  }

  async retrieveInvoices(email: Email) {
    const invoices = await this.db.table('invoice').select().where({ email: email.value });

    return invoices.map(
      ({ id, tax, price, order_id: orderId, email, address, paid, charged }) =>
        new Invoice({
          id,
          tax,
          paid,
          price,
          orderId,
          address,
          charged,
          email: Email.create(email) as Email,
        })
    );
  }
}
