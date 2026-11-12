'use client';

import * as React from 'react';
import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import { cn } from '@/lib/utils';

export const ActionSheet = BaseDrawer.Root;
export const ActionSheetTrigger = BaseDrawer.Trigger;

/**
 * Stacked bottom action sheet with a separated cancel card.
 */
export function ActionSheetContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Popup>) {
  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop
        className={cn(
          'fixed inset-0 z-50 bg-black/35 backdrop-blur-[2px]',
          'transition-opacity duration-250 ease-[var(--fort-ease)]',
          'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        )}
      />
      <BaseDrawer.Viewport className="fixed inset-0 z-50 flex items-end justify-center p-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <BaseDrawer.Popup
          className={cn(
            'fort-ui w-full max-w-sm',
            'translate-y-[var(--drawer-swipe-movement-y)]',
            'transition-transform duration-[calc(340ms*var(--drawer-swipe-strength,1))] ease-[var(--fort-ease)]',
            'data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full',
            'data-[swiping]:transition-none data-[swiping]:select-none',
            className,
          )}
          {...props}
        >
          <BaseDrawer.Content className="flex flex-col gap-2">
            {children}
          </BaseDrawer.Content>
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  );
}

export function ActionSheetGroup({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[16px] border border-[var(--fort-separator)] bg-[var(--fort-surface)]/95 shadow-xl backdrop-blur-xl divide-y divide-[var(--fort-separator)]',
        className,
      )}
      {...props}
    />
  );
}

export function ActionSheetHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('px-4 py-3 text-center', className)} {...props} />
  );
}

export function ActionSheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Title>) {
  return (
    <BaseDrawer.Title
      className={cn(
        'text-[13px] leading-snug font-semibold text-[var(--fort-label-secondary)]',
        className,
      )}
      {...props}
    />
  );
}

export function ActionSheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Description>) {
  return (
    <BaseDrawer.Description
      className={cn(
        'mt-0.5 text-[12px] leading-relaxed text-[var(--fort-label-secondary)]',
        className,
      )}
      {...props}
    />
  );
}

export interface ActionSheetItemProps
  extends React.ComponentProps<typeof BaseDrawer.Close> {
  variant?: 'default' | 'destructive';
}

export function ActionSheetItem({
  className,
  variant = 'default',
  ...props
}: ActionSheetItemProps) {
  return (
    <BaseDrawer.Close
      className={cn(
        'flex min-h-[52px] w-full cursor-pointer items-center justify-center px-4 text-[17px] font-normal',
        'transition-colors duration-150 hover:bg-[var(--fort-surface-muted)]/55 active:bg-[var(--fort-surface-muted)]',
        'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--fort-tint)]',
        variant === 'destructive'
          ? 'text-[var(--fort-destructive-text)]'
          : 'text-[var(--fort-tint-text)]',
        className,
      )}
      {...props}
    />
  );
}

export function ActionSheetCancel({
  className,
  children = 'Cancel',
  ...props
}: React.ComponentProps<typeof BaseDrawer.Close>) {
  return (
    <BaseDrawer.Close
      className={cn(
        'flex min-h-[52px] w-full cursor-pointer items-center justify-center rounded-[16px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] px-4 text-[17px] font-semibold text-[var(--fort-tint-text)] shadow-xl',
        'transition-colors duration-150 hover:bg-[var(--fort-surface-muted)]/55 active:bg-[var(--fort-surface-muted)]',
        'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--fort-tint)]',
        className,
      )}
      {...props}
    >
      {children}
    </BaseDrawer.Close>
  );
}

