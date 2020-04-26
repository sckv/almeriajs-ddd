import { InvoicingServiceRepository } from '~app/infrastructure/Invoicing.repository';

interface Services {
  invoice: InvoicingServiceRepository;
}

export class PayInvoiceCommand {
  private __uniq: void;

  private invoiceId: string | undefined;

  constructor(private services: Services) {}

  init(invoiceId: string) {
    this.invoiceId = invoiceId;
    return this;
  }

  async execute() {
    if (!this.invoiceId)
      return {
        isError: true,
        message: `Command ${this.constructor.name} is not initialized`,
      };

    const invoiceDb = await this.services.invoice.payInvoice(this.invoiceId);
    if (!invoiceDb.isPaid) {
      return {
        isError: true,
        message: 'Invoice payment failed',
      };
    }

    return { invoicePaid: true };
  }
}
