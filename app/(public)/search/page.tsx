import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHero } from "@/app/components/containers/common/PageHero";
import { Container } from "@/app/components/containers/common/Container";
import { PaperCard } from "@/app/components/containers/common/PaperCard";
import { SearchBar } from "@/app/components/containers/common/SearchBar";
import { FilterBar, type FilterField } from "@/app/components/containers/common/FilterBar";
import { SortSelect } from "@/app/components/containers/common/SortSelect";
import { PaginationBar } from "@/app/components/containers/common/PaginationBar";
import { ResultCount } from "@/app/components/containers/common/ResultCount";
import { EmptyState } from "@/app/components/containers/common/EmptyState";
import { Button } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
import {
  getCategories,
  getVolumes,
  listPapers,
  type PaperQuery,
} from "@/app/lib/services/journal.service";
import { buildMetadata } from "@/app/lib/seo";

const PAGE_SIZE = 6;

interface SearchParams {
  q?: string;
  category?: string;
  volume?: string;
  sort?: string;
  page?: string;
}

export const metadata: Metadata = buildMetadata({
  title: "Search",
  description: "Search papers, authors, and keywords across Viśvasaṃvid.",
  path: "/search",
});

async function SearchResults({ params }: { params: SearchParams }) {
  const query: PaperQuery = {
    q: params.q,
    categorySlug: params.category,
    volumeSlug: params.volume,
    page: params.page ? Math.max(1, parseInt(params.page, 10)) : 1,
    pageSize: PAGE_SIZE,
    sort: (params.sort as PaperQuery["sort"]) ?? "newest",
  };
  const [{ data: papers, meta }, { data: categories }, { data: volumes }] = await Promise.all([
    listPapers(query),
    getCategories(),
    getVolumes(),
  ]);
  const categoryById = Object.fromEntries(categories.map((c) => [c.id, c] as const));

  const filters: FilterField[] = [
    { name: "category", label: "Category", options: categories.map((c) => ({ value: c.slug, label: c.name })) },
    { name: "volume", label: "Volume", options: volumes.map((v) => ({ value: v.slug, label: `Vol. ${String(v.number).padStart(2, "0")} (${v.year})` })) },
  ];

  const page = query.page ?? 1;
  const totalPages = meta?.totalPages ?? 1;
  const totalItems = meta?.totalItems ?? papers.length;

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <SearchBar initialQuery={params.q ?? ""} size="lg" />
      </div>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <ResultCount total={totalItems} page={page} pageSize={PAGE_SIZE} label="papers" />
        <div className="flex items-center gap-3">
          <SortSelect
            defaultValue="newest"
            options={[
              { value: "newest", label: "Newest first" },
              { value: "oldest", label: "Oldest first" },
              { value: "az", label: "Title A–Z" },
            ]}
          />
        </div>
      </div>

      <div className="mt-4">
        <FilterBar fields={filters} />
      </div>

      <div className="mt-6">
        {papers.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {papers.map((p) => (
              <PaperCard key={p.id} paper={p} categoryName={categoryById[p.categoryId]?.name} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No results found"
            description="Try broadening your query or clearing filters."
            action={
              <Button asChild variant="outline">
                <Link href="/search">Clear search</Link>
              </Button>
            }
          />
        )}
      </div>

      {totalPages > 1 ? (
        <div className="mt-8 flex justify-center">
          <PaginationBar page={page} totalPages={totalPages} />
        </div>
      ) : null}
    </>
  );
}

function ResultsSkeleton() {
  return (
    <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} className="h-60 rounded-xl" />
      ))}
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="Search"
        title={sp.q ? `Results for "${sp.q}"` : "Search the archive"}
        subtitle="Search across all published papers, authors, and keywords."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Search" },
        ]}
      />
      <Container className="py-12 md:py-16">
        <Suspense fallback={<ResultsSkeleton />} key={JSON.stringify(sp)}>
          <SearchResults params={sp} />
        </Suspense>
      </Container>
    </>
  );
}
