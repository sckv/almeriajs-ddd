import { RESTDataSource } from 'apollo-datasource-rest';

export class BillingAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.BILLING_API_URL;
  }

  async getInvoices(accountId: string) {
    return this.get(`invoices/${accountId}`);
  }
}
