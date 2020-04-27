import { ProductsManagementService } from '~app/domain/services/ProductsManagement.service';
import { Product } from '~app/domain/entities/Product.ent';
import Knex from 'knex';

export class ProductsManagementServiceRepository extends ProductsManagementService {
  constructor(database: Knex) {
    super(database);
  }

  async getOneProduct(productId: string) {
    const fromDb = await this.database('product').where({ id: productId }).select().first();
    return new Product(fromDb);
  }

  async getAllProducts() {
    const productsFromDb = await this.database('product').select();
    return productsFromDb.map((p) => new Product(p));
  }

  async updateProduct(product: Product) {
    await this.database('product').where({ id: product.id }).update({
      id: product.id,
      amount: product.amount,
      price: product.price,
      name: product.name,
    });
    return { hasUpdated: true };
  }
}
