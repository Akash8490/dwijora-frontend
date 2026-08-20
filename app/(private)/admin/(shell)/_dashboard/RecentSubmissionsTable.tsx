"use client";

import { DataTable, type DataColumn } from "@/app/components/containers/common/DataTable";
import { Badge } from "@/app/components/ui/badge";
import { formatDateShort } from "@/app/lib/transform/journal.transform";
import type { Category, Submission } from "@/app/utils/types/journal.type";

const STATUS_STYLE: Record<Submission["status"], string> = {
  received: "bg-brand-primary/10 text-brand-primary",
  under_review: "bg-brand-accent/15 text-brand-accent-deep",
  revision_requested: "bg-brand-danger/10 text-brand-danger",
  accepted: "bg-brand-success/10 text-brand-success",
  rejected: "bg-brand-danger/15 text-brand-danger",
  published: "bg-brand-primary/15 text-brand-primary",
};

export function RecentSubmissionsTable({
  submissions,
  categories,
}: {
  submissions: Submission[];
  categories: Category[];
}) {
  const catById = Object.fromEntries(categories.map((c) => [c.id, c] as const));

  const columns: DataColumn<Submission>[] = [
    {
      key: "title",
      header: "Title",
      render: (s) => (
        <span className="font-medium text-brand-ink">{s.title}</span>
      ),
    },
    {
      key: "author",
      header: "Corresponding author",
      render: (s) => <span>{s.correspondingAuthor}</span>,
    },
    {
      key: "category",
      header: "Category",
      render: (s) => (
        <Badge variant="outline">{catById[s.categoryId]?.name ?? "—"}</Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (s) => (
        <Badge className={STATUS_STYLE[s.status]}>
          {s.status.replace(/_/g, " ")}
        </Badge>
      ),
    },
    {
      key: "date",
      header: "Submitted",
      render: (s) => (
        <span className="text-sm text-brand-muted">
          {formatDateShort(s.submittedAt)}
        </span>
      ),
    },
  ];

  return <DataTable rows={submissions} columns={columns} rowKey={(s) => s.id} />;
}
