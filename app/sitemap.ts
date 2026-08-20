import type { MetadataRoute } from "next";
import { env } from "@/app/lib/env";
import {
  getBoardMembers,
  getIssues,
  getVolumes,
  listPapers,
} from "@/app/lib/services/journal.service";

const STATIC_ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/aim-and-scope", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/editorial-board", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/author-guidelines", priority: 0.8, changeFrequency: "yearly" as const },
  { path: "/publication-ethics", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/copyright-policy", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/peer-review-policy", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/plagiarism-policy", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/current-issue", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/archive", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/submit-paper", priority: 0.9, changeFrequency: "yearly" as const },
  { path: "/search", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const [{ data: members }, { data: issues }, { data: volumes }, { data: papers }] =
    await Promise.all([
      getBoardMembers(),
      getIssues(),
      getVolumes(),
      listPapers({ pageSize: 1000 }),
    ]);

  for (const m of members) {
    entries.push({
      url: `${base}/editorial-board/${m.slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }
  for (const i of issues) {
    entries.push({
      url: `${base}/archive/${i.slug}`,
      lastModified: new Date(i.publishedAt),
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }
  for (const p of papers) {
    entries.push({
      url: `${base}/paper/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "yearly",
      priority: 0.7,
    });
  }
  // volumes has no dedicated public page in the current design; skip.
  void volumes;

  return entries;
}
