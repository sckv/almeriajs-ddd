import { nats } from '~external/nats';
import { Client } from 'ts-nats';
import { chargePaymentHandler } from './bootstrap';

const bootstrapNats = async () => {
  const client = (await nats) as Client;

  //ASSOC LISTENERS
  client.subscribe(process.env.PAYMENT_CHARGE!, chargePaymentHandler.handle);
};

bootstrapNats().then(() => console.log('Nats listeners bootstrapped!'));
