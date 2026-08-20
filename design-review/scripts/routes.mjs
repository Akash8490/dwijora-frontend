/**
 * The routes to capture and how to present them in the deck.
 * Grouped so the presentation can render "Public Website" and "Admin Panel".
 */

export const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900, deviceScaleFactor: 1 },
  { name: "tablet", width: 768, height: 1024, deviceScaleFactor: 1 },
  { name: "mobile", width: 390, height: 844, deviceScaleFactor: 2 },
];

export const ROUTES = [
  // ---------- Public ----------
  {
    id: "home",
    group: "public",
    label: "Home",
    path: "/",
    purpose: "The journal's front door. Communicates identity, current issue, editorial ethos, and drives submissions.",
    decisions: [
      "Devanagari wordmark leads; roman transliteration and Sanskrit shloka reinforce the brand identity.",
      "Sticky header condenses on scroll — the Submit Paper CTA and search stay always reachable.",
      "Current-issue spotlight above the fold; latest papers, editorial pillars, and Call-for-Papers band drive action.",
    ],
  },
  {
    id: "about",
    group: "public",
    label: "About",
    path: "/about",
    purpose: "Editorial vision, mission, and the meaning behind the journal's name.",
    decisions: [
      "Two-column layout: long-form editorial voice on the left, at-a-glance facts on the right.",
      "Editorial pillars grid at the bottom reinforces credibility (integrity · reach · craft · care).",
    ],
  },
  {
    id: "aim-and-scope",
    group: "public",
    label: "Aim & Scope",
    path: "/aim-and-scope",
    purpose: "The disciplines and article types Viśvasaṃvid publishes.",
    decisions: [
      "Categories rendered as iconic feature cards — scannable at a glance for prospective authors.",
      "Article types listed explicitly so authors self-select before opening the submission form.",
    ],
  },
  {
    id: "editorial-board",
    group: "public",
    label: "Editorial Board",
    path: "/editorial-board",
    purpose: "Meet the Editor-in-Chief, associate editors, advisory board, and reviewer panel.",
    decisions: [
      "Grouped by role with an accent-ringed avatar treatment — reads as scholarly, not corporate.",
      "Managing Editor and international advisory board surface early to establish authority and reach.",
    ],
  },
  {
    id: "author-guidelines",
    group: "public",
    label: "Instructions for Authors",
    path: "/author-guidelines",
    purpose: "Manuscript preparation, structure, submission checklist, and templates.",
    decisions: [
      "Long-form manuscript rules on the left, downloadable templates and warnings on the right — actionable while reading.",
      "Callouts highlight file-size and anonymisation reminders before authors submit.",
    ],
  },
  {
    id: "publication-ethics",
    group: "public",
    label: "Publication Ethics",
    path: "/publication-ethics",
    purpose: "The journal's COPE-aligned ethics stance.",
    decisions: [
      "Info callout up top signals COPE alignment; the rest is legible long-form prose.",
    ],
  },
  {
    id: "copyright-policy",
    group: "public",
    label: "Copyright Policy",
    path: "/copyright-policy",
    purpose: "Author rights and open-access licensing.",
    decisions: [
      "Success callout foregrounds the key promise: authors keep copyright.",
    ],
  },
  {
    id: "peer-review-policy",
    group: "public",
    label: "Peer Review Policy",
    path: "/peer-review-policy",
    purpose: "How submissions are reviewed and decided.",
    decisions: [
      "Four numbered steps visualise the process before the policy detail.",
    ],
  },
  {
    id: "current-issue",
    group: "public",
    label: "Current Issue",
    path: "/current-issue",
    purpose: "The most recent published issue and its papers.",
    decisions: [
      "Issue hero surfaces volume/issue/date badges up front for citation-conscious readers.",
      "Paper cards keep meta (category · date · pages · authors) scannable in the grid.",
    ],
  },
  {
    id: "archive",
    group: "public",
    label: "Archive",
    path: "/archive",
    purpose: "Browse past volumes and issues.",
    decisions: [
      "Two views (by-volume accordion / all-issues grid) via tabs — both academic browsing habits supported.",
    ],
  },
  {
    id: "paper-detail",
    group: "public",
    label: "Paper detail",
    path: "/paper/adaptive-learning-low-resource",
    purpose: "A single scholarly article — the destination for citation, download, and sharing.",
    decisions: [
      "Google-Scholar citation_* meta tags + ScholarlyArticle JSON-LD emitted for indexing.",
      "How-to-cite panel with APA / MLA copy-buttons directly under the abstract.",
      "Download PDF and DOI resolver are the primary sidebar actions; open-access notice reassures readers.",
    ],
  },
  {
    id: "submit-paper",
    group: "public",
    label: "Submit Paper",
    path: "/submit-paper",
    purpose: "The manuscript submission form.",
    decisions: [
      "Sectioned form (author · co-authors · manuscript · files · declaration) with repeatable co-author rows.",
      "Drag-and-drop upload with PDF/DOCX + 5 MB guardrails; the declaration is a distinct card, not a lost checkbox.",
      "Sidebar checklist + editorial timeline callout reduce back-and-forth with the editorial office.",
    ],
  },
  {
    id: "search",
    group: "public",
    label: "Search results",
    path: "/search?q=education",
    purpose: "Full-text search across papers, authors, and keywords.",
    decisions: [
      "Filters and sort are URL-synced (useSearchParams + useTransition) so results are shareable and back-button friendly.",
      "Result-count + pagination + empty-state cover all three list-page states.",
    ],
  },
  {
    id: "contact",
    group: "public",
    label: "Contact",
    path: "/contact",
    purpose: "Reach the editorial office.",
    decisions: [
      "Form on the left, editorial contact details + response-time callout on the right — everything above the fold on desktop.",
    ],
  },
  {
    id: "privacy-policy",
    group: "public",
    label: "Privacy Policy",
    path: "/privacy-policy",
    purpose: "Data handling for authors, reviewers, and readers.",
    decisions: [
      "Standard long-form legal template using the branded prose treatment.",
    ],
  },
  {
    id: "terms",
    group: "public",
    label: "Terms & Conditions",
    path: "/terms",
    purpose: "The website's usage terms.",
    decisions: [
      "Matches Privacy Policy in tone and structure so the legal footer feels cohesive.",
    ],
  },
  {
    id: "not-found",
    group: "public",
    label: "404 · Not found",
    path: "/this-page-does-not-exist",
    purpose: "A graceful, on-brand off-ramp when a URL doesn't resolve.",
    decisions: [
      "Compass ornament, apologetic-but-brief copy, and two clear escape routes (home / search).",
    ],
  },
  {
    id: "style-guide",
    group: "public",
    label: "Style Guide (internal)",
    path: "/style-guide",
    purpose: "Internal reference: palette, type scale, and every reusable component in one place.",
    decisions: [
      "Gated `noIndex`; renders every primitive so the design team can review consistency at a glance.",
    ],
  },

  // ---------- Admin ----------
  {
    id: "admin-login",
    group: "admin",
    label: "Admin sign-in",
    path: "/admin/login",
    purpose: "Editorial team entry point.",
    decisions: [
      "Centered on-brand card, no site chrome — signals a distinct, protected surface.",
      "Copy makes access boundaries explicit ('invited editorial staff only').",
    ],
  },
  {
    id: "admin",
    group: "admin",
    label: "Admin dashboard",
    path: "/admin",
    purpose: "At-a-glance operational overview for editors.",
    decisions: [
      "Four stat cards → recent submissions table; primary actions ('+ New issue', '+ New paper') sit in the header.",
      "Sidebar collapses to a Sheet on mobile so the whole console is usable on the go.",
    ],
  },
  {
    id: "admin-volumes",
    group: "admin",
    label: "Volumes",
    path: "/admin/volumes",
    purpose: "Manage journal volumes (add/edit/delete).",
    decisions: [
      "Consistent list-page pattern reused across all admin screens: header + search + responsive table + row actions.",
      "'Add volume' opens a right-side drawer — modal-lite, non-blocking, keyboard accessible.",
    ],
  },
  {
    id: "admin-issues",
    group: "admin",
    label: "Issues",
    path: "/admin/issues",
    purpose: "Manage journal issues.",
    decisions: [
      "Vol · Issue chip in the first column keeps orientation fast when scanning long lists.",
    ],
  },
  {
    id: "admin-papers",
    group: "admin",
    label: "Papers",
    path: "/admin/papers",
    purpose: "Manage published papers.",
    decisions: [
      "Row actions include Publish alongside Edit/View/Delete so mid-issue changes are one click away.",
    ],
  },
  {
    id: "admin-editors",
    group: "admin",
    label: "Editorial Board",
    path: "/admin/editors",
    purpose: "Manage the editorial board.",
    decisions: [
      "Avatar + name + affiliation in a single cell — faster to scan than four separate columns.",
    ],
  },
  {
    id: "admin-submissions",
    group: "admin",
    label: "Submissions",
    path: "/admin/submissions",
    purpose: "Incoming manuscripts awaiting action.",
    decisions: [
      "Status colour-coded (received · under review · accepted · rejected · published) for triage.",
      "Row actions: Open · Accept · Reject — the three most common editorial decisions.",
    ],
  },
  {
    id: "admin-pages",
    group: "admin",
    label: "Pages",
    path: "/admin/pages",
    purpose: "Manage static content pages (policies, about, etc.).",
    decisions: [
      "Draft vs published pill in the status column; slug shown so editors know the public URL.",
    ],
  },
];

// ---------- Extra: interactive states ----------
export const EXTRA_CAPTURES = [
  {
    id: "home-mobile-nav",
    group: "public",
    label: "Home — mobile nav drawer",
    path: "/",
    purpose: "The mobile navigation Sheet open — full nav + search + submit CTA.",
    viewport: "mobile",
    decisions: [
      "Nav collapses to a right-side Sheet under 1024px; grouped items become accordions so nothing is buried.",
    ],
    setup: async (page) => {
      await page.getByRole("button", { name: /open menu/i }).click();
      await page.waitForTimeout(600);
    },
  },
];
