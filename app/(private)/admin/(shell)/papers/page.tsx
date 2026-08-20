import type { Metadata } from "next";
import { getCategories, listPapers } from "@/app/lib/services/journal.service";
import { PapersTable } from "@/app/(private)/admin/(shell)/papers/_papers/PapersTable";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Admin — Papers",
  path: "/admin/papers",
  noIndex: true,
});

export default async function AdminPapersPage() {
  const [{ data: papers }, { data: categories }] = await Promise.all([
    listPapers({ pageSize: 1000 }),
    getCategories(),
  ]);
  return <PapersTable papers={papers} categories={categories} />;
}
