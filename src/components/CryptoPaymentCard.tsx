import { BadgePercent, Banknote, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";
import { CARD_BENEFITS } from "../lib/mockData";
import type { CardBenefit } from "../lib/types";
import { cn } from "../lib/cn";

const BENEFIT_ICONS: Record<CardBenefit["icon"], typeof ShieldCheck> = {
  shield: ShieldCheck,
  cashback: BadgePercent,
  withdraw: Banknote,
};

export function CryptoPaymentCard() {
  return (
    <section id="card" className="relative overflow-hidden bg-page py-20 sm:py-24 lg:py-28">
      {/* Ambient brand light — subtle, single hue */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,217,232,0.10), rgba(0,217,232,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="bl-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <CardShowcase />
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
              Bitlance Card
            </span>
            <h2 className="mt-4 text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[36px]">
              Bitlance Card — Spend Crypto Anywhere
            </h2>
            <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-muted sm:text-[15px]">
              Turn your balance into everyday spending power. Pay in stores, online and
              worldwide while your assets keep working in the background.
            </p>

            <ol className="relative mt-9 space-y-8 border-l border-line pl-9">
              {CARD_BENEFITS.map((benefit) => {
                const Icon = BENEFIT_ICONS[benefit.icon];
                return (
                  <li key={benefit.title} className="relative">
                    <span
                      className="absolute -left-[46px] top-0 flex h-[26px] w-[26px] items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-brand"
                      aria-hidden="true"
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                    </span>
                    <h3 className="text-[16px] font-bold text-ink">{benefit.title}</h3>
                    <p className="mt-1.5 max-w-md text-[14px] leading-relaxed text-muted">
                      {benefit.description}
                    </p>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/* 3D card stack, rendered entirely with CSS transforms                  */
/* --------------------------------------------------------------------- */

function CardShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div
        className="pointer-events-none absolute -inset-14 opacity-90"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,217,232,0.20), rgba(0,217,232,0) 72%)",
        }}
        aria-hidden="true"
      />

      <div
        className="relative aspect-[1.586/1] w-full"
        style={{ perspective: "1400px" }}
      >
        {/* Back cards */}
        <CardFace
          className="absolute inset-0 opacity-70"
          style={{
            transform:
              "translate3d(-9%, 9%, -80px) rotateX(8deg) rotateZ(-13deg) scale(0.97)",
            filter: "brightness(0.72) saturate(0.85)",
          }}
        />
        <CardFace
          className="absolute inset-0 opacity-85"
          style={{
            transform:
              "translate3d(-4.5%, 4.5%, -40px) rotateX(10deg) rotateZ(-13.5deg) scale(0.99)",
            filter: "brightness(0.86)",
          }}
        />
        {/* Front card */}
        <CardFace
          className="bl-float-slow absolute inset-0"
          style={{
            transform: "rotateX(12deg) rotateZ(-14deg)",
            boxShadow:
              "0 46px 90px -34px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,217,232,0.22), 0 0 60px -20px rgba(0,217,232,0.45)",
          }}
        />
      </div>
    </div>
  );
}

interface CardFaceProps {
  className?: string;
  style?: React.CSSProperties;
}

function CardFace({ className, style }: CardFaceProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[20px]",
        className,
      )}
      style={{
        background:
          "linear-gradient(135deg, #16202E 0%, #0B1220 42%, #101B29 68%, #0A1018 100%)",
        ...style,
      }}
      aria-hidden="true"
    >
      {/* Metallic sheen */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 32%, rgba(0,217,232,0.10) 62%, rgba(0,217,232,0) 100%)",
        }}
      />
      {/* Brushed texture */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(105deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 5px)",
        }}
      />
      {/* Cyan edge light */}
      <div
        className="absolute inset-x-0 bottom-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,217,232,0) 0%, rgba(0,217,232,0.85) 45%, rgba(0,217,232,0) 100%)",
        }}
      />

      <div className="relative flex h-full flex-col justify-between p-[6.5%]">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 40 40" className="h-[13%] w-auto min-h-[18px]" fill="none" aria-hidden="true">
              <g stroke="#00D9E8" strokeWidth="3.1" strokeLinejoin="round" strokeLinecap="round">
                <path d="M20 5.5c5 0 9 4 9 9 0 1.6-.4 3.1-1.2 4.4 2.9 1.3 4.9 4.2 4.9 7.6 0 4.6-3.7 8.3-8.3 8.3-1.7 0-3.3-.5-4.4-1.3-1.1.8-2.7 1.3-4.4 1.3-4.6 0-8.3-3.7-8.3-8.3 0-3.4 2-6.3 4.9-7.6-.8-1.3-1.2-2.8-1.2-4.4 0-5 4-9 9-9Z" />
              </g>
              <circle cx="20" cy="20" r="4.1" fill="#00D9E8" />
            </svg>
            <span className="font-display text-[clamp(11px,2.4vw,17px)] font-semibold tracking-[0.01em] text-white">
              Bitlance
            </span>
          </div>

          {/* Contactless */}
          <svg viewBox="0 0 24 24" className="h-[13%] min-h-[16px] w-auto" fill="none" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <path
                key={i}
                d={`M${6 + i * 4} ${12 - (i + 1) * 2.2} a${(i + 1) * 2.6} ${(i + 1) * 2.6} 0 0 1 0 ${(i + 1) * 4.4}`}
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ))}
          </svg>
        </div>

        {/* Chip */}
        <div
          className="h-[15%] w-[13%] min-h-[20px] min-w-[26px] rounded-[5px]"
          style={{
            background:
              "linear-gradient(140deg, #E8C87A 0%, #B6924B 45%, #E3C283 100%)",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)",
          }}
        >
          <svg viewBox="0 0 30 22" className="h-full w-full" fill="none" aria-hidden="true">
            <path
              d="M0 7h9a3 3 0 0 1 3 3v2a3 3 0 0 0 3 3h15M0 15h6M21 0v6M21 16v6"
              stroke="rgba(0,0,0,0.32)"
              strokeWidth="1.2"
            />
          </svg>
        </div>

        {/* Number + footer */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="tnum text-[clamp(11px,2.6vw,18px)] font-medium tracking-[0.16em] text-white/92">
              5312&nbsp;&nbsp;7841&nbsp;&nbsp;0092&nbsp;&nbsp;2048
            </p>
            <p className="mt-[6%] text-[clamp(6px,1.15vw,9px)] font-medium uppercase tracking-[0.22em] text-white/45">
              Alex Morgan
            </p>
          </div>
          <span className="font-display text-[clamp(11px,2.4vw,18px)] font-bold italic tracking-[-0.02em] text-white/90">
            VISA
          </span>
        </div>
      </div>
    </div>
  );
}

export default CryptoPaymentCard;
