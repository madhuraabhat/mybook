'use client';

import React from 'react';
import { CartItem } from '@/app/lib/types/cart';
import { Book } from '@/app/lib/types/book';
import { formatPrice } from '@/app/lib/utils/format';

export interface OrderSummaryProps {
  items: CartItem[];
  books: Book[];
  totalAmount: number;
}

export function OrderSummary({ items, books, totalAmount }: OrderSummaryProps) {
  const getBook = (bookId: string): Book | undefined => {
    return books.find((b) => b.id === bookId);
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      
      <div className="order-summary-items">
        {items.map((item) => {
          const book = getBook(item.bookId);
          if (!book) return null;

          const subtotal = item.price * item.quantity;

          return (
            <div key={item.bookId} className="order-summary-item">
              <div className="order-summary-item-info">
                <span className="order-summary-item-title">{book.title}</span>
                <span className="order-summary-item-details">
                  {item.quantity} × {formatPrice(item.price)}
                </span>
              </div>
              <span className="order-summary-item-subtotal">
                {formatPrice(subtotal)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="order-summary-total">
        <span>Total:</span>
        <span className="order-total-amount">{formatPrice(totalAmount)}</span>
      </div>
    </div>
  );
}

