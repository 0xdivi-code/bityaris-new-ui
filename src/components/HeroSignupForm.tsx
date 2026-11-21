import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { isEmailOrPhone } from "../lib/format";
import { cn } from "../lib/cn";

interface HeroSignupFormProps {
  className?: string;
}

/**
 * Compact centered signup form used in the hero. Accepts either an email
 * address or a phone number and shows an inline confirmation state.
 */
export function HeroSignupForm({ className }: HeroSignupFormProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim();

    if (!isEmailOrPhone(trimmed)) {
      setError("Enter a valid email address or phone number.");
      return;
    }

    setError(null);
    setSubmitted(trimmed);
  };

  if (submitted) {
    return (
      <div
        className={cn(
          "mx-auto flex w-full max-w-[440px] items-center gap-3 rounded-2xl border border-brand/30 bg-white/[0.06] px-5 py-4 text-left backdrop-blur-md",
          className,
        )}
        role="status"
      >
        <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" strokeWidth={2.2} />
        <p className="text-[13px] leading-snug text-white/85">
          <span className="font-semibold text-white">You&apos;re on the list.</span>{" "}
          We sent a confirmation link to{" "}
          <span className="text-brand">{submitted}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("w-full", className)}>
      <div
        className={cn(
          "mx-auto flex w-full max-w-[440px] items-center gap-1 rounded-full border p-1.5 pl-5 transition-colors duration-300",
          error
            ? "border-[#F0445A]/70 bg-[#F0445A]/[0.08]"
            : "border-white/15 bg-white/[0.07] hover:border-white/25 focus-within:border-brand/70 focus-within:bg-white/[0.09]",
        )}
      >
        <Mail
          className="mr-2 hidden h-4 w-4 shrink-0 text-white/40 sm:block"
          aria-hidden="true"
        />
        <label htmlFor="hero-contact" className="sr-only">
          Email or phone number
        </label>
        <input
          id="hero-contact"
          name="contact"
          type="text"
          inputMode="email"
          autoComplete="email"
          placeholder="Email / Phone"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            if (error) setError(null);
          }}
          className="min-w-0 flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-white/45"
        />
        <button
          type="submit"
          className={cn(
            "group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-[14px] font-semibold text-[#04171a]",
            "shadow-[0_8px_28px_-10px_rgba(0,217,232,0.85)] transition-all duration-200",
            "hover:bg-[#33e6f2] hover:shadow-[0_10px_34px_-8px_rgba(0,217,232,0.95)] active:scale-[0.98]",
          )}
        >
          Get Started
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            strokeWidth={2.4}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="mx-auto mt-2 min-h-[18px] max-w-[440px] text-left">
        {error ? (
          <p role="alert" className="pl-5 text-[12px] text-[#FF7A8A]">
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}

export default HeroSignupForm;
