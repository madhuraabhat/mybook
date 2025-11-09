# MyBook - Rare & Niche Books E-commerce

A modern, boutique-style e-commerce web application for selling rare and niche books, built with Next.js 14, React, and TypeScript.

## Features

- 📚 Browse curated book collections by category (Fiction, Poetry, Philosophy, etc.)
- 🛒 Shopping cart with persistent storage
- 💳 Complete checkout flow with payment processing
- 📦 Order tracking and history
- 🎨 Modern, boutique-style UI/UX
- ✅ Test-Driven Development (TDD) with Jest and Playwright
- 🔒 Security best practices (CSP, input validation, XSS prevention)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules with CSS Variables
- **Testing**: 
  - Jest + React Testing Library (Unit/Component tests)
  - Playwright (E2E tests)
- **State Management**: React Context API + localStorage/sessionStorage

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/madhuraabhat/mybook.git
cd mybook
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run test:e2e` - Run E2E tests with Playwright
- `npm run lint` - Run ESLint

## Project Structure

```
mybook/
├── app/                    # Next.js App Router
│   ├── components/         # React components
│   │   ├── book/          # Book-related components
│   │   ├── cart/         # Cart components
│   │   ├── checkout/     # Checkout components
│   │   ├── orders/       # Order components
│   │   └── ui/           # Reusable UI components
│   ├── lib/              # Utilities and hooks
│   │   ├── data/         # Mock data
│   │   ├── hooks/        # Custom React hooks
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Utility functions
│   ├── styles/           # Global styles
│   └── [routes]/         # Next.js pages
├── __tests__/            # Unit and component tests
├── e2e/                  # E2E tests (Playwright)
├── public/               # Static assets
└── specs/                # Project specifications
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub (already done ✅)

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub

3. Click "Add New Project"

4. Import your repository: `madhuraabhat/mybook`

5. Vercel will auto-detect Next.js settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

6. Click "Deploy"

7. Your app will be live in ~2 minutes! 🎉

### Environment Variables

Currently, no environment variables are required. If you add backend services later, configure them in Vercel's project settings.

## Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:coverage
```

## Security Features

- Content Security Policy (CSP) headers
- XSS prevention through input sanitization
- Secure data handling (payment info masking)
- HTTPS/TLS encryption (handled by Vercel)
- Input validation on all forms

## Current Limitations

- Uses mock data (no backend API)
- Cart and orders stored in browser storage (localStorage/sessionStorage)
- Payment processing is simulated (no real payment gateway)

## Future Enhancements

- Backend API integration
- Real payment processing (Stripe, PayPal)
- User authentication
- Database integration (Firestore, PostgreSQL)
- Admin dashboard
- Email notifications
- Search functionality
- Book reviews and ratings

## License

This project is private and proprietary.

## Author

Built with ❤️ for rare and niche book enthusiasts

