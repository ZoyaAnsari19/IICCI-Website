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
   Data
   ============================================================ */

type Service = {
  icon: string;
  title: string;
  desc: string;
};

type Category = {
  id: string;
  icon: string;
  label: string;
  title: string;
  tagline: string;
  summary: string;
  accent: string;
  ring: string;
  services: Service[];
};

const CATEGORIES: Category[] = [
  {
    id: "trade-market",
    icon: "fa-store",
    label: "Trade & Market",
    title: "Agricultural Trade & Market Support",
    tagline: "From farmgate to high-value markets — seamless agri-trade access.",
    summary:
      "Linking Indian farmers with mandis, FPOs, processors, and premium buyers across the agri-value chain — backed by real-time market intelligence and transparent price discovery.",
    accent: "from-emerald-400/35 via-gold/15 to-royal-light/20",
    ring: "rgba(52,211,153,0.35)",
    services: [
      {
        icon: "fa-warehouse",
        title: "Mandi & APMC Access",
        desc: "Streamlined entry into regulated markets with transparent, real-time price discovery.",
      },
      {
        icon: "fa-truck-fast",
        title: "Direct Buyer Networks",
        desc: "Curated retail chains, processors and exporters sourcing at fair, premium prices.",
      },
      {
        icon: "fa-snowflake",
        title: "Cold Chain Partnerships",
        desc: "Pan-India cold storage, reefer logistics and post-harvest infrastructure access.",
      },
      {
        icon: "fa-chart-line",
        title: "Real-time Price Intelligence",
        desc: "Daily commodity prices, demand signals and seasonality dashboards for 200+ crops.",
      },
      {
        icon: "fa-handshake-simple",
        title: "Contract Farming Setup",
        desc: "Pre-agreed offtake contracts that de-risk the entire crop cycle for the farmer.",
      },
    ],
  },
  {
    id: "training",
    icon: "fa-graduation-cap",
    label: "Capacity Building",
    title: "Farmer Capacity Building & Training",
    tagline: "World-class agri-training to upgrade skills, certifications and yields.",
    summary:
      "Industry-leading training programs across modern agronomy, food safety, digital tools and cooperative governance — delivered in 14+ Indian languages, on-field and online.",
    accent: "from-royal-light/30 via-gold/15 to-emerald-300/25",
    ring: "rgba(59,130,246,0.35)",
    services: [
      {
        icon: "fa-leaf",
        title: "Modern Agronomy Programs",
        desc: "Crop-specific best practices in partnership with ICAR, IARI and global universities.",
      },
      {
        icon: "fa-shield-halved",
        title: "GAP, HACCP & Quality",
        desc: "Certification training to unlock global retail, processing and HoReCa buyers.",
      },
      {
        icon: "fa-mobile-screen-button",
        title: "Digital Literacy Bootcamps",
        desc: "AgriTech apps, e-mandi portals and weather tools — hands-on learning for farmers.",
      },
      {
        icon: "fa-users-rays",
        title: "FPO Formation Support",
        desc: "Cooperative governance, member onboarding and operating playbooks for FPOs.",
      },
      {
        icon: "fa-chalkboard-user",
        title: "Master Trainer Network",
        desc: "Pan-India trainers fluent in 14+ Indian languages across every agro-climatic zone.",
      },
    ],
  },
  {
    id: "finance",
    icon: "fa-coins",
    label: "Finance & Assistance",
    title: "Financial & Business Assistance",
    tagline: "Credit, subsidies, insurance — built around the Indian farmer.",
    summary:
      "End-to-end financial advisory and government scheme facilitation to ensure capital, insurance and incentives reach the farmer without friction.",
    accent: "from-gold/35 via-amber-300/15 to-emerald-400/20",
    ring: "rgba(212,175,55,0.4)",
    services: [
      {
        icon: "fa-landmark",
        title: "Government Scheme Liaison",
        desc: "PM-KISAN, KCC, PMFBY, PM-FME — fast-tracked application and documentation.",
      },
      {
        icon: "fa-piggy-bank",
        title: "Agri-Loan Facilitation",
        desc: "Partner banks, NBFCs and co-operatives for working capital and term loans.",
      },
      {
        icon: "fa-umbrella",
        title: "Crop & Yield Insurance",
        desc: "Multi-peril, parametric and weather-linked covers tailored to the crop & region.",
      },
      {
        icon: "fa-building-columns",
        title: "FPO & FPC Onboarding",
        desc: "End-to-end registration, tax, GST and compliance for producer companies.",
      },
      {
        icon: "fa-scale-balanced",
        title: "Rural Investment Advisory",
        desc: "Equipment financing, agri-startup capital and rural enterprise structuring.",
      },
    ],
  },
  {
    id: "export",
    icon: "fa-ship",
    label: "Export & Global Trade",
    title: "Export & International Trade Support",
    tagline: "From Indian farmgate to global shelves — full-stack export readiness.",
    summary:
      "A dedicated agri-export desk handling certifications, documentation, buyer-seller meets and country-specific market entry across 25+ export destinations.",
    accent: "from-royal/30 via-gold/15 to-royal-light/25",
    ring: "rgba(30,64,175,0.4)",
    services: [
      {
        icon: "fa-stamp",
        title: "APEDA & Board Liaison",
        desc: "Single-window guidance across APEDA, Spices Board, MPEDA, Coffee & Tea Board.",
      },
      {
        icon: "fa-flask-vial",
        title: "Phyto & Lab Compliance",
        desc: "Pesticide residue, MRL, microbial and heavy-metal compliance with certified labs.",
      },
      {
        icon: "fa-globe",
        title: "Global Buyer-Seller Meets",
        desc: "Curated B2B at SIAL, Gulfood, Anuga, Fruit Logistica & sector-specific expos.",
      },
      {
        icon: "fa-passport",
        title: "Export Documentation",
        desc: "ICEGATE, DGFT, FSSAI, country-specific labelling and incentive paperwork.",
      },
      {
        icon: "fa-route",
        title: "Country Entry Playbooks",
        desc: "EU, GCC, ASEAN, US, UK & Africa — tariff, logistics and demand-side insights.",
      },
    ],
  },
  {
    id: "technology",
    icon: "fa-microchip",
    label: "Tech & Sustainability",
    title: "Technology, Sustainability & Advisory",
    tagline: "AgriTech, climate-smart farming and the future of Indian agriculture.",
    summary:
      "Bringing precision agriculture, drone services, organic certification and climate-smart practices to every Indian farm — productively, profitably and sustainably.",
    accent: "from-emerald-300/30 via-royal-light/20 to-gold/20",
    ring: "rgba(16,185,129,0.4)",
    services: [
      {
        icon: "fa-satellite",
        title: "Precision Agriculture",
        desc: "IoT sensors, satellite imagery, yield modelling and prescription analytics.",
      },
      {
        icon: "fa-helicopter",
        title: "Drone Spraying & Mapping",
        desc: "DGCA-certified drone services for fertigation, crop scouting and acreage mapping.",
      },
      {
        icon: "fa-seedling",
        title: "Organic Certification",
        desc: "NPOP, India Organic, USDA Organic and EU Organic onboarding & audits.",
      },
      {
        icon: "fa-cloud-sun-rain",
        title: "Climate-Smart Practices",
        desc: "Drought-resilient varieties, regenerative agriculture and carbon-farming pilots.",
      },
      {
        icon: "fa-droplet",
        title: "Soil & Water Advisory",
        desc: "Micro-irrigation, fertigation and watershed restoration roadmaps.",
      },
    ],
  },
];

const STATS = [
  { value: 50000, suffix: "+", label: "Farmers Empowered", icon: "fa-user-shield" },
  { value: 25, suffix: "+", label: "Export Destinations", icon: "fa-earth-asia" },
  { value: 200, suffix: "+", label: "FPO Network", icon: "fa-users-line" },
  { value: 18, suffix: "+", label: "Crop Verticals", icon: "fa-wheat-awn" },
];

/* ============================================================
   Motion variants
   ============================================================ */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
};

const accordionVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ============================================================
   Small helpers
   ============================================================ */

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function AnimatedCounter({
  to,
  suffix = "",
  duration = 1.8,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (latest) =>
    Math.round(latest).toLocaleString("en-IN"),
  );
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
   Decorative backdrops
   ============================================================ */

function AgriTradeBackdrop({ uid }: { uid: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className="absolute inset-0 w-full h-full opacity-[0.085] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id={`fs-glow-${uid}`} cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.45" />
          <stop offset="35%" stopColor="#d4af37" stopOpacity="0.18" />
          <stop offset="70%" stopColor="#1e40af" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
        <pattern
          id={`fs-grid-${uid}`}
          width="52"
          height="52"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 52 0 L 0 0 0 52"
            fill="none"
            stroke="rgba(212,175,55,0.10)"
            strokeWidth="0.6"
          />
        </pattern>
        <linearGradient id={`fs-line-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(212,175,55,0)" />
          <stop offset="50%" stopColor="rgba(212,175,55,0.6)" />
          <stop offset="100%" stopColor="rgba(212,175,55,0)" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#fs-glow-${uid})`} />
      <rect width="1600" height="900" fill={`url(#fs-grid-${uid})`} />
      {/* Subtle trade arcs (India outward) */}
      <g fill="none" strokeWidth="0.9">
        <path
          d="M 920 470 Q 600 200, 220 320"
          stroke={`url(#fs-line-${uid})`}
        />
        <path
          d="M 920 470 Q 1180 200, 1480 280"
          stroke={`url(#fs-line-${uid})`}
        />
        <path
          d="M 920 470 Q 1100 720, 1450 760"
          stroke={`url(#fs-line-${uid})`}
        />
        <path
          d="M 920 470 Q 500 720, 180 740"
          stroke={`url(#fs-line-${uid})`}
        />
      </g>
      <g fill="rgba(212,175,55,0.45)">
        {[
          [220, 320],
          [1480, 280],
          [1450, 760],
          [180, 740],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.5" />
        ))}
        <circle cx={920} cy={470} r="5" fill="#34d399" />
      </g>
    </svg>
  );
}

function FloatingParticles() {
  const particles = [
    { left: "9%", top: "24%", delay: 0, size: 4, color: "bg-gold/40" },
    { left: "21%", top: "70%", delay: 0.7, size: 3, color: "bg-emerald-300/40" },
    { left: "44%", top: "16%", delay: 1.1, size: 5, color: "bg-gold/40" },
    { left: "63%", top: "34%", delay: 0.3, size: 3, color: "bg-royal-light/40" },
    { left: "78%", top: "60%", delay: 1.4, size: 4, color: "bg-emerald-300/40" },
    { left: "92%", top: "26%", delay: 1.9, size: 2, color: "bg-gold/40" },
    { left: "12%", top: "48%", delay: 0.9, size: 2, color: "bg-royal-light/40" },
    { left: "55%", top: "78%", delay: 2.3, size: 3, color: "bg-gold/40" },
  ];

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className={cx("absolute rounded-full blur-[1px]", p.color)}
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{
            duration: 5.5 + i * 0.4,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

/* World-map style visualization: India at center with animated trade lines */
function AgriExportMap({ uid }: { uid: string }) {
  const destinations = [
    { x: 130, y: 110, label: "USA" },
    { x: 280, y: 90, label: "UK" },
    { x: 360, y: 130, label: "EU" },
    { x: 520, y: 160, label: "GCC" },
    { x: 740, y: 200, label: "ASEAN" },
    { x: 820, y: 130, label: "Japan" },
    { x: 760, y: 350, label: "Australia" },
    { x: 380, y: 320, label: "Africa" },
  ];
  const india = { x: 620, y: 220 };

  return (
    <svg
      viewBox="0 0 900 460"
      className="w-full h-full"
      role="img"
      aria-label="Agricultural export reach from India to global markets"
    >
      <defs>
        <radialGradient id={`map-glow-${uid}`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.18" />
          <stop offset="45%" stopColor="#1e40af" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`map-arc-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
          <stop offset="50%" stopColor="#d4af37" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="900" height="460" fill={`url(#map-glow-${uid})`} />

      {/* Stylized continents (simple blobs) */}
      <g fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6">
        {/* Americas */}
        <path d="M 60 90 Q 110 60 160 110 Q 200 160 170 220 Q 140 270 110 250 Q 70 220 60 170 Z" />
        <path d="M 130 270 Q 170 260 200 310 Q 210 360 170 380 Q 130 370 120 330 Z" />
        {/* Europe */}
        <path d="M 270 70 Q 330 60 380 100 Q 410 130 380 160 Q 330 180 290 160 Q 260 130 270 90 Z" />
        {/* Africa */}
        <path d="M 340 200 Q 410 200 430 270 Q 420 360 370 380 Q 320 360 320 290 Q 320 230 340 200 Z" />
        {/* Middle East / GCC */}
        <path d="M 470 150 Q 520 140 555 170 Q 560 200 530 215 Q 490 215 470 195 Z" />
        {/* Asia */}
        <path d="M 560 70 Q 700 50 820 100 Q 870 140 840 200 Q 760 230 660 210 Q 580 190 560 140 Z" />
        {/* South East Asia */}
        <path d="M 700 220 Q 770 210 790 250 Q 780 285 740 290 Q 700 280 690 250 Z" />
        {/* Australia */}
        <path d="M 720 330 Q 790 320 820 360 Q 810 395 760 400 Q 720 390 710 360 Z" />
      </g>

      {/* India highlight */}
      <g>
        <motion.circle
          cx={india.x}
          cy={india.y}
          r="36"
          fill="rgba(212,175,55,0.12)"
          stroke="rgba(212,175,55,0.45)"
          strokeWidth="0.8"
          animate={{ r: [34, 40, 34], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx={india.x} cy={india.y} r="7" fill="#d4af37" />
        <text
          x={india.x}
          y={india.y + 30}
          textAnchor="middle"
          className="fill-white"
          style={{ font: "600 11px 'Plus Jakarta Sans', sans-serif", letterSpacing: "0.16em" }}
        >
          INDIA
        </text>
      </g>

      {/* Animated arcs to destinations */}
      {destinations.map((d, i) => {
        const cx1 = (india.x + d.x) / 2;
        const cy1 = Math.min(india.y, d.y) - 80;
        const path = `M ${india.x} ${india.y} Q ${cx1} ${cy1} ${d.x} ${d.y}`;
        return (
          <g key={d.label}>
            <path
              d={path}
              stroke={`url(#map-arc-${uid})`}
              strokeWidth="1.1"
              fill="none"
            />
            <motion.circle
              r="2.4"
              fill="#fff7d6"
              initial={{ offsetDistance: "0%", opacity: 0 }}
              animate={{ offsetDistance: "100%", opacity: [0, 1, 0] }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                delay: i * 0.45,
                ease: "easeInOut",
              }}
              style={{ offsetPath: `path('${path}')` }}
            />
            <motion.circle
              cx={d.x}
              cy={d.y}
              r="3"
              fill="#d4af37"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.2 }}
            />
            <text
              x={d.x}
              y={d.y - 8}
              textAnchor="middle"
              className="fill-white/70"
              style={{ font: "500 9px 'Inter', sans-serif", letterSpacing: "0.18em" }}
            >
              {d.label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ============================================================
   Main Section
   ============================================================ */

export function FarmerSupportServicesSection() {
  const uid = useId().replace(/:/g, "");
  const [activeIndex, setActiveIndex] = useState(0);
  const [openMobileIndex, setOpenMobileIndex] = useState<number | null>(0);

  const active = CATEGORIES[activeIndex];

  return (
    <section
      id="farmer-support-services"
      aria-labelledby="farmer-support-heading"
      className="relative page-nav-offset overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950"
    >
      <AgriTradeBackdrop uid={uid} />
      <motion.div
        className="absolute inset-0 bg-grid bg-grid-fade opacity-[0.06] pointer-events-none"
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <FloatingParticles />

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-[480px] h-[480px] rounded-full bg-emerald-500/[0.08] blur-[140px] pointer-events-none"
        animate={{ x: [0, 24, 0], y: [0, -18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[520px] h-[520px] rounded-full bg-gold/[0.07] blur-[140px] pointer-events-none"
        animate={{ x: [0, -22, 0], y: [0, 20, 0] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        aria-hidden
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full bg-royal/[0.06] blur-[160px] pointer-events-none"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* ============ HEADER ============ */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-5"
          >
            <i className="fas fa-tractor text-gold text-xs" aria-hidden />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/85 font-semibold">
              Farmer Support Services
            </span>
            <span className="h-3 w-px bg-white/15" />
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-emerald-300/90 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Agri-Trade Desk
            </span>
          </motion.div>

          <motion.h2
            id="farmer-support-heading"
            variants={itemVariants}
            className="display-title font-display font-bold leading-[1.04] mb-4"
          >
            <span className="text-white">Farmer Support</span>{" "}
            <span className="text-gradient-gold italic font-serif font-normal">
              Services.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-white/75 text-base md:text-lg font-serif italic"
          >
            &ldquo;Empowering Farmers from Field to Global Market.&rdquo;
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-sm md:text-base text-white/55 leading-relaxed max-w-2xl mx-auto"
          >
            A dedicated agricultural ecosystem connecting Indian farmers with
            market access, training, finance, exports and modern agri-tech —
            engineered to scale rural prosperity globally.
          </motion.p>
        </motion.div>

        {/* ============ STATS ============ */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 lg:mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="relative group glass-dark rounded-2xl border border-white/10 px-5 py-5 sm:py-6 text-center hover:border-gold/30 transition duration-500"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl bg-navy-900 border border-gold/30 flex items-center justify-center shadow-gold/0 group-hover:border-gold/60 transition">
                <i className={cx("fas", stat.icon, "text-gold text-sm")} aria-hidden />
              </div>
              <div className="mt-4 font-display text-3xl sm:text-4xl font-bold text-white">
                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white/55 mt-2">
                {stat.label}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </motion.div>
          ))}
        </motion.div>

        {/* ============ DESKTOP: SIDE TABS + PANEL ============ */}
        <motion.div
          className="hidden lg:grid grid-cols-12 gap-6 lg:gap-8 mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {/* Tabs */}
          <motion.div
            variants={itemVariants}
            className="col-span-5 xl:col-span-4"
            role="tablist"
            aria-label="Farmer support categories"
          >
            <div className="glass-dark rounded-3xl border border-white/10 p-3 sticky top-28">
              <div className="px-3 pt-3 pb-2">
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold/90 font-semibold mb-1">
                  Service Pillars
                </div>
                <div className="text-white/55 text-xs">
                  Five integrated programs powering agri-prosperity.
                </div>
              </div>
              <div className="flex flex-col gap-1.5 mt-2">
                {CATEGORIES.map((cat, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`fs-panel-${cat.id}`}
                      id={`fs-tab-${cat.id}`}
                      onClick={() => setActiveIndex(i)}
                      className={cx(
                        "group relative flex items-center gap-4 px-4 py-4 rounded-2xl border text-left transition-all duration-400",
                        isActive
                          ? "border-gold/40 bg-gradient-to-r from-gold/10 via-white/[0.03] to-transparent shadow-gold"
                          : "border-white/5 hover:border-white/15 hover:bg-white/[0.03]",
                      )}
                    >
                      <span
                        className={cx(
                          "relative shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border transition",
                          isActive
                            ? "border-gold/50 bg-navy-900"
                            : "border-white/10 bg-white/[0.03] group-hover:border-gold/30",
                        )}
                      >
                        <i
                          className={cx(
                            "fas",
                            cat.icon,
                            "text-base transition",
                            isActive ? "text-gold" : "text-white/70 group-hover:text-gold",
                          )}
                          aria-hidden
                        />
                        {isActive && (
                          <motion.span
                            layoutId="fs-active-glow"
                            className="absolute inset-0 rounded-xl"
                            style={{
                              boxShadow: `0 0 0 1px ${cat.ring}, 0 0 24px ${cat.ring}`,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 320,
                              damping: 30,
                            }}
                          />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] uppercase tracking-[0.22em] text-white/45 mb-0.5">
                          0{i + 1} · {cat.label}
                        </span>
                        <span
                          className={cx(
                            "block text-sm font-semibold leading-snug transition",
                            isActive ? "text-white" : "text-white/80 group-hover:text-white",
                          )}
                        >
                          {cat.title}
                        </span>
                      </span>
                      <i
                        className={cx(
                          "fas fa-arrow-right ml-auto text-[10px] transition",
                          isActive
                            ? "text-gold translate-x-1"
                            : "text-white/30 group-hover:text-gold",
                        )}
                        aria-hidden
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Panel */}
          <motion.div
            variants={itemVariants}
            className="col-span-7 xl:col-span-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                role="tabpanel"
                id={`fs-panel-${active.id}`}
                aria-labelledby={`fs-tab-${active.id}`}
                variants={panelVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="relative glass-dark rounded-3xl border border-white/10 p-7 lg:p-9 overflow-hidden"
              >
                {/* Accent backdrop */}
                <div
                  className={cx(
                    "absolute inset-0 opacity-60 bg-gradient-to-br pointer-events-none",
                    active.accent,
                  )}
                  aria-hidden
                />
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

                <div className="relative">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-navy-900/80 border border-gold/30 flex items-center justify-center shrink-0">
                      <i className={cx("fas", active.icon, "text-gold text-xl")} aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-gold/90 font-semibold mb-1.5">
                        0{activeIndex + 1} / {CATEGORIES.length} · {active.label}
                      </div>
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-white leading-tight">
                        {active.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/65 font-serif italic">
                        {active.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-white/75 text-sm lg:text-base leading-relaxed mb-7 max-w-2xl">
                    {active.summary}
                  </p>

                  <motion.div
                    className="grid sm:grid-cols-2 gap-3 lg:gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {active.services.map((s) => (
                      <motion.div
                        key={s.title}
                        variants={itemVariants}
                        whileHover={{ y: -2 }}
                        className="group glass rounded-2xl border border-white/10 p-4 hover:border-gold/40 transition duration-400"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-navy-950 transition-colors duration-400">
                            <i
                              className={cx("fas", s.icon, "text-gold text-sm group-hover:text-navy-950 transition")}
                              aria-hidden
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="text-white font-semibold text-sm leading-snug mb-1 group-hover:text-gold transition">
                              {s.title}
                            </div>
                            <div className="text-white/55 text-xs leading-relaxed">
                              {s.desc}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <div className="mt-7 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3 justify-between">
                    <div className="flex items-center gap-2 text-xs text-white/55">
                      <i className="fas fa-shield-check text-gold" aria-hidden />
                      Backed by IICCI&apos;s 47-year trade legacy.
                    </div>
                    <Link
                      href="#contact"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-gold hover:gap-3 transition-all"
                    >
                      Connect with this desk
                      <i className="fas fa-arrow-right text-[10px]" aria-hidden />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* ============ MOBILE / TABLET: ACCORDION ============ */}
        <motion.div
          className="lg:hidden space-y-3 mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
        >
          {CATEGORIES.map((cat, i) => {
            const isOpen = openMobileIndex === i;
            return (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                className={cx(
                  "glass-dark rounded-2xl border overflow-hidden transition",
                  isOpen ? "border-gold/40 shadow-gold" : "border-white/10",
                )}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`fs-acc-${cat.id}`}
                  onClick={() => setOpenMobileIndex(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 px-4 py-4 text-left"
                >
                  <span
                    className={cx(
                      "w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 transition",
                      isOpen
                        ? "border-gold/50 bg-navy-900"
                        : "border-white/10 bg-white/[0.03]",
                    )}
                  >
                    <i
                      className={cx(
                        "fas",
                        cat.icon,
                        "text-base transition",
                        isOpen ? "text-gold" : "text-white/75",
                      )}
                      aria-hidden
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[9px] uppercase tracking-[0.22em] text-white/45 mb-0.5">
                      0{i + 1} · {cat.label}
                    </span>
                    <span className="block text-white font-semibold text-sm leading-snug">
                      {cat.title}
                    </span>
                  </span>
                  <motion.i
                    className="fas fa-chevron-down text-gold text-xs"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    aria-hidden
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`fs-acc-${cat.id}`}
                      key="content"
                      variants={accordionVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="overflow-hidden"
                    >
                      <div className="relative px-4 pb-5 pt-1">
                        <div
                          className={cx(
                            "absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent",
                          )}
                        />
                        <p className="text-white/65 text-xs leading-relaxed font-serif italic mt-3 mb-3">
                          {cat.tagline}
                        </p>
                        <p className="text-white/55 text-xs leading-relaxed mb-4">
                          {cat.summary}
                        </p>
                        <div className="space-y-2.5">
                          {cat.services.map((s) => (
                            <div
                              key={s.title}
                              className="flex items-start gap-3 glass rounded-xl border border-white/10 p-3"
                            >
                              <span className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                                <i
                                  className={cx("fas", s.icon, "text-gold text-xs")}
                                  aria-hidden
                                />
                              </span>
                              <div className="min-w-0">
                                <div className="text-white text-xs font-semibold mb-0.5">
                                  {s.title}
                                </div>
                                <div className="text-white/55 text-[11px] leading-relaxed">
                                  {s.desc}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ============ GLOBAL EXPORT MAP ============ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid lg:grid-cols-12 gap-6 lg:gap-8 mb-12 lg:mb-16"
        >
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 p-4 sm:p-6 lg:p-8 min-h-[320px] sm:min-h-[400px]">
            <div className="absolute inset-0 bg-grid opacity-[0.05]" aria-hidden />
            <div className="relative h-full flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold/90 font-semibold mb-1">
                    <i className="fas fa-globe text-gold" aria-hidden /> Global Agri Reach
                  </div>
                  <div className="text-white font-display text-lg sm:text-xl font-semibold">
                    Indian harvest, delivered to the world.
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/55">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Routes
                </div>
              </div>
              <div className="relative flex-1 -mx-2 sm:mx-0">
                <AgriExportMap uid={uid} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-royal-dark via-navy-900 to-navy-950 p-6 lg:p-7">
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gold/15 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold/90 font-semibold mb-3">
                  <i className="fas fa-seedling text-gold" aria-hidden /> Agri-Export Highlights
                </div>
                <h3 className="font-display text-2xl font-bold text-white leading-tight mb-3">
                  18+ crop verticals, <span className="text-gradient-gold italic font-serif font-normal">25+ countries.</span>
                </h3>
                <p className="text-white/65 text-sm leading-relaxed mb-5">
                  From basmati and spices to organic millets and horticulture —
                  IICCI&apos;s agri-export desk connects farmer producer
                  organisations to vetted global buyers under one premium
                  trade umbrella.
                </p>
                <ul className="grid grid-cols-2 gap-2 text-xs text-white/75">
                  {[
                    { i: "fa-wheat-awn", t: "Cereals & Grains" },
                    { i: "fa-pepper-hot", t: "Spices & Herbs" },
                    { i: "fa-apple-whole", t: "Fresh Produce" },
                    { i: "fa-mug-hot", t: "Coffee & Tea" },
                    { i: "fa-cheese", t: "Dairy & Processed" },
                    { i: "fa-leaf", t: "Organic & Millets" },
                  ].map((x) => (
                    <li
                      key={x.t}
                      className="flex items-center gap-2 glass rounded-xl border border-white/10 px-3 py-2"
                    >
                      <i className={cx("fas", x.i, "text-gold text-xs")} aria-hidden />
                      <span className="truncate">{x.t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-white/10 glass-dark p-6 lg:p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
                  <i className="fas fa-hand-holding-heart text-emerald-300 text-sm" aria-hidden />
                </div>
                <div className="text-white font-display font-semibold text-base">
                  Farmer-first commitment
                </div>
              </div>
              <p className="text-white/60 text-xs leading-relaxed">
                Every program is co-designed with FPOs, agri-cooperatives and
                state agriculture boards to guarantee that prosperity flows
                back to the farmer — measurably and sustainably.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  { v: "92%", l: "Farmer Retention" },
                  { v: "₹8.4L", l: "Avg. Income Lift" },
                  { v: "4.8★", l: "Field Rating" },
                ].map((m) => (
                  <div
                    key={m.l}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-2 py-3"
                  >
                    <div className="font-display text-base font-bold text-gold">
                      {m.v}
                    </div>
                    <div className="text-[9px] uppercase tracking-[0.18em] text-white/50 mt-1">
                      {m.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============ CTA ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-royal-dark via-navy-950 to-navy-900 p-8 lg:p-12"
        >
          <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-gold/15 blur-3xl" />
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-semibold">
                  Agriculture Desk
                </span>
              </div>
              <h3 className="font-display text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
                Let&apos;s take your harvest{" "}
                <span className="text-gradient-gold italic font-serif font-normal">
                  to the world.
                </span>
              </h3>
              <p className="text-white/65 text-sm lg:text-base max-w-xl">
                Whether you&apos;re a farmer, FPO, agri-startup or international
                buyer — our agriculture desk is ready to build the right
                program around you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:shrink-0">
              <Link
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold btn-premium shadow-gold"
              >
                Explore Agri Trade Support
                <motion.i
                  className="fas fa-arrow-right text-xs"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden
                />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-white/[0.04] border border-white/15 text-white text-sm font-semibold hover:border-gold/40 transition-all duration-300"
              >
                Connect with IICCI Agriculture Desk
                <i className="fas fa-headset text-xs text-gold" aria-hidden />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function FarmerSupportPage() {
  return (
    <main>
      <FarmerSupportServicesSection />
    </main>
  );
}
