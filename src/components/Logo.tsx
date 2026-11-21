import { cn } from "../lib/cn";

interface LogoProps {
  className?: string;
  /** Forces the light wordmark — used over the always-dark hero. */
  tone?: "auto" | "light";
  size?: "sm" | "md";
}

/** Bitlance mark — a knotted cyan glyph with a gradient stroke. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("h-8 w-8", className)}
      role="img"
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id="bl-mark-grad" x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5BF6FF" />
          <stop offset="0.5" stopColor="#00D9E8" />
          <stop offset="1" stopColor="#00A9BC" />
        </linearGradient>
      </defs>
      <g stroke="url(#bl-mark-grad)" strokeWidth="3.1" strokeLinejoin="round" strokeLinecap="round">
        <path d="M20 5.5c5 0 9 4 9 9 0 1.6-.4 3.1-1.2 4.4 2.9 1.3 4.9 4.2 4.9 7.6 0 4.6-3.7 8.3-8.3 8.3-1.7 0-3.3-.5-4.4-1.3-1.1.8-2.7 1.3-4.4 1.3-4.6 0-8.3-3.7-8.3-8.3 0-3.4 2-6.3 4.9-7.6-.8-1.3-1.2-2.8-1.2-4.4 0-5 4-9 9-9Z" />
      </g>
      <circle cx="20" cy="20" r="4.1" fill="url(#bl-mark-grad)" />
    </svg>
  );
}

export function Logo({ className, tone = "auto", size = "md" }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        tone === "light" ? "text-white" : "text-ink",
        className,
      )}
    >
      <LogoMark className={size === "sm" ? "h-7 w-7" : "h-8 w-8"} />
      <span
        className={cn(
          "font-display font-semibold leading-none",
          size === "sm" ? "text-[19px]" : "text-[22px]",
        )}
        style={{ letterSpacing: "0.01em" }}
      >
        Bitlance
      </span>
    </span>
  );
}
