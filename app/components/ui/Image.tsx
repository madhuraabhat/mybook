import NextImage from 'next/image';
import React from 'react';

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}

export function Image({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  ...props
}: ImageProps) {
  // Use provided src or fallback to placeholder
  const imageSrc = src || `https://via.placeholder.com/${width || 400}x${height || 600}?text=${encodeURIComponent(alt)}`;

  if (fill) {
    return (
      <NextImage
        src={imageSrc}
        alt={alt}
        fill
        className={className}
        {...(priority && { priority: true })}
        {...props}
      />
    );
  }

  return (
    <NextImage
      src={imageSrc}
      alt={alt}
      width={width || 400}
      height={height || 600}
      className={className}
      {...(priority && { priority: true })}
      {...props}
    />
  );
}

