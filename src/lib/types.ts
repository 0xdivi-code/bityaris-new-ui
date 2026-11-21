/**
 * Shared domain types for Bitlance.
 */

export type Theme = "dark" | "light";

export type MarketCategoryId =
  | "spot"
  | "futures"
  | "tradfi"
  | "crypto"
  | "new"
  | "premarket";

export type MarketTabId =
  | "favorite"
  | MarketCategoryId
  | "movers";

export type CoinIconId =
  | "btc"
  | "eth"
  | "xrp"
  | "ltc"
  | "bch"
  | "ada"
  | "sol"
  | "dot"
  | "link"
  | "doge"
  | "matic"
  | "avax"
  | "tia"
  | "sei"
  | "jup"
  | "pipe"
  | "tsla"
  | "aapl"
  | "spx";

export interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  /** Trading pair as displayed in the ticker, e.g. "BTC/USDT" */
  pair: string;
  /** Last traded price in USDT */
  price: number;
  /** 24h price change in percent */
  change24h: number;
  /** 24h quote volume in USD */
  volume24h: number;
  categories: MarketCategoryId[];
  icon: CoinIconId;
  /** Brand colour used for monogram fallbacks and accents */
  color: string;
  /** Deterministic seed used to synthesise the ticker sparkline */
  seed: string;
}

export interface TickerItem {
  pair: string;
  price: number;
  change24h: number;
  color: string;
  seed: string;
}

export interface NavChildItem {
  label: string;
  description?: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChildItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FeatureCard {
  title: string;
  description: string;
  cta: { label: string; variant: "primary" | "ghost" };
  illustration: "chart" | "security" | "fees" | "globe";
}

export interface EcosystemCard {
  title: string;
  description: string;
  icon: "spot" | "futures" | "copy" | "earn" | "insights" | "card";
}

export interface CardBenefit {
  title: string;
  description: string;
  icon: "shield" | "cashback" | "withdraw";
}

export interface FooterColumn {
  title: string;
  links: string[];
}
