import type { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("prose-brand", className)}>{children}</div>;
}
