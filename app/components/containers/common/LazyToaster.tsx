"use client";

import dynamic from "next/dynamic";

/**
 * Sonner's toast surface isn't needed until something triggers a toast;
 * dynamic-import (client-only, no SSR) so its bundle doesn't ship in the
 * shared server-rendered HTML and can be loaded after hydration/idle.
 */
const Toaster = dynamic(
  () => import("@/app/components/ui/sonner").then((m) => m.Toaster),
  { ssr: false },
);

export function LazyToaster() {
  return <Toaster richColors position="top-right" />;
}
