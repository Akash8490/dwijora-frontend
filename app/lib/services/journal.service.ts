import type { ApiEnvelope, ApiPageMeta } from "@/app/lib/axios/axios.service";
import type {
  Author,
  Category,
  Editor,
  EditorRole,
  Issue,
  JournalMeta,
  JournalPage,
  Paper,
  Submission,
  Volume,
} from "@/app/utils/types/journal.type";
import {
  authorsPool,
  categories,
  editors,
  indexingPartners,
  issues,
  journalMeta,
  journalPages,
  papers,
  submissions,
  volumes,
} from "@/app/lib/services/mock/journal.mock";

/**
 * MOCK SERVICE LAYER.
 * Every function here returns Promise<ApiEnvelope<T>> with a small
 * artificial delay so Suspense/skeletons stay visible in dev.
 *
 * TO WIRE UP REAL API: swap the body of each function to call
 * `axiosInstance.get(API_ENDPOINTS.<MODULE>.<PATH>).then(res => res.data)` or,
 * for server components, `fetchService(API_ENDPOINTS.<MODULE>.<PATH>, ...)`.
 * Every consumer already reads through `unwrap()` or the service's own return,
 * so the swap is a one-liner per function.
 */

const DEFAULT_DELAY_MS = 180;

function delay<T>(value: T, ms = DEFAULT_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function ok<T>(data: T, meta?: ApiPageMeta, message = "OK"): ApiEnvelope<T> {
  return { success: true, message, data, meta };
}

// ---------------- Journal meta ----------------
export async function getJournalMeta(): Promise<ApiEnvelope<JournalMeta>> {
  // TODO(api): GET /journal/meta
  return delay(ok(journalMeta));
}

export async function getIndexingPartners(): Promise<ApiEnvelope<string[]>> {
  // TODO(api): GET /journal/indexing
  return delay(ok(indexingPartners));
}

// ---------------- Categories ----------------
export async function getCategories(): Promise<ApiEnvelope<Category[]>> {
  // TODO(api): GET /categories
  return delay(ok(categories));
}

// ---------------- Volumes / Issues ----------------
export async function getVolumes(): Promise<ApiEnvelope<Volume[]>> {
  // TODO(api): GET /volumes
  return delay(ok(volumes));
}

export async function getIssues(): Promise<ApiEnvelope<Issue[]>> {
  // TODO(api): GET /issues
  return delay(ok(issues));
}

export async function getIssueBySlug(
  slug: string,
): Promise<ApiEnvelope<Issue | null>> {
  // TODO(api): GET /issues/:slug
  const found = issues.find((i) => i.slug === slug) ?? null;
  return delay(ok(found));
}

export async function getCurrentIssue(): Promise<ApiEnvelope<Issue>> {
  // TODO(api): GET /issues/current
  const sorted = [...issues].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  return delay(ok(sorted[0]));
}

export async function getArchive(): Promise<
  ApiEnvelope<Array<{ volume: Volume; issues: Issue[] }>>
> {
  // TODO(api): GET /archive
  const grouped = volumes.map((v) => ({
    volume: v,
    issues: issues
      .filter((i) => i.volumeId === v.id)
      .sort((a, b) => a.number - b.number),
  }));
  return delay(ok(grouped));
}

// ---------------- Papers ----------------
export interface PaperQuery {
  q?: string;
  categorySlug?: string;
  volumeSlug?: string;
  issueSlug?: string;
  page?: number;
  pageSize?: number;
  sort?: "newest" | "oldest" | "az";
}

function matchesQuery(paper: Paper, q?: string): boolean {
  if (!q) return true;
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const hay = [
    paper.title,
    paper.abstract,
    paper.keywords.join(" "),
    paper.authors.map((a) => a.fullName).join(" "),
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(needle);
}

export async function listPapers(
  query: PaperQuery = {},
): Promise<ApiEnvelope<Paper[]>> {
  // TODO(api): GET /papers with query params
  const {
    q,
    categorySlug,
    volumeSlug,
    issueSlug,
    page = 1,
    pageSize = 10,
    sort = "newest",
  } = query;

  const catId = categorySlug
    ? categories.find((c) => c.slug === categorySlug)?.id
    : undefined;
  const volId = volumeSlug
    ? volumes.find((v) => v.slug === volumeSlug)?.id
    : undefined;
  const isuId = issueSlug
    ? issues.find((i) => i.slug === issueSlug)?.id
    : undefined;

  let filtered = papers.filter((p) => matchesQuery(p, q));
  if (catId) filtered = filtered.filter((p) => p.categoryId === catId);
  if (volId) filtered = filtered.filter((p) => p.volumeId === volId);
  if (isuId) filtered = filtered.filter((p) => p.issueId === isuId);

  filtered = [...filtered].sort((a, b) => {
    if (sort === "az") return a.title.localeCompare(b.title);
    const t = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
    return sort === "oldest" ? t : -t;
  });

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const start = (page - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  return delay(ok(paged, { page, pageSize, totalPages, totalItems }));
}

export async function getPaperBySlug(
  slug: string,
): Promise<ApiEnvelope<Paper | null>> {
  // TODO(api): GET /papers/:slug
  return delay(ok(papers.find((p) => p.slug === slug) ?? null));
}

export async function getPapersByIssue(
  issueId: string,
): Promise<ApiEnvelope<Paper[]>> {
  // TODO(api): GET /issues/:issueId/papers
  return delay(ok(papers.filter((p) => p.issueId === issueId)));
}

export async function getLatestPapers(
  limit = 5,
): Promise<ApiEnvelope<Paper[]>> {
  // TODO(api): GET /papers/latest?limit=
  const list = [...papers].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  return delay(ok(list.slice(0, limit)));
}

export async function getRelatedPapers(
  paperId: string,
  limit = 3,
): Promise<ApiEnvelope<Paper[]>> {
  // TODO(api): GET /papers/:id/related
  const base = papers.find((p) => p.id === paperId);
  if (!base) return delay(ok([]));
  const related = papers
    .filter(
      (p) =>
        p.id !== base.id &&
        (p.categoryId === base.categoryId ||
          p.keywords.some((k) => base.keywords.includes(k))),
    )
    .slice(0, limit);
  return delay(ok(related));
}

// ---------------- Editors ----------------
export async function getEditors(): Promise<ApiEnvelope<Editor[]>> {
  // TODO(api): GET /editors
  const sorted = [...editors].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );
  return delay(ok(sorted));
}

export async function getEditorsByRole(): Promise<
  ApiEnvelope<Record<EditorRole, Editor[]>>
> {
  // TODO(api): GET /editors?groupBy=role
  const grouped = editors.reduce<Record<EditorRole, Editor[]>>((acc, e) => {
    if (!acc[e.role]) acc[e.role] = [];
    acc[e.role].push(e);
    return acc;
  }, {} as Record<EditorRole, Editor[]>);
  for (const key of Object.keys(grouped) as EditorRole[]) {
    grouped[key].sort((a, b) => a.displayOrder - b.displayOrder);
  }
  return delay(ok(grouped));
}

export async function getBoardMembers(): Promise<ApiEnvelope<Editor[]>> {
  // TODO(api): GET /editors  (same collection — display grouping handled client-side)
  const sorted = [...editors].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );
  return delay(ok(sorted));
}

export async function getBoardMemberBySlug(
  slug: string,
): Promise<ApiEnvelope<Editor | null>> {
  // TODO(api): GET /editors/:slug
  return delay(ok(editors.find((e) => e.slug === slug) ?? null));
}

// ---------------- Submissions (admin) ----------------
export async function listSubmissions(): Promise<ApiEnvelope<Submission[]>> {
  // TODO(api): GET /admin/submissions
  return delay(ok(submissions));
}

// ---------------- Pages (admin) ----------------
export async function listJournalPages(): Promise<ApiEnvelope<JournalPage[]>> {
  // TODO(api): GET /admin/pages
  return delay(ok(journalPages));
}

// ---------------- Authors (utility) ----------------
export async function getAuthorsPool(): Promise<ApiEnvelope<Author[]>> {
  return delay(ok(authorsPool));
}

// ---------------- Admin stats ----------------
export interface AdminStats {
  totalPapers: number;
  totalIssues: number;
  totalSubmissions: number;
  pendingReview: number;
}

export async function getAdminStats(): Promise<ApiEnvelope<AdminStats>> {
  // TODO(api): GET /admin/stats
  return delay(
    ok({
      totalPapers: papers.length,
      totalIssues: issues.length,
      totalSubmissions: submissions.length,
      pendingReview: submissions.filter((s) =>
        ["received", "under_review", "revision_requested"].includes(s.status),
      ).length,
    }),
  );
}
