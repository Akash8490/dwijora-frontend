import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { PageHero } from "@/app/components/containers/common/PageHero";
import { Container } from "@/app/components/containers/common/Container";
import { Section } from "@/app/components/containers/common/Section";
import { IssueCard } from "@/app/components/containers/common/IssueCard";
import { EmptyState } from "@/app/components/containers/common/EmptyState";
import { Skeleton } from "@/app/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { getArchive } from "@/app/lib/services/journal.service";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Archive",
  description: "Browse past volumes and issues of Viśvasaṃvid.",
  path: "/archive",
});

async function ArchiveContent() {
  const { data } = await getArchive();
  const reversed = [...data].reverse();
  const totalIssues = data.reduce((n, x) => n + x.issues.length, 0);

  if (!data.length) {
    return (
      <Container className="py-16">
        <EmptyState title="No archive yet" description="Published volumes will appear here." />
      </Container>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Archive"
        title="Past volumes & issues"
        subtitle={`${data.length} volumes · ${totalIssues} issues published to date.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Archive" },
        ]}
      />
      <Section size="md">
        <h2 className="sr-only">Browse the archive</h2>
        <Tabs defaultValue="volumes">
          <TabsList>
            <TabsTrigger value="volumes">By volume</TabsTrigger>
            <TabsTrigger value="all">All issues</TabsTrigger>
          </TabsList>
          <TabsContent value="volumes" className="mt-6">
            <Accordion type="multiple" className="w-full">
              {reversed.map(({ volume, issues }) => (
                <AccordionItem
                  key={volume.id}
                  value={volume.id}
                  className="rounded-xl border border-brand bg-card-brand px-4 my-3 paper-shadow"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent-deep">
                        Volume {String(volume.number).padStart(2, "0")} · {volume.year}
                      </span>
                      <span className="font-display text-lg text-brand-ink">
                        {volume.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-2 pb-4">
                      {issues.length ? (
                        issues.map((issue) => (
                          <IssueCard
                            key={issue.id}
                            issue={issue}
                            volume={volume}
                            paperCount={issue.paperIds.length}
                          />
                        ))
                      ) : (
                        <p className="text-sm text-brand-muted">
                          No issues published in this volume yet.
                        </p>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {reversed.flatMap(({ volume, issues }) =>
                issues.map((issue) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    volume={volume}
                    paperCount={issue.paperIds.length}
                  />
                )),
              )}
            </div>
          </TabsContent>
        </Tabs>

        <p className="mt-8 text-sm text-brand-muted">
          Looking for a specific paper?{" "}
          <Link href="/search" className="font-medium text-brand-primary hover:text-brand-accent-deep">
            Search the archive
          </Link>
          .
        </p>
      </Section>
    </>
  );
}

function ArchiveSkeleton() {
  return (
    <Container className="py-16">
      <Skeleton className="h-8 w-72" />
      <div className="mt-8 space-y-6">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>
    </Container>
  );
}

export default function ArchivePage() {
  return (
    <Suspense fallback={<ArchiveSkeleton />}>
      <ArchiveContent />
    </Suspense>
  );
}
