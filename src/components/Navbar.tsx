import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "../theme/ThemeToggle";
import { NAV_ITEMS } from "../lib/mockData";
import { cn } from "../lib/cn";

/** Hero covers the full viewport — the transparent nav must match it. */
const NAV_CLEARANCE = 76;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setOverHero(y < window.innerHeight - NAV_CLEARANCE);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /** Transparent while floating over the always-dark hero, glass afterwards. */
  const transparent = overHero && !scrolled && !menuOpen;

  const scheduleDropdownClose = (label: string | null) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    if (label === null) {
      closeTimer.current = window.setTimeout(() => setOpenDropdown(null), 140);
    } else {
      setOpenDropdown(label);
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300",
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line bg-[var(--bl-glass)] shadow-[0_10px_30px_-24px_rgba(0,0,0,0.6)] backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--bl-glass)]",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[68px] w-full max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-6 lg:px-8"
      >
        <a
          href="#hero"
          className="shrink-0 transition-opacity duration-200 hover:opacity-85"
          aria-label="Bitlance home"
        >
          <Logo tone="light" />
        </a>

        {/* ------------------------------------------------------ desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => scheduleDropdownClose(item.children ? item.label : null)}
              onMouseLeave={() => scheduleDropdownClose(null)}
            >
              <a
                href={item.href}
                aria-haspopup={item.children ? "true" : undefined}
                aria-expanded={item.children ? openDropdown === item.label : undefined}
                onFocus={() => scheduleDropdownClose(item.children ? item.label : null)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[14px] font-medium transition-colors duration-200",
                  transparent
                    ? "text-white/75 hover:text-white"
                    : "text-muted hover:text-ink",
                )}
              >
                {item.label}
                {item.children ? (
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      openDropdown === item.label && "rotate-180",
                    )}
                    strokeWidth={2.4}
                    aria-hidden="true"
                  />
                ) : null}
              </a>

              {item.children ? (
                <div
                  className={cn(
                    "absolute left-0 top-full w-[268px] pt-2 transition-all duration-200",
                    openDropdown === item.label
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-1 opacity-0",
                  )}
                >
                  <div className="overflow-hidden rounded-xl border border-line bg-[var(--bl-glass-strong)] p-1.5 shadow-[var(--bl-shadow-float)] backdrop-blur-xl">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        onClick={() => setOpenDropdown(null)}
                        className="block rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-brand/10"
                      >
                        <span className="block text-[13.5px] font-semibold text-ink">
                          {child.label}
                        </span>
                        {child.description ? (
                          <span className="mt-0.5 block text-[12px] text-muted">
                            {child.description}
                          </span>
                        ) : null}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </li>
          ))}
        </ul>

        {/* ------------------------------------------------------ actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle className="hidden sm:inline-flex" />

          <a
            href="#faq"
            className={cn(
              "hidden text-[14px] font-semibold transition-colors duration-200 sm:inline-flex",
              transparent ? "text-brand hover:text-white" : "text-brand hover:text-ink",
            )}
          >
            Sign In
          </a>

          <a
            href="#hero"
            className={cn(
              "hidden rounded-full px-5 py-2.5 text-[14px] font-semibold transition-all duration-200 active:scale-[0.98] sm:inline-flex",
              "bg-brand text-[#04171a] shadow-[0_8px_26px_-12px_rgba(0,217,232,0.9)] hover:bg-[#33e6f2] hover:shadow-[0_10px_30px_-8px_rgba(0,217,232,0.95)]",
            )}
          >
            Get Started
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors duration-200 lg:hidden",
              transparent
                ? "border-white/15 text-white hover:bg-white/10"
                : "border-line text-ink hover:bg-[var(--bl-btn-ghost)]",
            )}
          >
            <span className="relative block h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 h-[1.8px] w-5 rounded-full bg-current transition-all duration-300",
                  menuOpen ? "top-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-[1.8px] w-5 -translate-y-1/2 rounded-full bg-current transition-opacity duration-200",
                  menuOpen ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[1.8px] w-5 rounded-full bg-current transition-all duration-300",
                  menuOpen ? "top-1/2 -rotate-45" : "bottom-0",
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* -------------------------------------------------------- mobile */}
      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-line/60 bg-[var(--bl-glass-strong)] backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out lg:hidden",
          menuOpen ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="max-h-[calc(100vh-68px)] overflow-y-auto px-5 pb-6 pt-3">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="border-b border-line/70 last:border-0">
                {item.children ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-[15px] font-semibold text-ink">
                      {item.label}
                      <ChevronDown
                        className="h-4 w-4 text-muted transition-transform duration-200 group-open:rotate-180"
                        strokeWidth={2.2}
                      />
                    </summary>
                    <div className="pb-3">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={() => setMenuOpen(false)}
                          className="block rounded-lg px-3 py-2.5 text-[14px] text-muted transition-colors hover:bg-brand/10 hover:text-ink"
                        >
                          {child.label}
                          {child.description ? (
                            <span className="mt-0.5 block text-[12px] text-faint">
                              {child.description}
                            </span>
                          ) : null}
                        </a>
                      ))}
                    </div>
                  </details>
                ) : (
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3.5 text-[15px] font-semibold text-ink transition-colors hover:text-brand"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center justify-between gap-3">
            <ThemeToggle />
            <div className="flex flex-1 items-center justify-end gap-3">
              <a
                href="#faq"
                onClick={() => setMenuOpen(false)}
                className="text-[14px] font-semibold text-brand"
              >
                Sign In
              </a>
              <a
                href="#hero"
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-brand px-5 py-2.5 text-[14px] font-semibold text-[#04171a] transition-colors hover:bg-[#33e6f2]"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
