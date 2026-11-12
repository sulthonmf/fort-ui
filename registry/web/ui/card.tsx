import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Grouped surface card with subtle hairline border.
 */
export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'fort-ui rounded-[18px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] text-[var(--fort-label)]',
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('space-y-1 px-5 pt-5 pb-3', className)} {...props} />
  );
}

export function CardTitle({
  className,
  ...props
}: React.ComponentProps<'h3'>) {
  return (
    <h3
      className={cn(
        'text-[17px] leading-snug font-semibold text-[var(--fort-label)]',
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'text-[13px] leading-relaxed text-[var(--fort-label-secondary)]',
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn('px-5 pb-5', className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-2 border-t border-[var(--fort-separator)] px-5 py-3.5',
        className,
      )}
      {...props}
    />
  );
}

