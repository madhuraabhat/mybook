# Quickstart Guide: Book E-commerce Platform

**Feature**: Book E-commerce Platform  
**Date**: 2025-01-27  
**Phase**: 1 - Design

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git
- Code editor (VS Code recommended)
- Modern web browser

## Initial Setup

### 1. Initialize Next.js Project

```bash
# Create Next.js app with TypeScript and App Router
npx create-next-app@latest mybook --typescript --tailwind --app --no-src-dir --import-alias "@/*"

# Navigate to project
cd mybook

# Install additional dependencies
npm install @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
npm install -D @types/jest
npm install -D playwright @playwright/test
```

### 2. Project Structure Setup

Create the following directory structure:

```bash
mkdir -p app/components/{ui,book,cart,checkout,orders}
mkdir -p app/lib/{data,hooks,types,utils}
mkdir -p app/styles/components
mkdir -p __tests__/{components,app,lib}
```

### 3. Configuration Files

**jest.config.js**:
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

**jest.setup.js**:
```javascript
import '@testing-library/jest-dom'
```

**playwright.config.ts**:
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 4. TypeScript Configuration

Ensure `tsconfig.json` has strict mode enabled:

```json
{
  "compilerOptions": {
    "strict": true,
    // ... other Next.js defaults
  }
}
```

## Development Workflow

### TDD Process

1. **Write Test First** (Red):
   ```bash
   # Create test file
   touch __tests__/components/book/BookCard.test.tsx
   
   # Write failing test
   # Run test to verify it fails
   npm test
   ```

2. **Implement Minimum Code** (Green):
   ```bash
   # Create component
   touch app/components/book/BookCard.tsx
   
   # Implement just enough to pass test
   # Run test to verify it passes
   npm test
   ```

3. **Refactor** (Refactor):
   ```bash
   # Improve code while keeping tests green
   # Run tests continuously
   npm test -- --watch
   ```

### Running Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### Running Tests

**Unit/Component Tests**:
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

**E2E Tests**:
```bash
# Run Playwright tests
npx playwright test

# Run with UI
npx playwright test --ui

# Run specific test
npx playwright test e2e/checkout.spec.ts
```

### Building for Production

```bash
npm run build
npm start
```

## Mock Data Setup

### 1. Create Book Data

Create `app/lib/data/books.ts` with 3-5 books:

```typescript
import { Book, Category } from '../types/book';

export const categories: Category[] = [
  { id: 'fiction', name: 'Fiction', slug: 'fiction' },
  { id: 'poetry', name: 'Poetry', slug: 'poetry' },
  { id: 'philosophy', name: 'Philosophy', slug: 'philosophy' },
];

export const books: Book[] = [
  {
    id: 'book-001',
    title: 'Example Book Title',
    author: 'Author Name',
    description: 'Book description...',
    category: 'fiction',
    price: 2499, // $24.99
    imageUrl: '/images/book-001.jpg',
    inStock: true,
  },
  // Add 2-4 more books
];

export function getAllBooks(): Book[] {
  return books;
}

export function getBookById(id: string): Book | null {
  return books.find(book => book.id === id) || null;
}

export function getBooksByCategory(category: string): Book[] {
  return books.filter(book => book.category === category);
}

export function getCategories(): Category[] {
  return categories;
}
```

### 2. Create Type Definitions

Create `app/lib/types/book.ts`:

```typescript
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
  inStock: boolean;
}

export interface Category {
  id: CategoryId;
  name: string;
  description?: string;
  slug: string;
}
```

## Component Development Order

### Phase 1: Foundation (Setup)
1. UI Components (Button, Card, Input, etc.)
2. Layout components (Navigation, Footer)
3. Design system tokens (CSS variables)

### Phase 2: User Story 1 (Browse & View)
1. BookCard component
2. BookList component
3. BookDetail component
4. CategoryFilter component
5. Homepage and book detail pages

### Phase 3: User Story 2 (Cart & Checkout)
1. Cart context and hooks
2. CartItem component
3. CartSummary component
4. ShippingForm component
5. PaymentForm component
6. Checkout page

### Phase 4: User Story 3 (Order Tracking)
1. Orders context and hooks
2. OrderCard component
3. OrderDetail component
4. Order history and detail pages

## Testing Checklist

### Component Tests
- [ ] All UI components have tests
- [ ] All domain components have tests
- [ ] Tests cover props, rendering, and interactions
- [ ] Tests use React Testing Library best practices

### Integration Tests
- [ ] Browse → View Book flow
- [ ] Add to Cart flow
- [ ] Checkout flow
- [ ] Order tracking flow

### E2E Tests
- [ ] Complete purchase journey
- [ ] Cart persistence
- [ ] Order creation and viewing

## Design System Setup

### CSS Variables (Design Tokens)

Add to `app/styles/globals.css`:

```css
:root {
  /* Colors - Boutique palette */
  --color-primary: #2c3e50;
  --color-secondary: #8b7355;
  --color-accent: #d4af37;
  --color-background: #faf9f7;
  --color-text: #1a1a1a;
  --color-text-light: #666;
  
  /* Typography */
  --font-serif: 'Georgia', 'Times New Roman', serif;
  --font-sans: 'Inter', -apple-system, sans-serif;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Borders */
  --border-radius: 4px;
  --border-width: 1px;
}
```

## Security Configuration

### Content Security Policy (CSP)

Add to `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### Input Sanitization

Install DOMPurify for HTML sanitization (if needed):

```bash
npm install dompurify
npm install -D @types/dompurify
```

### Dependency Security

```bash
# Check for vulnerabilities
npm audit

# Fix automatically fixable issues
npm audit fix

# Set up Dependabot (GitHub) or Snyk for automated scanning
```

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing
npm test             # Run unit/component tests
npm test -- --watch  # Watch mode
npx playwright test  # Run E2E tests

# Security
npm audit            # Check for vulnerabilities
npm audit fix        # Fix vulnerabilities

# Code Quality
npm run lint         # Lint code
npm run type-check   # TypeScript type checking
```

## Next Steps

1. Set up project structure
2. Create mock data (3-5 books)
3. Implement UI components with tests
4. Implement User Story 1 (Browse & View)
5. Implement User Story 2 (Cart & Checkout)
6. Implement User Story 3 (Order Tracking)
7. Polish and optimize

## Troubleshooting

### Tests not running
- Ensure `jest.config.js` is in root
- Check `jest.setup.js` exists
- Verify `@testing-library/jest-dom` is installed

### TypeScript errors
- Ensure `tsconfig.json` has correct paths
- Check import aliases match `@/*` pattern
- Verify all type definitions are created

### Build errors
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check for missing type definitions

## Security Best Practices

### During Development

1. **Input Validation**: Always validate and sanitize user inputs
2. **Error Handling**: Never expose stack traces or internal details
3. **Sensitive Data**: Never log or store payment information
4. **XSS Prevention**: Use React's built-in escaping, avoid `dangerouslySetInnerHTML`
5. **Dependency Updates**: Regularly run `npm audit` and update dependencies

### Security Checklist

Refer to `security-checklist.md` for comprehensive security validation.

## Validation

After setup, verify:

1. ✅ Dev server starts: `npm run dev`
2. ✅ Tests run: `npm test`
3. ✅ TypeScript compiles: `npm run build`
4. ✅ E2E tests run: `npx playwright test`
5. ✅ Security audit: `npm audit` (no critical vulnerabilities)

Once all checks pass, you're ready to start implementing features following TDD principles and security best practices!

