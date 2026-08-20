import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/app/lib/utils";
import type { Issue, Volume } from "@/app/utils/types/journal.type";

export function IssueCard({
  issue,
  volume,
  paperCount,
  className,
}: {
  issue: Issue;
  volume: Volume;
  paperCount: number;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "group flex h-full flex-col gap-4 border-brand bg-card-brand p-5 md:p-6 paper-shadow paper-shadow-hover",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <Badge variant="outline" className="border-brand-primary/30 text-brand-primary">
          Vol. {String(volume.number).padStart(2, "0")} · Issue {String(issue.number).padStart(2, "0")}
        </Badge>
        <span className="text-xs text-brand-muted">
          {issue.month} {issue.year}
        </span>
      </div>
      <div className="flex items-start gap-4">
        <div
          aria-hidden
          className="flex h-16 w-14 shrink-0 items-center justify-center rounded-md bg-brand-primary text-white paper-shadow"
        >
          <BookOpen className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-lg md:text-xl text-brand-ink leading-snug">
            <Link
              href={`/archive/${issue.slug}`}
              className="hover:text-brand-accent-deep"
            >
              {issue.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-brand-muted">
            {paperCount} {paperCount === 1 ? "paper" : "papers"}
          </p>
        </div>
      </div>
      <Link
        href={`/archive/${issue.slug}`}
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary hover:text-brand-accent-deep"
      >
        View issue <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </Card>
  );
}
