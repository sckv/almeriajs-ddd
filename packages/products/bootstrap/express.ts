import { ex } from '~external/express';
import { retrieveProductsController, getSingleProductController } from './bootstrap';

//ASSOC ROUTES
ex.route('products').get(retrieveProductsController.handle);
ex.route('products/:productId').get(getSingleProductController.handle);

console.log('Express routes bootstrapped!');
