import { Client } from 'ts-nats';
import { Fetcher } from '~external/http';
import { OrderItem } from '~app/domain/value-objects/OrderItem.vo';
import { OrderProductsOperationsService } from '~app/domain/services/OrderProductsOperations.service';

export class OrderProductsOperationsServiceRepository extends OrderProductsOperationsService {
  constructor(nats: Promise<Client>, http: Fetcher) {
    super(nats, http);
  }

  async updateProductsStock(orderItems: OrderItem[]) {
    const client = await this.nats;

    client.publish(
      process.env.PRODUCT_STOCK_UPDATE!,
      orderItems.map((oi) => ({
        id: oi.productId,
        minus: oi.amount,
      }))
    );

    return { stocksUpdated: true };
  }

  async getProduct(productId: string) {
    const productData = await this.http.get<any>(`${process.env.PRODUCTS_API_URL}/products/${productId}`);
    return OrderItem.create(productData.body);
  }
}
