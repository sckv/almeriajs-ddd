import { RESTDataSource } from 'apollo-datasource-rest';

interface UserSignUp {
  email: string;
  password: string;
}

export class AccountsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.ACCOUNTING_API_URL;
  }

  async createAccount(account: UserSignUp) {
    return this.post('accounts', account);
  }

  async getBalance(email: string) {
    return this.get('balance', { email });
  }

  // async addBalance(email: string, amount: number) {
  //   return this.post('balance', { email, amount });
  // }
}
