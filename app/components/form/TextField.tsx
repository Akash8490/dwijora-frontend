"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import type { FieldValues, Path, Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/app/lib/utils";

export interface TextFieldProps<TFormValues extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "form"> {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label: ReactNode;
  description?: ReactNode;
  fullWidth?: boolean;
  requiredMark?: boolean;
}

export function TextField<TFormValues extends FieldValues>({
  control,
  name,
  label,
  description,
  fullWidth,
  requiredMark,
  className,
  ...inputProps
}: TextFieldProps<TFormValues>) {
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
            <Input {...inputProps} {...field} value={field.value ?? ""} />
          </FormControl>
          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
