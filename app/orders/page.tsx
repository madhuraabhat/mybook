'use client';

import { useRouter } from 'next/navigation';
import { useOrders } from '@/app/lib/hooks/useOrders';
import { OrderCard } from '@/app/components/orders/OrderCard';

export default function OrdersPage() {
  const router = useRouter();
  const { getOrders } = useOrders();
  const orders = getOrders();

  const handleViewDetails = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  if (orders.length === 0) {
    return (
      <main className="orders-page">
        <div className="orders-page-header">
          <h1>Order History</h1>
        </div>
        <div className="orders-empty">
          <h2>No orders yet</h2>
          <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
          <button onClick={() => router.push('/')} className="back-button">
            Start Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <div className="orders-page-header">
        <h1>Order History</h1>
      </div>
      <div className="orders-list">
        {orders.map((order) => (
          <OrderCard
            key={order.orderId}
            order={order}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </main>
  );
}

