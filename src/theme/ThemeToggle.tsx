import { Moon, Sun } from "lucide-react";
import { useId } from "react";
import { useTheme } from "./ThemeProvider";
import { cn } from "../lib/cn";

interface ThemeToggleProps {
  className?: string;
}

/** Accessible light/dark switch with an animated icon swap. */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const labelId = useId();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={!isDark}
      aria-labelledby={labelId}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "group relative inline-flex h-9 w-16 shrink-0 items-center rounded-full border border-line",
        "bg-card-2/80 transition-colors duration-300 hover:border-brand/50",
        className,
      )}
    >
      <span id={labelId} className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[#04171a] shadow-[0_0_18px_-4px_rgba(0,217,232,0.9)] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isDark ? "translate-x-[4px]" : "translate-x-[34px]",
        )}
      >
        {isDark ? (
          <Moon className="h-4 w-4" strokeWidth={2.2} />
        ) : (
          <Sun className="h-4 w-4" strokeWidth={2.2} />
        )}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 text-faint"
      >
        <Sun className={cn("h-3.5 w-3.5 transition-opacity", isDark ? "opacity-60" : "opacity-0")} />
        <Moon className={cn("h-3.5 w-3.5 transition-opacity", isDark ? "opacity-0" : "opacity-60")} />
      </span>
    </button>
  );
}
