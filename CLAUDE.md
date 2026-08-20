@AGENTS.md

# Viśvasaṃvid frontend — project brief for Claude Code

This is the frontend for **Viśvasaṃvid** (विश्वसंविद्), an international
multidisciplinary academic journal. It is a Next.js 16 App Router project
with TypeScript, Tailwind v4, and shadcn/ui. Everything below is binding —
please follow these conventions strictly and prefer editing existing patterns
over introducing new ones.

## Folder philosophy

Everything runs under `app/` — routes, components, lib, utils, styles.

```
app/
  (api)/                      Next.js route handlers (URL-neutral group)
  (public)/                   All public pages
    layout.tsx                → wraps in SiteShell (header/footer)
    page.tsx                  → "/" (home)
    _home/                    → home slice files (underscore = not a route)
    about/                    → /about
    aim-and-scope/            → /aim-and-scope
    editorial-board/          → /editorial-board
    author-guidelines/        → /author-guidelines
    publication-ethics/       → /publication-ethics
    copyright-policy/         → /copyright-policy
    peer-review-policy/       → /peer-review-policy
    current-issue/            → /current-issue
    archive/                  → /archive  (+ [slug]/ for issues)
    paper/[slug]/             → /paper/[slug]  (paper detail w/ Scholar meta)
    submit-paper/             → /submit-paper
    search/                   → /search
    contact/                  → /contact
    privacy-policy/           → /privacy-policy
    terms/                    → /terms
    style-guide/              → /style-guide  (hidden, noIndex)
  (private)/                  Auth-gated area (auth to be added later)
    admin/
      layout.tsx              passthrough
      (shell)/                → nested group wraps in AdminShell
        page.tsx              → /admin (dashboard)
        volumes/              → /admin/volumes
        issues/               → /admin/issues
        papers/               → /admin/papers
        editors/              → /admin/editors
        submissions/          → /admin/submissions
        pages/                → /admin/pages
      login/                  → /admin/login  (skips AdminShell)
  components/
    ui/                       shadcn primitives — DO NOT edit; extend
    contexts/                 React context providers
    containers/common/        shared UI blocks (cards, primitives, data UI)
    layouts/                  SiteHeader, SiteFooter, TopBar, SiteShell, AdminShell
    themes/                   theme config constants
    icons/                    icon components
    modals/                   *.modal.tsx (ConfirmDialog)
    drawers/                  *.drawer.tsx
    form/                     react-hook-form field components
  utils/
    messages.ts               module-keyed messages
    constants.ts              generic constants
    schema/                   zod schemas (*.schema.tsx)
    types/                    shared types (*.type.tsx)
  lib/
    api/apiEndPoints.ts       all backend URLs grouped by module
    axios/axios.service.ts    axios instance + interceptors
    cookies/                  js-cookie service + cookie names
    services/                 SSR data services (mock right now)
      mock/journal.mock.ts    static mock datasets
      journal.service.ts      typed accessors returning ApiEnvelope<T>
    redux/                    store, provider, hooks, slices
    shared-hooks/             reusable hooks
    transform/                shared pure transforms
    env.ts                    zod-validated env (only place reading process.env)
    logger.ts                 tiny logger
    routeEndPoints.ts         route path constants
    seo.ts                    defaultMetadata + buildMetadata
    fonts.ts                  next/font declarations (Fraunces, Inter, Noto Devanagari)
    utils.ts                  cn() helper
  styles/globals.css          design tokens + Tailwind directives
  layout.tsx                  root layout — providers + fonts
```

Folders in `app/` without a `page.tsx` are **not** routes (intentional).
Route groups `(public)`, `(private)`, `(api)`, `(shell)` group without
affecting URLs. Route-local slice files sit in an underscore folder like
`_home/` so Next.js does not treat them as segments.

## Per-route file convention

Every route (except trivial content pages) uses this pattern:

```
<route-name>/
  page.tsx                    thin entry: metadata + Suspense + <View />
  _<route>/                   slice folder (underscore keeps it non-routable)
    views/<route>.view.tsx    "use client" — pure JSX, consumes controller
    skeleton/<route>.skeleton.tsx   loading skeleton
    hooks/use<Route>.tsx      view-local hooks
    <route>.controller.tsx    controller hook — owns state/effects
    <route>.transform.tsx     pure API → view-model transforms
    <route>.helper.tsx        pure helpers (no hooks/JSX)
    <route>.constants.ts      constants local to the slice
    <route>.module.css        scoped CSS
```

Rules:
- `page.tsx` stays thin: metadata + one server data call + `<Suspense>` +
  render the view. No business logic there.
- `*.view.tsx` renders UI only. It can call the controller hook.
- `*.controller.tsx` owns state, effects, memoisation. Returns view props.
- `*.transform.*` and `*.helper.*` are **pure** — no React hooks, no JSX.
- Constants live in `*.constants.ts`.

Not every content page needs the full slice. Short static pages (Ethics,
Privacy, Terms, etc.) may render inline JSX in `page.tsx` — they have no
state to own.

## Naming conventions

- Route folders: dash-separated (`author-guidelines`, `contact-us`).
- File role postfixes: `*.view.tsx`, `*.skeleton.tsx`, `*.controller.tsx`,
  `*.transform.tsx`, `*.helper.tsx`, `*.service.ts`, `*.schema.tsx`,
  `*.type.tsx`, `*.modal.tsx`, `*.drawer.tsx`.
- Mobile variants: `*.mobile.skeleton.tsx`, `*.mobile.layout.tsx`.
- Component names PascalCase. `home.view.tsx` exports `HomeView`.
- Config / utility files camelCase.

## Design system — tokens only, never inline hex

Every colour, radius, shadow, and spacing rhythm is defined in
`app/styles/globals.css`. Consume them via Tailwind utilities that map to
the tokens (e.g. `bg-brand-surface`, `text-brand-ink`, `border-brand`) or
`text-brand-accent-deep`. **No inline hex colours anywhere** — if you need
a new tone, add a token first.

Type scale: display (Fraunces) for headings, Inter for body, Noto Serif
Devanagari for Sanskrit/Hindi text. Use `lang="sa"` on Sanskrit and let the
`:lang(sa)` rule pick the Devanagari serif automatically.

Motion via `framer-motion` and the reusable `MotionInView` component; it
already respects `prefers-reduced-motion`.

## Component reuse rules

- Prefer existing shadcn primitives in `components/ui/` — never fork them
  in place. Compose or extend via a new component if needed.
- Cross-page UI belongs in `components/containers/common/`. Do not create
  a second version if a matching component already exists.
- Forms use the shared kit in `components/form/` (`TextField`, `TextareaField`,
  `SelectField`, `CheckboxField`, `FileUploadField`, `FormSection`).

## Data flow

- **Server components / SSR**: import services from
  `app/lib/services/journal.service.ts`. Each returns
  `Promise<ApiEnvelope<T>>` from the mock layer today.
- **Client components** wanting to make requests: `axiosInstance` from
  `app/lib/axios/axios.service.ts` — envelope unwrap + toast + 401 redirect
  are already handled.

### Mock → real API swap

Each `journal.service.ts` function has a `// TODO(api): GET …` comment noting
the endpoint. To wire a real API, replace the function body with either:

```ts
// server component
return fetchService<T>(API_ENDPOINTS.<MODULE>.<PATH>, {
  revalidate: 300, tags: ["…"],
});

// or client
return axiosInstance.get(API_ENDPOINTS.<MODULE>.<PATH>).then((r) => r.data);
```

`API_ENDPOINTS` lives in `app/lib/api/apiEndPoints.ts`. Update it there.

## Guardrails

- Never read `process.env` outside `app/lib/env.ts`.
- Never edit files under `app/components/ui/` (shadcn) — extend instead.
- Keep `*.transform.*` and `*.helper.*` free of React hooks and JSX.
- No `any` in TS. No inline hex colours in class strings or CSS.
- Use `lang="sa"` for Sanskrit spans and the shloka.
- Business logic belongs in the controller, not the view or `page.tsx`.
- Always add a `// TODO(client)` note when you leave a placeholder that
  needs client input (branding assets, real photos, real map coords).

## Where to look

- Add a new public route → copy any existing route folder and follow the
  slice pattern above.
- Add a new admin list → clone `admin/(shell)/volumes/` and swap the data
  hook + column definitions.
- Change tokens → `app/styles/globals.css`.
- Change nav → `app/components/layouts/SiteHeader.tsx`.
- Add/remove indexing badges → `app/lib/services/mock/journal.mock.ts`
  (`indexingPartners`).
