// REPOSITORIES
import { InvoicingServiceRepository } from '~app/infrastructure/Invoicing.repository';
import { BalanceRelatedServiceRepository } from '~app/infrastructure/BalanceRelated.repository';

// HANDLERS & CONTROLLERS
import { CreateInvoiceHandler } from '~app/application/handlers/CreateInvoice.handler';
import { PayInvoiceHandler } from '~app/application/handlers/PayInvoice.handler';
import { RetrieveInvoicesController } from '~app/application/controllers/RetrieveInvoices.controller';

// COMMANDS & QUERIES
import { PayInvoiceCommand } from '~app/application/commands/PayInvoice.command';
import { CreateInvoiceCommand } from '~app/application/commands/CreateInvoice.command';
import { RetrieveInvoicesQuery } from '~app/application/queries/RetrieveInvoices.query';

// EXTERNALS
import { database } from '~external/db';
import { nats } from '~external/nats';

//! BOOTSTRAP SERVICES - IMPORTANT TO DECLARE ONLY ONCE
export const invoiceService = new InvoicingServiceRepository(database);
export const balanceRelatedService = new BalanceRelatedServiceRepository(nats);

// BOOTSTRAP HANDLERS
export const createInvoiceHandler = new CreateInvoiceHandler({
  createInvoice: new CreateInvoiceCommand({
    balance: balanceRelatedService,
    invoice: invoiceService,
  }),
});

export const payInvoiceHandler = new PayInvoiceHandler({
  payInvoice: new PayInvoiceCommand({ invoice: invoiceService }),
});

export const retrieveInvoiceController = new RetrieveInvoicesController({
  retrieveInvoices: new RetrieveInvoicesQuery({ invoice: invoiceService }),
});
