import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { buildCandles, buildOrderBook } from "../lib/random";
import { formatPercent, formatPrice } from "../lib/format";
import { cn } from "../lib/cn";

const TIMEFRAMES = ["1m", "5m", "15m", "1H", "4H", "1D"] as const;

/**
 * TradingTerminalPreview
 * ---------------------------------------------------------------------------
 * Product mockup of the Bitlance web terminal: candlestick chart with volume
 * and price scale, live-style order book and a buy / sell interface.
 * Intentionally rendered dark in both themes — it represents the product UI.
 */
export function TradingTerminalPreview() {
  const [timeframe, setTimeframe] = useState<(typeof TIMEFRAMES)[number]>("1H");
  const [side, setSide] = useState<"buy" | "sell">("buy");

  const { candles, book, lastPrice, change } = useMemo(() => {
    const data = buildCandles(`terminal-${timeframe}`, 56, 64200);
    const last = data[data.length - 1];
    const first = data[0];
    const changePct = ((last.close - first.open) / first.open) * 100;
    return {
      candles: data,
      book: buildOrderBook(`book-${timeframe}`, last.close, 7),
      lastPrice: last.close,
      change: changePct,
    };
  }, [timeframe]);

  const up = change >= 0;

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-6 opacity-80"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,217,232,0.16), rgba(0,217,232,0) 72%)",
        }}
        aria-hidden="true"
      />

      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.85)]"
        style={{ background: "linear-gradient(180deg, #0B1114 0%, #080D10 100%)" }}
      >
        {/* -------------------------------------------------- header */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/[0.07] px-4 py-3">
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 40 40" className="h-5 w-5" fill="none" aria-hidden="true">
              <g stroke="#00D9E8" strokeWidth="3.4" strokeLinejoin="round">
                <path d="M20 5.5c5 0 9 4 9 9 0 1.6-.4 3.1-1.2 4.4 2.9 1.3 4.9 4.2 4.9 7.6 0 4.6-3.7 8.3-8.3 8.3-1.7 0-3.3-.5-4.4-1.3-1.1.8-2.7 1.3-4.4 1.3-4.6 0-8.3-3.7-8.3-8.3 0-3.4 2-6.3 4.9-7.6-.8-1.3-1.2-2.8-1.2-4.4 0-5 4-9 9-9Z" />
              </g>
              <circle cx="20" cy="20" r="4.1" fill="#00D9E8" />
            </svg>
            <button
              type="button"
              className="flex items-center gap-1 text-[13px] font-semibold text-white"
            >
              BTC/USDT
              <ChevronDown className="h-3.5 w-3.5 text-white/45" aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="tnum text-[15px] font-semibold text-white">
              {formatPrice(lastPrice)}
            </span>
            <span className={cn("tnum text-[12px] font-semibold", up ? "text-[#00C087]" : "text-[#F0445A]")}>
              {formatPercent(change)}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-1 rounded-lg bg-white/[0.05] p-0.5">
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                aria-pressed={timeframe === tf}
                className={cn(
                  "rounded-md px-2 py-1 text-[11px] font-semibold transition-colors duration-150",
                  timeframe === tf
                    ? "bg-brand text-[#04171a]"
                    : "text-white/55 hover:bg-white/[0.06] hover:text-white",
                )}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* ------------------------------------------- chart + book */}
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_188px]">
          <div className="border-b border-white/[0.07] p-2 lg:border-b-0 lg:border-r">
            <CandlestickChart candles={candles} lastPrice={lastPrice} up={up} />
          </div>
          <OrderBook book={book} lastPrice={lastPrice} />
        </div>

        {/* ------------------------------------------- order ticket */}
        <div className="border-t border-white/[0.07] p-3.5">
          <div className="mb-3 flex gap-1 rounded-lg bg-white/[0.05] p-0.5 lg:hidden">
            {(["buy", "sell"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSide(option)}
                className={cn(
                  "flex-1 rounded-md py-1.5 text-[12px] font-semibold capitalize transition-colors",
                  side === option
                    ? option === "buy"
                      ? "bg-[#00C087] text-[#04171a]"
                      : "bg-[#F0445A] text-white"
                    : "text-white/55",
                )}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <OrderTicket
              side="buy"
              price={lastPrice * 0.999}
              forceActive={side === "buy"}
              className="hidden sm:flex"
            />
            <OrderTicket
              side="sell"
              price={lastPrice * 1.001}
              forceActive={side === "sell"}
              className="hidden sm:flex"
            />
            <OrderTicket
              side={side}
              price={side === "buy" ? lastPrice * 0.999 : lastPrice * 1.001}
              className="flex sm:hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- chart --- */

const VIEW_W = 720;
const VIEW_H = 332;
const PAD_LEFT = 6;
const PAD_RIGHT = 66;
const PRICE_TOP = 14;
const PRICE_BOTTOM = 246;
const VOL_TOP = 258;
const VOL_BOTTOM = 316;

function CandlestickChart({
  candles,
  lastPrice,
  up,
}: {
  candles: ReturnType<typeof buildCandles>;
  lastPrice: number;
  up: boolean;
}) {
  const { points, min, max, maxVolume } = useMemo(() => {
    const lows = candles.map((c) => c.low);
    const highs = candles.map((c) => c.high);
    const lo = Math.min(...lows);
    const hi = Math.max(...highs);
    const pad = (hi - lo) * 0.08;
    const maxVol = Math.max(...candles.map((c) => c.volume));

    const step = (VIEW_W - PAD_LEFT - PAD_RIGHT) / candles.length;
    return {
      points: candles.map((candle, index) => ({
        ...candle,
        x: PAD_LEFT + step * index + step / 2,
        width: Math.max(step * 0.62, 3),
      })),
      min: lo - pad,
      max: hi + pad,
      maxVolume: maxVol,
    };
  }, [candles]);

  const yFor = (price: number) =>
    PRICE_BOTTOM - ((price - min) / (max - min)) * (PRICE_BOTTOM - PRICE_TOP);

  const gridLines = Array.from({ length: 5 }, (_, i) => {
    const price = min + ((max - min) / 4) * i;
    return { price, y: yFor(price) };
  });

  const lastY = yFor(lastPrice);
  const accent = up ? "#00C087" : "#F0445A";

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="h-auto w-full"
      role="img"
      aria-label="BTC/USDT candlestick chart preview"
    >
      {/* grid */}
      {gridLines.map((line) => (
        <g key={line.y}>
          <line
            x1={PAD_LEFT}
            y1={line.y}
            x2={VIEW_W - PAD_RIGHT}
            y2={line.y}
            stroke="rgba(255,255,255,0.055)"
            strokeWidth="1"
          />
          <text
            x={VIEW_W - PAD_RIGHT + 8}
            y={line.y + 3.2}
            fill="#5F6E76"
            fontSize="9.5"
            fontFamily="Manrope, sans-serif"
          >
            {formatPrice(line.price)}
          </text>
        </g>
      ))}

      {/* volume */}
      {points.map((candle) => {
        const h = (candle.volume / maxVolume) * (VOL_BOTTOM - VOL_TOP);
        const bull = candle.close >= candle.open;
        return (
          <rect
            key={`v-${candle.x}`}
            x={candle.x - candle.width / 2}
            y={VOL_BOTTOM - h}
            width={candle.width}
            height={h}
            fill={bull ? "#00C087" : "#F0445A"}
            opacity="0.28"
          />
        );
      })}

      {/* candles */}
      {points.map((candle) => {
        const bull = candle.close >= candle.open;
        const color = bull ? "#00C087" : "#F0445A";
        const bodyTop = yFor(Math.max(candle.open, candle.close));
        const bodyBottom = yFor(Math.min(candle.open, candle.close));
        return (
          <g key={`c-${candle.x}`}>
            <line
              x1={candle.x}
              y1={yFor(candle.high)}
              x2={candle.x}
              y2={yFor(candle.low)}
              stroke={color}
              strokeWidth="1.1"
            />
            <rect
              x={candle.x - candle.width / 2}
              y={bodyTop}
              width={candle.width}
              height={Math.max(bodyBottom - bodyTop, 1.4)}
              fill={bull ? "rgba(0,192,135,0.9)" : "rgba(240,68,90,0.88)"}
              stroke={color}
              strokeWidth="0.6"
            />
          </g>
        );
      })}

      {/* last price marker */}
      <line
        x1={PAD_LEFT}
        y1={lastY}
        x2={VIEW_W - PAD_RIGHT}
        y2={lastY}
        stroke={accent}
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.8"
      />
      <rect
        x={VIEW_W - PAD_RIGHT + 3}
        y={lastY - 8}
        width={58}
        height={16}
        rx="3"
        fill={accent}
      />
      <text
        x={VIEW_W - PAD_RIGHT + 32}
        y={lastY + 3.6}
        fill="#04171A"
        fontSize="9.5"
        fontWeight="700"
        textAnchor="middle"
        fontFamily="Manrope, sans-serif"
      >
        {formatPrice(lastPrice)}
      </text>

      {/* time axis */}
      <line
        x1={PAD_LEFT}
        y1={VOL_BOTTOM + 4}
        x2={VIEW_W - PAD_RIGHT}
        y2={VOL_BOTTOM + 4}
        stroke="rgba(255,255,255,0.06)"
      />
      {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"].map((label, index) => (
        <text
          key={label}
          x={PAD_LEFT + 30 + index * ((VIEW_W - PAD_LEFT - PAD_RIGHT - 60) / 5)}
          y={VIEW_H - 4}
          fill="#5F6E76"
          fontSize="9"
          fontFamily="Manrope, sans-serif"
          textAnchor="middle"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

/* -------------------------------------------------------- order book --- */

function OrderBook({
  book,
  lastPrice,
}: {
  book: ReturnType<typeof buildOrderBook>;
  lastPrice: number;
}) {
  return (
    <div className="flex flex-col px-3 py-2.5">
      <div className="mb-1.5 flex items-center justify-between text-[9.5px] font-semibold uppercase tracking-[0.08em] text-white/35">
        <span>Price (USDT)</span>
        <span>Amount</span>
      </div>

      <div className="flex flex-col gap-[2px]">
        {book.asks.map((row) => (
          <BookRow key={`a-${row.price}`} row={row} side="ask" />
        ))}
      </div>

      <div className="my-1.5 flex items-center justify-between rounded-md bg-white/[0.05] px-2 py-1.5">
        <span className="tnum text-[12px] font-bold text-white">{formatPrice(lastPrice)}</span>
        <span className="text-[9px] font-semibold uppercase tracking-wide text-white/35">Spread</span>
      </div>

      <div className="flex flex-col gap-[2px]">
        {book.bids.map((row) => (
          <BookRow key={`b-${row.price}`} row={row} side="bid" />
        ))}
      </div>
    </div>
  );
}

function BookRow({
  row,
  side,
}: {
  row: { price: number; amount: number; depth: number };
  side: "ask" | "bid";
}) {
  const color = side === "ask" ? "#F0445A" : "#00C087";
  return (
    <div className="relative flex items-center justify-between overflow-hidden rounded px-2 py-[3px]">
      <div
        className="absolute inset-y-0 right-0"
        style={{ width: `${row.depth * 100}%`, backgroundColor: `${color}1f` }}
        aria-hidden="true"
      />
      <span className="tnum relative text-[10.5px] font-semibold" style={{ color }}>
        {formatPrice(row.price)}
      </span>
      <span className="tnum relative text-[10.5px] text-white/60">
        {row.amount.toFixed(3)}
      </span>
    </div>
  );
}

/* ------------------------------------------------------ order ticket --- */

function OrderTicket({
  side,
  price,
  forceActive,
  className,
}: {
  side: "buy" | "sell";
  price: number;
  forceActive?: boolean;
  className?: string;
}) {
  const isBuy = side === "buy";
  const active = forceActive ?? true;
  const accent = isBuy ? "#00C087" : "#F0445A";

  return (
    <div
      className={cn(
        "flex-col gap-2 rounded-xl border p-3 transition-colors duration-200",
        active ? "border-white/10 bg-white/[0.04]" : "border-white/[0.06] bg-transparent",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-[11px] font-bold uppercase tracking-[0.1em]"
          style={{ color: accent }}
        >
          {isBuy ? "Buy" : "Sell"} BTC
        </span>
        <span className="text-[9.5px] text-white/35">Available 12,480.00 USDT</span>
      </div>

      <label className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-[#070C0F] px-2.5 py-1.5">
        <span className="text-[9.5px] uppercase tracking-wide text-white/35">Price</span>
        <span className="tnum text-[11.5px] font-semibold text-white">
          {formatPrice(price)}
        </span>
      </label>

      <label className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-[#070C0F] px-2.5 py-1.5">
        <span className="text-[9.5px] uppercase tracking-wide text-white/35">Amount</span>
        <span className="tnum text-[11.5px] font-semibold text-white">0.1840 BTC</span>
      </label>

      <div className="relative h-1 rounded-full bg-white/[0.08]">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: "42%", backgroundColor: accent, opacity: 0.8 }}
        />
        <div
          className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0B1114]"
          style={{ left: "42%", backgroundColor: accent }}
        />
      </div>

      <button
        type="button"
        className="mt-0.5 rounded-lg py-2 text-[12px] font-bold text-[#04171a] transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
        style={{
          backgroundColor: isBuy ? "#00C087" : "#F0445A",
          color: isBuy ? "#04171a" : "#ffffff",
        }}
      >
        {isBuy ? "Buy BTC" : "Sell BTC"}
      </button>
    </div>
  );
}

export default TradingTerminalPreview;
