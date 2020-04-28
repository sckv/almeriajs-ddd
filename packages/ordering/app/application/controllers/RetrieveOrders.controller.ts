import e from 'express';

import { RetrieveOrdersQuery } from '../queries/RetrieveOrders.query';

import { isDomainError } from '~app/tools';
import { Email } from '~app/domain/value-objects/Email.vo';

interface Deps {
  retrieveOrdersQuery: RetrieveOrdersQuery;
}

export class RetrieveOrdersController {
  constructor(private deps: Deps) {}

  async handle(req: e.Request, res: e.Response) {
    const { email } = req.query;

    const emailParsed = Email.create(email as string);
    if (!emailParsed) return res.status(412).send('Email is incorrect');

    const order = await this.deps.retrieveOrdersQuery.init(emailParsed).execute();

    if (isDomainError(order)) {
      res.status(400).send(order.message);
    } else {
      res.send(order);
    }
  }
}
