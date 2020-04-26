import { InvoicingService } from '~app/domain/services/Invoicing.service';
import { Invoice } from '~app/domain/entities/Invoice.ent';
import Knex from 'knex';

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
      account_id: invoice.accountId,
      address: invoice.address,
    });

    return { isCreated: true };
  }

  async chargeInvoice(invoiceId: string) {
    await this.db.table('invoice').where({ id: invoiceId }).update({
      charged: true,
    });
    return { isCharged: true };
  }

  async payInvoice(invoiceId: string) {
    await this.db.table('invoice').where({ id: invoiceId }).update({
      paid: true,
    });

    return { isPaid: true };
  }

  async retrieveInvoices(accountId: string) {
    const invoices = await this.db.table('invoice').select('*').where({ account_id: accountId });

    return invoices.map(
      ({ id, tax, price, order_id: orderId, account_id: accountId, address, paid, charged }) =>
        new Invoice({ id, tax, price, orderId, accountId, address, paid, charged })
    );
  }
}
