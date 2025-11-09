'use client';

import React from 'react';
import { CartItem as CartItemType } from '@/app/lib/types/cart';
import { Book } from '@/app/lib/types/book';
import { Image } from '@/app/components/ui/Image';
import { Button } from '@/app/components/ui/Button';
import { formatPrice } from '@/app/lib/utils/format';

export interface CartItemProps {
  item: CartItemType;
  book: Book;
  onUpdateQuantity: (bookId: string, quantity: number) => void;
  onRemove: (bookId: string) => void;
}

export function CartItem({ item, book, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10);
    if (quantity > 0) {
      onUpdateQuantity(item.bookId, quantity);
    }
  };

  const handleRemove = () => {
    onRemove(item.bookId);
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <Image src={book.imageUrl} alt={book.title} width={100} height={150} />
      </div>
      <div className="cart-item-details">
        <h3 className="cart-item-title">{book.title}</h3>
        <p className="cart-item-author">{book.author}</p>
        <p className="cart-item-price">{formatPrice(item.price)}</p>
      </div>
      <div className="cart-item-quantity">
        <label htmlFor={`quantity-${item.bookId}`}>
          Quantity:
          <input
            id={`quantity-${item.bookId}`}
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="cart-quantity-input"
          />
        </label>
      </div>
      <div className="cart-item-subtotal">
        <p className="cart-item-subtotal-label">Subtotal:</p>
        <p className="cart-item-subtotal-amount">{formatPrice(subtotal)}</p>
      </div>
      <div className="cart-item-actions">
        <Button variant="outline" size="small" onClick={handleRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
}

