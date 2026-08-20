import { NextResponse } from "next/server";

/**
 * Liveness/health probe for load balancers, uptime monitors, container
 * orchestrators, and CDN health checks. Reached at `/api/health`.
 *
 * Returns immediately with a small JSON payload — no downstream calls, so
 * it stays green even during backend outages. Add a `/api/ready` in the
 * future if we need a readiness probe that verifies dependencies.
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "visvasamvid-frontend",
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
