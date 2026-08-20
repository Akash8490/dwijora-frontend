# syntax=docker/dockerfile:1.7
# ---------------------------------------------------------------------------
# Viśvasaṃvid — production Docker image
#
# Multi-stage build that produces a small, self-contained Node runtime image
# using Next.js's `output: "standalone"` bundle. Suitable for any container
# platform (Railway, Fly.io, Render, ECS, Kubernetes, plain VPS with Docker).
#
# Build:  docker build -t visvasamvid:latest .
# Run:    docker run --rm -p 3000:3000 --env-file .env.production visvasamvid:latest
# ---------------------------------------------------------------------------

# ---- deps: install production dependencies only --------------------------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps --no-audit --no-fund

# ---- builder: compile the app --------------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# The build inlines NEXT_PUBLIC_* env at compile time — supply them as
# --build-arg or via a mounted .env file. Server-only secrets (like
# ADMIN_BASIC_USER/PASS) belong at runtime, not build time.
RUN npm run build

# ---- runner: minimal runtime image ---------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Non-root user for defence-in-depth.
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Standalone bundle already contains a minimal node_modules — no reinstall
# needed. Static assets and public files are copied separately.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

# Basic liveness — hitting /api/health returns 200 when the server is up.
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://127.0.0.1:${PORT}/api/health || exit 1

CMD ["node", "server.js"]
