import type { Metadata } from "next";
import type { Issue, JournalMeta, Paper, Volume } from "@/app/utils/types/journal.type";

/**
 * Build Google Scholar citation_ meta tags and JSON-LD payload for a paper.
 * Consumed by generateMetadata (tags) and rendered inline (JSON-LD).
 */
export function buildCitationMeta(input: {
  paper: Paper;
  issue: Issue;
  volume: Volume;
  meta: JournalMeta;
  pdfUrl: string;
}): { other: NonNullable<Metadata["other"]>; jsonLd: Record<string, unknown> } {
  const { paper, issue, volume, meta, pdfUrl } = input;
  const isoDate = new Date(paper.publishedAt).toISOString().slice(0, 10);
  const language = paper.language ?? "en";

  const other: Record<string, string | string[]> = {
    citation_title: paper.title,
    citation_author: paper.authors.map((a) => a.fullName),
    citation_journal_title: meta.name,
    citation_publication_date: isoDate,
    citation_online_date: isoDate,
    citation_volume: String(volume.number).padStart(2, "0"),
    citation_issue: String(issue.number).padStart(2, "0"),
    citation_firstpage: String(paper.pageStart),
    citation_lastpage: String(paper.pageEnd),
    citation_pdf_url: pdfUrl,
    citation_issn: meta.issn,
    citation_language: language,
    citation_keywords: paper.keywords.join("; "),
  };
  if (paper.doi) other.citation_doi = paper.doi;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: paper.title,
    name: paper.title,
    ...(paper.titleAlt ? { alternativeHeadline: paper.titleAlt } : {}),
    abstract: paper.abstract,
    inLanguage: language,
    datePublished: isoDate,
    author: paper.authors.map((a) => ({
      "@type": "Person",
      name: a.fullName,
      affiliation: { "@type": "Organization", name: a.affiliation },
      ...(a.orcid ? { identifier: `https://orcid.org/${a.orcid}` } : {}),
    })),
    keywords: paper.keywords,
    isPartOf: {
      "@type": "PublicationIssue",
      issueNumber: issue.number,
      datePublished: new Date(issue.publishedAt).toISOString().slice(0, 10),
      isPartOf: {
        "@type": "PublicationVolume",
        volumeNumber: volume.number,
        isPartOf: {
          "@type": "Periodical",
          name: meta.name,
          issn: meta.issn,
        },
      },
    },
    pageStart: paper.pageStart,
    pageEnd: paper.pageEnd,
    url: pdfUrl,
    ...(paper.doi ? { identifier: `https://doi.org/${paper.doi}` } : {}),
  };

  return { other, jsonLd };
}
