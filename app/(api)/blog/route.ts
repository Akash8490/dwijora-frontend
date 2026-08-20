import { NextResponse } from "next/server";
import type { ApiEnvelope } from "@/app/lib/axios/axios.service";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
}

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "welcome-to-visvasamvid",
    title: "Welcome to Viśvasaṃvid",
    excerpt:
      "A short note on our editorial mission and what to expect from the journal.",
    publishedAt: "2026-07-01T00:00:00.000Z",
  },
  {
    id: 2,
    slug: "open-access-policy",
    title: "Our open-access policy explained",
    excerpt:
      "Why we publish all peer-reviewed work under a permissive license.",
    publishedAt: "2026-07-15T00:00:00.000Z",
  },
];

export async function GET() {
  const body: ApiEnvelope<BlogPost[]> = {
    success: true,
    message: "OK",
    data: SAMPLE_POSTS,
  };
  return NextResponse.json(body, { status: 200 });
}
