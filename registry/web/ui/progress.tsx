'use client';

import * as React from 'react';
import { Progress as BaseProgress } from '@base-ui/react/progress';
import { cn } from '@/lib/utils';

export interface ProgressProps
  extends React.ComponentProps<typeof BaseProgress.Root> {
  label?: React.ReactNode;
  showValue?: boolean;
}

/**
 * Clean linear progress bar built on Base UI Progress.
 */
export function Progress({
  className,
  label,
  showValue = false,
  ...props
}: ProgressProps) {
  return (
    <BaseProgress.Root
      className={cn('fort-ui flex w-full flex-col gap-1.5', className)}
      {...props}
    >
      {label || showValue ? (
        <div className="flex items-center justify-between text-[13px]">
          {label ? (
            <BaseProgress.Label className="font-medium text-[var(--fort-label)]">
              {label}
            </BaseProgress.Label>
          ) : (
            <span />
          )}
          {showValue ? (
            <BaseProgress.Value className="tabular-nums text-[var(--fort-label-secondary)]" />
          ) : null}
        </div>
      ) : null}
      <BaseProgress.Track className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--fort-surface-muted)]">
        <BaseProgress.Indicator className="h-full rounded-full bg-[var(--fort-tint)] transition-[width] duration-300 ease-[var(--fort-ease)]" />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}

export interface SpinnerProps extends React.ComponentProps<'svg'> {
  size?: 'sm' | 'md' | 'lg';
}

const SPINNER_SIZES: Record<NonNullable<SpinnerProps['size']>, string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-7',
};

/**
 * Restrained activity indicator spinner.
 */
export function Spinner({
  size = 'md',
  className,
  ...props
}: SpinnerProps) {
  return (
    <svg
      role="status"
      aria-label={props['aria-label'] ?? 'Loading'}
      viewBox="0 0 24 24"
      fill="none"
      className={cn(
        'animate-spin text-[var(--fort-label-secondary)]',
        SPINNER_SIZES[size],
        className,
      )}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        className="opacity-20"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

