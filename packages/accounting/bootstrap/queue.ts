import { Client } from 'ts-nats';

import { chargePaymentHandler } from './bootstrap';

import { nats } from '~external/nats';

const bootstrapNats = async () => {
  const client = (await nats) as Client;

  //ASSOC LISTENERS
  client.subscribe(process.env.PAYMENT_CHARGE!, chargePaymentHandler.handle.bind(chargePaymentHandler));
};

bootstrapNats().then(() => console.log('Nats listeners bootstrapped!'));
