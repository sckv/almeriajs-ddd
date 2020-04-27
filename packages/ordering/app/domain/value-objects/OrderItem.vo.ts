interface WannabeOrderItem {
  productId: string;
  price?: number;
  amount: number;
}

export class OrderItem {
  private _unique: void;

  get productId() {
    return this.orderItem.productId;
  }
  get amount() {
    return this.orderItem.amount;
  }
  get price() {
    return this.orderItem.price;
  }

  private constructor(private orderItem: WannabeOrderItem) {}

  setPrice(price: number) {
    this.orderItem.price = price;
    return this;
  }

  static create(orderItem: WannabeOrderItem) {
    // ... validations
    return new OrderItem(orderItem);
  }

  private toJSON() {
    return {
      productId: this.productId,
      price: this.price,
      amount: this.amount,
    };
  }
}
