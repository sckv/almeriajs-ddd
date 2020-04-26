import { InvoicingServiceRepository } from '~app/infrastructure/Invoicing.repository';

interface Services {
  invoice: InvoicingServiceRepository;
}

export class RetrieveInvoicesQuery {
  private __uniq: void;
  private accountId: string | undefined;

  constructor(private services: Services) {}

  init(accountId: string) {
    this.accountId = accountId;
    return this;
  }

  async execute() {
    if (!this.accountId)
      return {
        isError: true,
        message: `Query ${this.constructor.name} is not initialized`,
      };

    return this.services.invoice.retrieveInvoices(this.accountId);
  }
}
