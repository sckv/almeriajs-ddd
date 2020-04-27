import e from 'express';

import { isDomainError } from '~app/tools';
import { Email } from '~app/domain/value-objects/Email.vo';
import { CreateAccountCommand } from '../commands/CreateAccount.command';
import { Account } from '~app/domain/entities/Account.ent';

interface Deps {
  createAccount: CreateAccountCommand;
}

export class CreateAccountController {
  constructor(private deps: Deps) {}

  async handle(req: e.Request, res: e.Response) {
    const { email, password } = req.body;

    const emailParsed = Email.create(email);
    if (!emailParsed) return res.status(400).send('Incorrect email');

    const newAccount = new Account({ email: emailParsed, password });

    const accountDb = await this.deps.createAccount.init(newAccount).execute();

    if (isDomainError(accountDb)) {
      res.status(400).send(accountDb.message);
    } else {
      res.send(accountDb);
    }
  }
}
