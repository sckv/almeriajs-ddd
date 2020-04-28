import { retrieveAccountBalanceController, createAccountController } from './bootstrap';

import { ex } from '~external/express';

// ASSOC ROUTES
ex.route('/balance/:email').get(retrieveAccountBalanceController.handle.bind(retrieveAccountBalanceController));
ex.route('/accounts').post(createAccountController.handle.bind(createAccountController));

console.log('Express routes bootstrapped!');
