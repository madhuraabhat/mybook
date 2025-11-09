'use client';

import React, { useState } from 'react';
import { PaymentInfo } from '@/app/lib/types/order';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';

export interface PaymentFormProps {
  onSubmit: (info: PaymentInfo) => void;
  errors?: Record<string, string>;
}

export function PaymentForm({ onSubmit, errors = {} }: PaymentFormProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  const [formData, setFormData] = useState<PaymentInfo>({
    cardNumber: '',
    cardHolderName: '',
    expiryMonth: 1,
    expiryYear: currentYear,
    cvv: '',
  });

  const handleChange = (field: keyof PaymentInfo) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = field === 'expiryMonth' || field === 'expiryYear'
      ? parseInt(e.target.value, 10)
      : e.target.value;
    
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Mask card number for display (show only last 4 digits)
  const maskCardNumber = (cardNumber: string): string => {
    if (cardNumber.length <= 4) return cardNumber;
    return '**** **** **** ' + cardNumber.slice(-4);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h2>Payment Information</h2>
      
      <Input
        label="Card Number"
        name="cardNumber"
        type="text"
        value={formData.cardNumber}
        onChange={handleChange('cardNumber')}
        placeholder="1234 5678 9012 3456"
        maxLength={19}
        required
        error={errors.cardNumber}
      />

      <Input
        label="Card Holder Name"
        name="cardHolderName"
        value={formData.cardHolderName}
        onChange={handleChange('cardHolderName')}
        required
        error={errors.cardHolderName}
      />

      <div className="form-row">
        <div className="input-wrapper">
          <label htmlFor="expiryMonth" className="input-label">
            Expiry Month <span className="required">*</span>
          </label>
          <select
            id="expiryMonth"
            name="expiryMonth"
            value={formData.expiryMonth}
            onChange={handleChange('expiryMonth')}
            className="input"
            required
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {month.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
          {errors.expiryMonth && (
            <span className="input-error-message" role="alert">
              {errors.expiryMonth}
            </span>
          )}
        </div>

        <div className="input-wrapper">
          <label htmlFor="expiryYear" className="input-label">
            Expiry Year <span className="required">*</span>
          </label>
          <select
            id="expiryYear"
            name="expiryYear"
            value={formData.expiryYear}
            onChange={handleChange('expiryYear')}
            className="input"
            required
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.expiryYear && (
            <span className="input-error-message" role="alert">
              {errors.expiryYear}
            </span>
          )}
        </div>

        <Input
          label="CVV"
          name="cvv"
          type="text"
          value={formData.cvv}
          onChange={handleChange('cvv')}
          placeholder="123"
          maxLength={4}
          required
          error={errors.cvv}
        />
      </div>

      <div className="payment-note">
        <p>This is a prototype. No real payment will be processed.</p>
      </div>

      <Button type="submit" variant="primary" size="large">
        Place Order
      </Button>
    </form>
  );
}

