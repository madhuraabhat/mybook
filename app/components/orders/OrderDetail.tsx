'use client';

import React from 'react';
import { Order } from '@/app/lib/types/order';
import { Card } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { formatPrice, formatDate } from '@/app/lib/utils/format';

export interface OrderDetailProps {
  order: Order;
}

export function OrderDetail({ order }: OrderDetailProps) {
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

  return (
    <div className="order-detail">
      <Card className="order-detail-card">
        <div className="order-detail-header">
          <div>
            <h2>Order #{order.orderId}</h2>
            <p className="order-date">Placed on {formatDate(order.orderDate)}</p>
          </div>
          <Badge variant={getStatusVariant(order.status) as any}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>

        <div className="order-detail-section">
          <h3>Order Items</h3>
          <div className="order-items-list">
            {order.items.map((item) => (
              <div key={item.bookId} className="order-item-row">
                <div className="order-item-info">
                  <span className="order-item-title">{item.title}</span>
                  <span className="order-item-author">by {item.author}</span>
                  <span className="order-item-quantity">
                    Quantity: {item.quantity}
                  </span>
                </div>
                <div className="order-item-pricing">
                  <span className="order-item-price">{formatPrice(item.price)} each</span>
                  <span className="order-item-subtotal">{formatPrice(item.subtotal)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-detail-section">
          <h3>Shipping Information</h3>
          <div className="order-shipping-info">
            <p><strong>{order.shippingInfo.fullName}</strong></p>
            <p>{order.shippingInfo.addressLine1}</p>
            {order.shippingInfo.addressLine2 && (
              <p>{order.shippingInfo.addressLine2}</p>
            )}
            <p>
              {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.postalCode}
            </p>
            <p>{order.shippingInfo.country}</p>
            <p>Phone: {order.shippingInfo.phone}</p>
            <p>Email: {order.shippingInfo.email}</p>
          </div>
        </div>

        <div className="order-detail-section">
          <h3>Payment Information</h3>
          <div className="order-payment-info">
            <p>Card ending in {order.paymentInfo.cardNumber.slice(-4)}</p>
            <p>Cardholder: {order.paymentInfo.cardHolderName}</p>
            <p>
              Expires: {order.paymentInfo.expiryMonth.toString().padStart(2, '0')}/{order.paymentInfo.expiryYear}
            </p>
          </div>
        </div>

        <div className="order-detail-summary">
          <div className="order-summary-row">
            <span>Subtotal:</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          {order.tax && (
            <div className="order-summary-row">
              <span>Tax:</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
          )}
          {order.shippingCost && (
            <div className="order-summary-row">
              <span>Shipping:</span>
              <span>{formatPrice(order.shippingCost)}</span>
            </div>
          )}
          <div className="order-summary-row order-total">
            <span>Total:</span>
            <span className="order-total-amount">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

