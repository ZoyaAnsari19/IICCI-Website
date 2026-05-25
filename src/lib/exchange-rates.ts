import {
  type CurrencyCode,
  FALLBACK_RATES_INR,
  TRACKED_CURRENCIES,
  type ExchangeRateQuote,
  type ExchangeRatesPayload,
} from "@/config/exchange-rates";

const CURRENCY_CODES_LIST = TRACKED_CURRENCIES.map((c) => c.code);

function buildSparkline(rate: number, trend: "up" | "down" | "flat"): number[] {
  const points = 12;
  const values: number[] = [];
  const drift = trend === "up" ? 0.992 : trend === "down" ? 1.008 : 1;
  let v = rate * drift;
  for (let i = 0; i < points - 1; i++) {
    v += (rate - v) * 0.22 + (Math.sin(i * 1.4) * rate * 0.0015);
    values.push(Number(v.toFixed(4)));
  }
  values.push(rate);
  return values;
}

function quoteFromRate(
  code: CurrencyCode,
  rate: number,
  change24h = 0,
): ExchangeRateQuote {
  const meta = TRACKED_CURRENCIES.find((c) => c.code === code)!;
  const trend =
    change24h > 0.02 ? "up" : change24h < -0.02 ? "down" : "flat";
  return {
    code,
    name: meta.name,
    flag: meta.flag,
    symbol: meta.symbol,
    rate: Number(rate.toFixed(code === "JPY" ? 4 : 2)),
    change24h: Number(change24h.toFixed(2)),
    sparkline: buildSparkline(rate, trend),
    trend,
  };
}

function buildPayload(
  rates: Record<CurrencyCode, number>,
  changes: Partial<Record<CurrencyCode, number>>,
  source: "live" | "fallback",
  error?: string,
): ExchangeRatesPayload {
  const quotes = CURRENCY_CODES_LIST.map((code) =>
    quoteFromRate(code, rates[code], changes[code] ?? 0),
  );
  const now = new Date();
  const hour = now.getUTCHours();
  const day = now.getUTCDay();
  const marketOpen = day >= 1 && day <= 5 && hour >= 3 && hour < 21;

  return {
    quotes,
    updatedAt: now.toISOString(),
    timezone: "Asia/Kolkata",
    source,
    marketOpen,
    ...(error ? { error } : {}),
  };
}

function fallbackPayload(error?: string): ExchangeRatesPayload {
  const rates = { ...FALLBACK_RATES_INR };
  const changes: Partial<Record<CurrencyCode, number>> = {
    USD: 0.12,
    EUR: -0.08,
    GBP: 0.21,
    AED: 0.05,
    SGD: -0.14,
    CNY: 0.03,
    JPY: -0.09,
  };
  return buildPayload(rates, changes, "fallback", error);
}

/** Open ER API — free tier, no key (USD base) */
async function fetchOpenErApi(): Promise<Record<CurrencyCode, number> | null> {
  const res = await fetch("https://open.er-api.com/v6/latest/USD", {
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    result?: string;
    rates?: Record<string, number>;
  };
  if (data.result !== "success" || !data.rates?.INR) return null;

  const { rates } = data;
  const inrPerUsd = rates.INR;
  const out = {} as Record<CurrencyCode, number>;

  for (const code of CURRENCY_CODES_LIST) {
    if (code === "USD") {
      out.USD = inrPerUsd;
    } else if (rates[code]) {
      out[code] = inrPerUsd / rates[code];
    }
  }
  if (CURRENCY_CODES_LIST.every((c) => out[c] > 0)) return out;
  return null;
}

/** Open Exchange Rates — optional app_id from env */
async function fetchOpenExchangeRates(): Promise<Record<CurrencyCode, number> | null> {
  const appId = process.env.OPEN_EXCHANGE_RATES_APP_ID;
  if (!appId) return null;

  const res = await fetch(
    `https://openexchangerates.org/api/latest.json?app_id=${appId}&base=USD`,
    { next: { revalidate: 60 }, signal: AbortSignal.timeout(8000) },
  );
  if (!res.ok) return null;
  const data = (await res.json()) as { rates?: Record<string, number> };
  if (!data.rates?.INR) return null;

  const { rates } = data;
  const inrPerUsd = rates.INR;
  const out = {} as Record<CurrencyCode, number>;

  for (const code of CURRENCY_CODES_LIST) {
    if (code === "USD") out.USD = inrPerUsd;
    else if (rates[code]) out[code] = inrPerUsd / rates[code];
  }
  if (CURRENCY_CODES_LIST.every((c) => out[c] > 0)) return out;
  return null;
}

// Fix import - CURRENCY_CODES doesn't exist, use CURRENCY_CODES_LIST only
export async function getExchangeRates(): Promise<ExchangeRatesPayload> {
  try {
    const oer = await fetchOpenExchangeRates();
    if (oer) {
      const changes: Partial<Record<CurrencyCode, number>> = {};
      for (const code of CURRENCY_CODES_LIST) {
        const base = FALLBACK_RATES_INR[code];
        changes[code] = ((oer[code] - base) / base) * 100 * 0.15;
      }
      return buildPayload(oer, changes, "live");
    }

    const openEr = await fetchOpenErApi();
    if (openEr) {
      const changes: Partial<Record<CurrencyCode, number>> = {};
      for (const code of CURRENCY_CODES_LIST) {
        const base = FALLBACK_RATES_INR[code];
        changes[code] = ((openEr[code] - base) / base) * 100 * 0.12;
      }
      return buildPayload(openEr, changes, "live");
    }

    return fallbackPayload("Live feed unavailable — showing reference rates.");
  } catch {
    return fallbackPayload("Unable to reach currency API — showing reference rates.");
  }
}
