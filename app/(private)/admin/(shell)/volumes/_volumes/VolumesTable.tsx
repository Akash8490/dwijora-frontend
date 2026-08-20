"use client";

import { useMemo, useState } from "react";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/app/components/ui/sheet";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { toast } from "sonner";
import type { Volume } from "@/app/utils/types/journal.type";

export function VolumesTable({ volumes }: { volumes: Volume[] }) {
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [target, setTarget] = useState<Volume | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const filtered = useMemo(
    () =>
      volumes.filter((v) =>
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        String(v.number).includes(search) ||
        String(v.year).includes(search),
      ),
    [volumes, search],
  );

  const columns: DataColumn<Volume>[] = [
    { key: "number", header: "Vol.", render: (v) => <Badge variant="outline">{v.number}</Badge> },
    { key: "title", header: "Title", render: (v) => <span className="font-medium text-brand-ink">{v.title}</span> },
    { key: "year", header: "Year", render: (v) => v.year },
    { key: "issues", header: "Issues", render: (v) => v.issueIds.length },
    {
      key: "actions",
      header: "Actions",
      render: (v) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Row actions">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => { setTarget(v); setDrawerOpen(true); }}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => toast.success(`Viewing ${v.title} (mock)`)}>
              <Eye className="mr-2 h-4 w-4" /> View
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-brand-danger focus:text-brand-danger focus:bg-brand-danger/10"
              onSelect={() => { setTarget(v); setConfirmOpen(true); }}
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
        title="Volumes"
        description="Manage journal volumes."
        addLabel="+ Add volume"
        onAdd={() => { setTarget(null); setDrawerOpen(true); }}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search volumes…"
      />
      <div className="mt-6">
        <DataTable rows={filtered} columns={columns} rowKey={(v) => v.id} />
      </div>

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-display">
              {target ? "Edit volume" : "Add volume"}
            </SheetTitle>
            <SheetDescription>
              {target ? "Update this volume's details." : "Create a new volume."}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-3 px-4 pb-4">
            <div>
              <Label>Number</Label>
              <Input defaultValue={target?.number} placeholder="4" />
            </div>
            <div>
              <Label>Title</Label>
              <Input defaultValue={target?.title} placeholder="Volume title" />
            </div>
            <div>
              <Label>Year</Label>
              <Input type="number" defaultValue={target?.year} placeholder="2026" />
            </div>
            <Button
              className="w-full"
              onClick={() => {
                toast.success(target ? "Volume updated (mock)" : "Volume created (mock)");
                setDrawerOpen(false);
              }}
            >
              Save volume
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete this volume?"
        description={target ? `“${target.title}” and its issues will be removed. This cannot be undone.` : undefined}
        confirmLabel="Delete"
        destructive
        onConfirm={() => toast.success(`Deleted ${target?.title ?? ""} (mock)`)}
      />
    </>
  );
}
