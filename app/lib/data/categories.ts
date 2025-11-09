import { Category } from '@/app/lib/types/book';

export const categories: Category[] = [
  {
    id: 'fiction',
    name: 'Fiction',
    description: 'Curated collection of rare and niche fiction',
    slug: 'fiction',
  },
  {
    id: 'poetry',
    name: 'Poetry',
    description: 'Curated collection of rare and niche poetry',
    slug: 'poetry',
  },
  {
    id: 'philosophy',
    name: 'Philosophy',
    description: 'Curated collection of rare and niche philosophy',
    slug: 'philosophy',
  },
];

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryById(id: string): Category | null {
  return categories.find((cat) => cat.id === id) || null;
}

