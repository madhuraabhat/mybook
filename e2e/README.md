# End-to-End (E2E) Tests

This directory contains Playwright E2E tests that verify critical user flows in the application.

## Test Files

- **`checkout-flow.spec.ts`** - Tests the complete checkout flow:
  - Browse books → Add to cart → Checkout → Order confirmation
  - Multiple items checkout
  - Quantity updates before checkout

- **`order-history.spec.ts`** - Tests order history functionality:
  - Viewing order history after placing orders
  - Viewing order details
  - Navigation between order history and details

- **`category-filtering.spec.ts`** - Tests category filtering:
  - Filtering by Fiction, Poetry, Philosophy
  - Clearing filters
  - Navigation from filtered pages

- **`cart-management.spec.ts`** - Tests cart functionality:
  - Cart icon with item count
  - Removing items
  - Updating quantities
  - Cart persistence

## Running Tests

### Run all E2E tests
```bash
npm run test:e2e
```

### Run specific test file
```bash
npx playwright test checkout-flow
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Run tests with UI mode
```bash
npx playwright test --ui
```

### Run tests on specific browser
```bash
npx playwright test --project=chromium
```

## Test Coverage

The E2E tests cover:
- ✅ Complete checkout flow (browse → cart → checkout → confirmation)
- ✅ Order history viewing and navigation
- ✅ Category filtering and navigation
- ✅ Cart management (add, remove, update quantity)
- ✅ Cross-page navigation
- ✅ Form validation and submission

## Notes

- Tests use `sessionStorage` for order persistence (orders are cleared when browser closes)
- Tests use `localStorage` for cart persistence
- The dev server is automatically started by Playwright (configured in `playwright.config.ts`)
- Tests run in a real Chromium browser for accurate simulation

## Troubleshooting

If tests fail:
1. Ensure the dev server can start on `http://localhost:3000`
2. Check that all required dependencies are installed: `npm install`
3. Verify Playwright browsers are installed: `npx playwright install`
4. Run tests with `--headed` flag to see what's happening
5. Check test output for specific error messages

