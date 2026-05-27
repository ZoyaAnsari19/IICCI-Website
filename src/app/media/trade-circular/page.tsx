"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  CIRCULAR_CATEGORIES,
  fetchTradeCirculars,
  PRIORITY_META,
  type CircularCategory,
  type CircularPriority,
  type FetchCircularsResult,
  type TradeCircular,
} from "@/config/trade-circulars";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const MOBILE_CIRCULARS_PREVIEW = 2;

function categoryShortLabel(label: string) {
  if (label.startsWith("DGFT")) return "DGFT";
  if (label.startsWith("Customs")) return "Customs";
  if (label.startsWith("Trade Policy")) return "Trade";
  if (label.startsWith("Compliance")) return "Compliance";
  if (label.startsWith("Tariff")) return "Tariff";
  if (label.startsWith("Government")) return "Govt";
  if (label.startsWith("International")) return "Global";
  return label.split(" ")[0];
}

function CategoryFilterPills({
  category,
  onChange,
}: {
  category: CircularCategory | "all";
  onChange: (value: CircularCategory | "all") => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
      <button
        type="button"
        onClick={() => onChange("all")}
        className={cx(
          "shrink-0 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.14em] font-semibold transition",
          category === "all"
            ? "bg-gold text-navy-950"
            : "glass border border-white/10 text-white/60 hover:border-gold/30",
        )}
      >
        All
      </button>
      {CIRCULAR_CATEGORIES.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onChange(c.id)}
          className={cx(
            "shrink-0 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.14em] font-semibold transition whitespace-nowrap",
            category === c.id
              ? "bg-gold text-navy-950"
              : "glass border border-white/10 text-white/60 hover:border-gold/30",
          )}
        >
          {categoryShortLabel(c.label)}
        </button>
      ))}
    </div>
  );
}

function FloatingParticles() {
  return (
    <motion.div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/35"
          style={{ left: `${10 + i * 18}%`, top: `${14 + (i % 3) * 26}%` }}
          animate={{ y: [0, -12, 0], opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration: 5 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </motion.div>
  );
}

function CircularBackdrop({ uid }: { uid: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id={`tc-glow-${uid}`} cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#d4af37" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#tc-glow-${uid})`} />
    </svg>
  );
}

function PriorityBadge({ priority }: { priority: CircularPriority }) {
  const meta = PRIORITY_META[priority];
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[9px] uppercase tracking-[0.14em] font-bold",
        meta.className,
      )}
    >
      {meta.pulse && (
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-red-400"
          animate={{ scale: [1, 1.35, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      {meta.label}
    </span>
  );
}

function NotificationCard({
  circular,
  onView,
}: {
  circular: TradeCircular;
  onView: (c: TradeCircular) => void;
}) {
  return (
    <motion.article
      layout
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className={cx(
        "group relative w-full min-w-0 glass-dark rounded-2xl border overflow-hidden transition duration-400",
        circular.priority === "urgent"
          ? "border-red-400/25 hover:border-red-400/45"
          : "border-white/10 hover:border-gold/35",
      )}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(80%_50%_at_0%_0%,rgba(212,175,55,0.1),transparent_55%)]" />
      <div className="relative p-4 sm:p-6 flex flex-col h-full min-w-0">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between mb-3">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <PriorityBadge priority={circular.priority} />
            {circular.pinned && (
              <span className="px-2 py-0.5 rounded-md bg-royal/20 border border-royal-light/30 text-[9px] uppercase tracking-wider text-royal-light font-semibold">
                <i className="fas fa-thumbtack text-[8px] mr-1" aria-hidden />
                Pinned
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase tracking-[0.14em] text-white/40 shrink-0">
            {circular.publishDate}
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.16em] text-gold/80 font-semibold mb-2 line-clamp-1">
          {circular.categoryLabel}
        </span>
        <h3 className="font-display font-bold text-white text-sm sm:text-base leading-snug mb-2 group-hover:text-gold transition line-clamp-2 break-words">
          {circular.title}
        </h3>
        <p className="text-white/55 text-xs leading-relaxed line-clamp-3 flex-1 mb-3 sm:mb-4 break-words">
          {circular.summary}
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {circular.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-white/50 max-w-full truncate"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-col sm:flex-row gap-2 pt-3 sm:pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => onView(circular)}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl border border-white/12 text-white/80 text-xs font-semibold hover:border-gold/40 hover:text-gold transition"
          >
            <i className="fas fa-eye text-[10px]" aria-hidden />
            View
          </button>
          <a
            href={circular.pdfUrl}
            download
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl bg-gradient-gold text-navy-950 text-xs font-bold shadow-gold hover:scale-[1.02] active:scale-[0.98] transition"
          >
            <i className="fas fa-file-pdf text-[10px]" aria-hidden />
            Download
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function CircularDetailModal({
  circular,
  onClose,
}: {
  circular: TradeCircular | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!circular) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [circular, onClose]);

  useEffect(() => {
    if (!circular) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [circular]);

  return (
    <AnimatePresence>
      {circular ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-navy-950/85 backdrop-blur-md"
            aria-label="Close"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-xl glass-dark rounded-3xl border border-white/12 shadow-premium overflow-hidden"
            initial={{ y: 20, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.97 }}
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <PriorityBadge priority={circular.priority} />
                  <h3 className="font-display font-bold text-white text-lg mt-3 leading-snug">
                    {circular.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-white/45 mt-2">
                    {circular.categoryLabel} · {circular.publishDate}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-white/12 text-white/70 hover:text-white grid place-items-center shrink-0"
                  aria-label="Close"
                >
                  <i className="fas fa-xmark" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-white/65 text-sm leading-relaxed mb-5">{circular.summary}</p>
              <div className="flex gap-2">
                <a
                  href={circular.pdfUrl}
                  download
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold"
                >
                  Download PDF
                  <i className="fas fa-download text-[10px]" aria-hidden />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-full border border-white/15 text-white text-sm font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function TradeCircularPageContent() {
  const uid = useId().replace(/:/g, "");
  const [category, setCategory] = useState<CircularCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "priority">("newest");
  const [visibleCount, setVisibleCount] = useState(6);
  const [data, setData] = useState<FetchCircularsResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState<TradeCircular | null>(null);
  const [email, setEmail] = useState("");
  const [showAllMobileCirculars, setShowAllMobileCirculars] = useState(false);

  const pageSize = visibleCount;

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 280);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setVisibleCount(6);
    setShowAllMobileCirculars(false);
  }, [category, debouncedSearch, sort]);

  const load = useCallback(async () => {
    setLoading(true);
    const result = await fetchTradeCirculars({
      category,
      search: debouncedSearch,
      page: 1,
      pageSize,
      sort,
    });
    setData(result);
    setLoading(false);
  }, [category, debouncedSearch, pageSize, sort]);

  useEffect(() => {
    load();
  }, [load]);

  const canLoadMore = data ? data.circulars.length < data.total : false;

  const displayCards = useMemo(() => {
    if (!data) return [];
    const seen = new Set<string>();
    const list: TradeCircular[] = [];
    const add = (c: TradeCircular) => {
      if (seen.has(c.id)) return;
      seen.add(c.id);
      list.push(c);
    };
    if (data.featured) add(data.featured);
    data.pinned.forEach(add);
    data.circulars.forEach(add);
    return list;
  }, [data]);

  return (
    <section
      id="trade-circulars"
      aria-labelledby="trade-circulars-heading"
      className="relative page-nav-offset overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 border-t border-white/10"
    >
      <CircularBackdrop uid={uid} />
      <div className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none" />
      <FloatingParticles />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8 lg:mb-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          <div className="max-w-2xl">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-5"
            >
              <i className="fas fa-bell text-gold text-xs" aria-hidden />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/85 font-semibold">
                Trade Intelligence
              </span>
            </motion.div>
            <motion.h2
              id="trade-circulars-heading"
              variants={itemVariants}
              className="display-title font-display font-bold leading-[1.04]"
            >
              <span className="text-white">Trade Circulars &</span>{" "}
              <span className="text-gradient-gold italic font-serif font-normal">
                Notifications.
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-white/60 text-sm md:text-base mt-3">
              Official Updates for Importers &amp; Exporters
            </motion.p>
          </div>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            {[
              "Regulatory awareness",
              "Trade compliance",
              "Business intelligence",
            ].map((p) => (
              <span
                key={p}
                className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[10px] uppercase tracking-[0.12em] text-white/50"
              >
                {p}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-3 mb-4 lg:mb-6"
        >
          <label className="relative flex-1 min-w-0">
            <span className="sr-only">Search circulars</span>
            <i
              className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm"
              aria-hidden
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search DGFT, customs, tariffs, compliance…"
              className="w-full pl-11 pr-4 py-3 rounded-2xl glass-dark border border-white/10 text-white text-sm placeholder:text-white/40 focus:border-gold/40 focus:outline-none transition"
            />
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "newest" | "priority")}
            className="w-full sm:w-auto sm:min-w-[160px] px-4 py-3 rounded-2xl glass-dark border border-white/10 text-white text-sm focus:border-gold/40 focus:outline-none bg-navy-900"
            aria-label="Sort circulars"
          >
            <option value="newest">Newest first</option>
            <option value="priority">Priority first</option>
          </select>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="lg:hidden mb-5"
        >
          <CategoryFilterPills category={category} onChange={setCategory} />
        </motion.div>

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-12">
          <motion.aside
              className="hidden lg:block lg:col-span-3 space-y-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <button
                type="button"
                onClick={() => setCategory("all")}
                className={cx(
                  "w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition",
                  category === "all"
                    ? "bg-gold text-navy-950"
                    : "glass border border-white/10 text-white/70 hover:border-gold/30",
                )}
              >
                All Circulars
              </button>
              {CIRCULAR_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={cx(
                    "w-full text-left px-4 py-3 rounded-xl text-sm transition flex items-center gap-3",
                    category === c.id
                      ? "bg-gold/15 border border-gold/35 text-gold"
                      : "glass border border-white/10 text-white/65 hover:border-gold/25 hover:text-white",
                  )}
                >
                  <i className={cx("fas", c.icon, "text-xs w-4 text-center shrink-0")} aria-hidden />
                  <span className="line-clamp-2">{c.label}</span>
                </button>
              ))}
            </motion.aside>

          <div className="lg:col-span-9 min-w-0">
            {loading ? (
              <div className="py-16 text-center text-white/50 text-sm">
                Loading trade notifications…
              </div>
            ) : (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={containerVariants}
                className="space-y-6"
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`${category}-${debouncedSearch}-${pageSize}-${sort}-${showAllMobileCirculars}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 min-w-0"
                  >
                    {displayCards.map((c, index) => (
                      <div
                        key={c.id}
                        className={cx(
                          "min-w-0",
                          index >= MOBILE_CIRCULARS_PREVIEW &&
                            !showAllMobileCirculars &&
                            "max-md:hidden",
                        )}
                      >
                        <NotificationCard circular={c} onView={setViewItem} />
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {data && displayCards.length === 0 && (
                  <div className="py-16 text-center glass-dark rounded-3xl border border-white/10">
                    <p className="text-white/60">No circulars match your filters.</p>
                  </div>
                )}

                {displayCards.length > MOBILE_CIRCULARS_PREVIEW && (
                    <div className="flex justify-center md:hidden">
                      <button
                        type="button"
                        onClick={() => setShowAllMobileCirculars((prev) => !prev)}
                        aria-expanded={showAllMobileCirculars}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/40 bg-gold/10 text-gold text-sm font-semibold hover:bg-gold hover:text-navy-950 transition"
                      >
                        {showAllMobileCirculars ? "View Less" : "View More"}
                        <i
                          className={cx(
                            "fas fa-chevron-down text-xs transition-transform duration-300",
                            showAllMobileCirculars && "rotate-180",
                          )}
                          aria-hidden
                        />
                      </button>
                    </div>
                  )}

                {canLoadMore && (
                  <div className={cx("flex justify-center", !showAllMobileCirculars && "max-md:hidden")}>
                    <button
                      type="button"
                      onClick={() => setVisibleCount((c) => c + 6)}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 text-white text-sm font-semibold hover:border-gold/40 transition"
                    >
                      Load more circulars
                      <i className="fas fa-plus text-[10px] text-gold" aria-hidden />
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 glass-dark rounded-2xl border border-white/10 p-6 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
            <div>
              <h3 className="font-display font-bold text-white text-sm mb-1">
                Subscribe to trade alerts
              </h3>
              <p className="text-white/50 text-xs">
                Get DGFT, customs, and compliance notifications in your inbox.
              </p>
            </div>
            <form
              className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:min-w-[360px]"
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email"
                required
                className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/40 focus:border-gold/40 outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-gradient-gold text-navy-950 text-xs font-bold whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 lg:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/media"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold shadow-gold hover:scale-[1.02] transition"
          >
            Back to Media Center
            <i className="fas fa-arrow-right text-xs" aria-hidden />
          </Link>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white text-sm font-semibold hover:border-gold/40 transition"
          >
            Resources Center
            <i className="fas fa-folder-open text-xs text-gold" aria-hidden />
          </Link>
        </motion.div>
      </div>

      <CircularDetailModal circular={viewItem} onClose={() => setViewItem(null)} />
    </section>
  );
}

export default function TradeCircularPage() {
  return (
    <main>
      <TradeCircularPageContent />
    </main>
  );
}
