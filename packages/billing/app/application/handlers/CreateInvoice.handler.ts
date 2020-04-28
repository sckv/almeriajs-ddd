import { Msg } from 'ts-nats';

import { CreateInvoiceCommand } from '../commands/CreateInvoice.command';

import { Invoice } from '~app/domain/entities/Invoice.ent';
import { Email } from '~app/domain/value-objects/Email.vo';

interface Deps {
  createInvoice: CreateInvoiceCommand;
}

export class CreateInvoiceHandler {
  constructor(private deps: Deps) {}

  async handle(_err: any, message: Msg) {
    const email = Email.create(message.data.email);
    if (!email) {
      console.error('Incorrect email for invoicing');
      return;
    }
    const invoice = new Invoice(message.data);
    invoice.setEmail(email);

    const invoicePersistence = await this.deps.createInvoice.init(invoice).execute();
    if (invoicePersistence.isError) console.error(invoicePersistence.message);
    else console.log('Invoice emitted');
  }
}
