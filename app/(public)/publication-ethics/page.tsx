import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/components/containers/common/PageHero";
import { Container } from "@/app/components/containers/common/Container";
import { Prose } from "@/app/components/containers/common/Prose";
import { Callout } from "@/app/components/containers/common/Callout";
import { buildMetadata } from "@/app/lib/seo";
import { ROUTES } from "@/app/lib/routeEndPoints";

export const metadata: Metadata = buildMetadata({
  title: "Publication Ethics",
  description:
    "Viśvasaṃvid's publication ethics policy — authorship, misconduct, plagiarism, and complaints.",
  path: "/publication-ethics",
});

export default function EthicsPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Publication Ethics"
        subtitle="We are committed to the highest standards of publishing integrity, aligned with COPE guidance."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Publication Ethics" },
        ]}
      />
      <Container className="py-14 md:py-20 max-w-3xl">
        <Prose>
          <Callout tone="info" title="COPE alignment">
            The journal follows the Committee on Publication Ethics (COPE) Core
            Practices for editors and publishers.
          </Callout>

          <h2>Author responsibilities</h2>
          <p>
            Authors must ensure that submissions are original, not previously
            published, and not under consideration elsewhere. All authors must
            have contributed substantively, and everyone who contributed must
            be listed. Sources of funding and conflicts of interest must be
            disclosed.
          </p>

          <h2>Plagiarism and misconduct</h2>
          <p>
            Manuscripts are screened for originality against published
            journal articles, books, conference proceedings, theses, and
            openly-accessible internet sources. Substantial overlap with
            previously published work, undeclared use of AI, fabrication or
            falsification of data, and duplicate submission are treated as
            misconduct and may result in immediate rejection, retraction, and
            notification of the authors&apos; institutions. Detailed
            similarity thresholds and the full UGC-aligned procedure are
            documented on the{" "}
            <Link href={ROUTES.PLAGIARISM_POLICY}>Plagiarism Policy</Link>
            {" "}page.
          </p>

          <h2>Peer review</h2>
          <p>
            All research articles undergo double-blind peer review. Reviewers
            are asked to evaluate manuscripts on relevance, originality,
            methodological rigour, evidentiary support, clarity, and ethical
            propriety. Reviewers must declare any conflicts of interest and
            treat manuscripts as confidential.
          </p>

          <h2>Editorial independence</h2>
          <p>
            Editorial decisions are made solely on scholarly merit. Editors
            recuse themselves from handling manuscripts where they have a
            personal, professional, or financial interest.
          </p>

          <h2>Corrections and retractions</h2>
          <p>
            If a substantive error is found after publication, the journal will
            issue a correction, expression of concern, or retraction as
            appropriate, with a clear editorial note linked to the original
            article.
          </p>

          <h2>Complaints</h2>
          <p>
            Complaints regarding editorial process or publication ethics may be
            addressed to the Editor-in-Chief. Complaints are acknowledged
            within 5 working days and resolved within 30 days wherever
            possible.
          </p>

          <h2>Data availability</h2>
          <p>
            Authors are encouraged to make research data openly available in a
            trusted repository and to include data availability statements in
            their manuscripts.
          </p>
        </Prose>
      </Container>
    </>
  );
}
