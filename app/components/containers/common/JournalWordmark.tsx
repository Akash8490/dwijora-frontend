import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/app/lib/brand";
import { Sanskrit } from "@/app/components/containers/common/Sanskrit";
import { cn } from "@/app/lib/utils";

export interface JournalWordmarkProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  /** Render the circular brand emblem alongside the wordmark. Default: true. */
  showEmblem?: boolean;
  /** Recolour text for use on dark backgrounds (e.g. footer). */
  onDark?: boolean;
  className?: string;
}

const SIZE = {
  sm: {
    deva: "text-xl md:text-2xl",
    latin: "text-xs md:text-sm",
    tagline: "text-[0.65rem]",
    emblem: 36,
  },
  md: {
    deva: "text-2xl md:text-3xl",
    latin: "text-sm md:text-base",
    tagline: "text-xs",
    emblem: 44,
  },
  lg: {
    deva: "text-4xl md:text-5xl",
    latin: "text-base md:text-lg",
    tagline: "text-sm",
    emblem: 64,
  },
} as const;

export function JournalWordmark({
  href = "/",
  size = "md",
  showTagline = false,
  showEmblem = true,
  onDark = false,
  className,
}: JournalWordmarkProps) {
  const s = SIZE[size];

  const emblem = showEmblem ? (
    <span
      className="relative shrink-0 overflow-hidden rounded-full ring-1 ring-brand-accent/40 bg-brand-accent"
      style={{ width: s.emblem, height: s.emblem }}
      aria-hidden
    >
      <Image
        src="/brand/visvasamvid-emblem.png"
        alt={`${BRAND.nameRoman} emblem`}
        fill
        sizes={`${s.emblem}px`}
        priority
        className="object-cover"
      />
    </span>
  ) : null;

  const text = (
    <span className="flex flex-col leading-tight">
      <Sanskrit
        variant="wordmark"
        className={cn(onDark ? "text-white" : "text-brand-ink", s.deva)}
      >
        {BRAND.nameDeva}
      </Sanskrit>
      <span
        className={cn(
          "font-display italic tracking-wide",
          onDark ? "text-brand-accent" : "text-brand-primary",
          s.latin,
        )}
      >
        {BRAND.nameRoman}
      </span>
      {showTagline ? (
        <span
          className={cn(
            "mt-1",
            onDark ? "text-white/60" : "text-brand-muted",
            s.tagline,
          )}
        >
          {BRAND.subtitle}
        </span>
      ) : null}
    </span>
  );

  const inner = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      {emblem}
      {text}
    </span>
  );

  if (!href) return inner;
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3"
    >
      {inner}
    </Link>
  );
}
