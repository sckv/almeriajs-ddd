import { OrderManagementServiceRepository } from '~app/infrastructure/OrderManagement.repository';

interface Services {
  orderManagement: OrderManagementServiceRepository;
}

export class GetSingleOrderQuery {
  private __uniq: void;
  private orderId: string | undefined;

  constructor(private services: Services) {}

  init(orderId: string) {
    this.orderId = orderId;
    return this;
  }

  async execute() {
    if (!this.orderId)
      return {
        isError: true,
        message: `Query ${this.constructor.name} is not initialized`,
      };

    return this.services.orderManagement.getOne(this.orderId);
  }
}
