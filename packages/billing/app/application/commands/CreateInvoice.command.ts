import { InvoicingServiceRepository } from '~app/infrastructure/Invoicing.repository';
import { Invoice } from '~app/domain/entities/Invoice.ent';
import { BalanceRelatedServiceRepository } from '~app/infrastructure/BalanceRelated.repository';

interface Services {
  invoice: InvoicingServiceRepository;
  balance: BalanceRelatedServiceRepository;
}

export class CreateInvoiceCommand {
  private __uniq: void;

  private invoice: Invoice | undefined;

  constructor(private services: Services) {}

  init(invoice: Invoice) {
    this.invoice = invoice;
    return this;
  }

  async execute() {
    if (!this.invoice)
      return {
        isError: true,
        message: `Command ${this.constructor.name} is not initialized`,
      };

    const invoiceDb = await this.services.invoice.createInvoice(this.invoice);
    if (!invoiceDb.isCreated) {
      return {
        isError: true,
        message: 'Invoice db creating failed',
      };
    }

    const balanceCharge = await this.services.balance.paymentCharge(this.invoice);
    if (!balanceCharge.isCharged) {
      return {
        isError: true,
        message: 'Invoice balance charge is failed it is not charged',
      };
    }

    const invoiceCharge = await this.services.invoice.chargeInvoice(this.invoice.id);
    if (!invoiceCharge.isCharged)
      return {
        isError: true,
        message: 'Invoice charge is failed in the database, although it is charged correctly in the third party',
      };

    return { invoiceCreated: true };
  }
}
