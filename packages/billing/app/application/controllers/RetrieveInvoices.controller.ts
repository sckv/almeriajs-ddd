import e from 'express';

import { RetrieveInvoicesQuery } from '../queries/RetrieveInvoices.query';
import { isDomainError } from '~app/tools';

interface Deps {
  retrieveInvoices: RetrieveInvoicesQuery;
}

export class RetrieveInvoicesController {
  constructor(private deps: Deps) {}

  async handle(req: e.Request, res: e.Response) {
    const { accountId } = req.params;

    const invoices = await this.deps.retrieveInvoices.init(accountId).execute();

    if (isDomainError(invoices)) {
      res.status(400).send(invoices.message);
    } else {
      res.send(invoices);
    }
  }
}
