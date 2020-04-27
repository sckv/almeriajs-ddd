import { ex } from '~external/express';
import { retrieveInvoiceController } from './bootstrap';

// ASSOC ROUTES
ex.route('/invoices/:email').get(retrieveInvoiceController.handle.bind(retrieveInvoiceController));

console.log('Express routes bootstrapped!');
