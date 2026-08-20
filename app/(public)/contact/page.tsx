import type { Metadata } from "next";
import { Mail, MapPin, Phone, User2, Map, Building2 } from "lucide-react";
import { PageHero } from "@/app/components/containers/common/PageHero";
import { Container } from "@/app/components/containers/common/Container";
import { Callout } from "@/app/components/containers/common/Callout";
import { ContactForm } from "@/app/(public)/contact/_contact/ContactForm";
import { getJournalMeta } from "@/app/lib/services/journal.service";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Reach the Viśvasaṃvid editorial office.",
  path: "/contact",
});

export default async function ContactPage() {
  const { data: meta } = await getJournalMeta();
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach the editorial office"
        subtitle="We reply to editorial and indexing enquiries within 3 working days."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />
      <Container className="py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-2xl text-brand-ink">Send us a message</h2>
            <p className="mt-1 text-sm text-brand-muted">
              For editorial enquiries, submissions status, or partnership proposals.
            </p>
            <div className="mt-6 rounded-xl border border-brand bg-card-brand p-5 md:p-6 paper-shadow">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-4">
            {/* Publisher Information — labelled block matching the ISSN India
                "Publisher Information" example so their reviewers can locate
                every mandatory field (Publishing Body, Address, Editor-in-Chief,
                Email) at a glance. */}
            <div className="rounded-xl border border-brand bg-card-brand p-5 paper-shadow">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent-deep">
                Publisher Information
              </p>
              <h3 className="mt-1 font-display text-lg text-brand-ink">
                Publishing Body
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Building2 className="mt-0.5 h-4 w-4 text-brand-primary" aria-hidden />
                  <span className="text-brand-ink">
                    <strong className="block">Institute of Multidisciplinary Research &amp; Journals (IMRJ)</strong>
                    <span className="text-brand-muted">Publisher of {meta.name}</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <User2 className="mt-0.5 h-4 w-4 text-brand-primary" aria-hidden />
                  <span className="text-brand-ink">
                    <strong className="block">{meta.publisher}</strong>
                    <span className="text-brand-muted">Publisher &amp; Managing Editor</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <User2 className="mt-0.5 h-4 w-4 text-brand-primary" aria-hidden />
                  <span className="text-brand-ink">
                    <strong className="block">{meta.editorInChief}</strong>
                    <span className="text-brand-muted">Editor-in-Chief</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-brand-primary" aria-hidden />
                  <span className="text-brand-ink">{meta.publisherAddress}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-brand-primary" aria-hidden />
                  <a
                    href={`mailto:${meta.contactEmail}`}
                    className="text-brand-ink hover:text-brand-accent-deep"
                  >
                    {meta.contactEmail}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-brand-primary" aria-hidden />
                  <span className="text-brand-ink">{meta.contactPhone}</span>
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-xl border border-brand bg-card-brand paper-shadow">
              <div className="flex h-48 items-center justify-center bg-brand-surface-2 text-brand-muted">
                <div className="text-center">
                  <Map className="mx-auto h-8 w-8" aria-hidden />
                  <p className="mt-2 text-xs">Map placeholder</p>
                  {/* TODO(client): embed real map (Mapbox or Google Maps) with editorial office coordinates. */}
                </div>
              </div>
            </div>

            <Callout tone="info" title="Response time">
              Editorial replies within 3 working days. Submissions are acknowledged within 5 working days after upload.
            </Callout>
          </aside>
        </div>
      </Container>
    </>
  );
}
