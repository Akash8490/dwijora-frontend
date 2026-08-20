import type { ReactNode } from "react";
import { SearchX } from "lucide-react";
import { cn } from "@/app/lib/utils";

export function EmptyState({
  title = "No results found",
  description = "Try broadening your search or clearing filters.",
  icon,
  action,
  className,
}: {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-xl border border-dashed border-brand bg-card-brand p-10 text-center",
        className,
      )}
    >
      <div className="text-brand-muted" aria-hidden>
        {icon ?? <SearchX className="h-8 w-8" />}
      </div>
      <h3 className="font-display text-lg text-brand-ink">{title}</h3>
      <p className="max-w-md text-sm text-brand-muted">{description}</p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
