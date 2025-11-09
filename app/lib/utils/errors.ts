/**
 * Generic error message for user-facing errors
 * Prevents information leakage per security requirements
 */
export const GENERIC_ERROR_MESSAGE = 'An error occurred. Please try again.';

/**
 * Creates a user-friendly error message
 * Never exposes internal details (stack traces, file paths, etc.)
 * @param error - Error object or message
 * @returns User-friendly error message
 */
export function getUserFriendlyError(error: unknown): string {
  // In production, never expose internal error details
  if (process.env.NODE_ENV === 'development') {
    // In development, we can show more details for debugging
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
  
  // In production, always return generic message
  return GENERIC_ERROR_MESSAGE;
}

/**
 * Logs error details (for server-side logging only)
 * @param error - Error object
 * @param context - Additional context information
 */
export function logError(error: unknown, context?: Record<string, unknown>): void {
  // In a real app, this would send to a logging service
  // For now, just console.error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error, context);
  }
}

