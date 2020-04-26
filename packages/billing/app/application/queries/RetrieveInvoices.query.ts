import { InvoicingServiceRepository } from '~app/infrastructure/Invoicing.repository';
import { Email } from '~app/domain/value-objects/Email.vo';

interface Services {
  invoice: InvoicingServiceRepository;
}

export class RetrieveInvoicesQuery {
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
        message: `Query ${this.constructor.name} is not initialized`,
      };

    return this.services.invoice.retrieveInvoices(this.email);
  }
}
