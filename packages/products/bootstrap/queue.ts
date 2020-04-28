import { Client } from 'ts-nats';

import { updateProductsStockHandler } from './bootstrap';

import { nats } from '~external/nats';

const bootstrapNats = async () => {
  const client = (await nats) as Client;

  // ASSOC LISTENERS
  client.subscribe(
    process.env.PRODUCT_STOCK_UPDATE!,
    updateProductsStockHandler.handle.bind(updateProductsStockHandler)
  );
};

bootstrapNats().then(() => console.log('Nats listeners bootstrapped!'));
