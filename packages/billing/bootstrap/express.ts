import { retrieveInvoiceController } from './bootstrap';

import { ex } from '~external/express';

// ASSOC ROUTES
ex.route('/invoices/:email').get(retrieveInvoiceController.handle.bind(retrieveInvoiceController));

console.log('Express routes bootstrapped!');
