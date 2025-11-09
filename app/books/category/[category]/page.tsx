'use client';

import { useRouter } from 'next/navigation';
import { getBooksByCategory } from '@/app/lib/data/books';
import { getCategories, getCategoryById } from '@/app/lib/data/categories';
import { BookList } from '@/app/components/book/BookList';
import { CategoryFilter } from '@/app/components/book/CategoryFilter';
import { CategoryId } from '@/app/lib/types/book';

interface CategoryPageProps {
  params: { category: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const router = useRouter();
  
  const categoryData = getCategoryById(category as CategoryId);
  if (!categoryData) {
    return (
      <main className="category-page">
        <h1>Category Not Found</h1>
        <button onClick={() => router.push('/')} className="back-button">
          ← Back to Home
        </button>
      </main>
    );
  }

  const categories = getCategories();
  const books = getBooksByCategory(category);

  const handleViewDetails = (bookId: string) => {
    router.push(`/books/${bookId}`);
  };

  const handleCategoryChange = (categoryId: CategoryId | null) => {
    if (categoryId) {
      router.push(`/books/category/${categoryId}`);
    } else {
      router.push('/');
    }
  };

  return (
    <main className="category-page">
      <div className="category-page-header">
        <h1>{categoryData.name}</h1>
        {categoryData.description && <p>{categoryData.description}</p>}
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={category as CategoryId}
        onCategoryChange={handleCategoryChange}
        showAll
      />

      <BookList
        books={books}
        onViewDetails={handleViewDetails}
      />
    </main>
  );
}

