# Dwijora — Frontend

Next.js 16 (App Router) + TypeScript + Tailwind v4 + shadcn/ui + Redux Toolkit + Axios.
This is the frontend for the Dwijora academic-journal publishing platform.

## Getting started

```bash
npm install --legacy-peer-deps
cp .env.example .env
npm run dev
```

Open http://localhost:3000 — `/` redirects to `/home`.

## Scripts

- `npm run dev` — local dev server (Turbopack).
- `npm run build` — production build.
- `npm run start` — start production server.
- `npm run lint` — ESLint.

## Folder philosophy

Everything the app runs on lives under `app/` — routes, components, lib, utils, styles. This keeps route co-location and the shared foundation in one importable tree (`@/app/...`).

```
app/
  (api)/           route group for Route Handlers (does not affect URL)
  (public)/        routes with open access
  (private)/       routes requiring auth (admin, dashboard, …)
  components/
    ui/            shadcn primitives — DO NOT edit; extend via new components
    contexts/      React context providers
    containers/    shared reusable UI blocks
    layouts/       page shells (header/footer)
    themes/        theme constants
    icons/         icon components
    modals/        *.modal.tsx
    drawers/       *.drawer.tsx
    form/          reusable form fields
  utils/
    messages.ts    module-keyed message constants
    constants.ts   generic constants
    schema/        zod schemas per module (*.schema.tsx)
    types/         shared TS types (*.type.tsx)
  lib/
    api/apiEndPoints.ts   all backend endpoint paths, grouped by module
    axios/                axios instance + interceptors (client only)
    cookies/              js-cookie wrapper + cookie name constants
    services/             server-side fetch helpers + per-module SSR fetchers
    redux/                store, provider, slices, hooks, barrel
    shared-hooks/         reusable hooks
    transform/            shared transforms
    env.ts                zod-validated env — every other file imports from here
    logger.ts             tiny logger (no-ops noisy logs in prod)
    routeEndPoints.ts     app route path constants
    script.config.ts      third-party/ad script config
    seo.ts                defaultMetadata + buildMetadata()
    utils.ts              cn() helper for tailwind classes
  styles/globals.css      Tailwind directives + theme tokens
  layout.tsx              root layout — wraps Redux + AppProvider + MainLayout + Toaster
  page.tsx                /  — redirects to /home
```

Folders in `app/` that have no `page.tsx` are **not** routes — this is intentional. Route groups (`(public)`, `(private)`, `(api)`) group routes without affecting the URL.

## Naming conventions

- **Route folders**: dash-separated (`contact-us/`, `author-guidelines/`).
- **File roles** use dotted postfixes: `*.view.tsx`, `*.skeleton.tsx`, `*.controller.tsx`, `*.transform.tsx`, `*.helper.tsx`, `*.service.ts`, `*.schema.tsx`, `*.type.tsx`, `*.modal.tsx`, `*.drawer.tsx`.
- **Mobile variants**: `*.mobile.skeleton.tsx`, `*.mobile.layout.tsx`.
- **Components**: PascalCase — `home.view.tsx` exports `HomeView`.
- **Config / utility files**: camelCase.
- **`page.tsx` stays thin** — it wires metadata + Suspense, calls the controller hook, and renders the view. No business logic.

## Add a new route (copy the `home` pattern)

Create a folder under `app/(public)/<route-name>/`:

```
<route-name>/
  page.tsx                     # thin entry — Suspense + metadata + render <View />
  views/<route-name>.view.tsx  # "use client" — consumes controller output
  skeleton/<route-name>.skeleton.tsx
  hooks/use<Route>.tsx         # view-local hooks
  <route-name>.controller.tsx  # useController hook — owns state/effects
  <route-name>.transform.tsx   # pure API → view-model transforms
  <route-name>.helper.tsx      # pure helpers (no hooks/components)
  <route-name>.constants.ts    # constants local to the route
  <route-name>.module.css      # scoped CSS
```

Then:

1. Add the endpoint path to `app/lib/api/apiEndPoints.ts`.
2. Add its route path to `app/lib/routeEndPoints.ts`.
3. Add types to `app/utils/types/<route-name>.type.tsx`.
4. Add a server-side fetcher in `app/lib/services/<route-name>.service.ts` (uses `fetchService`).
5. Wire `metadata` in `page.tsx` via `buildMetadata({...})`.

## Guardrails

- Never import `process.env` outside `app/lib/env.ts`.
- Never edit `app/components/ui/*` (shadcn) directly — extend via new components.
- Keep `*.transform.*` and `*.helper.*` pure — no React hooks or components.
- Business logic belongs in `*.controller.tsx`, not `page.tsx` or `*.view.tsx`.
- All backend paths flow through `apiEndPoints.ts`; don't hardcode URLs.

## Data flow

- **Server components / SSR**: import from `app/lib/services/*.service.ts`, which wrap `fetchService` (native `fetch` with Next `revalidate`/`tags`).
- **Client components**: import `axiosInstance` from `app/lib/axios/axios.service.ts`. Interceptors attach the auth cookie, unwrap the `{ success, message, data }` envelope, show a toast on client errors, and redirect to `/login` on 401.

## Environment

Env vars are validated in `app/lib/env.ts` with zod. Add new ones there.

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Backend base URL |
| `NEXT_PUBLIC_APP_ENV` | `development` / `production` / `test` |
| `NEXT_PUBLIC_APP_NAME` | App display name |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (for SEO) |

`.env`, `.env.development`, `.env.production` are gitignored — commit changes to `.env.example` only.

## Notes

- We use `--legacy-peer-deps` because `@hookform/resolvers` has an optional peer on `valibot` that trips npm's strict resolver.
- Next.js 16 breaking changes may differ from your prior knowledge — consult `node_modules/next/dist/docs/` before touching framework internals.
