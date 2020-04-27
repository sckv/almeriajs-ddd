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
const productsManagement = new ProductsManagementServiceRepository(database);

// BOOTSTRAP QUERIES & COMMANDS
const getSingleProduct = new GetSingleProductQuery({ productsManagement });
const retrieveProducts = new RetrieveProductsQuery({ productsManagement });
const updateProductsStock = new UpdateProductsStockCommand({ productsManagement });

// BOOTSTRAP CONTROLLERS & HANDLERS
const getSingleProductController = new GetSingleProductController({ getSingleProduct });
const retrieveProductsController = new RetrieveProductsController({ retrieveProducts });
const updateProductsStockHandler = new UpdateProductsStockHandler({ updateProductsStock });

export { getSingleProductController, retrieveProductsController, updateProductsStockHandler };
