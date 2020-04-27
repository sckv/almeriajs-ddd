import { CreateAccountController } from '~app/application/controllers/CreateAccount.controller';
import { RetrieveAccountBalanceController } from '~app/application/controllers/RetrieveAccountBalance.controller';
import { ChargePaymentHandler } from '~app/application/handlers/ChargePayment.handler';
import { CreateAccountCommand } from '~app/application/commands/CreateAccount.command';
import { AccountManagementServiceRepository } from '~app/infrastructure/AccountManagement.repository';
import { database } from '~external/db';
import { RetrieveAccountBalanceQuery } from '~app/application/queries/RetrieveAccountBalance.query';
import { ChargePaymentCommand } from '~app/application/commands/ChargePayment.command';

const accountManagement = new AccountManagementServiceRepository(database);

export const createAccountController = new CreateAccountController({
  createAccount: new CreateAccountCommand({ accountManagement }),
});
export const retrieveAccountBalanceController = new RetrieveAccountBalanceController({
  retrieveAccountBalance: new RetrieveAccountBalanceQuery({ accountManagement }),
});
export const chargePaymentHandler = new ChargePaymentHandler({
  chargePayment: new ChargePaymentCommand({ accountManagement }),
});
