'use client';

import React from 'react';
import { Book } from '@/app/lib/types/book';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/Badge';
import { Image } from '@/app/components/ui/Image';
import { formatPrice } from '@/app/lib/utils/format';

export interface BookCardProps {
  book: Book;
  onViewDetails?: (bookId: string) => void;
  onAddToCart?: (bookId: string) => void;
  className?: string;
}

export function BookCard({ book, onViewDetails, onAddToCart, className = '' }: BookCardProps) {
  const handleCardClick = () => {
    onViewDetails?.(book.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(book.id);
  };

  return (
    <Card className={`book-card ${className}`.trim()}>
      <div onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <div className="book-card-image">
          <Image
            src={book.imageUrl}
            alt={book.title}
            width={300}
            height={450}
            className="book-image"
          />
          {!book.inStock && (
            <Badge variant="error" className="book-stock-badge">
              Out of Stock
            </Badge>
          )}
        </div>
        <div className="book-card-content">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">{book.author}</p>
          <p className="book-price">{formatPrice(book.price)}</p>
        </div>
      </div>
      {book.inStock && onAddToCart && (
        <div className="book-card-actions">
          <Button onClick={handleAddToCart} variant="primary" size="medium">
            Add to Cart
          </Button>
        </div>
      )}
    </Card>
  );
}

