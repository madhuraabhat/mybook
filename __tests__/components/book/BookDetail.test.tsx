import { render, screen, fireEvent } from '@testing-library/react';
import { BookDetail } from '@/app/components/book/BookDetail';
import { Book } from '@/app/lib/types/book';

const mockBook: Book = {
  id: 'book-001',
  title: 'Test Book',
  author: 'Test Author',
  description: 'This is a long description of the test book that contains multiple sentences and provides detailed information about the book content.',
  category: 'fiction',
  price: 2499,
  imageUrl: '/test-image.jpg',
  inStock: true,
  isbn: '978-0-123456-78-9',
  publishedYear: 2020,
  pages: 300,
};

describe('BookDetail', () => {
  it('renders book title and author', () => {
    render(<BookDetail book={mockBook} onAddToCart={jest.fn()} />);
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText(/Test Author/)).toBeInTheDocument();
  });

  it('renders book description', () => {
    render(<BookDetail book={mockBook} onAddToCart={jest.fn()} />);
    expect(screen.getByText(/This is a long description/)).toBeInTheDocument();
  });

  it('renders formatted price', () => {
    render(<BookDetail book={mockBook} onAddToCart={jest.fn()} />);
    expect(screen.getByText('$24.99')).toBeInTheDocument();
  });

  it('renders book image', () => {
    render(<BookDetail book={mockBook} onAddToCart={jest.fn()} />);
    const image = screen.getByAltText('Test Book');
    expect(image).toBeInTheDocument();
    // Next.js Image component transforms the src, so check for URL pattern
    expect(image.getAttribute('src')).toContain('test-image.jpg');
  });

  it('calls onAddToCart when Add to Cart button is clicked', () => {
    const handleAddToCart = jest.fn();
    render(<BookDetail book={mockBook} onAddToCart={handleAddToCart} />);
    
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(handleAddToCart).toHaveBeenCalledWith('book-001', 1);
  });

  it('allows quantity selection', () => {
    const handleAddToCart = jest.fn();
    render(<BookDetail book={mockBook} onAddToCart={handleAddToCart} />);
    
    const quantityInput = screen.getByLabelText(/quantity/i);
    fireEvent.change(quantityInput, { target: { value: '3' } });
    
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(handleAddToCart).toHaveBeenCalledWith('book-001', 3);
  });

  it('displays book metadata when available', () => {
    render(<BookDetail book={mockBook} onAddToCart={jest.fn()} />);
    expect(screen.getByText(/ISBN:/)).toBeInTheDocument();
    expect(screen.getByText('978-0-123456-78-9')).toBeInTheDocument();
    expect(screen.getByText(/Published:/)).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText(/Pages:/)).toBeInTheDocument();
    expect(screen.getByText('300')).toBeInTheDocument();
  });

  it('shows out of stock message when book is not in stock', () => {
    const outOfStockBook = { ...mockBook, inStock: false };
    render(<BookDetail book={outOfStockBook} onAddToCart={jest.fn()} />);
    expect(screen.getAllByText(/out of stock/i).length).toBeGreaterThan(0);
    expect(screen.queryByRole('button', { name: /add to cart/i })).not.toBeInTheDocument();
  });
});

