import { renderHook, act } from '@testing-library/react';
import { useCart } from '@/app/lib/hooks/useCart';
import { CartProvider } from '@/app/lib/hooks/useCart';
import { Book } from '@/app/lib/types/book';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const mockBook: Book = {
  id: 'book-001',
  title: 'Test Book',
  author: 'Test Author',
  description: 'Test description',
  category: 'fiction',
  price: 2499,
  imageUrl: '/test.jpg',
  inStock: true,
};

describe('useCart', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('initializes with empty cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalAmount).toBe(0);
  });

  it('adds item to cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem('book-001', 2499, 1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].bookId).toBe('book-001');
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.items[0].price).toBe(2499);
  });

  it('increments quantity when adding same book again', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem('book-001', 2499, 1);
      result.current.addItem('book-001', 2499, 1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem('book-001', 2499, 1);
      result.current.removeItem('book-001');
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('updates item quantity', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem('book-001', 2499, 1);
    });

    act(() => {
      result.current.updateQuantity('book-001', 3);
    });

    expect(result.current.items[0].quantity).toBe(3);
  });

  it('calculates total amount correctly', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem('book-001', 2499, 2); // $24.99 * 2 = $49.98
    });

    act(() => {
      result.current.addItem('book-002', 1999, 1); // $19.99 * 1 = $19.99
    });

    expect(result.current.totalAmount).toBe(6997); // $69.97 in cents
  });

  it('clears cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem('book-001', 2499, 1);
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalAmount).toBe(0);
  });

  it('persists cart to localStorage', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem('book-001', 2499, 1);
    });

    const stored = localStorageMock.getItem('mybook-cart');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.items).toHaveLength(1);
  });
});

