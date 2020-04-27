import { AccountManagementServiceRepository } from '~app/infrastructure/AccountManagement.repository';
import { Email } from '~app/domain/value-objects/Email.vo';
import { InvoicingServiceRepository } from '~app/infrastructure/Invoicing.repository';

interface Services {
  accountManagement: AccountManagementServiceRepository;
  invoicing: InvoicingServiceRepository;
}

export class ChargePaymentCommand {
  private __uniq: void;

  private amount: number | undefined;
  private email: Email | undefined;
  private orderId: string | undefined;

  constructor(private services: Services) {}

  init(amount: number, email: Email, orderId: string) {
    this.amount = amount;
    this.email = email;
    this.orderId = orderId;

    return this;
  }

  async execute() {
    if (!this.amount || !this.email || !this.orderId)
      return {
        isError: true,
        message: `Command ${this.constructor.name} is not initialized`,
      };

    const usingAccount = await this.services.accountManagement.getAccount(this.email);

    usingAccount.setBalance(usingAccount.balance - this.amount);

    const accountToNewBalance = await this.services.accountManagement.updateAccount(usingAccount);
    if (!accountToNewBalance.isUpdated)
      return {
        isError: true,
        message: `Account ${usingAccount} has not been charged with payment`,
      };

    const invoicePaymentEvent = await this.services.invoicing.emitPaidInvoice(this.orderId);
    if (!invoicePaymentEvent.isEmitted)
      return {
        isError: true,
        message: `Emission of the paid event for the order ${this.orderId} has not been done`,
      };

    return { isCharged: true };
  }
}
