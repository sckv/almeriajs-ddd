import { GetSingleOrderController } from '~app/application/controllers/GetSingleOrder.controller';
import { PlaceOrderController } from '~app/application/controllers/PalceOrder.controller';
import { RetrieveOrdersController } from '~app/application/controllers/RetrieveOrders.controller';
import { GetSingleOrderQuery } from '~app/application/queries/GetSingleOrder.query';
import { OrderManagementServiceRepository } from '~app/infrastructure/OrderManagement.repository';
import { database } from '~external/db';
import { PlaceOrderCommand } from '~app/application/commands/PlaceOrder.command';
import { InvoicingServiceRepository } from '~app/infrastructure/Invoicing.repository';
import { OrderProductsOperationsServiceRepository } from '~app/infrastructure/OrderProducts.repository';
import { nats } from '~external/nats';
import { Fetcher } from '~external/http';
import { RetrieveOrdersQuery } from '~app/application/queries/RetrieveOrders.query';

// REPOSITORIES
const invoicing = new InvoicingServiceRepository(nats);
const orderManagement = new OrderManagementServiceRepository(database);
const orderProductsOperations = new OrderProductsOperationsServiceRepository(nats, new Fetcher());

// QUESRIES & COMMANDS
const placeOrderCommand = new PlaceOrderCommand({
  invoicing,
  orderManagement,
  orderProductsOperations,
});
const getSingleOrderQuery = new GetSingleOrderQuery({ orderManagement });
const retrieveOrdersQuery = new RetrieveOrdersQuery({ orderManagement });

// CONTROLLERS
export const getSingleOrderController = new GetSingleOrderController({ getSingleOrderQuery });
export const placeOrderController = new PlaceOrderController({ placeOrderCommand });
export const retrieveOrdersController = new RetrieveOrdersController({ retrieveOrdersQuery });
