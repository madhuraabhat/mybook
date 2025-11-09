'use client';

import React from 'react';
import { OrderStatus as OrderStatusType } from '@/app/lib/types/order';
import { Badge } from '@/app/components/ui/Badge';

export interface OrderStatusProps {
  status: OrderStatusType;
}

export function OrderStatus({ status }: OrderStatusProps) {
  const getStatusVariant = (status: OrderStatusType) => {
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

  const getStatusLabel = (status: OrderStatusType) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Badge variant={getStatusVariant(status) as any}>
      {getStatusLabel(status)}
    </Badge>
  );
}

