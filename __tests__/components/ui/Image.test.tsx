import { render, screen } from '@testing-library/react';
import { Image } from '@/app/components/ui/Image';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

describe('Image', () => {
  it('renders image with src and alt', () => {
    render(<Image src="/test.jpg" alt="Test image" />);
    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test.jpg');
  });

  it('applies className correctly', () => {
    const { container } = render(
      <Image src="/test.jpg" alt="Test" className="custom-class" />
    );
    expect(container.querySelector('img')).toHaveClass('custom-class');
  });

  it('passes through width and height props', () => {
    render(<Image src="/test.jpg" alt="Test" width={200} height={300} />);
    const img = screen.getByAltText('Test');
    expect(img).toHaveAttribute('width', '200');
    expect(img).toHaveAttribute('height', '300');
  });
});

