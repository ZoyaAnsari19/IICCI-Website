"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

/* ============================================================
   CMS-ready types — wire fetchMonthlyPerformance() to API
   ============================================================ */

export type MonthlyMetric = {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon: string;
  trend: number;
  trendUp: boolean;
  sparkline: number[];
  unit?: string;
};

export type ActivityItem = {
  id: string;
  title: string;
  category: string;
  time: string;
  icon: string;
};

export type MonthlyPerformanceData = {
  monthLabel: string;
  year: number;
  metrics: MonthlyMetric[];
  monthlyTrend: { label: string; services: number; enquiries: number; members: number }[];
  activities: ActivityItem[];
  globalNodes: { id: string; label: string; x: number; y: number; active: boolean }[];
  summary: {
    servicesDelivered: number;
    membersOnboarded: number;
    tradeEnquiries: number;
    collaborations: number;
  };
};

/** Replace with API/CMS — no sensitive revenue in public payload */
async function fetchMonthlyPerformance(): Promise<MonthlyPerformanceData> {
  await new Promise((r) => setTimeout(r, 240));
  return MONTHLY_PERFORMANCE_SEED;
}

const MONTHLY_PERFORMANCE_SEED: MonthlyPerformanceData = {
  monthLabel: "May",
  year: 2026,
  summary: {
    servicesDelivered: 1248,
    membersOnboarded: 186,
    tradeEnquiries: 412,
    collaborations: 34,
  },
  metrics: [
    {
      id: "services",
      label: "Services Delivered",
      value: 1248,
      suffix: "+",
      icon: "fa-briefcase",
      trend: 12.4,
      trendUp: true,
      sparkline: [820, 910, 980, 1050, 1180, 1248],
    },
    {
      id: "members",
      label: "New Members Joined",
      value: 186,
      icon: "fa-user-plus",
      trend: 8.2,
      trendUp: true,
      sparkline: [120, 132, 145, 158, 172, 186],
    },
    {
      id: "enquiries",
      label: "Trade Enquiries Facilitated",
      value: 412,
      icon: "fa-envelope-open-text",
      trend: 15.6,
      trendUp: true,
      sparkline: [280, 310, 340, 365, 390, 412],
    },
    {
      id: "matchmaking",
      label: "Business Matchmakings",
      value: 89,
      icon: "fa-people-arrows",
      trend: 6.1,
      trendUp: true,
      sparkline: [52, 58, 64, 71, 82, 89],
    },
    {
      id: "training",
      label: "Training Programs Conducted",
      value: 24,
      icon: "fa-graduation-cap",
      trend: 4.0,
      trendUp: true,
      sparkline: [14, 16, 18, 20, 22, 24],
    },
    {
      id: "collaborations",
      label: "International Collaborations",
      value: 34,
      icon: "fa-globe",
      trend: 9.8,
      trendUp: true,
      sparkline: [18, 20, 24, 26, 30, 34],
    },
    {
      id: "opportunities",
      label: "Active Trade Opportunities",
      value: 67,
      icon: "fa-rocket",
      trend: 3.2,
      trendUp: false,
      sparkline: [72, 70, 68, 69, 68, 67],
    },
  ],
  monthlyTrend: [
    { label: "Jan", services: 920, enquiries: 310, members: 142 },
    { label: "Feb", services: 980, enquiries: 328, members: 151 },
    { label: "Mar", services: 1020, enquiries: 355, members: 162 },
    { label: "Apr", services: 1105, enquiries: 378, members: 174 },
    { label: "May", services: 1180, enquiries: 395, members: 180 },
    { label: "Jun", services: 1248, enquiries: 412, members: 186 },
  ],
  activities: [
    {
      id: "a1",
      title: "GCC pharma import desk — 12 enquiries closed",
      category: "Trade Desk",
      time: "2h ago",
      icon: "fa-ship",
    },
    {
      id: "a2",
      title: "EV battery export cohort — 28 members onboarded",
      category: "Membership",
      time: "5h ago",
      icon: "fa-user-plus",
    },
    {
      id: "a3",
      title: "ASEAN textiles JV matchmaking roundtable",
      category: "Matchmaking",
      time: "Yesterday",
      icon: "fa-handshake",
    },
    {
      id: "a4",
      title: "Import–export masterclass — 340 completions",
      category: "Training",
      time: "Yesterday",
      icon: "fa-graduation-cap",
    },
    {
      id: "a5",
      title: "EU organic agri-export collaboration signed",
      category: "Global",
      time: "2 days ago",
      icon: "fa-earth-asia",
    },
  ],
  globalNodes: [
    { id: "in", label: "India", x: 620, y: 240, active: true },
    { id: "gcc", label: "GCC", x: 520, y: 200, active: true },
    { id: "eu", label: "EU", x: 380, y: 140, active: true },
    { id: "us", label: "USA", x: 180, y: 180, active: false },
    { id: "asean", label: "ASEAN", x: 780, y: 260, active: true },
    { id: "au", label: "AU", x: 820, y: 380, active: false },
  ],
};

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
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function AnimatedCounter({
  to,
  suffix = "",
}: {
  to: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1500, bounce: 0 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString("en-IN"));
  const [value, setValue] = useState("0");

  useEffect(() => {
    if (inView) motionValue.set(to);
    return display.on("change", (v) => setValue(v));
  }, [inView, to, motionValue, display]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix && <span className="text-gold">{suffix}</span>}
    </span>
  );
}

/* ============================================================
   Charts (SVG — no external chart lib)
   ============================================================ */

function MiniSparkline({
  data,
  color = "#d4af37",
  className,
}: {
  data: number[];
  color?: string;
  className?: string;
}) {
  const w = 120;
  const h = 36;
  const pad = 4;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1)) * (w - pad * 2);
      const y = h - pad - ((v - min) / range) * (h - pad * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cx("w-full h-9", className)} aria-hidden>
      <defs>
        <linearGradient id={`spark-fill-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={`${points} ${w - pad},${h} ${pad},${h}`}
        fill={`url(#spark-fill-${color.replace("#", "")})`}
        stroke="none"
      />
      <motion.polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

function MonthlyTrendChart({
  data,
  uid,
}: {
  data: MonthlyPerformanceData["monthlyTrend"];
  uid: string;
}) {
  const w = 560;
  const h = 200;
  const pad = { t: 16, r: 16, b: 32, l: 40 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const maxVal = Math.max(
    ...data.flatMap((d) => [d.services, d.enquiries, d.members]),
  );

  const barGroupW = innerW / data.length;
  const barW = barGroupW * 0.22;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" role="img" aria-label="Monthly activity trend chart">
      <defs>
        <linearGradient id={`bar-gold-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`bar-royal-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`bar-emerald-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((pct) => (
        <line
          key={pct}
          x1={pad.l}
          y1={pad.t + innerH * (1 - pct)}
          x2={w - pad.r}
          y2={pad.t + innerH * (1 - pct)}
          stroke="rgba(8,17,32,0.06)"
          strokeWidth="1"
        />
      ))}
      {data.map((d, i) => {
        const gx = pad.l + i * barGroupW + barGroupW / 2;
        const series = [
          { v: d.services, fill: `url(#bar-gold-${uid})`, offset: -barW },
          { v: d.enquiries, fill: `url(#bar-royal-${uid})`, offset: 0 },
          { v: d.members, fill: `url(#bar-emerald-${uid})`, offset: barW },
        ];
        return (
          <g key={d.label}>
            {series.map((s, j) => {
              const bh = (s.v / maxVal) * innerH;
              return (
                <motion.rect
                  key={j}
                  x={gx + s.offset - barW / 2}
                  y={pad.t + innerH - bh}
                  width={barW}
                  height={bh}
                  rx="3"
                  fill={s.fill}
                  initial={{ scaleY: 0, originY: 1 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 + j * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: `${gx + s.offset}px ${pad.t + innerH}px` }}
                />
              );
            })}
            <text
              x={gx}
              y={h - 8}
              textAnchor="middle"
              className="fill-navy-950/45"
              style={{ font: "500 10px Inter, sans-serif" }}
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function GlobalActivityMap({
  nodes,
  uid,
}: {
  nodes: MonthlyPerformanceData["globalNodes"];
  uid: string;
}) {
  const hub = nodes.find((n) => n.id === "in") ?? nodes[0];

  return (
    <svg viewBox="0 0 900 420" className="w-full h-full" aria-hidden>
      <defs>
        <radialGradient id={`map-hub-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`map-line-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="900" height="420" fill={`url(#map-hub-${uid})`} />
      {nodes
        .filter((n) => n.id !== hub.id && n.active)
        .map((n) => {
          const path = `M ${hub.x} ${hub.y} Q ${(hub.x + n.x) / 2} ${Math.min(hub.y, n.y) - 60} ${n.x} ${n.y}`;
          return (
            <path
              key={n.id}
              d={path}
              fill="none"
              stroke={`url(#map-line-${uid})`}
              strokeWidth="1"
            />
          );
        })}
      {nodes.map((n) => (
        <g key={n.id}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={n.active ? 8 : 5}
            fill={n.active ? "#d4af37" : "rgba(8,17,32,0.2)"}
            animate={n.active ? { opacity: [0.6, 1, 0.6] } : undefined}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <text
            x={n.x}
            y={n.y + 22}
            textAnchor="middle"
            className="fill-navy-950/50"
            style={{ font: "600 9px 'Plus Jakarta Sans', sans-serif", letterSpacing: "0.14em" }}
          >
            {n.label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}

function DashboardBackdrop({ uid }: { uid: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.35] pointer-events-none"
      viewBox="0 0 1600 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <pattern id={`dash-grid-${uid}`} width="48" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M 48 0 L 0 0 0 48"
            fill="none"
            stroke="rgba(8,17,32,0.05)"
            strokeWidth="0.6"
          />
        </pattern>
      </defs>
      <rect width="1600" height="800" fill={`url(#dash-grid-${uid})`} />
    </svg>
  );
}

function FloatingParticles() {
  const pts = [
    { l: "10%", t: "18%", d: 0 },
    { l: "78%", t: "22%", d: 0.8 },
    { l: "45%", t: "70%", d: 1.2 },
    { l: "88%", t: "55%", d: 0.4 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {pts.map((p, i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/50"
          style={{ left: p.l, top: p.t }}
          animate={{ y: [0, -12, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: p.d }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   KPI Card
   ============================================================ */

function KpiCard({ metric }: { metric: MonthlyMetric }) {
  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="group relative glass-light rounded-2xl border border-navy-950/10 p-5 sm:p-6 card-lift overflow-hidden h-full flex flex-col"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none bg-gradient-to-br from-gold/[0.06] via-transparent to-royal/[0.04]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition" />

      <div className="relative flex items-start justify-between gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition duration-400">
          <i
            className={cx(
              "fas",
              metric.icon,
              "text-gold text-sm group-hover:text-navy-950 transition",
            )}
            aria-hidden
          />
        </div>
        <span
          className={cx(
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border",
            metric.trendUp
              ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/25"
              : "bg-amber-500/10 text-amber-700 border-amber-500/25",
          )}
        >
          <i
            className={cx(
              "fas text-[8px]",
              metric.trendUp ? "fa-arrow-trend-up" : "fa-arrow-trend-down",
            )}
            aria-hidden
          />
          {metric.trend}%
        </span>
      </div>

      <div className="relative font-display text-3xl sm:text-4xl font-bold text-navy-950 mb-1">
        <AnimatedCounter to={metric.value} suffix={metric.suffix} />
      </div>
      <p className="relative text-sm font-semibold text-navy-950/90 leading-snug mb-4">
        {metric.label}
      </p>

      <div className="relative mt-auto pt-3 border-t border-navy-950/8">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[9px] uppercase tracking-[0.18em] text-navy-950/45">
            6-mo trend
          </span>
          <span className="flex items-center gap-1 text-[9px] text-emerald-600 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>
        <MiniSparkline
          data={metric.sparkline}
          color={metric.trendUp ? "#d4af37" : "#f59e0b"}
        />
      </div>
    </motion.article>
  );
}

/* ============================================================
   Members-only revenue (masked)
   ============================================================ */

function MembersOnlyRevenueCard() {
  return (
    <motion.div
      variants={itemVariants}
      className="relative rounded-2xl border border-navy-950/10 overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 p-6 sm:p-7 h-full min-h-[200px] flex flex-col justify-center"
    >
      <div className="absolute inset-0 bg-grid opacity-[0.08]" aria-hidden />
      <div className="absolute inset-0 backdrop-blur-[2px]" aria-hidden />
      <div className="relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
          <i className="fas fa-lock text-gold text-[10px]" aria-hidden />
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/70 font-semibold">
            Members Only
          </span>
        </div>
        <div className="select-none blur-md pointer-events-none mb-4" aria-hidden>
          <div className="font-display text-4xl font-bold text-gold">₹ ●●.● Cr</div>
          <div className="text-white/50 text-sm mt-1">Institutional revenue analytics</div>
        </div>
        <p className="text-white/65 text-sm leading-relaxed max-w-xs">
          Revenue and financial KPIs are restricted to verified members and admin dashboards
          for confidentiality.
        </p>
        <Link
          href="#membership"
          className="inline-flex items-center gap-2 mt-4 text-gold text-xs font-semibold hover:gap-3 transition-all"
        >
          Become a member to unlock
          <i className="fas fa-arrow-right text-[10px]" aria-hidden />
        </Link>
      </div>
    </motion.div>
  );
}

/* ============================================================
   Main Section
   ============================================================ */

export function MonthlyPerformanceSection({ preview = false }: { preview?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const [data, setData] = useState<MonthlyPerformanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchMonthlyPerformance().then((d) => {
      if (!cancelled) {
        setData(d);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const metrics = preview
    ? (data?.metrics ?? []).slice(0, 4)
    : data?.metrics ?? [];

  return (
    <section
      id="monthly-performance"
      aria-labelledby="monthly-performance-heading"
      className={cx(
        "relative overflow-hidden bg-white border-y border-navy-950/10",
        preview ? "py-16 lg:py-20" : "page-nav-offset",
      )}
    >
      <DashboardBackdrop uid={uid} />
      <div className="absolute inset-0 bg-grid-light bg-grid-fade opacity-50 pointer-events-none" />
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-royal/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[480px] h-[480px] rounded-full bg-gold/8 blur-[120px] pointer-events-none" />
      <FloatingParticles />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 lg:mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/5 border border-navy-950/10 mb-4"
          >
            <i className="fas fa-chart-pie text-gold text-xs" aria-hidden />
            <span className="text-[10px] uppercase tracking-[0.3em] text-navy-950/70 font-semibold">
              Institutional Analytics
            </span>
            {data && (
              <>
                <span className="h-3 w-px bg-navy-950/15" />
                <span className="text-[10px] uppercase tracking-[0.22em] text-royal font-semibold">
                  {data.monthLabel} {data.year}
                </span>
              </>
            )}
          </motion.div>

          <motion.h2
            id="monthly-performance-heading"
            variants={itemVariants}
            className="display-title font-display font-bold mb-4"
          >
            <span className="text-navy-950">Monthly Services &amp;</span>{" "}
            <span className="text-gradient-gold italic font-serif font-normal">
              Performance Overview.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-navy-950/70 text-base md:text-lg font-serif italic"
          >
            &ldquo;Transparent Performance, Trusted Growth.&rdquo;
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-3 text-sm md:text-base text-navy-950/55 leading-relaxed"
          >
            Operational activity across services, membership, trade desks and global
            collaborations — public metrics only. Financial revenue remains member-restricted.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: preview ? 4 : 8 }).map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-2xl border border-navy-950/10 bg-navy-950/[0.03] animate-pulse"
              />
            ))}
          </div>
        ) : (
          data && (
            <>
              {/* Row 1 — primary KPIs */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-4 lg:mb-5"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                variants={containerVariants}
              >
                {metrics.slice(0, 4).map((m) => (
                  <KpiCard key={m.id} metric={m} />
                ))}
              </motion.div>

              {!preview && (
                <>
                  {/* Row 2 — more KPIs + members-only */}
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-8 lg:mb-10"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={containerVariants}
                  >
                    {metrics.slice(4).map((m) => (
                      <KpiCard key={m.id} metric={m} />
                    ))}
                  </motion.div>

                  {/* Analytics row: chart + map + timeline */}
                  <motion.div
                    className="grid lg:grid-cols-12 gap-5 lg:gap-6 mb-8 lg:mb-10"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={containerVariants}
                  >
                    <motion.div
                      variants={itemVariants}
                      className="lg:col-span-7 glass-light rounded-3xl border border-navy-950/10 p-5 sm:p-7"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.28em] text-navy-950/50 font-semibold mb-1">
                            Monthly Growth Trends
                          </div>
                          <h3 className="font-display text-lg font-bold text-navy-950">
                            Activity across desks
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.14em]">
                          <span className="flex items-center gap-1.5 text-navy-950/60">
                            <span className="w-2 h-2 rounded-sm bg-gold" /> Services
                          </span>
                          <span className="flex items-center gap-1.5 text-navy-950/60">
                            <span className="w-2 h-2 rounded-sm bg-royal-light" /> Enquiries
                          </span>
                          <span className="flex items-center gap-1.5 text-navy-950/60">
                            <span className="w-2 h-2 rounded-sm bg-emerald-500" /> Members
                          </span>
                        </div>
                      </div>
                      <MonthlyTrendChart data={data.monthlyTrend} uid={uid} />
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="lg:col-span-5 flex flex-col gap-5"
                    >
                      <MembersOnlyRevenueCard />
                      <div className="glass-light rounded-3xl border border-navy-950/10 p-5 flex-1 min-h-[180px] relative overflow-hidden">
                        <div className="text-[10px] uppercase tracking-[0.28em] text-navy-950/50 font-semibold mb-2">
                          Global Activity Network
                        </div>
                        <div className="absolute inset-0 top-8 opacity-90">
                          <GlobalActivityMap nodes={data.globalNodes} uid={uid} />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Summary strip + activity timeline */}
                  <motion.div
                    className="grid lg:grid-cols-12 gap-5 lg:gap-6 mb-10 lg:mb-12"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={containerVariants}
                  >
                    <motion.div
                      variants={itemVariants}
                      className="lg:col-span-5 grid grid-cols-2 gap-3"
                    >
                      {[
                        {
                          label: "Services this month",
                          value: data.summary.servicesDelivered,
                          icon: "fa-briefcase",
                        },
                        {
                          label: "Members onboarded",
                          value: data.summary.membersOnboarded,
                          icon: "fa-user-plus",
                        },
                        {
                          label: "Trade enquiries",
                          value: data.summary.tradeEnquiries,
                          icon: "fa-envelope",
                        },
                        {
                          label: "Global collaborations",
                          value: data.summary.collaborations,
                          icon: "fa-globe",
                        },
                      ].map((s) => (
                        <div
                          key={s.label}
                          className="rounded-2xl border border-navy-950/10 bg-navy-950/[0.02] px-4 py-4 hover:border-gold/30 transition"
                        >
                          <i className={cx("fas", s.icon, "text-gold text-sm mb-2")} aria-hidden />
                          <div className="font-display text-xl font-bold text-navy-950">
                            <AnimatedCounter to={s.value} />
                          </div>
                          <div className="text-[10px] uppercase tracking-[0.16em] text-navy-950/50 mt-1">
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="lg:col-span-7 glass-light rounded-3xl border border-navy-950/10 p-5 sm:p-6"
                    >
                      <div className="flex items-center justify-between gap-4 mb-5">
                        <h3 className="font-display text-lg font-bold text-navy-950">
                          Member activity timeline
                        </h3>
                        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-emerald-600 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live feed
                        </span>
                      </div>
                      <ul className="space-y-3">
                        {data.activities.map((a, i) => (
                          <motion.li
                            key={a.id}
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }}
                            className="flex items-start gap-3 p-3 rounded-xl border border-navy-950/8 hover:border-gold/25 hover:bg-gold/[0.03] transition group"
                          >
                            <span className="w-9 h-9 rounded-lg bg-royal/10 border border-royal/15 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:border-gold/30 transition">
                              <i
                                className={cx("fas", a.icon, "text-royal text-xs group-hover:text-navy-950")}
                                aria-hidden
                              />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-semibold text-navy-950 leading-snug">
                                {a.title}
                              </div>
                              <div className="flex flex-wrap gap-2 mt-1 text-[10px] uppercase tracking-[0.14em] text-navy-950/45">
                                <span>{a.category}</span>
                                <span>·</span>
                                <span>{a.time}</span>
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                </>
              )}

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cx(
                  "flex flex-col sm:flex-row items-center justify-center gap-4",
                  preview ? "mt-8" : "mt-4",
                )}
              >
                {!preview && (
                  <Link
                    href="/services/monthlyServices"
                    className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-navy-950 text-white text-sm font-semibold border border-navy-950/10 hover:border-gold/40 hover:shadow-gold transition-all duration-300"
                  >
                    View Full Dashboard
                    <i className="fas fa-chart-line text-[10px] text-gold" aria-hidden />
                  </Link>
                )}
                <Link
                  href="#membership"
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold shadow-gold hover:scale-[1.02] transition"
                >
                  Become a Member
                  <i className="fas fa-arrow-right text-xs" aria-hidden />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-navy-950/5 border border-navy-950/10 text-navy-950 text-sm font-semibold hover:border-gold/40 transition"
                >
                  Explore Services
                  <i className="fas fa-briefcase text-[10px] text-gold" aria-hidden />
                </Link>
              </motion.div>

              {preview && (
                <p className="text-center mt-6">
                  <Link
                    href="/services/monthlyServices"
                    className="text-gold text-sm font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    View full performance dashboard
                    <i className="fas fa-arrow-right text-[10px]" aria-hidden />
                  </Link>
                </p>
              )}
            </>
          )
        )}
      </div>
    </section>
  );
}

export default function MonthlyServicesPage() {
  return (
    <main>
      <MonthlyPerformanceSection />
    </main>
  );
}
