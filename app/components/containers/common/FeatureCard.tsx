import type { ReactNode } from "react";
import { Card } from "@/app/components/ui/card";
import { cn } from "@/app/lib/utils";

export function FeatureCard({
  icon,
  title,
  description,
  className,
}: {
  icon: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col gap-3 border-brand bg-card-brand p-5 md:p-6 paper-shadow paper-shadow-hover",
        className,
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
        {icon}
      </div>
      <h3 className="font-display text-lg text-brand-ink leading-snug">
        {title}
      </h3>
      {description ? (
        <p className="text-sm text-brand-muted leading-relaxed">{description}</p>
      ) : null}
    </Card>
  );
}
