import { useMemo, useState } from "react";
import { Reveal, SectionHeading } from "./Reveal";
import { TradingTerminalPreview } from "./TradingTerminalPreview";
import { TRADING_TOOLS } from "../lib/mockData";
import { cn } from "../lib/cn";

export function TradingToolsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="tools" className="relative overflow-hidden bg-page py-20 sm:py-24 lg:py-28">
      <div className="bl-container">
        <Reveal>
          <SectionHeading
            title="Discover Powerful Crypto Tools"
            description="Explore advanced tools built to help you trade smarter, faster, and with precision."
          />
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <Reveal>
            <ul className="flex flex-col">
              {TRADING_TOOLS.map((tool, index) => {
                const active = index === activeIndex;
                return (
                  <li key={tool.title} className="border-b border-line last:border-0">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-expanded={active}
                      className="group relative w-full py-5 pl-6 pr-2 text-left transition-colors duration-200"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute left-0 top-1/2 w-[3px] -translate-y-1/2 rounded-full bg-brand transition-all duration-300",
                          active ? "h-[70%] opacity-100" : "h-0 opacity-0",
                        )}
                      />
                      <span
                        className={cn(
                          "block text-[16px] font-bold tracking-[-0.01em] transition-colors duration-200 sm:text-[18px]",
                          active ? "text-ink" : "text-muted group-hover:text-ink",
                        )}
                      >
                        {tool.title}
                      </span>
                      <span
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                          active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="mt-2 block max-w-md text-[13.5px] leading-relaxed text-muted">
                            {tool.description}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <TradingTerminalPreview />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default TradingToolsSection;
