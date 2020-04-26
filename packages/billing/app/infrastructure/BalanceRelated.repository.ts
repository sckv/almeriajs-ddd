import { Invoice } from '~app/domain/entities/Invoice.ent';
import { BalanceRelatedService } from '~app/domain/services/BalanceRealated.service';
import { Client } from 'ts-nats';

export class BalanceRelatedServiceRepository extends BalanceRelatedService {
  constructor(nats: Promise<Client>) {
    super(nats);
  }

  async paymentCharge(invoice: Invoice) {
    const client = await this.nats;

    client.publish(process.env.PAYMENT_CHARGE!, {
      accountId: invoice.accountId,
      price: invoice.totalPrice,
    });

    return { isCharged: true };
  }
}
