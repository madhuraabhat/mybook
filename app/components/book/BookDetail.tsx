'use client';

import React, { useState } from 'react';
import { Book } from '@/app/lib/types/book';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/Badge';
import { Image } from '@/app/components/ui/Image';
import { formatPrice } from '@/app/lib/utils/format';

export interface BookDetailProps {
  book: Book;
  onAddToCart: (bookId: string, quantity?: number) => void;
}

export function BookDetail({ book, onAddToCart }: BookDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (book.inStock) {
      onAddToCart(book.id, quantity);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="book-detail">
      <div className="book-detail-content">
        <div className="book-detail-image">
          <Image
            src={book.imageUrl}
            alt={book.title}
            width={400}
            height={600}
            className="book-detail-image-img"
            priority
          />
          {!book.inStock && (
            <Badge variant="error" className="book-stock-badge">
              Out of Stock
            </Badge>
          )}
        </div>
        <div className="book-detail-info">
          <h1 className="book-detail-title">{book.title}</h1>
          <p className="book-detail-author">by {book.author}</p>
          <p className="book-detail-price">{formatPrice(book.price)}</p>
          
          <div className="book-detail-description">
            <h2>Description</h2>
            <p>{book.description}</p>
          </div>

          <div className="book-detail-metadata">
            {book.isbn && (
              <div>
                <strong>ISBN:</strong> {book.isbn}
              </div>
            )}
            {book.publishedYear && (
              <div>
                <strong>Published:</strong> {book.publishedYear}
              </div>
            )}
            {book.pages && (
              <div>
                <strong>Pages:</strong> {book.pages}
              </div>
            )}
            <div>
              <strong>Category:</strong> {book.category}
            </div>
          </div>

          {book.inStock ? (
            <div className="book-detail-actions">
              <label htmlFor="quantity">
                Quantity:
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="book-quantity-input"
                />
              </label>
              <Button onClick={handleAddToCart} variant="primary" size="large">
                Add to Cart
              </Button>
            </div>
          ) : (
            <div className="book-detail-out-of-stock">
              <Badge variant="error">Out of Stock</Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

