import { ex } from '~external/express';
import { retrieveProductsController, getSingleProductController } from './bootstrap';

//ASSOC ROUTES
ex.get('/products', retrieveProductsController.handle.bind(retrieveProductsController));
ex.get('/products/:productId', getSingleProductController.handle.bind(getSingleProductController));

console.log('Express routes bootstrapped!');
