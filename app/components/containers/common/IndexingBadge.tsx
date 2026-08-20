import { BookOpenCheck } from "lucide-react";
import { cn } from "@/app/lib/utils";

export function IndexingBadge({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-brand bg-card-brand px-3 py-1.5 text-xs md:text-sm font-medium text-brand-ink",
        className,
      )}
    >
      <BookOpenCheck className="h-3.5 w-3.5 text-brand-accent-deep" aria-hidden />
      {name}
    </span>
  );
}
