"use client";

import type { TextareaHTMLAttributes, ReactNode } from "react";
import type { FieldValues, Path, Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/app/components/ui/form";
import { Textarea } from "@/app/components/ui/textarea";
import { cn } from "@/app/lib/utils";

export interface TextareaFieldProps<TFormValues extends FieldValues>
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "form"> {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label: ReactNode;
  description?: ReactNode;
  fullWidth?: boolean;
  requiredMark?: boolean;
}

export function TextareaField<TFormValues extends FieldValues>({
  control,
  name,
  label,
  description,
  fullWidth = true,
  requiredMark,
  className,
  rows = 5,
  ...rest
}: TextareaFieldProps<TFormValues>) {
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
          <FormControl>
            <Textarea rows={rows} {...rest} {...field} value={field.value ?? ""} />
          </FormControl>
          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
