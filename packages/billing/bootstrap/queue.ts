import { nats } from '~external/nats';
import { Client } from 'ts-nats';
import { createInvoiceHandler, payInvoiceHandler } from './bootstrap';

const bootstrapNats = async () => {
  const client = (await nats) as Client;

  // ASSOC LISTENERS
  client.subscribe(process.env.INVOICE_CREATE!, createInvoiceHandler.handle.bind(createInvoiceHandler));
  client.subscribe(process.env.INVOICE_PAY!, payInvoiceHandler.handle.bind(payInvoiceHandler));
};

bootstrapNats().then(() => console.log('Nats listeners bootstrapped!'));
