import type { Metadata } from "next";
import { getEditors } from "@/app/lib/services/journal.service";
import { EditorsTable } from "@/app/(private)/admin/(shell)/editors/_editors/EditorsTable";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Admin — Editorial Board",
  path: "/admin/editors",
  noIndex: true,
});

export default async function AdminEditorsPage() {
  const { data: editors } = await getEditors();
  return <EditorsTable editors={editors} />;
}
