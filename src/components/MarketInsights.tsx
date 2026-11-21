import { useMemo, useState } from "react";
import { Search, Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { MarketTable } from "./MarketTable";
import { DEFAULT_FAVORITES, MARKET_ASSETS, MARKET_TABS } from "../lib/mockData";
import type { MarketTabId } from "../lib/types";
import { cn } from "../lib/cn";

/**
 * Exchange-style market overview.
 * Data is mock (src/lib/mockData.ts) and structured so the table can be
 * repointed at a live REST/WS feed without UI changes.
 */
export function MarketInsights() {
  const [activeTab, setActiveTab] = useState<MarketTabId>("crypto");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>(DEFAULT_FAVORITES);

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();

    let list = MARKET_ASSETS.filter((asset) => {
      switch (activeTab) {
        case "favorite":
          return favorites.includes(asset.id);
        case "movers":
          return true;
        default:
          return asset.categories.includes(activeTab);
      }
    });

    if (activeTab === "movers") {
      list = [...list].sort((a, b) => Math.abs(b.change24h) - Math.abs(a.change24h));
    }

    if (term) {
      list = list.filter(
        (asset) =>
          asset.symbol.toLowerCase().includes(term) ||
          asset.name.toLowerCase().includes(term) ||
          asset.pair.toLowerCase().includes(term),
      );
    }

    return list;
  }, [activeTab, favorites, query]);

  const toggleFavorite = (id: string) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <section id="markets" className="relative bg-page py-20 sm:py-24">
      <div className="bl-container">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-[28px] font-extrabold tracking-[-0.02em] text-ink sm:text-[34px]">
                Market Insights
              </h2>
              <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-muted">
                Track live-style prices, volume and momentum across spot, futures and
                tokenized traditional markets.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-[11.5px] font-medium text-muted">
              <span className="bl-live-dot h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              Mock data · live feed coming soon
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 rounded-2xl border border-line bg-card shadow-[var(--shadow-card)]">
            {/* Tabs + search */}
            <div className="flex flex-col gap-3 border-b border-line px-4 pt-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
              <div
                role="tablist"
                aria-label="Market categories"
                className="thin-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 pb-1"
              >
                {MARKET_TABS.map((tab) => {
                  const active = tab.id === activeTab;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveTab(tab.id as MarketTabId)}
                      className={cn(
                        "relative shrink-0 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-[13.5px] font-medium transition-colors duration-200",
                        active
                          ? "bg-brand/10 text-brand"
                          : "text-muted hover:bg-[var(--bl-btn-ghost)] hover:text-ink",
                      )}
                    >
                      {tab.label}
                      {active ? (
                        <span className="absolute inset-x-3 -bottom-[13px] h-[2px] rounded-full bg-brand" />
                      ) : null}
                    </button>
                  );
                })}
              </div>

              <div className="relative mb-2 w-full lg:mb-0 lg:w-64">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint"
                  aria-hidden="true"
                />
                <label htmlFor="market-search" className="sr-only">
                  Search markets
                </label>
                <input
                  id="market-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search"
                  className="h-10 w-full rounded-full border border-line bg-[var(--bl-card-2)] pl-10 pr-4 text-[13.5px] text-ink outline-none transition-colors duration-200 placeholder:text-faint focus:border-brand/60"
                />
              </div>
            </div>

            <MarketTable
              rows={rows}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              activeTab={activeTab}
              hasQuery={query.trim().length > 0}
            />
          </div>
        </Reveal>

        <p className="mt-4 flex items-center gap-2 px-1 text-[12px] text-faint">
          <Star className="h-3.5 w-3.5" aria-hidden="true" />
          Star a market to pin it to your Favorite tab. Figures shown are
          illustrative demo data.
        </p>
      </div>
    </section>
  );
}

export default MarketInsights;
