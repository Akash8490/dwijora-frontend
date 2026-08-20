"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterField {
  name: string;
  label: string;
  options: FilterOption[];
}

const ALL_VALUE = "__all";

export function FilterBar({
  fields,
  className,
}: {
  fields: FilterField[];
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const update = (name: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (!value || value === ALL_VALUE) next.delete(name);
    else next.set(name, value);
    next.delete("page");
    startTransition(() => {
      router.push(`${pathname}?${next.toString()}`);
    });
  };

  const clearAll = () => {
    const preserve = new URLSearchParams();
    const q = params.get("q");
    if (q) preserve.set("q", q);
    startTransition(() => {
      router.push(preserve.toString() ? `${pathname}?${preserve}` : pathname);
    });
  };

  const activeCount = fields.reduce(
    (n, f) => n + (params.get(f.name) ? 1 : 0),
    0,
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-brand bg-card-brand p-4 md:flex-row md:items-center md:justify-between",
        className,
      )}
    >
      <div className="flex flex-wrap gap-2">
        {fields.map((f) => {
          const current = params.get(f.name) ?? ALL_VALUE;
          return (
            <Select
              key={f.name}
              value={current}
              onValueChange={(v) => update(f.name, v)}
            >
              <SelectTrigger className="min-w-[10rem] bg-card-brand">
                <SelectValue placeholder={f.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_VALUE}>All {f.label}</SelectItem>
                {f.options.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        })}
      </div>
      {activeCount > 0 ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="self-start md:self-auto"
        >
          <X className="mr-1 h-3.5 w-3.5" aria-hidden />
          Clear filters ({activeCount})
        </Button>
      ) : null}
    </div>
  );
}
