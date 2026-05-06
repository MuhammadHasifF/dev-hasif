import { cn } from "@/lib/utils";

/**
 * Q-Industrial signature glyph: stroke-only diagonal arrow pointing upper-right.
 * Pairs with .arrow-lift utility — when an ancestor with .group is hovered,
 * the arrow translates (4px, -4px).
 */
export function DiagonalArrow({
  className,
  size = 14,
  strokeWidth = 1.5,
}: {
  className?: string;
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      className={cn("arrow-lift inline-block shrink-0", className)}
    >
      <path d="M3 11 L11 3" />
      <path d="M5 3 L11 3 L11 9" />
    </svg>
  );
}
