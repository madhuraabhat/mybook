'use client';

import React from 'react';
import { Button } from '@/app/components/ui/Button';
import { formatPrice } from '@/app/lib/utils/format';

export interface CartSummaryProps {
  totalAmount: number;
  itemCount?: number;
  onCheckout?: () => void;
  disabled?: boolean;
}

export function CartSummary({
  totalAmount,
  itemCount,
  onCheckout,
  disabled = false,
}: CartSummaryProps) {
  return (
    <div className="cart-summary">
      <div className="cart-summary-details">
        {itemCount !== undefined && (
          <div className="cart-summary-row">
            <span>Items:</span>
            <span>{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
          </div>
        )}
        <div className="cart-summary-row cart-summary-total">
          <span>Total:</span>
          <span className="cart-total-amount">{formatPrice(totalAmount)}</span>
        </div>
      </div>
      {onCheckout && (
        <Button
          variant="primary"
          size="large"
          onClick={onCheckout}
          disabled={disabled}
          className="cart-checkout-button"
        >
          Proceed to Checkout
        </Button>
      )}
    </div>
  );
}

