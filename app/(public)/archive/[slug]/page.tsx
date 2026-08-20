import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen, Calendar } from "lucide-react";
import { PageHero } from "@/app/components/containers/common/PageHero";
import { Section } from "@/app/components/containers/common/Section";
import { PaperCard } from "@/app/components/containers/common/PaperCard";
import { EmptyState } from "@/app/components/containers/common/EmptyState";
import { Badge } from "@/app/components/ui/badge";
import {
  getCategories,
  getIssueBySlug,
  getPapersByIssue,
  getVolumes,
} from "@/app/lib/services/journal.service";
import { buildMetadata } from "@/app/lib/seo";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const { data: issue } = await getIssueBySlug(slug);
  if (!issue) return buildMetadata({ title: "Issue not found" });
  return buildMetadata({
    title: `${issue.title} — ${issue.month} ${issue.year}`,
    description: `Issue ${issue.number} of Viśvasaṃvid, ${issue.month} ${issue.year}.`,
    path: `/archive/${slug}`,
  });
}

export default async function IssuePage({ params }: Params) {
  const { slug } = await params;
  const { data: issue } = await getIssueBySlug(slug);
  if (!issue) notFound();

  const [{ data: papers }, { data: volumes }, { data: categories }] = await Promise.all([
    getPapersByIssue(issue.id),
    getVolumes(),
    getCategories(),
  ]);
  const volume = volumes.find((v) => v.id === issue.volumeId);
  const categoryById = Object.fromEntries(categories.map((c) => [c.id, c] as const));

  return (
    <>
      <PageHero
        eyebrow={`${issue.month} ${issue.year}`}
        title={issue.title}
        subtitle={`Vol. ${volume ? String(volume.number).padStart(2, "0") : "—"} · Issue ${String(issue.number).padStart(2, "0")} · ${papers.length} papers`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Archive", href: "/archive" },
          { label: `Vol. ${volume ? String(volume.number).padStart(2, "0") : "—"} · Issue ${String(issue.number).padStart(2, "0")}` },
        ]}
        actions={
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-brand-primary/30 text-brand-primary">
              <BookOpen className="mr-1 h-3.5 w-3.5" /> Vol. {volume ? String(volume.number).padStart(2, "0") : "—"}
            </Badge>
            <Badge variant="outline" className="border-brand-accent/40 text-brand-accent-deep">
              <Calendar className="mr-1 h-3.5 w-3.5" /> {issue.month} {issue.year}
            </Badge>
          </div>
        }
      />
      <Section size="md">
        {papers.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {papers.map((p) => (
              <PaperCard
                key={p.id}
                paper={p}
                categoryName={categoryById[p.categoryId]?.name}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="No papers in this issue" />
        )}
      </Section>
    </>
  );
}
