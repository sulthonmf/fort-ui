'use client';

import * as React from 'react';
import { Slider as BaseSlider } from '@base-ui/react/slider';
import { cn } from '@/lib/utils';

export type SliderProps<
  Value extends number | readonly number[] = number | readonly number[],
> = React.ComponentProps<typeof BaseSlider.Root<Value>> & {
  thumbLabel?: string;
};

/**
 * Touch-proportioned range slider built on Base UI Slider.
 */
export function Slider<
  Value extends number | readonly number[] = number | readonly number[],
>({
  className,
  value,
  defaultValue,
  thumbLabel,
  ...props
}: SliderProps<Value>) {
  const thumbSource = value ?? defaultValue;
  const thumbCount = Array.isArray(thumbSource) ? thumbSource.length : 1;

  return (
    <BaseSlider.Root
      value={value}
      defaultValue={defaultValue}
      className={cn(
        'fort-ui relative flex w-full touch-none items-center select-none',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45',
        className,
      )}
      {...props}
    >
      <BaseSlider.Control className="flex w-full cursor-pointer items-center py-3">
        <BaseSlider.Track className="relative h-1 w-full overflow-visible rounded-full bg-[var(--fort-surface-muted)]">
          <BaseSlider.Indicator className="rounded-full bg-[var(--fort-tint)]" />
          {Array.from({ length: thumbCount }, (_, index) => (
            <BaseSlider.Thumb
              key={index}
              index={thumbCount > 1 ? index : undefined}
              aria-label={thumbLabel}
              className={cn(
                'size-6 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.22),0_0_1px_rgba(0,0,0,0.14)]',
                'transition-transform duration-150 ease-[var(--fort-ease)]',
                'hover:scale-105 active:scale-110',
                'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--fort-tint)]',
              )}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}

