import { ex } from '~external/express';
import { retrieveAccountBalanceController, createAccountController } from './bootstrap';

// ASSOC ROUTES
ex.route('balance/:email').get(retrieveAccountBalanceController.handle);
ex.route('accounts').post(createAccountController.handle);

console.log('Express routes bootstrapped!');
