import { Suspense } from "react";
import type { Metadata } from "next";
import {
  getCategories,
  getCurrentIssue,
  getEditors,
  getIndexingPartners,
  getIssues,
  getJournalMeta,
  getLatestPapers,
  getPapersByIssue,
  getVolumes,
  listPapers,
} from "@/app/lib/services/journal.service";
import { transformHomeData } from "@/app/(public)/_home/home.transform";
import { HomeView } from "@/app/(public)/_home/views/home.view";
import { HomeSkeleton } from "@/app/(public)/_home/skeleton/home.skeleton";
import { buildMetadata } from "@/app/lib/seo";
import { BRAND } from "@/app/lib/brand";
import { HOME_CONSTANTS } from "@/app/(public)/_home/home.constants";

export const metadata: Metadata = buildMetadata({
  title: "Home",
  description: BRAND.metaDescription,
  path: "/",
});

async function HomeContent() {
  const [
    metaRes,
    currentIssueRes,
    volumesRes,
    issuesRes,
    categoriesRes,
    editorsRes,
    indexingRes,
    latestRes,
    allRes,
  ] = await Promise.all([
    getJournalMeta(),
    getCurrentIssue(),
    getVolumes(),
    getIssues(),
    getCategories(),
    getEditors(),
    getIndexingPartners(),
    getLatestPapers(HOME_CONSTANTS.MAX_LATEST),
    listPapers({ pageSize: 1000 }),
  ]);

  const currentIssuePapers = (
    await getPapersByIssue(currentIssueRes.data.id)
  ).data;

  const view = transformHomeData({
    meta: metaRes.data,
    currentIssue: currentIssueRes.data,
    volumes: volumesRes.data,
    currentIssuePapers,
    latestPapers: latestRes.data,
    categories: categoriesRes.data,
    editors: editorsRes.data,
    indexing: indexingRes.data,
    allPapersCount: allRes.meta?.totalItems ?? allRes.data.length,
    allIssuesCount: issuesRes.data.length,
  });

  return <HomeView data={view} />;
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}
