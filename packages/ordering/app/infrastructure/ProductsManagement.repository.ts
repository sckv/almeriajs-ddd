import { ProductsManagementService } from '~app/domain/services/ProductsUpdater.service';
import { Product } from '~app/domain/entities/Order.ent';
import Knex from 'knex';

export class ProductsManagementServiceRepository extends ProductsManagementService {
  constructor(database: Knex) {
    super(database);
  }

  async getOneProduct(productId: string) {
    const fromDb = await this.database('products').where({ id: productId }).select().first();
    return new Product(fromDb);
  }

  async getAllProducts() {
    const productsFromDb = await this.database('products').select();
    return productsFromDb.map((p) => new Product(p));
  }

  async updateProduct(product: Product) {
    await this.database('products').where({ id: product.id }).update({
      id: product.id,
      amount: product.amount,
      price: product.price,
      name: product.name,
    });
    return { hasUpdated: true };
  }
}
