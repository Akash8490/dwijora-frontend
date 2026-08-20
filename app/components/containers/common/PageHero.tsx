import type { ReactNode } from "react";
import { cn } from "@/app/lib/utils";
import { Container } from "@/app/components/containers/common/Container";
import { Eyebrow } from "@/app/components/containers/common/Eyebrow";
import { AccentRule } from "@/app/components/containers/common/AccentRule";
import { Breadcrumbs, type Crumb } from "@/app/components/containers/common/Breadcrumbs";

export interface PageHeroProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  actions,
  align = "left",
  className,
}: PageHeroProps) {
  return (
    <header
      className={cn(
        "relative overflow-hidden bg-surface-2 border-b border-brand",
        className,
      )}
    >
      <div aria-hidden className="ornament-gradient absolute inset-0" />
      <Container size="lg" className="relative py-12 md:py-20">
        {breadcrumbs?.length ? (
          <div className="mb-6 text-sm">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        ) : null}
        <div
          className={cn(
            "flex flex-col gap-4",
            align === "center" && "items-center text-center",
          )}
        >
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-brand-ink">
            {title}
          </h1>
          <AccentRule align={align} />
          {subtitle ? (
            <p className="max-w-3xl text-base md:text-lg text-brand-muted">
              {subtitle}
            </p>
          ) : null}
          {actions ? <div className="mt-4">{actions}</div> : null}
        </div>
      </Container>
    </header>
  );
}
