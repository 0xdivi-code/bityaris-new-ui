/**
 * Deterministic pseudo-random helpers.
 *
 * Mock market data must look organic but stay stable between renders,
 * so every series is derived from a string seed.
 */

export function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}

export function seededRandom(seed: string): () => number {
  return mulberry32(hashSeed(seed));
}

/**
 * Builds a normalised sparkline series whose overall direction matches
 * the supplied percentage change.
 */
export function buildSparkline(
  seed: string,
  change24h: number,
  points = 26,
): number[] {
  const rand = seededRandom(seed);
  const values: number[] = [];
  let value = 100;
  for (let i = 0; i < points; i += 1) {
    value += (rand() - 0.5) * 4.2;
    values.push(value);
  }

  const target = 100 + change24h * 1.6;
  const first = values[0];
  const last = values[values.length - 1] || first;
  return values.map((v, i) => {
    const t = i / (points - 1);
    const noise = v - ((last - first) * t + first);
    return noise + ((target - first) * t + first);
  });
}

export interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/** Builds a realistic OHLC series for the terminal preview. */
export function buildCandles(seed: string, count = 56, startPrice = 64200): Candle[] {
  const rand = seededRandom(seed);
  const candles: Candle[] = [];
  let price = startPrice;
  let momentum = 0;

  for (let i = 0; i < count; i += 1) {
    momentum = momentum * 0.72 + (rand() - 0.48) * 0.011;
    const open = price;
    const drift = open * momentum;
    const close = Math.max(open * 0.9, open + drift);
    const wick = open * (0.0025 + rand() * 0.006);
    const high = Math.max(open, close) + wick * rand();
    const low = Math.min(open, close) - wick * rand();
    const volume = 0.55 + rand() * 0.9 + Math.abs(momentum) * 14;
    candles.push({ open, high, low, close, volume });
    price = close;
  }
  return candles;
}

export interface OrderBookRow {
  price: number;
  amount: number;
  total: number;
  /** 0 – 1, relative depth used for the background bar */
  depth: number;
}

export function buildOrderBook(
  seed: string,
  midPrice: number,
  rows = 7,
): { asks: OrderBookRow[]; bids: OrderBookRow[] } {
  const rand = seededRandom(seed);
  const tick = midPrice * 0.00035;

  const build = (direction: 1 | -1): OrderBookRow[] => {
    const out: OrderBookRow[] = [];
    let cumulative = 0;
    for (let i = 0; i < rows; i += 1) {
      const amount = 0.08 + rand() * 1.4;
      cumulative += amount;
      out.push({
        price: midPrice + direction * tick * (i + 1),
        amount,
        total: cumulative,
        depth: 0,
      });
    }
    const max = out[out.length - 1].total;
    return out.map((row) => ({ ...row, depth: row.total / max }));
  };

  return { asks: build(1).reverse(), bids: build(-1) };
}
