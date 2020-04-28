import { Client } from 'ts-nats';

import { DataForInvoice } from '../value-objects/InvoiceData.ent';

export abstract class InvoicingService {
  constructor(protected nats: Promise<Client>) {}
  abstract async invoceOrder(order: DataForInvoice): Promise<{ isInvoiced: boolean } | Error>;
}
