'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ActivityPillProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  compact: React.ReactNode;
  expanded: React.ReactNode;
  className?: string;
  label?: string;
}

/**
 * Interactive floating status pill that morphs smoothly between compact and expanded states.
 */
export function ActivityPill({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  compact,
  expanded,
  className,
  label = 'Toggle activity details',
}: ActivityPillProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const containerRef = React.useRef<HTMLDivElement>(null);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  React.useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen, setOpen]);

  return (
    <div ref={containerRef} className={cn('fort-ui flex justify-center', className)}>
      <div
        className={cn(
          'relative overflow-hidden border border-white/10 bg-[#111113] text-[#f5f5f7] shadow-xl',
          'transition-[width,border-radius,padding] duration-300 ease-[var(--fort-ease)]',
          isOpen
            ? 'w-full max-w-[340px] rounded-[26px] p-4'
            : 'w-auto min-w-[210px] max-w-[290px] rounded-full px-3.5 py-2',
        )}
      >
        {!isOpen ? (
          <button
            type="button"
            aria-expanded={false}
            aria-label={label}
            onClick={() => setOpen(true)}
            className="flex w-full cursor-pointer items-center justify-between gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]"
          >
            {compact}
          </button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">{expanded}</div>
              <button
                type="button"
                aria-expanded={true}
                aria-label="Collapse activity"
                onClick={() => setOpen(false)}
                className="shrink-0 cursor-pointer rounded-full bg-white/12 px-2.5 py-1 text-[12px] font-medium text-white/90 transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

