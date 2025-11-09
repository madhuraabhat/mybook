# Tasks: Book E-commerce Platform

**Input**: Design documents from `/specs/001-book-ecommerce/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are MANDATORY per Constitution Principle I (Test-Driven Development). All features, components, and business logic MUST have corresponding tests written before implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Next.js App Router**: `app/` for routes, `components/` for React components, `lib/` for utilities
- Paths follow Next.js App Router structure from plan.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create Next.js project structure per implementation plan
- [ ] T002 Initialize Next.js project with TypeScript and App Router
- [ ] T003 [P] Configure Jest and React Testing Library in `jest.config.js` and `jest.setup.js`
- [ ] T004 [P] Configure Playwright for E2E tests in `playwright.config.ts`
- [ ] T005 [P] Configure ESLint and Prettier for code quality
- [ ] T006 [P] Setup security headers in `next.config.js` (CSP, X-Frame-Options, etc.)
- [ ] T007 [P] Create directory structure: `app/components/`, `app/lib/`, `__tests__/`
- [ ] T008 [P] Setup design tokens in `app/styles/globals.css` (colors, typography, spacing)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Type Definitions

- [ ] T009 [P] Create TypeScript types for Book and Category in `app/lib/types/book.ts`
- [ ] T010 [P] Create TypeScript types for Cart and CartItem in `app/lib/types/cart.ts`
- [ ] T011 [P] Create TypeScript types for Order, OrderItem, ShippingInfo, PaymentInfo in `app/lib/types/order.ts`

### Mock Data

- [ ] T012 [P] Create mock book catalog data (3-5 books) in `app/lib/data/books.ts`
- [ ] T013 [P] Create category definitions in `app/lib/data/categories.ts`
- [ ] T014 [P] Create data access functions (getAllBooks, getBookById, getBooksByCategory) in `app/lib/data/books.ts`

### Utility Functions

- [ ] T015 [P] Create price formatting utility in `app/lib/utils/format.ts`
- [ ] T016 [P] Create validation utilities (email, phone, card number Luhn) in `app/lib/utils/validation.ts`
- [ ] T017 [P] Create localStorage hook in `app/lib/hooks/useLocalStorage.tsx`

### Base UI Components (Foundation for all stories)

- [ ] T018 [P] Create Button component with tests in `app/components/ui/Button.tsx` and `__tests__/components/ui/Button.test.tsx`
- [ ] T019 [P] Create Card component with tests in `app/components/ui/Card.tsx` and `__tests__/components/ui/Card.test.tsx`
- [ ] T020 [P] Create Input component with tests in `app/components/ui/Input.tsx` and `__tests__/components/ui/Input.test.tsx`
- [ ] T021 [P] Create Badge component with tests in `app/components/ui/Badge.tsx` and `__tests__/components/ui/Badge.test.tsx`
- [ ] T022 [P] Create Image component wrapper (Next.js Image) with tests in `app/components/ui/Image.tsx` and `__tests__/components/ui/Image.test.tsx`

### Error Handling

- [ ] T023 Create Error Boundary component in `app/components/ErrorBoundary.tsx`
- [ ] T024 [P] Create error handling utilities in `app/lib/utils/errors.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Browse and View Book Catalog (Priority: P1) 🎯 MVP

**Goal**: Enable users to browse curated book collections by category and view detailed book information

**Independent Test**: Navigate to website, view catalog organized by categories, click books to see details, verify all book information displays correctly

### Tests for User Story 1 (MANDATORY - TDD Principle) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation. This is NON-NEGOTIABLE per Constitution.**

- [ ] T025 [P] [US1] Unit test for BookCard component in `__tests__/components/book/BookCard.test.tsx`
- [ ] T026 [P] [US1] Unit test for BookDetail component in `__tests__/components/book/BookDetail.test.tsx`
- [ ] T027 [P] [US1] Unit test for BookList component in `__tests__/components/book/BookList.test.tsx`
- [ ] T028 [P] [US1] Unit test for CategoryFilter component in `__tests__/components/book/CategoryFilter.test.tsx`
- [ ] T029 [P] [US1] Unit test for data access functions in `__tests__/lib/data/books.test.ts`
- [ ] T030 [US1] Integration test for homepage browsing flow in `__tests__/app/page.test.tsx`
- [ ] T031 [US1] Integration test for book detail page in `__tests__/app/books/[id]/page.test.tsx`
- [ ] T032 [US1] Integration test for category filtered view in `__tests__/app/books/category/[category]/page.test.tsx`
- [ ] T033 [US1] E2E test for browse and view flow in `e2e/browse.spec.ts`

### Implementation for User Story 1

- [ ] T034 [P] [US1] Create BookCard component in `app/components/book/BookCard.tsx` (depends on T025 test)
- [ ] T035 [P] [US1] Create BookDetail component in `app/components/book/BookDetail.tsx` (depends on T026 test)
- [ ] T036 [P] [US1] Create BookList component in `app/components/book/BookList.tsx` (depends on T027 test)
- [ ] T037 [P] [US1] Create CategoryFilter component in `app/components/book/CategoryFilter.tsx` (depends on T028 test)
- [ ] T038 [US1] Create homepage with category browsing in `app/page.tsx` (depends on T034, T036, T037)
- [ ] T039 [US1] Create book detail page in `app/books/[id]/page.tsx` (depends on T035)
- [ ] T040 [US1] Create category filtered view page in `app/books/category/[category]/page.tsx` (depends on T036, T037)
- [ ] T041 [US1] Create root layout with navigation in `app/layout.tsx`
- [ ] T042 [US1] Add error handling for invalid book IDs (404 page)
- [ ] T043 [US1] Add error handling for invalid category slugs (redirect to homepage)
- [ ] T044 [US1] Add placeholder image handling for missing book images
- [ ] T045 [US1] Add responsive design for mobile/tablet/desktop

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Users can browse books by category and view detailed information.

---

## Phase 4: User Story 2 - Add to Cart and Complete Purchase (Priority: P2)

**Goal**: Enable users to add books to cart, review cart, proceed to checkout, enter payment information, and complete purchase

**Independent Test**: Add book to cart, view cart contents, proceed to checkout, enter mock payment details, complete purchase

### Tests for User Story 2 (MANDATORY - TDD Principle) ⚠️

- [ ] T046 [P] [US2] Unit test for CartItem component in `__tests__/components/cart/CartItem.test.tsx`
- [ ] T047 [P] [US2] Unit test for CartSummary component in `__tests__/components/cart/CartSummary.test.tsx`
- [ ] T048 [P] [US2] Unit test for CartIcon component in `__tests__/components/cart/CartIcon.test.tsx`
- [ ] T049 [P] [US2] Unit test for ShippingForm component in `__tests__/components/checkout/ShippingForm.test.tsx`
- [ ] T050 [P] [US2] Unit test for PaymentForm component in `__tests__/components/checkout/PaymentForm.test.tsx`
- [ ] T051 [P] [US2] Unit test for OrderSummary component in `__tests__/components/checkout/OrderSummary.test.tsx`
- [ ] T052 [P] [US2] Unit test for useCart hook in `__tests__/lib/hooks/useCart.test.tsx`
- [ ] T053 [P] [US2] Unit test for validation utilities (email, card Luhn) in `__tests__/lib/utils/validation.test.ts`
- [ ] T054 [US2] Integration test for cart page in `__tests__/app/cart/page.test.tsx`
- [ ] T055 [US2] Integration test for checkout page in `__tests__/app/checkout/page.test.tsx`
- [ ] T056 [US2] E2E test for add to cart flow in `e2e/cart.spec.ts`
- [ ] T057 [US2] E2E test for checkout flow in `e2e/checkout.spec.ts`

### Implementation for User Story 2

- [ ] T058 [P] [US2] Create useCart hook with localStorage persistence in `app/lib/hooks/useCart.tsx` (depends on T052 test, T017)
- [ ] T059 [P] [US2] Create CartItem component in `app/components/cart/CartItem.tsx` (depends on T046 test)
- [ ] T060 [P] [US2] Create CartSummary component in `app/components/cart/CartSummary.tsx` (depends on T047 test)
- [ ] T061 [P] [US2] Create CartIcon component in `app/components/cart/CartIcon.tsx` (depends on T048 test)
- [ ] T062 [P] [US2] Create ShippingForm component with validation in `app/components/checkout/ShippingForm.tsx` (depends on T049 test, T016)
- [ ] T063 [P] [US2] Create PaymentForm component with card validation in `app/components/checkout/PaymentForm.tsx` (depends on T050 test, T016)
- [ ] T064 [P] [US2] Create OrderSummary component in `app/components/checkout/OrderSummary.tsx` (depends on T051 test)
- [ ] T065 [US2] Create cart page in `app/cart/page.tsx` (depends on T059, T060, T058)
- [ ] T066 [US2] Create checkout page in `app/checkout/page.tsx` (depends on T062, T063, T064, T058)
- [ ] T067 [US2] Add "Add to Cart" functionality to BookDetail component (depends on T035, T058)
- [ ] T068 [US2] Integrate CartIcon into root layout navigation (depends on T061, T041)
- [ ] T069 [US2] Implement cart persistence in localStorage (depends on T058, T017)
- [ ] T070 [US2] Add empty cart state handling (show message, prevent checkout)
- [ ] T071 [US2] Add form validation error display for shipping form
- [ ] T072 [US2] Add form validation error display for payment form
- [ ] T073 [US2] Add mock payment processing (validate, create order, clear cart)
- [ ] T074 [US2] Add order confirmation page/component (depends on T073)
- [ ] T075 [US2] Add security: mask card numbers in display (show last 4 digits only)
- [ ] T076 [US2] Add security: clear payment form data after processing
- [ ] T077 [US2] Add security: validate all inputs (XSS prevention)
- [ ] T078 [US2] Add error handling for checkout failures

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Users can browse books, add to cart, and complete checkout.

---

## Phase 5: User Story 3 - Track Order Status (Priority: P3)

**Goal**: Enable users to view order history and track order status

**Independent Test**: Complete purchase, access order history, view order status details

### Tests for User Story 3 (MANDATORY - TDD Principle) ⚠️

- [ ] T079 [P] [US3] Unit test for OrderCard component in `__tests__/components/orders/OrderCard.test.tsx`
- [ ] T080 [P] [US3] Unit test for OrderDetail component in `__tests__/components/orders/OrderDetail.test.tsx`
- [ ] T081 [P] [US3] Unit test for OrderStatus component in `__tests__/components/orders/OrderStatus.test.tsx`
- [ ] T082 [P] [US3] Unit test for useOrders hook in `__tests__/lib/hooks/useOrders.test.tsx`
- [ ] T083 [US3] Integration test for order history page in `__tests__/app/orders/page.test.tsx`
- [ ] T084 [US3] Integration test for order detail page in `__tests__/app/orders/[orderId]/page.test.tsx`
- [ ] T085 [US3] E2E test for order tracking flow in `e2e/orders.spec.ts`

### Implementation for User Story 3

- [ ] T086 [P] [US3] Create useOrders hook with sessionStorage persistence in `app/lib/hooks/useOrders.tsx` (depends on T082 test, T017)
- [ ] T087 [P] [US3] Create OrderCard component in `app/components/orders/OrderCard.tsx` (depends on T079 test)
- [ ] T088 [P] [US3] Create OrderDetail component in `app/components/orders/OrderDetail.tsx` (depends on T080 test)
- [ ] T089 [P] [US3] Create OrderStatus component in `app/components/orders/OrderStatus.tsx` (depends on T081 test)
- [ ] T090 [US3] Create order history page in `app/orders/page.tsx` (depends on T087, T086)
- [ ] T091 [US3] Create order detail page in `app/orders/[orderId]/page.tsx` (depends on T088, T086)
- [ ] T092 [US3] Integrate order creation into checkout flow (save order to sessionStorage) (depends on T073, T086)
- [ ] T093 [US3] Add order sorting (reverse chronological - most recent first)
- [ ] T094 [US3] Add empty order history state handling
- [ ] T095 [US3] Add error handling for invalid order IDs (404, redirect to order history)
- [ ] T096 [US3] Add security: mask payment info in order display (card number, CVV)

**Checkpoint**: All user stories should now be independently functional. Users can browse, purchase, and track orders.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

### Security Hardening

- [ ] T097 [P] Implement Content Security Policy headers in `next.config.js`
- [ ] T098 [P] Add input sanitization for all user inputs (XSS prevention)
- [ ] T099 [P] Review and fix any security vulnerabilities from `npm audit`
- [ ] T100 [P] Add security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- [ ] T101 [P] Ensure no sensitive data in error messages
- [ ] T102 [P] Add rate limiting considerations (document for future backend)

### Performance Optimization

- [ ] T103 [P] Optimize images using Next.js Image component (all book images)
- [ ] T104 [P] Implement code splitting for routes (verify automatic App Router splitting)
- [ ] T105 [P] Add lazy loading for images below the fold
- [ ] T106 [P] Optimize bundle size (analyze with `next build --analyze`)
- [ ] T107 [P] Verify Core Web Vitals targets (LCP < 2.5s, FID < 100ms, CLS < 0.1)

### Accessibility

- [ ] T108 [P] Add ARIA labels to all interactive elements
- [ ] T109 [P] Ensure keyboard navigation works for all components
- [ ] T110 [P] Verify color contrast ratios meet WCAG 2.1 AA
- [ ] T111 [P] Add focus indicators to all interactive elements
- [ ] T112 [P] Test with screen reader (VoiceOver/NVDA)

### Testing & Quality

- [ ] T113 [P] Ensure all components have test coverage > 80%
- [ ] T114 [P] Run full E2E test suite and verify all flows pass
- [ ] T115 [P] Add edge case tests (empty states, error states, invalid inputs)
- [ ] T116 [P] Run security checklist validation (refer to `security-checklist.md`)

### Documentation & Cleanup

- [ ] T117 [P] Update README.md with setup and run instructions
- [ ] T118 [P] Document component props and usage in component files
- [ ] T119 [P] Code cleanup and refactoring (remove unused code, improve naming)
- [ ] T120 [P] Verify quickstart.md instructions work end-to-end

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Integrates with US1 (uses BookDetail for "Add to Cart")
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Integrates with US2 (uses checkout flow to create orders)

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD)
- Type definitions before components
- Base UI components before domain components
- Components before pages
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Components within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add Polish → Final release
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Browse & View)
   - Developer B: User Story 2 (Cart & Checkout) - can start after US1 BookDetail is done
   - Developer C: User Story 3 (Order Tracking) - can start after US2 checkout is done
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- **CRITICAL**: Verify tests fail before implementing (TDD principle)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Security tasks are integrated throughout (not just in Phase 6)
- All components must be accessible (WCAG 2.1 AA)
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

## Security Reminders

- Never log sensitive data (payment info, personal details)
- Always validate and sanitize user inputs
- Mask payment information in displays
- Use React's built-in XSS protection (no `dangerouslySetInnerHTML` without sanitization)
- Configure CSP headers
- Run `npm audit` regularly
- Follow security-checklist.md for validation

