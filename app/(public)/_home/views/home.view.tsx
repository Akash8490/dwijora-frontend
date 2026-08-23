import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Globe2,
  FileCheck2,
  Award,
  UserCheck,
  UploadCloud,
  Mail,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Container } from "@/app/components/containers/common/Container";
import { Section } from "@/app/components/containers/common/Section";
import { AccentRule } from "@/app/components/containers/common/AccentRule";
import { Eyebrow } from "@/app/components/containers/common/Eyebrow";
import { PaperCard } from "@/app/components/containers/common/PaperCard";
import { EditorCard } from "@/app/components/containers/common/EditorCard";
import { FeatureCard } from "@/app/components/containers/common/FeatureCard";
import { StepCard } from "@/app/components/containers/common/StepCard";
import { StatCard } from "@/app/components/containers/common/StatCard";
import { IndexingBadge } from "@/app/components/containers/common/IndexingBadge";
import { MotionInView } from "@/app/components/containers/common/MotionInView";
import { Sanskrit } from "@/app/components/containers/common/Sanskrit";
import { BRAND } from "@/app/lib/brand";
import { ROUTES } from "@/app/lib/routeEndPoints";
import { formatCount } from "@/app/(public)/_home/home.helper";
import type { HomeViewData } from "@/app/(public)/_home/home.transform";
import styles from "@/app/(public)/_home/home.module.css";

export interface HomeViewProps {
  data: HomeViewData;
}

export function HomeView({ data }: HomeViewProps) {
  const {
    meta,
    currentIssue,
    currentVolume,
    featuredPapers,
    latestPapers,
    categoryById,
    editorsPreview,
    indexing,
    totals,
  } = data;

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div aria-hidden className={styles.heroOrnament} />
        <Container size="xl" className="relative py-16 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-center">
            <div>
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-brand-accent/50 bg-brand-accent shadow-[0_6px_18px_-8px_rgba(224,162,43,0.6)]"
                >
                  <Image
                    src="/brand/visvasamvid-emblem.png"
                    alt=""
                    fill
                    sizes="56px"
                    priority
                    className="object-cover"
                  />
                </span>
                <span className={styles.shlokaBadge}>
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-brand-accent"
                  />
                  {meta.tagline}
                </span>
              </div>
              <Sanskrit
                as="h1"
                variant="display"
                className="mt-6 text-5xl md:text-7xl text-brand-ink"
              >
                {BRAND.nameDeva}
              </Sanskrit>
              <p className="mt-3 font-display text-2xl md:text-3xl italic text-brand-primary">
                {BRAND.nameRoman}
              </p>
              <AccentRule className="mt-5" />
              <Sanskrit
                as="p"
                variant="quote"
                className="mt-5 text-lg md:text-xl text-brand-accent-deep"
              >
                {BRAND.shlokaDeva}
              </Sanskrit>
              <p className="mt-1 text-sm italic text-brand-muted">
                {BRAND.shlokaTranslation}
              </p>
              <p className="mt-6 max-w-2xl text-base md:text-lg text-brand-ink/85 leading-relaxed">
                A peer-reviewed, open-access journal publishing rigorous
                scholarship across education, humanities, sciences, technology,
                and interdisciplinary research — rooted in the Indian
                intellectual tradition and open to the world.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href={ROUTES.SUBMIT_PAPER}>
                    Submit Paper <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={ROUTES.CURRENT_ISSUE}>
                    Browse Current Issue
                  </Link>
                </Button>
              </div>
            </div>

            <MotionInView
              delay={0.1}
              className="rounded-2xl border border-brand bg-card-brand p-6 md:p-8 paper-shadow"
            >
              <Eyebrow>Current Issue</Eyebrow>
              <div className="mt-3 flex items-start gap-4">
                <div
                  aria-hidden
                  className="flex h-20 w-16 shrink-0 items-center justify-center rounded-md bg-brand-primary text-white paper-shadow"
                >
                  <BookOpen className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent-deep">
                    Vol. {currentVolume ? String(currentVolume.number).padStart(2, "0") : "—"} · Issue {String(currentIssue.number).padStart(2, "0")} · {currentIssue.month} {currentIssue.year}
                  </p>
                  <h2 className="mt-1 font-display text-xl md:text-2xl text-brand-ink leading-snug">
                    {currentIssue.title}
                  </h2>
                </div>
              </div>
              <ul className="mt-5 space-y-3">
                {featuredPapers.map((p) => (
                  <li key={p.id} className="border-t border-brand pt-3 first:border-0 first:pt-0">
                    <Link
                      href={`/paper/${p.slug}`}
                      className="group block"
                    >
                      <p className="text-sm font-medium text-brand-ink group-hover:text-brand-accent-deep leading-snug">
                        {p.title}
                      </p>
                      <p className="mt-1 text-xs text-brand-muted line-clamp-1">
                        {p.authors.map((a) => a.fullName).join(", ")}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={ROUTES.CURRENT_ISSUE}
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-primary hover:text-brand-accent-deep"
              >
                View full issue <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </MotionInView>
          </div>
        </Container>
      </section>

      {/* INDEXING / STATS STRIP */}
      {/* Wording is deliberately factual: "Indexing applications in progress"
          — not "Indexed with". We are not yet listed in any of the target
          databases; false indexing claims are a predatory-journal red flag
          and grounds for delisting once we are accepted. Each badge will
          become a link to the official database record as confirmations
          arrive; until then they read as targets. */}
      <section className="border-y border-brand bg-brand-surface-2/60 py-6">
        <Container size="xl">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                Indexing applications in progress
              </span>
              <div className="flex flex-wrap gap-2">
                {indexing.map((i) => (
                  <IndexingBadge key={i} name={i} />
                ))}
              </div>
            </div>
            <p className="text-xs text-brand-muted">
              Listings will move to a confirmed section as each service
              completes its evaluation. Papers become discoverable through
              Google Scholar automatically after publication.
            </p>
          </div>
        </Container>
      </section>

      {/* STATS */}
      <Section size="md" tone="none">
        <MotionInView>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard label="Published papers" value={formatCount(totals.papers)} icon={<FileCheck2 className="h-4 w-4" />} />
            <StatCard label="Issues released" value={formatCount(totals.issues)} icon={<BookOpen className="h-4 w-4" />} />
            <StatCard label="Volumes" value={formatCount(totals.volumes)} icon={<Award className="h-4 w-4" />} />
            <StatCard label="Contributing authors" value={formatCount(totals.authors)} icon={<UserCheck className="h-4 w-4" />} />
          </div>
        </MotionInView>
      </Section>

      {/* ABOUT INTRO */}
      <Section
        tone="surface-2"
        eyebrow="About the Journal"
        title={
          <>
            <Sanskrit>{BRAND.nameDeva}</Sanskrit>
            {" "}({BRAND.nameRoman}) – Universal Consciousness &amp; Knowledge
          </>
        }
        subtitle={
          <>
            <Sanskrit>{BRAND.nameDeva}</Sanskrit>
            {" "}({BRAND.nameRoman}) – Universal Consciousness &amp; Knowledge
            is an international, peer-reviewed, multidisciplinary journal
            dedicated to promoting scholarly excellence and dialogue across
            diverse fields of knowledge. The
            journal provides a dynamic platform for researchers, academicians,
            educators, professionals, and students to share innovative ideas,
            original research, and critical perspectives.
          </>
        }
        actions={
          <Button asChild variant="outline">
            <Link href={ROUTES.ABOUT}>
              Read more about the journal
              <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        }
      >
        <MotionInView>
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Peer-reviewed"
              description="Double-blind review by international scholars, with transparent editorial standards aligned with COPE guidance."
            />
            <FeatureCard
              icon={<Globe2 className="h-5 w-5" />}
              title="Trilingual publication"
              description="A multilingual publication — encouraging inclusive academic participation and cross-cultural exchange."
            />
            <FeatureCard
              icon={<Award className="h-5 w-5" />}
              title="Multidisciplinary"
              description="Research articles, review papers, case studies, book reviews, and interdisciplinary studies across every field of knowledge."
            />
          </div>
        </MotionInView>
      </Section>

      {/* LATEST PAPERS */}
      <Section
        eyebrow="Recently published"
        title="Latest papers"
        subtitle={`A selection of the newest research to appear in ${BRAND.nameRoman}.`}
        actions={
          <Button asChild variant="outline">
            <Link href={ROUTES.CURRENT_ISSUE}>See all papers</Link>
          </Button>
        }
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {latestPapers.map((p, i) => (
            <MotionInView key={p.id} delay={i * 0.05}>
              <PaperCard
                paper={p}
                categoryName={categoryById[p.categoryId]?.name}
              />
            </MotionInView>
          ))}
        </div>
      </Section>

      {/* WHY PUBLISH WITH US */}
      <Section
        tone="surface-2"
        eyebrow="Why publish with us"
        title="A serious home for your best work"
        align="left"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Rigorous peer review"
            description="Double-blind evaluation from subject specialists with clear reviewer guidance."
          />
          <FeatureCard
            icon={<Globe2 className="h-5 w-5" />}
            title="Global readership"
            description="Papers are indexed by Google Scholar after publication; further discoverability grows as indexing applications complete."
          />
          <FeatureCard
            icon={<Award className="h-5 w-5" />}
            title="Authors keep copyright"
            description="Permissive open-access licence; distribute and adapt with attribution."
          />
          <FeatureCard
            icon={<FileCheck2 className="h-5 w-5" />}
            title="Editorial care"
            description="Careful copy-editing, planned DOI registration, and long-term hosting."
          />
        </div>
      </Section>

      {/* HOW TO SUBMIT */}
      <Section
        eyebrow="How to submit"
        title="From manuscript to publication in four clear steps"
        subtitle="Our submission process is transparent, timely, and author-friendly."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StepCard step={1} title="Prepare your manuscript" description="Format your paper following the journal's Instructions for Authors." icon={<FileCheck2 className="h-5 w-5" />} />
          <StepCard step={2} title="Submit online" description="Upload your PDF/DOCX along with author details and the signed declaration." icon={<UploadCloud className="h-5 w-5" />} />
          <StepCard step={3} title="Editorial screen & peer review" description="Editorial team screens, then double-blind reviewers evaluate the submission." icon={<UserCheck className="h-5 w-5" />} />
          <StepCard step={4} title="Publication & indexing" description="Accepted papers appear in a scheduled issue and are indexed across our partners." icon={<Award className="h-5 w-5" />} />
        </div>
        <div className="mt-8">
          <Button asChild>
            <Link href={ROUTES.AUTHOR_GUIDELINES}>Read author guidelines</Link>
          </Button>
        </div>
      </Section>

      {/* EDITORIAL BOARD PREVIEW */}
      <Section
        tone="surface-2"
        eyebrow="Editorial leadership"
        title="Guided by scholars of standing"
        actions={
          <Button asChild variant="outline">
            <Link href={ROUTES.EDITORIAL_BOARD}>View full board</Link>
          </Button>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {editorsPreview.map((e, i) => (
            <MotionInView key={e.id} delay={i * 0.05}>
              <EditorCard editor={e} />
            </MotionInView>
          ))}
        </div>
      </Section>

      {/* CALL FOR PAPERS BAND */}
      <section className="relative overflow-hidden bg-brand-ink text-white">
        <div aria-hidden className="ornament-dots absolute inset-0 opacity-30" />
        <Container size="lg" className="relative py-16 md:py-20 text-center">
          <Eyebrow className="text-brand-accent">Call for Papers</Eyebrow>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-white">
            {/* TODO(client): confirm the target volume/issue for open submissions. */}
            Volume 01 · Issue 02 is open for submissions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            We invite original research, review articles, and reflective essays
            from scholars around the world. Rolling submissions; expedited
            editorial screening.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-brand-accent text-brand-ink hover:bg-brand-accent/90">
              <Link href={ROUTES.SUBMIT_PAPER}>Start a submission</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              /* bg-transparent overrides the outline variant's `bg-background`
                 (ivory), which was rendering the white label invisible.
                 hover:text-white blocks the variant's `hover:text-accent-foreground`
                 so the label stays white on hover. */
              className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href={ROUTES.AUTHOR_GUIDELINES}>Author guidelines</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* CONTACT / PRE-FOOTER */}
      <Section size="md">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Eyebrow>Contact</Eyebrow>
            <h2 className="mt-3 font-display text-2xl md:text-3xl text-brand-ink">
              We&apos;d love to hear from you
            </h2>
            <p className="mt-3 max-w-xl text-brand-muted">
              For editorial queries, indexing requests, or partnership
              proposals, write to the editorial office.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={ROUTES.CONTACT}>
                  <Mail className="mr-2 h-4 w-4" /> Contact editorial
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={ROUTES.AIM_AND_SCOPE}>Aim & Scope</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-xl border border-brand bg-card-brand p-6 paper-shadow">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              Editorial office
            </p>
            <p className="mt-2 font-display text-lg text-brand-ink">
              {meta.editorInChief}
            </p>
            <p className="text-sm text-brand-muted">Editor-in-Chief</p>
            <p className="mt-3 text-sm text-brand-ink">
              {meta.contactEmail}
            </p>
            <p className="text-sm text-brand-muted">{meta.address}</p>
          </div>
        </div>
      </Section>
    </>
  );
}
