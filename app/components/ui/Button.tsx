import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  as?: 'button' | 'a';
  href?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'medium',
  as = 'button',
  href,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClasses = 'btn';
  const variantClasses = `btn-${variant}`;
  const sizeClasses = `btn-${size}`;
  const classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim();

  if (as === 'a' && href) {
    return (
      <a href={href} className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

