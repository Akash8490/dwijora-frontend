"use client";

import { useMemo, useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
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
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { editorRoleLabel, initials } from "@/app/lib/transform/journal.transform";
import type { Editor } from "@/app/utils/types/journal.type";

export function EditorsTable({ editors }: { editors: Editor[] }) {
  const [search, setSearch] = useState("");
  const [target, setTarget] = useState<Editor | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const filtered = useMemo(
    () =>
      editors.filter((e) =>
        e.fullName.toLowerCase().includes(search.toLowerCase()) ||
        e.affiliation.toLowerCase().includes(search.toLowerCase()),
      ),
    [editors, search],
  );

  const columns: DataColumn<Editor>[] = [
    {
      key: "person",
      header: "Editor",
      render: (e) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-brand-primary text-white text-xs">
              {initials(e.fullName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-brand-ink">{e.fullName}</div>
            <div className="text-xs text-brand-muted">{e.affiliation}</div>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (e) => (
        <Badge variant="outline" className="border-brand-accent/40 text-brand-accent-deep">
          {editorRoleLabel(e.role).replace(/s$/, "")}
        </Badge>
      ),
    },
    { key: "country", header: "Country", render: (e) => e.country },
    {
      key: "actions",
      header: "Actions",
      render: (e) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Row actions">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => toast.success(`Editing ${e.fullName} (mock)`)}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-brand-danger focus:text-brand-danger focus:bg-brand-danger/10"
              onSelect={() => { setTarget(e); setConfirmOpen(true); }}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Remove
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
        title="Editorial Board"
        description="Manage editors, advisory board, and review panel."
        addLabel="+ Add editor"
        onAdd={() => toast.success("Open add-editor drawer (mock)")}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search editors…"
      />
      <div className="mt-6">
        <DataTable rows={filtered} columns={columns} rowKey={(e) => e.id} />
      </div>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Remove this editor?"
        description={target ? `${target.fullName} will be removed from the board.` : undefined}
        confirmLabel="Remove"
        destructive
        onConfirm={() => toast.success(`Removed ${target?.fullName ?? ""} (mock)`)}
      />
    </>
  );
}
