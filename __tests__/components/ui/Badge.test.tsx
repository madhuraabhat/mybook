import { render, screen } from '@testing-library/react';
import { Badge } from '@/app/components/ui/Badge';

describe('Badge', () => {
  it('renders badge with text', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    expect(container.firstChild).toHaveClass('badge-success');
  });

  it('applies size classes correctly', () => {
    const { container } = render(<Badge size="small">Small</Badge>);
    expect(container.firstChild).toHaveClass('badge-small');
  });
});

