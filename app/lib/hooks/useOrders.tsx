'use client';

import { createContext, useContext, useCallback, useMemo, useState, useEffect } from 'react';
import { Order, OrderItem, ShippingInfo, PaymentInfo } from '@/app/lib/types/order';
import { CartItem } from '@/app/lib/types/cart';
import { Book } from '@/app/lib/types/book';

interface OrdersContextValue {
  orders: Order[];
  createOrder: (
    cartItems: CartItem[],
    books: Book[],
    shippingInfo: ShippingInfo,
    paymentInfo: PaymentInfo,
    totalAmount: number
  ) => Order;
  getOrderById: (orderId: string) => Order | null;
  getOrders: () => Order[];
}

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

const ORDERS_STORAGE_KEY = 'mybook-orders';

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  // Use sessionStorage for orders (cleared on browser close)
  const [orders, setOrders] = useState<Order[]>([]);

  // Initialize from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert orderDate strings back to Date objects
        const ordersWithDates = parsed.map((order: any) => ({
          ...order,
          orderDate: new Date(order.orderDate),
        }));
        setOrders(ordersWithDates);
      }
    } catch (error) {
      console.error('Error reading orders from sessionStorage:', error);
    }
  }, []);

  // Save to sessionStorage whenever orders change
  useEffect(() => {
    try {
      window.sessionStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving orders to sessionStorage:', error);
    }
  }, [orders]);

  const createOrder = useCallback(
    (
      cartItems: CartItem[],
      books: Book[],
      shippingInfo: ShippingInfo,
      paymentInfo: PaymentInfo,
      totalAmount: number
    ): Order => {
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Convert cart items to order items (snapshot)
      const orderItems: OrderItem[] = cartItems.map((item) => {
        const book = books.find((b) => b.id === item.bookId);
        if (!book) {
          throw new Error(`Book not found: ${item.bookId}`);
        }
        return {
          bookId: item.bookId,
          title: book.title,
          author: book.author,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity,
        };
      });

      const subtotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

      const newOrder: Order = {
        orderId,
        orderDate: new Date(),
        items: orderItems,
        shippingInfo,
        paymentInfo: {
          ...paymentInfo,
          // Mask card number for storage
          cardNumber: `****${paymentInfo.cardNumber.slice(-4)}`,
        },
        status: 'confirmed',
        subtotal,
        totalAmount,
      };

      setOrders((prevOrders) => {
        const updated = [newOrder, ...prevOrders];
        // Save to sessionStorage
        try {
          window.sessionStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
        } catch (error) {
          console.error('Error saving order to sessionStorage:', error);
        }
        return updated;
      });

      return newOrder;
    },
    [setOrders]
  );

  const getOrderById = useCallback(
    (orderId: string): Order | null => {
      return orders.find((order) => order.orderId === orderId) || null;
    },
    [orders]
  );

  const getOrders = useCallback(() => {
    // Return orders sorted by date (most recent first)
    return [...orders].sort((a, b) => {
      const dateA = new Date(a.orderDate).getTime();
      const dateB = new Date(b.orderDate).getTime();
      return dateB - dateA;
    });
  }, [orders]);

  const value = useMemo(
    () => ({
      orders,
      createOrder,
      getOrderById,
      getOrders,
    }),
    [orders, createOrder, getOrderById, getOrders]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders(): OrdersContextValue {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}

