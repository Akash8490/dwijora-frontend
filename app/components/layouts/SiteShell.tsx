import type { ReactNode } from "react";
import { SiteHeader } from "@/app/components/layouts/SiteHeader";
import { SiteFooter } from "@/app/components/layouts/SiteFooter";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <SiteHeader />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
