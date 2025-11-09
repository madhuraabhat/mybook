import { render, screen } from '@testing-library/react';
import { BookList } from '@/app/components/book/BookList';
import { Book } from '@/app/lib/types/book';

const mockBooks: Book[] = [
  {
    id: 'book-001',
    title: 'Book One',
    author: 'Author One',
    description: 'Description one',
    category: 'fiction',
    price: 1999,
    imageUrl: '/book1.jpg',
    inStock: true,
  },
  {
    id: 'book-002',
    title: 'Book Two',
    author: 'Author Two',
    description: 'Description two',
    category: 'poetry',
    price: 2499,
    imageUrl: '/book2.jpg',
    inStock: true,
  },
];

describe('BookList', () => {
  it('renders list of books', () => {
    render(<BookList books={mockBooks} />);
    expect(screen.getByText('Book One')).toBeInTheDocument();
    expect(screen.getByText('Book Two')).toBeInTheDocument();
  });

  it('renders empty state when no books', () => {
    render(<BookList books={[]} />);
    expect(screen.getByText(/no books found/i)).toBeInTheDocument();
  });

  it('calls onViewDetails when book card is clicked', () => {
    const handleViewDetails = jest.fn();
    render(<BookList books={mockBooks} onViewDetails={handleViewDetails} />);
    
    // Click on first book
    screen.getByText('Book One').click();
    expect(handleViewDetails).toHaveBeenCalledWith('book-001');
  });

  it('applies custom className', () => {
    const { container } = render(<BookList books={mockBooks} className="custom-list" />);
    expect(container.firstChild).toHaveClass('custom-list');
  });
});

