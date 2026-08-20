import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProfileView } from "@/app/(public)/editorial-board/[slug]/_profile/views/profile.view";
import {
  firstSentence,
  loadProfile,
} from "@/app/(public)/editorial-board/[slug]/_profile/profile.controller";
import { buildMetadata } from "@/app/lib/seo";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = await loadProfile(slug);
  if (!data) {
    return buildMetadata({
      title: "Editor not found",
      description: "The requested editorial-board profile could not be found.",
      path: `/editorial-board/${slug}`,
      noIndex: true,
    });
  }
  const { member } = data;
  return buildMetadata({
    title: `${member.fullName} — ${member.boardRole}`,
    description: firstSentence(member.bio ?? ""),
    path: `/editorial-board/${member.slug}`,
  });
}

export default async function EditorProfilePage({ params }: Params) {
  const { slug } = await params;
  const data = await loadProfile(slug);
  if (!data) notFound();
  return <ProfileView data={data} />;
}
