'use client';

import * as React from 'react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import {
  SegmentedControl,
  SegmentedControlContent,
  SegmentedControlList,
  SegmentedControlTrigger,
} from '@/registry/web/ui/segmented-control';
import { cn } from '@/lib/utils';

export interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  title?: string;
  mobileFrame?: boolean;
  className?: string;
}

/**
 * Interactive preview and source snippet switcher for MDX component docs.
 */
export function ComponentPreview({
  children,
  code,
  title,
  mobileFrame = false,
  className,
}: ComponentPreviewProps) {
  const [viewport, setViewport] = React.useState<'full' | 'phone'>(
    mobileFrame ? 'phone' : 'full',
  );

  return (
    <div className={cn('not-prose my-6 flex flex-col gap-3', className)}>
      <SegmentedControl defaultValue="preview">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <SegmentedControlList>
              <SegmentedControlTrigger value="preview">
                Preview
              </SegmentedControlTrigger>
              <SegmentedControlTrigger value="code">
                Code
              </SegmentedControlTrigger>
            </SegmentedControlList>
            {title ? (
              <span className="text-xs font-medium text-fd-muted-foreground">
                {title}
              </span>
            ) : null}
          </div>

          <SegmentedControl
            value={viewport}
            onValueChange={(next) =>
              setViewport(next === 'phone' ? 'phone' : 'full')
            }
          >
            <SegmentedControlList>
              <SegmentedControlTrigger value="full">
                Fluid
              </SegmentedControlTrigger>
              <SegmentedControlTrigger value="phone">
                390px
              </SegmentedControlTrigger>
            </SegmentedControlList>
          </SegmentedControl>
        </div>

        <SegmentedControlContent value="preview">
          <div className="flex min-h-[220px] w-full items-center justify-center rounded-[18px] border border-[var(--fort-separator)] bg-[var(--fort-bg)] p-5 sm:p-8">
            <div
              className={cn(
                'w-full transition-[max-width] duration-200 ease-[var(--fort-ease)]',
                viewport === 'phone'
                  ? 'mx-auto max-w-[390px] rounded-[24px] border border-[var(--fort-separator)] bg-[var(--fort-bg)] p-4 shadow-sm'
                  : 'flex flex-col items-center justify-center',
              )}
            >
              {children}
            </div>
          </div>
        </SegmentedControlContent>

        <SegmentedControlContent value="code">
          <DynamicCodeBlock lang="tsx" code={code.trim()} />
        </SegmentedControlContent>
      </SegmentedControl>
    </div>
  );
}

