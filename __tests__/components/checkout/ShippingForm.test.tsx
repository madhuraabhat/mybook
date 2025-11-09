import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ShippingForm } from '@/app/components/checkout/ShippingForm';
import { ShippingInfo } from '@/app/lib/types/order';

describe('ShippingForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders all required form fields', () => {
    render(<ShippingForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address line 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/postal code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('displays validation errors', () => {
    const errors = {
      email: 'Invalid email address',
      phone: 'Invalid phone number',
    };
    render(<ShippingForm onSubmit={mockOnSubmit} errors={errors} />);
    
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    expect(screen.getByText('Invalid phone number')).toBeInTheDocument();
  });

  it('calls onSubmit with form data when submitted', async () => {
    render(<ShippingForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/address line 1/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText(/state/i), { target: { value: 'NY' } });
    fireEvent.change(screen.getByLabelText(/postal code/i), { target: { value: '10001' } });
    fireEvent.change(screen.getByLabelText(/country/i), { target: { value: 'USA' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          fullName: 'John Doe',
          email: 'john@example.com',
        })
      );
    });
  });

  it('pre-fills form with initial values', () => {
    const initialValues: Partial<ShippingInfo> = {
      fullName: 'Jane Doe',
      email: 'jane@example.com',
    };
    render(<ShippingForm onSubmit={mockOnSubmit} initialValues={initialValues} />);
    
    expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('jane@example.com')).toBeInTheDocument();
  });
});

