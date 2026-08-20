import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/app/components/containers/common/PageHero";
import { Container } from "@/app/components/containers/common/Container";
import { SectionHeading } from "@/app/components/containers/common/SectionHeading";
import { EditorCard } from "@/app/components/containers/common/EditorCard";
import { Skeleton } from "@/app/components/ui/skeleton";
import { getBoardMembers } from "@/app/lib/services/journal.service";
import {
  EDITOR_GROUP_ORDER,
  boardGroupLabel,
  groupBoardMembers,
} from "@/app/lib/transform/journal.transform";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Editorial Board",
  description:
    "Meet the Chief Editor, Deputy Chief Editor, Editors, and Associate Editors & Reviewers of Viśvasaṃvid — scholars from India and abroad who guide the journal's editorial direction.",
  path: "/editorial-board",
});

const GROUP_INTRO: Partial<Record<(typeof EDITOR_GROUP_ORDER)[number], string>> = {
  chief: "Leads editorial policy and final decisions on manuscripts.",
  "deputy-chief":
    "Deputises for the Chief Editor and oversees editorial coordination across sections.",
  editor:
    "Oversee subject-area reviews, curate incoming manuscripts, and support authors through revision.",
  associate:
    "Peer reviewers and section editors who evaluate submissions and safeguard scholarly standards.",
  technical:
    "Support publication production — typesetting, digital formatting, and web-facing content across issues.",
};

// Groups rendered with the full-width "featured" card treatment — senior
// tiers get prominence at the top of the page. Everyone else falls into the
// standard 3-column card grid.
const FEATURED_GROUPS = new Set<(typeof EDITOR_GROUP_ORDER)[number]>([
  "chief",
  "deputy-chief",
]);

async function BoardContent() {
  const { data: members } = await getBoardMembers();
  const grouped = groupBoardMembers(members);

  return (
    <>
      <PageHero
        eyebrow="Editorial Leadership"
        title="Editorial Board"
        subtitle="Scholars from India and abroad who guide the journal's editorial direction and safeguard its scholarly standards."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Editorial Board" },
        ]}
      />
      <Container className="py-14 md:py-20 space-y-16">
        {EDITOR_GROUP_ORDER.map((group) => {
          const list = grouped[group] ?? [];
          if (!list.length) return null;

          if (FEATURED_GROUPS.has(group)) {
            return (
              <section key={group}>
                <SectionHeading
                  as="h2"
                  title={boardGroupLabel(group)}
                  subtitle={GROUP_INTRO[group]}
                />
                <div className="mt-6 grid grid-cols-1 gap-4">
                  {list.map((e) => (
                    <EditorCard key={e.id} editor={e} featured />
                  ))}
                </div>
              </section>
            );
          }

          return (
            <section key={group}>
              <SectionHeading
                as="h2"
                title={boardGroupLabel(group)}
                subtitle={GROUP_INTRO[group]}
              />
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((e) => (
                  <EditorCard key={e.id} editor={e} />
                ))}
              </div>
            </section>
          );
        })}
      </Container>
    </>
  );
}

function BoardSkeleton() {
  return (
    <Container className="py-16 space-y-12">
      <section>
        <Skeleton className="h-6 w-56" />
        <Skeleton className="mt-6 h-40 rounded-xl" />
      </section>
      {[0, 1].map((i) => (
        <section key={i}>
          <Skeleton className="h-6 w-56" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((j) => (
              <Skeleton key={j} className="h-64 rounded-xl" />
            ))}
          </div>
        </section>
      ))}
    </Container>
  );
}

export default function EditorialBoardPage() {
  return (
    <Suspense fallback={<BoardSkeleton />}>
      <BoardContent />
    </Suspense>
  );
}
