import { render, screen } from '@testing-library/react';
import { OrderSummary } from '@/app/components/checkout/OrderSummary';
import { CartItem } from '@/app/lib/types/cart';
import { Book } from '@/app/lib/types/book';

const mockCartItems: CartItem[] = [
  { bookId: 'book-001', quantity: 2, price: 2499 },
  { bookId: 'book-002', quantity: 1, price: 1999 },
];

const mockBooks: Book[] = [
  {
    id: 'book-001',
    title: 'Book One',
    author: 'Author One',
    description: 'Description',
    category: 'fiction',
    price: 2499,
    imageUrl: '/book1.jpg',
    inStock: true,
  },
  {
    id: 'book-002',
    title: 'Book Two',
    author: 'Author Two',
    description: 'Description',
    category: 'poetry',
    price: 1999,
    imageUrl: '/book2.jpg',
    inStock: true,
  },
];

describe('OrderSummary', () => {
  it('displays all cart items', () => {
    render(<OrderSummary items={mockCartItems} books={mockBooks} />);
    
    expect(screen.getByText('Book One')).toBeInTheDocument();
    expect(screen.getByText('Book Two')).toBeInTheDocument();
  });

  it('displays quantities correctly', () => {
    render(<OrderSummary items={mockCartItems} books={mockBooks} totalAmount={6997} />);
    
    expect(screen.getByText(/2 × \$24\.99/)).toBeInTheDocument(); // Quantity for Book One
    expect(screen.getByText(/1 × \$19\.99/)).toBeInTheDocument(); // Quantity for Book Two
  });

  it('displays subtotals correctly', () => {
    render(<OrderSummary items={mockCartItems} books={mockBooks} />);
    
    // Book One: 2 * $24.99 = $49.98
    expect(screen.getByText('$49.98')).toBeInTheDocument();
    // Book Two: 1 * $19.99 = $19.99
    expect(screen.getByText('$19.99')).toBeInTheDocument();
  });

  it('displays total amount', () => {
    render(<OrderSummary items={mockCartItems} books={mockBooks} totalAmount={6997} />);
    
    // Total: $69.97
    expect(screen.getByText('$69.97')).toBeInTheDocument();
  });
});

