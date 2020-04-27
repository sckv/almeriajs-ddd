import { Client } from 'ts-nats';

export abstract class InvoicingService {
  constructor(protected nats: Promise<Client>) {}
  abstract async emitPaidInvoice(orderId: string): Promise<{ isEmitted: boolean } | Error>;
}
