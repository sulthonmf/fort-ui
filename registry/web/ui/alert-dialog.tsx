'use client';

import * as React from 'react';
import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import { cn } from '@/lib/utils';

export const AlertDialog = BaseAlertDialog.Root;
export const AlertDialogTrigger = BaseAlertDialog.Trigger;

export type AlertDialogContentProps = React.ComponentProps<
  typeof BaseAlertDialog.Popup
>;

/**
 * Centered alert dialog with hairline action dividers and smooth spring scale.
 */
export function AlertDialogContent({
  className,
  children,
  ...props
}: AlertDialogContentProps) {
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop
        className={cn(
          'fixed inset-0 z-50 bg-black/35 backdrop-blur-[2px]',
          'transition-opacity duration-200 ease-[var(--fort-ease)]',
          'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        )}
      />
      <BaseAlertDialog.Popup
        className={cn(
          'fort-ui fixed top-1/2 left-1/2 z-50 w-[calc(100%-2.5rem)] max-w-[300px]',
          '-translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[20px]',
          'border border-[var(--fort-separator)] bg-[var(--fort-surface)]/95 shadow-2xl backdrop-blur-xl',
          'transition-[transform,opacity] duration-200 ease-[var(--fort-ease)]',
          'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
          'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
          className,
        )}
        {...props}
      >
        {children}
      </BaseAlertDialog.Popup>
    </BaseAlertDialog.Portal>
  );
}

export function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('px-5 pt-5 pb-4 text-center', className)}
      {...props}
    />
  );
}

export function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Title>) {
  return (
    <BaseAlertDialog.Title
      className={cn(
        'text-[17px] leading-snug font-semibold text-[var(--fort-label)]',
        className,
      )}
      {...props}
    />
  );
}

export function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Description>) {
  return (
    <BaseAlertDialog.Description
      className={cn(
        'mt-1.5 text-[13px] leading-relaxed text-[var(--fort-label-secondary)]',
        className,
      )}
      {...props}
    />
  );
}

export function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex flex-col border-t border-[var(--fort-separator)] sm:flex-row',
        'divide-y divide-[var(--fort-separator)] sm:divide-x sm:divide-y-0',
        className,
      )}
      {...props}
    />
  );
}

export interface AlertDialogActionProps
  extends React.ComponentProps<typeof BaseAlertDialog.Close> {
  variant?: 'default' | 'destructive';
}

export function AlertDialogAction({
  className,
  variant = 'default',
  ...props
}: AlertDialogActionProps) {
  return (
    <BaseAlertDialog.Close
      className={cn(
        'flex min-h-[44px] flex-1 cursor-pointer items-center justify-center px-4 text-[16px] font-semibold',
        'transition-colors duration-150 hover:bg-[var(--fort-surface-muted)]/50 active:bg-[var(--fort-surface-muted)]',
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

export function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Close>) {
  return (
    <BaseAlertDialog.Close
      className={cn(
        'flex min-h-[44px] flex-1 cursor-pointer items-center justify-center px-4 text-[16px] font-normal text-[var(--fort-label)]',
        'transition-colors duration-150 hover:bg-[var(--fort-surface-muted)]/50 active:bg-[var(--fort-surface-muted)]',
        'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--fort-tint)]',
        className,
      )}
      {...props}
    />
  );
}

