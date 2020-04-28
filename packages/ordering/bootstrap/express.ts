import { retrieveOrdersController, placeOrderController, getSingleOrderController } from './bootstrap';

import { ex } from '~external/express';

// ASSOC ROUTES
ex.route('/orders')
  .get(retrieveOrdersController.handle.bind(retrieveOrdersController))
  .post(placeOrderController.handle.bind(placeOrderController));

ex.route('/orders/:orderId').get(getSingleOrderController.handle.bind(getSingleOrderController));

console.log('Express routes bootstrapped!');
