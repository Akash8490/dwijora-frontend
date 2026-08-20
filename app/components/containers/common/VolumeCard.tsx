import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { cn } from "@/app/lib/utils";
import type { Volume, Issue } from "@/app/utils/types/journal.type";

export function VolumeCard({
  volume,
  issues,
  className,
}: {
  volume: Volume;
  issues: Issue[];
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col justify-between gap-4 border-brand bg-card-brand p-5 md:p-6 paper-shadow paper-shadow-hover",
        className,
      )}
    >
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-muted">
          <Layers className="h-3.5 w-3.5 text-brand-primary" aria-hidden />
          Volume {String(volume.number).padStart(2, "0")} · {volume.year}
        </div>
        <h3 className="mt-2 font-display text-xl text-brand-ink">
          {volume.title}
        </h3>
        <p className="mt-1 text-sm text-brand-muted">
          {issues.length} {issues.length === 1 ? "issue" : "issues"}
        </p>
      </div>
      <Link
        href={`/archive?volume=${volume.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary hover:text-brand-accent-deep"
      >
        Browse volume <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </Card>
  );
}
