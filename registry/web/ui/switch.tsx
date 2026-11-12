"use client";

import * as React from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cn } from "@/lib/utils";

export type SwitchSize = "sm" | "md";

const TRACK_SIZE: Record<SwitchSize, string> = {
  sm: "h-6 w-10 p-0.5",
  md: "h-[31px] w-[51px] p-0.5",
};

const THUMB_SIZE: Record<SwitchSize, string> = {
  sm: "size-5 data-[checked]:translate-x-4",
  md: "size-[27px] data-[checked]:translate-x-5",
};

export interface SwitchProps extends React.ComponentProps<
  typeof BaseSwitch.Root
> {
  size?: SwitchSize;
}

/**
 * Accessible mobile-proportioned toggle switch built on Base UI.
 */
export function Switch({ className, size = "md", ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      className={cn(
        "group relative inline-flex shrink-0 cursor-pointer items-center rounded-full",
        "bg-[var(--fort-switch-off)] data-[checked]:bg-[var(--fort-switch-on)]",
        "transition-colors duration-200 ease-[var(--fort-ease)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45",
        TRACK_SIZE[size],
        className,
      )}
      {...props}
    >
      <BaseSwitch.Thumb
        className={cn(
          "pointer-events-none block rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.18),0_0_1px_rgba(0,0,0,0.1)]",
          "transition-transform duration-200 ease-[var(--fort-ease)] group-active:scale-[0.96]",
          THUMB_SIZE[size],
        )}
      />
    </BaseSwitch.Root>
  );
}
