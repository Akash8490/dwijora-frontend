import type { Metadata } from "next";
import { PageHero } from "@/app/components/containers/common/PageHero";
import { Container } from "@/app/components/containers/common/Container";
import { Prose } from "@/app/components/containers/common/Prose";
import { Callout } from "@/app/components/containers/common/Callout";
import { StepCard } from "@/app/components/containers/common/StepCard";
import { CheckCircle2, ClipboardCheck, Users, Send } from "lucide-react";
import { Section } from "@/app/components/containers/common/Section";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Peer Review Policy",
  description:
    "How Viśvasaṃvid handles peer review — process, timelines, and reviewer guidance.",
  path: "/peer-review-policy",
});

export default function PeerReviewPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Peer Review Policy"
        subtitle="A transparent, timely, and constructive process — double-blind by default."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Peer Review Policy" },
        ]}
      />

      <Section size="md">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StepCard step={1} title="Initial editorial screening" description="Handled within 5 working days — checked for scope, formatting, ethics, and originality." icon={<ClipboardCheck className="h-5 w-5" />} />
          <StepCard step={2} title="Reviewer assignment" description="Two or more independent, subject-matter reviewers; typically 3–6 weeks." icon={<Users className="h-5 w-5" />} />
          <StepCard step={3} title="Decision & revision" description="Accept, minor/major revisions, or reject with reasons. Author responses handled promptly." icon={<Send className="h-5 w-5" />} />
          <StepCard step={4} title="Editorial approval" description="Final decision by the Editor-in-Chief, followed by copy-editing, typesetting, and publication." icon={<CheckCircle2 className="h-5 w-5" />} />
        </div>
      </Section>

      <Container className="pb-16 max-w-3xl">
        <Prose>
          <Callout tone="info" title="Type of review">
            Double-blind — authors and reviewers are unknown to each other. Manuscripts must be anonymised at submission.
          </Callout>
          <h2>Reviewer criteria</h2>
          <ul>
            <li>Relevance to the journal&apos;s scope</li>
            <li>Originality and significance</li>
            <li>Rigour of methodology and analysis</li>
            <li>Clarity of writing and structure</li>
            <li>Evidentiary support for claims</li>
            <li>Ethical conduct</li>
          </ul>
          <h2>Confidentiality</h2>
          <p>
            Manuscripts and reviews are treated as strictly confidential. Reviewers must not discuss the manuscript or share it with third parties.
          </p>
          <h2>Conflicts of interest</h2>
          <p>
            Reviewers and handling editors must declare any real or perceived conflicts of interest and recuse themselves where appropriate.
          </p>
          <h2>Appeals</h2>
          <p>
            Authors may appeal editorial decisions in writing to the Editor-in-Chief, providing a clear response to reviewer comments. Appeals are considered by an independent editor and resolved within 30 days.
          </p>
        </Prose>
      </Container>
    </>
  );
}
