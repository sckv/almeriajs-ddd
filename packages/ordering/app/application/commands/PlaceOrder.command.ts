import { Order } from '~app/domain/entities/Order.ent';
import { OrderItem } from '~app/domain/value-objects/OrderItem.vo';
import { InvoicingServiceRepository } from '~app/infrastructure/Invoicing.repository';
import { OrderManagementServiceRepository } from '~app/infrastructure/OrderManagement.repository';
import { OrderProductsOperationsServiceRepository } from '~app/infrastructure/OrderProducts.repository';
import { DataForInvoice } from '~app/domain/value-objects/InvoiceData.ent';

const pa = Promise.all;

interface Services {
  orderProductsOperations: OrderProductsOperationsServiceRepository;
  invoicing: InvoicingServiceRepository;
  orderManagement: OrderManagementServiceRepository;
}

export class PlaceOrderCommand {
  private __uniq: void;

  private order: Order | undefined;
  private orderItems: OrderItem[] | undefined;
  private toInvoice: DataForInvoice | undefined;
  private billingAddress: string | undefined;

  constructor(private services: Services) {}

  init(order: Order, orderItems: OrderItem[], toInvoice: DataForInvoice, billingAddress: string) {
    this.order = order;
    this.orderItems = orderItems;
    this.toInvoice = toInvoice;
    this.billingAddress = billingAddress;
    return this;
  }

  async execute() {
    if (!this.order || !this.orderItems || !this.toInvoice)
      return {
        isError: true,
        message: `Command ${this.constructor.name} is not initialized`,
      };

    const orderItemsWithPrice = await pa(
      this.orderItems.map(async (orderItem) => {
        const productData = await this.services.orderProductsOperations.getProduct(orderItem.productId);
        return orderItem.setPrice(productData.price!);
      })
    );
    this.order.setOrderItems(orderItemsWithPrice);

    const orderPlacement = await this.services.orderManagement.createOrder(this.order);
    if (!orderPlacement.isCreated)
      return {
        isError: true,
        nessage: 'Storing order into db error, aborting',
      };

    const orderItemsUpdate = await this.services.orderProductsOperations.updateProductsStock(this.orderItems);
    if (!orderItemsUpdate.stocksUpdated)
      return {
        isError: true,
        nessage: 'Updating products stock error',
      };

    const orderTotalPrice = orderItemsWithPrice.reduce((sum, acc) => sum + acc.price!, 0);
    this.toInvoice.setPrice(orderTotalPrice);
    this.toInvoice.setAddress(this.billingAddress || this.order.address!);

    const orderBill = await this.services.invoicing.invoceOrder(this.toInvoice);
    if (!orderBill.isInvoiced)
      return {
        isError: true,
        nessage: 'Invoice order dispatching error',
      };

    return { orderPlaced: true };
  }
}
