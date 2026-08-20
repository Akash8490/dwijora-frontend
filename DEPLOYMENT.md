# Deployment

The site is a self-contained Next.js 16 App-Router project. It ships with two
first-class deploy paths — **Vercel** (fastest, zero-ops) and **Docker**
(for self-hosting on any container platform or VPS). Pick one.

---

## 1. Prerequisites (both paths)

- Node.js 22 or newer (only for local reproduction of the build).
- The four public env vars in [.env.example](.env.example) filled in for the
  target environment.
- If the /admin console should be reachable on this deployment, also set
  the server-only credentials `ADMIN_BASIC_USER` and `ADMIN_BASIC_PASS`.
  If both are unset, the console responds with **503** on every request
  (fail-closed).

Health probe: `GET /api/health` → `200 {"status":"ok",...}`.

---

## 2. Deploy to Vercel (recommended)

Vercel is made by the Next.js team and needs **no configuration beyond the
env vars**. `vercel.json` in the repo pins the framework, install command,
and default region (`bom1` — Mumbai, closest to India).

### First deploy from the web UI

1. Push this branch to GitHub / GitLab / Bitbucket.
2. Go to <https://vercel.com/new>, import the repo.
3. When Vercel asks, add these **Environment Variables** (Production and
   Preview both):
   | Name | Example value |
   |---|---|
   | `NEXT_PUBLIC_API_BASE_URL` | `https://api.visvasamvid.org/api` (or your real backend once wired) |
   | `NEXT_PUBLIC_APP_ENV` | `production` |
   | `NEXT_PUBLIC_APP_NAME` | `Viśvasaṃvid` |
   | `NEXT_PUBLIC_SITE_URL` | `https://visvasamvid.org` (or the final domain) |
   | `ADMIN_BASIC_USER` | *(pick a username)* |
   | `ADMIN_BASIC_PASS` | *(pick a strong password)* |
4. Click **Deploy**. First build takes ~2 minutes.
5. Add your custom domain: Vercel Project → **Settings → Domains** → add
   `visvasamvid.org` and follow the DNS instructions.

### Subsequent deploys

`git push` to your production branch — Vercel builds automatically. Each PR
gets a preview URL.

### From the CLI

```bash
npm i -g vercel
vercel login
vercel link              # first time only — pick or create the project
vercel --prod            # deploy the current commit to production
```

---

## 3. Deploy with Docker (self-host, Railway, Fly.io, Render, ECS, k8s)

```bash
# Build the image
docker build -t visvasamvid:latest .

# Run it
docker run -d --name visvasamvid \
  -p 3000:3000 \
  --env-file .env.production \
  --restart unless-stopped \
  visvasamvid:latest
```

The image is a minimal Alpine + Node 22 runtime running the
`.next/standalone` bundle as an **unprivileged user**. A `HEALTHCHECK`
polls `/api/health` every 30 s.

### Notes for container platforms

- **Railway / Render / Fly.io**: point at the repo, they detect the
  `Dockerfile`, set the env vars in their dashboard, deploy.
- **NEXT_PUBLIC_* vars must be present at BUILD time** (Next inlines them
  into the client bundle) — set them in the build environment, not just
  runtime. Docker: pass with `--build-arg` or an `--env-file` at build.
- Put a reverse proxy in front (Cloudflare, Caddy, Nginx) to terminate
  TLS and set `Strict-Transport-Security` preload if you want that.

---

## 4. After deploy — smoke-test checklist

Run these against the live URL:

- [ ] `GET /` → 200, home page renders with editorial-board preview.
- [ ] `GET /editorial-board` → 200, all four sections visible.
- [ ] `GET /paper/multimedia-in-distance-education` → 200, citation meta
      tags present (`view-source:` → grep for `citation_title`).
- [ ] `GET /api/health` → `200 {"status":"ok",...}`.
- [ ] `GET /admin` → **401** (Basic Auth prompt) if credentials set, or
      **503** if not. Never 200 without credentials.
- [ ] `GET /robots.txt` → lists `/admin`, `/style-guide`, `/api`, `/blog`
      as disallowed.
- [ ] `GET /sitemap.xml` → includes all 8 paper URLs and every editorial
      board profile.
- [ ] `GET /opengraph-image.png` → 1200×630 gold-background image.

Also submit the sitemap URL to Google Search Console and Bing Webmaster
Tools once the domain is verified.

---

## 5. Environment variables reference

| Variable | Client-visible? | Required? | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | yes | yes | Backend base URL (mock services ignore this today, will use it once real API is wired) |
| `NEXT_PUBLIC_APP_ENV` | yes | yes | `development` \| `production` \| `test` |
| `NEXT_PUBLIC_APP_NAME` | yes | yes | Display name in metadata; keep as `Viśvasaṃvid` |
| `NEXT_PUBLIC_SITE_URL` | yes | yes | Canonical origin (used by SEO, sitemap, OG URLs) |
| `ADMIN_BASIC_USER` | **no** | optional | Set BOTH to enable the /admin console; leave both unset to disable it (503) |
| `ADMIN_BASIC_PASS` | **no** | optional | Server-only, never inlined into the client bundle |

Everything is validated by zod in [app/lib/env.ts](app/lib/env.ts) — the
build will fail loudly if a required var is missing.

---

## 6. Content still pending from the client

None of these block deployment, but the site will show placeholders until
they land. Full list is tracked as `// TODO(client)` markers in the code.

- Real **ISSN** and **e-ISSN** numbers (currently `0000-0000` / `0000-000X`).
- Full publisher **postal address** and **public phone number**.
- Institutional email addresses for editorial board members currently on
  Gmail (ISSN India requires institutional emails).
- Institutional profile URLs for at least five editors.
- Final PDFs for the eight papers of Vol 01 · Issue 01 —
  `public/papers/<slug>.pdf`.
- Editor photos for the remaining board members —
  `public/editorial-board/<slug>.jpg`.
