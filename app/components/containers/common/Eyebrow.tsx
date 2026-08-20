import type { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent-deep",
        className,
      )}
    >
      {children}
    </span>
  );
}
