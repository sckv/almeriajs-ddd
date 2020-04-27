import { AccountManagementServiceRepository } from '~app/infrastructure/AccountManagement.repository';
import { Email } from '~app/domain/value-objects/Email.vo';

interface Services {
  accountManagement: AccountManagementServiceRepository;
}

export class ChargePaymentCommand {
  private __uniq: void;

  private amount: number | undefined;
  private email: Email | undefined;

  constructor(private services: Services) {}

  init(amount: number, email: Email) {
    this.amount = amount;
    this.email = email;
    return this;
  }

  async execute() {
    if (!this.amount || !this.email)
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

    return { isCharged: true };
  }
}
