import type {
  Category,
  Editor,
  Issue,
  JournalMeta,
  Paper,
  Volume,
} from "@/app/utils/types/journal.type";

export interface HomeViewData {
  meta: JournalMeta;
  currentIssue: Issue;
  currentVolume: Volume | undefined;
  featuredPapers: Paper[];
  latestPapers: Paper[];
  categoryById: Record<string, Category>;
  editorsPreview: Editor[];
  indexing: string[];
  totals: { papers: number; issues: number; volumes: number; authors: number };
}

export function transformHomeData(input: {
  meta: JournalMeta;
  currentIssue: Issue;
  volumes: Volume[];
  currentIssuePapers: Paper[];
  latestPapers: Paper[];
  categories: Category[];
  editors: Editor[];
  indexing: string[];
  allPapersCount: number;
  allIssuesCount: number;
}): HomeViewData {
  const {
    meta,
    currentIssue,
    volumes,
    currentIssuePapers,
    latestPapers,
    categories,
    editors,
    indexing,
    allPapersCount,
    allIssuesCount,
  } = input;

  const categoryById = categories.reduce<Record<string, Category>>((acc, c) => {
    acc[c.id] = c;
    return acc;
  }, {});

  const uniqueAuthors = new Set<string>();
  latestPapers.forEach((p) => p.authors.forEach((a) => uniqueAuthors.add(a.id)));
  currentIssuePapers.forEach((p) => p.authors.forEach((a) => uniqueAuthors.add(a.id)));

  const editorsPreview = [...editors]
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .filter((e) => e.boardGroup !== "associate")
    .slice(0, 4);

  return {
    meta,
    currentIssue,
    currentVolume: volumes.find((v) => v.id === currentIssue.volumeId),
    featuredPapers: currentIssuePapers.slice(0, 3),
    latestPapers: latestPapers.slice(0, 5),
    categoryById,
    editorsPreview,
    indexing,
    totals: {
      papers: allPapersCount,
      issues: allIssuesCount,
      volumes: volumes.length,
      // Real count only. Do NOT inflate with a constant here — fabricated
      // stats on an academic journal site are an ISSN India / DOAJ / UGC-CARE
      // integrity flag (same family as fake ISSN placeholders).
      authors: uniqueAuthors.size,
    },
  };
}
