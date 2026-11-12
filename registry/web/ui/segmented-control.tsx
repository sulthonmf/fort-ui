'use client';

import * as React from 'react';
import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { cn } from '@/lib/utils';

export type SegmentedControlProps = React.ComponentProps<typeof BaseTabs.Root>;

/**
 * Segmented control with a sliding active pill powered by Base UI Tabs.
 */
export function SegmentedControl({
  className,
  ...props
}: SegmentedControlProps) {
  return (
    <BaseTabs.Root
      className={cn('fort-ui flex flex-col gap-3', className)}
      {...props}
    />
  );
}

export interface SegmentedControlListProps
  extends React.ComponentProps<typeof BaseTabs.List> {
  fullWidth?: boolean;
}

export function SegmentedControlList({
  className,
  children,
  fullWidth = false,
  ...props
}: SegmentedControlListProps) {
  return (
    <BaseTabs.List
      className={cn(
        'relative inline-flex items-center rounded-[10px] bg-[var(--fort-surface-muted)] p-[3px]',
        fullWidth && 'flex w-full',
        className,
      )}
      {...props}
    >
      <BaseTabs.Indicator
        renderBeforeHydration
        className={cn(
          'pointer-events-none absolute top-[var(--active-tab-top)] left-0 z-0',
          'h-[var(--active-tab-height)] w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)]',
          'rounded-[7px] bg-[var(--fort-surface)]',
          'shadow-[0_1px_2px_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.06)]',
          'transition-[transform,width] duration-200 ease-[var(--fort-ease)]',
        )}
      />
      {children}
    </BaseTabs.List>
  );
}

export type SegmentedControlTriggerProps = React.ComponentProps<
  typeof BaseTabs.Tab
>;

export function SegmentedControlTrigger({
  className,
  ...props
}: SegmentedControlTriggerProps) {
  return (
    <BaseTabs.Tab
      className={cn(
        'relative z-1 flex-1 cursor-pointer rounded-[7px] px-3.5 py-1.5 text-center text-[13px] font-medium select-none',
        'text-[var(--fort-label-secondary)] data-[active]:font-semibold data-[active]:text-[var(--fort-label)]',
        'transition-colors duration-150',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-45',
        className,
      )}
      {...props}
    />
  );
}

export type SegmentedControlContentProps = React.ComponentProps<
  typeof BaseTabs.Panel
>;

export function SegmentedControlContent({
  className,
  ...props
}: SegmentedControlContentProps) {
  return (
    <BaseTabs.Panel
      className={cn(
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]',
        className,
      )}
      {...props}
    />
  );
}

