import * as React from 'react';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavBarProps extends React.ComponentProps<'header'> {
  translucent?: boolean;
  bordered?: boolean;
}

/**
 * Mobile-style top navigation bar with centered title and left/right slots.
 */
export function NavBar({
  translucent = true,
  bordered = true,
  className,
  children,
  ...props
}: NavBarProps) {
  return (
    <header
      className={cn(
        'fort-ui flex min-h-[52px] w-full items-center justify-between gap-2 px-3 py-2',
        translucent
          ? 'bg-[var(--fort-surface)]/85 backdrop-blur-xl'
          : 'bg-[var(--fort-surface)]',
        bordered && 'border-b border-[var(--fort-separator)]',
        className,
      )}
      {...props}
    >
      {children}
    </header>
  );
}

export interface NavBarBackProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function NavBarBack({
  label = 'Back',
  href,
  onClick,
  className,
}: NavBarBackProps) {
  const classes = cn(
    'inline-flex min-h-[44px] items-center gap-0.5 rounded-[10px] pr-2 pl-1 text-[16px] font-medium text-[var(--fort-tint-text)]',
    'transition-opacity duration-150 hover:opacity-80 active:opacity-60',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]',
    className,
  );

  const inner = (
    <>
      <ChevronLeft aria-hidden="true" className="size-5 shrink-0" />
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cn(classes, 'cursor-pointer')}>
      {inner}
    </button>
  );
}

export function NavBarTitle({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'min-w-0 flex-1 truncate text-center text-[17px] font-semibold text-[var(--fort-label)]',
        className,
      )}
      {...props}
    />
  );
}

export function NavBarActions({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex shrink-0 items-center justify-end gap-1', className)}
      {...props}
    />
  );
}

export function LargeTitle({
  className,
  ...props
}: React.ComponentProps<'h1'>) {
  return (
    <h1
      className={cn(
        'fort-ui px-4 pt-2 pb-3 text-[32px] leading-tight font-bold tracking-tight text-[var(--fort-label)]',
        className,
      )}
      {...props}
    />
  );
}

