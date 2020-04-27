import { Email } from '../value-objects/Email.vo';

type WannabeAccount = {
  email: Email;
  balance?: number;
  password?: string;
};

export class Account {
  get password() {
    return this.account.password;
  }

  get email() {
    return this.account.email.value;
  }

  get balance() {
    return this.account.balance!;
  }

  constructor(private account: WannabeAccount) {
    if (!account.balance) account.balance = 1000;
    this.account = account;
  }

  setPassword(password: string) {
    this.account.password = password;
    return this;
  }

  setBalance(balance: number) {
    this.account.balance = balance;
    return this;
  }

  toJSON() {
    return {
      balance: this.account.balance,
      password: this.account.password,
      email: this.account.email,
    };
  }
}
