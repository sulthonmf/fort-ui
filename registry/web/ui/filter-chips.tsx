'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterChipItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface FilterChipsProps
  extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  items: (FilterChipItem | string)[];
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: any) => void;
  multiple?: boolean;
  showCheckmark?: boolean;
}

/**
 * Mobile-first horizontal scrollable filter chip list with single or multi-selection.
 */
export function FilterChips({
  items,
  value: controlledValue,
  defaultValue,
  onValueChange,
  multiple = false,
  showCheckmark = true,
  className,
  ...props
}: FilterChipsProps) {
  const normalizedItems: FilterChipItem[] = React.useMemo(
    () =>
      items.map((item) =>
        typeof item === 'string' ? { id: item, label: item } : item,
      ),
    [items],
  );

  const initialValue = defaultValue ?? (multiple ? [] : normalizedItems[0]?.id ?? '');
  const [internalValue, setInternalValue] = React.useState<string | string[]>(
    controlledValue ?? initialValue,
  );
  const selectedValue = controlledValue ?? internalValue;

  const isSelected = (id: string) => {
    if (Array.isArray(selectedValue)) {
      return selectedValue.includes(id);
    }
    return selectedValue === id;
  };

  const handleToggle = (id: string) => {
    if (multiple) {
      const currentList = Array.isArray(selectedValue) ? selectedValue : [];
      const nextList = currentList.includes(id)
        ? currentList.filter((item) => item !== id)
        : [...currentList, id];

      if (controlledValue === undefined) setInternalValue(nextList);
      onValueChange?.(nextList);
    } else {
      if (controlledValue === undefined) setInternalValue(id);
      onValueChange?.(id);
    }
  };

  return (
    <div
      role="group"
      aria-label="Filter chips"
      className={cn(
        'fort-ui flex w-full items-center gap-2 overflow-x-auto py-1 scroll-smooth select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
      {...props}
    >
      {normalizedItems.map((item) => {
        const active = isSelected(item.id);
        return (
          <button
            key={item.id}
            type="button"
            role={multiple ? 'checkbox' : 'radio'}
            aria-checked={active}
            onClick={() => handleToggle(item.id)}
            className={cn(
              'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium transition-[background-color,transform,color] duration-150 ease-[var(--fort-ease)]',
              'active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]',
              active
                ? 'bg-[var(--fort-tint)] text-white shadow-xs'
                : 'bg-[var(--fort-surface-muted)] text-[var(--fort-label)] hover:bg-[var(--fort-surface-pressed)]/70',
            )}
          >
            {showCheckmark && active ? (
              <Check className="size-3.5 stroke-[2.5]" />
            ) : item.icon ? (
              <span className="size-3.5">{item.icon}</span>
            ) : null}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
