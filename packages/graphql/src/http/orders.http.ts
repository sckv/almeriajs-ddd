import { RESTDataSource } from 'apollo-datasource-rest';

interface Order {
  products: Array<{
    id: string;
    amount: number;
  }>;
  sendMail: boolean;
}

export class OrdersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.ORDERS_API_URL;
  }

  async getOrder(id: string) {
    return this.get(`orders/${id}`);
  }

  async getOrders(email: string) {
    return this.get('orders', { email });
  }

  async makeOrder(order: Order) {
    return this.post('orders', order);
  }
}
