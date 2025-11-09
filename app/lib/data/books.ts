import { Book } from '@/app/lib/types/book';
import { categories } from './categories';

export const books: Book[] = [
  {
    id: 'book-001',
    title: 'The Collected Poems of Rumi',
    author: 'Jalal ad-Din Muhammad Rumi',
    description: 'A comprehensive collection of Rumi\'s mystical poetry, translated from Persian. This rare edition includes previously unpublished works and scholarly annotations.',
    category: 'poetry',
    price: 2499, // $24.99 in cents
    imageUrl: `https://via.placeholder.com/400x600?text=${encodeURIComponent('The Collected Poems of Rumi')}`,
    isbn: '978-0-14-044335-0',
    publishedYear: 2004,
    pages: 384,
    inStock: true,
  },
  {
    id: 'book-002',
    title: 'Being and Time',
    author: 'Martin Heidegger',
    description: 'Heidegger\'s magnum opus on the question of being. This first English translation from 1962 is a rare find for philosophy enthusiasts.',
    category: 'philosophy',
    price: 3499, // $34.99
    imageUrl: `https://via.placeholder.com/400x600?text=${encodeURIComponent('Being and Time')}`,
    isbn: '978-0-06-157559-4',
    publishedYear: 1962,
    pages: 589,
    inStock: true,
  },
  {
    id: 'book-003',
    title: 'The Unbearable Lightness of Being',
    author: 'Milan Kundera',
    description: 'A philosophical novel exploring themes of love, politics, and the human condition. This limited edition includes the author\'s original notes.',
    category: 'fiction',
    price: 2799, // $27.99
    imageUrl: `https://via.placeholder.com/400x600?text=${encodeURIComponent('The Unbearable Lightness of Being')}`,
    isbn: '978-0-06-114852-1',
    publishedYear: 1984,
    pages: 320,
    inStock: true,
  },
  {
    id: 'book-004',
    title: 'Leaves of Grass (First Edition)',
    author: 'Walt Whitman',
    description: 'A rare first edition of Whitman\'s groundbreaking poetry collection. This volume contains the original 12 poems before later expansions.',
    category: 'poetry',
    price: 4599, // $45.99
    imageUrl: `https://via.placeholder.com/400x600?text=${encodeURIComponent('Leaves of Grass')}`,
    isbn: '978-0-14-042199-0',
    publishedYear: 1855,
    pages: 95,
    inStock: true,
  },
  {
    id: 'book-005',
    title: 'The Stranger',
    author: 'Albert Camus',
    description: 'Camus\' existentialist masterpiece in a rare early English translation. This edition includes the author\'s preface and critical essays.',
    category: 'fiction',
    price: 2199, // $21.99
    imageUrl: `https://via.placeholder.com/400x600?text=${encodeURIComponent('The Stranger')}`,
    isbn: '978-0-679-72020-1',
    publishedYear: 1946,
    pages: 123,
    inStock: true,
  },
];

export function getAllBooks(): Book[] {
  return books;
}

export function getBookById(id: string): Book | null {
  return books.find((book) => book.id === id) || null;
}

export function getBooksByCategory(category: string): Book[] {
  return books.filter((book) => book.category === category);
}

