'use client';

import * as React from 'react';
import { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import { cn } from '@/lib/utils';

export interface OTPInputProps
  extends Omit<React.ComponentProps<typeof BaseOTPField.Root>, 'children'> {
  slotClassName?: string;
}

/**
 * Verification code input built on Base UI OTPField.
 */
export function OTPInput({
  length = 6,
  className,
  slotClassName,
  ...props
}: OTPInputProps) {
  return (
    <BaseOTPField.Root
      length={length}
      className={cn('fort-ui inline-flex items-center gap-2', className)}
      {...props}
    >
      {Array.from({ length }, (_, index) => (
        <BaseOTPField.Input
          key={index}
          aria-label={`Digit ${index + 1}`}
          className={cn(
            'size-11 rounded-[12px] border border-[var(--fort-separator)] bg-[var(--fort-surface-muted)]/75 text-center text-[18px] font-semibold tabular-nums text-[var(--fort-label)]',
            'transition-[background-color,border-color,transform] duration-150 ease-[var(--fort-ease)]',
            'focus:border-[var(--fort-tint)] focus:bg-[var(--fort-surface)] focus:outline-none',
            'data-[filled]:border-[var(--fort-tint)]/45 data-[filled]:bg-[var(--fort-surface)]',
            'disabled:cursor-not-allowed disabled:opacity-45',
            slotClassName,
          )}
        />
      ))}
    </BaseOTPField.Root>
  );
}

