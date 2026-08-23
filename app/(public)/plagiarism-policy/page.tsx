import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/components/containers/common/PageHero";
import { Container } from "@/app/components/containers/common/Container";
import { Prose } from "@/app/components/containers/common/Prose";
import { Callout } from "@/app/components/containers/common/Callout";
import { buildMetadata } from "@/app/lib/seo";
import { ROUTES } from "@/app/lib/routeEndPoints";

export const metadata: Metadata = buildMetadata({
  title: "Plagiarism Policy",
  description:
    "Viśvasaṃvid's plagiarism policy — UGC-aligned similarity checks, thresholds, and consequences for detected misconduct.",
  path: "/plagiarism-policy",
});

export default function PlagiarismPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="For Authors"
        title="Plagiarism Policy"
        subtitle="Every submission is screened for originality. We follow the UGC's guidelines on plagiarism, aligned with COPE best practice."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Plagiarism Policy" },
        ]}
      />
      <Container className="py-14 md:py-20 max-w-3xl">
        <Prose>
          <Callout tone="info" title="Academic-integrity principles">
            Viśvasaṃvid&rsquo;s plagiarism handling is aligned with the
            academic-integrity principles set out by the University Grants
            Commission (Promotion of Academic Integrity and Prevention of
            Plagiarism in Higher Educational Institutions) Regulations,
            2018, and with COPE best practice.
          </Callout>

          <Callout tone="warning" title="Similarity scores are indicators, not proof">
            Similarity scores are used as an editorial screening indicator
            and are not, by themselves, a determination of plagiarism.
            The editorial team evaluates the source, nature and context of
            detected overlap. Authors may be asked to revise, explain or
            correct substantial overlap, and serious academic misconduct
            may result in rejection or further action under the
            journal&rsquo;s ethics policy.
          </Callout>

          <h2>Originality expected</h2>
          <p>
            All manuscripts submitted to Viśvasaṃvid must be original work
            of the author(s), not previously published elsewhere, and not
            simultaneously under consideration by any other journal. Where
            authors build on their own earlier work, they must cite the
            earlier work explicitly and paraphrase, not reproduce, previously
            published text.
          </p>

          <h2>Similarity screening</h2>
          <p>
            Every submission undergoes electronic similarity screening before
            it is sent for peer review. Similarity is assessed against
            published journal articles, books, conference proceedings, theses,
            and openly-accessible internet sources.
          </p>

          <h2>Acceptable similarity thresholds</h2>
          <p>
            The editorial office applies the following bands, consistent with
            UGC guidance:
          </p>
          <ul>
            <li>
              <strong>Up to 10% similarity</strong> — minor overlap, generally
              acceptable if properly cited.
            </li>
            <li>
              <strong>Above 10% up to 40%</strong> — manuscript returned to
              the author(s) for revision within a stipulated period.
            </li>
            <li>
              <strong>Above 40% up to 60%</strong> — manuscript rejected;
              author(s) may resubmit only after a full rewrite and a fresh
              similarity check.
            </li>
            <li>
              <strong>Above 60%</strong> — manuscript rejected outright;
              author(s) may be prohibited from submitting for a period at
              the editors&rsquo; discretion.
            </li>
          </ul>
          <p>
            Common exclusions from the similarity index include quoted
            material with proper attribution, standard references, common
            phrases in the field, and the bibliography.
          </p>

          <h2>Self-plagiarism</h2>
          <p>
            Reusing substantial portions of the author&rsquo;s previously
            published work without acknowledgement is treated as
            self-plagiarism and is not acceptable. Authors must cite their
            earlier work and, where necessary, paraphrase rather than copy.
          </p>

          <h2>Consequences of confirmed plagiarism</h2>
          <p>
            Where plagiarism is confirmed after publication, the editorial
            board reserves the right to:
          </p>
          <ul>
            <li>issue a public correction or expression of concern;</li>
            <li>retract the article and mark it as retracted in the archive;</li>
            <li>notify the author&rsquo;s institution and, where relevant, the funding body;</li>
            <li>prohibit the author(s) from submitting to Viśvasaṃvid for a defined period.</li>
          </ul>

          <h2>Author responsibility</h2>
          <p>
            The corresponding author is responsible for ensuring that all
            co-authors have reviewed the manuscript, that all sources have
            been properly cited, and that permissions have been secured for
            any third-party material (figures, tables, extended quotations).
          </p>

          <h2>Related policies</h2>
          <p>
            Read our{" "}
            <Link href={ROUTES.PUBLICATION_ETHICS}>Publication Ethics</Link>
            {" "}policy and{" "}
            <Link href={ROUTES.PEER_REVIEW_POLICY}>Peer Review Policy</Link>
            {" "}for the broader ethical framework governing the journal.
          </p>
        </Prose>
      </Container>
    </>
  );
}
