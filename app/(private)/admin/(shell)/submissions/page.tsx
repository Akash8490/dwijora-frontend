import type { Metadata } from "next";
import { getCategories, listSubmissions } from "@/app/lib/services/journal.service";
import { SubmissionsTable } from "@/app/(private)/admin/(shell)/submissions/_submissions/SubmissionsTable";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Admin — Submissions",
  path: "/admin/submissions",
  noIndex: true,
});

export default async function AdminSubmissionsPage() {
  const [{ data: submissions }, { data: categories }] = await Promise.all([
    listSubmissions(),
    getCategories(),
  ]);
  return <SubmissionsTable submissions={submissions} categories={categories} />;
}
