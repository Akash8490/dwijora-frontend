import { z } from "zod";

/**
 * Environment validation.
 *
 * Every var has a safe fallback so the site builds and boots even on a
 * fresh deploy target with no environment configured (e.g. Vercel's first
 * import step, a Docker `docker build` without --env-file). The fallbacks
 * are development-shaped placeholders — override them per environment via
 * `.env.production`, Vercel's Environment Variables, or the container
 * platform's secret store.
 *
 * Setting an INVALID value (bad URL, wrong enum) still fails loudly at
 * build/boot time — this only relaxes the "must be set" requirement, not
 * the shape validation.
 *
 * We resolve fallbacks in plain JS via `??` BEFORE calling zod, rather
 * than using zod's own `.default()` chained onto `.string().url()`, so the
 * behaviour is identical across all bundlers (Turbopack, Webpack, plain
 * Node) — a `.default()` chained on `.string()` was intermittently
 * bypassed under Turbopack's build-time module evaluation.
 */
const FALLBACKS = {
  NEXT_PUBLIC_API_BASE_URL: "http://localhost:5000/api",
  NEXT_PUBLIC_APP_ENV: "development" as const,
  NEXT_PUBLIC_APP_NAME: "Viśvasaṃvid",
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
} as const;

const envSchema = z.object({
  // Backend base URL — the mock services in `app/lib/services/*` ignore
  // this today; it will start being called when the real API lands.
  NEXT_PUBLIC_API_BASE_URL: z
    .string()
    .url({ message: "NEXT_PUBLIC_API_BASE_URL must be a valid URL" }),
  NEXT_PUBLIC_APP_ENV: z.enum(["development", "production", "test"]),
  NEXT_PUBLIC_APP_NAME: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url({ message: "NEXT_PUBLIC_SITE_URL must be a valid URL" }),
});

/** `??` treats empty string as "set" — coerce empty to undefined first so
 *  fallbacks apply for unset AND accidentally-empty env vars alike. */
function orFallback(
  value: string | undefined,
  fallback: string,
): string {
  return value && value.length > 0 ? value : fallback;
}

const rawEnv = {
  NEXT_PUBLIC_API_BASE_URL: orFallback(
    process.env.NEXT_PUBLIC_API_BASE_URL,
    FALLBACKS.NEXT_PUBLIC_API_BASE_URL,
  ),
  NEXT_PUBLIC_APP_ENV: orFallback(
    process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV,
    FALLBACKS.NEXT_PUBLIC_APP_ENV,
  ),
  NEXT_PUBLIC_APP_NAME: orFallback(
    process.env.NEXT_PUBLIC_APP_NAME,
    FALLBACKS.NEXT_PUBLIC_APP_NAME,
  ),
  NEXT_PUBLIC_SITE_URL: orFallback(
    process.env.NEXT_PUBLIC_SITE_URL,
    FALLBACKS.NEXT_PUBLIC_SITE_URL,
  ),
};

const parsed = envSchema.safeParse(rawEnv);

if (!parsed.success) {
  const message = parsed.error.issues
    .map((i) => `${i.path.join(".")}: ${i.message}`)
    .join("; ");
  throw new Error(`Invalid environment configuration -> ${message}`);
}

export const env = parsed.data;
export type Env = typeof env;

export const isProd = env.NEXT_PUBLIC_APP_ENV === "production";
export const isDev = env.NEXT_PUBLIC_APP_ENV === "development";
