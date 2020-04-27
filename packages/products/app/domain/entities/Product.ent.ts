type WannabeProduct = {
  id: string;
  price: number;
  amount: number;
  name: boolean;
};

export class Product {
  get amount() {
    return this.product.amount;
  }

  get price() {
    return +this.product.price;
  }

  get id() {
    return this.product.id;
  }

  get name() {
    return this.product.name;
  }

  constructor(private product: WannabeProduct) {}

  setAmount(amount: number) {
    this.product.amount = amount;
    return this;
  }

  private toJSON() {
    return {
      id: this.id,
      name: this.name,
      price: +this.price,
      amount: this.amount,
    };
  }
}
