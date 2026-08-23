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

          <h2>Research involving human participants</h2>
          <p>
            Where research involves human participants, authors must comply
            with applicable ethical standards and provide ethics
            committee / institutional approval information where required.
            Manuscripts must state the name of the approving body and the
            approval reference. Studies without a required approval will
            not be considered.
          </p>

          <h2>Informed consent</h2>
          <p>
            When individual participants, patients, or their data or
            images are included, authors must confirm that appropriate
            informed consent was obtained and that any personally
            identifying details have been anonymised unless the individual
            has given written permission to be identified.
          </p>

          <h2>Conflicts of interest</h2>
          <p>
            Authors, editors, and reviewers must declare any financial,
            personal, professional, institutional, or ideological
            relationships that could reasonably be perceived as
            influencing their work. Undisclosed conflicts of interest are
            grounds for correction, retraction, or removal from the
            editorial process.
          </p>

          <h2>Funding disclosure</h2>
          <p>
            Every manuscript must disclose all sources of funding for the
            research, including grant numbers where applicable. If no
            funding was received, authors should state so explicitly.
          </p>

          <h2>Authorship and contributorship</h2>
          <p>
            Author eligibility follows the four ICMJE criteria: substantial
            contribution to conception / design / analysis / interpretation;
            drafting or critically revising the work; final approval of the
            version to be published; and accountability for all aspects of
            the work. Contributions of individuals who do not meet all four
            criteria should be acknowledged rather than listed as authors.
            Authorship changes after submission require written agreement
            from every author and editorial approval.
          </p>

          <h2>Duplicate submission and publication</h2>
          <p>
            Manuscripts under consideration by another journal, or
            substantially overlapping with previously published work, are
            not accepted. Substantially expanded or reanalysed versions of
            a conference paper are considered on a case-by-case basis and
            must clearly cite the earlier work.
          </p>

          <h2>Fabrication and falsification</h2>
          <p>
            Fabrication (invention of data or results) and falsification
            (manipulation of data, images, methods, or results in ways
            that misrepresent the research) are serious forms of research
            misconduct. Any such findings result in immediate rejection or
            retraction and notification of the authors&rsquo; institutions.
          </p>

          <h2>Generative AI in scholarly writing</h2>
          <p>
            Authors may use AI-assisted tools for language improvement,
            formatting, or limited research assistance where appropriate.
            Authors remain fully responsible for the accuracy, originality,
            integrity, and ethical compliance of their work. Any
            substantive use of generative AI in preparing the manuscript
            must be disclosed. AI tools <strong>must not be listed as
            authors</strong> and cannot bear responsibility for the
            work. Full submission-time rules are on the{" "}
            <Link href={ROUTES.AUTHOR_GUIDELINES}>Instructions for
            Authors</Link> page.
          </p>
        </Prose>
      </Container>
    </>
  );
}
