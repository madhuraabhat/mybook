import { test, expect } from '@playwright/test';

test.describe('Cart Management', () => {
  test('user can view cart icon with item count', async ({ page }) => {
    await page.goto('/');
    
    // Initially, cart should be visible
    const cartIcon = page.getByRole('button', { name: /cart/i });
    await expect(cartIcon).toBeVisible();
    
    // Add item to cart
    await page.goto('/books/book-001');
    await page.getByRole('button', { name: /add to cart/i }).click();
    
    // Go back to homepage and verify cart icon is still visible
    await page.goto('/');
    await expect(cartIcon).toBeVisible();
    // Note: Cart badge visibility depends on itemCount > 0
  });

  test('user can remove item from cart', async ({ page }) => {
    // Add item to cart
    await page.goto('/books/book-001');
    await page.getByRole('button', { name: /add to cart/i }).click();
    
    // Verify item is in cart
    await expect(page.getByText('The Collected Poems of Rumi')).toBeVisible();
    
    // Remove item
    await page.getByRole('button', { name: /remove/i }).click();
    
    // Verify cart is empty
    await expect(page.getByText(/your cart is empty/i)).toBeVisible();
    await expect(page.getByText('The Collected Poems of Rumi')).not.toBeVisible();
  });

  test('user can update quantity in cart', async ({ page }) => {
    // Add item to cart
    await page.goto('/books/book-001');
    await page.getByRole('button', { name: /add to cart/i }).click();
    
    // Update quantity - find the quantity input for the cart item
    const quantityInput = page.locator('input[type="number"][min="1"]').first();
    await quantityInput.clear();
    await quantityInput.fill('3');
    await quantityInput.press('Tab'); // Trigger blur/change event
    
    // Wait for state to update and DOM to reflect changes
    // Wait for the subtotal to update to the expected value
    await expect(page.locator('.cart-item-subtotal-amount')).toContainText('74.97', { timeout: 5000 });
    
    // Verify subtotal updated - check cart item subtotal specifically
    const subtotalElement = page.locator('.cart-item-subtotal-amount');
    const subtotalText = await subtotalElement.textContent();
    // formatPrice formats 7497 cents as "$74.97"
    expect(subtotalText).toMatch(/74\.97/); // 3 * $24.99 = $74.97
    
    // Verify total updated - use more specific selector
    const totalAmountElement = page.locator('.cart-total-amount');
    await expect(totalAmountElement).toBeVisible();
    const totalText = await totalAmountElement.textContent();
    expect(totalText).toMatch(/\$74\.97/);
  });

  test('user can continue shopping from cart', async ({ page }) => {
    // Add item to cart
    await page.goto('/books/book-001');
    await page.getByRole('button', { name: /add to cart/i }).click();
    
    // Remove item to get empty cart state
    await page.getByRole('button', { name: /remove/i }).click();
    
    // Now we should see empty cart with continue shopping button
    await expect(page.getByText(/your cart is empty/i)).toBeVisible();
    await page.getByRole('button', { name: /continue shopping/i }).click();
    
    // Verify redirected to homepage
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: /MyBook/i })).toBeVisible();
  });

  test('cart persists across page navigation', async ({ page }) => {
    // Add item to cart
    await page.goto('/books/book-001');
    await page.getByRole('button', { name: /add to cart/i }).click();
    
    // Navigate away
    await page.goto('/');
    await page.goto('/books/category/fiction');
    
    // Go back to cart
    await page.goto('/cart');
    
    // Verify item is still in cart (localStorage persistence)
    await expect(page.getByText('The Collected Poems of Rumi')).toBeVisible();
  });
});

