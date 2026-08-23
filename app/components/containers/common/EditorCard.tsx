"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Card } from "@/app/components/ui/card";
import { cn } from "@/app/lib/utils";
import { initials } from "@/app/lib/transform/journal.transform";
import type { Editor } from "@/app/utils/types/journal.type";

export interface EditorCardProps {
  editor: Editor;
  className?: string;
  /** When true, render as an anchor to /editorial-board/[slug]. Default: true. */
  linkTo?: boolean;
  /** Featured variant used for the Chief Editor row. */
  featured?: boolean;
}

export function EditorCard({
  editor,
  className,
  linkTo = true,
  featured = false,
}: EditorCardProps) {
  const inner = featured ? (
    <FeaturedInner editor={editor} />
  ) : (
    <CompactInner editor={editor} />
  );

  const wrapperClass = cn(
    "border-brand bg-card-brand paper-shadow paper-shadow-hover",
    featured ? "p-6 md:p-8" : "flex flex-col items-center gap-3 p-5 text-center",
    linkTo && "group cursor-pointer",
    className,
  );

  if (!linkTo) {
    return <Card className={wrapperClass}>{inner}</Card>;
  }

  return (
    <Link
      href={`/editorial-board/${editor.slug}`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface rounded-xl"
    >
      <Card className={wrapperClass}>{inner}</Card>
    </Link>
  );
}

function CompactInner({ editor }: { editor: Editor }) {
  return (
    <>
      <Avatar className="h-20 w-20 ring-2 ring-brand-accent/40 ring-offset-2 ring-offset-brand-card">
        {editor.photoUrl ? (
          <AvatarImage src={editor.photoUrl} alt={editor.fullName} />
        ) : null}
        <AvatarFallback className="bg-brand-primary text-white font-display text-lg">
          {initials(editor.fullName)}
        </AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-display text-lg text-brand-ink leading-tight">
          {editor.fullName}
        </h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-accent-deep">
          {editor.boardRole}
        </p>
        <p className="mt-2 text-sm text-brand-ink/85 leading-snug">
          {editor.designation}
        </p>
        <p className="mt-1 text-xs text-brand-muted leading-snug">
          {editor.affiliation}
        </p>
        <p className="mt-0.5 text-xs text-brand-muted">{editor.country}</p>
        <p className="mt-1 text-[11px] text-brand-muted break-all">
          <span className="font-medium text-brand-ink/70">ORCID:</span>{" "}
          {editor.orcid ? (
            <span className="text-brand-primary">{editor.orcid}</span>
          ) : (
            <span className="italic">Not available</span>
          )}
        </p>
      </div>
    </>
  );
}

function FeaturedInner({ editor }: { editor: Editor }) {
  return (
    <div className="flex flex-col items-center gap-5 md:flex-row md:items-start md:gap-8 md:text-left text-center">
      <Avatar className="h-28 w-28 md:h-32 md:w-32 ring-2 ring-brand-accent/50 ring-offset-4 ring-offset-brand-card shrink-0">
        {editor.photoUrl ? (
          <AvatarImage src={editor.photoUrl} alt={editor.fullName} />
        ) : null}
        <AvatarFallback className="bg-brand-primary text-white font-display text-2xl">
          {initials(editor.fullName)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent-deep">
          {editor.boardRole}
        </p>
        <h3 className="mt-1 font-display text-2xl md:text-3xl text-brand-ink leading-tight">
          {editor.fullName}
        </h3>
        <p className="mt-2 text-sm md:text-base text-brand-ink/85">
          {editor.designation}
        </p>
        <p className="mt-1 text-sm text-brand-muted">{editor.affiliation}</p>
        <p className="mt-0.5 text-sm text-brand-muted">{editor.country}</p>
        <p className="mt-2 text-xs text-brand-muted break-all">
          <span className="font-medium text-brand-ink/70">ORCID iD:</span>{" "}
          {editor.orcid ? (
            <a
              href={`https://orcid.org/${editor.orcid}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-brand-primary hover:text-brand-accent-deep underline decoration-brand-accent/40 underline-offset-2"
            >
              {editor.orcid}
            </a>
          ) : (
            <span className="italic">Not available</span>
          )}
        </p>
        {editor.specializations?.length ? (
          <p className="mt-4 text-sm text-brand-ink/80">
            <span className="text-brand-muted">Specialisations · </span>
            {editor.specializations.join(", ")}
          </p>
        ) : null}
        <p className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-primary group-hover:text-brand-accent-deep transition-colors">
          Read full profile
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </p>
      </div>
    </div>
  );
}
