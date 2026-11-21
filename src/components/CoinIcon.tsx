import type { CoinIconId } from "../lib/types";

interface CoinIconProps {
  id: CoinIconId;
  color: string;
  symbol: string;
  className?: string;
}

/**
 * Vector asset icons. Majors get hand-drawn glyphs, long-tail assets
 * fall back to a monogram disc in the asset's brand colour.
 */
export function CoinIcon({ id, color, symbol, className }: CoinIconProps) {
  return (
    <span
      className={
        "relative inline-flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full text-[10px] font-bold " +
        (className ?? "")
      }
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {renderGlyph(id, symbol)}
    </span>
  );
}

function renderGlyph(id: CoinIconId, symbol: string) {
  switch (id) {
    case "btc":
      return <Glyph fg="#fff"><path d="M8.6 4.4h2.1V2.9h1.4v1.5h1.1c1.7 0 2.8.8 2.8 2.3 0 .9-.4 1.5-1.1 1.9.9.3 1.5 1 1.5 2.1 0 1.7-1.2 2.6-3.1 2.6h-1.2v1.5h-1.4v-1.5H8.6V4.4Zm2.1 3.4h1.5c.8 0 1.2-.4 1.2-1s-.4-.9-1.2-.9h-1.5v1.9Zm0 3.4h1.7c.9 0 1.3-.4 1.3-1.1 0-.6-.5-1-1.3-1h-1.7v2.1Z" /></Glyph>;
    case "eth":
      return <Glyph fg="#fff"><path d="M10 2.4 5.2 10.2 10 13l4.8-2.8L10 2.4Zm0 12.1-4.8-2.9L10 18l4.8-6.4-4.8 2.9Z" /></Glyph>;
    case "xrp":
      return <Glyph fg="#fff"><path d="M4.6 3.4h2.3l3.1 3.4 3.1-3.4h2.3L11.5 8l3.9 4.3 1.9 2.3h-2.3L11.6 10l-3.4 4.6H5.9l4-5.4-5.3-5.8Z" /></Glyph>;
    case "ltc":
      return <Glyph fg="#fff"><path d="M9.2 4h2l-1.4 5.2h2.7l-.5 1.8H9.3l-.9 3.3H13l-.5 1.7H5.6l1.1-4.1-1.2.4.4-1.6 1.3-.4L9.2 4Z" /></Glyph>;
    case "bch":
      return <Glyph fg="#fff"><path d="M8.9 4.1h1.9l.4-1.4 1.2.3-.4 1.3h.8c1.6 0 2.6.7 2.6 2 0 .9-.5 1.5-1.2 1.8.9.3 1.4 1 1.4 2 0 1.6-1.1 2.5-2.9 2.5h-.9l-.4 1.4-1.2-.3.4-1.3H8.2l1-3.9-1 .3.3-1.3 1-.3.7-2.7-.3-.1Z" /></Glyph>;
    case "ada":
      return <Glyph fg="#fff"><circle cx="10" cy="5.4" r="1.1" /><circle cx="10" cy="14.6" r="1.1" /><circle cx="5.4" cy="8" r="1" /><circle cx="14.6" cy="8" r="1" /><circle cx="5.4" cy="12" r="1" /><circle cx="14.6" cy="12" r="1" /><circle cx="10" cy="10" r="2" /></Glyph>;
    case "sol":
      return <Glyph fg="#fff"><path d="M6.4 12.2h9.2l-2.3 2.4H4.1l2.3-2.4Zm2.3-4.4h9.2l-2.3 2.4H6.4l2.3-2.4Zm-2.3-4.3h9.2l-2.3 2.4H4.1l2.3-2.4Z" /></Glyph>;
    case "dot":
      return <Glyph fg="#fff"><circle cx="10" cy="4.6" r="1.9" /><circle cx="5.2" cy="12.6" r="1.9" /><circle cx="14.8" cy="12.6" r="1.9" /><circle cx="10" cy="15.4" r="1.5" /><circle cx="5.2" cy="7.4" r="1.5" /><circle cx="14.8" cy="7.4" r="1.5" /></Glyph>;
    case "link":
      return <Glyph fg="#fff"><path d="M10 2.6l5.6 3v5.4L10 17.4l-5.6-6.4V5.6l5.6-3Zm0 2.5-3.4 1.8v3.3L10 14l3.4-3.8V6.9L10 5.1Z" /></Glyph>;
    case "doge":
      return <Glyph fg="#fff"><path d="M7.2 4.6h4c3.2 0 5 2.2 5 5.4s-1.9 5.4-5.1 5.4H7.2V4.6Zm2.2 1.9v7h1.6c1.9 0 2.9-1.3 2.9-3.5s-1-3.5-2.9-3.5H9.4Z" /></Glyph>;
    case "matic":
      return <Glyph fg="#fff"><path d="M10 3.2 15.8 6.5v7L10 16.8 4.2 13.5v-7L10 3.2Zm0 2.3-3.7 2.1v4.8L10 14.5l3.7-2.1V7.6L10 5.5Z" /></Glyph>;
    case "avax":
      return <Glyph fg="#fff"><path d="M10 3.4l6.6 13.2h-3l-1.2-2.5H7.6l-1.2 2.5h-3L10 3.4Zm0 5.2-1.5 3.1h3L10 8.6Z" /></Glyph>;
    default:
      return <span className="font-display tracking-tight text-white/95">{symbol.slice(0, 2)}</span>;
  }
}

function Glyph({ children, fg }: { children: React.ReactNode; fg: string }) {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill={fg}>
      {children}
    </svg>
  );
}
