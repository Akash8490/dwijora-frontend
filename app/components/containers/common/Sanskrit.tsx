import type { ElementType, ReactNode } from "react";
import { cn } from "@/app/lib/utils";

/**
 * Render Sanskrit / Devanagari text consistently across the site.
 *
 * Applies:
 *  - the Devanagari serif font token (--font-deva-serif) via .font-deva-serif,
 *  - `lang="sa"` for correct shaping and screen-reader pronunciation,
 *  - a Devanagari-friendly line-height (via the `:lang(sa)` rule in
 *    globals.css) so matras/conjuncts don't clip,
 *  - a size/weight preset chosen via the `variant` prop.
 *
 * Do NOT set `font-family` here — it is inherited from the token so a future
 * font swap changes one place.
 */
export type SanskritVariant =
  | "wordmark" // journal name in the header/footer alongside roman
  | "display" // hero-scale title
  | "heading" // section heading in Devanagari
  | "quote" // shloka quotation (deep-gold accent)
  | "inline" // inline within a paragraph
  | "body"; // body-paragraph Devanagari

const VARIANT_CLASS: Record<SanskritVariant, string> = {
  wordmark: "font-semibold leading-tight",
  display: "font-semibold leading-[1.1] tracking-tight",
  heading: "font-semibold leading-snug",
  quote: "leading-relaxed",
  inline: "leading-relaxed",
  body: "leading-relaxed",
};

export interface SanskritProps {
  children: ReactNode;
  /** HTML tag to render as. Default: `span` (safe inside paragraphs). */
  as?: ElementType;
  variant?: SanskritVariant;
  className?: string;
  /**
   * Override the BCP-47 language tag. Defaults to "sa" (Sanskrit).
   * Use "hi" for Hindi copy that happens to render in Devanagari.
   */
  lang?: "sa" | "hi";
  /** Optional aria-label if the surrounding context needs one. */
  ariaLabel?: string;
}

export function Sanskrit({
  children,
  as: Tag = "span",
  variant = "inline",
  className,
  lang = "sa",
  ariaLabel,
}: SanskritProps) {
  return (
    <Tag
      lang={lang}
      aria-label={ariaLabel}
      className={cn("font-deva-serif", VARIANT_CLASS[variant], className)}
    >
      {children}
    </Tag>
  );
}
