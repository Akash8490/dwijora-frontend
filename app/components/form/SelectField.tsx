"use client";

import type { ReactNode } from "react";
import type { FieldValues, Path, Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/app/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { cn } from "@/app/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label: ReactNode;
  options: SelectOption[];
  placeholder?: string;
  description?: ReactNode;
  fullWidth?: boolean;
  requiredMark?: boolean;
  className?: string;
}

export function SelectField<TFormValues extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Choose…",
  description,
  fullWidth,
  requiredMark,
  className,
}: SelectFieldProps<TFormValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(fullWidth && "md:col-span-2", className)}>
          <FormLabel>
            {label}
            {requiredMark ? (
              <span className="ml-0.5 text-brand-danger" aria-hidden>
                *
              </span>
            ) : null}
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value ?? ""}
          >
            <FormControl>
              <SelectTrigger className="w-full bg-card-brand">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
