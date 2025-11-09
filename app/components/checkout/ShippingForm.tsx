'use client';

import React, { useState } from 'react';
import { ShippingInfo } from '@/app/lib/types/order';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';

export interface ShippingFormProps {
  onSubmit: (info: ShippingInfo) => void;
  initialValues?: Partial<ShippingInfo>;
  errors?: Record<string, string>;
}

export function ShippingForm({ onSubmit, initialValues, errors = {} }: ShippingFormProps) {
  const [formData, setFormData] = useState<ShippingInfo>({
    fullName: initialValues?.fullName || '',
    addressLine1: initialValues?.addressLine1 || '',
    addressLine2: initialValues?.addressLine2 || '',
    city: initialValues?.city || '',
    state: initialValues?.state || '',
    postalCode: initialValues?.postalCode || '',
    country: initialValues?.country || '',
    phone: initialValues?.phone || '',
    email: initialValues?.email || '',
  });

  const handleChange = (field: keyof ShippingInfo) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="shipping-form">
      <h2>Shipping Information</h2>
      
      <Input
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange('fullName')}
        required
        error={errors.fullName}
      />

      <Input
        label="Address Line 1"
        name="addressLine1"
        value={formData.addressLine1}
        onChange={handleChange('addressLine1')}
        required
        error={errors.addressLine1}
      />

      <Input
        label="Address Line 2 (Optional)"
        name="addressLine2"
        value={formData.addressLine2 || ''}
        onChange={handleChange('addressLine2')}
        error={errors.addressLine2}
      />

      <div className="form-row">
        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange('city')}
          required
          error={errors.city}
        />

        <Input
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange('state')}
          required
          error={errors.state}
        />
      </div>

      <div className="form-row">
        <Input
          label="Postal Code"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange('postalCode')}
          required
          error={errors.postalCode}
        />

        <Input
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange('country')}
          required
          error={errors.country}
        />
      </div>

      <Input
        label="Phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange('phone')}
        required
        error={errors.phone}
      />

      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
        required
        error={errors.email}
      />

      <Button type="submit" variant="primary" size="large">
        Continue to Payment
      </Button>
    </form>
  );
}

