"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

/* ============================================================
   Data — replace fetchPlacementData() with CMS/API
   ============================================================ */

export type PlacementFocus = {
  id: string;
  title: string;
  icon: string;
  description: string;
  openings: string;
  regions: string;
  level: string;
  accent: string;
  tags: string[];
};

export type CareerStep = {
  step: number;
  title: string;
  desc: string;
  icon: string;
  color: string;
};

type FlowStepNode = {
  step: number;
  label: string;
  icon: string;
  desc: string;
  color: string;
};

export type HiringPartner = {
  name: string;
  sector: string;
  icon: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
};

export type PlacementOpportunity = {
  id: string;
  role: string;
  company: string;
  location: string;
  focusId: string;
  type: string;
  package: string;
  icon: string;
};

const FOCUS_AREAS: PlacementFocus[] = [
  {
    id: "intl-trade",
    title: "International Trade",
    icon: "fa-globe",
    description: "Trade analyst, export manager and desk roles across global markets.",
    openings: "120+",
    regions: "GCC · EU · ASEAN",
    level: "Mid–Senior",
    accent: "from-royal-light/25 via-gold/10 to-transparent",
    tags: ["Trade desk", "Market entry", "Policy"],
  },
  {
    id: "import-export",
    title: "Import–Export Operations",
    icon: "fa-ship",
    description: "Documentation, customs, and operations specialists for export houses.",
    openings: "95+",
    regions: "Global",
    level: "All levels",
    accent: "from-gold/20 via-royal/10 to-transparent",
    tags: ["Operations", "Compliance", "Logistics"],
  },
  {
    id: "logistics",
    title: "Logistics & Supply Chain",
    icon: "fa-truck-fast",
    description: "Freight, warehousing and supply-chain coordination with MNC partners.",
    openings: "78+",
    regions: "Asia · ME",
    level: "Intermediate",
    accent: "from-emerald-400/20 via-gold/10 to-transparent",
    tags: ["3PL", "Freight", "SCM"],
  },
  {
    id: "biz-dev",
    title: "Business Development",
    icon: "fa-chart-line",
    description: "B2B growth, channel partnerships and international sales leadership.",
    openings: "64+",
    regions: "50+ countries",
    level: "Professional",
    accent: "from-royal/25 via-gold/15 to-transparent",
    tags: ["Sales", "Partnerships", "GTM"],
  },
  {
    id: "global-ops",
    title: "Global Operations",
    icon: "fa-building",
    description: "Regional operations, vendor management and cross-border execution.",
    openings: "52+",
    regions: "Multi-region",
    level: "Senior",
    accent: "from-royal-light/20 via-white/5 to-transparent",
    tags: ["Ops", "Vendor", "Scale"],
  },
  {
    id: "entrepreneurship",
    title: "Entrepreneurship",
    icon: "fa-lightbulb",
    description: "Founder placements, incubation cohorts and investor-ready startups.",
    openings: "40+",
    regions: "India + abroad",
    level: "Founder",
    accent: "from-gold/25 via-royal-light/10 to-transparent",
    tags: ["Startup", "Incubate", "Scale"],
  },
  {
    id: "trade-facilitation",
    title: "Trade Facilitation",
    icon: "fa-handshake",
    description: "Chamber liaison, delegation support and bilateral trade programme roles.",
    openings: "36+",
    regions: "Chapters",
    level: "Specialist",
    accent: "from-gold/15 via-emerald-300/10 to-transparent",
    tags: ["Chamber", "Policy", "Desk"],
  },
  {
    id: "corporate",
    title: "Corporate & Industrial",
    icon: "fa-industry",
    description: "Corporate trade roles across manufacturing, pharma, agri and tech sectors.",
    openings: "110+",
    regions: "Fortune partners",
    level: "Graduate+",
    accent: "from-royal-dark/30 via-gold/10 to-transparent",
    tags: ["MNC", "Industrial", "Enterprise"],
  },
];

const CAREER_STEPS: CareerStep[] = [
  {
    step: 1,
    title: "Profile & Skills Audit",
    desc: "Career mapping aligned to certification pathways and market demand signals.",
    icon: "fa-id-card",
    color: "from-royal-light/35 to-gold/20",
  },
  {
    step: 2,
    title: "Industry Matching",
    desc: "Curated introductions to hiring partners, exporters and global trade desks.",
    icon: "fa-users-viewfinder",
    color: "from-gold/30 to-emerald-400/20",
  },
  {
    step: 3,
    title: "Interview & Offer",
    desc: "Mock interviews, negotiation coaching and offer advisory with mentors.",
    icon: "fa-comments",
    color: "from-royal/30 to-gold/25",
  },
  {
    step: 4,
    title: "Global Onboarding",
    desc: "Relocation guidance, compliance briefings and alumni network activation.",
    icon: "fa-plane-departure",
    color: "from-emerald-400/25 to-royal-light/20",
  },
];

function toFlowSteps(steps: CareerStep[]): FlowStepNode[] {
  return steps.map((s) => ({
    step: s.step,
    label: s.title,
    icon: s.icon,
    desc: s.desc,
    color: s.color,
  }));
}

const HIRING_PARTNERS: HiringPartner[] = [
  { name: "Global Exporters Network", sector: "Trade", icon: "fa-ship" },
  { name: "Asia Logistics Alliance", sector: "Logistics", icon: "fa-truck" },
  { name: "GCC Trade Partners", sector: "GCC", icon: "fa-building" },
  { name: "EuroMarket Desk", sector: "Europe", icon: "fa-euro-sign" },
  { name: "Agri Export Consortium", sector: "Agriculture", icon: "fa-wheat-awn" },
  { name: "Tech Trade Ventures", sector: "Technology", icon: "fa-microchip" },
];

const OPPORTUNITIES: PlacementOpportunity[] = [
  {
    id: "o1",
    role: "Export Operations Lead",
    company: "Pan-Asia Trade House",
    location: "Singapore",
    focusId: "import-export",
    type: "Full-time",
    package: "Competitive + relocation",
    icon: "fa-ship",
  },
  {
    id: "o2",
    role: "International Trade Analyst",
    company: "EuroMarket Desk",
    location: "Frankfurt",
    focusId: "intl-trade",
    type: "Full-time",
    package: "€65K – €85K",
    icon: "fa-globe",
  },
  {
    id: "o3",
    role: "Supply Chain Coordinator",
    company: "Asia Logistics Alliance",
    location: "Dubai",
    focusId: "logistics",
    type: "Contract",
    package: "Tax-free package",
    icon: "fa-truck-fast",
  },
  {
    id: "o4",
    role: "Business Development Manager",
    company: "GCC Trade Partners",
    location: "Riyadh",
    focusId: "biz-dev",
    type: "Full-time",
    package: "OTE + benefits",
    icon: "fa-chart-line",
  },
  {
    id: "o5",
    role: "Trade Facilitation Officer",
    company: "IICCI Partner Desk",
    location: "New Delhi",
    focusId: "trade-facilitation",
    type: "Fellowship",
    package: "Stipend + network",
    icon: "fa-handshake",
  },
  {
    id: "o6",
    role: "Corporate Trade Associate",
    company: "Fortune Industrial Group",
    location: "Mumbai",
    focusId: "corporate",
    type: "Graduate",
    package: "₹8L – ₹14L",
    icon: "fa-industry",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "IICCI placement connected me with a GCC exporter within six weeks — the mentor network made every interview count.",
    name: "Rahul Mehta",
    role: "Export Manager",
    company: "Placed · Dubai",
    initials: "RM",
  },
  {
    id: "t2",
    quote:
      "From certification to offer letter, the career desk treated my profile like a global brand. Today I lead EU market entry.",
    name: "Priya Nair",
    role: "Trade Analyst",
    company: "Placed · Germany",
    initials: "PN",
  },
  {
    id: "t3",
    quote:
      "The skill-to-career flow mapped my logistics background to three live opportunities. I chose the role that fit my growth plan.",
    name: "James Okafor",
    role: "SCM Lead",
    company: "Placed · Singapore",
    initials: "JO",
  },
];

const PLACEMENT_STATS = [
  { value: 3500, suffix: "+", label: "Placements Facilitated", icon: "fa-briefcase" },
  { value: 420, suffix: "+", label: "Hiring Partners", icon: "fa-building" },
  { value: 50, suffix: "+", label: "Countries", icon: "fa-earth-asia" },
  { value: 88, suffix: "%", label: "Offer Rate", icon: "fa-chart-line" },
];

async function fetchPlacementData() {
  await new Promise((r) => setTimeout(r, 200));
  return {
    focus: FOCUS_AREAS,
    steps: CAREER_STEPS,
    partners: HIRING_PARTNERS,
    opportunities: OPPORTUNITIES,
    testimonials: TESTIMONIALS,
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

function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1500, bounce: 0 });
  const display = useTransform(spring, (v) =>
    suffix === "%" ? `${Math.round(v)}` : Math.round(v).toLocaleString("en-IN"),
  );
  const [value, setValue] = useState("0");

  useEffect(() => {
    if (inView) mv.set(to);
    return display.on("change", (v) => setValue(String(v)));
  }, [inView, to, mv, display]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      <span className="text-gold">{suffix}</span>
    </span>
  );
}

/* ============================================================
   Backdrops
   ============================================================ */

function CareerNetworkBackdrop({ uid }: { uid: string }) {
  const hubs = [
    { x: 450, y: 220, label: "INDIA", active: true },
    { x: 200, y: 160, label: "EU" },
    { x: 680, y: 140, label: "GCC" },
    { x: 750, y: 280, label: "ASEAN" },
    { x: 150, y: 320, label: "US" },
  ];
  const center = hubs[0];

  return (
    <svg
      viewBox="0 0 900 420"
      className="absolute inset-0 w-full h-full opacity-[0.12] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id={`pl-glow-${uid}`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`pl-line-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(59,130,246,0)" />
          <stop offset="50%" stopColor="rgba(212,175,55,0.6)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0)" />
        </linearGradient>
      </defs>
      <rect width="900" height="420" fill={`url(#pl-glow-${uid})`} />
      {hubs.slice(1).map((h) => {
        const path = `M ${center.x} ${center.y} Q ${(center.x + h.x) / 2} ${Math.min(center.y, h.y) - 50} ${h.x} ${h.y}`;
        return (
          <path
            key={h.label}
            d={path}
            fill="none"
            stroke={`url(#pl-line-${uid})`}
            strokeWidth="1"
          />
        );
      })}
      {hubs.map((h) => (
        <g key={h.label}>
          <circle cx={h.x} cy={h.y} r={h.active ? 7 : 4} fill={h.active ? "#d4af37" : "rgba(212,175,55,0.4)"} />
          <text
            x={h.x}
            y={h.y + 20}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            style={{ font: "600 8px sans-serif", letterSpacing: "0.14em" }}
          >
            {h.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-royal-light/50"
          style={{ left: `${15 + i * 22}%`, top: `${20 + i * 15}%` }}
          animate={{ y: [0, -12, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4.5 + i, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   Journey flows (Skill-to-Career + Candidate Journey)
   ============================================================ */

const FLOW_STEPS: FlowStepNode[] = [
  {
    step: 1,
    label: "Certification",
    icon: "fa-certificate",
    desc: "Earn IICCI global trade credentials",
    color: "from-royal-light/40 to-gold/20",
  },
  {
    step: 2,
    label: "Placement Desk",
    icon: "fa-briefcase",
    desc: "Profile audit & career pathway mapping",
    color: "from-gold/30 to-royal/15",
  },
  {
    step: 3,
    label: "Industry Match",
    icon: "fa-handshake",
    desc: "Curated intros to hiring partners",
    color: "from-emerald-400/25 to-gold/15",
  },
  {
    step: 4,
    label: "Global Role",
    icon: "fa-globe",
    desc: "Offer, onboarding & alumni network",
    color: "from-royal/35 to-gold/25",
  },
];

const CANDIDATE_FLOW_STEPS = toFlowSteps(CAREER_STEPS);

function FlowConnectorDesktop({
  stepCount,
  gradientId,
}: {
  stepCount: number;
  gradientId: string;
}) {
  return (
    <svg
      className="absolute left-[12%] right-[12%] top-[3.25rem] h-8 hidden lg:block pointer-events-none z-0"
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(59,130,246,0.2)" />
          <stop offset="25%" stopColor="rgba(212,175,55,0.7)" />
          <stop offset="50%" stopColor="rgba(212,175,55,0.9)" />
          <stop offset="75%" stopColor="rgba(59,130,246,0.6)" />
          <stop offset="100%" stopColor="rgba(52,211,153,0.5)" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 0 4 Q 25 1, 50 4 T 100 4"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="0.35"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.4 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        r="0.9"
        fill="#fff7d6"
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ offsetPath: "path('M 0 4 Q 25 1, 50 4 T 100 4')" }}
      />
      {Array.from({ length: stepCount - 1 }).map((_, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.15 }}
        >
          <circle
            cx={((i + 1) / stepCount) * 100}
            cy={4}
            r="0.6"
            fill="rgba(212,175,55,0.5)"
          />
        </motion.g>
      ))}
    </svg>
  );
}

function FlowStepCard({
  node,
  index,
  isActive,
  onHover,
  layout = "vertical",
  labelVariant = "caps",
}: {
  node: FlowStepNode;
  index: number;
  isActive: boolean;
  onHover: (i: number | null) => void;
  layout?: "vertical" | "timeline";
  labelVariant?: "caps" | "title";
}) {
  const isTimeline = layout === "timeline";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(index)}
      onBlur={() => onHover(null)}
      className={cx(
        "relative z-10 group/step",
        isTimeline
          ? "flex items-start gap-4 text-left pl-2 py-3"
          : "flex flex-col items-center text-center flex-1",
      )}
    >
      {/* Pulse ring when active (desktop vertical only) */}
      {!isTimeline && (
        <AnimatePresence>
          {isActive && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[4.5rem] h-[4.5rem] rounded-2xl border border-gold/50"
              style={{ boxShadow: "0 0 32px rgba(212,175,55,0.35)" }}
              aria-hidden
            />
          )}
        </AnimatePresence>
      )}

      <motion.div
        className={cx(
          "relative shrink-0 rounded-2xl flex items-center justify-center transition-all duration-400",
          "bg-navy-900 border",
          isTimeline ? "w-14 h-14" : "w-[4.5rem] h-[4.5rem] mb-4",
          isActive
            ? "border-gold shadow-[0_0_28px_rgba(212,175,55,0.45)]"
            : "border-gold/30 group-hover/step:border-gold/60 group-hover/step:shadow-[0_0_20px_rgba(212,175,55,0.2)]",
          !isTimeline && isActive && "scale-105",
        )}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.98 }}
      >
        <div
          className={cx(
            "absolute inset-0 rounded-2xl opacity-60 bg-gradient-to-br pointer-events-none",
            node.color,
          )}
          aria-hidden
        />
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold text-navy-950 text-[10px] font-bold flex items-center justify-center z-10 shadow-gold/30">
          {node.step}
        </span>
        <motion.i
          className={cx("fas", node.icon, "relative z-10 text-xl", isActive ? "text-gold" : "text-gold/90")}
          animate={isActive ? { scale: [1, 1.08, 1] } : {}}
          transition={{ duration: 1.2, repeat: isActive ? Infinity : 0 }}
          aria-hidden
        />
      </motion.div>

      <div className={cx(isTimeline ? "flex-1 min-w-0 pt-0.5" : "")}>
        <span
          className={cx(
            "transition-colors duration-300 block",
            labelVariant === "title"
              ? "font-display font-bold tracking-tight"
              : "font-bold uppercase tracking-[0.16em]",
            isTimeline ? "text-sm" : labelVariant === "title" ? "text-sm" : "text-[11px]",
            isActive ? "text-gold" : "text-white/85 group-hover/step:text-white",
          )}
        >
          {node.label}
        </span>
        <p
          className={cx(
            "text-[11px] text-white/55 leading-relaxed transition-all duration-300",
            isTimeline ? "mt-1 opacity-100" : labelVariant === "title" ? "max-w-[180px]" : "max-w-[140px]",
            !isTimeline && !isActive && "opacity-0 h-0 overflow-hidden",
            (isTimeline || isActive) && "mt-2 opacity-100",
          )}
        >
          {node.desc}
        </p>
      </div>
    </motion.div>
  );
}

function FlowArrowBetween({ delay }: { delay: number }) {
  return (
    <motion.div
      className="hidden lg:flex items-center justify-center shrink-0 w-8 -mt-8 z-10"
      initial={{ opacity: 0, x: -6 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
    >
      <motion.i
        className="fas fa-chevron-right text-gold text-sm"
        animate={{ x: [0, 4, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: delay * 0.3 }}
        aria-hidden
      />
    </motion.div>
  );
}

function JourneyFlow({
  steps,
  badge,
  headline,
  headlineAccent,
  hint,
  progressLabel,
  gradientId,
  accentGlow = "gold",
  labelVariant = "caps",
}: {
  steps: FlowStepNode[];
  badge: string;
  headline: string;
  headlineAccent: string;
  hint: string;
  progressLabel: string;
  gradientId: string;
  accentGlow?: "gold" | "royal";
  labelVariant?: "caps" | "title";
}) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <motion.div
      variants={itemVariants}
      className="relative glass-dark rounded-3xl border border-white/10 overflow-hidden"
    >
      <div
        className={cx(
          "absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] h-[200px] rounded-full blur-[80px] pointer-events-none",
          accentGlow === "royal" ? "bg-royal-light/[0.08]" : "bg-gold/[0.07]",
        )}
      />
      <div
        className={cx(
          "absolute -bottom-16 w-64 h-64 rounded-full blur-[100px] pointer-events-none",
          accentGlow === "royal" ? "-left-16 bg-gold/8" : "-right-16 bg-royal/10",
        )}
      />
      <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />

      <div className="relative p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 lg:mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 mb-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.28em] text-gold font-semibold">
                {badge}
              </span>
            </motion.div>
            <h3 className="font-display text-xl lg:text-2xl font-bold text-white leading-tight">
              {headline}{" "}
              <span className="text-gradient-gold italic font-serif font-normal">
                {headlineAccent}
              </span>
            </h3>
          </div>
          <p className="text-white/50 text-xs sm:text-sm max-w-xs sm:text-right leading-relaxed">
            {hint}
          </p>
        </div>

        <div className="relative hidden lg:block">
          <FlowConnectorDesktop stepCount={steps.length} gradientId={gradientId} />
          <div className="relative flex items-start justify-between gap-0 pt-2">
            {steps.map((node, i) => (
              <div key={node.label} className="contents">
                <FlowStepCard
                  node={node}
                  index={i}
                  isActive={activeStep === i}
                  onHover={setActiveStep}
                  labelVariant={labelVariant}
                />
                {i < steps.length - 1 && <FlowArrowBetween delay={0.4 + i * 0.12} />}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:hidden relative pl-2">
          <div className="absolute left-[2.15rem] top-8 bottom-8 w-px bg-gradient-to-b from-gold/50 via-royal-light/40 to-emerald-400/40" />
          <div className="flex flex-col gap-2">
            {steps.map((node, i) => (
              <FlowStepCard
                key={node.label}
                node={node}
                index={i}
                isActive={activeStep === i}
                onHover={setActiveStep}
                layout="timeline"
                labelVariant={labelVariant}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 lg:mt-10 pt-6 border-t border-white/10"
        >
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/45 mb-2">
            <span>{progressLabel}</span>
            <span className="text-gold font-semibold">
              {activeStep !== null ? `Step ${activeStep + 1} of ${steps.length}` : "Explore stages"}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden flex">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                className={cx(
                  "h-full flex-1 transition-colors duration-500",
                  i === 0 && "rounded-l-full",
                  i === steps.length - 1 && "rounded-r-full",
                  activeStep !== null && i <= activeStep
                    ? "bg-gradient-to-r from-royal-light to-gold"
                    : "bg-white/5",
                )}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function SkillToCareerFlow() {
  return (
    <JourneyFlow
      steps={FLOW_STEPS}
      badge="Skill-to-Career Flow"
      headline="From credentials to"
      headlineAccent="global careers."
      hint="Hover each stage to explore how IICCI connects certified talent with international opportunities."
      progressLabel="Journey completion"
      gradientId="skill-flow-line-grad"
    />
  );
}

function CandidateJourneyFlow() {
  return (
    <JourneyFlow
      steps={CANDIDATE_FLOW_STEPS}
      badge="Candidate Journey"
      headline="Your placement"
      headlineAccent="roadmap."
      hint="Hover each milestone to see how IICCI guides you from profile audit through global onboarding."
      progressLabel="Placement roadmap"
      gradientId="candidate-flow-line-grad"
      accentGlow="royal"
      labelVariant="title"
    />
  );
}

/* ============================================================
   Cards
   ============================================================ */

function PlacementOpportunityCard({ opp }: { opp: PlacementOpportunity }) {
  const focus = FOCUS_AREAS.find((f) => f.id === opp.focusId);
  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="group glass rounded-2xl border border-white/10 p-5 hover:border-gold/35 transition duration-400 h-full flex flex-col"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="w-11 h-11 rounded-xl bg-royal/15 border border-royal-light/25 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition">
          <i
            className={cx("fas", opp.icon, "text-royal-light text-sm group-hover:text-navy-950 transition")}
            aria-hidden
          />
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/25 text-[9px] uppercase tracking-[0.14em] text-emerald-300 font-semibold">
          {opp.type}
        </span>
      </div>
      <h4 className="font-display font-bold text-white text-base mb-1 group-hover:text-gold transition">
        {opp.role}
      </h4>
      <p className="text-white/55 text-sm mb-3">
        {opp.company} · {opp.location}
      </p>
      {focus && (
        <span className="text-[10px] uppercase tracking-[0.16em] text-white/40 mb-3">
          {focus.title}
        </span>
      )}
      <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between text-xs">
        <span className="text-white/50">{opp.package}</span>
        <span className="text-gold font-semibold flex items-center gap-1">
          View <i className="fas fa-arrow-right text-[9px]" aria-hidden />
        </span>
      </div>
    </motion.article>
  );
}

function FocusAreaCard({ focus }: { focus: PlacementFocus }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -3 }}
      className="group relative glass-dark rounded-2xl border border-white/10 overflow-hidden p-5 hover:border-gold/30 transition"
    >
      <div className={cx("absolute inset-0 opacity-40 bg-gradient-to-br pointer-events-none", focus.accent)} />
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-navy-900 border border-gold/30 flex items-center justify-center">
            <i className={cx("fas", focus.icon, "text-gold text-sm")} aria-hidden />
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-sm group-hover:text-gold transition">
              {focus.title}
            </h4>
            <div className="text-[10px] text-gold/80 font-semibold">{focus.openings} roles</div>
          </div>
        </div>
        <p className="text-white/55 text-xs leading-relaxed mb-3 line-clamp-2">{focus.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {focus.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[9px] text-white/55"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-3 text-[10px] uppercase tracking-[0.14em] text-white/40">
          {focus.regions} · {focus.level}
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   Testimonial slider
   ============================================================ */

function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [items.length]);

  const current = items[index];

  return (
    <motion.div
      variants={itemVariants}
      className="relative glass-dark rounded-3xl border border-white/10 p-6 lg:p-8 overflow-hidden"
    >
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="text-[10px] uppercase tracking-[0.28em] text-gold/90 font-semibold">
          Placement Success Stories
        </div>
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={cx(
                "w-2 h-2 rounded-full transition",
                i === index ? "bg-gold w-6" : "bg-white/20",
              )}
              aria-label={`Show testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.35 }}
        >
          <blockquote className="font-serif italic text-white/75 text-lg leading-relaxed mb-6">
            &ldquo;{current.quote}&rdquo;
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-bold">
              {current.initials}
            </div>
            <div>
              <div className="text-white font-semibold">{current.name}</div>
              <div className="text-white/50 text-sm">
                {current.role} · {current.company}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ============================================================
   Main Section
   ============================================================ */

export function GlobalPlacementSection({ preview = false }: { preview?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetchPlacementData().then(() => setReady(true));
  }, []);

  const opportunities = preview ? OPPORTUNITIES.slice(0, 3) : OPPORTUNITIES;
  const focusAreas = preview ? FOCUS_AREAS.slice(0, 4) : FOCUS_AREAS;

  return (
    <section
      id="global-placement"
      aria-labelledby="global-placement-heading"
      className={cx(
        "relative overflow-hidden bg-gradient-to-b from-navy-900 via-navy-950 to-navy-950 border-t border-white/10",
        preview ? "py-16 lg:py-20" : "section-padding",
      )}
    >
      <CareerNetworkBackdrop uid={uid} />
      <div className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none" />
      <FloatingParticles />
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-royal/10 blur-[140px] pointer-events-none"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
        aria-hidden
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 z-10">
        {/* Header */}
        <motion.div
          className="grid lg:grid-cols-12 gap-10 items-end mb-12 lg:mb-14"
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
              <i className="fas fa-briefcase text-gold text-xs" aria-hidden />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/85 font-semibold">
                Training &amp; Certification
              </span>
              <span className="h-3 w-px bg-white/15" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-royal-light font-semibold">
                Career Placement
              </span>
            </motion.div>
            <motion.h2
              id="global-placement-heading"
              variants={itemVariants}
              className="display-title font-display font-bold leading-[1.04]"
            >
              <span className="text-white">Global Placement</span>{" "}
              <span className="text-gradient-gold italic font-serif font-normal">
                Program.
              </span>
            </motion.h2>
          </div>
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <p className="text-white/70 text-base md:text-lg font-serif italic mb-3">
              &ldquo;Connecting Skilled Talent with Global Career Opportunities.&rdquo;
            </p>
            <p className="text-white/55 text-sm md:text-base leading-relaxed">
              International career growth, industry connections, and global employment
              pathways — powered by IICCI&apos;s hiring partner network.
            </p>
          </motion.div>
        </motion.div>

        {/* Stats */}
        {!preview && (
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 lg:mb-14"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {PLACEMENT_STATS.map((s) => (
              <motion.div
                key={s.label}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="glass rounded-2xl border border-white/10 px-5 py-5 text-center hover:border-gold/30 transition"
              >
                <i className={cx("fas", s.icon, "text-gold text-sm mb-2")} aria-hidden />
                <div className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {ready && <AnimatedCounter to={s.value} suffix={s.suffix} />}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Skill flow */}
        {!preview && (
          <div className="mb-12 lg:mb-14">
            <SkillToCareerFlow />
          </div>
        )}

        {/* Focus areas */}
        <motion.div
          className="mb-12 lg:mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold/90 font-semibold mb-1">
              Focus Areas
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              8 career pathways. Global demand.
            </h3>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {focusAreas.map((f) => (
              <FocusAreaCard key={f.id} focus={f} />
            ))}
          </div>
        </motion.div>

        {/* Opportunities */}
        <motion.div
          className="mb-12 lg:mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-royal-light font-semibold mb-1">
                Live Opportunities
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                Featured placement openings
              </h3>
            </div>
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Actively hiring
            </span>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {opportunities.map((o) => (
              <PlacementOpportunityCard key={o.id} opp={o} />
            ))}
          </div>
        </motion.div>

        {!preview && (
          <>
            {/* Candidate journey flow */}
            <div className="mb-12 lg:mb-14">
              <CandidateJourneyFlow />
            </div>

            {/* Partners + testimonial */}
            <div className="grid lg:grid-cols-12 gap-6 mb-12 lg:mb-14">
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="lg:col-span-5 glass-dark rounded-3xl border border-white/10 p-6 lg:p-7"
              >
                <div className="text-[10px] uppercase tracking-[0.28em] text-gold/90 font-semibold mb-5">
                  Hiring Partner Network
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {HIRING_PARTNERS.map((p) => (
                    <div
                      key={p.name}
                      className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:border-gold/25 transition group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-royal/15 flex items-center justify-center shrink-0 group-hover:bg-gold transition">
                        <i
                          className={cx("fas", p.icon, "text-royal-light text-xs group-hover:text-navy-950")}
                          aria-hidden
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate">{p.name}</div>
                        <div className="text-[10px] text-white/45">{p.sector}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <div className="lg:col-span-7">
                <TestimonialSlider items={TESTIMONIALS} />
              </div>
            </div>
          </>
        )}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-royal-dark via-navy-950 to-navy-900 p-8 lg:p-10"
        >
          <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-gold/12 blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">
                Launch your{" "}
                <span className="text-gradient-gold italic font-serif font-normal">
                  global career.
                </span>
              </h3>
              <p className="text-white/60 text-sm max-w-xl">
                Connect with industry experts, explore live openings, and access placement
                support through IICCI membership.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold shadow-gold hover:scale-[1.02] transition"
              >
                Apply for Placement Support
                <i className="fas fa-arrow-right text-xs" aria-hidden />
              </Link>
              <Link
                href="/services/upcomingProjects"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white text-sm font-semibold hover:border-gold/40 transition"
              >
                Explore Career Opportunities
                <i className="fas fa-briefcase text-xs text-gold" aria-hidden />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/[0.04] border border-white/10 text-white text-sm font-semibold hover:border-gold/30 transition"
              >
                Connect With Industry Experts
                <i className="fas fa-users text-xs text-gold" aria-hidden />
              </Link>
            </div>
          </div>
        </motion.div>

        {preview && (
          <p className="text-center mt-8">
            <Link
              href="/services/globalPlacement"
              className="text-gold text-sm font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              View full placement ecosystem
              <i className="fas fa-arrow-right text-[10px]" aria-hidden />
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

export default function GlobalPlacementPage() {
  return (
    <main>
      <GlobalPlacementSection />
    </main>
  );
}
