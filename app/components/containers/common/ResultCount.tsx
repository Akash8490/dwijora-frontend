import { cn } from "@/app/lib/utils";

export function ResultCount({
  total,
  page,
  pageSize,
  label = "results",
  className,
}: {
  total: number;
  page: number;
  pageSize: number;
  label?: string;
  className?: string;
}) {
  if (total === 0) return null;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);
  return (
    <p className={cn("text-sm text-brand-muted", className)}>
      Showing{" "}
      <span className="font-medium text-brand-ink">
        {from}–{to}
      </span>{" "}
      of <span className="font-medium text-brand-ink">{total}</span> {label}
    </p>
  );
}
