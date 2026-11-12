import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GroupedListProps extends React.ComponentProps<'section'> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Grouped settings-style container with hairline row dividers and subtle elevation.
 */
export function GroupedList({
  header,
  footer,
  className,
  children,
  ...props
}: GroupedListProps) {
  return (
    <section className={cn('fort-ui flex flex-col', className)} {...props}>
      {header ? (
        <div className="px-4 pb-1.5 text-[13px] font-medium text-[var(--fort-label-secondary)]">
          {header}
        </div>
      ) : null}
      <div className="overflow-hidden rounded-[14px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] divide-y divide-[var(--fort-separator)]">
        {children}
      </div>
      {footer ? (
        <div className="px-4 pt-1.5 text-[12px] leading-relaxed text-[var(--fort-label-secondary)]">
          {footer}
        </div>
      ) : null}
    </section>
  );
}

export interface GroupedListItemProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  chevron?: boolean;
  destructive?: boolean;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function GroupedListItem({
  title,
  subtitle,
  leading,
  trailing,
  chevron = false,
  destructive = false,
  disabled = false,
  href,
  onClick,
  className,
}: GroupedListItemProps) {
  const rowClassName = cn(
    'flex min-h-[48px] w-full items-center gap-3 px-4 py-2.5 text-left',
    'transition-colors duration-150',
    (onClick || href) &&
      !disabled &&
      'cursor-pointer hover:bg-[var(--fort-surface-muted)]/45 active:bg-[var(--fort-surface-muted)]',
    'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--fort-tint)]',
    disabled && 'pointer-events-none opacity-45',
    className,
  );

  const content = (
    <>
      {leading ? (
        <span className="flex shrink-0 items-center justify-center text-[var(--fort-label-secondary)]">
          {leading}
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            'block truncate text-[15px] leading-snug font-medium',
            destructive
              ? 'text-[var(--fort-destructive-text)]'
              : 'text-[var(--fort-label)]',
          )}
        >
          {title}
        </span>
        {subtitle ? (
          <span className="mt-0.5 block truncate text-[13px] leading-snug text-[var(--fort-label-secondary)]">
            {subtitle}
          </span>
        ) : null}
      </span>
      {trailing ? (
        <span className="flex shrink-0 items-center gap-2 text-[14px] text-[var(--fort-label-secondary)]">
          {trailing}
        </span>
      ) : null}
      {chevron ? (
        <ChevronRight
          aria-hidden="true"
          className="size-4 shrink-0 text-[var(--fort-label-secondary)]/70"
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <a href={href} className={rowClassName} aria-disabled={disabled || undefined}>
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={rowClassName}
      >
        {content}
      </button>
    );
  }

  return <div className={rowClassName}>{content}</div>;
}

