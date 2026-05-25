"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  REFRESH_INTERVAL_MS,
  type ExchangeRateQuote,
  type ExchangeRatesPayload,
} from "@/config/exchange-rates";

type ExchangeRatesContextValue = {
  data: ExchangeRatesPayload | null;
  loading: boolean;
  refreshing: boolean;
  reload: () => void;
};

const ExchangeRatesContext = createContext<ExchangeRatesContextValue | null>(null);

export function ExchangeRatesProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ExchangeRatesPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const prevRates = useRef<Record<string, number>>({});

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const res = await fetch("/api/exchange-rates", { cache: "no-store" });
      if (!res.ok) throw new Error("fetch failed");
      const json = (await res.json()) as ExchangeRatesPayload;
      const enriched: ExchangeRatesPayload = {
        ...json,
        quotes: json.quotes.map((q) => {
          const prev = prevRates.current[q.code];
          let change24h = q.change24h;
          if (prev !== undefined && prev > 0) {
            change24h = ((q.rate - prev) / prev) * 100;
          }
          prevRates.current[q.code] = q.rate;
          const trend: ExchangeRateQuote["trend"] =
            change24h > 0.02 ? "up" : change24h < -0.02 ? "down" : "flat";
          return {
            ...q,
            change24h: Number(change24h.toFixed(2)),
            trend,
          };
        }),
      };
      setData(enriched);
    } catch {
      setData((prev) =>
        prev ?? {
          quotes: [],
          updatedAt: new Date().toISOString(),
          timezone: "Asia/Kolkata",
          source: "fallback",
          marketOpen: true,
          error: "Connection error",
        },
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(() => load(true), REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [load]);

  return (
    <ExchangeRatesContext.Provider
      value={{ data, loading, refreshing, reload: () => load(true) }}
    >
      {children}
    </ExchangeRatesContext.Provider>
  );
}

export function useExchangeRatesContext() {
  const ctx = useContext(ExchangeRatesContext);
  if (!ctx) {
    throw new Error("useExchangeRatesContext requires ExchangeRatesProvider");
  }
  return ctx;
}

export function useExchangeRatesOptional() {
  return useContext(ExchangeRatesContext);
}
