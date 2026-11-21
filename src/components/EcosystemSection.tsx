import {
  BarChart3,
  CandlestickChart,
  CreditCard,
  LineChart,
  PiggyBank,
  Users,
} from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { ECOSYSTEM_CARDS } from "../lib/mockData";
import type { EcosystemCard } from "../lib/types";

const ICONS: Record<EcosystemCard["icon"], typeof LineChart> = {
  spot: LineChart,
  futures: CandlestickChart,
  copy: Users,
  earn: PiggyBank,
  insights: BarChart3,
  card: CreditCard,
};

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="relative bg-panel py-20 sm:py-24">
      <div className="bl-container">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Intro block occupies the first two columns on desktop */}
          <Reveal className="sm:col-span-2 lg:col-span-2">
            <div className="flex h-full flex-col justify-center pr-0 lg:pr-10">
              <h2 className="max-w-[16ch] text-[28px] font-extrabold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[36px]">
                All-in-One Crypto Ecosystem
              </h2>
              <p className="mt-4 max-w-md text-[14px] leading-relaxed text-muted sm:text-[15px]">
                Everything you need to trade, invest, and grow your crypto portfolio —
                built in one powerful platform.
              </p>
              <div className="mt-7">
                <a
                  href="#tools"
                  className="group inline-flex items-center gap-1.5 rounded-full bg-brand px-6 py-3 text-[14px] font-semibold text-[#04171a] transition-all duration-200 hover:bg-[#33e6f2] hover:shadow-[0_12px_30px_-12px_rgba(0,217,232,0.95)] active:scale-[0.98]"
                >
                  Learn More
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    strokeWidth={2.4}
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </Reveal>

          {ECOSYSTEM_CARDS.map((card, index) => {
            const Icon = ICONS[card.icon];
            return (
              <Reveal key={card.title} delay={0.05 + index * 0.06}>
                <article className="group h-full rounded-2xl border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_50px_-28px_rgba(0,217,232,0.45)]">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-[#04171a]"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 text-[16.5px] font-bold tracking-[-0.01em] text-ink">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                    {card.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default EcosystemSection;
