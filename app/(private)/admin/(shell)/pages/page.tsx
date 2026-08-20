import type { Metadata } from "next";
import { listJournalPages } from "@/app/lib/services/journal.service";
import { PagesTable } from "@/app/(private)/admin/(shell)/pages/_pages/PagesTable";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Admin — Pages",
  path: "/admin/pages",
  noIndex: true,
});

export default async function AdminPagesPage() {
  const { data: pages } = await listJournalPages();
  return <PagesTable pages={pages} />;
}
