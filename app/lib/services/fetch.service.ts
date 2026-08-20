import { env } from "@/app/lib/env";
import { logger } from "@/app/lib/logger";
import type { ApiEnvelope } from "@/app/lib/axios/axios.service";

export interface FetchOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  revalidate?: number | false;
  tags?: string[];
  query?: Record<string, string | number | boolean | undefined>;
}

export class FetchServiceError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = "FetchServiceError";
  }
}

function buildUrl(
  path: string,
  query?: FetchOptions["query"],
): string {
  const base = env.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "");
  const rel = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${base}${rel}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

export async function fetchService<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const { body, revalidate, tags, query, headers, ...rest } = options;
  const url = buildUrl(path, query);

  const nextOpts: NextFetchRequestConfig = {};
  if (typeof revalidate === "number") nextOpts.revalidate = revalidate;
  if (revalidate === false) nextOpts.revalidate = 0;
  if (tags?.length) nextOpts.tags = tags;

  try {
    const res = await fetch(url, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(headers ?? {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      next: nextOpts,
    });

    let parsed: ApiEnvelope<T> | T | null = null;
    try {
      parsed = (await res.json()) as ApiEnvelope<T> | T;
    } catch {
      parsed = null;
    }

    if (!res.ok) {
      const message =
        (parsed as ApiEnvelope | null)?.message ??
        `Request failed with status ${res.status}`;
      throw new FetchServiceError(res.status, message, parsed);
    }

    if (
      parsed &&
      typeof parsed === "object" &&
      "success" in (parsed as object) &&
      "data" in (parsed as object)
    ) {
      const envelope = parsed as ApiEnvelope<T>;
      if (!envelope.success) {
        throw new FetchServiceError(
          res.status,
          envelope.message ?? "Request failed",
          envelope.data,
        );
      }
      return envelope.data;
    }

    return parsed as T;
  } catch (err) {
    if (err instanceof FetchServiceError) throw err;
    logger.error("fetchService network error", err);
    throw new FetchServiceError(
      0,
      err instanceof Error ? err.message : "Network error",
    );
  }
}
