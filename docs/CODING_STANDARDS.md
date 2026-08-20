# Coding standards — Viśvasaṃvid frontend

This is the short version. For the full folder-structure and per-route file
convention, see the project [`CLAUDE.md`](../CLAUDE.md).

## Language

- **TypeScript strict**. No `any`. Prefer `unknown` + narrowing at the boundary.
- One component per file. Component names PascalCase.
- Absolute imports via `@/` — never `../../..`.
- Import order (top → bottom, blank line between groups):
  1. Node/Next/React
  2. Third-party libraries
  3. `@/app/…` internal imports
  4. Type-only imports

## React / Next patterns

- Default to **Server Components**. Add `"use client"` only for interactive
  islands (forms, dropdowns, hooks that touch the browser).
- Use `<Suspense fallback={<XSkeleton />}>` for data-driven segments so the
  page streams and shows a skeleton while data loads.
- Prefer these hooks over ad-hoc equivalents:
  - `usePathname` / `useSearchParams` / `useRouter` for URL state
  - `useTransition` for non-blocking filter/search updates
  - `useActionState` + `useFormStatus` for forms once server actions bind
  - `useSyncExternalStore` for external subscriptions (e.g. matchMedia)
- Metadata via the Metadata API — `generateMetadata` for dynamic routes,
  `export const metadata` for static.

## Design tokens

- Every colour, radius, and shadow lives in `app/styles/globals.css`.
- Consume via Tailwind classes (`text-brand-ink`, `bg-brand-surface-2`,
  `border-brand`, `text-brand-accent-deep`) — **no inline hex** anywhere.
- Type scale via `next/font` (Fraunces / Inter / Noto Devanagari). Use
  `font-display` for headings and `lang="sa"` for Sanskrit.
- Motion via `MotionInView` (framer-motion, reduced-motion safe).

## Forms

- react-hook-form + zod + `@hookform/resolvers`.
- Use the shared field kit in `components/form/` — do not hand-roll inputs.
- Schemas live under `utils/schema/` as `*.schema.tsx`.
- Files ≤ 5 MB (PDF/DOCX). `FileUploadField` enforces the type/size guard.

## Data

- Public/SSR reads through `app/lib/services/journal.service.ts`. Each
  function is annotated with the `TODO(api)` endpoint path it will map to.
- Client-side writes go through `axiosInstance`.
- The envelope shape is `{ success, message, data, meta? }`.

## Accessibility

- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`).
- Correct heading order (one `<h1>` per page).
- Labelled inputs; visible focus rings (already global).
- Keyboard-navigable menus, dialogs, drawers (shadcn handles most — verify).
- Colour contrast AA.
- Respect `prefers-reduced-motion`.
- Use `lang` attributes for non-English text.

## Testing (for future work)

- Unit tests for pure `*.transform.*` and `*.helper.*` files.
- Playwright for critical flows (submit paper, search, paper detail meta).

## Do / Don't

**Do**
- Copy an existing route as a starting point.
- Add tokens for any new colour before you use it.
- Leave `// TODO(client)` markers when a decision needs client input.
- Keep `page.tsx` thin.

**Don't**
- Fork shadcn primitives in place — extend them.
- Read `process.env` outside `app/lib/env.ts`.
- Introduce a new state library alongside Redux Toolkit.
- Add JS to a Server Component just to add an event handler — extract a
  small client island.
