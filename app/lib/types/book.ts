export type CategoryId = 'fiction' | 'poetry' | 'philosophy';

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: CategoryId;
  price: number;
  imageUrl: string;
  imageUrls?: string[];
  isbn?: string;
  publishedYear?: number;
  pages?: number;
  inStock: boolean;
}

export interface Category {
  id: CategoryId;
  name: string;
  description?: string;
  slug: string;
}

