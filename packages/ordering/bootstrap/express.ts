import { ex } from '~external/express';
import { retrieveOrdersController, placeOrderController, getSingleOrderController } from './bootstrap';

// ASSOC ROUTES
ex.route('orders').get(retrieveOrdersController.handle).post(placeOrderController.handle);
ex.route('orders/:id').get(getSingleOrderController.handle);

console.log('Express routes bootstrapped!');
