'use client';

import * as React from 'react';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { Radio as BaseRadio } from '@base-ui/react/radio';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export type RadioGroupProps<Value = string> = React.ComponentProps<
  typeof BaseRadioGroup<Value>
>;

/**
 * Accessible single-choice radio group built on Base UI RadioGroup.
 */
export function RadioGroup<Value = string>({
  className,
  ...props
}: RadioGroupProps<Value>) {
  return (
    <BaseRadioGroup
      className={cn('fort-ui flex flex-col gap-2.5', className)}
      {...props}
    />
  );
}

export interface RadioItemProps
  extends React.ComponentProps<typeof BaseRadio.Root> {
  label?: React.ReactNode;
}

export function RadioItem({ className, label, ...props }: RadioItemProps) {
  const control = (
    <BaseRadio.Root
      className={cn(
        'flex size-[22px] shrink-0 cursor-pointer items-center justify-center rounded-full border-[1.5px]',
        'border-[var(--fort-label-secondary)]/45 bg-transparent',
        'data-[checked]:border-[var(--fort-tint)] data-[checked]:bg-[var(--fort-tint)]',
        'transition-[background-color,border-color,transform] duration-150 ease-[var(--fort-ease)] active:scale-[0.92]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45',
        !label && className,
      )}
      {...props}
    >
      <BaseRadio.Indicator className="size-2 rounded-full bg-white" />
    </BaseRadio.Root>
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

export interface RadioListItemProps
  extends Omit<React.ComponentProps<typeof BaseRadio.Root>, 'title'> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

/**
 * Checkmark-row variant inspired by mobile settings selection lists.
 */
export function RadioListItem({
  title,
  subtitle,
  className,
  ...props
}: RadioListItemProps) {
  return (
    <label
      className={cn(
        'fort-ui flex min-h-[48px] w-full cursor-pointer items-center justify-between gap-3 px-4 py-2.5 select-none',
        'transition-colors duration-150 hover:bg-[var(--fort-surface-muted)]/45 active:bg-[var(--fort-surface-muted)]',
        props.disabled && 'pointer-events-none opacity-45',
        className,
      )}
    >
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-medium text-[var(--fort-label)]">
          {title}
        </span>
        {subtitle ? (
          <span className="mt-0.5 block truncate text-[13px] text-[var(--fort-label-secondary)]">
            {subtitle}
          </span>
        ) : null}
      </span>
      <BaseRadio.Root
        className="flex size-5 shrink-0 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]"
        {...props}
      >
        <BaseRadio.Indicator className="text-[var(--fort-tint-text)]">
          <Check aria-hidden="true" className="size-4 stroke-[2.5]" />
        </BaseRadio.Indicator>
      </BaseRadio.Root>
    </label>
  );
}
