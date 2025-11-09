'use client';

import { useRouter } from 'next/navigation';
import { getBookById } from '@/app/lib/data/books';
import { BookDetail } from '@/app/components/book/BookDetail';
import { useCart } from '@/app/lib/hooks/useCart';

interface BookDetailPageProps {
  params: { id: string };
}

export default function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = params;
  const router = useRouter();
  const { addItem } = useCart();
  const book = getBookById(id);

  if (!book) {
    return (
      <main className="book-detail-page">
        <h1>Book Not Found</h1>
        <button onClick={() => router.push('/')} className="back-button">
          ← Back to Home
        </button>
      </main>
    );
  }

  const handleAddToCart = (bookId: string, quantity?: number) => {
    addItem(bookId, book.price, quantity || 1);
    router.push('/cart');
  };

  return (
    <main className="book-detail-page">
      <button onClick={() => router.back()} className="back-button">
        ← Back
      </button>
      <BookDetail book={book} onAddToCart={handleAddToCart} />
    </main>
  );
}

