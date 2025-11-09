/**
 * Formats a price in cents to a currency string
 * @param priceInCents - Price in cents (e.g., 2499 for $24.99)
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted price string (e.g., "$24.99")
 */
export function formatPrice(priceInCents: number, currency: string = 'USD'): string {
  const price = priceInCents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
}

/**
 * Formats a date to a readable string
 * @param date - Date object or string
 * @returns Formatted date string (e.g., "January 27, 2025")
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

