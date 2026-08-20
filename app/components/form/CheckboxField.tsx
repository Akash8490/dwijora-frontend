"use client";

import type { ReactNode } from "react";
import type { FieldValues, Path, Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Checkbox } from "@/app/components/ui/checkbox";
import { cn } from "@/app/lib/utils";

export interface CheckboxFieldProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label: ReactNode;
  description?: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export function CheckboxField<TFormValues extends FieldValues>({
  control,
  name,
  label,
  description,
  fullWidth = true,
  className,
}: CheckboxFieldProps<TFormValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-row items-start gap-3 rounded-lg border border-brand bg-card-brand p-4",
            fullWidth && "md:col-span-2",
            className,
          )}
        >
          <FormControl>
            <Checkbox
              checked={Boolean(field.value)}
              onCheckedChange={(v) => field.onChange(v === true)}
              aria-label={typeof label === "string" ? label : undefined}
            />
          </FormControl>
          <div className="space-y-1 leading-tight">
            <FormLabel className="text-sm">{label}</FormLabel>
            {description ? (
              <p className="text-xs text-brand-muted">{description}</p>
            ) : null}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
