import * as React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant =
  | 'neutral'
  | 'tinted'
  | 'filled'
  | 'success'
  | 'destructive';

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  neutral: 'bg-[var(--fort-surface-muted)] text-[var(--fort-label)]',
  tinted: 'bg-[var(--fort-tint-soft)] text-[var(--fort-tint-text)]',
  filled: 'bg-[var(--fort-tint)] text-white',
  success: 'bg-[var(--fort-switch-on)] text-white',
  destructive: 'bg-[var(--fort-destructive)] text-white',
};

export interface BadgeProps extends React.ComponentProps<'span'> {
  variant?: BadgeVariant;
  shape?: 'pill' | 'rounded';
}

/**
 * Compact status or counter badge aligned with semantic theme colors.
 */
export function Badge({
  className,
  variant = 'tinted',
  shape = 'pill',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'fort-ui inline-flex h-6 min-w-6 items-center justify-center px-2 text-[12px] font-semibold leading-none',
        shape === 'pill' ? 'rounded-full' : 'rounded-[7px]',
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    />
  );
}

