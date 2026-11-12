import * as React from 'react';

export interface FortLogoProps {
  size?: number;
  className?: string;
}

/**
 * Minimalist two-stroke geometric mark for the fort-ui navigation bar.
 */
export function FortLogo({ size = 20, className }: FortLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6.5 19V7C6.5 5.9 7.4 5 8.5 5H18"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 12H16.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
