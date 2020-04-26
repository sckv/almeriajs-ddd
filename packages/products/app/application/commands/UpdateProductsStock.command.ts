import { ProductsManagementServiceRepository } from '~app/infrastructure/ProductsManagement.repository';

const pa = Promise.all;

interface Services {
  productsManagement: ProductsManagementServiceRepository;
}

export class UpdateProductsStockCommand {
  private __uniq: void;

  private productIds: Array<{ id: string; minus: number }> | undefined;

  constructor(private services: Services) {}

  init(productIds: Array<{ id: string; minus: number }>) {
    this.productIds = productIds;
    return this;
  }

  async execute() {
    if (!this.productIds)
      return {
        isError: true,
        message: `Command ${this.constructor.name} is not initialized`,
      };

    const products = await pa(
      this.productIds.map(async ({ id, minus }) => {
        const item = await this.services.productsManagement.getOneProduct(id);
        const newAmount = item.amount - minus;

        item.setAmount(newAmount >= 0 ? newAmount : 0);
        return item;
      })
    );

    //? CHECK IF IT CAN BE INHERITED
    await pa(products.map((product) => this.services.productsManagement.updateProduct(product)));

    return { stockUpdated: true };
  }
}
