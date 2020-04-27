import { PayInvoiceCommand } from '../commands/PayInvoice.command';
import { Msg } from 'ts-nats';

interface Deps {
  payInvoice: PayInvoiceCommand;
}

export class PayInvoiceHandler {
  constructor(private deps: Deps) {}

  async handle(_err: any, message: Msg) {
    const { orderId } = message.data;

    const invoicePayment = await this.deps.payInvoice.init(orderId).execute();

    if (invoicePayment.isError) console.error(invoicePayment);
    else console.log('Invoice paid');
  }
}
