import e from 'express';

import { GetSingleProductQuery } from '../queries/GetSingleProduct.query';

import { isDomainError } from '~app/tools';

interface Deps {
  getSingleProduct: GetSingleProductQuery;
}

export class GetSingleProductController {
  constructor(private deps: Deps) {}

  async handle(req: e.Request, res: e.Response) {
    const { productId } = req.params;
    const product = await this.deps.getSingleProduct.init(productId).execute();

    if (isDomainError(product)) {
      res.status(400).send(product.message);
    } else {
      res.send(product);
    }
  }
}
