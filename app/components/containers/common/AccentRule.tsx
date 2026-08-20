import { cn } from "@/app/lib/utils";

export function AccentRule({
  className,
  align = "left",
}: {
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "accent-rule",
        align === "center" && "mx-auto block",
        className,
      )}
    />
  );
}
