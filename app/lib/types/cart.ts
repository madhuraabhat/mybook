export interface CartItem {
  bookId: string;
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
  updatedAt: number;
}

