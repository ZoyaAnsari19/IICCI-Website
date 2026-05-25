export type CurrencyCode = "USD" | "EUR" | "GBP" | "AED" | "SGD" | "CNY" | "JPY";

export type CurrencyMeta = {
  code: CurrencyCode;
  name: string;
  flag: string;
  symbol: string;
};

export const TRACKED_CURRENCIES: ReadonlyArray<CurrencyMeta> = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸", symbol: "$" },
  { code: "EUR", name: "Euro", flag: "🇪🇺", symbol: "€" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", symbol: "£" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪", symbol: "د.إ" },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬", symbol: "S$" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳", symbol: "¥" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", symbol: "¥" },
] as const;

export type ExchangeRateQuote = {
  code: CurrencyCode;
  name: string;
  flag: string;
  symbol: string;
  rate: number;
  change24h: number;
  sparkline: number[];
  trend: "up" | "down" | "flat";
};

export type ExchangeRatesPayload = {
  quotes: ExchangeRateQuote[];
  updatedAt: string;
  timezone: string;
  source: "live" | "fallback";
  marketOpen: boolean;
  error?: string;
};

/** Approximate reference rates (1 unit → INR) for API fallback */
export const FALLBACK_RATES_INR: Record<CurrencyCode, number> = {
  USD: 83.42,
  EUR: 90.18,
  GBP: 105.64,
  AED: 22.71,
  SGD: 62.08,
  CNY: 11.52,
  JPY: 0.556,
};

export const REFRESH_INTERVAL_MS = 60_000;
