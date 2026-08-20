import type { ReactNode } from "react";
import { cn } from "@/app/lib/utils";
import { Eyebrow } from "@/app/components/containers/common/Eyebrow";
import { AccentRule } from "@/app/components/containers/common/AccentRule";

export interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as = "h2",
  className,
}: SectionHeadingProps) {
  const Tag = as;
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag
        className={cn(
          "font-display text-brand-ink",
          as === "h1" && "text-3xl md:text-4xl lg:text-5xl leading-tight",
          as === "h2" && "text-2xl md:text-3xl lg:text-[2.15rem] leading-snug",
          as === "h3" && "text-xl md:text-2xl leading-snug",
        )}
      >
        {title}
      </Tag>
      <AccentRule align={align} />
      {subtitle ? (
        <p className="max-w-2xl text-base md:text-lg text-brand-muted">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
