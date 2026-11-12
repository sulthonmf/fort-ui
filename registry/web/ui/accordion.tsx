'use client';

import * as React from 'react';
import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Collapsible grouped disclosure list built on Base UI Accordion.
 */
export function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Root>) {
  return (
    <BaseAccordion.Root
      className={cn(
        'fort-ui overflow-hidden rounded-[14px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] divide-y divide-[var(--fort-separator)]',
        className,
      )}
      {...props}
    />
  );
}

export function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Item>) {
  return <BaseAccordion.Item className={cn(className)} {...props} />;
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Trigger>) {
  return (
    <BaseAccordion.Header>
      <BaseAccordion.Trigger
        className={cn(
          'group flex min-h-[48px] w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left text-[15px] font-medium text-[var(--fort-label)]',
          'transition-colors duration-150 hover:bg-[var(--fort-surface-muted)]/45 active:bg-[var(--fort-surface-muted)]',
          'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--fort-tint)]',
          className,
        )}
        {...props}
      >
        <span className="min-w-0 flex-1">{children}</span>
        <ChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 text-[var(--fort-label-secondary)] transition-transform duration-200 ease-[var(--fort-ease)] group-data-[panel-open]:rotate-180"
        />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Panel>) {
  return (
    <BaseAccordion.Panel
      className={cn(
        'h-[var(--accordion-panel-height)] overflow-hidden transition-[height] duration-200 ease-[var(--fort-ease)]',
        'data-[starting-style]:h-0 data-[ending-style]:h-0',
      )}
      {...props}
    >
      <div
        className={cn(
          'px-4 pt-0 pb-3.5 text-[14px] leading-relaxed text-[var(--fort-label-secondary)]',
          className,
        )}
      >
        {children}
      </div>
    </BaseAccordion.Panel>
  );
}

