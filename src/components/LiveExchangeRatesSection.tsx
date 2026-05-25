"use client";

import Link from "next/link";
import { useEffect, useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { ExchangeRateQuote } from "@/config/exchange-rates";
import {
  ExchangeRatesProvider,
  useExchangeRatesContext,
  useExchangeRatesOptional,
} from "@/components/ExchangeRatesProvider";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

function ExchangeRatesBoundary({ children }: { children: ReactNode }) {
  const ctx = useExchangeRatesOptional();
  if (ctx) return <>{children}</>;
  return <ExchangeRatesProvider>{children}</ExchangeRatesProvider>;
}

function formatInr(rate: number, code: string) {
  if (code === "JPY") return rate.toFixed(4);
  return rate.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatUpdated(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}

function MiniSparkline({
  values,
  trend,
  uid,
}: {
  values: number[];
  trend: "up" | "down" | "flat";
  uid: string;
}) {
  const w = 88;
  const h = 32;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  const stroke =
    trend === "up" ? "#34d399" : trend === "down" ? "#f87171" : "#d4af37";

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-[88px] h-8 shrink-0 opacity-90"
      aria-hidden
    >
      <defs>
        <linearGradient id={`spark-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      <polygon
        fill={`url(#spark-${uid})`}
        points={`0,${h} ${points} ${w},${h}`}
      />
    </svg>
  );
}

function AnimatedRate({
  value,
  code,
  pulse,
}: {
  value: number;
  code: string;
  pulse?: boolean;
}) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0.5, y: 6 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: pulse ? [1, 1.04, 1] : 1,
        color: pulse ? "#d4af37" : "#ffffff",
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="font-display font-bold tabular-nums inline-block"
    >
      ₹{formatInr(value, code)}
    </motion.span>
  );
}

function RateSkeleton({ compact }: { compact?: boolean }) {
  return (
    <div
      className={cx(
        "animate-pulse rounded-2xl bg-white/5 border border-white/10",
        compact ? "h-12 w-44 shrink-0" : "h-[220px]",
      )}
    />
  );
}

function TrendBadge({ change, trend }: { change: number; trend: string }) {
  const up = trend === "up";
  const down = trend === "down";
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
        up && "bg-emerald-500/15 text-emerald-400",
        down && "bg-red-500/15 text-red-400",
        !up && !down && "bg-gold/10 text-gold",
      )}
    >
      <i
        className={cx(
          "fas text-[8px]",
          up && "fa-arrow-trend-up",
          down && "fa-arrow-trend-down",
          !up && !down && "fa-minus",
        )}
        aria-hidden
      />
      {change >= 0 ? "+" : ""}
      {change.toFixed(2)}%
    </span>
  );
}

function ExchangeRateCard({
  quote,
  pulse,
  uid,
}: {
  quote: ExchangeRateQuote;
  pulse?: boolean;
  uid: string;
}) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6 }}
      className="group relative glass rounded-2xl border border-white/10 p-5 sm:p-6 overflow-hidden card-lift min-w-[260px] sm:min-w-0 snap-center shrink-0 sm:shrink"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-royal/10 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gold/10 blur-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none" />

      <div className="relative flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl shrink-0" aria-hidden>
            {quote.flag}
          </span>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
              {quote.code} → INR
            </p>
            <p className="text-sm font-semibold text-white truncate">{quote.name}</p>
          </div>
        </div>
        <TrendBadge change={quote.change24h} trend={quote.trend} />
      </div>

      <div className="relative flex items-end justify-between gap-2 mb-4">
        <div>
          <p className="text-[10px] text-white/45 uppercase tracking-wider mb-1">
            1 {quote.code}
          </p>
          <p className="text-2xl sm:text-[1.65rem] leading-none">
            <AnimatedRate value={quote.rate} code={quote.code} pulse={pulse} />
          </p>
        </div>
        <MiniSparkline values={quote.sparkline} trend={quote.trend} uid={`${uid}-${quote.code}`} />
      </div>

      <div className="relative flex items-center justify-between text-[10px] text-white/40 pt-3 border-t border-white/10">
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
          Live
        </span>
        <span>per INR cross</span>
      </div>
    </motion.article>
  );
}

function TickerItem({ quote }: { quote: ExchangeRateQuote }) {
  return (
    <div className="flex items-center gap-3 px-4 py-1.5 shrink-0 whitespace-nowrap">
      <span className="text-base">{quote.flag}</span>
      <span className="text-[11px] font-bold text-white/90 tracking-wide">
        {quote.code}/INR
      </span>
      <span className="text-sm font-display font-bold text-gold tabular-nums">
        ₹{formatInr(quote.rate, quote.code)}
      </span>
      <TrendBadge change={quote.change24h} trend={quote.trend} />
    </div>
  );
}

function FloatingParticles() {
  return (
    <motion.div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/40"
          style={{ left: `${6 + i * 15}%`, top: `${10 + (i % 4) * 22}%` }}
          animate={{ y: [0, -18, 0], opacity: [0.1, 0.45, 0.1] }}
          transition={{ duration: 6 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </motion.div>
  );
}

function LiveExchangeRatesTickerInner() {
  const { data, loading } = useExchangeRatesContext();
  const quotes = data?.quotes ?? [];

  return (
    <div
      className="relative z-40 border-b border-white/10 bg-navy-950/95 backdrop-blur-md"
      aria-label="Live exchange rates ticker"
    >
      <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />
      <div className="relative max-w-[100vw] mx-auto flex items-stretch">
        <div className="hidden sm:flex items-center gap-2 px-4 lg:px-6 py-2.5 border-r border-white/10 bg-gold/10 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold whitespace-nowrap">
            Live FX
          </span>
        </div>
        <div className="flex-1 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          {loading ? (
            <div className="flex gap-4 px-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <RateSkeleton key={i} compact />
              ))}
            </div>
          ) : (
            <div className="marquee gap-0">
              <div className="marquee-track gap-8">
                {quotes.map((q) => (
                  <TickerItem key={q.code} quote={q} />
                ))}
              </div>
              <div className="marquee-track gap-8" aria-hidden>
                {quotes.map((q) => (
                  <TickerItem key={`dup-${q.code}`} quote={q} />
                ))}
              </div>
            </div>
          )}
        </div>
        <Link
          href="/trade-tools#live-exchange-rates"
          className="hidden md:inline-flex items-center gap-2 px-4 lg:px-5 text-[10px] uppercase tracking-[0.15em] font-semibold text-gold hover:text-white border-l border-white/10 shrink-0 transition"
        >
          Track Live Rates
          <i className="fas fa-arrow-right text-[9px]" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

/** Compact strip below navbar */
export function LiveExchangeRatesTicker() {
  return (
    <ExchangeRatesBoundary>
      <LiveExchangeRatesTickerInner />
    </ExchangeRatesBoundary>
  );
}

type SectionProps = {
  preview?: boolean;
};

function LiveExchangeRatesSectionInner({ preview = false }: SectionProps) {
  const uid = useId().replace(/:/g, "");
  const { data, loading, refreshing, reload } = useExchangeRatesContext();
  const [pulseCode, setPulseCode] = useState<string | null>(null);
  const quotes = data?.quotes ?? [];

  useEffect(() => {
    if (!refreshing || !quotes.length) return;
    const code = quotes[Math.floor(Math.random() * quotes.length)]?.code;
    if (code) {
      setPulseCode(code);
      const t = setTimeout(() => setPulseCode(null), 600);
      return () => clearTimeout(t);
    }
  }, [refreshing, quotes]);

  return (
    <section
      id="live-exchange-rates"
      className="relative section-padding overflow-hidden bg-navy-950 border-y border-white/10"
    >
      <div className="absolute inset-0 bg-radial-navy pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.07] pointer-events-none" />
      <FloatingParticles />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-royal/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-gold/10 blur-[80px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-14"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">
                Trade Intelligence
              </span>
            </div>
            <h2 className="display-title font-display font-bold mb-3">
              <span className="text-white">Live Exchange Rates</span>
            </h2>
            <p className="text-lg text-white/60">
              <span className="text-gradient-gold italic font-serif">
                Stay Updated with Global Currency Rates
              </span>
            </p>
            <p className="text-sm text-white/45 mt-3 max-w-xl leading-relaxed">
              Real-time major currency crosses against INR for importers, exporters, and
              international businesses — refreshed automatically from global market data.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <div className="glass rounded-2xl px-4 py-3 border border-white/10 min-w-[200px]">
              <p className="text-[10px] uppercase tracking-wider text-white/45 mb-1">
                Last updated (IST)
              </p>
              <p className="text-sm font-semibold text-white tabular-nums">
                {data ? formatUpdated(data.updatedAt) : "—"}
              </p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span
                  className={cx(
                    "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                    data?.source === "live"
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-amber-500/15 text-amber-300",
                  )}
                >
                  {data?.source === "live" ? "Live API" : "Reference"}
                </span>
                {data?.marketOpen && (
                  <span className="text-[10px] text-white/40 flex items-center gap-1">
                    <i className="fas fa-chart-line text-gold text-[9px]" aria-hidden />
                    Markets active
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={reload}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full glass border border-white/15 text-white text-xs font-semibold hover:border-gold/40 transition disabled:opacity-60"
            >
              <motion.i
                className="fas fa-sync-alt text-gold text-[10px]"
                animate={refreshing ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  refreshing
                    ? { duration: 0.8, repeat: Infinity, ease: "linear" }
                    : {}
                }
                aria-hidden
              />
              {refreshing ? "Refreshing…" : "Refresh rates"}
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {data?.error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 text-xs text-amber-200/90 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5"
              role="status"
            >
              <i className="fas fa-circle-info mr-2 text-amber-300" aria-hidden />
              {data.error}
            </motion.p>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <RateSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:overflow-visible sm:pb-0 scrollbar-thin"
          >
            {quotes.map((q) => (
              <ExchangeRateCard
                key={q.code}
                quote={q}
                pulse={pulseCode === q.code}
                uid={uid}
              />
            ))}
          </motion.div>
        )}

        {/* Mini analytics strip */}
        {!loading && data && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-10 glass rounded-2xl border border-white/10 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center text-gold shrink-0">
                <i className="fas fa-globe-asia text-lg" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Global FX pulse</p>
                <p className="text-xs text-white/50 mt-0.5">
                  {quotes.filter((q) => q.trend === "up").length} strengthening ·{" "}
                  {quotes.filter((q) => q.trend === "down").length} softening vs prior tick
                </p>
              </div>
            </div>
            {!preview && (
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/trade-tools#live-exchange-rates"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold btn-premium"
                >
                  View Full Currency Dashboard
                  <i className="fas fa-arrow-right text-[10px]" aria-hidden />
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/15 text-white text-sm font-semibold hover:border-gold/40 transition"
                >
                  Explore Trade Tools
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/** Full financial dashboard section */
export function LiveExchangeRatesSection(props: SectionProps) {
  return (
    <ExchangeRatesBoundary>
      <LiveExchangeRatesSectionInner {...props} />
    </ExchangeRatesBoundary>
  );
}

export { ExchangeRatesProvider };
