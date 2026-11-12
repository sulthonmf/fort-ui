'use client';

import * as React from 'react';
import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import { cn } from '@/lib/utils';

export type AvatarSize = 'sm' | 'md' | 'lg';

const AVATAR_SIZES: Record<AvatarSize, string> = {
  sm: 'size-8 text-[12px]',
  md: 'size-10 text-[14px]',
  lg: 'size-14 text-[18px]',
};

export interface AvatarProps
  extends React.ComponentProps<typeof BaseAvatar.Root> {
  size?: AvatarSize;
}

/**
 * Circular user avatar built on Base UI Avatar.
 */
export function Avatar({
  className,
  size = 'md',
  ...props
}: AvatarProps) {
  return (
    <BaseAvatar.Root
      className={cn(
        'fort-ui inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--fort-separator)] bg-[var(--fort-surface-muted)] font-semibold text-[var(--fort-label)] select-none',
        AVATAR_SIZES[size],
        className,
      )}
      {...props}
    />
  );
}

export function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof BaseAvatar.Image>) {
  return (
    <BaseAvatar.Image
      className={cn('size-full object-cover', className)}
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof BaseAvatar.Fallback>) {
  return (
    <BaseAvatar.Fallback
      className={cn(
        'flex size-full items-center justify-center bg-[var(--fort-tint-soft)] text-[var(--fort-tint-text)]',
        className,
      )}
      {...props}
    />
  );
}

