import { NextResponse, type NextRequest } from "next/server";

/**
 * Production stop-gap for the /admin console.
 *
 * Next.js 16 renamed the `middleware` convention to `proxy`; the export
 * name and matcher config are otherwise identical. This file must live at
 * the repo root and export a default `middleware` function (name is
 * unchanged) plus a `config.matcher` array.
 *
 * The admin routes render editorial data (stats, submissions, papers,
 * editors, pages) and expose Add/Edit/Delete UI. Until the real auth stack
 * is wired, we gate the entire /admin segment behind HTTP Basic Auth so
 * the console isn't world-readable in production.
 *
 * Credentials come from server-side env vars:
 *   ADMIN_BASIC_USER=<editor-username>
 *   ADMIN_BASIC_PASS=<strong-password>
 *
 * If either var is missing, we FAIL CLOSED — the console returns 503 with
 * a clear message rather than becoming publicly accessible by accident.
 * This matches ISSN India's confidentiality expectations for editorial
 * workflows and the site's own /publication-ethics policy.
 *
 * When real auth arrives, delete this file (or narrow the matcher).
 */

const REALM = 'Basic realm="Visvasamvid Admin", charset="UTF-8"';

function unauthorized(reason = "Authentication required") {
  return new NextResponse(reason, {
    status: 401,
    headers: {
      "WWW-Authenticate": REALM,
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

function unavailable(reason: string) {
  return new NextResponse(reason, {
    status: 503,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

function decodeBasic(header: string | null): [string, string] | null {
  if (!header || !header.toLowerCase().startsWith("basic ")) return null;
  try {
    const b64 = header.slice(6).trim();
    const decoded = atob(b64);
    const idx = decoded.indexOf(":");
    if (idx < 0) return null;
    return [decoded.slice(0, idx), decoded.slice(idx + 1)];
  } catch {
    return null;
  }
}

/** Constant-time string equality — avoids user-enumeration timing attacks. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function proxy(req: NextRequest) {
  const expectedUser = process.env.ADMIN_BASIC_USER;
  const expectedPass = process.env.ADMIN_BASIC_PASS;

  // Fail closed if the operator hasn't configured credentials.
  if (!expectedUser || !expectedPass) {
    return unavailable(
      "Admin console is not available on this deployment. " +
        "Set ADMIN_BASIC_USER and ADMIN_BASIC_PASS to enable it.",
    );
  }

  const creds = decodeBasic(req.headers.get("authorization"));
  if (!creds) return unauthorized();

  const [user, pass] = creds;
  if (!safeEqual(user, expectedUser) || !safeEqual(pass, expectedPass)) {
    return unauthorized("Invalid credentials");
  }

  return NextResponse.next();
}

export const config = {
  // Gate the entire admin segment (dashboard + all list screens + login page).
  matcher: ["/admin", "/admin/:path*"],
};
