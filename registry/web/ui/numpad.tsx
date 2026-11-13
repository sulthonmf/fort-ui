'use client';

import * as React from 'react';
import { Delete } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NumpadKey {
  value: string;
  sub?: string;
}

const DEFAULT_KEYS: NumpadKey[] = [
  { value: '1', sub: '' },
  { value: '2', sub: 'ABC' },
  { value: '3', sub: 'DEF' },
  { value: '4', sub: 'GHI' },
  { value: '5', sub: 'JKL' },
  { value: '6', sub: 'MNO' },
  { value: '7', sub: 'PQRS' },
  { value: '8', sub: 'TUV' },
  { value: '9', sub: 'WXYZ' },
];

export interface NumpadProps
  extends Omit<React.ComponentProps<'div'>, 'onChange' | 'onKeyPress'> {
  onKeyPress?: (key: string) => void;
  onDelete?: () => void;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  disabled?: boolean;
}

/**
 * Mobile-first 3x4 virtual numeric keypad for passcode and monetary inputs.
 */
export function Numpad({
  onKeyPress,
  onDelete,
  leftAction,
  rightAction,
  disabled = false,
  className,
  ...props
}: NumpadProps) {
  return (
    <div
      role="group"
      aria-label="Numeric Keypad"
      className={cn(
        'fort-ui grid grid-cols-3 gap-3.5 mx-auto w-full max-w-[280px] select-none',
        disabled && 'pointer-events-none opacity-45',
        className,
      )}
      {...props}
    >
      {/* 1 through 9 */}
      {DEFAULT_KEYS.map((key) => (
        <button
          key={key.value}
          type="button"
          disabled={disabled}
          onClick={() => onKeyPress?.(key.value)}
          className={cn(
            'flex size-[72px] flex-col items-center justify-center rounded-full bg-[var(--fort-surface-muted)] text-[var(--fort-label)]',
            'transition-[transform,background-color] duration-100 ease-[var(--fort-ease)]',
            'hover:brightness-95 active:scale-90 active:bg-[var(--fort-surface-pressed)]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]',
          )}
        >
          <span className="text-[26px] font-medium leading-none">{key.value}</span>
          {key.sub ? (
            <span className="mt-0.5 text-[9px] font-bold tracking-widest text-[var(--fort-label-secondary)]">
              {key.sub}
            </span>
          ) : (
            <span className="h-[9px]" />
          )}
        </button>
      ))}

      {/* Row 4: Left Action */}
      <div className="flex size-[72px] items-center justify-center">
        {leftAction ?? <span />}
      </div>

      {/* Row 4: 0 Key */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onKeyPress?.('0')}
        className={cn(
          'flex size-[72px] flex-col items-center justify-center rounded-full bg-[var(--fort-surface-muted)] text-[var(--fort-label)]',
          'transition-[transform,background-color] duration-100 ease-[var(--fort-ease)]',
          'hover:brightness-95 active:scale-90 active:bg-[var(--fort-surface-pressed)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]',
        )}
      >
        <span className="text-[26px] font-medium leading-none">0</span>
      </button>

      {/* Row 4: Right Action (Default Backspace) */}
      <div className="flex size-[72px] items-center justify-center">
        {rightAction !== undefined ? (
          rightAction
        ) : (
          <button
            type="button"
            aria-label="Delete last digit"
            disabled={disabled}
            onClick={() => onDelete?.()}
            className={cn(
              'flex size-[72px] items-center justify-center rounded-full text-[var(--fort-label)]',
              'transition-[transform,opacity] duration-100 ease-[var(--fort-ease)]',
              'hover:text-[var(--fort-tint-text)] active:scale-90',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]',
            )}
          >
            <Delete className="size-6 stroke-[1.8]" />
          </button>
        )}
      </div>
    </div>
  );
}
