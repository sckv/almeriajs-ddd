import { Msg } from 'ts-nats';
import { UpdateProductsStockCommand } from '../commands/PlaceOrder.command';

interface Deps {
  updateProductsStock: UpdateProductsStockCommand;
}

export class UpdateProductsStockHandler {
  constructor(private deps: Deps) {}

  async handle(_err: any, message: Msg) {
    const productsList = message.data;
    if (!productsList.length) return console.error('Products list for stocks update is empty');

    const productsUpdated = await this.deps.updateProductsStock.init(productsList).execute();

    if (productsUpdated.isError) console.error(productsUpdated.message);
    else console.log('Products stocks updated');
  }
}
