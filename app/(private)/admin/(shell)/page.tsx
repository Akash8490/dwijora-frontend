import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { FileText, BookOpen, Inbox, Clock } from "lucide-react";
import { StatCard } from "@/app/components/containers/common/StatCard";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { RecentSubmissionsTable } from "@/app/(private)/admin/(shell)/_dashboard/RecentSubmissionsTable";
import { getAdminStats, getCategories, listSubmissions } from "@/app/lib/services/journal.service";
import { ROUTES } from "@/app/lib/routeEndPoints";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Admin Dashboard",
  description: "Editorial dashboard.",
  path: "/admin",
  noIndex: true,
});

async function DashboardContent() {
  const [stats, cats, subs] = await Promise.all([
    getAdminStats(),
    getCategories(),
    listSubmissions(),
  ]);
  const recent = subs.data.slice(0, 6);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent-deep">
            Overview
          </p>
          <h1 className="mt-1 font-display text-3xl text-brand-ink">Editorial dashboard</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href={ROUTES.ADMIN_ISSUES}>+ New issue</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={ROUTES.ADMIN_PAPERS}>+ New paper</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Published papers" value={stats.data.totalPapers} icon={<FileText className="h-4 w-4" />} />
        <StatCard label="Issues" value={stats.data.totalIssues} icon={<BookOpen className="h-4 w-4" />} />
        <StatCard label="Submissions" value={stats.data.totalSubmissions} icon={<Inbox className="h-4 w-4" />} />
        <StatCard label="Awaiting action" value={stats.data.pendingReview} icon={<Clock className="h-4 w-4" />} />
      </div>

      <Card className="border-brand bg-card-brand p-5 md:p-6 paper-shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl text-brand-ink">Recent submissions</h2>
          <Button asChild variant="outline" size="sm">
            <Link href={ROUTES.ADMIN_SUBMISSIONS}>View all</Link>
          </Button>
        </div>
        <RecentSubmissionsTable submissions={recent} categories={cats.data} />
      </Card>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-72" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-xl" />
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
