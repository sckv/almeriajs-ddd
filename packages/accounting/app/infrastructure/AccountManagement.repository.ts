import { Account } from '~app/domain/entities/Account.ent';
import { AccountManagementService } from '~app/domain/services/AccountManagement.service';
import Knex from 'knex';
import { Email } from '~app/domain/value-objects/Email.vo';

export class AccountManagementServiceRepository extends AccountManagementService {
  constructor(database: Knex) {
    super(database);
  }

  async createAccount(account: Account) {
    await this.database('account').insert(account);
    return { isCreated: true };
  }

  async updateAccount(account: Account) {
    await this.database('account').where({ email: account.email }).insert(account);
    return { isUpdated: true };
  }

  async getAccount(email: Email) {
    const accountFromDb = await this.database('account').where({ email: email.value }).select('email, balance').first();
    return new Account(accountFromDb);
  }
}
