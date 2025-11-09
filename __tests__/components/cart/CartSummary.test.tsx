import { render, screen } from '@testing-library/react';
import { CartSummary } from '@/app/components/cart/CartSummary';

describe('CartSummary', () => {
  it('displays total amount', () => {
    render(<CartSummary totalAmount={6997} />);
    expect(screen.getByText('$69.97')).toBeInTheDocument();
  });

  it('displays item count', () => {
    render(<CartSummary totalAmount={6997} itemCount={3} />);
    expect(screen.getByText(/3 items/i)).toBeInTheDocument();
  });

  it('calls onCheckout when checkout button is clicked', () => {
    const handleCheckout = jest.fn();
    render(<CartSummary totalAmount={6997} onCheckout={handleCheckout} />);
    
    screen.getByRole('button', { name: /checkout/i }).click();
    expect(handleCheckout).toHaveBeenCalled();
  });

  it('disables checkout button when disabled prop is true', () => {
    const handleCheckout = jest.fn();
    render(<CartSummary totalAmount={6997} onCheckout={handleCheckout} disabled />);
    expect(screen.getByRole('button', { name: /checkout/i })).toBeDisabled();
  });
});

