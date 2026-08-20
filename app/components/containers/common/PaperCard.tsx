import Link from "next/link";
import { ArrowRight, FileText, Users } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/app/components/ui/card";
import { cn } from "@/app/lib/utils";
import type { Paper } from "@/app/utils/types/journal.type";
import {
  formatDateLong,
  indicFontClass,
  isIndicScript,
  joinAuthorNames,
  pageRange,
} from "@/app/lib/transform/journal.transform";

export interface PaperCardProps {
  paper: Paper;
  categoryName?: string;
  compact?: boolean;
  className?: string;
}

export function PaperCard({ paper, categoryName, compact, className }: PaperCardProps) {
  const langAttr =
    paper.language && paper.language !== "en" ? { lang: paper.language } : {};
  const titleFont = isIndicScript(paper.language)
    ? `${indicFontClass(paper.language)} font-semibold`
    : "font-display";
  const bodyFont = isIndicScript(paper.language)
    ? indicFontClass(paper.language)
    : "";

  return (
    <Card
      className={cn(
        "flex h-full flex-col border-brand bg-card-brand paper-shadow paper-shadow-hover",
        className,
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-wider text-brand-muted">
          {categoryName ? (
            <Badge variant="outline" className="border-brand-accent/40 bg-brand-accent/10 text-brand-accent-deep">
              {categoryName}
            </Badge>
          ) : null}
          <span>{formatDateLong(paper.publishedAt)}</span>
          <span aria-hidden>·</span>
          <span>{pageRange(paper)}</span>
        </div>
        <h3
          className={cn(
            "text-brand-ink leading-snug",
            titleFont,
            compact ? "text-lg" : "text-xl md:text-[1.35rem]",
          )}
          {...langAttr}
        >
          <Link
            href={`/paper/${paper.slug}`}
            className="hover:text-brand-accent-deep transition-colors"
          >
            {paper.title}
          </Link>
        </h3>
        {paper.titleAlt ? (
          <p
            lang="en"
            className={cn(
              "font-display italic text-brand-muted leading-snug",
              compact ? "text-xs" : "text-sm",
            )}
          >
            {paper.titleAlt}
          </p>
        ) : null}
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <p
          className={cn(
            "text-sm text-brand-muted",
            bodyFont,
            compact ? "line-clamp-2" : "line-clamp-4",
          )}
          {...langAttr}
        >
          {paper.abstract}
        </p>
        <p className="flex items-center gap-2 text-xs text-brand-muted">
          <Users className="h-3.5 w-3.5" aria-hidden />
          <span>{joinAuthorNames(paper.authors)}</span>
        </p>
        {!compact && paper.keywords.length ? (
          <div className="flex flex-wrap gap-1.5">
            {paper.keywords.slice(0, 4).map((k) => (
              <Badge
                key={k}
                variant="secondary"
                className="bg-brand-surface-2 text-brand-ink font-normal"
              >
                {k}
              </Badge>
            ))}
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="justify-between border-t border-brand pt-4 text-sm">
        <Link
          href={`/paper/${paper.slug}`}
          className="inline-flex items-center gap-1.5 font-medium text-brand-primary hover:text-brand-accent-deep"
        >
          Read paper <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <span className="inline-flex items-center gap-1.5 text-xs text-brand-muted">
          <FileText className="h-3.5 w-3.5" aria-hidden /> PDF
        </span>
      </CardFooter>
    </Card>
  );
}
