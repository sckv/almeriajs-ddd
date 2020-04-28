import { Client } from 'ts-nats';

import { InvoicingService } from '~app/domain/services/Invoicing.service';
import { DataForInvoice } from '~app/domain/value-objects/InvoiceData.ent';

export class InvoicingServiceRepository extends InvoicingService {
  constructor(knex: Promise<Client>) {
    super(knex);
  }
  async invoceOrder(orderData: DataForInvoice) {
    const client = await this.nats;

    client.publish(process.env.INVOICE_CREATE!, orderData);

    return { isInvoiced: true };
  }
}
