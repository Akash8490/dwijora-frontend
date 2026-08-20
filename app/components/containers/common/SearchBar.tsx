"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";

export interface SearchBarProps {
  initialQuery?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  action?: string;
  asLink?: boolean;
}

export function SearchBar({
  initialQuery = "",
  placeholder = "Search papers, authors, keywords…",
  size = "md",
  className,
  action = "/search",
  asLink,
}: SearchBarProps) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `${action}?q=${encodeURIComponent(q)}` : action);
  };

  if (asLink) {
    return (
      <Link
        href={action}
        aria-label="Open search"
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-brand bg-card-brand px-3 py-1.5 text-sm text-brand-muted hover:text-brand-ink hover:border-brand-primary/40 transition-colors",
          className,
        )}
      >
        <Search className="h-4 w-4" aria-hidden />
        <span>{placeholder}</span>
      </Link>
    );
  }

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={cn(
        "flex w-full items-stretch gap-2",
        size === "lg" && "md:gap-3",
        className,
      )}
    >
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted"
          aria-hidden
        />
        <Input
          name="q"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label="Search"
          className={cn(
            "pl-9 bg-card-brand",
            size === "lg" && "h-12 text-base",
          )}
        />
      </div>
      <Button
        type="submit"
        size={size === "lg" ? "lg" : "default"}
        className="shrink-0"
      >
        Search
      </Button>
    </form>
  );
}
