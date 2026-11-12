'use client';

import * as React from 'react';
import { Select as BaseSelect } from '@base-ui/react/select';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Select = BaseSelect.Root;
export const SelectGroup = BaseSelect.Group;

export interface SelectTriggerProps
  extends React.ComponentProps<typeof BaseSelect.Trigger> {
  placeholder?: React.ReactNode;
}

/**
 * Accessible picker trigger and popup built on Base UI Select.
 */
export function SelectTrigger({
  className,
  placeholder = 'Select option',
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger
      className={cn(
        'fort-ui inline-flex h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-[12px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] px-3.5 text-[15px] text-[var(--fort-label)]',
        'transition-colors duration-150 hover:bg-[var(--fort-surface-muted)]/45',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45',
        className,
      )}
      {...props}
    >
      {children ?? <BaseSelect.Value placeholder={placeholder} className="truncate" />}
      <BaseSelect.Icon className="shrink-0 text-[var(--fort-label-secondary)]">
        <ChevronsUpDown aria-hidden="true" className="size-4" />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

export interface SelectContentProps
  extends React.ComponentProps<typeof BaseSelect.Popup> {
  sideOffset?: number;
}

export function SelectContent({
  className,
  children,
  sideOffset = 6,
  ...props
}: SelectContentProps) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner sideOffset={sideOffset} className="z-50">
        <BaseSelect.Popup
          className={cn(
            'fort-ui min-w-[var(--anchor-width)] overflow-hidden rounded-[14px] border border-[var(--fort-separator)] bg-[var(--fort-surface)]/95 p-1 shadow-xl backdrop-blur-xl',
            'origin-[var(--transform-origin)] transition-[transform,opacity] duration-150 ease-[var(--fort-ease)]',
            'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
            'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
            'focus-visible:outline-none',
            className,
          )}
          {...props}
        >
          <BaseSelect.List className="max-h-64 overflow-y-auto">
            {children}
          </BaseSelect.List>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

export function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.GroupLabel>) {
  return (
    <BaseSelect.GroupLabel
      className={cn(
        'px-3 py-1.5 text-[12px] font-semibold text-[var(--fort-label-secondary)]',
        className,
      )}
      {...props}
    />
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item
      className={cn(
        'flex min-h-[40px] cursor-pointer items-center justify-between gap-3 rounded-[10px] px-3 py-2 text-[14px] font-medium text-[var(--fort-label)] select-none',
        'outline-none transition-colors duration-100',
        'data-[highlighted]:bg-[var(--fort-surface-muted)]/80',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-45',
        className,
      )}
      {...props}
    >
      <BaseSelect.ItemText className="truncate">{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator className="shrink-0 text-[var(--fort-tint-text)]">
        <Check aria-hidden="true" className="size-4" />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
}

