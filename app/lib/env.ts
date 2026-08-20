import { z } from "zod";

/**
 * Environment validation.
 *
 * Every var has a safe default so the site builds and boots even on a
 * fresh deploy target with no environment configured (e.g. Vercel's first
 * import step, a Docker `docker build` without --env-file). The defaults
 * are development-shaped placeholders — override them per environment via
 * `.env.production`, Vercel's Environment Variables, or the container
 * platform's secret store.
 *
 * Setting an INVALID value (bad URL, wrong enum) still fails loudly at
 * build/boot time — this only relaxes the "must be set" requirement, not
 * the shape validation.
 */
const envSchema = z.object({
  // Backend base URL — the mock services in `app/lib/services/*` ignore
  // this today; it will start being called when the real API lands.
  NEXT_PUBLIC_API_BASE_URL: z
    .string()
    .url({ message: "NEXT_PUBLIC_API_BASE_URL must be a valid URL" })
    .default("http://localhost:5000/api"),
  NEXT_PUBLIC_APP_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Viśvasaṃvid"),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url({ message: "NEXT_PUBLIC_SITE_URL must be a valid URL" })
    .default("http://localhost:3000"),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

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
