import { Apple, Play } from "lucide-react";
import { Reveal } from "./Reveal";

const STORE_BADGES = [
  {
    id: "apple",
    top: "Download on the",
    bottom: "App Store",
    icon: Apple,
  },
  {
    id: "google",
    top: "Get it on",
    bottom: "Google Play",
    icon: Play,
  },
] as const;

export function AppPromotionSection() {
  return (
    <section id="app" className="relative overflow-hidden bg-panel py-20 sm:py-24">
      <div className="bl-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
              Mobile App
            </span>
            <h2 className="mt-4 text-[28px] font-extrabold leading-[1.14] tracking-[-0.02em] text-ink sm:text-[38px]">
              Trade Anytime, Anywhere
            </h2>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-muted sm:text-[15px]">
              Experience seamless trading with the Bitlance app, available on Apple and
              Google Play.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {STORE_BADGES.map((badge) => {
                const Icon = badge.icon;
                return (
                  <a
                    key={badge.id}
                    href="#app"
                    aria-label={`${badge.bottom} — ${badge.top}`}
                    className="group inline-flex items-center gap-3 rounded-xl border border-line bg-card px-5 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/45 hover:shadow-[0_18px_36px_-22px_rgba(0,217,232,0.7)]"
                  >
                    <Icon
                      className="h-6 w-6 text-ink transition-colors duration-200 group-hover:text-brand"
                      strokeWidth={1.9}
                      aria-hidden="true"
                    />
                    <span className="leading-tight">
                      <span className="block text-[10.5px] uppercase tracking-[0.08em] text-muted">
                        {badge.top}
                      </span>
                      <span className="block text-[15px] font-semibold text-ink">
                        {badge.bottom}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>

            <dl className="mt-9 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                { value: "10M+", label: "Downloads" },
                { value: "4.8", label: "App rating" },
                { value: "150+", label: "Countries" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[20px] font-extrabold tracking-[-0.02em] text-ink">
                    {stat.value}
                  </dt>
                  <dd className="mt-0.5 text-[12.5px] text-muted">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-8"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(0,217,232,0.18), rgba(0,217,232,0) 70%)",
                }}
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-3xl border border-line shadow-[var(--shadow-float)]">
                <img
                  src="/images/app-lifestyle.jpg"
                  alt="Person using the Bitlance mobile app on a city street at night"
                  loading="lazy"
                  decoding="async"
                  className="h-[320px] w-full object-cover object-center sm:h-[420px] lg:h-[460px]"
                />
                {/* Blend the photo into the section background */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--bl-panel) 0%, rgba(9,15,18,0) 32%), linear-gradient(0deg, rgba(9,15,18,0.55) 0%, rgba(9,15,18,0) 45%)",
                  }}
                  aria-hidden="true"
                />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/45 px-4 py-3 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/15 text-brand">
                      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                        <path d="M10 2 4 12h5l-1 6 7-11h-5l1-5Z" />
                      </svg>
                    </span>
                    <div className="leading-tight">
                      <p className="text-[13px] font-semibold text-white">BTC/USDT</p>
                      <p className="tnum text-[11.5px] text-white/60">$66,752.12</p>
                    </div>
                  </div>
                  <span className="tnum rounded-lg bg-[#00C087]/15 px-2.5 py-1 text-[12px] font-semibold text-[#00C087]">
                    +5.28%
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default AppPromotionSection;
