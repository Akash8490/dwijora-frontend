"use client";

import { UploadCloud, X, FileText } from "lucide-react";
import { useCallback, useRef, useState, type DragEvent, type ReactNode } from "react";
import type { FieldValues, Path, Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/app/components/ui/form";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";

export interface FileUploadFieldProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label: ReactNode;
  description?: ReactNode;
  accept?: string;
  maxSizeMb?: number;
  fullWidth?: boolean;
  requiredMark?: boolean;
  className?: string;
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

export function FileUploadField<TFormValues extends FieldValues>({
  control,
  name,
  label,
  description,
  accept = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  maxSizeMb = 5,
  fullWidth = true,
  requiredMark,
  className,
}: FileUploadFieldProps<TFormValues>) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const onDrop = useCallback(
    (files: FileList | null, onChange: (v: unknown) => void) => {
      const file = files?.[0];
      if (!file) return;
      onChange(file);
    },
    [],
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const file = field.value as File | undefined | null;
        return (
          <FormItem className={cn(fullWidth && "md:col-span-2", className)}>
            <FormLabel>
              {label}
              {requiredMark ? (
                <span className="ml-0.5 text-brand-danger" aria-hidden>
                  *
                </span>
              ) : null}
            </FormLabel>
            <FormControl>
              <div
                onDragOver={(e: DragEvent) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e: DragEvent) => {
                  e.preventDefault();
                  setDragging(false);
                  onDrop(e.dataTransfer?.files ?? null, field.onChange);
                }}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors",
                  dragging
                    ? "border-brand-primary bg-brand-primary/5"
                    : "border-brand bg-brand-surface-2/40",
                )}
              >
                <UploadCloud
                  className="h-7 w-7 text-brand-primary"
                  aria-hidden
                />
                <p className="text-sm text-brand-ink">
                  <button
                    type="button"
                    className="font-medium text-brand-primary underline underline-offset-2"
                    onClick={() => inputRef.current?.click()}
                  >
                    Click to upload
                  </button>{" "}
                  or drag & drop
                </p>
                <p className="text-xs text-brand-muted">
                  PDF or DOCX · up to {maxSizeMb} MB
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  accept={accept}
                  className="sr-only"
                  aria-label={typeof label === "string" ? label : "Upload file"}
                  onChange={(e) => onDrop(e.target.files, field.onChange)}
                />
              </div>
            </FormControl>
            {file ? (
              <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-brand bg-card-brand px-3 py-2 text-sm">
                <span className="flex min-w-0 items-center gap-2">
                  <FileText
                    className="h-4 w-4 shrink-0 text-brand-primary"
                    aria-hidden
                  />
                  <span className="truncate text-brand-ink">{file.name}</span>
                  <span className="shrink-0 text-xs text-brand-muted">
                    {formatBytes(file.size)}
                  </span>
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => field.onChange(undefined)}
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            ) : null}
            {description ? <FormDescription>{description}</FormDescription> : null}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
