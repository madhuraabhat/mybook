'use client';

import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { CartItem, Cart } from '@/app/lib/types/cart';
import { useLocalStorage } from './useLocalStorage';

interface CartContextValue {
  items: CartItem[];
  totalAmount: number;
  addItem: (bookId: string, price: number, quantity?: number) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_STORAGE_KEY = 'mybook-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useLocalStorage<Cart>(CART_STORAGE_KEY, {
    items: [],
    totalAmount: 0,
    updatedAt: Date.now(),
  });

  const calculateTotal = useCallback((items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, []);

  const addItem = useCallback(
    (bookId: string, price: number, quantity: number = 1) => {
      setCart((prevCart) => {
        const existingItemIndex = prevCart.items.findIndex(
          (item) => item.bookId === bookId && item.price === price
        );

        let newItems: CartItem[];
        if (existingItemIndex >= 0) {
          // Update quantity if item exists
          newItems = prevCart.items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Add new item
          newItems = [...prevCart.items, { bookId, price, quantity }];
        }

        const totalAmount = calculateTotal(newItems);

        return {
          items: newItems,
          totalAmount,
          updatedAt: Date.now(),
        };
      });
    },
    [setCart, calculateTotal]
  );

  const removeItem = useCallback(
    (bookId: string) => {
      setCart((prevCart) => {
        const newItems = prevCart.items.filter((item) => item.bookId !== bookId);
        const totalAmount = calculateTotal(newItems);

        return {
          items: newItems,
          totalAmount,
          updatedAt: Date.now(),
        };
      });
    },
    [setCart, calculateTotal]
  );

  const updateQuantity = useCallback(
    (bookId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(bookId);
        return;
      }

      setCart((prevCart) => {
        const newItems = prevCart.items.map((item) =>
          item.bookId === bookId ? { ...item, quantity } : item
        );
        const totalAmount = calculateTotal(newItems);

        return {
          items: newItems,
          totalAmount,
          updatedAt: Date.now(),
        };
      });
    },
    [setCart, calculateTotal, removeItem]
  );

  const clearCart = useCallback(() => {
    setCart({
      items: [],
      totalAmount: 0,
      updatedAt: Date.now(),
    });
  }, [setCart]);

  const getItemCount = useCallback(() => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  }, [cart.items]);

  const value = useMemo(
    () => ({
      items: cart.items,
      totalAmount: cart.totalAmount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getItemCount,
    }),
    [cart.items, cart.totalAmount, addItem, removeItem, updateQuantity, clearCart, getItemCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

