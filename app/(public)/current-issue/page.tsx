import type { Metadata } from "next";
import { Suspense } from "react";
import { BookOpen, Calendar } from "lucide-react";
import { PageHero } from "@/app/components/containers/common/PageHero";
import { Container } from "@/app/components/containers/common/Container";
import { Section } from "@/app/components/containers/common/Section";
import { PaperCard } from "@/app/components/containers/common/PaperCard";
import { EmptyState } from "@/app/components/containers/common/EmptyState";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Badge } from "@/app/components/ui/badge";
import {
  getCategories,
  getCurrentIssue,
  getPapersByIssue,
  getVolumes,
} from "@/app/lib/services/journal.service";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Current Issue",
  description: "The latest published issue of Viśvasaṃvid.",
  path: "/current-issue",
});

async function CurrentIssueContent() {
  const [{ data: issue }, { data: volumes }, { data: categories }] = await Promise.all([
    getCurrentIssue(),
    getVolumes(),
    getCategories(),
  ]);
  const { data: papers } = await getPapersByIssue(issue.id);
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
          { label: "Current Issue" },
        ]}
        actions={
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-brand-primary/30 text-brand-primary">
              <BookOpen className="mr-1 h-3.5 w-3.5" /> Vol. {volume ? String(volume.number).padStart(2, "0") : "—"} · Issue {String(issue.number).padStart(2, "0")}
            </Badge>
            <Badge variant="outline" className="border-brand-accent/40 text-brand-accent-deep">
              <Calendar className="mr-1 h-3.5 w-3.5" /> {issue.month} {issue.year}
            </Badge>
          </div>
        }
      />
      <Section size="md">
        <h2 className="sr-only">Papers in this issue</h2>
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
          <EmptyState title="No papers yet" description="This issue is being prepared. Please check back soon." />
        )}
      </Section>
    </>
  );
}

function CurrentIssueSkeleton() {
  return (
    <Container className="py-16">
      <Skeleton className="h-8 w-80" />
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-64 rounded-xl" />
        ))}
      </div>
    </Container>
  );
}

export default function CurrentIssuePage() {
  return (
    <Suspense fallback={<CurrentIssueSkeleton />}>
      <CurrentIssueContent />
    </Suspense>
  );
}
