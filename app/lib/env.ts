/**
 * Environment resolution.
 *
 * BUILD_ID: 3 — bumped to invalidate Turbopack's cached chunk of this
 * module on platforms that reuse `.next/cache` between builds.
 *
 * Every var has a safe fallback so the site builds and boots even on a
 * fresh deploy target with no environment configured (e.g. Vercel's first
 * import step, a Docker `docker build` without --env-file). The fallbacks
 * are development-shaped placeholders — override them per environment via
 * `.env.production`, Vercel's Environment Variables, or the container
 * platform's secret store.
 *
 * Setting an INVALID value (bad URL, wrong enum) still fails loudly at
 * boot time — this only relaxes the "must be set" requirement, not the
 * shape validation.
 *
 * We deliberately avoid runtime schema libraries here (zod, valibot etc.)
 * because their combinators (`.default()` chained onto `.string().url()`)
 * behaved differently under Turbopack's build-time module evaluation than
 * they did under plain Node. Plain JS + a couple of validators is more
 * robust and has zero library-quirk surface.
 */

const FALLBACKS = {
  NEXT_PUBLIC_API_BASE_URL: "http://localhost:5000/api",
  NEXT_PUBLIC_APP_ENV: "development",
  NEXT_PUBLIC_APP_NAME: "Viśvasaṃvid",
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
} as const;

type AppEnv = "development" | "production" | "test";

function readString(key: string, fallback: string): string {
  const v = process.env[key];
  return typeof v === "string" && v.length > 0 ? v : fallback;
}

function readUrl(key: string, fallback: string): string {
  const v = readString(key, fallback);
  try {
    // Constructor throws on invalid URL — surfaces bad configuration
    // loudly instead of silently shipping a broken value.
    new URL(v);
    return v;
  } catch {
    throw new Error(
      `Invalid environment configuration -> ${key}: "${v}" is not a valid URL`,
    );
  }
}

function readAppEnv(): AppEnv {
  const raw =
    process.env.NEXT_PUBLIC_APP_ENV ??
    process.env.NODE_ENV ??
    FALLBACKS.NEXT_PUBLIC_APP_ENV;
  if (raw === "development" || raw === "production" || raw === "test") {
    return raw;
  }
  throw new Error(
    `Invalid environment configuration -> NEXT_PUBLIC_APP_ENV: "${raw}" must be one of development|production|test`,
  );
}

export const env = {
  NEXT_PUBLIC_API_BASE_URL: readUrl(
    "NEXT_PUBLIC_API_BASE_URL",
    FALLBACKS.NEXT_PUBLIC_API_BASE_URL,
  ),
  NEXT_PUBLIC_APP_ENV: readAppEnv(),
  NEXT_PUBLIC_APP_NAME: readString(
    "NEXT_PUBLIC_APP_NAME",
    FALLBACKS.NEXT_PUBLIC_APP_NAME,
  ),
  NEXT_PUBLIC_SITE_URL: readUrl(
    "NEXT_PUBLIC_SITE_URL",
    FALLBACKS.NEXT_PUBLIC_SITE_URL,
  ),
} as const;

export type Env = typeof env;

export const isProd = env.NEXT_PUBLIC_APP_ENV === "production";
export const isDev = env.NEXT_PUBLIC_APP_ENV === "development";
