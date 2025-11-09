import { render, screen, fireEvent } from '@testing-library/react';
import { CartItem } from '@/app/components/cart/CartItem';
import { CartItem as CartItemType } from '@/app/lib/types/cart';
import { Book } from '@/app/lib/types/book';

const mockCartItem: CartItemType = {
  bookId: 'book-001',
  quantity: 2,
  price: 2499,
};

const mockBook: Book = {
  id: 'book-001',
  title: 'Test Book',
  author: 'Test Author',
  description: 'Test description',
  category: 'fiction',
  price: 2499,
  imageUrl: '/test.jpg',
  inStock: true,
};

describe('CartItem', () => {
  it('renders book information', () => {
    render(
      <CartItem
        item={mockCartItem}
        book={mockBook}
        onUpdateQuantity={jest.fn()}
        onRemove={jest.fn()}
      />
    );

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('$24.99')).toBeInTheDocument();
  });

  it('displays quantity', () => {
    render(
      <CartItem
        item={mockCartItem}
        book={mockBook}
        onUpdateQuantity={jest.fn()}
        onRemove={jest.fn()}
      />
    );

    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });

  it('displays subtotal correctly', () => {
    render(
      <CartItem
        item={mockCartItem}
        book={mockBook}
        onUpdateQuantity={jest.fn()}
        onRemove={jest.fn()}
      />
    );

    // 2 * $24.99 = $49.98
    expect(screen.getByText('$49.98')).toBeInTheDocument();
  });

  it('calls onUpdateQuantity when quantity changes', () => {
    const handleUpdateQuantity = jest.fn();
    render(
      <CartItem
        item={mockCartItem}
        book={mockBook}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={jest.fn()}
      />
    );

    const quantityInput = screen.getByDisplayValue('2');
    fireEvent.change(quantityInput, { target: { value: '3' } });

    expect(handleUpdateQuantity).toHaveBeenCalledWith('book-001', 3);
  });

  it('calls onRemove when remove button is clicked', () => {
    const handleRemove = jest.fn();
    render(
      <CartItem
        item={mockCartItem}
        book={mockBook}
        onUpdateQuantity={jest.fn()}
        onRemove={handleRemove}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(handleRemove).toHaveBeenCalledWith('book-001');
  });
});

