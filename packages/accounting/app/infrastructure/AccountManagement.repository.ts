import Knex from 'knex';

import { Account } from '~app/domain/entities/Account.ent';
import { AccountManagementService } from '~app/domain/services/AccountManagement.service';
import { Email } from '~app/domain/value-objects/Email.vo';

export class AccountManagementServiceRepository extends AccountManagementService {
  constructor(database: Knex) {
    super(database);
  }

  async createAccount(account: Account) {
    await this.database('account').insert({
      email: account.email,
      password: account.password,
      balance: account.balance,
    });
    return { isCreated: true };
  }

  async updateAccount(account: Account) {
    await this.database('account').where({ email: account.email }).update({
      balance: account.balance,
    });
    return { isUpdated: true };
  }

  async getAccount(email: Email) {
    const accountFromDb = await this.database('account')
      .where({ email: email.value })
      .select('email', 'balance')
      .first();
    const emailParsed = Email.create(accountFromDb.email) as Email;

    return new Account({ email: emailParsed, balance: accountFromDb.balance });
  }
}
