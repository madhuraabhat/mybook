import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryFilter } from '@/app/components/book/CategoryFilter';
import { Category } from '@/app/lib/types/book';

const mockCategories: Category[] = [
  { id: 'fiction', name: 'Fiction', slug: 'fiction' },
  { id: 'poetry', name: 'Poetry', slug: 'poetry' },
  { id: 'philosophy', name: 'Philosophy', slug: 'philosophy' },
];

describe('CategoryFilter', () => {
  it('renders all categories', () => {
    render(<CategoryFilter categories={mockCategories} />);
    expect(screen.getByText('Fiction')).toBeInTheDocument();
    expect(screen.getByText('Poetry')).toBeInTheDocument();
    expect(screen.getByText('Philosophy')).toBeInTheDocument();
  });

  it('calls onCategoryChange when category is clicked', () => {
    const handleCategoryChange = jest.fn();
    render(<CategoryFilter categories={mockCategories} onCategoryChange={handleCategoryChange} />);
    
    fireEvent.click(screen.getByText('Poetry'));
    expect(handleCategoryChange).toHaveBeenCalledWith('poetry');
  });

  it('highlights selected category', () => {
    const { container } = render(
      <CategoryFilter categories={mockCategories} selectedCategory="poetry" />
    );
    const selectedButton = screen.getByText('Poetry').closest('button');
    expect(selectedButton).toHaveClass('category-active');
  });

  it('shows "All" option when showAll is true', () => {
    render(<CategoryFilter categories={mockCategories} showAll />);
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  it('calls onCategoryChange with null when All is clicked', () => {
    const handleCategoryChange = jest.fn();
    render(
      <CategoryFilter
        categories={mockCategories}
        showAll
        onCategoryChange={handleCategoryChange}
      />
    );
    
    fireEvent.click(screen.getByText('All'));
    expect(handleCategoryChange).toHaveBeenCalledWith(null);
  });
});

