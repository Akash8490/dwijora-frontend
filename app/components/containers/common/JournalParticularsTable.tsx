import { cn } from "@/app/lib/utils";
import { Sanskrit } from "@/app/components/containers/common/Sanskrit";
import type { JournalMeta } from "@/app/utils/types/journal.type";

/**
 * "Journal Particulars" — the exact fact-sheet block the ISSN India office
 * (CSIR-NIScPR) expects on the main/About page of a serial's website (see
 * Point 6 of the ISSN India detailed information document).
 *
 * The block is presented as a two-column labelled definition list so the
 * ISSN reviewer can scan every mandatory field (Title, Frequency, ISSN,
 * Publisher name/address, Starting Year, Subject, Language, Publication
 * Format, Email, Mobile) at a glance.
 */
export function JournalParticularsTable({
  meta,
  className,
}: {
  meta: JournalMeta;
  className?: string;
}) {
  const rows: Array<{ label: string; value: React.ReactNode }> = [
    {
      label: "Title",
      value: (
        <>
          <Sanskrit>{meta.nameDevanagari}</Sanskrit>
          {" "}({meta.name}) – Universal Consciousness &amp; Knowledge
        </>
      ),
    },
    { label: "Subtitle", value: meta.tagline },
    { label: "Frequency", value: meta.frequency },
    { label: "ISSN (Print)", value: meta.issn },
    { label: "ISSN (Online)", value: meta.eIssn },
    { label: "Publisher name", value: meta.publisher },
    { label: "Publisher address", value: meta.publisherAddress },
    { label: "Editor-in-Chief", value: meta.editorInChief },
    { label: "Starting year", value: String(meta.startingYear) },
    { label: "Subject", value: meta.subject },
    { label: "Language", value: meta.languages.join(", ") },
    { label: "Publication format", value: meta.publicationFormat },
    {
      label: "Email",
      value: (
        <a
          href={`mailto:${meta.contactEmail}`}
          className="text-brand-primary hover:text-brand-accent-deep"
        >
          {meta.contactEmail}
        </a>
      ),
    },
    { label: "Phone", value: meta.contactPhone },
  ];

  return (
    <div
      className={cn(
        "rounded-2xl border border-brand bg-card-brand p-6 md:p-8 paper-shadow",
        className,
      )}
    >
      <div className="flex flex-col gap-1 border-b border-brand pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent-deep">
          Journal Particulars
        </p>
        <h2 className="font-display text-2xl text-brand-ink">
          At-a-glance fact sheet
        </h2>
        <p className="text-sm text-brand-muted">
          The standard bibliographic and publisher facts required by
          indexing bodies and referenced by contributors, reviewers, and
          libraries.
        </p>
      </div>

      <dl className="mt-4 divide-y divide-brand text-sm">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[minmax(9rem,10rem)_1fr] gap-4 py-3 md:grid-cols-[minmax(11rem,12rem)_1fr]"
          >
            <dt className="text-brand-muted">{row.label}</dt>
            <dd className="text-brand-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
