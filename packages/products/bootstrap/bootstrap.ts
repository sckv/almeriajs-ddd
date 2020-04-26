// CONTROLLERS & HANDLERS
import { GetSingleProductController } from '~app/application/controllers/GetSingleProduct.controller';
import { RetrieveProductsController } from '~app/application/controllers/RetrieveProducts.controller';
import { UpdateProductsStockHandler } from '~app/application/handlers/UpdateProductsStock.handler';

// QUERIES & COMMANDS
import { GetSingleProductQuery } from '~app/application/queries/GetSingleProduct.query';
import { RetrieveProductsQuery } from '~app/application/queries/RetrieveProducts.query';
import { UpdateProductsStockCommand } from '~app/application/commands/UpdateProductsStock.command';

// REPOSITORIES
import { ProductsManagementServiceRepository } from '~app/infrastructure/ProductsManagement.repository';
import { database } from '~external/db';

// BOOTSTRAP SERVICES
const productsManagementService = new ProductsManagementServiceRepository(database);

// BOOTSTRAP CONTROLLERS & HANDLERS
const getSingleProductController = new GetSingleProductController({
  getSingleProduct: new GetSingleProductQuery({ productsManagement: productsManagementService }),
});
const retrieveProductsController = new RetrieveProductsController({
  retrieveProducts: new RetrieveProductsQuery({ productsManagement: productsManagementService }),
});
const updateProductsStockHandler = new UpdateProductsStockHandler({
  updateProductsStock: new UpdateProductsStockCommand({ productsManagement: productsManagementService }),
});

export { getSingleProductController, retrieveProductsController, updateProductsStockHandler };
