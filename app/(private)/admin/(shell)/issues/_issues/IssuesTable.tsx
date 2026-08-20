"use client";

import { useMemo, useState } from "react";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/app/components/ui/sheet";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import type { Issue, Volume } from "@/app/utils/types/journal.type";

export function IssuesTable({ issues, volumes }: { issues: Issue[]; volumes: Volume[] }) {
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [target, setTarget] = useState<Issue | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const volById = useMemo(() => Object.fromEntries(volumes.map((v) => [v.id, v] as const)), [volumes]);

  const filtered = useMemo(
    () =>
      issues.filter((i) =>
        i.title.toLowerCase().includes(search.toLowerCase()) ||
        String(i.year).includes(search) ||
        i.month.toLowerCase().includes(search.toLowerCase()),
      ),
    [issues, search],
  );

  const columns: DataColumn<Issue>[] = [
    {
      key: "id",
      header: "Vol · Issue",
      render: (i) => (
        <Badge variant="outline">
          {volById[i.volumeId]?.number}·{i.number}
        </Badge>
      ),
    },
    { key: "title", header: "Title", render: (i) => <span className="font-medium text-brand-ink">{i.title}</span> },
    { key: "date", header: "Published", render: (i) => `${i.month} ${i.year}` },
    { key: "papers", header: "Papers", render: (i) => i.paperIds.length },
    {
      key: "actions",
      header: "Actions",
      render: (i) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Row actions">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => { setTarget(i); setDrawerOpen(true); }}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => toast.success(`Opened ${i.title} (mock)`)}>
              <Eye className="mr-2 h-4 w-4" /> View
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-brand-danger focus:text-brand-danger focus:bg-brand-danger/10"
              onSelect={() => { setTarget(i); setConfirmOpen(true); }}
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
        title="Issues"
        description="Manage journal issues."
        addLabel="+ Add issue"
        onAdd={() => { setTarget(null); setDrawerOpen(true); }}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search issues…"
      />
      <div className="mt-6">
        <DataTable rows={filtered} columns={columns} rowKey={(i) => i.id} />
      </div>

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-display">{target ? "Edit issue" : "Add issue"}</SheetTitle>
            <SheetDescription>Provide issue metadata.</SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-3 px-4 pb-4">
            <div>
              <Label>Title</Label>
              <Input defaultValue={target?.title} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Month</Label>
                <Input defaultValue={target?.month} />
              </div>
              <div>
                <Label>Year</Label>
                <Input type="number" defaultValue={target?.year} />
              </div>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                toast.success(target ? "Issue updated (mock)" : "Issue created (mock)");
                setDrawerOpen(false);
              }}
            >
              Save issue
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete this issue?"
        description={target ? `"${target.title}" will be removed.` : undefined}
        confirmLabel="Delete"
        destructive
        onConfirm={() => toast.success(`Deleted ${target?.title ?? ""} (mock)`)}
      />
    </>
  );
}
