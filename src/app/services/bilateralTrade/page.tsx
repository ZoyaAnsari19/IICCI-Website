"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from "framer-motion";

/* ============================================================
   Data — replace fetchBilateralTutorialData() with CMS/API
   ============================================================ */

export type LearningMode = "beginner" | "professional";

export type TutorialStep = {
  id: string;
  step: number;
  title: string;
  shortLabel: string;
  icon: string;
  accent: string;
  beginner: {
    summary: string;
    bullets: string[];
    insight: string;
  };
  professional: {
    summary: string;
    bullets: string[];
    insight: string;
  };
  routeLabel: string;
};

const AUDIENCE_TAGS = [
  { label: "Entrepreneurs", icon: "fa-lightbulb" },
  { label: "Students", icon: "fa-user-graduate" },
  { label: "Startups", icon: "fa-rocket" },
  { label: "Importers / Exporters", icon: "fa-ship" },
  { label: "Business Professionals", icon: "fa-briefcase" },
] as const;

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: "understanding",
    step: 1,
    title: "Understanding Bilateral Trade",
    shortLabel: "Basics",
    icon: "fa-handshake",
    accent: "from-royal-light/30 to-gold/20",
    routeLabel: "Policy & agreements",
    beginner: {
      summary:
        "Bilateral trade is commerce between two nations governed by preferential agreements, tariffs, and institutional frameworks.",
      bullets: [
        "Two-country focus vs multilateral trade blocs",
        "How FTAs and trade pacts reduce barriers",
        "Role of chambers, trade desks, and policy",
      ],
      insight: "Start by mapping which country pair your business targets and which agreement applies.",
    },
    professional: {
      summary:
        "Analyze treaty schedules, rules of origin, and sectoral concessions before structuring cross-border deals.",
      bullets: [
        "Treaty interpretation & HS classification alignment",
        "Sanctions screening and dual-use controls",
        "Institutional liaison with trade commissions",
      ],
      insight: "Treat bilateral frameworks as the legal spine of every export–import contract.",
    },
  },
  {
    id: "opportunities",
    step: 2,
    title: "Identifying Import–Export Opportunities",
    shortLabel: "Opportunities",
    icon: "fa-magnifying-glass-chart",
    accent: "from-gold/25 to-emerald-400/15",
    routeLabel: "Market discovery",
    beginner: {
      summary:
        "Discover demand signals, product gaps, and partner markets using trade data, delegations, and sector reports.",
      bullets: [
        "Read trade statistics & import demand dashboards",
        "Attend buyer–seller meets and trade fairs",
        "Validate product–market fit with samples",
      ],
      insight: "Opportunity discovery is continuous — revisit quarterly as tariffs and demand shift.",
    },
    professional: {
      summary:
        "Build opportunity pipelines using HS-level analytics, competitor mapping, and verified buyer databases.",
      bullets: [
        "Comtrade / DGFT analytics & sector deep-dives",
        "Partner due diligence & creditworthiness checks",
        "Pilot shipments & MOQ validation protocols",
      ],
      insight: "Prioritize markets with treaty advantage and logistics maturity for your category.",
    },
  },
  {
    id: "documentation",
    step: 3,
    title: "Trade Documentation & Compliance",
    shortLabel: "Compliance",
    icon: "fa-file-contract",
    accent: "from-royal/25 to-gold/15",
    routeLabel: "Docs & clearance",
    beginner: {
      summary:
        "Every shipment needs accurate documents — invoices, packing lists, certificates, and regulatory filings.",
      bullets: [
        "Commercial invoice & packing list essentials",
        "Certificate of origin & quality certificates",
        "Export–import codes and basic compliance",
      ],
      insight: "One documentation error can delay cargo for weeks — use checklists per destination.",
    },
    professional: {
      summary:
        "Orchestrate documentary credit terms, customs declarations, and regulatory filings across jurisdictions.",
      bullets: [
        "LC / UCP 600 alignment & document scrutiny",
        "ICEGATE / customs filing & audit trails",
        "Product-specific licenses (FSSAI, BIS, etc.)",
      ],
      insight: "Automate document generation but retain expert review for first-time corridors.",
    },
  },
  {
    id: "payments",
    step: 4,
    title: "International Payment Methods",
    shortLabel: "Payments",
    icon: "fa-money-bill-transfer",
    accent: "from-emerald-400/20 to-gold/20",
    routeLabel: "Settlement rails",
    beginner: {
      summary:
        "Learn how exporters get paid safely — advance, open account, documentary collection, and letters of credit.",
      bullets: [
        "Advance payment vs payment after shipment",
        "What is a Letter of Credit (LC)?",
        "Forex basics and banking intermediaries",
      ],
      insight: "Match payment terms to trust level — never ship high-value cargo without protection.",
    },
    professional: {
      summary:
        "Structure settlement mechanisms balancing counterparty risk, cash flow, and Incoterms allocation.",
      bullets: [
        "LC variants, UCP 600 discrepancies & amendments",
        "Trade finance: factoring, forfaiting, ECGC cover",
        "FX hedging & multi-currency invoicing",
      ],
      insight: "Payment method is a risk instrument — negotiate it as carefully as price.",
    },
  },
  {
    id: "logistics",
    step: 5,
    title: "Logistics & Customs Process",
    shortLabel: "Logistics",
    icon: "fa-truck-fast",
    accent: "from-royal-light/20 to-emerald-400/15",
    routeLabel: "Freight & customs",
    beginner: {
      summary:
        "Goods move via sea, air, or land — each mode has costs, timelines, and customs checkpoints.",
      bullets: [
        "Choosing freight forwarders & Incoterms",
        "Port handling, warehousing & last-mile",
        "Customs clearance steps at destination",
      ],
      insight: "Logistics cost often decides deal viability — quote freight before final pricing.",
    },
    professional: {
      summary:
        "Optimize multimodal routing, bonded warehousing, and customs brokerage for time–cost efficiency.",
      bullets: [
        "Incoterms 2020 risk transfer optimization",
        "3PL SLAs, container planning & demurrage control",
        "AEO benefits & advance rulings where available",
      ],
      insight: "Integrate logistics milestones into contract KPIs and buyer communication cadence.",
    },
  },
  {
    id: "matchmaking",
    step: 6,
    title: "Business Matchmaking & Negotiation",
    shortLabel: "Matchmaking",
    icon: "fa-users-gear",
    accent: "from-gold/30 to-royal/15",
    routeLabel: "Partners & deals",
    beginner: {
      summary:
        "Chambers and trade platforms connect you with verified buyers, suppliers, and joint-venture partners.",
      bullets: [
        "Prepare a crisp company profile & pitch deck",
        "Negotiate price, MOQ, delivery & payment terms",
        "Use mediators for cross-cultural deal-making",
      ],
      insight: "Relationship capital matters — follow up consistently after every introduction.",
    },
    professional: {
      summary:
        "Run structured B2B pipelines with term sheets, exclusivity clauses, and dispute-resolution frameworks.",
      bullets: [
        "Due diligence packs & reference trade history",
        "Contract drafting with governing law clauses",
        "Arbitration / mediation pathways (ICC, SIAC)",
      ],
      insight: "Document every verbal commitment in writing before production or shipment.",
    },
  },
  {
    id: "execution",
    step: 7,
    title: "Deal Finalization & Execution",
    shortLabel: "Execution",
    icon: "fa-circle-check",
    accent: "from-emerald-400/25 to-gold/25",
    routeLabel: "Close & scale",
    beginner: {
      summary:
        "Close the deal with signed contracts, executed payments, shipped goods, and post-sale support.",
      bullets: [
        "Contract signing & order confirmation",
        "Production, QC, packing & shipment booking",
        "After-sales service & repeat-order planning",
      ],
      insight: "Your first successful shipment builds reputation — over-deliver on communication.",
    },
    professional: {
      summary:
        "Execute with milestone billing, performance bonds, insurance, and scalable supply-chain playbooks.",
      bullets: [
        "Milestone-based invoicing & inspection protocols",
        "Marine / cargo insurance & claims management",
        "Scale playbook: agents, JVs & regional hubs",
      ],
      insight: "Treat execution data as IP — refine playbooks for each bilateral corridor.",
    },
  },
];

async function fetchBilateralTutorialData(): Promise<{ steps: TutorialStep[] }> {
  return { steps: TUTORIAL_STEPS };
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

function TradeRouteBackdrop({ uid }: { uid: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className="absolute inset-0 w-full h-full opacity-[0.09] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id={`bt-glow-${uid}`} cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
          <stop offset="40%" stopColor="#d4af37" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`bt-arc-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(212,175,55,0)" />
          <stop offset="50%" stopColor="rgba(212,175,55,0.65)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0.4)" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#bt-glow-${uid})`} />
      <g fill="none" strokeWidth="1">
        <path d="M 200 420 Q 500 180, 800 400" stroke={`url(#bt-arc-${uid})`} />
        <path d="M 800 400 Q 1100 200, 1400 350" stroke={`url(#bt-arc-${uid})`} />
        <path d="M 800 400 Q 1050 650, 1350 720" stroke={`url(#bt-arc-${uid})`} />
        <path d="M 800 400 Q 450 620, 150 680" stroke={`url(#bt-arc-${uid})`} />
      </g>
      <g fill="rgba(212,175,55,0.5)">
        <circle cx="800" cy="400" r="6" fill="#d4af37" />
        {[
          [200, 420],
          [1400, 350],
          [1350, 720],
          [150, 680],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" />
        ))}
      </g>
    </svg>
  );
}

function BilateralTradeMap({ uid, activeStep }: { uid: string; activeStep: number }) {
  const hubs = [
    { x: 140, y: 120, label: "Americas" },
    { x: 300, y: 95, label: "Europe" },
    { x: 480, y: 140, label: "GCC" },
    { x: 620, y: 210, label: "India" },
    { x: 780, y: 120, label: "ASEAN" },
    { x: 860, y: 280, label: "East Asia" },
    { x: 400, y: 310, label: "Africa" },
  ];
  const hub = hubs[3];

  return (
    <svg
      viewBox="0 0 960 400"
      className="w-full h-full min-h-[220px]"
      role="img"
      aria-label="Global bilateral trade routes visualization"
    >
      <defs>
        <radialGradient id={`bt-map-${uid}`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`bt-route-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
          <stop offset="50%" stopColor="#d4af37" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="960" height="400" fill={`url(#bt-map-${uid})`} />
      <g fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5">
        <ellipse cx="180" cy="130" rx="70" ry="55" />
        <ellipse cx="320" cy="110" rx="55" ry="40" />
        <ellipse cx="500" cy="200" rx="90" ry="70" />
        <ellipse cx="750" cy="150" rx="80" ry="50" />
        <ellipse cx="420" cy="300" rx="60" ry="80" />
      </g>
      {hubs
        .filter((h) => h.label !== "India")
        .map((d, i) => {
          const cx1 = (hub.x + d.x) / 2;
          const cy1 = Math.min(hub.y, d.y) - 60 - activeStep * 4;
          const path = `M ${hub.x} ${hub.y} Q ${cx1} ${cy1} ${d.x} ${d.y}`;
          const lit = i <= activeStep;
          return (
            <g key={d.label}>
              <path
                d={path}
                stroke={`url(#bt-route-${uid})`}
                strokeWidth={lit ? 1.4 : 0.6}
                fill="none"
                opacity={lit ? 1 : 0.35}
              />
              {lit && (
                <motion.circle
                  r="2.5"
                  fill="#fff7d6"
                  animate={{ offsetDistance: ["0%", "100%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                  style={{ offsetPath: `path('${path}')` }}
                />
              )}
              <circle cx={d.x} cy={d.y} r="3" fill={lit ? "#d4af37" : "rgba(212,175,55,0.35)"} />
              <text
                x={d.x}
                y={d.y - 10}
                textAnchor="middle"
                fill={lit ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.35)"}
                style={{ font: "500 8px sans-serif", letterSpacing: "0.14em" }}
              >
                {d.label.toUpperCase()}
              </text>
            </g>
          );
        })}
      <motion.circle
        cx={hub.x}
        cy={hub.y}
        r="28"
        fill="rgba(212,175,55,0.12)"
        stroke="rgba(212,175,55,0.5)"
        strokeWidth="0.8"
        animate={{ r: [26, 32, 26] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <circle cx={hub.x} cy={hub.y} r="6" fill="#d4af37" />
      <text
        x={hub.x}
        y={hub.y + 24}
        textAnchor="middle"
        fill="white"
        style={{ font: "600 10px sans-serif", letterSpacing: "0.2em" }}
      >
        TRADE HUB
      </text>
    </svg>
  );
}

function FloatingParticles() {
  return (
    <motion.div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/40"
          style={{ left: `${10 + i * 15}%`, top: `${18 + (i % 3) * 22}%` }}
          animate={{ y: [0, -14, 0], opacity: [0.2, 0.65, 0.2] }}
          transition={{ duration: 4.5 + i * 0.5, repeat: Infinity, delay: i * 0.35 }}
        />
      ))}
    </motion.div>
  );
}

/* ============================================================
   Tutorial UI
   ============================================================ */

function LearningModeToggle({
  mode,
  onChange,
}: {
  mode: LearningMode;
  onChange: (m: LearningMode) => void;
}) {
  return (
    <div
      className="inline-flex w-fit max-w-full shrink-0 p-0.5 rounded-full glass border border-white/10"
      role="group"
      aria-label="Learning mode"
    >
      {(["beginner", "professional"] as const).map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => onChange(m)}
          className={cx(
            "px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.14em] font-semibold whitespace-nowrap transition-all duration-300",
            mode === m
              ? "bg-gradient-gold text-navy-950 shadow-gold"
              : "text-white/55 hover:text-white",
          )}
        >
          {m === "beginner" ? "Beginner" : "Professional"}
        </button>
      ))}
    </div>
  );
}

function TutorialStepButton({
  step,
  isActive,
  isComplete,
  onClick,
  compact = false,
}: {
  step: TutorialStep;
  isActive: boolean;
  isComplete: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cx(
        "relative group text-left rounded-2xl border transition-all duration-400",
        compact ? "p-3 w-full" : "p-4 flex-1 min-w-0",
        isActive
          ? "border-gold/50 bg-gold/[0.08] shadow-[0_0_24px_rgba(212,175,55,0.2)]"
          : "border-white/10 bg-white/[0.02] hover:border-gold/30",
        isComplete && !isActive && "border-emerald-400/25",
      )}
      aria-current={isActive ? "step" : undefined}
    >
      <div className="flex items-center gap-3">
        <div
          className={cx(
            "relative shrink-0 rounded-xl flex items-center justify-center border",
            compact ? "w-11 h-11" : "w-12 h-12",
            isActive ? "border-gold shadow-[0_0_16px_rgba(212,175,55,0.35)]" : "border-gold/30",
          )}
        >
          <div className={cx("absolute inset-0 rounded-xl bg-gradient-to-br opacity-50", step.accent)} />
          <i className={cx("fas", step.icon, "relative text-gold text-sm")} aria-hidden />
          <span
            className={cx(
              "absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center",
              isComplete ? "bg-emerald-400 text-navy-950" : "bg-gold text-navy-950",
            )}
          >
            {isComplete && !isActive ? (
              <i className="fas fa-check text-[8px]" aria-hidden />
            ) : (
              step.step
            )}
          </span>
        </div>
        {!compact && (
          <div className="min-w-0 hidden xl:block">
            <div
              className={cx(
                "text-[10px] uppercase tracking-[0.16em] font-semibold truncate",
                isActive ? "text-gold" : "text-white/70",
              )}
            >
              {step.shortLabel}
            </div>
          </div>
        )}
        {compact && (
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase tracking-[0.14em] text-gold/80 font-semibold">
              Step {step.step}
            </div>
            <div className="text-sm font-display font-bold text-white leading-snug">{step.title}</div>
          </div>
        )}
      </div>
      {!compact && (
        <p className="mt-2 text-[10px] text-white/45 uppercase tracking-[0.12em] truncate hidden lg:block">
          {step.routeLabel}
        </p>
      )}
    </motion.button>
  );
}

function TutorialDetailPanel({
  step,
  mode,
}: {
  step: TutorialStep;
  mode: LearningMode;
}) {
  const content = mode === "beginner" ? step.beginner : step.professional;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${step.id}-${mode}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-2.5 py-1 rounded-full bg-royal/20 border border-royal-light/30 text-[9px] uppercase tracking-[0.18em] text-royal-light font-semibold">
            Step {step.step} of {TUTORIAL_STEPS.length}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-gold/10 border border-gold/25 text-[9px] uppercase tracking-[0.18em] text-gold font-semibold">
            {step.routeLabel}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] uppercase tracking-[0.18em] text-white/50">
            {mode} mode
          </span>
        </div>

        <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
          {step.title}
        </h3>
        <p className="text-white/65 text-sm md:text-base leading-relaxed mb-6">{content.summary}</p>

        <ul className="space-y-3 mb-6">
          {content.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-white/75">
              <span className="w-5 h-5 rounded-md bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                <i className="fas fa-check text-gold text-[9px]" aria-hidden />
              </span>
              {b}
            </li>
          ))}
        </ul>

        <div className="rounded-2xl border border-gold/20 bg-gold/[0.06] px-5 py-4">
          <div className="text-[10px] uppercase tracking-[0.22em] text-gold font-semibold mb-2">
            Pro insight
          </div>
          <p className="text-white/70 text-sm leading-relaxed italic font-serif">{content.insight}</p>
        </div>

        {/* Optional mini video placeholder */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-navy-900/80 overflow-hidden aspect-video max-h-[200px] flex items-center justify-center group cursor-default">
          <div className="text-center px-6">
            <motion.div
              className="w-14 h-14 rounded-full bg-gold/15 border border-gold/35 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/25 transition"
              whileHover={{ scale: 1.05 }}
            >
              <i className="fas fa-play text-gold ml-0.5" aria-hidden />
            </motion.div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">
              Explainer preview — full modules in training programs
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function TutorialNavigation({
  activeIndex,
  total,
  onPrev,
  onNext,
  onStart,
}: {
  activeIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onStart: () => void;
}) {
  const progress = ((activeIndex + 1) / total) * 100;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-white/10">
      <div className="flex-1">
        <div className="flex justify-between text-[10px] uppercase tracking-[0.18em] text-white/45 mb-2">
          <span>Learning progress</span>
          <span className="text-gold font-semibold">
            {Math.round(progress)}% · Step {activeIndex + 1}/{total}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-royal-light to-gold rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onPrev}
          disabled={activeIndex === 0}
          className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:border-gold/40 disabled:opacity-30 transition"
          aria-label="Previous step"
        >
          <i className="fas fa-chevron-left text-xs" aria-hidden />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={activeIndex === total - 1}
          className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:border-gold/40 disabled:opacity-30 transition"
          aria-label="Next step"
        >
          <i className="fas fa-chevron-right text-xs" aria-hidden />
        </button>
        {activeIndex === 0 && (
          <button
            type="button"
            onClick={onStart}
            className="ml-1 px-5 py-2.5 rounded-full bg-gradient-gold text-navy-950 text-[10px] uppercase tracking-[0.18em] font-bold shadow-gold hover:scale-[1.02] transition"
          >
            Start Learning
          </button>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Main Section
   ============================================================ */

export function BilateralTradeTutorialSection({ preview = false }: { preview?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<LearningMode>("beginner");
  const [maxReached, setMaxReached] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(scrollRef, { once: true, margin: "-40px" });

  useEffect(() => {
    fetchBilateralTutorialData();
  }, []);

  const steps = preview ? TUTORIAL_STEPS.slice(0, 4) : TUTORIAL_STEPS;
  const active = steps[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, steps.length - 1));
      setActiveIndex(clamped);
      setMaxReached((m) => Math.max(m, clamped));
    },
    [steps.length],
  );

  const handlePrev = () => goTo(activeIndex - 1);
  const handleNext = () => goTo(activeIndex + 1);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || typeof window === "undefined") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [activeIndex, goTo]);

  return (
    <section
      id="bilateral-trade-tutorial"
      aria-labelledby="bilateral-trade-tutorial-heading"
      className={cx(
        "relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 border-t border-white/10",
        preview ? "py-16 lg:py-20" : "page-nav-offset",
      )}
      ref={scrollRef}
      tabIndex={-1}
    >
      <TradeRouteBackdrop uid={uid} />
      <div className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none" />
      <FloatingParticles />
      <motion.div
        className="absolute top-1/3 -left-40 w-[420px] h-[420px] rounded-full bg-royal/12 blur-[120px] pointer-events-none"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity }}
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
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-5"
            >
              <i className="fas fa-globe text-gold text-xs" aria-hidden />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/85 font-semibold">
                Knowledge Hub
              </span>
              <span className="h-3 w-px bg-white/15" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-royal-light font-semibold">
                Interactive Tutorial
              </span>
            </motion.div>
            <motion.h2
              id="bilateral-trade-tutorial-heading"
              variants={itemVariants}
              className="display-title font-display font-bold leading-[1.04]"
            >
              <span className="text-white">Bilateral Trade</span>{" "}
              <span className="text-gradient-gold italic font-serif font-normal">
                Tutorial.
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-white/60 text-sm md:text-base mt-4 max-w-xl">
              Learn How Cross-Border Trade Works — Step by Step
            </motion.p>
          </div>
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col items-start gap-4">
            <p className="text-white/55 text-sm leading-relaxed">
              A premium walkthrough from opportunity discovery to deal execution — built for
              entrepreneurs, students, startups, and trade professionals.
            </p>
            <LearningModeToggle mode={mode} onChange={setMode} />
          </motion.div>
        </motion.div>

        {/* Audience tags */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8 lg:mb-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {AUDIENCE_TAGS.map((a) => (
            <motion.span
              key={a.label}
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 text-[10px] uppercase tracking-[0.14em] text-white/60"
            >
              <i className={cx("fas", a.icon, "text-gold text-[10px]")} aria-hidden />
              {a.label}
            </motion.span>
          ))}
        </motion.div>

        {/* Desktop stepper — horizontal */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="hidden lg:flex gap-2 mb-6 relative"
        >
          <div className="absolute left-[6%] right-[6%] top-[2.75rem] h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent pointer-events-none" />
          {steps.map((s, i) => (
            <TutorialStepButton
              key={s.id}
              step={s}
              isActive={activeIndex === i}
              isComplete={i < maxReached}
              onClick={() => goTo(i)}
            />
          ))}
        </motion.div>

        {/* Main learning panel */}
        <motion.div
          variants={itemVariants}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="relative glass-dark rounded-3xl border border-white/10 overflow-hidden"
        >
          <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-gold/[0.06] blur-[90px] pointer-events-none" />
          <div className="grid lg:grid-cols-12 gap-0">
            {/* Detail content */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/10">
              <TutorialDetailPanel step={active} mode={mode} />
              <TutorialNavigation
                activeIndex={activeIndex}
                total={steps.length}
                onPrev={handlePrev}
                onNext={handleNext}
                onStart={() => goTo(0)}
              />
            </div>

            {/* Map + mobile stepper */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-8 bg-navy-900/50 flex flex-col">
              <div className="text-[10px] uppercase tracking-[0.28em] text-gold/90 font-semibold mb-3">
                Global trade routes
              </div>
              <div className="flex-1 rounded-2xl border border-white/10 bg-navy-950/80 p-4 mb-4 min-h-[200px]">
                <BilateralTradeMap uid={uid} activeStep={activeIndex} />
              </div>

              {/* Mobile / tablet vertical stepper */}
              <div className="lg:hidden flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
                {steps.map((s, i) => (
                  <TutorialStepButton
                    key={s.id}
                    step={s}
                    isActive={activeIndex === i}
                    isComplete={i < maxReached}
                    onClick={() => goTo(i)}
                    compact
                  />
                ))}
              </div>

              <p className="hidden lg:block text-[10px] text-white/40 uppercase tracking-[0.16em] mt-4 text-center">
                Routes illuminate as you advance through the tutorial
              </p>
            </div>
          </div>
        </motion.div>

        {!preview && (
          <>
            {/* Process walkthrough summary */}
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 lg:mt-12"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {[
                { icon: "fa-book-open", label: "7 guided modules", sub: "End-to-end trade literacy" },
                { icon: "fa-download", label: "Trade guide", sub: "Downloadable reference PDF" },
                { icon: "fa-route", label: "Route visualizer", sub: "Live corridor mapping" },
                { icon: "fa-graduation-cap", label: "Certification path", sub: "Links to IICCI programs" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  className="glass rounded-2xl border border-white/10 p-5 hover:border-gold/30 transition"
                >
                  <i className={cx("fas", item.icon, "text-gold mb-3")} aria-hidden />
                  <div className="font-display font-bold text-white text-sm">{item.label}</div>
                  <div className="text-[10px] text-white/45 mt-1 uppercase tracking-[0.14em]">
                    {item.sub}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-royal-dark via-navy-950 to-navy-900 p-8 lg:p-10 mt-10 lg:mt-12"
            >
              <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden />
              <div className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full bg-gold/10 blur-3xl" />
              <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    Ready to master{" "}
                    <span className="text-gradient-gold italic font-serif font-normal">
                      bilateral trade?
                    </span>
                  </h3>
                  <p className="text-white/55 text-sm max-w-xl">
                    Continue with IICCI certification, placement support, and live trade
                    opportunities.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => goTo(0)}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold shadow-gold hover:scale-[1.02] transition"
                  >
                    Start Learning
                    <i className="fas fa-play text-xs" aria-hidden />
                  </button>
                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white text-sm font-semibold hover:border-gold/40 transition"
                  >
                    Download Trade Guide
                    <i className="fas fa-download text-xs text-gold" aria-hidden />
                  </Link>
                  <Link
                    href="/services/globalProgram"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/[0.04] border border-white/10 text-white text-sm font-semibold hover:border-gold/30 transition"
                  >
                    Explore Training Programs
                    <i className="fas fa-graduation-cap text-xs text-gold" aria-hidden />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {preview && (
          <p className="text-center mt-8">
            <Link
              href="/services/bilateralTrade"
              className="text-gold text-sm font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              View full bilateral trade tutorial
              <i className="fas fa-arrow-right text-[10px]" aria-hidden />
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

/** Alias for page default export */
export const BilateralTradeSection = BilateralTradeTutorialSection;

export default function BilateralTradePage() {
  return (
    <main>
      <BilateralTradeTutorialSection />
    </main>
  );
}
