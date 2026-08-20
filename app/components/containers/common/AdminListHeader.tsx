"use client";

import type { ReactNode } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

export interface AdminListHeaderProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  onAdd?: () => void;
  addLabel?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
}

export function AdminListHeader({
  eyebrow,
  title,
  description,
  onAdd,
  addLabel = "Add new",
  searchPlaceholder = "Search…",
  searchValue,
  onSearchChange,
}: AdminListHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent-deep">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-1 font-display text-2xl md:text-3xl text-brand-ink">
            {title}
          </h1>
          {description ? (
            <p className="mt-1 text-sm text-brand-muted">{description}</p>
          ) : null}
        </div>
        {onAdd ? (
          <Button onClick={onAdd}>
            <Plus className="mr-2 h-4 w-4" /> {addLabel}
          </Button>
        ) : null}
      </div>
      {onSearchChange ? (
        <div className="relative max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted"
            aria-hidden
          />
          <Input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="pl-9 bg-card-brand"
          />
        </div>
      ) : null}
    </div>
  );
}
