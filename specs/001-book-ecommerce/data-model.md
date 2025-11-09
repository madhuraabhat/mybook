# Data Model: Book E-commerce Platform

**Feature**: Book E-commerce Platform  
**Date**: 2025-01-27  
**Phase**: 1 - Design

## Entity Definitions

### Book

Represents a book in the catalog. Core entity for the application.

**Attributes**:
- `id: string` - Unique identifier (e.g., "book-001")
- `title: string` - Book title
- `author: string` - Author name
- `description: string` - Full book description
- `category: CategoryId` - Category identifier (fiction, poetry, philosophy)
- `price: number` - Price in base currency (e.g., USD cents or decimal)
- `imageUrl: string` - Primary book cover image URL
- `imageUrls?: string[]` - Additional image URLs (optional)
- `isbn?: string` - ISBN number (optional)
- `publishedYear?: number` - Publication year (optional)
- `pages?: number` - Page count (optional)
- `inStock: boolean` - Availability status

**Constraints**:
- `id` must be unique
- `title`, `author`, `description` are required
- `price` must be positive number
- `imageUrl` must be valid URL or path
- `category` must reference valid Category

**Example**:
```typescript
{
  id: "book-001",
  title: "The Collected Poems of Rumi",
  author: "Jalal ad-Din Muhammad Rumi",
  description: "A comprehensive collection of Rumi's mystical poetry...",
  category: "poetry",
  price: 2499, // $24.99 in cents
  imageUrl: "/images/rumi-poems.jpg",
  inStock: true
}
```

### Category

Represents a curated collection grouping for organizing books.

**Attributes**:
- `id: string` - Unique identifier (e.g., "fiction", "poetry", "philosophy")
- `name: string` - Display name (e.g., "Fiction", "Poetry", "Philosophy")
- `description?: string` - Category description (optional)
- `slug: string` - URL-friendly identifier

**Constraints**:
- `id` must be unique
- `name` is required
- `slug` must be URL-safe (lowercase, hyphens)

**Example**:
```typescript
{
  id: "poetry",
  name: "Poetry",
  description: "Curated collection of rare and niche poetry",
  slug: "poetry"
}
```

### CartItem

Represents an item in the shopping cart.

**Attributes**:
- `bookId: string` - Reference to Book.id
- `quantity: number` - Number of copies
- `price: number` - Price at time of adding to cart (snapshot)

**Constraints**:
- `quantity` must be positive integer
- `bookId` must reference valid Book
- `price` must match Book.price at time of addition

**Relationships**:
- References Book (many-to-one)

### Cart

Represents the user's shopping cart state.

**Attributes**:
- `items: CartItem[]` - Array of cart items
- `totalAmount: number` - Calculated total (sum of item.price * item.quantity)
- `updatedAt: number` - Timestamp of last update

**Constraints**:
- `items` array can be empty
- `totalAmount` must equal sum of all items
- `updatedAt` updated on any cart modification

**Storage**: localStorage (persists across sessions per FR-015)

### ShippingInfo

Represents shipping address and contact information.

**Attributes**:
- `fullName: string` - Recipient full name
- `addressLine1: string` - Street address
- `addressLine2?: string` - Apartment, suite, etc. (optional)
- `city: string` - City
- `state: string` - State/Province
- `postalCode: string` - ZIP/Postal code
- `country: string` - Country
- `phone: string` - Contact phone number
- `email: string` - Contact email

**Constraints**:
- All required fields must be non-empty strings
- `email` must be valid email format
- `postalCode` format validated per country

### PaymentInfo

Represents payment method information (mock for prototype).

**Attributes**:
- `cardNumber: string` - Credit card number (masked in display)
- `cardHolderName: string` - Name on card
- `expiryMonth: number` - Expiry month (1-12)
- `expiryYear: number` - Expiry year (4 digits)
- `cvv: string` - CVV code (3-4 digits)
- `billingAddress?: ShippingInfo` - Billing address (optional, defaults to shipping)

**Constraints**:
- `cardNumber` must pass Luhn algorithm validation
- `expiryMonth` must be 1-12
- `expiryYear` must be current or future year
- `cvv` must be 3-4 digits
- All fields required for checkout

**Security Note**: In prototype, this is mock data only. No real payment processing.

### Order

Represents a completed purchase transaction.

**Attributes**:
- `orderId: string` - Unique order identifier (e.g., "ORD-20250127-001")
- `orderDate: Date` - Date/time of order placement
- `items: OrderItem[]` - Array of ordered items (snapshot of cart items)
- `shippingInfo: ShippingInfo` - Shipping address
- `paymentInfo: PaymentInfo` - Payment method (masked for display)
- `status: OrderStatus` - Current order status
- `subtotal: number` - Items total before tax/shipping
- `totalAmount: number` - Final total amount
- `tax?: number` - Tax amount (optional, if applicable)
- `shippingCost?: number` - Shipping cost (optional, if applicable)

**Constraints**:
- `orderId` must be unique
- `items` array must not be empty
- `totalAmount` must equal subtotal + tax + shipping
- `status` must be valid OrderStatus value

**Storage**: sessionStorage (temporary, for prototype)

**Relationships**:
- Contains OrderItems (one-to-many)
- References ShippingInfo and PaymentInfo

### OrderItem

Represents an item in an order (snapshot of cart item at time of purchase).

**Attributes**:
- `bookId: string` - Reference to Book.id
- `title: string` - Book title (snapshot)
- `author: string` - Author name (snapshot)
- `quantity: number` - Number of copies
- `price: number` - Price per item (snapshot)
- `subtotal: number` - quantity * price

**Constraints**:
- All fields required
- `quantity` must be positive
- `subtotal` must equal quantity * price

### OrderStatus

Enumeration of order fulfillment states.

**Values**:
- `"confirmed"` - Order received and confirmed
- `"processing"` - Order being prepared
- `"shipped"` - Order shipped to customer
- `"delivered"` - Order delivered to customer

**Status Flow**: confirmed → processing → shipped → delivered

## Data Relationships

```
Category (1) ──< (many) Book
Book (1) ──< (many) CartItem
CartItem (many) ──> (1) Cart
Cart (1) ──> (1) Order (on checkout)
Order (1) ──< (many) OrderItem
OrderItem (many) ──> (1) Book (reference)
Order (1) ──> (1) ShippingInfo
Order (1) ──> (1) PaymentInfo
Order (1) ──> (1) OrderStatus
```

## Mock Data Structure

### Books Catalog
- 3-5 books total
- Distributed across categories (fiction, poetry, philosophy)
- Each book has complete attributes
- Images use placeholder or public domain sources

### Categories
- "fiction" - Fiction category
- "poetry" - Poetry category  
- "philosophy" - Philosophy category

### Storage Strategy

**Cart (localStorage)**:
- Key: `"mybook-cart"`
- Value: JSON stringified Cart object
- Persists across browser sessions

**Orders (sessionStorage)**:
- Key: `"mybook-orders"`
- Value: JSON stringified Order[] array
- Cleared on browser close (prototype scope)

## Type Definitions

```typescript
type CategoryId = "fiction" | "poetry" | "philosophy";
type OrderStatus = "confirmed" | "processing" | "shipped" | "delivered";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: CategoryId;
  price: number;
  imageUrl: string;
  imageUrls?: string[];
  isbn?: string;
  publishedYear?: number;
  pages?: number;
  inStock: boolean;
}

interface Category {
  id: CategoryId;
  name: string;
  description?: string;
  slug: string;
}

interface CartItem {
  bookId: string;
  quantity: number;
  price: number;
}

interface Cart {
  items: CartItem[];
  totalAmount: number;
  updatedAt: number;
}

interface ShippingInfo {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
}

interface PaymentInfo {
  cardNumber: string;
  cardHolderName: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
  billingAddress?: ShippingInfo;
}

interface OrderItem {
  bookId: string;
  title: string;
  author: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface Order {
  orderId: string;
  orderDate: Date;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  status: OrderStatus;
  subtotal: number;
  totalAmount: number;
  tax?: number;
  shippingCost?: number;
}
```

## Validation Rules

### Book Validation
- All required fields must be present
- Price must be positive number
- Category must be valid CategoryId

### Cart Validation
- CartItem.bookId must reference existing Book
- CartItem.quantity must be >= 1
- Cart.totalAmount must equal sum of items

### Checkout Validation
- ShippingInfo: All required fields, valid email format
- PaymentInfo: Valid card number (Luhn), valid expiry, valid CVV
- Cart must not be empty

### Order Validation
- OrderId must be unique
- Items array must not be empty
- TotalAmount must match calculated total

