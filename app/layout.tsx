import type { Metadata } from 'next';
import './styles/globals.css';
import { CartProvider } from '@/app/lib/hooks/useCart';
import { OrdersProvider } from '@/app/lib/hooks/useOrders';

export const metadata: Metadata = {
  title: 'MyBook - Rare & Niche Books',
  description: 'Curated collection of rare and niche books not available on mainstream platforms',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <OrdersProvider>
            {children}
          </OrdersProvider>
        </CartProvider>
      </body>
    </html>
  );
}

