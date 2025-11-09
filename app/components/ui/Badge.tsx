import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'error' | 'warning';
  size?: 'small' | 'medium';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'medium',
  className = '',
}: BadgeProps) {
  return (
    <span className={`badge badge-${variant} badge-${size} ${className}`.trim()}>
      {children}
    </span>
  );
}

