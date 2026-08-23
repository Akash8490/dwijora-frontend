import { BookOpenCheck } from "lucide-react";
import { cn } from "@/app/lib/utils";

/**
 * Renders one indexing service as a pill with an accurate status label
 * per the ISSN India audit (§8). The `status` line is required — every
 * badge must state the truthful, verifiable state of the journal's
 * relationship with the service. Never render a badge that only shows the
 * service name without a status: the audit calls that a predatory-journal
 * red flag ("Indexed in DOAJ", "DOI registered" without evidence, etc.).
 */
export function IndexingBadge({
  name,
  status,
  href,
  className,
}: {
  name: string;
  status?: string;
  href?: string;
  className?: string;
}) {
  const chip = (
    <span
      className={cn(
        "inline-flex flex-col items-start gap-0.5 rounded-lg border border-brand bg-card-brand px-3 py-2 text-brand-ink",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium">
        <BookOpenCheck
          className="h-3.5 w-3.5 text-brand-accent-deep"
          aria-hidden
        />
        {name}
      </span>
      {status ? (
        <span className="text-[10px] md:text-xs text-brand-muted leading-snug">
          {status}
        </span>
      ) : null}
    </span>
  );
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline"
      >
        {chip}
      </a>
    );
  }
  return chip;
}
