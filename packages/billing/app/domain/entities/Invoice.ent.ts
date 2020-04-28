import * as uuid from 'uuid';

import { Email } from '../value-objects/Email.vo';

type WannabeInvoice = {
  id?: string;
  tax: number;
  paid?: boolean;
  charged?: boolean;
  address: string;
  price: number;
  orderId: string;
  email: Email;
};

export class Invoice {
  get orderId() {
    return this.invoice.orderId;
  }

  get charged() {
    return this.invoice.charged as boolean;
  }
  get email() {
    return this.invoice.email.value;
  }

  get totalPrice() {
    return (this.invoice.tax / 100 + 1) * this.invoice.price;
  }

  get price() {
    return +this.invoice.price;
  }

  get id() {
    return this.invoice.id as string;
  }

  get tax() {
    return +this.invoice.tax;
  }

  get paid() {
    return this.invoice.paid as boolean;
  }

  get address() {
    return this.invoice.address;
  }

  constructor(private invoice: WannabeInvoice) {
    if (!invoice.id) invoice.id = uuid.v1();
    this.invoice.paid = false;
    this.invoice = invoice;
  }

  setEmail(email: Email) {
    this.invoice.email = email;
    return this;
  }

  setPaid() {
    this.invoice.paid = true;
    return this;
  }

  setUnpaid() {
    this.invoice.paid = false;
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      tax: this.tax,
      paid: this.paid,
      charged: this.charged,
      address: this.address,
      price: this.price,
      orderId: this.orderId,
      email: this.email,
    };
  }
}
