"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, type MouseEvent } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination";

export interface PaginationBarProps {
  page: number;
  totalPages: number;
  paramName?: string;
}

function pageRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set<number>([1, total, current, current - 1, current + 1]);
  const arr = Array.from(set).filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  for (let i = 0; i < arr.length; i++) {
    out.push(arr[i]);
    if (i < arr.length - 1 && arr[i + 1] - arr[i] > 1) out.push("…");
  }
  return out;
}

export function PaginationBar({ page, totalPages, paramName = "page" }: PaginationBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const go = (target: number) => (e: MouseEvent) => {
    e.preventDefault();
    const clamped = Math.max(1, Math.min(totalPages, target));
    const next = new URLSearchParams(params.toString());
    if (clamped === 1) next.delete(paramName);
    else next.set(paramName, String(clamped));
    startTransition(() => {
      router.push(`${pathname}?${next.toString()}`);
    });
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={page <= 1}
            onClick={go(page - 1)}
          />
        </PaginationItem>
        {pageRange(page, totalPages).map((entry, idx) =>
          entry === "…" ? (
            <PaginationItem key={`e-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={entry}>
              <PaginationLink
                href="#"
                isActive={entry === page}
                onClick={go(entry)}
              >
                {entry}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={page >= totalPages}
            onClick={go(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
