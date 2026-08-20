"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/app/lib/utils";

export interface MotionInViewProps {
  children: ReactNode;
  /** Seconds of delay before animating in. */
  delay?: number;
  /** Vertical offset (px) the child starts from. Default 16. */
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}

/**
 * Lightweight fade-up-on-enter wrapper. Zero JS deps (no framer-motion) —
 * just IntersectionObserver + a CSS transform/opacity transition. Respects
 * prefers-reduced-motion via the media query below; if the user prefers
 * reduced motion the child renders at final opacity/position immediately
 * with no transform applied.
 */
export function MotionInView({
  children,
  delay = 0,
  y = 16,
  className,
  as = "div",
}: MotionInViewProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // IntersectionObserver is universally available on our target browsers
    // (Safari 12.1+, Chrome 51+, Firefox 55+ — all 2017 or earlier).
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "-60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties = {
    transitionDelay: delay ? `${delay}s` : undefined,
    "--motion-in-y": `${y}px`,
  } as CSSProperties;

  const commonProps = {
    ref: ref as React.Ref<HTMLElement>,
    className: cn("motion-in-view", visible && "is-visible", className),
    style,
  };

  if (as === "section") return <section {...commonProps as React.ComponentPropsWithRef<"section">}>{children}</section>;
  if (as === "article") return <article {...commonProps as React.ComponentPropsWithRef<"article">}>{children}</article>;
  if (as === "li") return <li {...commonProps as React.ComponentPropsWithRef<"li">}>{children}</li>;
  return <div {...commonProps as React.ComponentPropsWithRef<"div">}>{children}</div>;
}
