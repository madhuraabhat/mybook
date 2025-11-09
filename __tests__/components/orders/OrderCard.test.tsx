import { render, screen, fireEvent } from '@testing-library/react';
import { OrderCard } from '@/app/components/orders/OrderCard';
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

describe('OrderCard', () => {
  it('renders order information', () => {
    render(<OrderCard order={mockOrder} />);
    
    expect(screen.getByText(/ORD-001/)).toBeInTheDocument();
    expect(screen.getByText('$49.98')).toBeInTheDocument();
  });

  it('displays order status', () => {
    render(<OrderCard order={mockOrder} />);
    expect(screen.getByText(/confirmed/i)).toBeInTheDocument();
  });

  it('calls onViewDetails when clicked', () => {
    const handleViewDetails = jest.fn();
    const { container } = render(<OrderCard order={mockOrder} onViewDetails={handleViewDetails} />);
    
    const wrapper = container.querySelector('.order-card-wrapper');
    if (wrapper) {
      fireEvent.click(wrapper);
      expect(handleViewDetails).toHaveBeenCalledWith('ORD-001');
    } else {
      // Fallback: click on any element
      fireEvent.click(screen.getByText(/ORD-001/));
      expect(handleViewDetails).toHaveBeenCalledWith('ORD-001');
    }
  });

  it('displays formatted date', () => {
    render(<OrderCard order={mockOrder} />);
    expect(screen.getByText(/January 27, 2025/i)).toBeInTheDocument();
  });
});

