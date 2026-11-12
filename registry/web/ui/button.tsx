import * as React from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant =
  | 'filled'
  | 'tinted'
  | 'gray'
  | 'plain'
  | 'destructive'
  | 'destructive-tinted';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';
export type ButtonShape = 'rounded' | 'pill';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  filled:
    'bg-[var(--fort-tint)] text-white hover:brightness-105 active:brightness-95',
  tinted:
    'bg-[var(--fort-tint-soft)] text-[var(--fort-tint-text)] hover:brightness-95',
  gray:
    'bg-[var(--fort-surface-muted)] text-[var(--fort-label)] hover:brightness-95',
  plain:
    'bg-transparent text-[var(--fort-tint-text)] hover:bg-[var(--fort-tint-soft)]/50',
  destructive:
    'bg-[var(--fort-destructive)] text-white hover:brightness-105 active:brightness-95',
  'destructive-tinted':
    'bg-[var(--fort-destructive-soft)] text-[var(--fort-destructive-text)] hover:brightness-95',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-[14px]',
  md: 'h-11 px-4 text-[15px]',
  lg: 'h-12 px-5 text-[16px]',
  icon: 'h-11 w-11 p-0',
};

const SHAPE_CLASSES: Record<ButtonSize, Record<ButtonShape, string>> = {
  sm: { rounded: 'rounded-[10px]', pill: 'rounded-full' },
  md: { rounded: 'rounded-[12px]', pill: 'rounded-full' },
  lg: { rounded: 'rounded-[14px]', pill: 'rounded-full' },
  icon: { rounded: 'rounded-[12px]', pill: 'rounded-full' },
};

export interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  fullWidth?: boolean;
}

/**
 * Touch-first action button with tactile press feedback and accessible sizing.
 */
export function Button({
  className,
  variant = 'filled',
  size = 'md',
  shape = 'rounded',
  fullWidth = false,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'fort-ui inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-semibold select-none',
        'transition-[transform,background-color,filter,opacity] duration-150 ease-[var(--fort-ease)]',
        'active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        SHAPE_CLASSES[size][shape],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    />
  );
}

