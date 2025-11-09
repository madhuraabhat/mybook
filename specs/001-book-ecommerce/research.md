# Research: Book E-commerce Platform

**Feature**: Book E-commerce Platform  
**Date**: 2025-01-27  
**Phase**: 0 - Research

## Technology Stack Analysis

### Next.js App Router
- **Rationale**: Constitution mandates Next.js with App Router for server-side rendering and optimal performance
- **Key Features**: Server Components, Server Actions, built-in routing, image optimization
- **Benefits**: Meets Core Web Vitals requirements, supports code splitting, TypeScript-first

### State Management Approach
- **Selected**: React Context API + localStorage/sessionStorage
- **Rationale**: Lightweight solution sufficient for prototype scope. No need for Zustand/Redux for 3-5 books and client-side only state
- **Cart Persistence**: localStorage for cart across sessions (FR-015)
- **Order Storage**: sessionStorage for order history (prototype scope)

### Testing Strategy
- **Unit/Component Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright (for critical user flows: browse → cart → checkout)
- **TDD Compliance**: All components and features must have tests written first

### Mock Data Strategy
- **Location**: `lib/data/books.ts` - static TypeScript array
- **Content**: 3-5 books across categories (fiction, poetry, philosophy)
- **Images**: Use placeholder images or public domain book covers
- **No Backend**: All data client-side, no API calls required

### Design System Approach
- **Styling**: CSS Modules (aligned with Next.js best practices)
- **Design Tokens**: Centralized in `styles/globals.css`
- **Boutique Aesthetic**: 
  - Elegant typography (serif for headings, sans-serif for body)
  - Muted color palette (warm neutrals, deep blues)
  - Generous whitespace
  - Subtle shadows and borders

## Component Architecture Decisions

### Reusable UI Components
- Button, Card, Input, Image, Badge - foundational components
- All components must be independently testable
- Props interfaces clearly defined with TypeScript

### Domain Components
- Book components: BookCard, BookDetail, BookList, CategoryFilter
- Cart components: CartItem, CartSummary, CartIcon
- Checkout components: ShippingForm, PaymentForm, OrderSummary
- Order components: OrderCard, OrderDetail, OrderStatus

### Routing Structure
- `/` - Homepage with category browsing
- `/books/[id]` - Book detail page
- `/books/category/[category]` - Category filtered view
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/orders` - Order history
- `/orders/[orderId]` - Order detail

## Performance Considerations

### Image Optimization
- Use Next.js `Image` component for all book images
- Lazy loading for catalog images
- Responsive image sizes (mobile, tablet, desktop)

### Code Splitting
- Route-based code splitting (automatic with App Router)
- Dynamic imports for heavy components if needed
- Lazy load checkout/order pages

### Core Web Vitals Targets
- LCP < 2.5s: Optimize images, server-side render homepage
- FID < 100ms: Minimize JavaScript, use Server Components
- CLS < 0.1: Reserve space for images, avoid layout shifts

## Security & Privacy Best Practices

### Input Validation & Sanitization
- **All user inputs MUST be validated**: Form fields, URL parameters, route params
- **Sanitization**: Use DOMPurify or similar for any user-generated content displayed in HTML
- **Type validation**: TypeScript strict mode + runtime validation for all inputs
- **Length limits**: Enforce maximum lengths on all text inputs to prevent DoS
- **Format validation**: Email, phone, postal code formats validated with regex
- **Card validation**: Luhn algorithm for card numbers, expiry date validation

### XSS (Cross-Site Scripting) Prevention
- **React's built-in escaping**: React automatically escapes content in JSX
- **Dangerous HTML**: Never use `dangerouslySetInnerHTML` without sanitization
- **Content Security Policy (CSP)**: Configure CSP headers in `next.config.js`
  ```javascript
  headers: [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
        }
      ]
    }
  ]
  ```
- **URL validation**: Validate and sanitize all URLs (book IDs, category slugs)
- **No eval()**: Never use eval() or Function() constructor

### CSRF (Cross-Site Request Forgery) Protection
- **For prototype**: Not critical (no server-side state changes)
- **For production**: Implement CSRF tokens for all state-changing operations
- **SameSite cookies**: Use SameSite=Strict for any cookies
- **Origin validation**: Validate request origin when server-side is added

### Sensitive Data Handling
- **Payment data**: 
  - Never log card numbers, CVV, or full card numbers
  - Mask card numbers in display (show only last 4 digits)
  - Never store full payment info in localStorage/sessionStorage
  - In prototype: Clear payment form after mock processing
- **Personal data**:
  - Shipping addresses stored temporarily in sessionStorage only
  - Clear sensitive data from memory after use
  - No sensitive data in URL parameters
- **Error messages**:
  - Never expose stack traces, database errors, or internal paths
  - Use generic error messages for users
  - Log detailed errors server-side only (when backend added)

### Data Storage Security
- **localStorage**: Only non-sensitive cart data (book IDs, quantities)
- **sessionStorage**: Temporary order data (cleared on browser close)
- **No encryption needed for prototype**: Mock data only
- **For production**: Encrypt sensitive data before storage
- **Data minimization**: Store only necessary data

### HTTPS/TLS Encryption
- **Development**: HTTP acceptable for local development
- **Production**: MUST use HTTPS only
- **HSTS**: Enable HTTP Strict Transport Security headers
- **Certificate validation**: Ensure valid SSL certificates

### Dependency Security
- **Regular audits**: Run `npm audit` regularly
- **Automated scanning**: Use Dependabot or Snyk for vulnerability alerts
- **Update strategy**: Keep dependencies updated, especially security patches
- **Lock file**: Commit `package-lock.json` to ensure consistent versions

### Error Handling Security
- **Generic error messages**: "An error occurred. Please try again."
- **No stack traces**: Never show stack traces to users
- **No internal details**: Don't expose file paths, database names, API keys
- **Logging**: Log detailed errors server-side only (when backend added)
- **Error boundaries**: Use React Error Boundaries to catch and handle errors gracefully

### Rate Limiting & Abuse Prevention
- **For prototype**: Not critical (client-side only)
- **For production**: Implement rate limiting on all endpoints
- **Input size limits**: Limit file upload sizes, form data sizes
- **Request throttling**: Prevent rapid-fire requests

### Privacy Compliance
- **Data minimization**: Collect only necessary data
- **Transparency**: Clear privacy policy (even for prototype)
- **User consent**: If collecting personal data, obtain consent
- **Data retention**: Clear old data regularly
- **GDPR/CCPA**: For production, ensure compliance with applicable regulations
- **Cookie consent**: If using cookies, implement consent mechanism

### Payment Processing (Prototype)
- Mock payment validation (no real payment gateway)
- Validate card format (Luhn algorithm for card numbers)
- Collect payment info but don't process real transactions
- Clear indication this is a prototype/demo
- Mask card numbers in all displays
- Clear payment form data after mock processing

### Form Validation Security
- **Client-side validation**: For UX (immediate feedback)
- **Server-side validation**: Required when backend added (never trust client)
- **Sanitization**: Sanitize all inputs before processing
- **SQL injection prevention**: Use parameterized queries when database added
- **No command injection**: Never execute user input as commands

### Authentication & Authorization (Future)
- **For prototype**: Not required (no user accounts)
- **For production**: 
  - Secure password hashing (bcrypt, Argon2)
  - Session management with secure tokens
  - Role-based access control
  - Multi-factor authentication for sensitive operations

### Security Testing
- **Unit tests**: Test validation functions, sanitization
- **Integration tests**: Test form submission, error handling
- **E2E tests**: Test complete flows for security issues
- **Manual testing**: Test XSS attempts, injection attempts
- **Security audit**: Regular security reviews

## Accessibility Requirements

### WCAG 2.1 AA Compliance
- Keyboard navigation for all interactive elements
- Screen reader support (ARIA labels, semantic HTML)
- Color contrast ratios meet AA standards
- Focus indicators visible
- Form labels properly associated

## Development Workflow

### TDD Process
1. Write failing test for component/feature
2. Verify test fails (Red)
3. Implement minimal code to pass (Green)
4. Refactor while keeping tests green
5. Commit with descriptive message

### Component Development Order
1. UI components first (Button, Card, etc.)
2. Domain components (BookCard, etc.)
3. Page components (app routes)
4. Integration tests for user flows

## Open Questions Resolved

- **Q**: Should we use a state management library?  
  **A**: No, React Context API sufficient for prototype scope

- **Q**: How to handle cart persistence?  
  **A**: localStorage for cart, sessionStorage for orders

- **Q**: Payment processing approach?  
  **A**: Mock validation only, no real payment gateway

- **Q**: Image sources?  
  **A**: Placeholder images or public domain book covers

- **Q**: Testing strategy for E2E?  
  **A**: Playwright for critical flows (browse → cart → checkout)

## References

- Next.js App Router Documentation
- React Testing Library Best Practices
- WCAG 2.1 Guidelines
- E-commerce UX Patterns
- Core Web Vitals Metrics

