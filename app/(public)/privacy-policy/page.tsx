import type { Metadata } from "next";
import { PageHero } from "@/app/components/containers/common/PageHero";
import { Container } from "@/app/components/containers/common/Container";
import { Prose } from "@/app/components/containers/common/Prose";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Viśvasaṃvid handles the personal data of authors, reviewers, and readers.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Last updated: January 2026"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />
      <Container className="py-14 md:py-20 max-w-3xl">
        <Prose>
          <h2>Scope</h2>
          <p>This policy explains how the journal collects, uses, and safeguards personal data of authors, reviewers, editors, and readers who interact with our website and editorial systems.</p>

          <h2>What we collect</h2>
          <ul>
            <li>Contact and affiliation information provided during submission or correspondence.</li>
            <li>Manuscript files and reviewer reports (used only for editorial decision-making).</li>
            <li>Basic technical logs (IP address, browser, pages viewed) for security and analytics.</li>
          </ul>

          <h2>How we use it</h2>
          <p>To manage the peer-review process, publish accepted work, contact authors and reviewers, comply with legal obligations, and improve the website.</p>

          <h2>Sharing</h2>
          <p>We do not sell personal data. Reviewer identities are confidential (double-blind). Article metadata (author names, affiliation, abstract) is shared with indexing partners for discovery.</p>

          <h2>Retention</h2>
          <p>Manuscript records are kept for the duration of the peer-review process and for a minimum of five years after publication, in line with archival good practice.</p>

          <h2>Your rights</h2>
          <p>You may request access to, correction of, or deletion of your personal data by writing to the editorial office at <a href="mailto:visvasamvidimrj@gmail.com">visvasamvidimrj@gmail.com</a>.</p>

          <h2>Cookies</h2>
          <p>The website uses a small number of essential cookies to preserve session state. No advertising or cross-site tracking cookies are used.</p>
        </Prose>
      </Container>
    </>
  );
}
