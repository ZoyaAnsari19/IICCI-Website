"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";

/* ============================================================
   Data — replace fetchCurrentAffairs() with CMS/API
   ============================================================ */

export type AffairsCategory =
  | "foreign-trade-policy"
  | "dgft-notifications"
  | "customs-tariff"
  | "bilateral-trade"
  | "commodity-trends"
  | "sector-industry"
  | "government-schemes";

export type CurrentAffairsArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: AffairsCategory;
  categoryLabel: string;
  source: string;
  date: string;
  dateISO: string;
  readMinutes: number;
  image: { src: string; alt: string };
  featured?: boolean;
  trending?: boolean;
  tags: string[];
  href: string;
};

export const AFFAIRS_CATEGORIES: ReadonlyArray<{
  id: AffairsCategory;
  label: string;
  icon: string;
}> = [
  { id: "foreign-trade-policy", label: "Foreign Trade Policy", icon: "fa-landmark" },
  { id: "dgft-notifications", label: "DGFT Notifications", icon: "fa-file-lines" },
  { id: "customs-tariff", label: "Customs & Tariff", icon: "fa-scale-balanced" },
  { id: "bilateral-trade", label: "Bilateral Trade Agreements", icon: "fa-handshake" },
  { id: "commodity-trends", label: "Global Commodity Trends", icon: "fa-chart-line" },
  { id: "sector-industry", label: "Sector & Industry News", icon: "fa-industry" },
  { id: "government-schemes", label: "Government Schemes", icon: "fa-building-columns" },
] as const;

const TICKER_ITEMS = [
  "India–UAE CEPA review: new tariff schedules under consultation",
  "DGFT extends RoDTEP benefit timeline for eligible exporters",
  "Global shipping rates ease 8% on Asia–Europe lanes",
  "GCC trade desk opens bilateral matchmaking window",
] as const;

const SEED_ARTICLES: CurrentAffairsArticle[] = [
  {
    id: "ftp-2025-review",
    title: "Foreign Trade Policy review: export incentives aligned to priority sectors",
    excerpt:
      "Commerce ministry signals calibrated FTP updates focusing on value-added exports, services trade corridors, and MSME market access.",
    category: "foreign-trade-policy",
    categoryLabel: "Foreign Trade Policy",
    source: "Ministry of Commerce",
    date: "May 22, 2026",
    dateISO: "2026-05-22",
    readMinutes: 6,
    image: {
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      alt: "Policy briefing on international trade",
    },
    featured: true,
    trending: true,
    tags: ["FTP", "Exports", "Policy"],
    href: "#",
  },
  {
    id: "dgft-rodtep",
    title: "DGFT notification: RoDTEP claim filing window extended for Q1 shipments",
    excerpt:
      "Exporters receive additional timeline to reconcile shipping bills and claim remission benefits under the latest trade notice.",
    category: "dgft-notifications",
    categoryLabel: "DGFT Notifications",
    source: "DGFT India",
    date: "May 21, 2026",
    dateISO: "2026-05-21",
    readMinutes: 4,
    image: {
      src: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Export documentation and compliance",
    },
    trending: true,
    tags: ["RoDTEP", "DGFT", "Compliance"],
    href: "#",
  },
  {
    id: "customs-hs-2026",
    title: "Customs tariff update: revised HS mappings for electronics & pharma inputs",
    excerpt:
      "CBIC circular clarifies classification for dual-use components affecting import duty structures across key industrial corridors.",
    category: "customs-tariff",
    categoryLabel: "Customs & Tariff",
    source: "CBIC",
    date: "May 20, 2026",
    dateISO: "2026-05-20",
    readMinutes: 5,
    image: {
      src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      alt: "Customs and logistics operations",
    },
    tags: ["HS Code", "Tariff", "Customs"],
    href: "#",
  },
  {
    id: "india-eu-tta",
    title: "India–EU trade talks: services & GIs on the negotiating table",
    excerpt:
      "Delegation briefings highlight mutual recognition frameworks and geographic indication protections for premium exports.",
    category: "bilateral-trade",
    categoryLabel: "Bilateral Trade Agreements",
    source: "IICCI Trade Desk",
    date: "May 19, 2026",
    dateISO: "2026-05-19",
    readMinutes: 7,
    image: {
      src: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80",
      alt: "International trade handshake",
    },
    trending: true,
    tags: ["EU", "Bilateral", "Services"],
    href: "#",
  },
  {
    id: "commodity-oil",
    title: "Global commodity watch: crude volatility impacts freight-linked surcharges",
    excerpt:
      "Energy price swings translate to revised bunker adjustments on Asia–GCC routes; importers advised to hedge exposure.",
    category: "commodity-trends",
    categoryLabel: "Global Commodity Trends",
    source: "IICCI Intelligence",
    date: "May 18, 2026",
    dateISO: "2026-05-18",
    readMinutes: 5,
    image: {
      src: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Commodity market charts",
    },
    tags: ["Oil", "Freight", "Commodities"],
    href: "#",
  },
  {
    id: "pharma-exports",
    title: "Pharma exports surge 14% YoY as EU GMP clearances expand",
    excerpt:
      "Sector brief shows accelerated API shipments and finished formulation growth across regulated markets.",
    category: "sector-industry",
    categoryLabel: "Sector & Industry News",
    source: "Industry Verticals Desk",
    date: "May 17, 2026",
    dateISO: "2026-05-17",
    readMinutes: 4,
    image: {
      src: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Pharmaceutical manufacturing",
    },
    tags: ["Pharma", "EU", "Exports"],
    href: "#",
  },
  {
    id: "pli-scheme",
    title: "Government scheme alert: PLI tranche disbursal timeline for electronics PLI applicants",
    excerpt:
      "MeitY guidance outlines eligibility checks and audit milestones for manufacturers scaling component localization.",
    category: "government-schemes",
    categoryLabel: "Government Schemes",
    source: "MeitY",
    date: "May 16, 2026",
    dateISO: "2026-05-16",
    readMinutes: 6,
    image: {
      src: "https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Electronics manufacturing incentive",
    },
    trending: true,
    tags: ["PLI", "Electronics", "Incentives"],
    href: "#",
  },
  {
    id: "dgft-ebrc",
    title: "DGFT enables e-BRC integration for faster export realization tracking",
    excerpt:
      "Digital linkage reduces reconciliation delays between banks, exporters, and trade regulators for outward remittances.",
    category: "dgft-notifications",
    categoryLabel: "DGFT Notifications",
    source: "DGFT India",
    date: "May 15, 2026",
    dateISO: "2026-05-15",
    readMinutes: 3,
    image: {
      src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
      alt: "Digital trade compliance",
    },
    tags: ["e-BRC", "Banking", "Exports"],
    href: "#",
  },
  {
    id: "asean-fta",
    title: "ASEAN FTA utilization climbs as rules-of-origin compliance tools roll out",
    excerpt:
      "Chamber advisory highlights certificate workflows and sector-specific concession maps for consumer goods exporters.",
    category: "bilateral-trade",
    categoryLabel: "Bilateral Trade Agreements",
    source: "IICCI ASEAN Desk",
    date: "May 14, 2026",
    dateISO: "2026-05-14",
    readMinutes: 5,
    image: {
      src: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "ASEAN trade corridor",
    },
    tags: ["ASEAN", "FTA", "RoO"],
    href: "#",
  },
  {
    id: "agri-exports",
    title: "Agri export policy: cold-chain subsidies expanded for perishable corridors",
    excerpt:
      "APEDA circular supports air-freight slots and inspection fast-tracks for horticulture shipments to GCC markets.",
    category: "government-schemes",
    categoryLabel: "Government Schemes",
    source: "APEDA",
    date: "May 13, 2026",
    dateISO: "2026-05-13",
    readMinutes: 4,
    image: {
      src: "https://images.pexels.com/photos/2252580/pexels-photo-2252580.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Agricultural exports",
    },
    tags: ["Agri", "Cold chain", "GCC"],
    href: "#",
  },
  {
    id: "steel-tariff",
    title: "Customs alert: provisional safeguard duty review on select steel imports",
    excerpt:
      "Importers advised to monitor sunset review timelines and bonded warehousing options for inventory planning.",
    category: "customs-tariff",
    categoryLabel: "Customs & Tariff",
    source: "Trade Remedies Cell",
    date: "May 12, 2026",
    dateISO: "2026-05-12",
    readMinutes: 5,
    image: {
      src: "https://images.pexels.com/photos/448361/pexels-photo-448361.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Steel industrial imports",
    },
    tags: ["Steel", "Safeguard", "Duty"],
    href: "#",
  },
  {
    id: "ev-battery",
    title: "EV battery supply chain: lithium contract benchmarks soften Q2 outlook",
    excerpt:
      "Industry analysis tracks cathode input costs and export competitiveness for cell manufacturers.",
    category: "commodity-trends",
    categoryLabel: "Global Commodity Trends",
    source: "IICCI Research",
    date: "May 11, 2026",
    dateISO: "2026-05-11",
    readMinutes: 4,
    image: {
      src: "https://images.pexels.com/photos/9799996/pexels-photo-9799996.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Electric vehicle battery supply chain",
    },
    tags: ["EV", "Lithium", "Supply chain"],
    href: "#",
  },
];

export type FetchCurrentAffairsParams = {
  category?: AffairsCategory | "all";
  search?: string;
  page?: number;
  pageSize?: number;
  sort?: "newest" | "oldest";
};

export type FetchCurrentAffairsResult = {
  articles: CurrentAffairsArticle[];
  featured: CurrentAffairsArticle | null;
  trending: CurrentAffairsArticle[];
  total: number;
};

/** CMS/API stub — swap implementation for headless CMS or REST */
export async function fetchCurrentAffairs(
  params: FetchCurrentAffairsParams = {},
): Promise<FetchCurrentAffairsResult> {
  const {
    category = "all",
    search = "",
    page = 1,
    pageSize = 6,
    sort = "newest",
  } = params;

  let pool = [...SEED_ARTICLES];

  if (category !== "all") {
    pool = pool.filter((a) => a.category === category);
  }

  const q = search.trim().toLowerCase();
  if (q) {
    pool = pool.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        a.source.toLowerCase().includes(q),
    );
  }

  pool.sort((a, b) => {
    const cmp = a.dateISO.localeCompare(b.dateISO);
    return sort === "newest" ? -cmp : cmp;
  });

  const featured =
    pool.find((a) => a.featured) ?? (pool.length > 0 ? pool[0] : null);

  const gridPool = pool.filter((a) => a.id !== featured?.id);

  const start = (page - 1) * pageSize;
  const articles = gridPool.slice(start, start + pageSize);

  const trending = [...SEED_ARTICLES]
    .filter((a) => a.trending)
    .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
    .slice(0, 5);

  return {
    articles,
    featured,
    trending,
    total: gridPool.length,
  };
}

/* ============================================================
   Motion
   ============================================================ */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ============================================================
   Visuals
   ============================================================ */

function IntelligenceBackdrop({ uid }: { uid: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id={`ca-glow-${uid}`} cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#d4af37" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#ca-glow-${uid})`} />
      <g fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="0.8">
        <ellipse cx="800" cy="400" rx="700" ry="280" />
        <ellipse cx="800" cy="400" rx="500" ry="200" />
      </g>
    </svg>
  );
}

function FloatingParticles() {
  return (
    <motion.div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/35"
          style={{ left: `${10 + i * 18}%`, top: `${15 + (i % 3) * 25}%` }}
          animate={{ y: [0, -12, 0], opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration: 5 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </motion.div>
  );
}

function TradeNewsTicker() {
  return (
    <div className="relative border-y border-white/10 bg-navy-900/80 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-2.5">
        <span className="shrink-0 flex items-center gap-2 px-2.5 py-1 rounded-md bg-gold/15 border border-gold/30">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.2em] text-gold font-bold">
            Live
          </span>
        </span>
        <div className="flex-1 overflow-hidden">
          <motion.div
            className="flex gap-10 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="text-[11px] text-white/65 uppercase tracking-[0.12em]"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Cards & UI
   ============================================================ */

function NewsCard({
  article,
  variant = "grid",
}: {
  article: CurrentAffairsArticle;
  variant?: "grid" | "compact";
}) {
  return (
    <motion.article
      layout
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className={cx(
        "group relative glass-dark rounded-2xl border border-white/10 overflow-hidden hover:border-gold/35 transition duration-400 h-full flex flex-col",
        variant === "compact" && "flex-row sm:flex-col",
      )}
    >
      <div
        className={cx(
          "relative overflow-hidden shrink-0",
          variant === "compact" ? "w-28 sm:w-full h-24 sm:h-40" : "h-44",
        )}
      >
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-gold/20 border border-gold/35 text-[9px] uppercase tracking-[0.14em] text-gold font-semibold">
          {article.categoryLabel.split(" ")[0]}
        </span>
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/45 mb-2">
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.source}</span>
          <span>·</span>
          <span>{article.readMinutes} min read</span>
        </div>
        <h3 className="font-display font-bold text-white text-base leading-snug mb-2 group-hover:text-gold transition line-clamp-2">
          {article.title}
        </h3>
        <p className="text-white/55 text-xs leading-relaxed line-clamp-2 flex-1 mb-4">
          {article.excerpt}
        </p>
        <Link
          href={article.href}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gold hover:gap-3 transition-all"
        >
          Read More
          <i className="fas fa-arrow-right text-[10px]" aria-hidden />
        </Link>
      </div>
    </motion.article>
  );
}

function FeaturedSpotlight({ article }: { article: CurrentAffairsArticle }) {
  return (
    <motion.article
      variants={itemVariants}
      className="group relative glass-dark rounded-3xl border border-white/10 overflow-hidden lg:col-span-2 hover:border-gold/35 transition duration-400"
    >
      <div className="grid lg:grid-cols-12 gap-0">
        <div className="relative lg:col-span-7 min-h-[260px] lg:min-h-[320px]">
          <Image
            src={article.image.src}
            alt={article.image.alt}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 700px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/30 to-transparent lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent lg:bg-gradient-to-r" />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold text-navy-950 text-[10px] uppercase tracking-[0.18em] font-bold">
            Featured Insight
          </span>
        </div>
        <div className="relative lg:col-span-5 p-6 lg:p-8 flex flex-col justify-center">
          <div className="text-[10px] uppercase tracking-[0.16em] text-royal-light font-semibold mb-2">
            {article.categoryLabel}
          </div>
          <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-3 leading-snug group-hover:text-gold transition">
            {article.title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed mb-4">{article.excerpt}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {article.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-white/55"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-[10px] uppercase tracking-[0.14em] text-white/45">
              {article.source} · {article.date}
            </span>
            <Link
              href={article.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-gold text-navy-950 text-xs font-bold shadow-gold hover:scale-[1.02] transition"
            >
              Read Latest Updates
              <i className="fas fa-arrow-right text-[10px]" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function TrendingSidebar({ items }: { items: CurrentAffairsArticle[] }) {
  return (
    <motion.aside
      variants={itemVariants}
      className="glass-dark rounded-3xl border border-white/10 p-5 lg:p-6 h-fit lg:sticky lg:top-[calc(var(--navbar-height,88px)+5rem)]"
    >
      <div className="flex items-center gap-2 mb-5">
        <i className="fas fa-fire text-gold text-sm" aria-hidden />
        <h3 className="font-display font-bold text-white text-sm uppercase tracking-[0.14em]">
          Trending Insights
        </h3>
      </div>
      <ul className="space-y-4">
        {items.map((a, i) => (
          <li key={a.id}>
            <Link href={a.href} className="group block">
              <div className="flex gap-3">
                <span className="text-gold/70 font-mono text-xs pt-0.5 w-5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white/85 group-hover:text-gold transition line-clamp-2">
                    {a.title}
                  </p>
                  <p className="text-[10px] text-white/45 mt-1 uppercase tracking-[0.12em]">
                    {a.categoryLabel}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 pt-5 border-t border-white/10">
        <p className="text-[10px] uppercase tracking-[0.16em] text-white/40 mb-2">
          AI Recommended
        </p>
        <p className="text-xs text-white/55 leading-relaxed">
          Policy alerts and market signals curated for IICCI members — connect your CMS to
          personalize feeds.
        </p>
      </div>
    </motion.aside>
  );
}

/* ============================================================
   Main Section
   ============================================================ */

export function CurrentAffairsSection({ preview = false }: { preview?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const [category, setCategory] = useState<AffairsCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [visibleCount, setVisibleCount] = useState(2);
  const [data, setData] = useState<FetchCurrentAffairsResult | null>(null);
  const [loading, setLoading] = useState(true);

  const pageSize = preview ? 3 : visibleCount;

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 280);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setVisibleCount(2);
  }, [category, debouncedSearch, sort]);

  const load = useCallback(async () => {
    setLoading(true);
    const result = await fetchCurrentAffairs({
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

  const canLoadMore = !preview && data ? data.articles.length < data.total : false;

  const gridArticles = useMemo(
    () =>
      preview ? (data?.articles ?? []).slice(0, 3) : (data?.articles ?? []),
    [preview, data?.articles],
  );
  const firstRowArticles = gridArticles.slice(0, 2);
  const remainingArticles = gridArticles.slice(2);

  const pillarTags = [
    "Global trade intelligence",
    "Policy awareness",
    "International business updates",
    "Economic insights",
  ];

  return (
    <section
      id="current-affairs"
      aria-labelledby="current-affairs-heading"
      className={cx(
        "relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950",
        preview ? "py-16 lg:py-20" : "section-padding",
        !preview && "border-t border-white/10",
      )}
    >
      <IntelligenceBackdrop uid={uid} />
      <div className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none" />
      <FloatingParticles />

      {!preview && <TradeNewsTicker />}

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 z-10">
        {/* Header */}
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
              <i className="fas fa-newspaper text-gold text-xs" aria-hidden />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/85 font-semibold">
                Trade Intelligence
              </span>
            </motion.div>
            <motion.h2
              id="current-affairs-heading"
              variants={itemVariants}
              className="display-title font-display font-bold leading-[1.04]"
            >
              <span className="text-white">Current</span>{" "}
              <span className="text-gradient-gold italic font-serif font-normal">
                Affairs.
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-white/60 text-sm md:text-base mt-3">
              Trade News, Policy Updates &amp; Global Market Insights
            </motion.p>
          </div>
          {!preview && (
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {pillarTags.map((p) => (
                <span
                  key={p}
                  className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[10px] uppercase tracking-[0.12em] text-white/50"
                >
                  {p}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Search + sort (full) */}
        {!preview && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-3 mb-6"
          >
            <label className="relative flex-1">
              <span className="sr-only">Search current affairs</span>
              <i
                className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm"
                aria-hidden
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search policy, DGFT, tariffs, commodities…"
                className="w-full pl-11 pr-4 py-3 rounded-2xl glass-dark border border-white/10 text-white text-sm placeholder:text-white/40 focus:border-gold/40 focus:outline-none transition"
              />
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
              className="px-4 py-3 rounded-2xl glass-dark border border-white/10 text-white text-sm focus:border-gold/40 focus:outline-none bg-navy-900"
              aria-label="Sort by date"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </motion.div>
        )}

        {/* Category filters */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-8 lg:mb-10"
        >
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={cx(
              "shrink-0 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.14em] font-semibold transition",
              category === "all"
                ? "bg-gold text-navy-950"
                : "glass border border-white/10 text-white/60 hover:border-gold/30",
            )}
          >
            All Updates
          </button>
          {AFFAIRS_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={cx(
                "shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.14em] font-semibold transition",
                category === c.id
                  ? "bg-gold text-navy-950"
                  : "glass border border-white/10 text-white/60 hover:border-gold/30",
              )}
            >
              <i className={cx("fas", c.icon, "text-[10px]")} aria-hidden />
              <span className="whitespace-nowrap">{c.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Content grid */}
        <div className={cx("grid gap-6 lg:gap-8", !preview && "lg:grid-cols-12")}>
          <motion.div
            className={cx(!preview ? "lg:col-span-8 space-y-6" : "space-y-6")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {loading ? (
              <div className="py-20 text-center text-white/50 text-sm">Loading intelligence…</div>
            ) : (
              <>
                {data?.featured && !preview && <FeaturedSpotlight article={data.featured} />}

                {preview && data?.featured && <FeaturedSpotlight article={data.featured} />}

                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`${category}-${debouncedSearch}-${pageSize}-${sort}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 lg:space-y-5"
                  >
                    <div className="grid gap-4 lg:gap-5 sm:grid-cols-2">
                      {firstRowArticles.map((article) => (
                        <NewsCard
                          key={article.id}
                          article={article}
                          variant={preview ? "compact" : "grid"}
                        />
                      ))}
                    </div>

                    {!preview && canLoadMore && (
                      <div className="flex justify-center py-2">
                        <button
                          type="button"
                          onClick={() => setVisibleCount((c) => c + 2)}
                          disabled={loading}
                          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 text-white text-sm font-semibold hover:border-gold/40 transition disabled:opacity-50"
                        >
                          Load more updates
                          <i className="fas fa-plus text-[10px] text-gold" aria-hidden />
                        </button>
                      </div>
                    )}

                    {remainingArticles.length > 0 && (
                      <div className="grid gap-4 lg:gap-5 sm:grid-cols-2">
                        {remainingArticles.map((article) => (
                          <NewsCard
                            key={article.id}
                            article={article}
                            variant={preview ? "compact" : "grid"}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {!preview && data && data.articles.length === 0 && (
                  <div className="py-16 text-center glass-dark rounded-3xl border border-white/10">
                    <p className="text-white/60">No updates match your filters.</p>
                  </div>
                )}
              </>
            )}
          </motion.div>

          {!preview && data && (
            <div className="lg:col-span-4">
              <TrendingSidebar items={data.trending} />
            </div>
          )}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 lg:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href={preview ? "/media/currentAffairs" : "#current-affairs"}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold shadow-gold hover:scale-[1.02] transition"
          >
            {preview ? "View All News" : "Explore Trade Insights"}
            <i className="fas fa-arrow-right text-xs" aria-hidden />
          </Link>
          <Link
            href="/media/currentAffairs"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white text-sm font-semibold hover:border-gold/40 transition"
          >
            Read Latest Updates
            <i className="fas fa-newspaper text-xs text-gold" aria-hidden />
          </Link>
        </motion.div>

        {preview && (
          <p className="text-center mt-6">
            <Link
              href="/media/currentAffairs"
              className="text-gold text-sm font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              Open full current affairs hub
              <i className="fas fa-arrow-right text-[10px]" aria-hidden />
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

export default function CurrentAffairsPage() {
  return <CurrentAffairsSection />;
}
