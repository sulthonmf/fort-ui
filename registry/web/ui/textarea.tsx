import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.ComponentProps<"textarea">;

/**
 * Minimalist multi-line text field matching Input tokens.
 */
export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "fort-ui flex min-h-[104px] w-full rounded-[14px] border border-transparent bg-[var(--fort-surface-muted)]/80 px-3.5 py-2.5 text-[15px] leading-relaxed text-[var(--fort-label)]",
        "placeholder:text-[var(--fort-label-secondary)]",
        "transition-[background-color,border-color] duration-150 ease-[var(--fort-ease)]",
        "focus:border-[var(--fort-tint)] focus:bg-[var(--fort-surface)] focus:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      {...props}
    />
  );
}
