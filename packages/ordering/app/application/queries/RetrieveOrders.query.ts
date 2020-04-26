import { ProductsManagementServiceRepository } from '~app/infrastructure/ProductsManagement.repository';

interface Services {
  productsManagement: ProductsManagementServiceRepository;
}

export class RetrieveOrdersQuery {
  private __uniq: void;

  constructor(private services: Services) {}

  init() {
    return this;
  }

  async execute() {
    return this.services.productsManagement.getAllProducts();
  }
}
