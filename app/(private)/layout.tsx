import type { ReactNode } from "react";

// TODO(auth): gate this segment via middleware.ts once real auth lands.
export default function PrivateLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
