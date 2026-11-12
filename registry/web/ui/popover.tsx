'use client';

import * as React from 'react';
import { Popover as BasePopover } from '@base-ui/react/popover';
import { cn } from '@/lib/utils';

export const Popover = BasePopover.Root;
export const PopoverTrigger = BasePopover.Trigger;
export const PopoverClose = BasePopover.Close;

export interface PopoverContentProps
  extends React.ComponentProps<typeof BasePopover.Popup> {
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
}

/**
 * Floating popover card built on Base UI Popover.
 */
export function PopoverContent({
  className,
  sideOffset = 8,
  align = 'center',
  ...props
}: PopoverContentProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner sideOffset={sideOffset} align={align} className="z-50">
        <BasePopover.Popup
          className={cn(
            'fort-ui w-72 rounded-[16px] border border-[var(--fort-separator)] bg-[var(--fort-surface)]/95 p-4 shadow-xl backdrop-blur-xl',
            'origin-[var(--transform-origin)] transition-[transform,opacity] duration-150 ease-[var(--fort-ease)]',
            'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
            'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
            'focus-visible:outline-2 focus-visible:outline-[var(--fort-tint)]',
            className,
          )}
          {...props}
        />
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

export function PopoverTitle({
  className,
  ...props
}: React.ComponentProps<typeof BasePopover.Title>) {
  return (
    <BasePopover.Title
      className={cn('text-[15px] font-semibold text-[var(--fort-label)]', className)}
      {...props}
    />
  );
}

export function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<typeof BasePopover.Description>) {
  return (
    <BasePopover.Description
      className={cn(
        'mt-1 text-[13px] leading-relaxed text-[var(--fort-label-secondary)]',
        className,
      )}
      {...props}
    />
  );
}

