import { nats } from '~external/nats';
import { Client } from 'ts-nats';
import { updateProductsStockHandler } from './bootstrap';

const bootstrapNats = async () => {
  const client = (await nats) as Client;

  // ASSOC LISTENERS
  client.subscribe(process.env.PRODUCT_STOCK_UPDATE!, updateProductsStockHandler.handle);
};

bootstrapNats().then(() => console.log('Nats listeners bootstrapped!'));
