import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@/app/components/ui/Input';

describe('Input', () => {
  it('renders input with label', () => {
    render(<Input label="Email" name="email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const handleChange = jest.fn();
    render(<Input name="test" onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('displays error message when error prop is provided', () => {
    render(<Input name="test" label="Test" error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('applies required attribute when required prop is true', () => {
    render(<Input name="test" label="Test" required />);
    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });
});

