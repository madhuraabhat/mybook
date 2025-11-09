export type OrderStatus = 'confirmed' | 'processing' | 'shipped' | 'delivered';

export interface ShippingInfo {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardHolderName: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
  billingAddress?: ShippingInfo;
}

export interface OrderItem {
  bookId: string;
  title: string;
  author: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  orderId: string;
  orderDate: Date;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  status: OrderStatus;
  subtotal: number;
  totalAmount: number;
  tax?: number;
  shippingCost?: number;
}

