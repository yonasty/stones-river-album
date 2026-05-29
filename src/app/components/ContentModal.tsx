import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "./ui/utils";

interface ContentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * Shared modal component used for bio expansions and product detail views.
 * Wraps Radix Dialog primitives with dark overlay, fade+scale animation,
 * and vertical scroll support. Radix handles scroll lock, focus return,
 * escape key close, and click-outside close automatically.
 */
export function ContentModal({
  open,
  onOpenChange,
  children,
  className,
}: ContentModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/80",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "duration-200"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center p-4",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
            "duration-200"
          )}
        >
          <div
            className={cn(
              "relative w-full max-w-lg max-h-[90vh] overflow-y-auto",
              "rounded-lg border bg-zinc-900 p-6 shadow-lg text-white",
              className
            )}
          >
            {/* Close button — top-right corner */}
            <DialogPrimitive.Close
              className={cn(
                "absolute top-4 right-4 z-10",
                "rounded-sm p-1 text-white/70 transition-opacity",
                "hover:text-white hover:opacity-100",
                "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-zinc-900"
              )}
              aria-label="Close"
            >
              <X className="size-5" />
            </DialogPrimitive.Close>

            {children}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
