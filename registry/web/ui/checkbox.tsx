'use client';

import * as React from 'react';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps
  extends React.ComponentProps<typeof BaseCheckbox.Root> {
  label?: React.ReactNode;
}

/**
 * Circular selection checkbox built on Base UI Checkbox.
 */
export function Checkbox({
  className,
  label,
  indeterminate,
  ...props
}: CheckboxProps) {
  const control = (
    <BaseCheckbox.Root
      indeterminate={indeterminate}
      className={cn(
        'flex size-[22px] shrink-0 cursor-pointer items-center justify-center rounded-full border-[1.5px]',
        'border-[var(--fort-label-secondary)]/45 bg-transparent text-white',
        'data-[checked]:border-[var(--fort-tint)] data-[checked]:bg-[var(--fort-tint)]',
        'data-[indeterminate]:border-[var(--fort-tint)] data-[indeterminate]:bg-[var(--fort-tint)]',
        'transition-[background-color,border-color,transform] duration-150 ease-[var(--fort-ease)] active:scale-[0.92]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45',
        !label && className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator className="flex items-center justify-center">
        {indeterminate ? (
          <Minus aria-hidden="true" className="size-3.5 stroke-[2.75]" />
        ) : (
          <Check aria-hidden="true" className="size-3.5 stroke-[2.75]" />
        )}
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );

  if (!label) {
    return control;
  }

  return (
    <label
      className={cn(
        'fort-ui inline-flex cursor-pointer items-center gap-2.5 text-[15px] text-[var(--fort-label)] select-none',
        props.disabled && 'cursor-not-allowed opacity-55',
        className,
      )}
    >
      {control}
      <span>{label}</span>
    </label>
  );
}

