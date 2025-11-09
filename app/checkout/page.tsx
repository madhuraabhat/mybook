'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/lib/hooks/useCart';
import { useOrders } from '@/app/lib/hooks/useOrders';
import { getAllBooks } from '@/app/lib/data/books';
import { ShippingForm } from '@/app/components/checkout/ShippingForm';
import { PaymentForm } from '@/app/components/checkout/PaymentForm';
import { OrderSummary } from '@/app/components/checkout/OrderSummary';
import { ShippingInfo, PaymentInfo } from '@/app/lib/types/order';
import { isValidEmail, isValidPhone, isValidCardNumber, isValidExpiryDate, isValidCVV } from '@/app/lib/utils/validation';
import { Button } from '@/app/components/ui/Button';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalAmount, clearCart } = useCart();
  const { createOrder } = useOrders();
  const allBooks = getAllBooks();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  // Redirect if cart is empty - use useEffect to avoid hydration issues
  // Only redirect if we're not already processing an order
  React.useEffect(() => {
    if (items.length === 0 && step === 'shipping' && !isProcessingOrder) {
      router.push('/cart');
    }
  }, [items.length, router, step, isProcessingOrder]);
  
  if (items.length === 0 && !isProcessingOrder) {
    return null;
  }

  const handleShippingSubmit = (info: ShippingInfo) => {
    // Validate shipping info
    const errors: Record<string, string> = {};
    
    if (!info.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    if (!info.addressLine1.trim()) {
      errors.addressLine1 = 'Address is required';
    }
    if (!info.city.trim()) {
      errors.city = 'City is required';
    }
    if (!info.state.trim()) {
      errors.state = 'State is required';
    }
    if (!info.postalCode.trim()) {
      errors.postalCode = 'Postal code is required';
    }
    if (!info.country.trim()) {
      errors.country = 'Country is required';
    }
    if (!isValidEmail(info.email)) {
      errors.email = 'Invalid email address';
    }
    if (!isValidPhone(info.phone)) {
      errors.phone = 'Invalid phone number';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setShippingInfo(info);
    setStep('payment');
  };

  const handlePaymentSubmit = (info: PaymentInfo) => {
    // Validate payment info
    const errors: Record<string, string> = {};
    
    if (!isValidCardNumber(info.cardNumber)) {
      errors.cardNumber = 'Invalid card number';
    }
    if (!info.cardHolderName.trim()) {
      errors.cardHolderName = 'Card holder name is required';
    }
    if (!isValidExpiryDate(info.expiryMonth, info.expiryYear)) {
      errors.expiryMonth = 'Invalid expiry date';
    }
    if (!isValidCVV(info.cvv)) {
      errors.cvv = 'Invalid CVV';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Create order
    if (!shippingInfo) {
      setFormErrors({ payment: 'Shipping information is required' });
      return;
    }

    try {
      setIsProcessingOrder(true);
      const order = createOrder(items, allBooks, shippingInfo, info, totalAmount);
      const orderId = order.orderId;
      
      // Redirect first, then clear cart to avoid redirect loop
      router.push(`/orders/${orderId}`);
      // Clear cart after a brief delay to ensure navigation starts
      setTimeout(() => {
        clearCart();
        setIsProcessingOrder(false);
      }, 200);
    } catch (error) {
      setIsProcessingOrder(false);
      setFormErrors({ payment: 'Failed to create order. Please try again.' });
    }
  };

  const handleBackToShipping = () => {
    setStep('shipping');
    setFormErrors({});
  };

  return (
    <main className="checkout-page">
      <div className="checkout-page-header">
        <h1>Checkout</h1>
      </div>

      <div className="checkout-main">
        {step === 'shipping' ? (
          <ShippingForm
            onSubmit={handleShippingSubmit}
            errors={formErrors}
          />
        ) : (
          <>
            <div className="checkout-step-indicator">
              <span>✓ Shipping Information</span>
              <span>→</span>
              <span>Payment Information</span>
            </div>
            <PaymentForm
              onSubmit={handlePaymentSubmit}
              errors={formErrors}
            />
            <Button variant="outline" onClick={handleBackToShipping}>
              ← Back to Shipping
            </Button>
          </>
        )}
      </div>

      <div className="checkout-sidebar">
        <OrderSummary
          items={items}
          books={allBooks}
          totalAmount={totalAmount}
        />
      </div>
    </main>
  );
}

