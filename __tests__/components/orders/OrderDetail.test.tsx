import { render, screen } from '@testing-library/react';
import { OrderDetail } from '@/app/components/orders/OrderDetail';
import { Order } from '@/app/lib/types/order';

const mockOrder: Order = {
  orderId: 'ORD-001',
  orderDate: new Date('2025-01-27'),
  items: [
    {
      bookId: 'book-001',
      title: 'Test Book',
      author: 'Test Author',
      quantity: 2,
      price: 2499,
      subtotal: 4998,
    },
  ],
  shippingInfo: {
    fullName: 'John Doe',
    addressLine1: '123 Main St',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'USA',
    phone: '1234567890',
    email: 'john@example.com',
  },
  paymentInfo: {
    cardNumber: '****1111',
    cardHolderName: 'John Doe',
    expiryMonth: 12,
    expiryYear: 2025,
    cvv: '123',
  },
  status: 'confirmed',
  subtotal: 4998,
  totalAmount: 4998,
};

describe('OrderDetail', () => {
  it('renders order information', () => {
    render(<OrderDetail order={mockOrder} />);
    
    expect(screen.getByText(/ORD-001/)).toBeInTheDocument();
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getAllByText('$49.98').length).toBeGreaterThan(0);
  });

  it('displays order status', () => {
    render(<OrderDetail order={mockOrder} />);
    expect(screen.getByText(/confirmed/i)).toBeInTheDocument();
  });

  it('displays shipping information', () => {
    render(<OrderDetail order={mockOrder} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
  });

  it('masks payment card number', () => {
    render(<OrderDetail order={mockOrder} />);
    expect(screen.getByText(/Card ending in/)).toBeInTheDocument();
    expect(screen.getByText(/1111/)).toBeInTheDocument();
    expect(screen.queryByText('4111111111111111')).not.toBeInTheDocument();
  });
});

