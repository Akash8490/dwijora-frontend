import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { PageHero } from "@/app/components/containers/common/PageHero";
import { Container } from "@/app/components/containers/common/Container";
import { Section } from "@/app/components/containers/common/Section";
import { Prose } from "@/app/components/containers/common/Prose";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { StatCard } from "@/app/components/containers/common/StatCard";
import { FeatureCard } from "@/app/components/containers/common/FeatureCard";
import { ShieldCheck, Globe2, Award, FileCheck2, BookOpen, Users, Languages, FileText } from "lucide-react";
import { Sanskrit } from "@/app/components/containers/common/Sanskrit";
import { JournalParticularsTable } from "@/app/components/containers/common/JournalParticularsTable";
import { getJournalMeta } from "@/app/lib/services/journal.service";
import { buildMetadata } from "@/app/lib/seo";
import { BRAND } from "@/app/lib/brand";
import { ROUTES } from "@/app/lib/routeEndPoints";

export const metadata: Metadata = buildMetadata({
  title: "About the Journal",
  description: BRAND.metaDescription,
  path: "/about",
});

const LANGUAGES = ["English", "Hindi", "Gujarati"];
const CONTRIBUTION_TYPES = [
  "Research articles",
  "Review papers",
  "Case studies",
  "Book reviews",
  "Interdisciplinary studies",
];
const AUDIENCE = [
  "Researchers",
  "Academicians",
  "Educators",
  "Professionals",
  "Students",
];

async function AboutContent() {
  const { data: meta } = await getJournalMeta();
  return (
    <>
      <PageHero
        eyebrow="About the Journal"
        title={
          <>
            <Sanskrit>{BRAND.nameDeva}</Sanskrit>
            {" "}({BRAND.nameRoman}) – Universal Consciousness &amp; Knowledge
          </>
        }
        subtitle="An international, peer-reviewed, multidisciplinary journal of education and research."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      {/* Brand lockup banner — the full logo lockup as the About page's visual anchor */}
      <section className="border-b border-brand bg-brand-surface-2/70">
        <Container size="lg" className="py-8 md:py-10">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-brand shadow-[0_10px_40px_-20px_rgba(30,42,74,0.35)]">
            <Image
              src="/brand/visvasamvid-lockup.png"
              alt={`${BRAND.nameFull} · ${BRAND.subtitle}`}
              width={1693}
              height={929}
              priority
              sizes="(min-width: 1024px) 900px, 100vw"
              className="w-full h-auto"
            />
          </div>
        </Container>
      </section>

      <Section size="lg">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
          <Prose>
            <h2>About the journal</h2>
            <p>
              <Sanskrit>{BRAND.nameDeva}</Sanskrit>
              {" "}({BRAND.nameRoman}) – Universal Consciousness &amp; Knowledge
              is an international, peer-reviewed, multidisciplinary journal
              dedicated to promoting excellence in education, research, and
              scholarly dialogue across diverse fields of knowledge. The
              journal provides a dynamic platform for researchers,
              academicians, educators, professionals, and students to share
              innovative ideas, original research, and critical perspectives.
              Embracing linguistic diversity,{" "}
              <Sanskrit>{BRAND.nameDeva}</Sanskrit>
              {" "}publishes scholarly contributions in English, Hindi, and
              Gujarati, encouraging inclusive academic participation and
              cross-cultural knowledge exchange. The journal welcomes research
              articles, review papers, case studies, book reviews, and
              interdisciplinary studies that address contemporary challenges
              and advance human understanding. Guided by the timeless Vedic
              principle,{" "}
              <Sanskrit as="em">
                {`“${BRAND.shlokaDeva}”`}
              </Sanskrit>
              {" "}({`“${BRAND.shlokaTranslation.replace(/\.$/, "")}”`}),{" "}
              <Sanskrit>{BRAND.nameDeva}</Sanskrit>
              {" "}aspires to bridge cultures, disciplines, and languages
              while fostering ethical scholarship, intellectual collaboration,
              innovation, and the universal pursuit of knowledge for the
              betterment of society.
            </p>
          </Prose>

          {/* CTA row lives OUTSIDE <Prose> — inside, the .prose-brand a rule
              paints links in --brand-primary, which would render the primary
              Button's text invisible against its --brand-primary background. */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={ROUTES.EDITORIAL_BOARD}>Meet the editorial board</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={ROUTES.AIM_AND_SCOPE}>Read our aim &amp; scope</Link>
            </Button>
          </div>
          </div>

          <div className="flex flex-col gap-4">
            <StatCard label="Editor-in-Chief" value={meta.editorInChief} hint="Institute of Multidisciplinary Research & Journals" icon={<Users className="h-4 w-4" />} />
            <StatCard label="Publisher" value={meta.publisher} hint="IMRJ, India" icon={<BookOpen className="h-4 w-4" />} />
            <StatCard label="Frequency" value={meta.frequency.split(" (")[0]} hint={meta.frequency} icon={<Award className="h-4 w-4" />} />
            <StatCard label="ISSN / e-ISSN" value={`${meta.issn} / ${meta.eIssn}`} hint="Placeholder — pending registration" icon={<FileCheck2 className="h-4 w-4" />} />
          </div>
        </div>
      </Section>

      {/* Journal Particulars — ISSN India Point 6 requires this fact-sheet
          on the main/about page for indexers and reviewers. */}
      <Section
        eyebrow="For indexers, libraries & reviewers"
        title="Journal Particulars"
        subtitle="The standard bibliographic and publisher information required by ISSN India (CSIR-NIScPR) and other indexing bodies."
      >
        <JournalParticularsTable meta={meta} className="mx-auto max-w-4xl" />
      </Section>

      {/* Highlights derived directly from the About paragraph */}
      <Section
        tone="surface-2"
        eyebrow="At a glance"
        title="What we publish, and for whom"
      >
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-brand bg-card-brand p-6 paper-shadow">
            <div className="flex items-center gap-2 text-brand-accent-deep">
              <Languages className="h-5 w-5" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-wider">Languages</p>
            </div>
            <p className="mt-3 text-sm text-brand-muted">
              Scholarly contributions welcomed in three languages so
              scholarship can reach the audiences it belongs to.
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
              <p className="text-xs font-semibold uppercase tracking-wider">Contribution types</p>
            </div>
            <p className="mt-3 text-sm text-brand-muted">
              The journal welcomes original scholarship in a range of forms.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-brand-ink">
              {CONTRIBUTION_TYPES.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-brand bg-card-brand p-6 paper-shadow">
            <div className="flex items-center gap-2 text-brand-accent-deep">
              <Users className="h-5 w-5" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-wider">For</p>
            </div>
            <p className="mt-3 text-sm text-brand-muted">
              A platform for the full scholarly community.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {AUDIENCE.map((a) => (
                <Badge key={a} variant="secondary" className="bg-brand-surface-2 text-brand-ink border border-brand font-normal">
                  {a}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-brand bg-card-brand p-6 md:p-8 paper-shadow">
          <Sanskrit
            as="p"
            variant="quote"
            className="text-2xl md:text-3xl text-brand-accent-deep"
          >
            {BRAND.shlokaDeva}
          </Sanskrit>
          <p className="mt-2 italic text-brand-muted">
            {BRAND.shlokaTranslation}
          </p>
          <p className="mt-4 text-sm text-brand-ink/85">
            The journal&rsquo;s guiding principle — a commitment to ethical
            scholarship, intellectual collaboration, innovation, and the
            universal pursuit of knowledge for the betterment of society.
          </p>
        </div>
      </Section>

      <Section
        tone="surface-2"
        eyebrow="Editorial pillars"
        title="What our editorial process protects"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={<ShieldCheck className="h-5 w-5" />} title="Integrity" description="Independent review, COPE-aligned ethics, transparent handling of complaints." />
          <FeatureCard icon={<Globe2 className="h-5 w-5" />} title="Reach" description="Free-to-read for everyone, everywhere; discoverable through major indexers." />
          <FeatureCard icon={<Award className="h-5 w-5" />} title="Craft" description="Careful copy-editing and typography — because presentation is part of the argument." />
          <FeatureCard icon={<FileCheck2 className="h-5 w-5" />} title="Care" description="Author-friendly timelines, constructive reviewer guidance, respectful correspondence." />
        </div>
      </Section>
    </>
  );
}

function AboutSkeleton() {
  return (
    <>
      <div className="bg-surface-2">
        <Container className="py-16">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-3 h-10 w-2/3" />
          <Skeleton className="mt-4 h-5 w-1/2" />
        </Container>
      </div>
      <Container className="py-16">
        <Skeleton className="h-6 w-56" />
        <div className="mt-4 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-10/12" />
        </div>
      </Container>
    </>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<AboutSkeleton />}>
      <AboutContent />
    </Suspense>
  );
}
