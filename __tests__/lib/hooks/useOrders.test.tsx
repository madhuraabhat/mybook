import { renderHook, act } from '@testing-library/react';
import { useOrders, OrdersProvider } from '@/app/lib/hooks/useOrders';
import { CartItem } from '@/app/lib/types/cart';
import { Book } from '@/app/lib/types/book';
import { ShippingInfo, PaymentInfo } from '@/app/lib/types/order';

// Mock sessionStorage
const sessionStorageMock = (() => {
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

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
  writable: true,
});

const mockCartItems: CartItem[] = [
  { bookId: 'book-001', quantity: 2, price: 2499 },
];

const mockBooks: Book[] = [
  {
    id: 'book-001',
    title: 'Test Book',
    author: 'Test Author',
    description: 'Test',
    category: 'fiction',
    price: 2499,
    imageUrl: '/test.jpg',
    inStock: true,
  },
];

const mockShippingInfo: ShippingInfo = {
  fullName: 'John Doe',
  addressLine1: '123 Main St',
  city: 'New York',
  state: 'NY',
  postalCode: '10001',
  country: 'USA',
  phone: '1234567890',
  email: 'john@example.com',
};

const mockPaymentInfo: PaymentInfo = {
  cardNumber: '4111111111111111',
  cardHolderName: 'John Doe',
  expiryMonth: 12,
  expiryYear: 2025,
  cvv: '123',
};

describe('useOrders', () => {
  beforeEach(() => {
    sessionStorageMock.clear();
  });

  it('initializes with empty orders', () => {
    const { result } = renderHook(() => useOrders(), {
      wrapper: OrdersProvider,
    });

    expect(result.current.orders).toEqual([]);
  });

  it('creates order successfully', () => {
    const { result } = renderHook(() => useOrders(), {
      wrapper: OrdersProvider,
    });

    let orderId: string;
    act(() => {
      const order = result.current.createOrder(
        mockCartItems,
        mockBooks,
        mockShippingInfo,
        mockPaymentInfo,
        4998
      );
      orderId = order.orderId;
    });

    expect(result.current.orders).toHaveLength(1);
    expect(result.current.orders[0].orderId).toBe(orderId!);
    expect(result.current.orders[0].items).toHaveLength(1);
    expect(result.current.orders[0].status).toBe('confirmed');
  });

  it('masks card number in stored order', () => {
    const { result } = renderHook(() => useOrders(), {
      wrapper: OrdersProvider,
    });

    act(() => {
      result.current.createOrder(
        mockCartItems,
        mockBooks,
        mockShippingInfo,
        mockPaymentInfo,
        4998
      );
    });

    const order = result.current.orders[0];
    expect(order.paymentInfo.cardNumber).toMatch(/^\*\*\*\*/);
    expect(order.paymentInfo.cardNumber).not.toContain('4111111111111111');
  });

  it('gets order by id', () => {
    const { result } = renderHook(() => useOrders(), {
      wrapper: OrdersProvider,
    });

    let orderId: string;
    act(() => {
      const order = result.current.createOrder(
        mockCartItems,
        mockBooks,
        mockShippingInfo,
        mockPaymentInfo,
        4998
      );
      orderId = order.orderId;
    });

    const order = result.current.getOrderById(orderId!);
    expect(order).not.toBeNull();
    expect(order?.orderId).toBe(orderId);
  });

  it('returns null for non-existent order', () => {
    const { result } = renderHook(() => useOrders(), {
      wrapper: OrdersProvider,
    });

    const order = result.current.getOrderById('non-existent');
    expect(order).toBeNull();
  });

  it('returns orders sorted by date (most recent first)', async () => {
    const { result } = renderHook(() => useOrders(), {
      wrapper: OrdersProvider,
    });

    let orderId1: string;
    let orderId2: string;

    act(() => {
      const order1 = result.current.createOrder(
        mockCartItems,
        mockBooks,
        mockShippingInfo,
        mockPaymentInfo,
        4998
      );
      orderId1 = order1.orderId;
    });

    // Wait a bit to ensure different timestamps
    await new Promise(resolve => setTimeout(resolve, 10));

    act(() => {
      const order2 = result.current.createOrder(
        mockCartItems,
        mockBooks,
        mockShippingInfo,
        mockPaymentInfo,
        4998
      );
      orderId2 = order2.orderId;
    });

    const orders = result.current.getOrders();
    expect(orders.length).toBeGreaterThanOrEqual(2);
    // Check that orders are sorted (most recent first)
    const orderIds = orders.map(o => o.orderId);
    expect(orderIds.indexOf(orderId2!)).toBeLessThan(orderIds.indexOf(orderId1!));
  });
});

