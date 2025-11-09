'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/app/lib/hooks/useCart';
import { getAllBooks } from '@/app/lib/data/books';
import { CartItem } from '@/app/components/cart/CartItem';
import { CartSummary } from '@/app/components/cart/CartSummary';
import { Button } from '@/app/components/ui/Button';

export default function CartPage() {
  const router = useRouter();
  const { items, totalAmount, updateQuantity, removeItem, getItemCount } = useCart();
  const allBooks = getAllBooks();

  // Get book details for each cart item
  const cartItemsWithBooks = items.map((item) => {
    const book = allBooks.find((b) => b.id === item.bookId);
    return { item, book };
  }).filter((entry) => entry.book !== undefined);

  const handleCheckout = () => {
    if (items.length === 0) {
      return;
    }
    router.push('/checkout');
  };

  const handleContinueShopping = () => {
    router.push('/');
  };

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-page-header">
          <h1>Shopping Cart</h1>
        </div>
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Add some books to your cart to get started!</p>
          <Button variant="primary" onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-page-header">
        <h1>Shopping Cart</h1>
      </div>

      <div className="cart-items">
        {cartItemsWithBooks.map(({ item, book }) => (
          <CartItem
            key={item.bookId}
            item={item}
            book={book!}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>

      <CartSummary
        totalAmount={totalAmount}
        itemCount={getItemCount()}
        onCheckout={handleCheckout}
        disabled={items.length === 0}
      />
    </main>
  );
}

