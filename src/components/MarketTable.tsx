import { ArrowDownRight, ArrowUpRight, SearchX, Star } from "lucide-react";
import { CoinIcon } from "./CoinIcon";
import { formatCompactUsd, formatPercent, formatPrice } from "../lib/format";
import type { MarketAsset, MarketTabId } from "../lib/types";
import { cn } from "../lib/cn";

interface MarketTableProps {
  rows: MarketAsset[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  activeTab: MarketTabId;
  hasQuery: boolean;
}

const COLUMNS = ["Name", "Last Price", "24h Change", "24h Volume", "Action"] as const;

export function MarketTable({
  rows,
  favorites,
  onToggleFavorite,
  activeTab,
  hasQuery,
}: MarketTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-[var(--bl-card-2)] text-faint">
          <SearchX className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="text-[15px] font-semibold text-ink">
          {hasQuery ? "No markets match your search" : "Nothing listed here yet"}
        </p>
        <p className="max-w-sm text-[13px] leading-relaxed text-muted">
          {hasQuery
            ? "Try a different symbol, name or pair."
            : "New markets are added regularly — check back soon."}
        </p>
      </div>
    );
  }

  return (
    <div className="thin-scrollbar overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <caption className="sr-only">
          Market list — price, 24 hour change and 24 hour volume
        </caption>
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th
                key={column}
                scope="col"
                className={cn(
                  "whitespace-nowrap border-b border-line px-4 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-faint sm:px-6",
                  column === "Action" && "text-right",
                  column === "Last Price" && "text-right",
                  column === "24h Change" && "text-right",
                  column === "24h Volume" && "text-right",
                )}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((asset) => {
            const up = asset.change24h >= 0;
            const isFavorite = favorites.includes(asset.id);

            return (
              <tr
                key={asset.id}
                className="group border-b border-line/70 transition-colors duration-150 last:border-0 hover:bg-[var(--bl-card-2)]"
              >
                {/* Name */}
                <td className="whitespace-nowrap px-4 py-3 sm:px-6">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onToggleFavorite(asset.id)}
                      aria-pressed={isFavorite}
                      aria-label={
                        isFavorite
                          ? `Remove ${asset.symbol} from favourites`
                          : `Add ${asset.symbol} to favourites`
                      }
                      className={cn(
                        "shrink-0 transition-all duration-150 hover:scale-110",
                        isFavorite ? "text-[#F4A548]" : "text-faint/50 hover:text-[#F4A548]",
                      )}
                    >
                      <Star
                        className="h-4 w-4"
                        strokeWidth={2}
                        fill={isFavorite ? "currentColor" : "none"}
                        aria-hidden="true"
                      />
                    </button>
                    <CoinIcon
                      id={asset.icon}
                      color={asset.color}
                      symbol={asset.symbol}
                    />
                    <div className="leading-tight">
                      <p className="text-[14px] font-semibold text-ink">{asset.symbol}</p>
                      <p className="text-[12px] text-muted">{asset.name}</p>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="tnum whitespace-nowrap px-4 py-3 text-right text-[14px] font-semibold text-ink sm:px-6">
                  ${formatPrice(asset.price)}
                </td>

                {/* Change */}
                <td className="tnum whitespace-nowrap px-4 py-3 text-right sm:px-6">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[13.5px] font-semibold",
                      up
                        ? "bg-up/10 text-up"
                        : "bg-down/10 text-down",
                    )}
                  >
                    {up ? (
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
                    )}
                    {formatPercent(asset.change24h)}
                  </span>
                </td>

                {/* Volume */}
                <td className="tnum whitespace-nowrap px-4 py-3 text-right text-[14px] text-muted sm:px-6">
                  {formatCompactUsd(asset.volume24h)}
                </td>

                {/* Action */}
                <td className="whitespace-nowrap px-4 py-3 text-right sm:px-6">
                  <button
                    type="button"
                    className={cn(
                      "rounded-lg border border-brand/55 px-4 py-1.5 text-[13px] font-semibold text-brand transition-all duration-200",
                      "hover:bg-brand hover:text-[#04171a] hover:shadow-[0_8px_22px_-10px_rgba(0,217,232,0.9)] active:scale-[0.97]",
                    )}
                  >
                    Trade
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="sr-only">
        Showing {rows.length} markets in the {activeTab} tab. All values are mock
        data for demonstration purposes.
      </p>
    </div>
  );
}

export default MarketTable;
