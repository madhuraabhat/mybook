import { render, screen, fireEvent } from '@testing-library/react';
import { BookCard } from '@/app/components/book/BookCard';
import { Book } from '@/app/lib/types/book';

const mockBook: Book = {
  id: 'book-001',
  title: 'Test Book',
  author: 'Test Author',
  description: 'Test description',
  category: 'fiction',
  price: 2499,
  imageUrl: '/test-image.jpg',
  inStock: true,
};

describe('BookCard', () => {
  it('renders book title and author', () => {
    render(<BookCard book={mockBook} />);
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  it('renders book price formatted correctly', () => {
    render(<BookCard book={mockBook} />);
    expect(screen.getByText('$24.99')).toBeInTheDocument();
  });

  it('renders book image with alt text', () => {
    render(<BookCard book={mockBook} />);
    const image = screen.getByAltText('Test Book');
    expect(image).toBeInTheDocument();
    // Next.js Image component transforms the src, so check for URL pattern
    expect(image.getAttribute('src')).toContain('test-image.jpg');
  });

  it('calls onViewDetails when card is clicked', () => {
    const handleViewDetails = jest.fn();
    render(<BookCard book={mockBook} onViewDetails={handleViewDetails} />);
    
    fireEvent.click(screen.getByText('Test Book').closest('div')!);
    expect(handleViewDetails).toHaveBeenCalledWith('book-001');
  });

  it('calls onAddToCart when Add to Cart button is clicked', () => {
    const handleAddToCart = jest.fn();
    render(<BookCard book={mockBook} onAddToCart={handleAddToCart} />);
    
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(handleAddToCart).toHaveBeenCalledWith('book-001');
  });

  it('applies custom className', () => {
    const { container } = render(<BookCard book={mockBook} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('shows out of stock badge when book is not in stock', () => {
    const outOfStockBook = { ...mockBook, inStock: false };
    render(<BookCard book={outOfStockBook} />);
    expect(screen.getByText(/out of stock/i)).toBeInTheDocument();
  });
});

