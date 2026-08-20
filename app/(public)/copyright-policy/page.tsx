import type { Metadata } from "next";
import { PageHero } from "@/app/components/containers/common/PageHero";
import { Container } from "@/app/components/containers/common/Container";
import { Prose } from "@/app/components/containers/common/Prose";
import { Callout } from "@/app/components/containers/common/Callout";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Copyright Policy",
  description:
    "Copyright, licensing, and permissions policy for authors publishing in Viśvasaṃvid.",
  path: "/copyright-policy",
});

export default function CopyrightPage() {
  return (
    <>
      <PageHero
        eyebrow="For Authors"
        title="Copyright Policy"
        subtitle="Authors retain copyright; readers get free access under a permissive licence."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Copyright Policy" },
        ]}
      />
      <Container className="py-14 md:py-20 max-w-3xl">
        <Prose>
          <Callout tone="success" title="Authors keep copyright">
            Copyright of published articles remains with the author(s).
            Viśvasaṃvid is granted a licence to publish and distribute the
            work.
          </Callout>

          <h2>Licence</h2>
          <p>
            Articles are published under a Creative Commons Attribution (CC BY
            4.0) licence, which permits sharing and adaptation with proper
            attribution to the original authors and the journal.
          </p>

          <h2>Author rights</h2>
          <ul>
            <li>Retain copyright and full re-use rights.</li>
            <li>Post the final published version on personal, institutional, or subject repositories.</li>
            <li>Reuse text and figures in future scholarly work with citation.</li>
            <li>Grant permissions for translation and adaptation.</li>
          </ul>

          <h2>Third-party material</h2>
          <p>
            Authors are responsible for obtaining written permission to
            reproduce copyrighted material (figures, tables, extended
            quotations) from third parties. Sources must be credited in the
            manuscript.
          </p>

          <h2>Author declaration</h2>
          <p>
            All authors must sign a declaration confirming originality, that
            the work is not under review elsewhere, and that all listed authors
            approve the submission.
          </p>
        </Prose>
      </Container>
    </>
  );
}
