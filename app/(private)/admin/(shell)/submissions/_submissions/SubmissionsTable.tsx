"use client";

import { useMemo, useState } from "react";
import { MoreHorizontal, Check, X, Eye } from "lucide-react";
import { toast } from "sonner";
import { AdminListHeader } from "@/app/components/containers/common/AdminListHeader";
import { DataTable, type DataColumn } from "@/app/components/containers/common/DataTable";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
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

export function SubmissionsTable({
  submissions,
  categories,
}: {
  submissions: Submission[];
  categories: Category[];
}) {
  const [search, setSearch] = useState("");
  const catById = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c] as const)),
    [categories],
  );
  const filtered = useMemo(
    () =>
      submissions.filter((s) =>
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.correspondingAuthor.toLowerCase().includes(search.toLowerCase()),
      ),
    [submissions, search],
  );

  const columns: DataColumn<Submission>[] = [
    { key: "title", header: "Title", render: (s) => <span className="font-medium text-brand-ink">{s.title}</span> },
    { key: "author", header: "Author", render: (s) => s.correspondingAuthor },
    { key: "cat", header: "Category", render: (s) => <Badge variant="outline">{catById[s.categoryId]?.name ?? "—"}</Badge> },
    { key: "status", header: "Status", render: (s) => <Badge className={STATUS_STYLE[s.status]}>{s.status.replace(/_/g, " ")}</Badge> },
    { key: "date", header: "Submitted", render: (s) => <span className="text-sm text-brand-muted">{formatDateShort(s.submittedAt)}</span> },
    {
      key: "actions",
      header: "Actions",
      render: (s) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Row actions">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => toast.success(`Opened ${s.title} (mock)`)}>
              <Eye className="mr-2 h-4 w-4" /> Open
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => toast.success(`Accepted ${s.title} (mock)`)}>
              <Check className="mr-2 h-4 w-4" /> Accept
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-brand-danger focus:text-brand-danger focus:bg-brand-danger/10"
              onSelect={() => toast.success(`Rejected ${s.title} (mock)`)}
            >
              <X className="mr-2 h-4 w-4" /> Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <>
      <AdminListHeader
        eyebrow="Editorial"
        title="Submissions"
        description="Incoming manuscripts awaiting action."
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search title or author…"
      />
      <div className="mt-6">
        <DataTable rows={filtered} columns={columns} rowKey={(s) => s.id} />
      </div>
    </>
  );
}
