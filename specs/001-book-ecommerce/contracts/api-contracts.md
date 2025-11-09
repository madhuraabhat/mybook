# API Contracts: Book E-commerce Platform

**Feature**: Book E-commerce Platform  
**Date**: 2025-01-27  
**Phase**: 1 - Design

## Overview

Since this is a prototype using mock data, there are no backend API contracts. However, this document defines the **component contracts** and **data access patterns** that components must follow. These serve as the "API" between different parts of the application.

## Component Contracts

### Book Data Access

**Contract**: All book data access goes through a centralized data access layer.

**Interface**:
```typescript
// lib/data/books.ts
export function getAllBooks(): Book[]
export function getBookById(id: string): Book | null
export function getBooksByCategory(category: CategoryId): Book[]
export function getCategories(): Category[]
```

**Usage Pattern**:
- Components import from `lib/data/books`
- No direct access to mock data array
- Enables future migration to API calls

### Cart Management

**Contract**: Cart state managed through React Context with localStorage persistence.

**Interface**:
```typescript
// lib/hooks/useCart.tsx
interface CartContextValue {
  items: CartItem[]
  totalAmount: number
  addItem: (bookId: string, quantity?: number) => void
  removeItem: (bookId: string) => void
  updateQuantity: (bookId: string, quantity: number) => void
  clearCart: () => void
}

export function useCart(): CartContextValue
```

**Persistence Contract**:
- Cart automatically saved to localStorage on any modification
- Cart automatically loaded from localStorage on app initialization
- Key: `"mybook-cart"`

### Order Management

**Contract**: Order state managed through React Context with sessionStorage persistence.

**Interface**:
```typescript
// lib/hooks/useOrders.tsx
interface OrdersContextValue {
  orders: Order[]
  createOrder: (cart: Cart, shippingInfo: ShippingInfo, paymentInfo: PaymentInfo) => Order
  getOrderById: (orderId: string) => Order | null
  getOrders: () => Order[]
}

export function useOrders(): OrdersContextValue
```

**Persistence Contract**:
- Orders saved to sessionStorage on creation
- Orders loaded from sessionStorage on app initialization
- Key: `"mybook-orders"`

## Component Interface Contracts

### BookCard Component

**Props Contract**:
```typescript
interface BookCardProps {
  book: Book
  onViewDetails?: (bookId: string) => void
  onAddToCart?: (bookId: string) => void
  className?: string
}
```

**Behavior Contract**:
- Displays book image, title, author, price
- Clicking card navigates to book detail page
- "Add to Cart" button adds book to cart
- Responsive layout (mobile/desktop)

### BookDetail Component

**Props Contract**:
```typescript
interface BookDetailProps {
  book: Book
  onAddToCart: (bookId: string, quantity?: number) => void
}
```

**Behavior Contract**:
- Displays full book information
- Shows all book images
- "Add to Cart" button with quantity selector
- Responsive layout

### CartItem Component

**Props Contract**:
```typescript
interface CartItemProps {
  item: CartItem
  book: Book
  onUpdateQuantity: (bookId: string, quantity: number) => void
  onRemove: (bookId: string) => void
}
```

**Behavior Contract**:
- Displays book info, quantity, price, subtotal
- Quantity can be updated or item removed
- Updates cart total automatically

### ShippingForm Component

**Props Contract**:
```typescript
interface ShippingFormProps {
  onSubmit: (info: ShippingInfo) => void
  initialValues?: Partial<ShippingInfo>
  errors?: Record<string, string>
}
```

**Behavior Contract**:
- Collects all required shipping fields
- Validates input on submit
- Displays validation errors
- Calls onSubmit with valid ShippingInfo

### PaymentForm Component

**Props Contract**:
```typescript
interface PaymentFormProps {
  onSubmit: (info: PaymentInfo) => void
  errors?: Record<string, string>
}
```

**Behavior Contract**:
- Collects payment card information
- Validates card number (Luhn algorithm)
- Validates expiry date
- Masks card number in display
- Calls onSubmit with valid PaymentInfo

### OrderCard Component

**Props Contract**:
```typescript
interface OrderCardProps {
  order: Order
  onViewDetails?: (orderId: string) => void
}
```

**Behavior Contract**:
- Displays order summary (orderId, date, status, total)
- Clicking navigates to order detail page
- Shows order status badge

### OrderDetail Component

**Props Contract**:
```typescript
interface OrderDetailProps {
  order: Order
}
```

**Behavior Contract**:
- Displays complete order information
- Shows all order items with details
- Shows shipping and payment info (masked)
- Shows order status and timeline

## Page Route Contracts

### Homepage (`/`)

**Contract**:
- Displays all categories
- Shows featured books or all books
- Navigation to category pages
- Navigation to book detail pages

### Book Detail Page (`/books/[id]`)

**Contract**:
- Receives `id` from route params
- Fetches book by id
- Displays BookDetail component
- Handles 404 if book not found

### Category Page (`/books/category/[category]`)

**Contract**:
- Receives `category` from route params
- Fetches books by category
- Displays filtered book list
- Handles invalid category

### Cart Page (`/cart`)

**Contract**:
- Displays all cart items
- Shows cart total
- Navigation to checkout
- Handles empty cart state

### Checkout Page (`/checkout`)

**Contract**:
- Displays order summary
- Collects shipping info
- Collects payment info
- Processes order on submit
- Redirects to order confirmation

### Order History Page (`/orders`)

**Contract**:
- Displays all user orders
- Shows order cards
- Navigation to order details
- Handles empty orders state

### Order Detail Page (`/orders/[orderId]`)

**Contract**:
- Receives `orderId` from route params
- Fetches order by id
- Displays order details
- Handles 404 if order not found

## Validation Contracts

### Form Validation

**Shipping Form Validation**:
- All fields required (except addressLine2)
- Email must be valid format
- Phone must be valid format
- Postal code format validated

**Payment Form Validation**:
- Card number: Luhn algorithm + length check
- Expiry: Valid month (1-12), future date
- CVV: 3-4 digits
- Card holder name: Non-empty

### Business Logic Validation

**Cart Validation**:
- Cannot add out-of-stock books
- Quantity must be positive
- Cart total must be accurate

**Checkout Validation**:
- Cart must not be empty
- All shipping fields valid
- All payment fields valid
- Payment processing succeeds (mock)

## Error Handling Contracts

### Error Types

**Data Errors**:
- Book not found → 404 page
- Order not found → 404 page
- Invalid category → Redirect to homepage

**Validation Errors**:
- Form validation → Display inline errors
- Cart validation → Display toast/alert

**State Errors**:
- localStorage unavailable → Fallback to in-memory
- sessionStorage unavailable → Fallback to in-memory

### Error Display Contract

- All errors must be user-friendly
- Technical errors logged to console (dev mode)
- User sees actionable error messages
- Errors don't break application flow

## Testing Contracts

### Component Testing

**Contract**: All components must be testable in isolation.

**Requirements**:
- Props can be mocked
- Dependencies can be mocked
- Render without errors
- User interactions can be simulated

### Integration Testing

**Contract**: User flows must be testable end-to-end.

**Critical Flows**:
1. Browse → View Book → Add to Cart
2. Cart → Checkout → Order Confirmation
3. Orders → View Order Details

## Future API Migration

When migrating to backend API, these contracts will map to:

- `GET /api/books` → getAllBooks()
- `GET /api/books/:id` → getBookById()
- `GET /api/books?category=:category` → getBooksByCategory()
- `POST /api/cart` → Cart management
- `POST /api/orders` → createOrder()
- `GET /api/orders` → getOrders()
- `GET /api/orders/:id` → getOrderById()

The component contracts remain the same, only the implementation changes.

