import type { ReactNode } from "react";
import { SiteShell } from "@/app/components/layouts/SiteShell";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
