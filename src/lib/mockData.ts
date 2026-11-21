import type {
  CardBenefit,
  CoinIconId,
  EcosystemCard,
  FaqItem,
  FeatureCard,
  FooterColumn,
  MarketAsset,
  NavItem,
  TickerItem,
} from "./types";
import { formatPrice } from "./format";

/* ------------------------------------------------------------------ *
 * MOCK DATA NOTICE
 * Every number below is synthetic demo data used to lay out the
 * interface. `src/services/marketApi.ts` is the future integration
 * point: swap `MARKET_ASSETS` / `TICKER_ITEMS` for live WebSocket or
 * REST payloads without touching any component.
 * ------------------------------------------------------------------ */

export const MARKET_ASSETS: MarketAsset[] = [
  {
    id: "btc",
    symbol: "BTC",
    name: "Bitcoin",
    pair: "BTC/USDT",
    price: 66752.12,
    change24h: -2.64,
    volume24h: 1_880_000_000,
    categories: ["spot", "futures", "crypto"],
    icon: "btc",
    color: "#F7931A",
    seed: "btc-usdt",
  },
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    pair: "ETH/USDT",
    price: 2050.62,
    change24h: -2.64,
    volume24h: 1_880_000_000,
    categories: ["spot", "futures", "crypto"],
    icon: "eth",
    color: "#627EEA",
    seed: "eth-usdt",
  },
  {
    id: "xrp",
    symbol: "XRP",
    name: "Ripple",
    pair: "XRP/USDT",
    price: 2.0506,
    change24h: -2.23,
    volume24h: 1_880_000_000,
    categories: ["spot", "futures", "crypto"],
    icon: "xrp",
    color: "#23292F",
    seed: "xrp-usdt",
  },
  {
    id: "ltc",
    symbol: "LTC",
    name: "Litecoin",
    pair: "LTC/USDT",
    price: 92.41,
    change24h: 1.86,
    volume24h: 742_500_000,
    categories: ["spot", "crypto"],
    icon: "ltc",
    color: "#A6A9AA",
    seed: "ltc-usdt",
  },
  {
    id: "bch",
    symbol: "BCH",
    name: "Bitcoin Cash",
    pair: "BCH/USDT",
    price: 452.18,
    change24h: -1.42,
    volume24h: 386_200_000,
    categories: ["spot", "crypto"],
    icon: "bch",
    color: "#0AC18E",
    seed: "bch-usdt",
  },
  {
    id: "ada",
    symbol: "ADA",
    name: "Cardano",
    pair: "ADA/USDT",
    price: 0.6218,
    change24h: 3.14,
    volume24h: 512_800_000,
    categories: ["spot", "crypto"],
    icon: "ada",
    color: "#0033AD",
    seed: "ada-usdt",
  },
  {
    id: "sol",
    symbol: "SOL",
    name: "Solana",
    pair: "SOL/USDT",
    price: 143.77,
    change24h: 5.28,
    volume24h: 2_140_000_000,
    categories: ["spot", "futures", "crypto"],
    icon: "sol",
    color: "#9945FF",
    seed: "sol-usdt",
  },
  {
    id: "dot",
    symbol: "DOT",
    name: "Polkadot",
    pair: "DOT/USDT",
    price: 4.812,
    change24h: -0.87,
    volume24h: 214_600_000,
    categories: ["spot", "crypto"],
    icon: "dot",
    color: "#E6007A",
    seed: "dot-usdt",
  },
  {
    id: "link",
    symbol: "LINK",
    name: "Chainlink",
    pair: "LINK/USDT",
    price: 14.92,
    change24h: 2.05,
    volume24h: 468_300_000,
    categories: ["spot", "crypto"],
    icon: "link",
    color: "#2A5ADA",
    seed: "link-usdt",
  },
  {
    id: "doge",
    symbol: "DOGE",
    name: "Dogecoin",
    pair: "DOGE/USDT",
    price: 0.1382,
    change24h: 4.61,
    volume24h: 986_400_000,
    categories: ["spot", "futures", "crypto"],
    icon: "doge",
    color: "#C2A633",
    seed: "doge-usdt",
  },
  {
    id: "matic",
    symbol: "MATIC",
    name: "Polygon",
    pair: "MATIC/USDT",
    price: 0.4218,
    change24h: -3.12,
    volume24h: 178_900_000,
    categories: ["spot", "crypto"],
    icon: "matic",
    color: "#8247E5",
    seed: "matic-usdt",
  },
  {
    id: "avax",
    symbol: "AVAX",
    name: "Avalanche",
    pair: "AVAX/USDT",
    price: 24.86,
    change24h: 1.24,
    volume24h: 302_100_000,
    categories: ["spot", "futures", "crypto"],
    icon: "avax",
    color: "#E84142",
    seed: "avax-usdt",
  },
  {
    id: "tia",
    symbol: "TIA",
    name: "Celestia",
    pair: "TIA/USDT",
    price: 5.114,
    change24h: 8.42,
    volume24h: 96_400_000,
    categories: ["spot", "crypto", "new"],
    icon: "tia",
    color: "#7B2BF9",
    seed: "tia-usdt",
  },
  {
    id: "sei",
    symbol: "SEI",
    name: "Sei",
    pair: "SEI/USDT",
    price: 0.3284,
    change24h: 6.18,
    volume24h: 74_200_000,
    categories: ["spot", "crypto", "new"],
    icon: "sei",
    color: "#9E1F19",
    seed: "sei-usdt",
  },
  {
    id: "jup",
    symbol: "JUP",
    name: "Jupiter",
    pair: "JUP/USDT",
    price: 0.8412,
    change24h: -5.36,
    volume24h: 58_700_000,
    categories: ["spot", "crypto", "new", "premarket"],
    icon: "jup",
    color: "#C7F284",
    seed: "jup-usdt",
  },
  {
    id: "pipe",
    symbol: "PIPE",
    name: "Pipe Network",
    pair: "PIPE/USDT",
    price: 0.1264,
    change24h: 12.84,
    volume24h: 12_900_000,
    categories: ["premarket"],
    icon: "pipe",
    color: "#3B82F6",
    seed: "pipe-usdt",
  },
  {
    id: "tslax",
    symbol: "TSLAx",
    name: "Tokenized Tesla",
    pair: "TSLAx/USD",
    price: 412.36,
    change24h: 1.92,
    volume24h: 88_400_000,
    categories: ["tradfi"],
    icon: "tsla",
    color: "#E31937",
    seed: "tslax",
  },
  {
    id: "aaplx",
    symbol: "AAPLx",
    name: "Tokenized Apple",
    pair: "AAPLx/USD",
    price: 268.94,
    change24h: -0.64,
    volume24h: 64_800_000,
    categories: ["tradfi"],
    icon: "aapl",
    color: "#6E6E73",
    seed: "aaplx",
  },
  {
    id: "spx",
    symbol: "SPX500",
    name: "S&P 500 Index",
    pair: "SPX500/USD",
    price: 6024.8,
    change24h: 0.38,
    volume24h: 142_600_000,
    categories: ["tradfi", "futures"],
    icon: "spx",
    color: "#00BFCF",
    seed: "spx500",
  },
];

/** Assets pre-starred so the "Favorite" tab is never empty on first load. */
export const DEFAULT_FAVORITES = ["btc", "eth", "sol"];

export const TICKER_ITEMS: TickerItem[] = [
  { pair: "BTC/USDT", price: 66752.12, change24h: -2.64, color: "#F7931A", seed: "tk-btc" },
  { pair: "ETH/USDT", price: 2050.62, change24h: -2.64, color: "#627EEA", seed: "tk-eth" },
  { pair: "BTC/USDC", price: 66789.4, change24h: -2.41, color: "#2775CA", seed: "tk-btc-usdc" },
  { pair: "SOL/USDT", price: 143.77, change24h: 5.28, color: "#9945FF", seed: "tk-sol" },
  { pair: "XRP/USDT", price: 2.0506, change24h: -2.23, color: "#23292F", seed: "tk-xrp" },
  { pair: "ADA/USDT", price: 0.6218, change24h: 3.14, color: "#0033AD", seed: "tk-ada" },
  { pair: "DOGE/USDT", price: 0.1382, change24h: 4.61, color: "#C2A633", seed: "tk-doge" },
  { pair: "LINK/USDT", price: 14.92, change24h: 2.05, color: "#2A5ADA", seed: "tk-link" },
  { pair: "AVAX/USDT", price: 24.86, change24h: 1.24, color: "#E84142", seed: "tk-avax" },
  { pair: "DOT/USDT", price: 4.812, change24h: -0.87, color: "#E6007A", seed: "tk-dot" },
];

export const MARKET_TABS: { id: string; label: string }[] = [
  { id: "favorite", label: "Favorite" },
  { id: "spot", label: "Spot" },
  { id: "futures", label: "Futures" },
  { id: "tradfi", label: "TradFi" },
  { id: "crypto", label: "Crypto" },
  { id: "new", label: "New Listing" },
  { id: "premarket", label: "Pre-Market" },
  { id: "movers", label: "Top Movers" },
];

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Buy Crypto",
    href: "#buy-crypto",
    children: [
      { label: "Buy with Card", description: "Visa, Mastercard, Apple Pay", href: "#buy-crypto" },
      { label: "P2P Trading", description: "0-fee peer-to-peer marketplace", href: "#buy-crypto" },
      { label: "Bank Transfer", description: "SEPA, SWIFT and local rails", href: "#buy-crypto" },
    ],
  },
  { label: "Markets", href: "#markets" },
  { label: "Trade", href: "#tools" },
  {
    label: "Products",
    href: "#ecosystem",
    children: [
      { label: "Spot Trading", description: "1000+ pairs, deep liquidity", href: "#ecosystem" },
      { label: "Futures", description: "Up to 125x on perpetuals", href: "#ecosystem" },
      { label: "Copy Trading", description: "Follow top strategists", href: "#ecosystem" },
      { label: "Bitlance Card", description: "Spend crypto anywhere", href: "#card" },
    ],
  },
  { label: "Support", href: "#faq" },
];

export const FEATURE_CARDS: FeatureCard[] = [
  {
    title: "Instant Trading",
    description:
      "Execute trades in milliseconds for faster, more accurate trades with deep order-book liquidity.",
    cta: { label: "Learn More", variant: "primary" },
    illustration: "chart",
  },
  {
    title: "Bank-Level Security",
    description:
      "Rest assured, your assets are safeguarded with multi-layer encryption and cold storage.",
    cta: { label: "Coming Soon", variant: "ghost" },
    illustration: "security",
  },
  {
    title: "Low Fees",
    description:
      "Maximise your trading with low fees, maximising your returns with minimal costs.",
    cta: { label: "Learn More", variant: "primary" },
    illustration: "fees",
  },
  {
    title: "Global Access",
    description:
      "Available on desktop, mobile, anywhere, anytime, with local payment support.",
    cta: { label: "Coming Soon", variant: "ghost" },
    illustration: "globe",
  },
];

export const ECOSYSTEM_CARDS: EcosystemCard[] = [
  {
    title: "Spot Trading",
    description: "Instant cryptocurrency trading with real-time prices and liquidity.",
    icon: "spot",
  },
  {
    title: "Futures Trading",
    description: "Trade with leverage and advanced tools to maximise opportunities.",
    icon: "futures",
  },
  {
    title: "Copy Trading",
    description: "Copy top traders automatically and grow your portfolio easily.",
    icon: "copy",
  },
  {
    title: "Earn",
    description: "Generate passive income by securely staking and saving crypto.",
    icon: "earn",
  },
  {
    title: "Market Insights",
    description: "Stay ahead with real-time analytics, trends, and insights.",
    icon: "insights",
  },
  {
    title: "Crypto Card",
    description: "Spend crypto anywhere and earn everyday rewards.",
    icon: "card",
  },
];

export const CARD_BENEFITS: CardBenefit[] = [
  {
    title: "Secure & Instant",
    description: "Secure crypto payments with complete protection for a secure trading experience.",
    icon: "shield",
  },
  {
    title: "Earn Cashback",
    description: "Earn up to 5% cashback on every purchase with the Bitlance Card.",
    icon: "cashback",
  },
  {
    title: "Free Withdrawals",
    description: "Withdraw crypto globally with ease and zero hassle, anytime, anywhere.",
    icon: "withdraw",
  },
];

export const TRADING_TOOLS: { title: string; description: string }[] = [
  {
    title: "Discover Powerful Crypto Tools",
    description:
      "Explore a seamless platform with advanced tools, real-time insights, and instant execution.",
  },
  {
    title: "Trade smarter with real-time data",
    description:
      "Live order books, depth charts and streaming quotes keep every decision informed.",
  },
  {
    title: "Fast execution with advanced tools",
    description:
      "Sub-second order matching with limit, stop and conditional order types built in.",
  },
  {
    title: "Reliable system for every trade",
    description:
      "99.99% uptime on a globally distributed matching engine that scales with volatility.",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is Bitlance?",
    answer:
      "Bitlance is a digital asset exchange and cryptocurrency platform that allows users to trade digital assets with confidence, offering advanced security, institutional-grade infrastructure and competitive transactions.",
  },
  {
    question: "How do I start trading?",
    answer:
      "Create a free account with your email or phone number, complete a quick identity verification, then deposit crypto or fiat. Once your balance is available you can place your first spot or futures order in seconds.",
  },
  {
    question: "What services does Bitlance offer?",
    answer:
      "Bitlance offers spot trading, perpetual futures, copy trading, staking and Earn products, market insights, a crypto debit card, plus OTC and API access for institutional clients.",
  },
  {
    question: "How can I deposit and withdraw funds safely on Bitlance?",
    answer:
      "Deposits and withdrawals are protected with address whitelisting, withdrawal passwords and two-factor authentication. Fiat rails support bank transfer, cards and local payment methods, while crypto withdrawals can be routed through your preferred network.",
  },
  {
    question: "Is Bitlance safe?",
    answer:
      "Yes. Bitlance keeps the majority of client assets in geographically distributed cold storage, runs continuous proof-of-reserve audits and maintains an insurance fund that covers extreme market events.",
  },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  { title: "Company", links: ["About Us", "Careers", "Security", "News", "Press", "Blog"] },
  { title: "Products", links: ["Spot", "Futures", "Staking", "Earn", "Card", "Loans"] },
  { title: "Support", links: ["Help Center", "Security", "Contact Us", "Fees"] },
  {
    title: "Legal",
    links: ["Terms of Service", "Privacy Policy", "Risk Disclosure", "Regulatory Information"],
  },
];

export const COIN_MONOGRAM_FALLBACK: Record<string, string> = {};

/** Icons that have a hand-drawn glyph; everything else falls back to a monogram. */
export const GLYPH_COINS: CoinIconId[] = [
  "btc",
  "eth",
  "xrp",
  "ltc",
  "bch",
  "ada",
  "sol",
  "dot",
  "link",
  "doge",
  "matic",
  "avax",
];

export function assetPriceLabel(asset: MarketAsset): string {
  return `$${formatPrice(asset.price)}`;
}
