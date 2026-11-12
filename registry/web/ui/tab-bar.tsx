import * as React from "react";
import { cn } from "@/lib/utils";

export interface TabBarProps extends React.ComponentProps<"nav"> {
  floating?: boolean;
}

/**
 * Mobile bottom tab bar with translucent surface and hairline border.
 */
export function TabBar({
  floating = false,
  className,
  children,
  ...props
}: TabBarProps) {
  return (
    <nav
      aria-label={props["aria-label"] ?? "Primary navigation"}
      className={cn(
        "fort-ui flex w-full items-center justify-around bg-[var(--fort-surface)]/90 backdrop-blur-xl",
        floating
          ? "mx-auto max-w-md rounded-[22px] border border-[var(--fort-separator)] px-2 py-1.5 shadow-lg"
          : "border-t border-[var(--fort-separator)] px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]",
        className,
      )}
      {...props}
    >
      {children}
    </nav>
  );
}

export interface TabBarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number | string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function TabBarItem({
  icon,
  label,
  active = false,
  badge,
  href,
  onClick,
  className,
}: TabBarItemProps) {
  const classes = cn(
    "relative flex min-h-[48px] min-w-[56px] flex-1 flex-col items-center justify-center gap-0.5 rounded-[14px] px-2 py-1 select-none",
    "transition-[color,transform] duration-150 ease-[var(--fort-ease)] active:scale-[0.95]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fort-tint)]",
    active
      ? "text-[var(--fort-tint-text)]"
      : "text-[var(--fort-label-secondary)] hover:text-[var(--fort-label)]",
    className,
  );

  const content = (
    <>
      <span className="relative flex size-6 items-center justify-center">
        {icon}
        {badge !== undefined && badge !== 0 ? (
          <span className="absolute -top-1 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--fort-destructive)] px-1 text-[10px] font-bold text-white leading-none">
            {badge}
          </span>
        ) : null}
      </span>
      <span className="text-[11px] leading-tight font-medium">{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-current={active ? "page" : undefined}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(classes, "cursor-pointer")}
    >
      {content}
    </button>
  );
}
