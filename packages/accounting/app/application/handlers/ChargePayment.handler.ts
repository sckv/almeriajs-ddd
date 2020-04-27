import { ChargePaymentCommand } from '../commands/ChargePayment.command';
import { Msg } from 'ts-nats';
import { Email } from '~app/domain/value-objects/Email.vo';

interface Deps {
  chargePayment: ChargePaymentCommand;
}

export class ChargePaymentHandler {
  constructor(private deps: Deps) {}

  async handle(_err: any, message: Msg) {
    const { amount, email, orderId } = message.data;

    const parseEmail = Email.create(email);
    if (!parseEmail) {
      console.error('Account email to charge balance is invalid');
      return;
    }

    const accountPaymentCharge = await this.deps.chargePayment.init(amount, parseEmail, orderId).execute();

    if (accountPaymentCharge.isError) console.error(accountPaymentCharge.message);
    else console.log(`Account  with email ${email} has been charged with the amount of ${amount}`);
  }
}
