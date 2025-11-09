import { render, screen } from '@testing-library/react';
import { OrderStatus } from '@/app/components/orders/OrderStatus';

describe('OrderStatus', () => {
  it('renders confirmed status', () => {
    render(<OrderStatus status="confirmed" />);
    expect(screen.getByText(/confirmed/i)).toBeInTheDocument();
  });

  it('renders processing status', () => {
    render(<OrderStatus status="processing" />);
    expect(screen.getByText(/processing/i)).toBeInTheDocument();
  });

  it('renders shipped status', () => {
    render(<OrderStatus status="shipped" />);
    expect(screen.getByText(/shipped/i)).toBeInTheDocument();
  });

  it('renders delivered status', () => {
    render(<OrderStatus status="delivered" />);
    expect(screen.getByText(/delivered/i)).toBeInTheDocument();
  });
});

