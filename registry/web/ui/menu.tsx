'use client';

import * as React from 'react';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { cn } from '@/lib/utils';

export const Menu = BaseMenu.Root;
export const MenuTrigger = BaseMenu.Trigger;
export const MenuGroup = BaseMenu.Group;

export interface MenuContentProps
  extends React.ComponentProps<typeof BaseMenu.Popup> {
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
}

/**
 * Translucent context popup menu built on Base UI Menu.
 */
export function MenuContent({
  className,
  sideOffset = 6,
  align = 'end',
  ...props
}: MenuContentProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner sideOffset={sideOffset} align={align} className="z-50">
        <BaseMenu.Popup
          className={cn(
            'fort-ui min-w-[200px] overflow-hidden rounded-[14px] border border-[var(--fort-separator)] bg-[var(--fort-surface)]/95 p-1 shadow-xl backdrop-blur-xl',
            'origin-[var(--transform-origin)] transition-[transform,opacity] duration-150 ease-[var(--fort-ease)]',
            'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
            'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
            'focus-visible:outline-none',
            className,
          )}
          {...props}
        />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export interface MenuItemProps
  extends React.ComponentProps<typeof BaseMenu.Item> {
  destructive?: boolean;
}

export function MenuItem({
  className,
  destructive = false,
  ...props
}: MenuItemProps) {
  return (
    <BaseMenu.Item
      className={cn(
        'flex min-h-[40px] cursor-pointer items-center justify-between gap-3 rounded-[10px] px-3 py-2 text-[14px] font-medium select-none',
        'outline-none transition-colors duration-100',
        'data-[highlighted]:bg-[var(--fort-surface-muted)]/80',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-45',
        destructive
          ? 'text-[var(--fort-destructive-text)]'
          : 'text-[var(--fort-label)]',
        className,
      )}
      {...props}
    />
  );
}

export function MenuGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.GroupLabel>) {
  return (
    <BaseMenu.GroupLabel
      className={cn(
        'px-3 py-1.5 text-[12px] font-semibold text-[var(--fort-label-secondary)]',
        className,
      )}
      {...props}
    />
  );
}

export function MenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.Separator>) {
  return (
    <BaseMenu.Separator
      className={cn('my-1 h-px bg-[var(--fort-separator)]', className)}
      {...props}
    />
  );
}

