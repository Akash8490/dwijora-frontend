"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string, callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (cb) => subscribe(query, cb),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useIsMobile = () => useMediaQuery("(max-width: 767px)");

/** True only where the browser renders PDFs inline (desktop pointer devices);
    iOS Safari and Chrome on Android do not, so they get a new-tab handoff. */
export const useCanEmbedPdf = () =>
  useMediaQuery("(min-width: 768px) and (pointer: fine)");
