import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../lib/cn";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

/** Fade-and-rise entrance used across sections; disabled for reduced motion. */
export function Reveal({ children, className, delay = 0, y = 26, once = true }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.18 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="max-w-3xl text-balance text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[36px] lg:text-[40px]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-pretty text-[14px] leading-relaxed text-muted sm:text-[15px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
