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
    "Manuscript preparation, structure, submission checklist, ORCID and ethics requirements, peer review process, and templates for authors submitting to Viśvasaṃvid.",
  path: "/author-guidelines",
});

export default function AuthorGuidelinesPage() {
  return (
    <>
      <PageHero
        eyebrow="For Authors"
        title="Instructions for Authors"
        subtitle="Everything you need to prepare, submit, and publish a manuscript with Viśvasaṃvid."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "For Authors" },
          { label: "Instructions for Authors" },
        ]}
      />

      <Section size="lg">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Prose>
            {/* -------- Writing rules & general requirements -------- */}
            <h2>Writing rules &amp; general requirements</h2>
            <ul>
              <li>
                <strong>Length:</strong> 2,000 to 10,000 words, measured
                from the Introduction to the References (excluding tables,
                figures, and formulas).
              </li>
              <li>
                <strong>Language:</strong> Multilingual — manuscripts are
                accepted in multiple languages.
              </li>
              <li>
                <strong>File format:</strong> Microsoft Word (.doc or .docx)
                with a clear hierarchy of headings. Ensure all elements in
                figures and tables are legible for editorial formatting.
              </li>
              <li>
                Authors are strongly encouraged to use the Viśvasaṃvid MS
                Word template (below) to help expedite the review process.
              </li>
            </ul>

            {/* -------- Manuscript types -------- */}
            <h2>Manuscript types</h2>
            <p>
              Viśvasaṃvid publishes eight categories of scholarly
              contributions. The article-section requirements below (Title,
              Abstract, Keywords, etc.) apply to Original Research Articles
              by default; the other categories follow the same standards
              adapted to their form.
            </p>

            <h3>1. Original Research Articles</h3>
            <p>
              Manuscripts must present studies that are scientifically sound
              and offer significant new findings, incorporating current and
              pertinent references.
            </p>
            <ul>
              <li>
                Typical structure: Title, Abstract, Keywords, Introduction,
                Theoretical Framework, Research Methodology, Research
                Results, Discussion, Conclusions, and References.
              </li>
              <li>Minimum suggested length: 2,000 words.</li>
            </ul>

            <h3>2. Review papers</h3>
            <p>
              Critical, synthesised surveys of the existing literature on a
              topic. Should identify trends, gaps, and unresolved questions
              rather than merely summarise prior work. 4,000–8,000 words
              recommended; APA 7 references throughout.
            </p>

            <h3>3. Case studies</h3>
            <p>
              In-depth examination of a specific instance, programme,
              intervention, or institution. Must clearly state the case
              selection rationale, methods, findings, and transferable
              lessons. Anonymise participants where research ethics
              requires it.
            </p>

            <h3>4. Book reviews</h3>
            <p>
              Critical evaluations of scholarly books relevant to the
              journal&apos;s scope. Include full bibliographic details
              (author, title, publisher, year, ISBN, pages), a summary of
              the argument, and the reviewer&apos;s assessment of
              contribution and limitations. 800–1,500 words. Reviewers
              must have no undisclosed relationship with the author.
            </p>

            <h3>5. Interdisciplinary studies</h3>
            <p>
              Works that draw on two or more disciplines to address a
              research question that neither could resolve alone. Make the
              interdisciplinary contribution explicit — which disciplines
              are being integrated, and what new understanding results.
            </p>

            <h3>6. Seminar papers</h3>
            <p>
              Papers first prepared for or presented at a seminar, revised
              for journal publication. Must be substantially expanded and
              updated relative to the seminar version. Include a note
              acknowledging the original seminar (name, host institution,
              date). Prior presentation at a non-published seminar does not
              constitute duplicate publication.
            </p>

            <h3>7. Conference papers</h3>
            <p>
              Papers first presented at a conference, revised for journal
              publication. Must exceed the conference version in scope,
              analysis, or evidence, and clearly note the original
              conference (name, host, date, and whether proceedings were
              published). Papers already published in indexed conference
              proceedings must obtain written permission from the
              proceedings publisher before submission.
            </p>

            <h3>8. Special issues</h3>
            <p>
              Themed collections curated by a Guest Editor around a
              specific topic, event, or research programme. Special issues
              are announced via a public call for papers; individual
              contributions still undergo the journal&apos;s standard
              double-blind peer review. Guest Editor proposals may be
              addressed to the editorial office at{" "}
              <a href="mailto:visvasamvidimrj@gmail.com">
                visvasamvidimrj@gmail.com
              </a>
              .
            </p>

            {/* -------- Detailed article sections -------- */}
            <h2>Detailed article sections</h2>

            <h3>Title</h3>
            <ul>
              <li>Reflect the main idea of the article.</li>
              <li>
                Concise, informative, and free of unexplained abbreviations
                or formulas.
              </li>
              <li>Not exceeding 15 words.</li>
            </ul>

            <h3>Author information</h3>
            <ul>
              <li>Full first and last names.</li>
              <li>Academic degree of each author.</li>
              <li>
                Current position, institutional affiliation, city, and
                country.
              </li>
              <li>Email address.</li>
              <li>Designate the corresponding author.</li>
              <li>
                <strong>ORCID iD is compulsory</strong> for every author
                (register free at{" "}
                <a
                  href="https://orcid.org/register"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  orcid.org
                </a>
                ).
              </li>
            </ul>

            <h3>Abstract</h3>
            <ul>
              <li>Not exceeding 250 words.</li>
              <li>Include the subject, topic, and aim of the paper.</li>
              <li>Methods or methodologies must be discussed.</li>
              <li>
                Highlight key findings and conclusions with recommendations
                or practical implications.
              </li>
              <li>Avoid references and footnotes.</li>
            </ul>

            <h3>Keywords</h3>
            <p>
              Provide up to five keywords that best describe the content.
            </p>

            <h3>Introduction</h3>
            <ul>
              <li>Establish the research problem, aim, and questions.</li>
              <li>Discuss the relevance and justify the necessity of the study.</li>
              <li>Review prior studies to demonstrate the research gap.</li>
              <li>Avoid figures or tables.</li>
            </ul>

            <h3>Literature review / theoretical overview</h3>
            <ul>
              <li>Provide a critical and synthesised discussion.</li>
              <li>
                Present trends, approaches, and theoretical frameworks
                relevant to the topic.
              </li>
              <li>Highlight international perspectives.</li>
              <li>Identify gaps, conflicts, or strengths in research.</li>
            </ul>

            <h3>Research methodology</h3>
            <ul>
              <li>Provide enough detail for replication.</li>
              <li>Describe the sample, participants, or group.</li>
              <li>Instruments and procedures used.</li>
              <li>Data analysis methods.</li>
            </ul>

            <h3>Research results</h3>
            <ul>
              <li>Present results clearly, separate from discussion.</li>
              <li>Highlight innovations and findings tied to objectives.</li>
              <li>
                Include 2–5 tables, graphs, or charts with descriptive
                titles.
              </li>
              <li>Avoid general statements and minimise references.</li>
            </ul>

            <h3>Discussion</h3>
            <ul>
              <li>Interpret results and compare with prior studies.</li>
              <li>Highlight similarities, differences, and contradictions.</li>
              <li>Discuss scientific concepts underlying findings.</li>
              <li>Acknowledge limitations of the study.</li>
            </ul>

            <h3>Conclusions and implications</h3>
            <ul>
              <li>Re-state the significance of the study and its objectives.</li>
              <li>Summarise findings and implications.</li>
              <li>Emphasise theoretical and practical contributions.</li>
            </ul>

            <h3>References</h3>
            <ul>
              <li>Use APA 7th edition consistently.</li>
              <li>Ensure in-text citations match the reference list.</li>
              <li>
                Check formatting carefully after applying APA guidelines.
              </li>
              <li>
                Include DOIs where available; cite primary sources and avoid
                excessive self-citation.
              </li>
            </ul>

            {/* -------- Plagiarism & AI -------- */}
            <h2>Plagiarism and AI usage policy</h2>
            <p>
              This section summarises the rules that govern originality.
              See the full{" "}
              <Link href="/plagiarism-policy">Plagiarism Policy</Link> for
              details.
            </p>

            <h3>Plagiarism check and acceptance criteria</h3>
            <ul>
              <li>All manuscripts undergo Turnitin plagiarism screening.</li>
              <li>
                Similarity threshold: <strong>less than 10%</strong>{" "}
                (excluding references and quotations).
              </li>
              <li>
                Submissions exceeding the threshold are returned for
                revision.
              </li>
              <li>
                The editorial team may also evaluate overlaps independently.
              </li>
            </ul>

            <h3>Self-plagiarism</h3>
            <ul>
              <li>Zero tolerance against self-plagiarism.</li>
              <li>
                Substantial reuse of prior work is not allowed without
                attribution.
              </li>
              <li>
                Redundant submissions or &lsquo;salami-slicing&rsquo; are
                considered misconduct.
              </li>
            </ul>

            <h3>Use of AI tools</h3>
            <ul>
              <li>
                AI may only assist with grammar, clarity, or formatting.
              </li>
              <li>
                Substantially AI-generated manuscripts will be rejected.
              </li>
              <li>An AI-detection report must accompany submission.</li>
              <li>Acceptable threshold: below 10% AI-generated content.</li>
              <li>AI cannot be listed as an author.</li>
            </ul>

            {/* -------- Author responsibility -------- */}
            <h2>Author responsibility</h2>
            <ul>
              <li>
                Authors are fully accountable for the authenticity and
                originality of the manuscript.
              </li>
              <li>All sources must be cited per APA 7th edition.</li>
              <li>
                Violations may lead to rejection, retraction, blacklisting,
                or institutional notification.
              </li>
            </ul>

            {/* -------- Peer review -------- */}
            <h2>Peer review process</h2>
            <p>
              Viśvasaṃvid uses a rigorous double-blind peer review process.
              The full process is described in the{" "}
              <Link href={ROUTES.PEER_REVIEW_POLICY}>
                Peer Review Policy
              </Link>
              .
            </p>

            <h3>1. Initial editorial review (≈ 2–5 days)</h3>
            <ul>
              <li>Check alignment with journal scope.</li>
              <li>Plagiarism screening.</li>
              <li>Scientific novelty verification.</li>
              <li>Compliance with formatting and ethical policies.</li>
            </ul>

            <h3>2. Double-blind peer review (≈ 5–15 days)</h3>
            <ul>
              <li>At least 2 independent PhD-level reviewers.</li>
              <li>
                Assess relevance, originality, methods, results, and
                referencing.
              </li>
              <li>
                Possible outcomes: Accept (minor / major revisions), Revise
                &amp; resubmit, Reject.
              </li>
            </ul>

            <h3>3. Editor&rsquo;s decision and revisions (≈ 10–15 days)</h3>
            <ul>
              <li>Final decision based on reviewers and editor assessment.</li>
              <li>Detailed feedback shared with authors.</li>
              <li>Revised manuscripts may undergo further review.</li>
              <li>Accepted manuscripts move to production.</li>
            </ul>

            <h3>Common reasons for rejection</h3>
            <ul>
              <li>Lack of originality or significance.</li>
              <li>Out of scope.</li>
              <li>Non-compliance with guidelines.</li>
              <li>Failure to address reviewer feedback.</li>
              <li>Misleading or offensive content.</li>
            </ul>

            {/* -------- Article Processing Charges -------- */}
            <h2>Article Processing Charges (APC)</h2>
            {/* TODO(client): confirm final APC amount, waiver policy, and
                payment instructions. */}
            <p>
              Article Processing Charges, waiver policy, and payment
              instructions will be published here once confirmed by the
              editorial board.
            </p>

            {/* -------- Submission & post-acceptance -------- */}
            <h2>Submission</h2>
            <p>
              Use the online{" "}
              <Link href={ROUTES.SUBMIT_PAPER}>Submit Paper</Link> form.
              Uploads must be under 5 MB. You will need the corresponding
              author&apos;s details, the manuscript file, and a signed
              declaration / copyright form.
            </p>

            <h2>Ethics</h2>
            <p>
              All submissions are handled under the journal&apos;s{" "}
              <Link href={ROUTES.PUBLICATION_ETHICS}>
                Publication Ethics
              </Link>{" "}
              policy. Please also read our{" "}
              <Link href={ROUTES.COPYRIGHT_POLICY}>Copyright Policy</Link>{" "}
              before submitting.
            </p>

            <h2>Figures and tables</h2>
            <p>
              Submit figures in-line with the manuscript (embedded) and also
              as separate high-resolution files (300 dpi PNG or vector PDF).
              Tables should be editable text, not images.
            </p>

            <h2>Post-acceptance</h2>
            <p>
              Accepted papers receive editorial copy-editing, are typeset,
              and proofs are shared with the corresponding author within two
              weeks. Papers appear online within a scheduled issue.
            </p>
          </Prose>

          <div className="space-y-4">
            <Card className="border-brand bg-card-brand p-6 paper-shadow">
              <FileCheck2 className="h-6 w-6 text-brand-primary" />
              <h3 className="mt-3 font-display text-lg">
                Templates &amp; downloads
              </h3>
              <p className="mt-1 text-sm text-brand-muted">
                Download the title page template, the manuscript template,
                and the copyright / declaration form. Use these before
                submitting.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Button variant="outline" className="justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Title page template (DOCX)
                </Button>
                <Button variant="outline" className="justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Manuscript template (DOCX)
                </Button>
                <Button variant="outline" className="justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Copyright &amp; declaration (PDF)
                </Button>
                <Button variant="outline" className="justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  APA reference guide (PDF)
                </Button>
              </div>
              {/* TODO(client): replace placeholder template downloads with
                  real assets — drop files into public/templates/ and wire
                  the buttons via <a href="..."> or a client-component. */}
            </Card>

            <Callout tone="info" title="ORCID iD required">
              Every author (corresponding and co-authors) must supply an
              ORCID iD at submission. Registration is free at{" "}
              <a
                href="https://orcid.org/register"
                target="_blank"
                rel="noopener noreferrer"
              >
                orcid.org
              </a>
              .
            </Callout>

            <Callout tone="info" title="Before you submit">
              Ensure figures are cited in text, permissions are secured for
              any third-party material, and the manuscript is anonymised for
              double-blind review.
            </Callout>

            <Callout tone="warning" title="File size">
              Manuscripts must be under <strong>5 MB</strong>. Compress
              figures or contact the editorial office if you need to submit
              a larger file.
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
