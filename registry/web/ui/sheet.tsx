'use client';

import * as React from 'react';
import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import { cn } from '@/lib/utils';

export const Sheet = BaseDrawer.Root;
export const SheetTrigger = BaseDrawer.Trigger;
export const SheetClose = BaseDrawer.Close;

export interface SheetContentProps
  extends React.ComponentProps<typeof BaseDrawer.Popup> {
  showHandle?: boolean;
}

/**
 * Swipeable bottom sheet built on Base UI Drawer.
 */
export function SheetContent({
  className,
  children,
  showHandle = true,
  ...props
}: SheetContentProps) {
  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop
        className={cn(
          'fixed inset-0 z-50 bg-black/35 backdrop-blur-[2px]',
          'transition-opacity duration-300 ease-[var(--fort-ease)]',
          'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        )}
      />
      <BaseDrawer.Viewport className="fixed inset-0 z-50 flex items-end justify-center sm:p-4">
        <BaseDrawer.Popup
          className={cn(
            'fort-ui w-full max-w-md overflow-hidden rounded-t-[24px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] shadow-2xl sm:rounded-[24px]',
            'translate-y-[var(--drawer-swipe-movement-y)]',
            'transition-transform duration-[calc(360ms*var(--drawer-swipe-strength,1))] ease-[var(--fort-ease)]',
            'data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full',
            'data-[swiping]:transition-none data-[swiping]:select-none',
            'focus-visible:outline-2 focus-visible:outline-[var(--fort-tint)]',
            className,
          )}
          {...props}
        >
          {showHandle ? (
            <div className="flex justify-center pt-2.5 pb-1">
              <span
                aria-hidden="true"
                className="h-1.5 w-10 rounded-full bg-[var(--fort-surface-pressed)]"
              />
            </div>
          ) : null}
          <BaseDrawer.Content className="max-h-[85dvh] overflow-y-auto px-5 pt-2 pb-6">
            {children}
          </BaseDrawer.Content>
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  );
}

export function SheetHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('mb-4 space-y-1 text-left', className)} {...props} />
  );
}

export function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Title>) {
  return (
    <BaseDrawer.Title
      className={cn(
        'text-[18px] leading-snug font-semibold text-[var(--fort-label)]',
        className,
      )}
      {...props}
    />
  );
}

export function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Description>) {
  return (
    <BaseDrawer.Description
      className={cn(
        'text-[14px] leading-relaxed text-[var(--fort-label-secondary)]',
        className,
      )}
      {...props}
    />
  );
}

