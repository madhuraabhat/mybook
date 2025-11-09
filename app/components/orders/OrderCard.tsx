'use client';

import React from 'react';
import { Order } from '@/app/lib/types/order';
import { Card } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { formatPrice, formatDate } from '@/app/lib/utils/format';

export interface OrderCardProps {
  order: Order;
  onViewDetails?: (orderId: string) => void;
}

export function OrderCard({ order, onViewDetails }: OrderCardProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'processing':
        return 'warning';
      case 'shipped':
        return 'default';
      case 'delivered':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleClick = () => {
    onViewDetails?.(order.orderId);
  };

  return (
    <div
      className="order-card-wrapper"
      onClick={handleClick}
      style={{ cursor: onViewDetails ? 'pointer' : 'default' }}
    >
      <Card className="order-card">
      <div className="order-card-header">
        <div>
          <h3 className="order-card-id">Order #{order.orderId}</h3>
          <p className="order-card-date">{formatDate(order.orderDate)}</p>
        </div>
        <Badge variant={getStatusVariant(order.status) as any}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </div>
      <div className="order-card-details">
        <p className="order-card-items">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
        <p className="order-card-total">{formatPrice(order.totalAmount)}</p>
      </div>
      </Card>
    </div>
  );
}

