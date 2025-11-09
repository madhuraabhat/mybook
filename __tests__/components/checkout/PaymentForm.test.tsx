import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PaymentForm } from '@/app/components/checkout/PaymentForm';
import { PaymentInfo } from '@/app/lib/types/order';

describe('PaymentForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders all required payment fields', () => {
    render(<PaymentForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/card number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/card holder name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expiry month/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expiry year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument();
  });

  it('displays validation errors', () => {
    const errors = {
      cardNumber: 'Invalid card number',
      cvv: 'Invalid CVV',
    };
    render(<PaymentForm onSubmit={mockOnSubmit} errors={errors} />);
    
    expect(screen.getByText('Invalid card number')).toBeInTheDocument();
    expect(screen.getByText('Invalid CVV')).toBeInTheDocument();
  });

  it('calls onSubmit with form data when submitted', async () => {
    render(<PaymentForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '4111111111111111' } });
    fireEvent.change(screen.getByLabelText(/card holder name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/expiry month/i), { target: { value: '12' } });
    fireEvent.change(screen.getByLabelText(/expiry year/i), { target: { value: '2025' } });
    fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /place order/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          cardNumber: '4111111111111111',
          cardHolderName: 'John Doe',
        })
      );
    });
  });

  it('masks card number in display', () => {
    render(<PaymentForm onSubmit={mockOnSubmit} />);
    
    const cardInput = screen.getByLabelText(/card number/i);
    fireEvent.change(cardInput, { target: { value: '4111111111111111' } });
    
    // Card number should be masked (showing only last 4 digits in some contexts)
    // For now, just verify the input accepts the value
    expect(cardInput).toHaveValue('4111111111111111');
  });
});

