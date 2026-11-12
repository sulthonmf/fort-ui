"use client";

import * as React from "react";
import { Toast as BaseToast } from "@base-ui/react/toast";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const useToast = BaseToast.useToastManager;
export const createToastManager = BaseToast.createToastManager;

export interface ToastProviderProps extends React.ComponentProps<
  typeof BaseToast.Provider
> {
  position?: "top" | "bottom";
}

/**
 * Floating toast banner provider built on Base UI Toast.
 */
export function ToastProvider({
  children,
  position = "top",
  timeout = 4000,
  ...props
}: ToastProviderProps) {
  return (
    <BaseToast.Provider timeout={timeout} {...props}>
      {children}
      <ToastList position={position} />
    </BaseToast.Provider>
  );
}

function ToastList({ position }: { position: "top" | "bottom" }) {
  const { toasts } = BaseToast.useToastManager();

  return (
    <BaseToast.Portal>
      <BaseToast.Viewport
        className={cn(
          "fixed left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col gap-2 outline-none",
          position === "top" ? "top-4" : "bottom-4",
        )}
      >
        {toasts.map((toast) => (
          <BaseToast.Root
            key={toast.id}
            toast={toast}
            swipeDirection={
              position === "top" ? ["up", "right"] : ["down", "right"]
            }
            className={cn(
              "fort-ui flex items-center justify-between gap-3 rounded-[18px] border border-[var(--fort-separator)] bg-[var(--fort-surface)]/95 px-4 py-3 shadow-lg backdrop-blur-xl",
              "transition-[transform,opacity] duration-250 ease-[var(--fort-ease)]",
              position === "top"
                ? "data-[starting-style]:-translate-y-4 data-[starting-style]:opacity-0 data-[ending-style]:-translate-y-4 data-[ending-style]:opacity-0"
                : "data-[starting-style]:translate-y-4 data-[starting-style]:opacity-0 data-[ending-style]:translate-y-4 data-[ending-style]:opacity-0",
              "data-[limited]:opacity-0",
            )}
          >
            <BaseToast.Content className="min-w-0 flex-1">
              <BaseToast.Title className="text-[14px] font-semibold text-[var(--fort-label)]" />
              <BaseToast.Description className="mt-0.5 text-[13px] text-[var(--fort-label-secondary)]" />
            </BaseToast.Content>
            {toast.actionProps ? (
              <BaseToast.Action className="shrink-0 cursor-pointer rounded-[8px] px-2.5 py-1 text-[13px] font-semibold text-[var(--fort-tint-text)] hover:bg-[var(--fort-tint-soft)]" />
            ) : null}
            <BaseToast.Close
              aria-label="Dismiss notification"
              className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-[var(--fort-label-secondary)] transition-colors hover:bg-[var(--fort-surface-muted)] focus-visible:outline-2 focus-visible:outline-[var(--fort-tint)]"
            >
              <X aria-hidden="true" className="size-3.5" />
            </BaseToast.Close>
          </BaseToast.Root>
        ))}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  );
}
