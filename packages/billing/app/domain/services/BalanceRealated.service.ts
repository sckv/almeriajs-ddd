import { Client } from 'ts-nats';

import { Invoice } from '~app/domain/entities/Invoice.ent';

export abstract class BalanceRelatedService {
  constructor(protected nats: Promise<Client>) {}
  abstract async paymentCharge(invoice: Invoice): Promise<{ isEmitted: boolean } | Error>;
}
