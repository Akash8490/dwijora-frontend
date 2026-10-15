import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink, Calendar, FileText, Users } from "lucide-react";
import { PageHero } from "@/app/components/containers/common/PageHero";
import { Section } from "@/app/components/containers/common/Section";
import { Container } from "@/app/components/containers/common/Container";
import { Prose } from "@/app/components/containers/common/Prose";
import { Callout } from "@/app/components/containers/common/Callout";
import { PaperCard } from "@/app/components/containers/common/PaperCard";
import { StatCard } from "@/app/components/containers/common/StatCard";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Sanskrit } from "@/app/components/containers/common/Sanskrit";
import { CitationBox } from "@/app/(public)/paper/[slug]/CitationBox";
import { ShareBar } from "@/app/(public)/paper/[slug]/ShareBar";
import { PdfActions } from "@/app/(public)/paper/[slug]/PdfActions";
import { buildCitationMeta } from "@/app/(public)/paper/[slug]/citation.helper";
import {
  getCategories,
  getJournalMeta,
  getPaperBySlug,
  getRelatedPapers,
  getVolumes,
} from "@/app/lib/services/journal.service";
import {
  apaCitation,
  formatDateLong,
  indicFontClass,
  indicScriptOf,
  joinAuthorNames,
  mlaCitation,
  pageRange,
} from "@/app/lib/transform/journal.transform";
import { issues as allIssuesMock } from "@/app/lib/services/mock/journal.mock";
import { buildMetadata } from "@/app/lib/seo";
import { env } from "@/app/lib/env";

interface Params {
  params: Promise<{ slug: string }>;
}

async function loadPaperContext(slug: string) {
  const [{ data: paper }, { data: volumes }, { data: meta }, { data: categories }] = await Promise.all([
    getPaperBySlug(slug),
    getVolumes(),
    getJournalMeta(),
    getCategories(),
  ]);
  if (!paper) return null;
  const issue = allIssuesMock.find((i) => i.id === paper.issueId) ?? null;
  const volume = volumes.find((v) => v.id === paper.volumeId) ?? null;
  const category = categories.find((c) => c.id === paper.categoryId) ?? null;
  return { paper, issue, volume, meta, category };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const ctx = await loadPaperContext(slug);
  if (!ctx || !ctx.issue || !ctx.volume) return buildMetadata({ title: "Paper not found", noIndex: true });
  const pdfAbsoluteUrl = new URL(ctx.paper.pdfUrl, env.NEXT_PUBLIC_SITE_URL).toString();
  const { other } = buildCitationMeta({
    paper: ctx.paper,
    issue: ctx.issue,
    volume: ctx.volume,
    meta: ctx.meta,
    pdfUrl: pdfAbsoluteUrl,
  });
  const base = buildMetadata({
    title: ctx.paper.title,
    description: ctx.paper.abstract.slice(0, 200),
    path: `/paper/${slug}`,
  });
  return { ...base, other };
}

export default async function PaperDetailPage({ params }: Params) {
  const { slug } = await params;
  const ctx = await loadPaperContext(slug);
  if (!ctx || !ctx.issue || !ctx.volume) notFound();
  const { paper, issue, volume, meta, category } = ctx;

  const pdfUrl = new URL(paper.pdfUrl, env.NEXT_PUBLIC_SITE_URL).toString();
  const canonicalUrl = new URL(`/paper/${paper.slug}`, env.NEXT_PUBLIC_SITE_URL).toString();

  const { jsonLd } = buildCitationMeta({
    paper,
    issue,
    volume,
    meta,
    pdfUrl,
  });

  const { data: related } = await getRelatedPapers(paper.id, 3);
  const apa = apaCitation(paper, meta.name, volume.number, issue.number);
  const mla = mlaCitation(paper, meta.name, volume.number, issue.number);
  const paperLang = paper.language ?? "en";
  // Script is detected from the rendered strings, not from `paper.language`:
  // papers whose PDF is in Hindi/Gujarati are presented in English here.
  const titleScript = indicScriptOf(paper.title);
  const abstractScript = indicScriptOf(paper.abstract);
  const keywordScript = indicScriptOf(paper.keywords.join(" "));
  const heroTitle = titleScript ? (
    titleScript === "devanagari" ? (
      <Sanskrit lang={paperLang as "hi"} variant="display">
        {paper.title}
      </Sanskrit>
    ) : (
      <span
        lang={paperLang}
        className={`${indicFontClass(paper.title)} font-semibold leading-[1.1] tracking-tight`}
      >
        {paper.title}
      </span>
    )
  ) : (
    paper.title
  );
  const breadcrumbTitle =
    titleScript && paper.titleAlt ? paper.titleAlt : paper.title;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={category ? category.name : "Paper"}
        title={heroTitle}
        subtitle={
          paper.titleAlt ? (
            <>
              <span
                lang="en"
                className="block font-display italic text-brand-primary text-lg md:text-xl leading-snug"
              >
                {paper.titleAlt}
              </span>
              <span className="mt-2 block">
                {joinAuthorNames(paper.authors, 5)}
              </span>
            </>
          ) : (
            joinAuthorNames(paper.authors, 5)
          )
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Archive", href: "/archive" },
          { label: `Vol. ${String(volume.number).padStart(2, "0")} · Issue ${String(issue.number).padStart(2, "0")}`, href: `/archive/${issue.slug}` },
          { label: breadcrumbTitle },
        ]}
        actions={
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-brand-primary/30 text-brand-primary">
              <Calendar className="mr-1 h-3.5 w-3.5" /> {formatDateLong(paper.publishedAt)}
            </Badge>
            <Badge variant="outline" className="border-brand-accent/40 text-brand-accent-deep">
              Vol. {String(volume.number).padStart(2, "0")} · Issue {String(issue.number).padStart(2, "0")} · {pageRange(paper)}
            </Badge>
            {paper.doi ? (
              <Badge variant="outline">
                DOI: {paper.doi}
              </Badge>
            ) : null}
          </div>
        }
      />
      {/* Bibliographic header strip — matches the citation-first pattern the
          ISSN India office (Point 7) expects on the opening page of every
          article, so indexers can extract the citation at a glance. */}
      <div className="border-b border-brand bg-brand-surface-2/70">
        <Container size="lg" className="py-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-sm">
            <div className="text-brand-ink">
              <span className="font-display italic text-brand-primary">
                {meta.name}
              </span>
              <span className="mx-2 text-brand-muted" aria-hidden>·</span>
              <span>
                Vol. {String(volume.number).padStart(2, "0")} ({String(issue.number).padStart(2, "0")}),{" "}
                {issue.month} {issue.year}, pp. {paper.pageStart}&ndash;{paper.pageEnd}
              </span>
            </div>
            <div className="text-brand-muted text-xs uppercase tracking-wider">
              ISSN (Online) {meta.eIssn ?? "Applied for"}
              {paper.doi ? (
                <>
                  <span className="mx-2" aria-hidden>·</span>
                  <span>DOI: {paper.doi}</span>
                </>
              ) : null}
            </div>
          </div>
        </Container>
      </div>
      <Section size="md">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <article>
            <Prose>
              <h2>Abstract</h2>
              {abstractScript ? (
                abstractScript === "devanagari" ? (
                  <Sanskrit as="p" lang={paperLang as "hi"} variant="body">
                    {paper.abstract}
                  </Sanskrit>
                ) : (
                  <p
                    lang={paperLang}
                    className={`${indicFontClass(paper.abstract)} leading-relaxed`}
                  >
                    {paper.abstract}
                  </p>
                )
              ) : (
                <p>{paper.abstract}</p>
              )}

              <h2>Keywords</h2>
            </Prose>
            <div className="mt-2 flex flex-wrap gap-2">
              {paper.keywords.map((k) => (
                <Badge
                  key={k}
                  variant="secondary"
                  className={`bg-brand-surface-2 text-brand-ink font-normal ${
                    keywordScript
                      ? `${indicFontClass(k)} text-base`
                      : ""
                  }`}
                  {...(keywordScript ? { lang: paperLang } : {})}
                >
                  {k}
                </Badge>
              ))}
            </div>

            <Prose className="mt-8">
              <h2>Authors</h2>
              <ul>
                {paper.authors.map((a) => (
                  <li key={a.id}>
                    <strong>{a.fullName}</strong>
                    {a.isCorresponding ? (
                      <em className="ml-1 text-brand-accent-deep">
                        (corresponding author)
                      </em>
                    ) : null}
                    <br />
                    <span className="text-sm text-brand-muted">
                      {a.affiliation}
                      {a.country ? `, ${a.country}` : ""}
                    </span>
                  </li>
                ))}
              </ul>

              <h2>How to cite</h2>
            </Prose>
            <div className="mt-3">
              <CitationBox apa={apa} mla={mla} />
            </div>

            <div className="mt-8">
              <ShareBar url={canonicalUrl} title={paper.title} />
            </div>
          </article>

          <aside className="space-y-4">
            <div className="rounded-xl border border-brand bg-card-brand p-5 md:p-6 paper-shadow">
              <h3 className="font-display text-lg text-brand-ink">Full text</h3>
              <p className="mt-1 text-sm text-brand-muted">
                Read the article in your browser or download the PDF &mdash; open access
                under the journal&apos;s licence.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <PdfActions
                  url={paper.pdfUrl}
                  title={breadcrumbTitle}
                  fileName={`${paper.slug}.pdf`}
                />
                {paper.doi ? (
                  <Button asChild variant="outline">
                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View at DOI
                    </a>
                  </Button>
                ) : null}
              </div>
              {/* TODO(client): host PDFs when the storage backend is wired up. */}
            </div>
            <StatCard label="Downloads" value={paper.downloadCount ?? 0} icon={<FileText className="h-4 w-4" />} />
            <StatCard label="Citations" value={paper.citationCount ?? 0} icon={<Users className="h-4 w-4" />} />
            <Callout tone="info" title="Open access">
              © {new Date(paper.publishedAt).getFullYear()} The
              Author(s). Published by Vi&#347;vasa&#7747;vid. This article
              is licensed under the{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-brand-accent-deep"
              >
                Creative Commons Attribution 4.0 International License
                (CC&nbsp;BY&nbsp;4.0)
              </a>
              . Authors retain copyright.
            </Callout>
          </aside>
        </div>
      </Section>

      {related.length ? (
        <Section
          tone="surface-2"
          eyebrow="Related work"
          title="Related papers"
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PaperCard key={p.id} paper={p} categoryName={category?.name} />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}

