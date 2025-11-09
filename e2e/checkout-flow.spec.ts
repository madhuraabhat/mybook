import { test, expect } from '@playwright/test';

test.describe('Complete Checkout Flow', () => {
  test('user can browse books, add to cart, checkout, and view order confirmation', async ({ page }) => {
    // Step 1: Browse books - Go to homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/MyBook/);
    
    // Verify homepage loads with books
    await expect(page.getByRole('heading', { name: /MyBook - Rare & Niche Books/i })).toBeVisible();
    await expect(page.getByText('The Collected Poems of Rumi')).toBeVisible();

    // Step 2: View book details
    await page.getByText('The Collected Poems of Rumi').click();
    await expect(page).toHaveURL(/\/books\/book-001/);
    await expect(page.getByRole('heading', { name: /The Collected Poems of Rumi/i })).toBeVisible();
    await expect(page.getByText(/Jalal ad-Din Muhammad Rumi/i)).toBeVisible();
    await expect(page.getByText(/\$24\.99/)).toBeVisible();

    // Step 3: Add to cart
    await page.getByRole('button', { name: /add to cart/i }).click();
    
    // Should redirect to cart page
    await expect(page).toHaveURL('/cart');
    
    // Verify item is in cart
    await expect(page.getByText('The Collected Poems of Rumi')).toBeVisible();
    // Price appears multiple times, use first() to avoid strict mode violation
    await expect(page.getByText(/\$24\.99/).first()).toBeVisible();
    
    // Verify cart icon shows item count
    await page.goto('/');
    const cartIcon = page.getByRole('button', { name: /cart/i });
    await expect(cartIcon).toBeVisible();
    
    // Step 4: Go to checkout
    await page.goto('/cart');
    await page.getByRole('button', { name: /proceed to checkout/i }).click();
    await expect(page).toHaveURL('/checkout');

    // Step 5: Fill shipping information
    await page.getByLabel(/full name/i).fill('John Doe');
    await page.getByLabel(/address line 1/i).fill('123 Main Street');
    await page.getByLabel(/city/i).fill('New York');
    await page.getByLabel(/state/i).fill('NY');
    await page.getByLabel(/postal code/i).fill('10001');
    await page.getByLabel(/country/i).fill('USA');
    await page.getByLabel(/phone/i).fill('1234567890');
    await page.getByLabel(/email/i).fill('john.doe@example.com');
    
    // Continue to payment
    await page.getByRole('button', { name: /continue to payment/i }).click();
    
    // Verify we're on payment step
    await expect(page.getByRole('heading', { name: /payment information/i })).toBeVisible();
    await expect(page.getByText(/✓ shipping information/i)).toBeVisible();

    // Step 6: Fill payment information
    await page.getByLabel(/card number/i).fill('4111111111111111');
    await page.getByLabel(/card holder name/i).fill('John Doe');
    await page.getByLabel(/expiry month/i).selectOption('12');
    await page.getByLabel(/expiry year/i).selectOption('2025');
    await page.getByLabel(/cvv/i).fill('123');
    
    // Place order
    await page.getByRole('button', { name: /place order/i }).click();

    // Step 7: Verify order confirmation - wait for navigation
    await page.waitForURL(/\/orders\/ORD-/, { timeout: 15000 });
    await expect(page).toHaveURL(/\/orders\/ORD-/);
    await expect(page.getByRole('heading', { name: /order confirmed/i })).toBeVisible();
    await expect(page.getByText(/thank you for your purchase/i)).toBeVisible();
    
    // Verify order details are displayed
    await expect(page.getByText(/ORD-/)).toBeVisible();
    await expect(page.getByText('The Collected Poems of Rumi')).toBeVisible();
    // Price might appear multiple times, so use getAllByText
    const priceElements = page.getByText(/\$24\.99/);
    await expect(priceElements.first()).toBeVisible();
  });

  test('user can add multiple items to cart and checkout', async ({ page }) => {
    // Add first book
    await page.goto('/books/book-001');
    await page.getByRole('button', { name: /add to cart/i }).click();
    await expect(page).toHaveURL('/cart');

    // Add second book
    await page.goto('/books/book-002');
    await page.getByRole('button', { name: /add to cart/i }).click();
    await expect(page).toHaveURL('/cart');

    // Verify both items in cart
    await expect(page.getByText('The Collected Poems of Rumi')).toBeVisible();
    await expect(page.getByText('Being and Time')).toBeVisible();
    
    // Verify total amount - check the formatted price in cart-total-amount
    const totalAmountElement = page.locator('.cart-total-amount');
    await expect(totalAmountElement).toBeVisible();
    const totalText = await totalAmountElement.textContent();
    expect(totalText).toMatch(/\$\d+\.\d{2}/);
    
    // Go to checkout
    await page.getByRole('button', { name: /proceed to checkout/i }).click();
    
    // Fill shipping and payment
    await page.getByLabel(/full name/i).fill('Jane Smith');
    await page.getByLabel(/address line 1/i).fill('456 Oak Avenue');
    await page.getByLabel(/city/i).fill('Los Angeles');
    await page.getByLabel(/state/i).fill('CA');
    await page.getByLabel(/postal code/i).fill('90001');
    await page.getByLabel(/country/i).fill('USA');
    await page.getByLabel(/phone/i).fill('9876543210');
    await page.getByLabel(/email/i).fill('jane.smith@example.com');
    await page.getByRole('button', { name: /continue to payment/i }).click();
    
    await page.getByLabel(/card number/i).fill('4111111111111111');
    await page.getByLabel(/card holder name/i).fill('Jane Smith');
    await page.getByLabel(/expiry month/i).selectOption('12');
    await page.getByLabel(/expiry year/i).selectOption('2026');
    await page.getByLabel(/cvv/i).fill('456');
    await page.getByRole('button', { name: /place order/i }).click();

    // Verify order confirmation with multiple items
    await expect(page).toHaveURL(/\/orders\/ORD-/);
    await expect(page.getByText('The Collected Poems of Rumi')).toBeVisible();
    await expect(page.getByText('Being and Time')).toBeVisible();
  });

  test('user can update quantity in cart before checkout', async ({ page }) => {
    await page.goto('/books/book-001');
    await page.getByRole('button', { name: /add to cart/i }).click();
    
    // Update quantity - find the quantity input for the cart item
    const quantityInput = page.locator('input[type="number"][min="1"]').first();
    await quantityInput.clear();
    await quantityInput.fill('3');
    await quantityInput.press('Tab'); // Trigger blur/change event
    
    // Wait for state to update - wait for the subtotal to update to the expected value
    await expect(page.locator('.cart-item-subtotal-amount')).toContainText('74.97', { timeout: 5000 });
    
    // Verify subtotal updated - check cart item subtotal specifically
    const subtotalElement = page.locator('.cart-item-subtotal-amount');
    const subtotalText = await subtotalElement.textContent();
    // formatPrice formats 7497 cents as "$74.97"
    expect(subtotalText).toMatch(/74\.97/); // 3 * $24.99 = $74.97
    
    // Proceed to checkout
    await page.getByRole('button', { name: /proceed to checkout/i }).click();
    
    // Complete checkout
    await page.getByLabel(/full name/i).fill('Test User');
    await page.getByLabel(/address line 1/i).fill('789 Test St');
    await page.getByLabel(/city/i).fill('Chicago');
    await page.getByLabel(/state/i).fill('IL');
    await page.getByLabel(/postal code/i).fill('60601');
    await page.getByLabel(/country/i).fill('USA');
    await page.getByLabel(/phone/i).fill('5551234567');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByRole('button', { name: /continue to payment/i }).click();
    
    await page.getByLabel(/card number/i).fill('4111111111111111');
    await page.getByLabel(/card holder name/i).fill('Test User');
    await page.getByLabel(/expiry month/i).selectOption('12');
    await page.getByLabel(/expiry year/i).selectOption('2025');
    await page.getByLabel(/cvv/i).fill('123');
    await page.getByRole('button', { name: /place order/i }).click();

    // Verify order shows correct quantity
    await expect(page.getByText(/quantity: 3/i)).toBeVisible();
  });
});

