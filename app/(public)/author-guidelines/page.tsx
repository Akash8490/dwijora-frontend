import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileCheck2 } from "lucide-react";
import { PageHero } from "@/app/components/containers/common/PageHero";
import { Section } from "@/app/components/containers/common/Section";
import { Prose } from "@/app/components/containers/common/Prose";
import { Callout } from "@/app/components/containers/common/Callout";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { ROUTES } from "@/app/lib/routeEndPoints";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Instructions for Authors",
  description:
    "Manuscript preparation, structure, submission checklist, and templates for authors submitting to Viśvasaṃvid.",
  path: "/author-guidelines",
});

export default function AuthorGuidelinesPage() {
  return (
    <>
      <PageHero
        eyebrow="For Authors"
        title="Instructions for Authors"
        subtitle="Everything you need to prepare and submit a manuscript to Viśvasaṃvid."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "For Authors" },
          { label: "Instructions for Authors" },
        ]}
      />
      <Section size="lg">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Prose>
            <h2>Manuscript preparation</h2>
            <p>
              Manuscripts should be prepared as a single Microsoft Word (DOCX)
              or PDF file, in A4 format, 1.5 line spacing, Times New Roman
              12pt (body) with clear headings.
            </p>
            <h3>Structure</h3>
            <ol>
              <li>Title (concise and informative)</li>
              <li>Author names, affiliations, and email addresses (corresponding author marked)</li>
              <li>Abstract (150–250 words) and 4–6 keywords</li>
              <li>Introduction / background</li>
              <li>Methods (with sufficient detail for replication)</li>
              <li>Results and discussion</li>
              <li>Conclusion</li>
              <li>Acknowledgements, funding, conflict of interest</li>
              <li>References (APA 7th edition)</li>
              <li>Tables and figures with captions</li>
            </ol>
            <h3>Length</h3>
            <p>Full research articles: 5,000–8,000 words including references. Short communications: up to 3,000 words. Reviews: up to 10,000 words.</p>

            <h2>Submission</h2>
            <p>
              Use the online <Link href={ROUTES.SUBMIT_PAPER}>Submit Paper</Link>{" "}
              form. Uploads must be under 5 MB. You will need the corresponding
              author&apos;s details, the manuscript file, and a signed
              declaration/copyright form.
            </p>

            <h2>Ethics</h2>
            <p>
              All submissions are handled under the journal&apos;s{" "}
              <Link href={ROUTES.PUBLICATION_ETHICS}>Publication Ethics</Link>{" "}
              policy. Please read our{" "}
              <Link href={ROUTES.PEER_REVIEW_POLICY}>Peer Review Policy</Link>{" "}
              and{" "}
              <Link href={ROUTES.COPYRIGHT_POLICY}>Copyright Policy</Link>{" "}
              before submitting.
            </p>

            <h2>Referencing</h2>
            <p>
              Use APA 7th edition style. In-text: (Author, Year). DOIs must be
              included where available. Cite primary sources; avoid excessive
              self-citation.
            </p>

            <h2>Figures and tables</h2>
            <p>
              Submit figures in-line with the manuscript (embedded) and also as
              separate high-resolution files (300 dpi PNG or vector PDF).
              Tables should be editable text, not images.
            </p>

            <h2>Post-acceptance</h2>
            <p>
              Accepted papers receive editorial copy-editing, are typeset, and
              proofs are shared with the corresponding author within two weeks.
              Papers appear online within a scheduled issue.
            </p>
          </Prose>

          <div className="space-y-4">
            <Card className="border-brand bg-card-brand p-6 paper-shadow">
              <FileCheck2 className="h-6 w-6 text-brand-primary" />
              <h3 className="mt-3 font-display text-lg">Templates</h3>
              <p className="mt-1 text-sm text-brand-muted">
                Download the manuscript template and copyright form. Use these
                before submitting.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Button variant="outline" className="justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Manuscript template (DOCX)
                </Button>
                <Button variant="outline" className="justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Copyright & declaration (PDF)
                </Button>
                <Button variant="outline" className="justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  APA reference guide (PDF)
                </Button>
              </div>
              {/* TODO(client): replace placeholder template downloads with real assets. */}
            </Card>

            <Callout tone="info" title="Before you submit">
              Ensure figures are cited in text, permissions are secured for any
              third-party material, and the manuscript is anonymised for double-blind review.
            </Callout>

            <Callout tone="warning" title="File size">
              Manuscripts must be under <strong>5 MB</strong>. Compress figures
              or contact the editorial office if you need to submit a larger
              file.
            </Callout>

            <Button asChild size="lg" className="w-full">
              <Link href={ROUTES.SUBMIT_PAPER}>Start a submission</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
