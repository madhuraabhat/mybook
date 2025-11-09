/**
 * Validates email format
 * @param email - Email address to validate
 * @returns true if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates phone number format (basic validation)
 * @param phone - Phone number to validate
 * @returns true if valid, false otherwise
 */
export function isValidPhone(phone: string): boolean {
  // Remove common formatting characters
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Check if it's 10-15 digits
  return /^\d{10,15}$/.test(cleaned);
}

/**
 * Validates credit card number using Luhn algorithm
 * @param cardNumber - Credit card number (digits only)
 * @returns true if valid, false otherwise
 */
export function isValidCardNumber(cardNumber: string): boolean {
  // Remove spaces and dashes
  const cleaned = cardNumber.replace(/[\s\-]/g, '');
  
  // Check if it's all digits and has valid length (13-19 digits)
  if (!/^\d{13,19}$/.test(cleaned)) {
    return false;
  }
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  // Process from right to left
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

/**
 * Validates card expiry date
 * @param month - Expiry month (1-12)
 * @param year - Expiry year (4 digits)
 * @returns true if valid and not expired, false otherwise
 */
export function isValidExpiryDate(month: number, year: number): boolean {
  if (month < 1 || month > 12) {
    return false;
  }
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  
  // Check if year is in the past
  if (year < currentYear) {
    return false;
  }
  
  // Check if month is in the past for current year
  if (year === currentYear && month < currentMonth) {
    return false;
  }
  
  return true;
}

/**
 * Validates CVV code
 * @param cvv - CVV code (3-4 digits)
 * @returns true if valid, false otherwise
 */
export function isValidCVV(cvv: string): boolean {
  return /^\d{3,4}$/.test(cvv);
}

/**
 * Validates postal code (basic validation for US format)
 * @param postalCode - Postal code to validate
 * @returns true if valid, false otherwise
 */
export function isValidPostalCode(postalCode: string): boolean {
  // Basic validation: 5 digits or 5+4 format
  return /^\d{5}(-\d{4})?$/.test(postalCode);
}

