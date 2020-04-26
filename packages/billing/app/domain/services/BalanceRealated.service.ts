import { Invoice } from '~app/domain/entities/Invoice.ent';
import { Client } from 'ts-nats';

export abstract class BalanceRelatedService {
  constructor(protected nats: Promise<Client>) {}
  abstract async paymentCharge(invoice: Invoice): Promise<{ isCharged: boolean } | Error>;
}
