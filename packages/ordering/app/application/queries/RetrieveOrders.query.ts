import { OrderManagementServiceRepository } from '~app/infrastructure/OrderManagement.repository';
import { Email } from '~app/domain/value-objects/Email.vo';

interface Services {
  orderManagement: OrderManagementServiceRepository;
}

export class RetrieveOrdersQuery {
  private __uniq: void;
  private email: Email | undefined;

  constructor(private services: Services) {}

  init(email: Email) {
    this.email = email;
    return this;
  }

  async execute() {
    if (!this.email)
      return {
        isError: true,
        message: `Command ${this.constructor.name} is not initialized`,
      };
    console.log('gettings orders');

    return this.services.orderManagement.getAll(this.email);
  }
}
