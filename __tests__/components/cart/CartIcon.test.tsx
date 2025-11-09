import { render, screen } from '@testing-library/react';
import { CartIcon } from '@/app/components/cart/CartIcon';

describe('CartIcon', () => {
  it('displays item count badge', () => {
    render(<CartIcon itemCount={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('does not display badge when itemCount is 0', () => {
    const { container } = render(<CartIcon itemCount={0} />);
    expect(container.querySelector('.cart-badge')).not.toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<CartIcon itemCount={3} onClick={handleClick} />);
    
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalled();
  });
});

