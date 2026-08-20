"use client";

import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { cn } from "@/app/lib/utils";

export interface DataColumn<T> {
  key: string;
  header: ReactNode;
  render: (row: T) => ReactNode;
  className?: string;
  headerClassName?: string;
  mobileLabel?: string;
}

export interface DataTableProps<T> {
  rows: T[];
  columns: DataColumn<T>[];
  rowKey: (row: T) => string;
  emptyMessage?: ReactNode;
  className?: string;
}

export function DataTable<T>({
  rows,
  columns,
  rowKey,
  emptyMessage = "No records",
  className,
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-brand bg-card-brand p-6 text-center text-sm text-brand-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <>
      {/* Desktop / md+ table */}
      <div
        className={cn(
          "hidden overflow-x-auto rounded-xl border border-brand bg-card-brand md:block",
          className,
        )}
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-brand-surface-2/60">
              {columns.map((c) => (
                <TableHead
                  key={c.key}
                  className={cn("text-brand-ink font-semibold", c.headerClassName)}
                >
                  {c.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={rowKey(row)}>
                {columns.map((c) => (
                  <TableCell key={c.key} className={c.className}>
                    {c.render(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile: stacked cards */}
      <ul className={cn("space-y-3 md:hidden", className)}>
        {rows.map((row) => (
          <li
            key={rowKey(row)}
            className="rounded-xl border border-brand bg-card-brand p-4 paper-shadow"
          >
            <dl className="flex flex-col gap-2">
              {columns.map((c) => (
                <div key={c.key} className="flex flex-col gap-0.5">
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-brand-muted">
                    {c.mobileLabel ?? c.header}
                  </dt>
                  <dd className="text-sm text-brand-ink">{c.render(row)}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}
