import { Invoice } from '~app/domain/entities/Invoice.ent';
import Knex from 'knex';

export abstract class InvoicingService {
  constructor(protected db: Knex) {}
  abstract async createInvoice(invoice: Invoice): Promise<{ isCreated: boolean } | Error>;
  abstract async payInvoice(invoiceId: string): Promise<{ isPaid: boolean } | Error>;
  abstract async chargeInvoice(invoiceId: string): Promise<{ isCharged: boolean } | Error>;
  abstract async retrieveInvoices(accountId: string): Promise<Invoice[] | Error>;
}
