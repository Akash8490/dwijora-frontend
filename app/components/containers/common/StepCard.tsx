import type { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

export function StepCard({
  step,
  title,
  description,
  icon,
  className,
}: {
  step: number;
  title: ReactNode;
  description: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col gap-3 rounded-xl border border-brand bg-card-brand p-5 md:p-6 paper-shadow",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-accent/15 text-sm font-display font-semibold text-brand-accent-deep"
        >
          {step.toString().padStart(2, "0")}
        </span>
        {icon ? (
          <span className="text-brand-primary" aria-hidden>
            {icon}
          </span>
        ) : null}
      </div>
      <h3 className="font-display text-lg text-brand-ink">{title}</h3>
      <p className="text-sm text-brand-muted leading-relaxed">{description}</p>
    </div>
  );
}
