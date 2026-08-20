# Component library — Viśvasaṃvid frontend

Every reusable UI piece lives under `app/components/`. Do not duplicate a
component that already exists — extend or import instead.

Live preview: visit [`/style-guide`](../app/(public)/style-guide/page.tsx)
in the running dev server for a rendered view of every primitive.

## Structure

| Folder | Purpose |
|---|---|
| `components/ui/` | shadcn primitives (button, dialog, table, sheet, …). **Do not edit** — extend via wrappers. |
| `components/contexts/` | React context providers (`AppContext`, `ThemeProvider`). |
| `components/containers/common/` | Cross-page reusable UI blocks (see below). |
| `components/layouts/` | Site chrome (`SiteHeader`, `SiteFooter`, `TopBar`, `SiteShell`, `AdminShell`). |
| `components/themes/` | Theme config constants (`theme.config.ts`). |
| `components/icons/` | Icon components (currently `LogoIcon`). |
| `components/modals/` | `*.modal.tsx` (`ConfirmDialog`). |
| `components/drawers/` | `*.drawer.tsx`. |
| `components/form/` | Form kit (react-hook-form + zod bindings). |

## Reusable primitives — `containers/common/`

Layout / typography:
- `Container` — max-width wrapper with responsive gutters (`sm|md|lg|xl`).
- `Section` — vertical padding + optional eyebrow / title / subtitle / actions.
- `SectionHeading` — eyebrow + heading + subtitle + accent rule.
- `PageHero` — inner-page hero with breadcrumbs.
- `Eyebrow`, `AccentRule` — atomic ornaments.
- `Prose` — long-form content wrapper with brand typography.
- `Breadcrumbs` — shadcn-based breadcrumb list.
- `Callout` — info / warning / success / danger boxes.
- `JournalWordmark` — the Devanagari + roman brand lockup.
- `MotionInView` — fade-up-on-scroll wrapper (framer-motion, reduced-motion safe).

Data cards:
- `PaperCard`, `IssueCard`, `VolumeCard`, `EditorCard`, `FeatureCard`,
  `StepCard`, `StatCard`, `IndexingBadge`.

Data UI:
- `SearchBar` — global search (form or link mode).
- `FilterBar` — multi-field filters that read/write `useSearchParams`.
- `SortSelect` — URL-synced sort dropdown.
- `PaginationBar` — URL-synced pagination.
- `ResultCount` — "showing X-Y of Z" line.
- `EmptyState` — empty-state card with icon / message / action.
- `DataTable<T>` — responsive shadcn table that collapses to stacked
  cards on mobile.
- `AdminListHeader` — admin-page header (eyebrow + title + add + search).

## Form kit — `components/form/`

All fields are RHF+zod-bound and use shadcn `Form` internals for error /
description text. Every field accepts a typed `control` prop.

- `TextField` — text/email/tel/password/number inputs.
- `TextareaField` — multiline text.
- `SelectField` — shadcn Select with typed `SelectOption[]`.
- `CheckboxField` — labelled checkbox with description.
- `FileUploadField` — drag & drop, PDF/DOCX guard, 5 MB limit.
- `FormSection` — titled two-column field grouping.

## Layouts

- `SiteShell` — public layout: TopBar + SiteHeader + `<main>` + SiteFooter.
- `AdminShell` — admin dashboard chrome: sidebar (Sheet on mobile) + topbar.

## Adding a new component

1. Live in `components/containers/common/` if it's reusable UI, or in the
   appropriate specialised folder (form, modal, drawer, layout).
2. Only tokens for colour/spacing — see [`CODING_STANDARDS.md`](CODING_STANDARDS.md).
3. Add it to the `/style-guide` page so the design team can see it.
4. Prefer composition over new shadcn forks.

## Adding a new page

Copy the closest existing route folder and follow the per-route convention
(views/ · skeleton/ · hooks/ · controller · transform · helper · constants
· `page.tsx`). See [`CLAUDE.md`](../CLAUDE.md) for the full template.
