import e from 'express';

import { RetrieveOrdersQuery } from '../queries/RetrieveOrders.query';

interface Deps {
  retrieveProducts: RetrieveOrdersQuery;
}

export class RetrieveProductsController {
  constructor(private deps: Deps) {}

  async handle(_req: e.Request, res: e.Response) {
    const products = await this.deps.retrieveProducts.init().execute();

    res.send(products);
  }
}
