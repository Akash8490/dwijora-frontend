"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

export interface SortOption {
  value: string;
  label: string;
}

export function SortSelect({
  options,
  defaultValue,
  paramName = "sort",
}: {
  options: SortOption[];
  defaultValue: string;
  paramName?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();
  const current = params.get(paramName) ?? defaultValue;

  const onChange = (v: string) => {
    const next = new URLSearchParams(params.toString());
    if (v === defaultValue) next.delete(paramName);
    else next.set(paramName, v);
    startTransition(() => {
      router.push(`${pathname}?${next.toString()}`);
    });
  };

  return (
    <Select value={current} onValueChange={onChange}>
      <SelectTrigger className="min-w-[10rem] bg-card-brand">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
