'use client';

import * as React from 'react';
import { Coffee, ExternalLink } from 'lucide-react';
import { donateConfig } from '@/lib/shared';
import { Button, type ButtonSize, type ButtonVariant } from '@/registry/web/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/registry/web/ui/alert-dialog';
import { cn } from '@/lib/utils';

export interface DonateButtonProps {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/**
 * Buy Me a Coffee action opening donateConfig.url when set, or a setup dialog otherwise.
 */
export function DonateButton({
  label = donateConfig.label,
  variant = 'gray',
  size = 'sm',
  className,
}: DonateButtonProps) {
  if (donateConfig.url) {
    return (
      <a
        href={donateConfig.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'fort-ui inline-flex shrink-0 items-center justify-center gap-1.5 rounded-[10px] font-medium select-none',
          'bg-[var(--fort-surface-muted)] text-[var(--fort-label)] transition-[transform,filter] duration-150 ease-[var(--fort-ease)] hover:brightness-95 active:scale-[0.97]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]',
          size === 'sm' ? 'h-9 px-3 text-[13px]' : 'h-11 px-4 text-[15px]',
          className,
        )}
      >
        <Coffee aria-hidden="true" className="size-3.5" />
        <span>{label}</span>
        <ExternalLink aria-hidden="true" className="size-3 opacity-70" />
      </a>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant={variant}
            size={size}
            className={cn(
              size === 'sm' && 'h-9 rounded-[10px] px-3 text-[13px] font-medium',
              className,
            )}
          >
            <Coffee aria-hidden="true" className="size-3.5" />
            <span>{label}</span>
          </Button>
        }
      />
      <AlertDialogContent className="max-w-[340px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Buy Me a Coffee</AlertDialogTitle>
          <AlertDialogDescription>
            Support ongoing Web and Expo / React Native component development via
            Saweria. Set{' '}
            <code className="font-mono text-xs">NEXT_PUBLIC_DONATE_URL</code> or{' '}
            <code className="font-mono text-xs">donateConfig.url</code> in{' '}
            <code className="font-mono text-xs">lib/shared.ts</code> to your
            Saweria URL.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction>Got It</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
