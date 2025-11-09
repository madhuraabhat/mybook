'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllBooks, getBooksByCategory } from '@/app/lib/data/books';
import { getCategories } from '@/app/lib/data/categories';
import { BookList } from '@/app/components/book/BookList';
import { CategoryFilter } from '@/app/components/book/CategoryFilter';
import { CartIcon } from '@/app/components/cart/CartIcon';
import { useCart } from '@/app/lib/hooks/useCart';
import { CategoryId } from '@/app/lib/types/book';

export default function Home() {
  const router = useRouter();
  const { getItemCount } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  
  const categories = getCategories();
  const allBooks = getAllBooks();
  const displayedBooks = selectedCategory
    ? getBooksByCategory(selectedCategory)
    : allBooks;

  const handleViewDetails = (bookId: string) => {
    router.push(`/books/${bookId}`);
  };

  const handleCategoryChange = (categoryId: CategoryId | null) => {
    if (categoryId) {
      // Navigate to category page
      router.push(`/books/category/${categoryId}`);
    } else {
      // Show all books on homepage
      setSelectedCategory(null);
    }
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  return (
    <main className="homepage">
      <div className="homepage-header">
        <div className="homepage-header-top">
          <h1>MyBook - Rare & Niche Books</h1>
          <CartIcon itemCount={getItemCount()} onClick={handleCartClick} />
        </div>
        <p>Curated collection of rare and niche books not available on mainstream platforms</p>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        showAll
      />

      <BookList
        books={displayedBooks}
        onViewDetails={handleViewDetails}
      />
    </main>
  );
}
