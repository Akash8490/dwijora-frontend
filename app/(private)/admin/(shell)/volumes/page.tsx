import type { Metadata } from "next";
import { getVolumes } from "@/app/lib/services/journal.service";
import { VolumesTable } from "@/app/(private)/admin/(shell)/volumes/_volumes/VolumesTable";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Admin — Volumes",
  path: "/admin/volumes",
  noIndex: true,
});

export default async function AdminVolumesPage() {
  const { data: volumes } = await getVolumes();
  return <VolumesTable volumes={volumes} />;
}
