import { ProductsAPI } from './products.http';
import { OrdersAPI } from './orders.http';
import { AccountsAPI } from './accounts.http';
import { BillingAPI } from './billing.http';

export const dataSources = () => {
  return {
    products: new ProductsAPI(),
    orders: new OrdersAPI(),
    accounts: new AccountsAPI(),
    billing: new BillingAPI(),
  };
};
