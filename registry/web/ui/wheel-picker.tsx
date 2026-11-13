'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface WheelPickerItem {
  value: string;
  label: React.ReactNode;
}

export interface WheelPickerProps
  extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  items: (WheelPickerItem | string)[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  itemHeight?: number;
  visibleCount?: number;
}

/**
 * Cupertino-inspired drum roll wheel picker with snap scrolling and keyboard support.
 */
export function WheelPicker({
  items,
  value: controlledValue,
  defaultValue,
  onValueChange,
  itemHeight = 40,
  visibleCount = 5,
  className,
  ...props
}: WheelPickerProps) {
  const normalizedItems: WheelPickerItem[] = React.useMemo(
    () =>
      items.map((item) =>
        typeof item === 'string' ? { value: item, label: item } : item,
      ),
    [items],
  );

  const initialValue =
    controlledValue ?? defaultValue ?? normalizedItems[0]?.value ?? '';
  const [internalValue, setInternalValue] = React.useState(initialValue);
  const selectedValue = controlledValue ?? internalValue;

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isScrollingRef = React.useRef(false);

  const totalHeight = itemHeight * visibleCount;
  const paddingY = itemHeight * Math.floor(visibleCount / 2);

  // Sync scroll position with selected value
  const scrollToIndex = React.useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      const container = scrollRef.current;
      if (!container) return;
      const targetScroll = index * itemHeight;
      if (Math.abs(container.scrollTop - targetScroll) > 1) {
        container.scrollTo({ top: targetScroll, behavior });
      }
    },
    [itemHeight],
  );

  // Initial scroll
  React.useEffect(() => {
    const index = normalizedItems.findIndex((it) => it.value === selectedValue);
    if (index >= 0) {
      scrollToIndex(index, 'instant');
    }
  }, [normalizedItems, scrollToIndex, selectedValue]);

  // Handle scroll snap detection
  const handleScroll = React.useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const rawIndex = Math.round(scrollTop / itemHeight);
    const clampedIndex = Math.max(
      0,
      Math.min(rawIndex, normalizedItems.length - 1),
    );
    const item = normalizedItems[clampedIndex];

    if (item && item.value !== selectedValue) {
      if (controlledValue === undefined) {
        setInternalValue(item.value);
      }
      onValueChange?.(item.value);
    }
  }, [controlledValue, itemHeight, normalizedItems, onValueChange, selectedValue]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = normalizedItems.findIndex(
      (it) => it.value === selectedValue,
    );
    if (currentIndex === -1) return;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIndex = Math.max(0, currentIndex - 1);
      const nextItem = normalizedItems[nextIndex];
      if (nextItem) {
        if (controlledValue === undefined) setInternalValue(nextItem.value);
        onValueChange?.(nextItem.value);
        scrollToIndex(nextIndex);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = Math.min(normalizedItems.length - 1, currentIndex + 1);
      const nextItem = normalizedItems[nextIndex];
      if (nextItem) {
        if (controlledValue === undefined) setInternalValue(nextItem.value);
        onValueChange?.(nextItem.value);
        scrollToIndex(nextIndex);
      }
    }
  };

  return (
    <div
      role="listbox"
      aria-label="Wheel Picker"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ height: totalHeight }}
      className={cn(
        'fort-ui relative w-full max-w-[280px] overflow-hidden select-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--fort-tint)] rounded-[14px]',
        className,
      )}
      {...props}
    >
      {/* Center selection lens */}
      <div
        aria-hidden="true"
        style={{
          top: paddingY,
          height: itemHeight,
        }}
        className="pointer-events-none absolute inset-x-2 rounded-[10px] bg-[var(--fort-surface-muted)]/65 border border-[var(--fort-separator)] z-0"
      />

      {/* Top and bottom gradient blur masks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-[var(--fort-surface)] to-transparent"
        style={{ height: paddingY }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[var(--fort-surface)] to-transparent"
        style={{ height: paddingY }}
      />

      {/* Scrollable drum items */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          paddingTop: paddingY,
          paddingBottom: paddingY,
        }}
        className="relative z-10 h-full overflow-y-scroll snap-y snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {normalizedItems.map((item) => {
          const isSelected = item.value === selectedValue;
          return (
            <div
              key={item.value}
              role="option"
              aria-selected={isSelected}
              onClick={() => {
                const idx = normalizedItems.findIndex(
                  (it) => it.value === item.value,
                );
                if (idx >= 0) {
                  if (controlledValue === undefined) setInternalValue(item.value);
                  onValueChange?.(item.value);
                  scrollToIndex(idx);
                }
              }}
              style={{ height: itemHeight }}
              className={cn(
                'flex items-center justify-center snap-center px-4 font-medium transition-[opacity,transform,color] duration-150 cursor-pointer',
                isSelected
                  ? 'text-[17px] font-semibold text-[var(--fort-label)] scale-100 opacity-100'
                  : 'text-[15px] text-[var(--fort-label-secondary)] scale-95 opacity-50 hover:opacity-75',
              )}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

