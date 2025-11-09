'use client';

import { useRouter } from 'next/navigation';
import { useOrders } from '@/app/lib/hooks/useOrders';
import { OrderDetail } from '@/app/components/orders/OrderDetail';

interface OrderConfirmationPageProps {
  params: { orderId: string };
}

export default function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { orderId } = params;
  const router = useRouter();
  const { getOrderById } = useOrders();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <main className="order-page">
        <h1>Order Not Found</h1>
        <p>The order you are looking for does not exist.</p>
        <button onClick={() => router.push('/orders')} className="back-button">
          ← View Order History
        </button>
      </main>
    );
  }

  return (
    <main className="order-confirmation-page">
      <div className="order-confirmation-header">
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase. Your order has been received.</p>
      </div>
      <OrderDetail order={order} />
      <div className="order-confirmation-actions">
        <button onClick={() => router.push('/orders')} className="back-button">
          View Order History
        </button>
        <button onClick={() => router.push('/')} className="back-button">
          Continue Shopping
        </button>
      </div>
    </main>
  );
}

