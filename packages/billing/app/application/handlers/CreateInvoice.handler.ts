import { CreateInvoiceCommand } from '../commands/CreateInvoice.command';
import { Invoice } from '~app/domain/entities/Invoice.ent';
import { Msg } from 'ts-nats';

interface Deps {
  createInvoice: CreateInvoiceCommand;
}

export class CreateInvoiceHandler {
  constructor(private deps: Deps) {}

  async handle(_err: any, message: Msg) {
    const invoice = new Invoice(message.data);

    const invoicePersistence = await this.deps.createInvoice.init(invoice).execute();
    if (invoicePersistence.isError) console.error(invoicePersistence.message);
    else console.log('Invoice emitted');
  }
}
