import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { FAQ_ITEMS } from "../lib/mockData";
import { cn } from "../lib/cn";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-page py-20 sm:py-24 lg:py-28">
      <div className="bl-container">
        <Reveal>
          <SectionHeading
            title="Frequently Asked Questions"
            description="Everything you need to know about trading, funding and staying safe on Bitlance."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
            {FAQ_ITEMS.map((item, index) => {
              const open = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <div
                  key={item.question}
                  className={cn(
                    "overflow-hidden rounded-xl border bg-card transition-colors duration-300",
                    open ? "border-brand/35" : "border-line hover:border-line-strong",
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                    >
                      <span
                        className={cn(
                          "text-[15px] font-semibold transition-colors duration-200 sm:text-[16px]",
                          open ? "text-ink" : "text-ink/90",
                        )}
                      >
                        {item.question}
                      </span>
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                          open
                            ? "rotate-180 border-brand/40 bg-brand/10 text-brand"
                            : "border-line text-muted",
                        )}
                        aria-hidden="true"
                      >
                        <ChevronDown className="h-4 w-4" strokeWidth={2.2} />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-[14px] leading-relaxed text-muted sm:px-6 sm:pb-6">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default FAQSection;
