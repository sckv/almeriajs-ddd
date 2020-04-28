import Knex from 'knex';

import { Invoice } from '~app/domain/entities/Invoice.ent';
import { Email } from '~app/domain/value-objects/Email.vo';


export abstract class InvoicingService {
  constructor(protected db: Knex) {}
  abstract async createInvoice(invoice: Invoice): Promise<{ isCreated: boolean } | Error>;
  abstract async payInvoice(orderId: string): Promise<{ isPaid: boolean } | Error>;
  abstract async setInvoiceCharged(invoiceId: string): Promise<{ isCharged: boolean } | Error>;
  abstract async retrieveInvoices(email: Email): Promise<Invoice[] | Error>;
}
