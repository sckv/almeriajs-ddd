import { InvoicingServiceRepository } from '~app/infrastructure/Invoicing.repository';

interface Services {
  invoice: InvoicingServiceRepository;
}

export class PayInvoiceCommand {
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
        message: `Command ${this.constructor.name} is not initialized`,
      };

    const invoiceDb = await this.services.invoice.payInvoice(this.orderId);
    if (!invoiceDb.isPaid) {
      return {
        isError: true,
        message: 'Invoice payment failed',
      };
    }

    return { invoicePaid: true };
  }
}
