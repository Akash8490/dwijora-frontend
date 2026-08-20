"use client";

import { useMemo, useState } from "react";
import { MoreHorizontal, Pencil, Trash2, Eye, Send } from "lucide-react";
import { toast } from "sonner";
import { AdminListHeader } from "@/app/components/containers/common/AdminListHeader";
import { DataTable, type DataColumn } from "@/app/components/containers/common/DataTable";
import { ConfirmDialog } from "@/app/components/modals/ConfirmDialog";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { formatDateShort, joinAuthorNames } from "@/app/lib/transform/journal.transform";
import type { Category, Paper } from "@/app/utils/types/journal.type";

export function PapersTable({
  papers,
  categories,
}: {
  papers: Paper[];
  categories: Category[];
}) {
  const [search, setSearch] = useState("");
  const [target, setTarget] = useState<Paper | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const catById = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c] as const)),
    [categories],
  );

  const filtered = useMemo(
    () =>
      papers.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.authors.some((a) => a.fullName.toLowerCase().includes(search.toLowerCase())),
      ),
    [papers, search],
  );

  const columns: DataColumn<Paper>[] = [
    {
      key: "title",
      header: "Title",
      render: (p) => (
        <span className="font-medium text-brand-ink">{p.title}</span>
      ),
    },
    {
      key: "authors",
      header: "Authors",
      render: (p) => <span className="text-sm">{joinAuthorNames(p.authors, 2)}</span>,
    },
    {
      key: "category",
      header: "Category",
      render: (p) => (
        <Badge variant="outline">{catById[p.categoryId]?.name ?? "—"}</Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (p) => (
        <Badge className="bg-brand-success/10 text-brand-success">{p.status.replace(/_/g, " ")}</Badge>
      ),
    },
    {
      key: "date",
      header: "Published",
      render: (p) => (
        <span className="text-sm text-brand-muted">{formatDateShort(p.publishedAt)}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (p) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Row actions">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => toast.success(`Editing ${p.title} (mock)`)}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => toast.success(`Opened ${p.title} (mock)`)}>
              <Eye className="mr-2 h-4 w-4" /> View
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => toast.success(`Republished ${p.title} (mock)`)}>
              <Send className="mr-2 h-4 w-4" /> Publish
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-brand-danger focus:text-brand-danger focus:bg-brand-danger/10"
              onSelect={() => { setTarget(p); setConfirmOpen(true); }}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
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
        title="Papers"
        description="Manage published papers."
        addLabel="+ Add paper"
        onAdd={() => toast.info("Open the submissions queue to accept a new paper (mock).")}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search papers or authors…"
      />
      <div className="mt-6">
        <DataTable rows={filtered} columns={columns} rowKey={(p) => p.id} />
      </div>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete this paper?"
        description={target ? `"${target.title}" will be removed.` : undefined}
        confirmLabel="Delete"
        destructive
        onConfirm={() => toast.success(`Deleted ${target?.title ?? ""} (mock)`)}
      />
    </>
  );
}
