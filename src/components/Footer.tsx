import { useState, type FormEvent } from "react";
import { Check, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { FOOTER_COLUMNS } from "../lib/mockData";

const SOCIALS = [
  { label: "Facebook", icon: Facebook },
  { label: "X", icon: XIcon },
  { label: "Instagram", icon: Instagram },
  { label: "LinkedIn", icon: Linkedin },
  { label: "YouTube", icon: Youtube },
  { label: "Telegram", icon: TelegramIcon },
] as const;

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative border-t border-line bg-panel">
      <div className="bl-container py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)] lg:gap-16">
          {/* Brand + newsletter */}
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-muted">
              Bitlance is a next-generation digital asset exchange built for speed,
              transparency and security — trade 1000+ markets with confidence.
            </p>

            <div className="mt-7 max-w-sm">
              <p className="text-[14px] font-bold text-ink">Connect with Bitlance</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                Receive the latest updates and weekly market insights directly in your
                inbox.
              </p>

              {subscribed ? (
                <p
                  role="status"
                  className="mt-4 flex items-center gap-2 rounded-xl border border-brand/35 bg-brand/10 px-4 py-3 text-[13px] font-medium text-brand"
                >
                  <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden="true" />
                  Subscribed — check your inbox to confirm.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-4" noValidate>
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-line bg-card p-1.5 transition-colors duration-200 focus-within:border-brand/60">
                    <input
                      id="footer-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Enter email"
                      className="min-w-0 flex-1 bg-transparent px-3 py-2 text-[13.5px] text-ink outline-none placeholder:text-faint"
                    />
                    <button
                      type="submit"
                      className="shrink-0 rounded-lg bg-brand px-4 py-2 text-[13px] font-semibold text-[#04171a] transition-all duration-200 hover:bg-[#33e6f2] active:scale-[0.98]"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-ink">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link}`}>
                      <a
                        href="#"
                        onClick={(event) => event.preventDefault()}
                        className="text-[13.5px] text-muted transition-colors duration-150 hover:text-brand"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-6 border-t border-line pt-7 sm:flex-row">
          <p className="text-center text-[12.5px] text-faint sm:text-left">
            © 2026 Bitlance. All rights reserved. Cryptocurrency trading involves risk.
          </p>

          <ul className="flex items-center gap-2">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <li key={social.label}>
                  <a
                    href="#"
                    onClick={(event) => event.preventDefault()}
                    aria-label={social.label}
                    title={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/50 hover:text-brand"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}

/* Custom brand glyphs not covered by lucide ---------------------------- */

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.53 3H21l-7.19 8.21L21.75 21H15.6l-4.55-5.96L5.74 21H2.25l7.6-8.68L2.5 3h6.15l4.29 5.66L17.53 3Zm-1.15 16h1.79L7.7 4.9H5.78l10.6 14.1Z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M21.7 4.3 18.9 18.6c-.2 1-.8 1.2-1.6.8l-4.5-3.3-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.6L18.3 6c.4-.3-.1-.5-.6-.2L7.3 12.3l-4.4-1.4c-1-.3-1-1 .2-1.4L20.3 3.2c.8-.3 1.5.2 1.4 1.1Z" />
    </svg>
  );
}

export default Footer;
