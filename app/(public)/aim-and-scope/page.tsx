import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHero } from "@/app/components/containers/common/PageHero";
import { Container } from "@/app/components/containers/common/Container";
import { Section } from "@/app/components/containers/common/Section";
import { Prose } from "@/app/components/containers/common/Prose";
import { FeatureCard } from "@/app/components/containers/common/FeatureCard";
import { Badge } from "@/app/components/ui/badge";
import { Skeleton } from "@/app/components/ui/skeleton";
import {
  GraduationCap,
  Landmark,
  FlaskConical,
  Cpu,
  Users,
  Briefcase,
  Languages,
  FileText,
  LayersIcon,
} from "lucide-react";
import { Sanskrit } from "@/app/components/containers/common/Sanskrit";
import { getCategories } from "@/app/lib/services/journal.service";
import { buildMetadata } from "@/app/lib/seo";
import { BRAND } from "@/app/lib/brand";
import { ROUTES } from "@/app/lib/routeEndPoints";

export const metadata: Metadata = buildMetadata({
  title: "Aim & Scope",
  description:
    "The disciplines, article types, and languages Viśvasaṃvid publishes — a peer-reviewed, multidisciplinary journal welcoming scholarly work across every field of knowledge.",
  path: "/aim-and-scope",
});

const ICON_BY_SLUG: Record<string, React.ReactNode> = {
  education: <GraduationCap className="h-5 w-5" />,
  humanities: <Landmark className="h-5 w-5" />,
  "social-sciences": <Users className="h-5 w-5" />,
  sciences: <FlaskConical className="h-5 w-5" />,
  technology: <Cpu className="h-5 w-5" />,
  management: <Briefcase className="h-5 w-5" />,
  interdisciplinary: <LayersIcon className="h-5 w-5" />,
};

const LANGUAGES = ["Multi Language"];
const CONTRIBUTION_TYPES = [
  "Research articles",
  "Review papers",
  "Case studies",
  "Book reviews",
  "Interdisciplinary studies",
  "Seminar papers",
  "Conference papers",
  "Special issues",
];

async function ScopeContent() {
  const { data: categories } = await getCategories();
  return (
    <>
      <PageHero
        eyebrow="Aim & Scope"
        title="Disciplines, languages, and contribution types"
        subtitle="A peer-reviewed, multidisciplinary journal welcoming scholarly work across every field of knowledge."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Aim & Scope" },
        ]}
      />
      <Section size="lg">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Prose>
            <h2>Our aim</h2>
            <p>
              <Sanskrit>{BRAND.nameDeva}</Sanskrit>
              {" "}({BRAND.nameRoman}) is dedicated to promoting scholarly
              excellence and dialogue across diverse fields of knowledge. The journal provides a dynamic platform
              for researchers, academicians, educators, professionals, and
              students to share innovative ideas, original research, and
              critical perspectives.
            </p>

            <h2>Scope</h2>
            <p>
              The journal welcomes research articles, review papers, case
              studies, book reviews, interdisciplinary studies, seminar
              and conference papers, and special issues that address
              contemporary challenges and advance human understanding.
              Embracing linguistic diversity, contributions are accepted
              in multiple languages.
            </p>

            {/* TODO(client): supply detailed, per-discipline aim & scope copy
                (topical priorities, out-of-scope notes, methodological
                preferences). The paragraphs above are drawn verbatim from the
                official About statement — nothing further has been fabricated. */}

            <p>
              For the full editorial statement, see the{" "}
              <Link href={ROUTES.ABOUT}>About the Journal</Link> page.
            </p>
          </Prose>

          <div className="grid gap-4 sm:grid-cols-2">
            {categories?.map((c) => (
              <FeatureCard
                key={c.id}
                icon={ICON_BY_SLUG[c.slug] ?? <LayersIcon className="h-5 w-5" />}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section
        tone="surface-2"
        eyebrow="At a glance"
        title="Languages & contribution types"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-brand bg-card-brand p-6 paper-shadow">
            <div className="flex items-center gap-2 text-brand-accent-deep">
              <Languages className="h-5 w-5" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-wider">Languages published</p>
            </div>
            <p className="mt-3 text-sm text-brand-muted">
              Scholarly contributions are welcomed in multiple languages so
              research can reach the audiences it belongs to.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {LANGUAGES.map((l) => (
                <Badge key={l} variant="secondary" className="bg-brand-surface-2 text-brand-ink border border-brand font-normal">
                  {l}
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-brand bg-card-brand p-6 paper-shadow">
            <div className="flex items-center gap-2 text-brand-accent-deep">
              <FileText className="h-5 w-5" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-wider">Accepted contribution types</p>
            </div>
            <ul className="mt-4 space-y-1.5 text-sm text-brand-ink">
              {CONTRIBUTION_TYPES.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}

function ScopeSkeleton() {
  return (
    <Container className="py-16">
      <Skeleton className="h-10 w-1/2" />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[0, 1, 2, 3]?.map((i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>
    </Container>
  );
}

export default function AimAndScopePage() {
  return (
    <Suspense fallback={<ScopeSkeleton />}>
      <ScopeContent />
    </Suspense>
  );
}
