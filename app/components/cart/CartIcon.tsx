'use client';

import React from 'react';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/Badge';

export interface CartIconProps {
  itemCount: number;
  onClick?: () => void;
}

export function CartIcon({ itemCount, onClick }: CartIconProps) {
  return (
    <div className="cart-icon-wrapper">
      <Button
        variant="outline"
        size="medium"
        onClick={onClick}
        className="cart-icon-button"
        aria-label={`Shopping cart with ${itemCount} items`}
      >
        🛒 Cart
        {itemCount > 0 && (
          <Badge variant="error" size="small" className="cart-badge">
            {itemCount}
          </Badge>
        )}
      </Button>
    </div>
  );
}

