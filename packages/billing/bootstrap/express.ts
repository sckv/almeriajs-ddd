import { ex } from '~external/express';
import { retrieveInvoiceController } from './bootstrap';

// ASSOC ROUTES
ex.route('invoices/:accountId').get(retrieveInvoiceController.handle);

console.log('Express routes bootstrapped!');
