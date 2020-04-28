import Knex from 'knex';

import { Email } from '../value-objects/Email.vo';
import { Account } from '../entities/Account.ent';

export abstract class AccountManagementService {
  constructor(protected database: Knex) {}
  abstract async getAccount(email: Email): Promise<Account | Error>;
  abstract async createAccount(account: Account): Promise<{ isCreated: boolean } | Error>;
  abstract async updateAccount(account: Account): Promise<{ isUpdated: boolean } | Error>;
}
