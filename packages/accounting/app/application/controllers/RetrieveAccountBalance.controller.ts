import e from 'express';

import { RetrieveAccountBalanceQuery } from '../queries/RetrieveAccountBalance.query';
import { isDomainError } from '~app/tools';
import { Email } from '~app/domain/value-objects/Email.vo';

interface Deps {
  retrieveAccountBalance: RetrieveAccountBalanceQuery;
}

export class RetrieveAccountBalanceController {
  constructor(private deps: Deps) {}

  async handle(req: e.Request, res: e.Response) {
    const email = Email.create(req.params.email);
    if (!email) return res.status(400).send('Incorrect email');

    const balance = await this.deps.retrieveAccountBalance.init(email).execute();
    if (isDomainError(balance)) {
      res.status(400).send(balance.message);
    } else {
      res.send(balance);
    }
  }
}
