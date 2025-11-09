'use client';

import React from 'react';
import { Category, CategoryId } from '@/app/lib/types/book';
import { Button } from '@/app/components/ui/Button';

export interface CategoryFilterProps {
  categories: Category[];
  selectedCategory?: CategoryId | null;
  onCategoryChange?: (categoryId: CategoryId | null) => void;
  showAll?: boolean;
  className?: string;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  showAll = false,
  className = '',
}: CategoryFilterProps) {
  const handleCategoryClick = (categoryId: CategoryId | null) => {
    onCategoryChange?.(categoryId);
  };

  return (
    <div className={`category-filter ${className}`.trim()}>
      {showAll && (
        <Button
          variant={selectedCategory === null ? 'primary' : 'outline'}
          size="medium"
          onClick={() => handleCategoryClick(null)}
          className={selectedCategory === null ? 'category-active' : ''}
        >
          All
        </Button>
      )}
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'primary' : 'outline'}
          size="medium"
          onClick={() => handleCategoryClick(category.id)}
          className={selectedCategory === category.id ? 'category-active' : ''}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}

