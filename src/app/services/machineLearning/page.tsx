"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";

/* ============================================================
   Data — replace fetchAICapabilities() with CMS/API
   ============================================================ */

export type AICapability = {
  id: string;
  title: string;
  desc: string;
  icon: string;
  tag: string;
  accent: string;
  metric: string;
  metricLabel: string;
};

const ECOSYSTEM_PILLARS = [
  "AI-driven trade solutions",
  "Smart business matchmaking",
  "Intelligent member support",
  "Automated trade assistance",
  "Predictive business insights",
  "Future-ready trade ecosystem",
] as const;

const AI_CAPABILITIES: AICapability[] = [
  {
    id: "assistant",
    title: "AI Trade Assistant & Concierge",
    desc: "24/7 multilingual concierge for trade queries, documentation guidance, and member onboarding.",
    icon: "fa-robot",
    tag: "Concierge",
    accent: "from-royal-light/30 via-cyan-400/15 to-gold/15",
    metric: "24/7",
    metricLabel: "Live assist",
  },
  {
    id: "matchmaking",
    title: "Smart Buyer–Seller Matchmaking",
    desc: "ML-powered partner scoring across HS codes, regions, and trust signals for high-fit introductions.",
    icon: "fa-users-gear",
    tag: "Matchmaking",
    accent: "from-gold/25 via-royal/15 to-emerald-400/15",
    metric: "92%",
    metricLabel: "Match precision",
  },
  {
    id: "insights",
    title: "AI Market & Trade Insights",
    desc: "Real-time corridor intelligence, demand signals, and sector briefings for 50+ markets.",
    icon: "fa-chart-line",
    tag: "Intelligence",
    accent: "from-emerald-400/20 via-gold/15 to-royal-light/20",
    metric: "50+",
    metricLabel: "Markets tracked",
  },
  {
    id: "queries",
    title: "Automated Query Handling",
    desc: "Instant routing of member enquiries to desks, FAQs, and escalation workflows.",
    icon: "fa-comments",
    tag: "Automation",
    accent: "from-royal/25 via-gold/20 to-transparent",
    metric: "<2m",
    metricLabel: "Avg response",
  },
  {
    id: "compliance",
    title: "Intelligent Compliance Guidance",
    desc: "AI-assisted checks for documentation, sanctions screening, and regulatory pathways.",
    icon: "fa-shield-halved",
    tag: "Compliance",
    accent: "from-gold/20 via-royal-light/15 to-emerald-400/10",
    metric: "100+",
    metricLabel: "Rule sets",
  },
  {
    id: "analytics",
    title: "Predictive Trade Analytics",
    desc: "Forecast demand, pricing volatility, and shipment risk with enterprise-grade models.",
    icon: "fa-brain",
    tag: "Analytics",
    accent: "from-cyan-400/20 via-gold/25 to-royal/15",
    metric: "18mo",
    metricLabel: "Forecast horizon",
  },
];

const ASSISTANT_DEMO_LINES = [
  "Analyzing GCC import demand for your HS code…",
  "3 verified buyers match your export profile.",
  "Compliance checklist generated for EU corridor.",
  "Predicted freight savings: 12% on next shipment.",
] as const;

async function fetchAICapabilities(): Promise<{ capabilities: AICapability[] }> {
  return { capabilities: AI_CAPABILITIES };
}

/* ============================================================
   Motion
   ============================================================ */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
  },
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ============================================================
   Visuals
   ============================================================ */

function AIDigitalBackdrop({ uid }: { uid: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className="absolute inset-0 w-full h-full opacity-[0.1] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id={`ai-glow-${uid}`} cx="55%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
          <stop offset="35%" stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#d4af37" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
        <pattern id={`ai-grid-${uid}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(34,211,238,0.08)" strokeWidth="0.5" />
        </pattern>
        <linearGradient id={`ai-flow-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(34,211,238,0)" />
          <stop offset="50%" stopColor="rgba(212,175,55,0.7)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0.5)" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#ai-glow-${uid})`} />
      <rect width="1600" height="900" fill={`url(#ai-grid-${uid})`} />
      <g fill="none" stroke={`url(#ai-flow-${uid})`} strokeWidth="0.9">
        <path d="M 200 500 Q 500 200, 800 400 T 1400 300" />
        <path d="M 150 600 Q 450 350, 750 520 T 1350 480" />
        <path d="M 300 350 Q 600 150, 950 280 T 1500 380" />
      </g>
    </svg>
  );
}

function FloatingDataIndicators() {
  const items = [
    { left: "8%", top: "20%", label: "LIVE", delay: 0 },
    { left: "78%", top: "18%", label: "ML", delay: 0.6 },
    { left: "88%", top: "55%", label: "API", delay: 1.2 },
    { left: "12%", top: "62%", label: "NLP", delay: 0.9 },
  ];
  return (
    <motion.div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {items.map((p, i) => (
        <motion.div
          key={p.label}
          className="absolute px-2 py-0.5 rounded-md border border-cyan-400/25 bg-cyan-400/10 text-[8px] uppercase tracking-[0.2em] text-cyan-200/80 font-semibold"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -10, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: p.delay }}
        >
          {p.label}
        </motion.div>
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={`p-${i}`}
          className="absolute w-1 h-1 rounded-full bg-gold/50"
          style={{ left: `${14 + i * 18}%`, top: `${25 + (i % 3) * 20}%` }}
          animate={{ y: [0, -12, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 5 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </motion.div>
  );
}

const NEURAL_NODES = [
  { x: 120, y: 80, r: 5 },
  { x: 220, y: 140, r: 4 },
  { x: 180, y: 220, r: 5 },
  { x: 320, y: 100, r: 4 },
  { x: 400, y: 180, r: 6 },
  { x: 500, y: 120, r: 4 },
  { x: 580, y: 200, r: 5 },
  { x: 460, y: 260, r: 4 },
  { x: 300, y: 300, r: 4 },
];

const NEURAL_EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [4, 5],
  [4, 6],
  [4, 7],
  [2, 7],
  [7, 8],
  [3, 8],
  [5, 6],
];

function NeuralNetworkViz({ uid, compact }: { uid: string; compact?: boolean }) {
  return (
    <svg
      viewBox="0 0 640 340"
      className={cx("w-full", compact ? "h-[200px]" : "h-full min-h-[260px]")}
      role="img"
      aria-label="AI neural trade network visualization"
    >
      <defs>
        <radialGradient id={`nn-hub-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`nn-edge-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#d4af37" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect width="640" height="340" fill={`url(#nn-hub-${uid})`} />
      {NEURAL_EDGES.map(([a, b], i) => {
        const n1 = NEURAL_NODES[a];
        const n2 = NEURAL_NODES[b];
        return (
          <motion.line
            key={`${a}-${b}`}
            x1={n1.x}
            y1={n1.y}
            x2={n2.x}
            y2={n2.y}
            stroke={`url(#nn-edge-${uid})`}
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0.3 }}
            whileInView={{ pathLength: 1, opacity: 0.85 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.8 }}
          />
        );
      })}
      {NEURAL_NODES.map((n, i) => (
        <g key={i}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={n.r * 3}
            fill="rgba(34,211,238,0.08)"
            stroke="rgba(34,211,238,0.25)"
            strokeWidth="0.5"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.5 + i * 0.2, repeat: Infinity }}
          />
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={i === 4 ? "#d4af37" : "#22d3ee"}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2 + i * 0.15, repeat: Infinity }}
          />
        </g>
      ))}
      {/* Data flow pulse along central hub */}
      <motion.circle
        r="3"
        fill="#fff7d6"
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
        style={{
          offsetPath: `path('M ${NEURAL_NODES[0].x} ${NEURAL_NODES[0].y} Q 300 60 ${NEURAL_NODES[4].x} ${NEURAL_NODES[4].y} T ${NEURAL_NODES[6].x} ${NEURAL_NODES[6].y}')`,
        }}
      />
    </svg>
  );
}

function PredictiveChart({ uid }: { uid: string }) {
  const points = [40, 55, 48, 72, 65, 88, 82, 95, 90, 108];
  const w = 280;
  const h = 80;
  const max = Math.max(...points);
  const path = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - (v / max) * (h - 10) - 5;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20" aria-hidden>
      <defs>
        <linearGradient id={`chart-fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${path} L ${w} ${h} L 0 ${h} Z`}
        fill={`url(#chart-fill-${uid})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="#d4af37"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

function AIAssistantOrb() {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const line = ASSISTANT_DEMO_LINES[lineIndex];

  useEffect(() => {
    let i = 0;
    setDisplayText("");
    const type = setInterval(() => {
      i += 1;
      setDisplayText(line.slice(0, i));
      if (i >= line.length) clearInterval(type);
    }, 28);
    return () => clearInterval(type);
  }, [line]);

  useEffect(() => {
    const t = setTimeout(() => {
      setLineIndex((n) => (n + 1) % ASSISTANT_DEMO_LINES.length);
    }, 3200);
    return () => clearTimeout(t);
  }, [lineIndex]);

  return (
    <div className="relative rounded-2xl border border-cyan-400/20 bg-navy-950/90 p-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-gold/5 pointer-events-none" />
      <div className="flex items-start gap-3 relative">
        <motion.div
          className="relative shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
          animate={{
            boxShadow: [
              "0 0 20px rgba(34,211,238,0.35)",
              "0 0 36px rgba(212,175,55,0.45)",
              "0 0 20px rgba(34,211,238,0.35)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 to-gold/30 border border-cyan-400/40" />
          <motion.div
            className="absolute inset-1 rounded-full border border-white/20"
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <i className="fas fa-sparkles text-gold text-sm relative z-10" aria-hidden />
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-300/80 font-semibold mb-1.5">
            IICCI AI Trade Assistant
          </div>
          <p className="text-sm text-white/80 leading-relaxed font-mono min-h-[2.5rem]">
            {displayText}
            <motion.span
              className="inline-block w-0.5 h-4 bg-gold ml-0.5 align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </p>
        </div>
      </div>
    </div>
  );
}

function TradeIntelligenceMap({ uid }: { uid: string }) {
  const hubs = [
    { x: 100, y: 90, label: "EU" },
    { x: 280, y: 70, label: "GCC" },
    { x: 420, y: 130, label: "INDIA" },
    { x: 560, y: 95, label: "ASEAN" },
    { x: 200, y: 200, label: "US" },
    { x: 500, y: 210, label: "AFRICA" },
  ];
  const center = hubs[2];

  return (
    <svg viewBox="0 0 640 260" className="w-full h-32" aria-hidden>
      <defs>
        <linearGradient id={`tim-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="50%" stopColor="#d4af37" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      {hubs
        .filter((h) => h.label !== "INDIA")
        .map((d, i) => {
          const path = `M ${center.x} ${center.y} Q ${(center.x + d.x) / 2} ${Math.min(center.y, d.y) - 40} ${d.x} ${d.y}`;
          return (
            <g key={d.label}>
              <path d={path} stroke={`url(#tim-${uid})`} strokeWidth="0.9" fill="none" opacity="0.7" />
              <motion.circle
                r="2"
                fill="#fff7d6"
                animate={{ offsetDistance: ["0%", "100%"] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.35 }}
                style={{ offsetPath: `path('${path}')` }}
              />
              <circle cx={d.x} cy={d.y} r="2.5" fill="#22d3ee" />
            </g>
          );
        })}
      <circle cx={center.x} cy={center.y} r="6" fill="#d4af37" />
    </svg>
  );
}

/* ============================================================
   Cards
   ============================================================ */

function AIFeatureCard({
  cap,
  index,
  active,
  onHover,
}: {
  cap: AICapability;
  index: number;
  active: boolean;
  onHover: (id: string | null) => void;
}) {
  return (
    <motion.article
      variants={itemVariants}
      onMouseEnter={() => onHover(cap.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(cap.id)}
      onBlur={() => onHover(null)}
      whileHover={{ y: -4 }}
      className={cx(
        "group relative glass-dark rounded-2xl border p-5 lg:p-6 overflow-hidden transition-all duration-400 h-full flex flex-col",
        active
          ? "border-cyan-400/40 shadow-[0_0_32px_rgba(34,211,238,0.15)]"
          : "border-white/10 hover:border-gold/35",
      )}
    >
      <div
        className={cx(
          "absolute inset-0 bg-gradient-to-br opacity-40 pointer-events-none transition-opacity duration-400",
          cap.accent,
          active && "opacity-70",
        )}
      />
      <div className="relative flex items-start justify-between gap-3 mb-4">
        <div
          className={cx(
            "w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-400",
            active
              ? "bg-cyan-400/20 border-cyan-400/40"
              : "bg-royal/15 border-royal-light/25 group-hover:border-gold/40",
          )}
        >
          <i
            className={cx(
              "fas",
              cap.icon,
              "text-sm",
              active ? "text-cyan-300" : "text-royal-light group-hover:text-gold",
            )}
            aria-hidden
          />
        </div>
        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] uppercase tracking-[0.14em] text-white/50">
          {cap.tag}
        </span>
      </div>
      <h3 className="relative font-display font-bold text-white text-base mb-2 leading-snug">
        {cap.title}
      </h3>
      <p className="relative text-white/55 text-xs leading-relaxed flex-1 mb-4">{cap.desc}</p>
      <div className="relative flex items-end justify-between pt-3 border-t border-white/10">
        <div>
          <div className="font-display text-xl font-bold text-gold">{cap.metric}</div>
          <div className="text-[9px] uppercase tracking-[0.16em] text-white/45">{cap.metricLabel}</div>
        </div>
        <i
          className="fas fa-arrow-right text-[10px] text-white/30 group-hover:text-gold group-hover:translate-x-1 transition"
          aria-hidden
        />
      </div>
    </motion.article>
  );
}

/* ============================================================
   Main Section
   ============================================================ */

export function AIMachineLearningSection({ preview = false }: { preview?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const [activeId, setActiveId] = useState<string | null>(AI_CAPABILITIES[0].id);
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInView = useInView(chartRef, { once: true, margin: "-40px" });

  useEffect(() => {
    fetchAICapabilities();
  }, []);

  const capabilities = preview ? AI_CAPABILITIES.slice(0, 4) : AI_CAPABILITIES;

  return (
    <section
      id="ai-machine-learning"
      aria-labelledby="ai-machine-learning-heading"
      className={cx(
        "relative overflow-hidden bg-gradient-to-b from-navy-950 via-[#0a1628] to-navy-950 border-t border-white/10",
        preview ? "py-16 lg:py-20" : "section-padding",
      )}
    >
      <AIDigitalBackdrop uid={uid} />
      <div className="absolute inset-0 bg-grid opacity-[0.07] pointer-events-none" />
      <FloatingDataIndicators />
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] rounded-full bg-cyan-400/[0.06] blur-[100px] pointer-events-none"
        animate={{ opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 9, repeat: Infinity }}
        aria-hidden
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gold/[0.05] blur-[120px] pointer-events-none"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
        aria-hidden
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 z-10">
        {/* Header */}
        <motion.div
          className="grid lg:grid-cols-12 gap-10 items-end mb-10 lg:mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          <div className="lg:col-span-7">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-5 border border-cyan-400/20"
            >
              <i className="fas fa-microchip text-cyan-300 text-xs" aria-hidden />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/85 font-semibold">
                Smart Technology
              </span>
              <span className="h-3 w-px bg-white/15" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold/90 font-semibold">
                AI Platform
              </span>
            </motion.div>
            <motion.h2
              id="ai-machine-learning-heading"
              variants={itemVariants}
              className="display-title font-display font-bold leading-[1.04]"
            >
              <span className="text-white">AI &amp; Machine</span>{" "}
              <span className="text-gradient-gold italic font-serif font-normal">
                Learning.
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-white/60 text-sm md:text-base mt-4 max-w-xl">
              Smart Technology Powering Global Trade
            </motion.p>
          </div>
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <p className="text-white/55 text-sm leading-relaxed">
              IICCI&apos;s intelligent trade ecosystem — automation, predictive insights, and
              AI-powered member experiences built for global enterprise.
            </p>
          </motion.div>
        </motion.div>

        {/* Pillars */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10 lg:mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {ECOSYSTEM_PILLARS.map((p) => (
            <motion.span
              key={p}
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 text-[10px] uppercase tracking-[0.12em] text-white/55 hover:border-cyan-400/30 transition"
            >
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
              {p}
            </motion.span>
          ))}
        </motion.div>

        {/* Dashboard split */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Visualization panel */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-5 relative glass-dark rounded-3xl border border-white/10 p-6 lg:p-8 overflow-hidden order-2 lg:order-1"
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-cyan-400/10 blur-[60px]" />
            <div className="text-[10px] uppercase tracking-[0.28em] text-cyan-300/80 font-semibold mb-4">
              Intelligence dashboard
            </div>
            <div className="rounded-2xl border border-white/10 bg-navy-950/80 p-3 mb-4">
              <NeuralNetworkViz uid={uid} compact={preview} />
            </div>
            <AIAssistantOrb />
            <div className="mt-4" ref={chartRef}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/45">
                  Predictive trade index
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">+18% YoY</span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={chartInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
              >
                <PredictiveChart uid={uid} />
              </motion.div>
            </div>
            {!preview && (
              <div className="mt-4 rounded-xl border border-white/10 bg-navy-900/60 p-3">
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-2">
                  Trade intelligence map
                </div>
                <TradeIntelligenceMap uid={uid} />
              </div>
            )}
          </motion.div>

          {/* Feature cards */}
          <motion.div
            className="lg:col-span-7 order-1 lg:order-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <div
              className={cx(
                "grid gap-4",
                preview ? "sm:grid-cols-2" : "sm:grid-cols-2 xl:grid-cols-2",
              )}
            >
              {capabilities.map((cap, i) => (
                <AIFeatureCard
                  key={cap.id}
                  cap={cap}
                  index={i}
                  active={activeId === cap.id}
                  onHover={setActiveId}
                />
              ))}
            </div>

            {/* Workflow strip */}
            {!preview && (
              <motion.div
                variants={itemVariants}
                className="mt-6 glass rounded-2xl border border-white/10 p-5 flex flex-wrap items-center justify-center gap-6 lg:gap-10"
              >
                {[
                  { icon: "fa-database", label: "Ingest" },
                  { icon: "fa-gears", label: "Process" },
                  { icon: "fa-wand-magic-sparkles", label: "Predict" },
                  { icon: "fa-handshake", label: "Match" },
                  { icon: "fa-chart-pie", label: "Insight" },
                ].map((step, i) => (
                  <div key={step.label} className="flex items-center gap-6">
                    <motion.div
                      className="flex flex-col items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center">
                        <i className={cx("fas", step.icon, "text-cyan-300 text-sm")} aria-hidden />
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.16em] text-white/50">
                        {step.label}
                      </span>
                    </motion.div>
                    {i < 4 && (
                      <motion.i
                        className="fas fa-chevron-right text-gold/40 text-xs hidden sm:block"
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        aria-hidden
                      />
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-navy-900 via-royal-dark to-navy-950 p-8 lg:p-10 mt-10 lg:mt-12"
        >
          <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden />
          <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Experience{" "}
                <span className="text-gradient-gold italic font-serif font-normal">
                  intelligent trade.
                </span>
              </h3>
              <p className="text-white/55 text-sm max-w-xl">
                Deploy AI across matchmaking, compliance, analytics, and member support — built
                for IICCI&apos;s global business network.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/services/machineLearning#ai-assistant"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold shadow-gold hover:scale-[1.02] transition"
              >
                Try AI Trade Assistant
                <i className="fas fa-sparkles text-xs" aria-hidden />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white text-sm font-semibold hover:border-cyan-400/40 transition"
              >
                Explore Smart Services
                <i className="fas fa-microchip text-xs text-cyan-300" aria-hidden />
              </Link>
              <Link
                href="/services/machineLearning"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/[0.04] border border-white/10 text-white text-sm font-semibold hover:border-gold/30 transition"
              >
                Discover AI Insights
                <i className="fas fa-arrow-right text-xs text-gold" aria-hidden />
              </Link>
            </div>
          </div>
        </motion.div>

        {preview && (
          <p className="text-center mt-8">
            <Link
              href="/services/machineLearning"
              className="text-gold text-sm font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              Explore full AI &amp; ML ecosystem
              <i className="fas fa-arrow-right text-[10px]" aria-hidden />
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

export default function MachineLearningPage() {
  return (
    <main>
      <div id="ai-assistant" className="scroll-mt-28" />
      <AIMachineLearningSection />
    </main>
  );
}
