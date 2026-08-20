import type { ReactNode } from "react";
import { Info, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/app/lib/utils";

export type CalloutTone = "info" | "warning" | "success" | "danger";

const TONE_STYLE: Record<CalloutTone, { wrap: string; icon: string; Icon: typeof Info }> = {
  info: {
    wrap: "border-brand-primary/20 bg-brand-primary/5 text-brand-ink",
    icon: "text-brand-primary",
    Icon: Info,
  },
  warning: {
    wrap: "border-brand-accent/40 bg-brand-accent/10 text-brand-ink",
    icon: "text-brand-accent-deep",
    Icon: AlertTriangle,
  },
  success: {
    wrap: "border-brand-success/30 bg-brand-success/10 text-brand-ink",
    icon: "text-brand-success",
    Icon: CheckCircle2,
  },
  danger: {
    wrap: "border-brand-danger/40 bg-brand-danger/10 text-brand-ink",
    icon: "text-brand-danger",
    Icon: XCircle,
  },
};

export function Callout({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: CalloutTone;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const { wrap, icon, Icon } = TONE_STYLE[tone];
  return (
    <div className={cn("rounded-xl border p-4 md:p-5 flex gap-3", wrap, className)}>
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", icon)} aria-hidden />
      <div className="text-sm md:text-[0.95rem] leading-relaxed">
        {title ? (
          <p className="mb-1 font-semibold text-brand-ink">{title}</p>
        ) : null}
        {children ? <div className="text-brand-muted">{children}</div> : null}
      </div>
    </div>
  );
}
