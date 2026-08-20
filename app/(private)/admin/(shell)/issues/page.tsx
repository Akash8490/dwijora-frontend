import type { Metadata } from "next";
import { getIssues, getVolumes } from "@/app/lib/services/journal.service";
import { IssuesTable } from "@/app/(private)/admin/(shell)/issues/_issues/IssuesTable";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Admin — Issues",
  path: "/admin/issues",
  noIndex: true,
});

export default async function AdminIssuesPage() {
  const [{ data: issues }, { data: volumes }] = await Promise.all([
    getIssues(),
    getVolumes(),
  ]);
  return <IssuesTable issues={issues} volumes={volumes} />;
}
