"use client";

import { useMemo, useState } from "react";
import { MoreHorizontal, Pencil, Eye, Trash2 } from "lucide-react";
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
import { formatDateShort } from "@/app/lib/transform/journal.transform";
import type { JournalPage } from "@/app/utils/types/journal.type";

export function PagesTable({ pages }: { pages: JournalPage[] }) {
  const [search, setSearch] = useState("");
  const [target, setTarget] = useState<JournalPage | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const filtered = useMemo(
    () => pages.filter((p) => p.title.toLowerCase().includes(search.toLowerCase())),
    [pages, search],
  );

  const columns: DataColumn<JournalPage>[] = [
    { key: "title", header: "Title", render: (p) => <span className="font-medium text-brand-ink">{p.title}</span> },
    { key: "slug", header: "Slug", render: (p) => <code className="text-xs">/{p.slug}</code> },
    {
      key: "status",
      header: "Status",
      render: (p) => (
        <Badge className={p.status === "published" ? "bg-brand-success/10 text-brand-success" : "bg-brand-muted/15 text-brand-muted"}>
          {p.status}
        </Badge>
      ),
    },
    { key: "updated", header: "Updated", render: (p) => <span className="text-sm text-brand-muted">{formatDateShort(p.updatedAt)}</span> },
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
            <DropdownMenuItem onSelect={() => toast.success(`Previewing ${p.title} (mock)`)}>
              <Eye className="mr-2 h-4 w-4" /> Preview
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
        eyebrow="Content"
        title="Pages"
        description="Static content pages — policies, about, etc."
        addLabel="+ New page"
        onAdd={() => toast.success("Open new-page drawer (mock)")}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search pages…"
      />
      <div className="mt-6">
        <DataTable rows={filtered} columns={columns} rowKey={(p) => p.id} />
      </div>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete this page?"
        description={target ? `"${target.title}" will be removed.` : undefined}
        confirmLabel="Delete"
        destructive
        onConfirm={() => toast.success(`Deleted ${target?.title ?? ""} (mock)`)}
      />
    </>
  );
}
