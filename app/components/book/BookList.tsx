'use client';

import React from 'react';
import { Book } from '@/app/lib/types/book';
import { BookCard } from './BookCard';

export interface BookListProps {
  books: Book[];
  onViewDetails?: (bookId: string) => void;
  onAddToCart?: (bookId: string) => void;
  className?: string;
}

export function BookList({ books, onViewDetails, onAddToCart, className = '' }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className={`book-list-empty ${className}`.trim()}>
        <p>No books found</p>
      </div>
    );
  }

  return (
    <div className={`book-list ${className}`.trim()}>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onViewDetails={onViewDetails}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

