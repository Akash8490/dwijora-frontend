export type Slug = string;

export interface Category {
  id: string;
  slug: Slug;
  name: string;
  description?: string;
}

export interface Author {
  id: string;
  fullName: string;
  affiliation: string;
  email?: string;
  country?: string;
  orcid?: string;
  isCorresponding?: boolean;
}

export type PaperStatus = "published" | "in_press" | "under_review";

/**
 * BCP-47 language code for the paper's primary language.
 * Governs `citation_language` (Google Scholar), JSON-LD `inLanguage`,
 * and the `lang` attribute on the rendered title/abstract so the
 * correct font and shaping are applied.
 */
export type PaperLanguage = "en" | "hi" | "gu" | "sa";

export interface Paper {
  id: string;
  slug: Slug;
  title: string;
  /** Optional English title/gloss when `title` is non-English. */
  titleAlt?: string;
  abstract: string;
  authors: Author[];
  keywords: string[];
  categoryId: string;
  volumeId: string;
  issueId: string;
  pageStart: number;
  pageEnd: number;
  publishedAt: string;
  pdfUrl: string;
  doi?: string;
  status: PaperStatus;
  /** Primary language of the paper. Defaults to English when omitted. */
  language?: PaperLanguage;
  citationCount?: number;
  downloadCount?: number;
}

export interface Issue {
  id: string;
  slug: Slug;
  volumeId: string;
  number: number;
  title: string;
  month: string;
  year: number;
  coverImage?: string | null;
  publishedAt: string;
  paperIds: string[];
}

export interface Volume {
  id: string;
  slug: Slug;
  number: number;
  year: number;
  title: string;
  issueIds: string[];
}

export type EditorRole =
  | "editor_in_chief"
  | "deputy_chief_editor"
  | "associate_editor"
  | "advisory_board"
  | "review_board"
  | "managing_editor"
  | "technical_associate";

/**
 * Board grouping — the display buckets used on /editorial-board.
 *   chief         → shown as a full-width featured card (single row)
 *   deputy-chief  → senior tier directly below chief, also featured
 *   editor        → shown in the "Editors" grid
 *   associate     → shown in the "Associate Editors & Reviewers" grid
 *   technical     → production/technical support tier (typesetting, digital)
 */
export type BoardGroup =
  | "chief"
  | "deputy-chief"
  | "editor"
  | "associate"
  | "technical";

export interface Editor {
  id: string;
  slug: Slug;
  fullName: string;
  /** Legacy operational role (retained for admin table & existing helpers). */
  role: EditorRole;
  /** Display grouping on /editorial-board. */
  boardGroup: BoardGroup;
  /** Human-readable label for the board card (e.g. "Chief Editor"). */
  boardRole: string;
  designation: string;
  affiliation: string;
  country: string;
  qualifications?: string[];
  specializations?: string[];
  positions?: string[];
  honours?: string[];
  publications?: string[];
  bio?: string;
  email?: string | null;
  profileUrl?: string | null;
  photoUrl?: string | null;
  /** ORCID iD (formatted `0000-0000-0000-0000`). Required by ISSN India for
   *  every listed board member. `null` means we do not yet have the iD from
   *  the member and it must be collected before publication. */
  orcid: string | null;
  /** Optional academic-identity IDs surfaced in the profile-page sidebar as
   *  clickable links to the respective platforms. Each is optional so
   *  editors who don't have one simply don't get the row. */
  scopusId?: string;
  researcherId?: string;
  googleScholarId?: string;
  vidwanId?: string;
  /** Rank within the board (lower = earlier). */
  displayOrder: number;
}

export type SubmissionStatus =
  | "received"
  | "under_review"
  | "revision_requested"
  | "accepted"
  | "rejected"
  | "published";

export interface Submission {
  id: string;
  title: string;
  correspondingAuthor: string;
  email: string;
  categoryId: string;
  submittedAt: string;
  status: SubmissionStatus;
}

export interface JournalPage {
  id: string;
  slug: Slug;
  title: string;
  updatedAt: string;
  status: "draft" | "published";
}

export interface JournalMeta {
  name: string;
  nameDevanagari: string;
  shloka: string;
  shlokaTranslation: string;
  tagline: string;
  /** Print ISSN once assigned by CSIR-NIScPR. `null` until then — the site
   *  renders "N/A" wherever this is displayed rather than showing a
   *  fake 0000-shaped placeholder (an ISSN India predatory-journal red flag). */
  issn: string | null;
  /** Online e-ISSN once assigned. Same null-means-"N/A" contract as
   *  `issn`. Google Scholar's `citation_issn` meta tag is only emitted when
   *  non-null — a fabricated ISSN there would poison Scholar's index. */
  eIssn: string | null;
  publisher: string;
  /** Full postal address of the publishing body / registered proprietor,
   *  printed in the footer and on Contact/About. Kept as a single formatted
   *  string so multi-line values render correctly across the site. */
  publisherAddress: string;
  /** Direct email for the publisher/proprietor. Separate from the editorial
   *  office `contactEmail` so ISSN India and CrossRef reviewers can verify
   *  legal identity. `null` when only the editorial email is available. */
  publisherEmail: string | null;
  editorInChief: string;
  contactEmail: string;
  /** Editorial office phone. `null` until a real number is supplied; the site
   *  hides the phone row rather than printing "+91 00000 00000" placeholders. */
  contactPhone: string | null;
  address: string;
  frequency: string;
  scope: string;
  /** Calendar year the journal was first published (e.g. 2026). */
  startingYear: number;
  /** Delivery format(s) — required by the ISSN India Journal Particulars form. */
  publicationFormat: "Online" | "Print" | "Online and Print";
  /** Primary subject label. Used in the ISSN Journal Particulars table. */
  subject: string;
  /** Languages accepted for publication. */
  languages: string[];
}
