import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/app/lib/utils";
import { Container } from "@/app/components/containers/common/Container";
import { SectionHeading } from "@/app/components/containers/common/SectionHeading";

export interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  children: ReactNode;
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: "surface" | "surface-2" | "card" | "none";
  size?: "sm" | "md" | "lg" | "xl";
  containerSize?: "sm" | "md" | "lg" | "xl";
  headingAs?: "h1" | "h2" | "h3";
  actions?: ReactNode;
}

const PAD: Record<NonNullable<SectionProps["size"]>, string> = {
  sm: "py-10 md:py-12",
  md: "py-14 md:py-20",
  lg: "py-16 md:py-24",
  xl: "py-20 md:py-28",
};

const TONE: Record<NonNullable<SectionProps["tone"]>, string> = {
  surface: "bg-surface",
  "surface-2": "bg-surface-2",
  card: "bg-card-brand",
  none: "",
};

export function Section({
  children,
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "none",
  size = "md",
  containerSize = "lg",
  headingAs = "h2",
  actions,
  className,
  ...rest
}: SectionProps) {
  return (
    <section className={cn(PAD[size], TONE[tone], className)} {...rest}>
      <Container size={containerSize}>
        {title ? (
          <div
            className={cn(
              "mb-8 flex flex-col gap-4",
              align === "center" ? "items-center text-center" : "items-start",
              actions &&
                align === "left" &&
                "md:flex-row md:items-end md:justify-between md:gap-8",
            )}
          >
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              subtitle={subtitle}
              align={align}
              as={headingAs}
            />
            {actions ? <div className="shrink-0">{actions}</div> : null}
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
