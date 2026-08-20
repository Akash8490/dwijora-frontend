import type { Metadata } from "next";
import { PageHero } from "@/app/components/containers/common/PageHero";
import { Container } from "@/app/components/containers/common/Container";
import { Prose } from "@/app/components/containers/common/Prose";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "The terms under which Viśvasaṃvid's website and services are provided.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        subtitle="Last updated: January 2026"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions" },
        ]}
      />
      <Container className="py-14 md:py-20 max-w-3xl">
        <Prose>
          <h2>Acceptance</h2>
          <p>By using this website you accept these terms in full. If you do not accept them, please refrain from using the site.</p>

          <h2>Use of content</h2>
          <p>Published articles are licensed under Creative Commons Attribution (CC BY 4.0). Any reproduction must credit the original author(s) and the journal. Other website content is © the journal unless otherwise noted.</p>

          <h2>Submissions</h2>
          <p>By submitting a manuscript, authors warrant that the work is original, that all listed authors approve the submission, and that they have obtained permissions for any third-party material used.</p>

          <h2>Site availability</h2>
          <p>We strive for high uptime but do not warrant uninterrupted availability of the website or editorial systems.</p>

          <h2>Liability</h2>
          <p>The journal is not liable for indirect or consequential loss arising from use of the site or reliance on published content.</p>

          <h2>Jurisdiction</h2>
          <p>These terms are governed by the laws of India. Disputes shall be resolved in the courts of the publisher&apos;s jurisdiction.</p>

          <h2>Changes</h2>
          <p>We may update these terms from time to time. The revision date at the top of this page indicates the most recent update.</p>
        </Prose>
      </Container>
    </>
  );
}
