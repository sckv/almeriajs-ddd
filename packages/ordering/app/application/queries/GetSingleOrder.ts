import { ProductsManagementServiceRepository } from '~app/infrastructure/ProductsManagement.repository';

interface Services {
  productsManagement: ProductsManagementServiceRepository;
}

export class GetSingleProductQuery {
  private __uniq: void;
  private productId: string | undefined;

  constructor(private services: Services) {}

  init(productId: string) {
    this.productId = productId;
    return this;
  }

  async execute() {
    if (!this.productId)
      return {
        isError: true,
        message: `Query ${this.constructor.name} is not initialized`,
      };

    return this.services.productsManagement.getOneProduct(this.productId);
  }
}
