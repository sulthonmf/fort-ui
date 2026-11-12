import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Restrained loading placeholder matching fort-ui surface tokens.
 */
export function Skeleton({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-pulse rounded-[10px] bg-[var(--fort-surface-muted)]',
        className,
      )}
      {...props}
    />
  );
}

