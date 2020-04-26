import e from 'express';

import { RetrieveProductsQuery } from '../queries/RetrieveProducts.query';

interface Deps {
  retrieveProducts: RetrieveProductsQuery;
}

export class RetrieveProductsController {
  constructor(private deps: Deps) {}

  async handle(_req: e.Request, res: e.Response) {
    const products = await this.deps.retrieveProducts.init().execute();

    res.send(products);
  }
}
