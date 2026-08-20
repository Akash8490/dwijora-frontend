import type { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  icon,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-brand bg-card-brand p-5 md:p-6 paper-shadow",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
          {label}
        </div>
        {icon ? (
          <div className="text-brand-primary" aria-hidden>
            {icon}
          </div>
        ) : null}
      </div>
      <div className="mt-2 font-display text-3xl md:text-4xl text-brand-ink">
        {value}
      </div>
      {hint ? (
        <div className="mt-1 text-sm text-brand-muted">{hint}</div>
      ) : null}
    </div>
  );
}
