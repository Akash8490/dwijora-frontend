import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/components/containers/common/PageHero";
import { Container } from "@/app/components/containers/common/Container";
import { Section } from "@/app/components/containers/common/Section";
import { Eyebrow } from "@/app/components/containers/common/Eyebrow";
import { AccentRule } from "@/app/components/containers/common/AccentRule";
import { Callout } from "@/app/components/containers/common/Callout";
import { StatCard } from "@/app/components/containers/common/StatCard";
import { IndexingBadge } from "@/app/components/containers/common/IndexingBadge";
import { PaperCard } from "@/app/components/containers/common/PaperCard";
import { EditorCard } from "@/app/components/containers/common/EditorCard";
import { FeatureCard } from "@/app/components/containers/common/FeatureCard";
import { StepCard } from "@/app/components/containers/common/StepCard";
import { EmptyState } from "@/app/components/containers/common/EmptyState";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Card } from "@/app/components/ui/card";
import { ShieldCheck, Globe2, FileText, BookOpen } from "lucide-react";
import { Sanskrit } from "@/app/components/containers/common/Sanskrit";
import { editors, papers } from "@/app/lib/services/mock/journal.mock";
import { BRAND } from "@/app/lib/brand";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Style Guide",
  description: `Design tokens and reusable components for ${BRAND.nameRoman}.`,
  path: "/style-guide",
  noIndex: true,
});

const TOKEN_SWATCHES: Array<{ name: string; token: string; hint: string }> = [
  { name: "brand-ink", token: "var(--brand-ink)", hint: "Deep indigo — text & headings" },
  { name: "brand-primary", token: "var(--brand-primary)", hint: "Royal indigo — links, CTAs" },
  { name: "brand-accent", token: "var(--brand-accent)", hint: "Marigold — sparingly" },
  { name: "brand-accent-deep", token: "var(--brand-accent-deep)", hint: "Amber — hover accents" },
  { name: "brand-surface", token: "var(--brand-surface)", hint: "Warm ivory — page bg" },
  { name: "brand-surface-2", token: "var(--brand-surface-2)", hint: "Soft parchment" },
  { name: "brand-card", token: "var(--brand-card)", hint: "White cards" },
  { name: "brand-border", token: "var(--brand-border)", hint: "Borders" },
  { name: "brand-success", token: "var(--brand-success)", hint: "Success" },
  { name: "brand-danger", token: "var(--brand-danger)", hint: "Danger" },
];

export default function StyleGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="Internal"
        title="Style Guide"
        subtitle="Design tokens, type scale, and reusable components — for the design team and future contributors."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Style Guide" },
        ]}
      />

      <Section eyebrow="Colour" title="Palette">
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {TOKEN_SWATCHES.map((s) => (
            <div key={s.name} className="rounded-xl border border-brand bg-card-brand p-3 paper-shadow">
              <div
                className="h-14 w-full rounded-md border border-brand"
                style={{ backgroundColor: s.token }}
                aria-hidden
              />
              <p className="mt-2 font-mono text-xs text-brand-ink">{s.name}</p>
              <p className="text-xs text-brand-muted">{s.hint}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Typography" title="Type scale" tone="surface-2">
        <div className="space-y-4">
          <div>
            <p className="text-xs text-brand-muted">Display / Fraunces</p>
            <p className="font-display text-5xl text-brand-ink">Aa — Editorial serif</p>
          </div>
          <div>
            <p className="text-xs text-brand-muted">Body / Inter</p>
            <p className="text-base text-brand-ink">Aa — Body sans</p>
          </div>
          <div>
            <p className="text-xs text-brand-muted">Devanagari / Noto Serif Devanagari</p>
            <Sanskrit as="p" variant="display" className="text-4xl text-brand-ink">
              {BRAND.nameDeva}
            </Sanskrit>
            <Sanskrit as="p" variant="quote" className="mt-2 text-lg text-brand-accent-deep">
              {BRAND.shlokaDeva}
            </Sanskrit>
          </div>
          <div className="space-y-1 border-t border-brand pt-4">
            <p className="font-display text-4xl">H1 · Display 48</p>
            <p className="font-display text-3xl">H2 · Display 32</p>
            <p className="font-display text-2xl">H3 · Display 26</p>
            <p className="text-base">Body 16 — the quick brown fox jumps over the lazy dog.</p>
            <p className="text-sm text-brand-muted">Small 14 — for meta.</p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Ornaments" title="Rule & badges">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <Eyebrow>Eyebrow label</Eyebrow>
            <div className="mt-2">
              <AccentRule />
            </div>
          </div>
          <div className="flex flex-wrap items-start gap-2">
            <IndexingBadge
              name="Google Scholar"
              status="Discoverability subject to crawling"
            />
            <IndexingBadge name="ROAD" status="Application planned" />
            <IndexingBadge name="Scilit" status="Application planned" />
          </div>
        </div>
      </Section>

      <Section eyebrow="Buttons" title="Buttons & badges" tone="surface-2">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </Section>

      <Section eyebrow="Forms" title="Form controls">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-brand bg-card-brand p-4">
            <label className="text-sm text-brand-ink">Input</label>
            <Input className="mt-1" placeholder="Placeholder" />
            <label className="mt-4 block text-sm text-brand-ink">Textarea</label>
            <Textarea className="mt-1" rows={4} placeholder="Long text" />
          </Card>
          <Card className="border-brand bg-card-brand p-4">
            <p className="text-sm text-brand-ink">Callouts</p>
            <div className="mt-3 space-y-2">
              <Callout tone="info" title="Info">Editorial note.</Callout>
              <Callout tone="warning" title="Heads up">Non-blocking warning.</Callout>
              <Callout tone="success" title="Success">All good.</Callout>
              <Callout tone="danger" title="Danger">Something serious.</Callout>
            </div>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Cards" title="Domain cards" tone="surface-2">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Papers" value="1,284" hint="Since 2023" icon={<FileText className="h-4 w-4" />} />
          <FeatureCard icon={<ShieldCheck className="h-5 w-5" />} title="Rigorous review" description="Double-blind." />
          <StepCard step={1} title="Prepare manuscript" description="Follow the author guidelines." icon={<BookOpen className="h-5 w-5" />} />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <PaperCard paper={papers[0]} categoryName="Education" />
          <EditorCard editor={editors[0]} />
          <FeatureCard icon={<Globe2 className="h-5 w-5" />} title="Global readership" description="Discoverable in academic indexes." />
        </div>
      </Section>

      <Section eyebrow="States" title="Loading & empty">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-brand bg-card-brand p-4 space-y-2">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-10/12" />
          </div>
          <EmptyState title="Nothing here yet" description="This is what an empty state looks like." action={<Button asChild variant="outline"><Link href="/">Home</Link></Button>} />
        </div>
      </Section>

      <Section eyebrow="Awards" title="Motion & shadow" tone="surface-2">
        <div className="flex flex-wrap gap-4">
          <div className="rounded-xl border border-brand bg-card-brand p-6 paper-shadow paper-shadow-hover">
            Hover me — subtle lift & shadow.
          </div>
          <div className="rounded-xl border border-brand bg-card-brand p-6 paper-shadow">
            paper-shadow (rest state)
          </div>
        </div>
        <p className="mt-4 text-xs text-brand-muted">
          Motion respects <code>prefers-reduced-motion</code>. Cards fade-up in
          view on public pages via <code>MotionInView</code>.
        </p>
      </Section>

      <div className="border-t border-brand py-8">
        <Container>
          <p className="text-xs text-brand-muted">
            Internal review page. Remove or gate before public launch (search-engine indexing already disabled).
          </p>
        </Container>
      </div>
    </>
  );
}
