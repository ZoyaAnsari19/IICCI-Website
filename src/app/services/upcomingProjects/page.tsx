"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
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
   CMS-ready types — swap fetchUpcomingProjects() for API/CMS
   ============================================================ */

export type OpportunityType =
  | "import"
  | "export"
  | "joint-venture"
  | "investment"
  | "supply"
  | "manufacturing"
  | "infrastructure"
  | "renewable-energy"
  | "ev-technology"
  | "agri-export";

export type ProjectStatus = "open" | "closing-soon" | "featured" | "new";

export type UpcomingProject = {
  id: string;
  slug: string;
  title: string;
  sector: string;
  sectorIcon: string;
  country: string;
  region: string;
  countryCode: string;
  opportunityType: OpportunityType;
  description: string;
  status: ProjectStatus;
  featured?: boolean;
  investmentRange?: string;
  updatedAt: string;
};

export type ProjectsQuery = {
  search?: string;
  sector?: string;
  country?: string;
  type?: OpportunityType | "";
  page?: number;
  pageSize?: number;
};

export type ProjectsResponse = {
  items: UpcomingProject[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  sectors: string[];
  countries: string[];
};

const OPPORTUNITY_TYPES: { id: OpportunityType; label: string; icon: string }[] = [
  { id: "import", label: "Import", icon: "fa-plane-arrival" },
  { id: "export", label: "Export", icon: "fa-plane-departure" },
  { id: "joint-venture", label: "Joint Venture", icon: "fa-handshake" },
  { id: "investment", label: "Investment", icon: "fa-chart-pie" },
  { id: "supply", label: "Supply", icon: "fa-boxes-stacked" },
  { id: "manufacturing", label: "Manufacturing", icon: "fa-industry" },
  { id: "infrastructure", label: "Infrastructure", icon: "fa-road" },
  { id: "renewable-energy", label: "Renewable Energy", icon: "fa-solar-panel" },
  { id: "ev-technology", label: "EV & Technology", icon: "fa-bolt" },
  { id: "agri-export", label: "Agri-export", icon: "fa-wheat-awn" },
];

const STATUS_META: Record<
  ProjectStatus,
  { label: string; className: string; pulse?: boolean }
> = {
  open: { label: "Open", className: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
  "closing-soon": {
    label: "Closing Soon",
    className: "bg-amber-500/15 text-amber-300 border-amber-400/30",
    pulse: true,
  },
  featured: { label: "Featured", className: "bg-gold/15 text-gold border-gold/40" },
  new: { label: "New", className: "bg-royal-light/15 text-royal-light border-royal-light/30" },
};

/** Seed data — replace via CMS/API in fetchUpcomingProjects */
const PROJECTS_CATALOG: UpcomingProject[] = [
  {
    id: "p-001",
    slug: "gcc-pharma-import",
    title: "GCC Pharmaceutical Import Consortium",
    sector: "Pharmaceuticals",
    sectorIcon: "fa-pills",
    country: "UAE",
    region: "GCC",
    countryCode: "AE",
    opportunityType: "import",
    description:
      "Multi-year import mandate for WHO-GMP certified formulations across GCC hospital networks.",
    status: "featured",
    featured: true,
    investmentRange: "$12M – $45M",
    updatedAt: "2026-05-20",
  },
  {
    id: "p-002",
    slug: "eu-ev-battery-export",
    title: "EU EV Battery Pack Export Program",
    sector: "EV & Mobility",
    sectorIcon: "fa-car-battery",
    country: "Germany",
    region: "Europe",
    countryCode: "DE",
    opportunityType: "export",
    description:
      "Export partnership for lithium-ion modules meeting EU battery passport compliance.",
    status: "open",
    investmentRange: "$8M – $22M",
    updatedAt: "2026-05-18",
  },
  {
    id: "p-003",
    slug: "asean-textile-jv",
    title: "ASEAN Technical Textiles Joint Venture",
    sector: "Textiles",
    sectorIcon: "fa-shirt",
    country: "Vietnam",
    region: "ASEAN",
    countryCode: "VN",
    opportunityType: "joint-venture",
    description:
      "Co-investment in technical textile manufacturing for automotive and defence supply chains.",
    status: "new",
    investmentRange: "$5M – $18M",
    updatedAt: "2026-05-22",
  },
  {
    id: "p-004",
    slug: "africa-solar-investment",
    title: "East Africa Solar Park Investment",
    sector: "Renewable Energy",
    sectorIcon: "fa-solar-panel",
    country: "Kenya",
    region: "Africa",
    countryCode: "KE",
    opportunityType: "investment",
    description:
      "Grid-connected solar IPP with sovereign-backed PPAs and EPC partner shortlist ready.",
    status: "open",
    investmentRange: "$25M – $80M",
    updatedAt: "2026-05-15",
  },
  {
    id: "p-005",
    slug: "uk-agri-export",
    title: "UK Organic Millets & Pulses Export Desk",
    sector: "Agriculture",
    sectorIcon: "fa-wheat-awn",
    country: "United Kingdom",
    region: "Europe",
    countryCode: "GB",
    opportunityType: "agri-export",
    description:
      "Certified organic millets program with UK retail offtake and bonded warehouse access.",
    status: "closing-soon",
    investmentRange: "$2M – $6M",
    updatedAt: "2026-05-10",
  },
  {
    id: "p-006",
    slug: "usa-semiconductor-supply",
    title: "US Semiconductor Components Supply Chain",
    sector: "Electronics",
    sectorIcon: "fa-microchip",
    country: "USA",
    region: "North America",
    countryCode: "US",
    opportunityType: "supply",
    description:
      "Long-term supply agreement for precision components serving US fab ecosystem partners.",
    status: "open",
    investmentRange: "$15M – $40M",
    updatedAt: "2026-05-19",
  },
  {
    id: "p-007",
    slug: "india-defence-manufacturing",
    title: "Defence Avionics Manufacturing Cluster",
    sector: "Defence & Aerospace",
    sectorIcon: "fa-jet-fighter",
    country: "India",
    region: "South Asia",
    countryCode: "IN",
    opportunityType: "manufacturing",
    description:
      "Make-in-India avionics sub-assembly line with offset obligations and technology transfer.",
    status: "featured",
    investmentRange: "$30M – $120M",
    updatedAt: "2026-05-21",
  },
  {
    id: "p-008",
    slug: "gcc-logistics-infrastructure",
    title: "GCC Trade Corridor Logistics Hub",
    sector: "Infrastructure",
    sectorIcon: "fa-warehouse",
    country: "Saudi Arabia",
    region: "GCC",
    countryCode: "SA",
    opportunityType: "infrastructure",
    description:
      "Bonded logistics park with cold-chain, customs automation and multimodal connectivity.",
    status: "open",
    investmentRange: "$50M – $200M",
    updatedAt: "2026-05-17",
  },
  {
    id: "p-009",
    slug: "japan-ev-tech",
    title: "Japan EV Charging Technology Partnership",
    sector: "EV & Mobility",
    sectorIcon: "fa-charging-station",
    country: "Japan",
    region: "Asia Pacific",
    countryCode: "JP",
    opportunityType: "ev-technology",
    description:
      "Licensing and co-development of ultra-fast charging modules for Asian markets.",
    status: "new",
    investmentRange: "$10M – $35M",
    updatedAt: "2026-05-23",
  },
  {
    id: "p-010",
    slug: "australia-renewable-export",
    title: "Australia Green Hydrogen Export Corridor",
    sector: "Renewable Energy",
    sectorIcon: "fa-wind",
    country: "Australia",
    region: "Asia Pacific",
    countryCode: "AU",
    opportunityType: "renewable-energy",
    description:
      "Offtake and technology partnership for green ammonia export to Asian industrial buyers.",
    status: "open",
    investmentRange: "$40M – $150M",
    updatedAt: "2026-05-14",
  },
  {
    id: "p-011",
    slug: "france-luxury-import",
    title: "France Premium Consumer Import Program",
    sector: "Consumer Goods",
    sectorIcon: "fa-gem",
    country: "France",
    region: "Europe",
    countryCode: "FR",
    opportunityType: "import",
    description:
      "Exclusive import rights for premium lifestyle brands entering Indian metro retail.",
    status: "closing-soon",
    investmentRange: "$3M – $12M",
    updatedAt: "2026-05-08",
  },
  {
    id: "p-012",
    slug: "brazil-agri-export",
    title: "Brazil–India Agri Commodity Exchange",
    sector: "Agriculture",
    sectorIcon: "fa-seedling",
    country: "Brazil",
    region: "Americas",
    countryCode: "BR",
    opportunityType: "agri-export",
    description:
      "Bilateral commodity desk for pulses, oilseeds and horticulture with structured pricing.",
    status: "open",
    investmentRange: "$6M – $20M",
    updatedAt: "2026-05-16",
  },
  {
    id: "p-013",
    slug: "singapore-fintech-jv",
    title: "Singapore Trade Finance JV Platform",
    sector: "FinTech",
    sectorIcon: "fa-coins",
    country: "Singapore",
    region: "ASEAN",
    countryCode: "SG",
    opportunityType: "joint-venture",
    description:
      "Digital trade finance platform for SME exporters with multi-currency settlement rails.",
    status: "new",
    investmentRange: "$7M – $25M",
    updatedAt: "2026-05-24",
  },
  {
    id: "p-014",
    slug: "canada-critical-minerals",
    title: "Canada Critical Minerals Investment",
    sector: "Mining & Metals",
    sectorIcon: "fa-mountain",
    country: "Canada",
    region: "North America",
    countryCode: "CA",
    opportunityType: "investment",
    description:
      "Equity participation in lithium and rare-earth processing with offtake back to India.",
    status: "open",
    investmentRange: "$20M – $75M",
    updatedAt: "2026-05-12",
  },
  {
    id: "p-015",
    slug: "indonesia-manufacturing",
    title: "Indonesia Electronics Manufacturing Hub",
    sector: "Electronics",
    sectorIcon: "fa-microchip",
    country: "Indonesia",
    region: "ASEAN",
    countryCode: "ID",
    opportunityType: "manufacturing",
    description:
      "Contract manufacturing expansion for consumer electronics with ASEAN tariff advantages.",
    status: "open",
    investmentRange: "$12M – $48M",
    updatedAt: "2026-05-11",
  },
];

const DEFAULT_PAGE_SIZE = 6;

/**
 * CMS/API adapter — point to `/api/projects`, Sanity, Strapi, etc.
 * Filtering & pagination mirror typical headless CMS query params.
 */
async function fetchUpcomingProjects(
  query: ProjectsQuery = {},
): Promise<ProjectsResponse> {
  const {
    search = "",
    sector = "",
    country = "",
    type = "",
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
  } = query;

  await new Promise((r) => setTimeout(r, 280));

  let filtered = [...PROJECTS_CATALOG];

  const q = search.trim().toLowerCase();
  if (q) {
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.sector.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q),
    );
  }
  if (sector) filtered = filtered.filter((p) => p.sector === sector);
  if (country) filtered = filtered.filter((p) => p.country === country);
  if (type) filtered = filtered.filter((p) => p.opportunityType === type);

  filtered.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  const sectors = [...new Set(PROJECTS_CATALOG.map((p) => p.sector))].sort();
  const countries = [...new Set(PROJECTS_CATALOG.map((p) => p.country))].sort();

  return {
    items,
    total,
    page,
    pageSize,
    hasMore: start + pageSize < total,
    sectors,
    countries,
  };
}

/* ============================================================
   Motion
   ============================================================ */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.03 },
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

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.02 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function opportunityLabel(type: OpportunityType) {
  return OPPORTUNITY_TYPES.find((t) => t.id === type)?.label ?? type;
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
  const spring = useSpring(motionValue, { duration: 1600, bounce: 0 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString("en-IN"));
  const [value, setValue] = useState("0");

  useEffect(() => {
    if (inView) motionValue.set(to);
    return display.on("change", (v) => setValue(v));
  }, [inView, to, motionValue, display]);

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

function OpportunityMapBackdrop({ uid }: { uid: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className="absolute inset-0 w-full h-full opacity-[0.09] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id={`op-glow-${uid}`} cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
          <stop offset="40%" stopColor="#d4af37" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
        <pattern
          id={`op-grid-${uid}`}
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 48 0 L 0 0 0 48"
            fill="none"
            stroke="rgba(212,175,55,0.08)"
            strokeWidth="0.6"
          />
        </pattern>
        <linearGradient id={`op-route-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(59,130,246,0)" />
          <stop offset="50%" stopColor="rgba(59,130,246,0.7)" />
          <stop offset="100%" stopColor="rgba(212,175,55,0)" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#op-glow-${uid})`} />
      <rect width="1600" height="900" fill={`url(#op-grid-${uid})`} />
      <g fill="none" stroke={`url(#op-route-${uid})`} strokeWidth="0.9">
        <path d="M 800 450 Q 500 180, 200 280" />
        <path d="M 800 450 Q 1100 200, 1400 300" />
        <path d="M 800 450 Q 1050 700, 1350 680" />
        <path d="M 800 450 Q 450 650, 150 620" />
      </g>
      <g fill="rgba(212,175,55,0.5)">
        {[
          [200, 280],
          [1400, 300],
          [1350, 680],
          [150, 620],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" />
        ))}
        <circle cx={800} cy={450} r="6" fill="#3b82f6" />
      </g>
    </svg>
  );
}

function FloatingParticles() {
  const particles = [
    { left: "8%", top: "20%", delay: 0, size: 4 },
    { left: "25%", top: "65%", delay: 0.6, size: 3 },
    { left: "42%", top: "12%", delay: 1, size: 5 },
    { left: "58%", top: "38%", delay: 0.2, size: 3 },
    { left: "75%", top: "72%", delay: 1.3, size: 4 },
    { left: "90%", top: "28%", delay: 1.8, size: 2 },
  ];

  return (
    <motion.div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gold/35 blur-[1px]"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -16, 0], opacity: [0.15, 0.6, 0.15] }}
          transition={{
            duration: 5 + i * 0.35,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

/* ============================================================
   Project Card
   ============================================================ */

function ProjectCard({
  project,
  onEnquire,
  onSpotlight,
}: {
  project: UpcomingProject;
  onEnquire: (p: UpcomingProject) => void;
  onSpotlight?: (e: MouseEvent<HTMLElement>) => void;
}) {
  const typeMeta = OPPORTUNITY_TYPES.find((t) => t.id === project.opportunityType);
  const status = STATUS_META[project.status];

  return (
    <motion.article
      variants={itemVariants}
      layout
      onMouseMove={onSpotlight}
      className={cx(
        "group relative glass-dark rounded-3xl border overflow-hidden card-lift transition duration-500",
        project.featured
          ? "border-gold/35 shadow-gold"
          : "border-white/10 hover:border-gold/30",
      )}
      style={{ "--mx": "50%", "--my": "50%" } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), rgba(212,175,55,0.12), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition" />

      <div className="relative p-5 sm:p-6 flex flex-col h-full">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-navy-900 border border-gold/25 flex items-center justify-center shrink-0 group-hover:border-gold/50 group-hover:shadow-gold/20 transition">
              <i className={cx("fas", project.sectorIcon, "text-gold text-base")} aria-hidden />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/45 truncate">
                {project.sector}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5 text-xs text-white/60">
                <span
                  className="inline-flex items-center justify-center w-5 h-3.5 rounded-sm bg-white/10 text-[8px] font-bold text-white/80"
                  title={project.country}
                >
                  {project.countryCode}
                </span>
                <span className="truncate">
                  {project.country} · {project.region}
                </span>
              </div>
            </div>
          </div>
          <span
            className={cx(
              "shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-full text-[9px] uppercase tracking-[0.18em] font-semibold border",
              status.className,
              status.pulse && "animate-pulse",
            )}
          >
            {status.pulse && (
              <span className="w-1 h-1 rounded-full bg-current" aria-hidden />
            )}
            {status.label}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold text-white leading-snug mb-2 group-hover:text-gold transition line-clamp-2">
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-royal/15 border border-royal-light/25 text-[10px] uppercase tracking-[0.16em] text-royal-light font-semibold">
            <i className={cx("fas", typeMeta?.icon ?? "fa-briefcase", "text-[9px]")} aria-hidden />
            {opportunityLabel(project.opportunityType)}
          </span>
          {project.investmentRange && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[10px] text-white/55">
              <i className="fas fa-coins text-gold text-[9px]" aria-hidden />
              {project.investmentRange}
            </span>
          )}
        </div>

        <p className="text-white/55 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
          {project.description}
        </p>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
          <span className="text-[10px] text-white/40 uppercase tracking-[0.16em]">
            Updated {new Date(project.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          </span>
          <button
            type="button"
            onClick={() => onEnquire(project)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold hover:bg-gold hover:text-navy-950 hover:border-gold transition-all duration-300"
          >
            Enquire
            <i className="fas fa-arrow-right text-[9px]" aria-hidden />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ============================================================
   Enquiry Modal
   ============================================================ */

function EnquiryModal({
  project,
  onClose,
}: {
  project: UpcomingProject | null;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close enquiry"
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg glass-dark rounded-3xl border border-white/15 shadow-premium overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
            <div className="relative p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-gold/90 font-semibold mb-1">
                    Business Enquiry
                  </div>
                  <h3
                    id="enquiry-modal-title"
                    className="font-display text-xl font-bold text-white leading-snug"
                  >
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-xs mt-1">
                    {project.sector} · {project.country}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/40 transition"
                  aria-label="Close"
                >
                  <i className="fas fa-xmark" aria-hidden />
                </button>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-check text-emerald-300 text-xl" aria-hidden />
                  </div>
                  <p className="text-white font-semibold mb-2">Enquiry received</p>
                  <p className="text-white/55 text-sm">
                    Our trade desk will respond within 2 business days.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 rounded-full bg-gold text-navy-950 text-sm font-bold"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="projectId" value={project.id} />
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1.5 block">
                      Full name
                    </label>
                    <input
                      required
                      name="name"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-gold/40 focus:outline-none transition"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1.5 block">
                        Email
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-gold/40 focus:outline-none transition"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1.5 block">
                        Company
                      </label>
                      <input
                        required
                        name="company"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-gold/40 focus:outline-none transition"
                        placeholder="Organisation"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1.5 block">
                      Message
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-gold/40 focus:outline-none transition resize-none"
                      placeholder="Briefly describe your interest in this opportunity…"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold btn-premium shadow-gold"
                  >
                    Submit Business Enquiry
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   Main Section
   ============================================================ */

export function UpcomingProjectsSection({ preview = false }: { preview?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState<OpportunityType | "">("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [data, setData] = useState<ProjectsResponse | null>(null);
  const [accumulated, setAccumulated] = useState<UpcomingProject[]>([]);
  const [enquiryProject, setEnquiryProject] = useState<UpcomingProject | null>(null);

  const debouncedSearch = useDebounced(search, 320);

  const loadProjects = useCallback(
    async (opts: { append?: boolean; pageNum?: number } = {}) => {
      const pageNum = opts.pageNum ?? 1;
      const isAppend = opts.append ?? false;
      if (isAppend) setLoadingMore(true);
      else setLoading(true);

      try {
        const res = await fetchUpcomingProjects({
          search: debouncedSearch,
          sector,
          country,
          type,
          page: pageNum,
          pageSize: preview ? 3 : DEFAULT_PAGE_SIZE,
        });
        setData(res);
        setAccumulated((prev) =>
          isAppend ? [...prev, ...res.items] : res.items,
        );
        setPage(pageNum);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [debouncedSearch, sector, country, type, preview],
  );

  useEffect(() => {
    loadProjects({ pageNum: 1 });
  }, [loadProjects]);

  const featured = useMemo(
    () => PROJECTS_CATALOG.find((p) => p.featured) ?? accumulated[0],
    [accumulated],
  );

  const handleSpotlight = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  }, []);

  const clearFilters = () => {
    setSearch("");
    setSector("");
    setCountry("");
    setType("");
  };

  const hasActiveFilters = search || sector || country || type;

  return (
    <section
      id="upcoming-projects"
      aria-labelledby="upcoming-projects-heading"
      className={cx(
        "relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950",
        preview ? "py-16 lg:py-20" : "page-nav-offset",
      )}
    >
      <OpportunityMapBackdrop uid={uid} />
      <motion.div
        className="absolute inset-0 bg-grid bg-grid-fade opacity-[0.06] pointer-events-none"
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <FloatingParticles />
      <motion.div
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-royal/10 blur-[140px] pointer-events-none"
        animate={{ x: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute bottom-1/4 -left-40 w-[480px] h-[480px] rounded-full bg-gold/[0.06] blur-[140px] pointer-events-none"
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
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
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-5"
          >
            <i className="fas fa-briefcase text-gold text-xs" aria-hidden />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/85 font-semibold">
              Trade Verticals / Opportunities
            </span>
            <span className="h-3 w-px bg-white/15" />
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-royal-light font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-royal-light animate-pulse" />
              Live Desk
            </span>
          </motion.div>

          <motion.h2
            id="upcoming-projects-heading"
            variants={itemVariants}
            className="display-title font-display font-bold leading-[1.04] mb-4"
          >
            <span className="text-white">Upcoming</span>{" "}
            <span className="text-gradient-gold italic font-serif font-normal">
              Projects.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-white/75 text-base md:text-lg font-serif italic"
          >
            &ldquo;Live Trade &amp; Investment Opportunities, Updated Regularly.&rdquo;
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-sm md:text-base text-white/55 leading-relaxed max-w-2xl mx-auto"
          >
            Curated import, export, JV and investment mandates across IICCI&apos;s global
            network — refreshed from our opportunity desk and partner chambers.
          </motion.p>
        </motion.div>

        {/* Stats */}
        {!preview && (
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 lg:mb-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { value: PROJECTS_CATALOG.length, suffix: "+", label: "Live Opportunities", icon: "fa-briefcase" },
              { value: new Set(PROJECTS_CATALOG.map((p) => p.country)).size, suffix: "", label: "Countries", icon: "fa-earth-asia" },
              { value: new Set(PROJECTS_CATALOG.map((p) => p.sector)).size, suffix: "+", label: "Sectors", icon: "fa-layer-group" },
              { value: OPPORTUNITY_TYPES.length, suffix: "", label: "Opportunity Types", icon: "fa-tags" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="glass-dark rounded-2xl border border-white/10 px-5 py-5 text-center hover:border-gold/30 transition"
              >
                <i className={cx("fas", stat.icon, "text-gold text-sm mb-2")} aria-hidden />
                <div className="font-display text-2xl sm:text-3xl font-bold text-white">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Featured spotlight */}
        {!preview && featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-10 lg:mb-12 rounded-3xl overflow-hidden border border-gold/35 bg-gradient-to-br from-royal-dark/80 via-navy-950 to-navy-900 p-6 lg:p-10"
          >
            <div className="absolute inset-0 bg-grid opacity-[0.05]" aria-hidden />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-gold/15 blur-3xl" />
            <div className="relative grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-[10px] uppercase tracking-[0.28em] text-gold font-semibold mb-4">
                  <i className="fas fa-star text-[10px]" aria-hidden /> Featured Opportunity
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                  {featured.title}
                </h3>
                <p className="text-white/65 text-sm lg:text-base leading-relaxed mb-4 max-w-xl">
                  {featured.description}
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1.5 rounded-lg glass border border-white/10 text-white/75">
                    {featured.sector}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg glass border border-white/10 text-white/75">
                    {featured.country}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-royal/20 border border-royal-light/30 text-royal-light font-semibold">
                    {opportunityLabel(featured.opportunityType)}
                  </span>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                {featured.investmentRange && (
                  <div className="glass-dark rounded-2xl border border-white/10 p-5 flex-1">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-1">
                      Investment range
                    </div>
                    <div className="font-display text-2xl font-bold text-gold">
                      {featured.investmentRange}
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setEnquiryProject(featured)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold shadow-gold hover:scale-[1.02] transition"
                >
                  Explore Opportunities
                  <i className="fas fa-arrow-right text-xs" aria-hidden />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-dark rounded-2xl border border-white/10 p-4 sm:p-5 mb-8 lg:mb-10"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <i
                className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gold/70 text-sm"
                aria-hidden
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects, sectors, countries…"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-white/35 focus:border-gold/40 focus:outline-none transition"
                aria-label="Search upcoming projects"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:w-[58%]">
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-gold/40 focus:outline-none transition cursor-pointer"
                aria-label="Filter by sector"
              >
                <option value="" className="bg-navy-950">
                  All sectors
                </option>
                {(data?.sectors ?? []).map((s) => (
                  <option key={s} value={s} className="bg-navy-950">
                    {s}
                  </option>
                ))}
              </select>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-gold/40 focus:outline-none transition cursor-pointer"
                aria-label="Filter by country"
              >
                <option value="" className="bg-navy-950">
                  All countries
                </option>
                {(data?.countries ?? []).map((c) => (
                  <option key={c} value={c} className="bg-navy-950">
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as OpportunityType | "")}
                className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-gold/40 focus:outline-none transition cursor-pointer"
                aria-label="Filter by opportunity type"
              >
                <option value="" className="bg-navy-950">
                  All types
                </option>
                {OPPORTUNITY_TYPES.map((t) => (
                  <option key={t.id} value={t.id} className="bg-navy-950">
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/10">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mr-1">
              Quick filter
            </span>
            {OPPORTUNITY_TYPES.slice(0, 6).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setType(type === t.id ? "" : t.id)}
                className={cx(
                  "px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.14em] font-semibold border transition",
                  type === t.id
                    ? "bg-gold/15 border-gold/40 text-gold"
                    : "border-white/10 text-white/55 hover:border-gold/30 hover:text-white",
                )}
              >
                {t.label}
              </button>
            ))}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="ml-auto text-xs text-gold hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {data && (
            <p className="mt-3 text-xs text-white/45">
              Showing {accumulated.length} of {data.total} opportunities
            </p>
          )}
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {Array.from({ length: preview ? 3 : 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl border border-white/10 bg-white/[0.03] h-[320px] animate-pulse"
              />
            ))}
          </div>
        ) : accumulated.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 glass-dark rounded-3xl border border-white/10"
          >
            <i className="fas fa-folder-open text-gold text-3xl mb-4 opacity-60" aria-hidden />
            <p className="text-white font-semibold mb-2">No opportunities match your filters</p>
            <p className="text-white/50 text-sm mb-6">Try adjusting search or filter criteria.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="px-6 py-2.5 rounded-full border border-gold/40 text-gold text-sm font-semibold hover:bg-gold/10 transition"
            >
              Reset filters
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${debouncedSearch}-${sector}-${country}-${type}-${page === 1 ? "r" : "a"}`}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
              variants={gridVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {accumulated.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEnquire={setEnquiryProject}
                  onSpotlight={handleSpotlight}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Load more */}
        {!preview && data?.hasMore && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 flex justify-center"
          >
            <button
              type="button"
              disabled={loadingMore}
              onClick={() => loadProjects({ append: true, pageNum: page + 1 })}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white/[0.04] border border-white/15 text-white text-sm font-semibold hover:border-gold/40 disabled:opacity-50 transition"
            >
              {loadingMore ? (
                <>
                  <i className="fas fa-spinner fa-spin text-gold" aria-hidden />
                  Loading…
                </>
              ) : (
                <>
                  View more projects
                  <i className="fas fa-chevron-down text-gold text-xs" aria-hidden />
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cx(
            "relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-royal-dark via-navy-950 to-navy-900",
            preview ? "mt-10 p-6 lg:p-8" : "mt-14 lg:mt-16 p-8 lg:p-12",
          )}
        >
          <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-gold/12 blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">
                Partner with IICCI&apos;s{" "}
                <span className="text-gradient-gold italic font-serif font-normal">
                  opportunity desk.
                </span>
              </h3>
              <p className="text-white/60 text-sm max-w-xl">
                List your mandate, access vetted projects, or submit a bespoke trade enquiry —
                our global desk connects capital with capability.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setEnquiryProject(featured ?? accumulated[0] ?? null)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold shadow-gold"
              >
                Submit Business Enquiry
                <i className="fas fa-paper-plane text-xs" aria-hidden />
              </button>
              {!preview && (
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white text-sm font-semibold hover:border-gold/40 transition"
                >
                  View All Projects
                  <i className="fas fa-arrow-right text-xs text-gold" aria-hidden />
                </Link>
              )}
            </div>
          </div>
        </motion.div>

        {preview && (
          <div className="mt-8 text-center">
            <Link
              href="/services/upcomingProjects"
              className="inline-flex items-center gap-2 text-gold text-sm font-semibold hover:gap-3 transition-all"
            >
              View full opportunity desk
              <i className="fas fa-arrow-right text-[10px]" aria-hidden />
            </Link>
          </div>
        )}
      </div>

      <EnquiryModal project={enquiryProject} onClose={() => setEnquiryProject(null)} />
    </section>
  );
}

function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function UpcomingProjectsPage() {
  return (
    <main>
      <UpcomingProjectsSection />
    </main>
  );
}
