import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/app/components/containers/common/PageHero";
import { Container } from "@/app/components/containers/common/Container";
import { Prose } from "@/app/components/containers/common/Prose";
import { Callout } from "@/app/components/containers/common/Callout";
import { Skeleton } from "@/app/components/ui/skeleton";
import { SubmissionForm } from "@/app/(public)/submit-paper/_submit/SubmissionForm";
import { getCategories } from "@/app/lib/services/journal.service";
import { buildMetadata } from "@/app/lib/seo";
import { ROUTES } from "@/app/lib/routeEndPoints";

export const metadata: Metadata = buildMetadata({
  title: "Submit Paper",
  description:
    "Submit your manuscript to Viśvasaṃvid — an international multidisciplinary open-access journal.",
  path: "/submit-paper",
});

async function FormWrapper() {
  const { data: categories } = await getCategories();
  return <SubmissionForm categories={categories} />;
}

function FormSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-12 w-40" />
    </div>
  );
}

export default function SubmitPaperPage() {
  return (
    <>
      <PageHero
        eyebrow="For Authors"
        title="Submit your paper"
        subtitle="Rolling submissions. Editorial screen within 5 working days; double-blind peer review by international scholars."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "For Authors" },
          { label: "Submit Paper" },
        ]}
      />
      <Container className="py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <Suspense fallback={<FormSkeleton />}>
              <FormWrapper />
            </Suspense>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-brand bg-card-brand p-5 paper-shadow">
              <h3 className="font-display text-lg text-brand-ink">Before you submit</h3>
              <ul className="mt-3 space-y-2 text-sm text-brand-ink">
                {[
                  "Manuscript is anonymised for double-blind review.",
                  "APA 7th-edition references.",
                  "Figures cited in text and included in the manuscript.",
                  "All authors approve the submission.",
                  "File under 5 MB (PDF or DOCX).",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-success" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Callout tone="info" title="Editorial timeline">
              Initial editorial screening within 5 working days. Peer review typically 4–6 weeks. Decisions communicated within 10 weeks in most cases.
            </Callout>

            <Prose className="text-sm">
              <p>
                Please review our{" "}
                <Link href={ROUTES.AUTHOR_GUIDELINES}>Instructions for Authors</Link>,{" "}
                <Link href={ROUTES.PUBLICATION_ETHICS}>Publication Ethics</Link>,{" "}
                and <Link href={ROUTES.COPYRIGHT_POLICY}>Copyright Policy</Link>{" "}
                before submitting.
              </p>
            </Prose>
          </aside>
        </div>
      </Container>
    </>
  );
}
