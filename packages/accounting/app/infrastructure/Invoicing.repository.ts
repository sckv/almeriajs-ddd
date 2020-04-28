import { Client } from 'ts-nats';

import { InvoicingService } from '~app/domain/services/Invoicing.service';

export class InvoicingServiceRepository extends InvoicingService {
  constructor(nats: Promise<Client>) {
    super(nats);
  }

  async emitPaidInvoice(orderId: string) {
    const client = await this.nats;

    client.publish(process.env.INVOICE_PAY!, { orderId });

    return { isEmitted: true };
  }
}
