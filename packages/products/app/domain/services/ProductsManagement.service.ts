import { Product } from '../entities/Product.ent';
import Knex from 'knex';

export abstract class ProductsManagementService {
  constructor(protected database: Knex) {}
  abstract async getOneProduct(productId: string): Promise<Product | Error>;
  abstract async getAllProducts(): Promise<Product[] | Error>;
  abstract async updateProduct(product: Product): Promise<{ hasUpdated: boolean } | Error>;
}
