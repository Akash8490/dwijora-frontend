import type {
  Author,
  BoardGroup,
  Editor,
  Paper,
} from "@/app/utils/types/journal.type";

export type IndicScript = "devanagari" | "gujarati";

/**
 * Which Indic script a string is actually written in, or null for Latin text.
 *
 * Detection is deliberately based on the TEXT, not on `paper.language`: a
 * paper whose PDF of record is in Hindi or Gujarati is presented in English on
 * the site (ISSN India correction, Oct 2026), and Latin text must not be
 * stamped with a Devanagari font or a `lang="hi"` attribute.
 */
export function indicScriptOf(value?: string): IndicScript | null {
  if (/[\u0900-\u097F]/.test(value ?? "")) return "devanagari";
  if (/[\u0A80-\u0AFF]/.test(value ?? "")) return "gujarati";
  return null;
}

/**
 * Tailwind utility class exposing the correct font token for a string's
 * script — empty string for Latin text so the site defaults apply.
 */
export function indicFontClass(value?: string): string {
  const script = indicScriptOf(value);
  if (script === "devanagari") return "font-deva-serif";
  if (script === "gujarati") return "font-guj-serif";
  return "";
}

export function formatDateLong(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function joinAuthorNames(authors: Author[], max = 3): string {
  if (authors.length === 0) return "Anonymous";
  const names = authors.map((a) => a.fullName);
  if (names.length <= max) {
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} & ${names[1]}`;
    return `${names.slice(0, -1).join(", ")}, & ${names.at(-1)}`;
  }
  return `${names.slice(0, max).join(", ")} +${names.length - max} more`;
}

export function pageRange(paper: Paper): string {
  if (paper.pageStart === paper.pageEnd) return `p. ${paper.pageStart}`;
  return `pp. ${paper.pageStart}-${paper.pageEnd}`;
}

export function apaCitation(
  paper: Paper,
  journalName: string,
  volumeNumber: number,
  issueNumber: number,
): string {
  const year = new Date(paper.publishedAt).getFullYear();
  const authorList = paper.authors
    .map((a) => {
      const parts = a.fullName.replace(/^Dr\.?|^Prof\.?/i, "").trim().split(/\s+/);
      const last = parts.at(-1) ?? "";
      const initials = parts
        .slice(0, -1)
        .map((p) => p[0]?.toUpperCase() + ".")
        .join(" ");
      return `${last}, ${initials}`.trim();
    })
    .join(", ");
  const doi = paper.doi ? ` https://doi.org/${paper.doi}` : "";
  return `${authorList} (${year}). ${paper.title}. ${journalName}, ${volumeNumber}(${issueNumber}), ${paper.pageStart}-${paper.pageEnd}.${doi}`;
}

export function mlaCitation(
  paper: Paper,
  journalName: string,
  volumeNumber: number,
  issueNumber: number,
): string {
  const year = new Date(paper.publishedAt).getFullYear();
  const authorList = paper.authors
    .map((a) => a.fullName.replace(/^Dr\.?|^Prof\.?/i, "").trim())
    .join(", ");
  return `${authorList}. "${paper.title}." ${journalName}, vol. ${volumeNumber}, no. ${issueNumber}, ${year}, pp. ${paper.pageStart}-${paper.pageEnd}.`;
}

export function editorRoleLabel(role: Editor["role"]): string {
  switch (role) {
    case "editor_in_chief":
      return "Editor-in-Chief";
    case "deputy_chief_editor":
      return "Deputy Chief Editor";
    case "associate_editor":
      return "Associate Editors";
    case "advisory_board":
      return "Advisory Board";
    case "review_board":
      return "Review Board";
    case "managing_editor":
      return "Managing Editor";
    case "technical_associate":
      return "Technical Associate";
    default:
      return role;
  }
}

export const EDITOR_ROLE_ORDER: Editor["role"][] = [
  "editor_in_chief",
  "deputy_chief_editor",
  "managing_editor",
  "associate_editor",
  "advisory_board",
  "review_board",
  "technical_associate",
];

/**
 * Display groups on /editorial-board. Order matters.
 */
export const EDITOR_GROUP_ORDER: BoardGroup[] = [
  "chief",
  "deputy-chief",
  "editor",
  "associate",
  "technical",
];

export function boardGroupLabel(group: BoardGroup): string {
  switch (group) {
    case "chief":
      return "Chief Editor";
    case "deputy-chief":
      return "Deputy Chief Editor";
    case "editor":
      return "Editors";
    case "associate":
      return "Associate Editors & Reviewers";
    case "technical":
      return "Technical Associates";
    default:
      return group;
  }
}

export function groupBoardMembers(
  members: Editor[],
): Record<BoardGroup, Editor[]> {
  const empty: Record<BoardGroup, Editor[]> = {
    chief: [],
    "deputy-chief": [],
    editor: [],
    associate: [],
    technical: [],
  };
  const grouped = members.reduce((acc, m) => {
    acc[m.boardGroup].push(m);
    return acc;
  }, empty);
  for (const g of EDITOR_GROUP_ORDER) {
    grouped[g].sort((a, b) => a.displayOrder - b.displayOrder);
  }
  return grouped;
}

export function initials(name: string): string {
  return name
    .replace(/^Dr\.?|^Prof\.?|^Mr\.?|^Ms\.?/gi, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}
