import { Email } from '~app/domain/value-objects/Email.vo';
import { AccountManagementServiceRepository } from '~app/infrastructure/AccountManagement.repository';

interface Services {
  accountManagement: AccountManagementServiceRepository;
}

export class RetrieveAccountBalanceQuery {
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

    const usingAccount = await this.services.accountManagement.getAccount(this.email);

    return usingAccount.balance;
  }
}
