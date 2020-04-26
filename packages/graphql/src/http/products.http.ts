import { RESTDataSource } from 'apollo-datasource-rest';

export class ProductsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.PRODUCTS_API_URL;
  }

  async getProduct(id: string) {
    return this.get(`products/${id}`);
  }

  async getProducts() {
    const data = await this.get('products');
    return data;
  }
}
