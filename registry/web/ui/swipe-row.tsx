'use client';

import * as React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SwipeRowAction {
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'tinted' | 'destructive';
  onAction: () => void;
}

export interface SwipeRowProps {
  children: React.ReactNode;
  actions: SwipeRowAction[];
  className?: string;
}

const ACTION_VARIANTS: Record<NonNullable<SwipeRowAction['variant']>, string> = {
  default: 'bg-[var(--fort-surface-muted)] text-[var(--fort-label)]',
  tinted: 'bg-[var(--fort-tint)] text-white',
  destructive: 'bg-[var(--fort-destructive)] text-white',
};

/**
 * Swipeable list row revealing contextual actions via drag or keyboard button.
 */
export function SwipeRow({ children, actions, className }: SwipeRowProps) {
  const actionWidth = Math.min(actions.length * 76, 228);
  const [offset, setOffset] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const startXRef = React.useRef<number | null>(null);
  const startOffsetRef = React.useRef(0);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest('button, a, input')) return;
    startXRef.current = event.clientX;
    startOffsetRef.current = offset;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging || startXRef.current === null) return;
    const delta = event.clientX - startXRef.current;
    const raw = startOffsetRef.current + delta;
    const clamped = Math.max(-actionWidth, Math.min(0, raw));
    setOffset(clamped);
  }

  function handlePointerUp() {
    if (!dragging) return;
    setDragging(false);
    startXRef.current = null;
    setOffset(offset < -actionWidth / 2 ? -actionWidth : 0);
  }

  const isRevealed = offset < 0;

  return (
    <div
      className={cn(
        'fort-ui relative overflow-hidden rounded-[14px] border border-[var(--fort-separator)] bg-[var(--fort-surface)]',
        className,
      )}
    >
      <div
        className="absolute inset-y-0 right-0 flex items-stretch"
        style={{ width: `${actionWidth}px` }}
        aria-hidden={!isRevealed}
      >
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            tabIndex={isRevealed ? 0 : -1}
            onClick={() => {
              action.onAction();
              setOffset(0);
            }}
            className={cn(
              'flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 px-2 text-[12px] font-semibold select-none',
              'transition-opacity duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white',
              ACTION_VARIANTS[action.variant ?? 'default'],
            )}
          >
            {action.icon}
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ transform: `translateX(${offset}px)` }}
        className={cn(
          'relative z-1 flex min-h-[56px] items-center justify-between gap-3 bg-[var(--fort-surface)] px-4 py-3 touch-pan-y',
          !dragging &&
            'transition-transform duration-250 ease-[var(--fort-ease)]',
        )}
      >
        <div className="min-w-0 flex-1">{children}</div>
        <button
          type="button"
          aria-expanded={isRevealed}
          aria-label={isRevealed ? 'Hide row actions' : 'Show row actions'}
          onClick={() => setOffset(isRevealed ? 0 : -actionWidth)}
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[var(--fort-label-secondary)] transition-colors hover:bg-[var(--fort-surface-muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]"
        >
          <MoreHorizontal aria-hidden="true" className="size-4" />
        </button>
      </div>
    </div>
  );
}

