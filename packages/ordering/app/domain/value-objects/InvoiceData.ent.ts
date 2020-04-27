import { Email } from './Email.vo';

type WannabeInvoice = {
  tax: number;
  address?: string;
  price?: number;
  orderId: string;
  email: Email;
};

export class DataForInvoice {
  get orderId() {
    return this.invoice.orderId;
  }

  get email() {
    return this.invoice.email.value;
  }

  get price() {
    return this.invoice.price;
  }

  get tax() {
    return this.invoice.tax;
  }

  get address() {
    return this.invoice.address!;
  }

  constructor(private invoice: WannabeInvoice) {}

  setAddress(address: string) {
    this.invoice.address = address;
    return this;
  }

  setTax(tax: number) {
    this.invoice.tax = tax;
    return this;
  }

  setPrice(price: number) {
    this.invoice.price = price;
    return this;
  }

  toJSON() {
    return {
      tax: this.tax,
      address: this.address,
      price: this.price,
      orderId: this.orderId,
      email: this.email,
    };
  }
}
