import { Account } from '~app/domain/entities/Account.ent';
import { AccountManagementServiceRepository } from '~app/infrastructure/AccountManagement.repository';

interface Services {
  accountManagement: AccountManagementServiceRepository;
}

export class CreateAccountCommand {
  private __uniq: void;

  private account: Account | undefined;

  constructor(private services: Services) {}

  init(account: Account) {
    this.account = account;
    return this;
  }

  async execute() {
    if (!this.account)
      return {
        isError: true,
        message: `Command ${this.constructor.name} is not initialized`,
      };

    const newAccount = await this.services.accountManagement.createAccount(this.account);
    if (!newAccount.isCreated) {
      return {
        isError: true,
        message: `Account ${this.account} is not created`,
      };
    }
    return this.account;
  }
}
