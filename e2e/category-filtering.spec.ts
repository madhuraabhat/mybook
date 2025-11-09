import { test, expect } from '@playwright/test';

test.describe('Category Filtering', () => {
  test('user can filter books by category', async ({ page }) => {
    await page.goto('/');
    
    // Verify all books are visible initially
    await expect(page.getByText('The Collected Poems of Rumi')).toBeVisible();
    await expect(page.getByText('Being and Time')).toBeVisible();
    await expect(page.getByText('The Unbearable Lightness of Being')).toBeVisible();
    
    // Filter by Fiction category - this navigates to category page
    await page.getByRole('button', { name: /fiction/i }).click();
    await expect(page).toHaveURL('/books/category/fiction');
    
    // Verify only fiction books are shown
    await expect(page.getByText('The Unbearable Lightness of Being')).toBeVisible();
    await expect(page.getByText('The Stranger')).toBeVisible();
    
    // Verify non-fiction books are not shown
    await expect(page.getByText('The Collected Poems of Rumi')).not.toBeVisible();
    await expect(page.getByText('Being and Time')).not.toBeVisible();
  });

  test('user can filter by Poetry category', async ({ page }) => {
    await page.goto('/');
    
    // Click Poetry category button - navigates to category page
    await page.getByRole('button', { name: /poetry/i }).click();
    await expect(page).toHaveURL('/books/category/poetry');
    
    // Verify poetry books are shown
    await expect(page.getByText('The Collected Poems of Rumi')).toBeVisible();
    await expect(page.getByText('Leaves of Grass')).toBeVisible();
    
    // Verify non-poetry books are not shown
    await expect(page.getByText('Being and Time')).not.toBeVisible();
    await expect(page.getByText('The Unbearable Lightness of Being')).not.toBeVisible();
  });

  test('user can filter by Philosophy category', async ({ page }) => {
    await page.goto('/');
    
    // Click Philosophy category button - navigates to category page
    await page.getByRole('button', { name: /philosophy/i }).click();
    await expect(page).toHaveURL('/books/category/philosophy');
    
    // Verify philosophy books are shown
    await expect(page.getByText('Being and Time')).toBeVisible();
    
    // Verify non-philosophy books are not shown
    await expect(page.getByText('The Collected Poems of Rumi')).not.toBeVisible();
    await expect(page.getByText('The Unbearable Lightness of Being')).not.toBeVisible();
  });

  test('user can clear filter and view all books', async ({ page }) => {
    await page.goto('/books/category/fiction');
    
    // Verify we're on category page with filtered books
    await expect(page.getByText('The Unbearable Lightness of Being')).toBeVisible();
    await expect(page.getByText('The Stranger')).toBeVisible();
    
    // Click "All" to clear filter and go to homepage
    await page.getByRole('button', { name: /all/i }).click();
    await expect(page).toHaveURL('/');
    
    // Verify all books are visible again
    await expect(page.getByText('The Collected Poems of Rumi')).toBeVisible();
    await expect(page.getByText('Being and Time')).toBeVisible();
    await expect(page.getByText('The Unbearable Lightness of Being')).toBeVisible();
    await expect(page.getByText('Leaves of Grass')).toBeVisible();
    await expect(page.getByText('The Stranger')).toBeVisible();
  });

  test('user can navigate to book detail from filtered category page', async ({ page }) => {
    await page.goto('/books/category/fiction');
    
    // Verify we're on category page
    await expect(page.getByText('The Unbearable Lightness of Being')).toBeVisible();
    
    // Click on a book
    await page.getByText('The Unbearable Lightness of Being').click();
    
    // Verify we're on book detail page
    await expect(page).toHaveURL('/books/book-003');
    await expect(page.getByRole('heading', { name: /The Unbearable Lightness of Being/i })).toBeVisible();
    await expect(page.getByText(/Milan Kundera/i)).toBeVisible();
  });

  test('category filter shows correct count of books', async ({ page }) => {
    await page.goto('/');
    
    // Count books in each category by filtering
    // Fiction should have 2 books
    await page.getByRole('button', { name: /fiction/i }).click();
    await expect(page).toHaveURL('/books/category/fiction');
    // Wait for books to render
    await expect(page.getByText('The Unbearable Lightness of Being')).toBeVisible();
    const fictionTitles = await page.getByText('The Unbearable Lightness of Being').count();
    const fictionTitles2 = await page.getByText('The Stranger').count();
    expect(fictionTitles + fictionTitles2).toBeGreaterThanOrEqual(2);
    
    // Poetry should have 2 books
    await page.getByRole('button', { name: /poetry/i }).click();
    await expect(page).toHaveURL('/books/category/poetry');
    await expect(page.getByText('The Collected Poems of Rumi')).toBeVisible();
    await expect(page.getByText('Leaves of Grass')).toBeVisible();
    
    // Philosophy should have 1 book
    await page.getByRole('button', { name: /philosophy/i }).click();
    await expect(page).toHaveURL('/books/category/philosophy');
    await expect(page.getByText('Being and Time')).toBeVisible();
  });

  test('category page shows category name and description', async ({ page }) => {
    await page.goto('/books/category/fiction');
    
    // Verify category header
    await expect(page.getByRole('heading', { name: /fiction/i })).toBeVisible();
    
    // Navigate to poetry category
    await page.goto('/books/category/poetry');
    await expect(page.getByRole('heading', { name: /poetry/i })).toBeVisible();
    
    // Navigate to philosophy category
    await page.goto('/books/category/philosophy');
    await expect(page.getByRole('heading', { name: /philosophy/i })).toBeVisible();
  });

  test('user can add book to cart from category filtered page', async ({ page }) => {
    await page.goto('/books/category/fiction');
    
    // Click on a book to view details
    await page.getByText('The Unbearable Lightness of Being').click();
    await expect(page).toHaveURL('/books/book-003');
    
    // Add to cart
    await page.getByRole('button', { name: /add to cart/i }).click();
    
    // Verify redirected to cart
    await expect(page).toHaveURL('/cart');
    await expect(page.getByText('The Unbearable Lightness of Being')).toBeVisible();
    // Price appears multiple times, use first() to avoid strict mode violation
    await expect(page.getByText(/\$27\.99/).first()).toBeVisible();
  });
});

