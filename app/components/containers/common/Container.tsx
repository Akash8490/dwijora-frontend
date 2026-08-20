import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/app/lib/utils";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const SIZE_CLASS: Record<NonNullable<ContainerProps["size"]>, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

export function Container({
  children,
  size = "lg",
  className,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 md:px-8",
        SIZE_CLASS[size],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
