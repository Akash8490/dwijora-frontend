import type { ReactNode } from "react";

// Passthrough — the (shell) subgroup applies AdminShell to dashboard and list
// pages, while /admin/login (a sibling) renders its own centered layout.
export default function AdminSegmentLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
