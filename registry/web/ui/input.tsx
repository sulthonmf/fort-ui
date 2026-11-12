'use client';

import * as React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type InputProps = React.ComponentProps<'input'>;

/**
 * Minimalist text field with a soft filled surface and clear focus border.
 */
export function Input({ className, type = 'text', ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'fort-ui flex h-11 w-full rounded-[12px] border border-transparent bg-[var(--fort-surface-muted)]/80 px-3.5 text-[15px] text-[var(--fort-label)]',
        'placeholder:text-[var(--fort-label-secondary)]',
        'transition-[background-color,border-color] duration-150 ease-[var(--fort-ease)]',
        'focus:border-[var(--fort-tint)] focus:bg-[var(--fort-surface)] focus:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-45',
        className,
      )}
      {...props}
    />
  );
}

export interface SearchBarProps
  extends Omit<React.ComponentProps<'input'>, 'type'> {
  onClear?: () => void;
}

/**
 * Search field with leading search icon and inline clear button.
 */
export function SearchBar({
  className,
  value,
  defaultValue,
  onChange,
  onClear,
  placeholder = 'Search',
  ...props
}: SearchBarProps) {
  const [internalValue, setInternalValue] = React.useState(
    String(defaultValue ?? ''),
  );
  const isControlled = value !== undefined;
  const currentValue = isControlled ? String(value) : internalValue;
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!isControlled) {
      setInternalValue(event.target.value);
    }
    onChange?.(event);
  }

  function handleClear() {
    if (!isControlled) {
      setInternalValue('');
    }
    onClear?.();
    if (inputRef.current && isControlled) {
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      )?.set;
      nativeSetter?.call(inputRef.current, '');
      inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
    inputRef.current?.focus();
  }

  return (
    <div className={cn('fort-ui relative flex w-full items-center', className)}>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 size-4 text-[var(--fort-label-secondary)]"
      />
      <input
        ref={inputRef}
        type="search"
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'flex h-10 w-full rounded-[12px] border border-transparent bg-[var(--fort-surface-muted)]/80 pr-9 pl-9 text-[15px] text-[var(--fort-label)]',
          'placeholder:text-[var(--fort-label-secondary)]',
          '[&::-webkit-search-cancel-button]:hidden',
          'transition-[background-color,border-color] duration-150 ease-[var(--fort-ease)]',
          'focus:border-[var(--fort-tint)] focus:bg-[var(--fort-surface)] focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-45',
        )}
        {...props}
      />
      {currentValue.length > 0 ? (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-2 flex size-6 cursor-pointer items-center justify-center rounded-full bg-[var(--fort-label-secondary)]/25 text-[var(--fort-label)] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]"
        >
          <X aria-hidden="true" className="size-3.5" />
        </button>
      ) : null}
    </div>
  );
}

