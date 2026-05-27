"use client";

import { GlobalPlacementSection } from "../globalPlacement/page";
import { BilateralTradeTutorialSection } from "../bilateralTrade/page";
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
   Data — replace fetchCertificationPrograms() with CMS/API
   ============================================================ */

export type CertificationArea = {
  id: string;
  title: string;
  icon: string;
  description: string;
  duration: string;
  level: string;
  badge: string;
  modules: number;
  accredited: string;
  accent: string;
  highlights: string[];
};

export type JourneyStep = {
  step: number;
  title: string;
  desc: string;
  icon: string;
};

export type Benefit = {
  icon: string;
  title: string;
  desc: string;
};

const CERTIFICATION_AREAS: CertificationArea[] = [
  {
    id: "intl-trade",
    title: "International Trade",
    icon: "fa-globe",
    description:
      "Master cross-border commerce frameworks, Incoterms, and global trade policy for enterprise roles.",
    duration: "10 weeks",
    level: "Foundation → Advanced",
    badge: "IICCI Global",
    modules: 12,
    accredited: "50+ countries",
    accent: "from-royal-light/25 via-gold/10 to-transparent",
    highlights: ["WTO fundamentals", "Trade agreements", "Market entry"],
  },
  {
    id: "import-export",
    title: "Import–Export Operations",
    icon: "fa-ship",
    description:
      "End-to-end export operations — documentation, customs, shipping, and compliance workflows.",
    duration: "12 weeks",
    level: "All levels",
    badge: "★ Flagship",
    modules: 14,
    accredited: "DGFT aligned",
    accent: "from-gold/20 via-royal/10 to-transparent",
    highlights: ["ICEGATE", "Shipping docs", "Customs clearance"],
  },
  {
    id: "logistics",
    title: "Logistics & Supply Chain",
    icon: "fa-truck-fast",
    description:
      "Global logistics orchestration, freight forwarding, warehousing and supply-chain digitisation.",
    duration: "8 weeks",
    level: "Intermediate",
    badge: "Industry Ready",
    modules: 10,
    accredited: "FIATA concepts",
    accent: "from-emerald-400/20 via-gold/10 to-transparent",
    highlights: ["Freight modes", "3PL partnerships", "Track & trace"],
  },
  {
    id: "biz-dev",
    title: "Business Development",
    icon: "fa-chart-line",
    description:
      "B2B growth, international sales pipelines, and strategic account management for trade firms.",
    duration: "6 weeks",
    level: "Professional",
    badge: "Career Track",
    modules: 8,
    accredited: "Global B2B",
    accent: "from-royal/25 via-gold/15 to-transparent",
    highlights: ["Lead generation", "Partner sourcing", "Deal closure"],
  },
  {
    id: "compliance",
    title: "Trade Compliance",
    icon: "fa-shield-halved",
    description:
      "FEMA, RBI, sanctions screening, export controls and regulatory risk for cross-border deals.",
    duration: "7 weeks",
    level: "Advanced",
    badge: "Compliance Pro",
    modules: 9,
    accredited: "Legal desk",
    accent: "from-amber-400/15 via-gold/10 to-transparent",
    highlights: ["FEMA/RBI", "Sanctions", "Audit readiness"],
  },
  {
    id: "global-markets",
    title: "Global Market Practices",
    icon: "fa-earth-asia",
    description:
      "Region-specific GTM playbooks — GCC, EU, ASEAN, US and Africa market intelligence.",
    duration: "9 weeks",
    level: "Intermediate",
    badge: "Regional Expert",
    modules: 11,
    accredited: "6 regions",
    accent: "from-royal-light/30 via-emerald-300/10 to-transparent",
    highlights: ["Market sizing", "Localisation", "Cultural trade"],
  },
  {
    id: "entrepreneurship",
    title: "Entrepreneurship",
    icon: "fa-lightbulb",
    description:
      "Launch and scale export-led startups with funding readiness, incubation and mentor networks.",
    duration: "5 weeks",
    level: "Founder",
    badge: "Startup Path",
    modules: 7,
    accredited: "Incubator+",
    accent: "from-gold/25 via-royal-light/10 to-transparent",
    highlights: ["Business plan", "Pitch deck", "Investor connect"],
  },
  {
    id: "professional-skills",
    title: "Professional Skills",
    icon: "fa-user-tie",
    description:
      "Executive communication, negotiation, digital literacy and leadership for global trade teams.",
    duration: "4 weeks",
    level: "All professionals",
    badge: "Soft Skills+",
    modules: 6,
    accredited: "HR endorsed",
    accent: "from-gold/15 via-white/5 to-transparent",
    highlights: ["Negotiation", "Presentation", "Team leadership"],
  },
];

const JOURNEY_STEPS: JourneyStep[] = [
  {
    step: 1,
    title: "Discover & Assess",
    desc: "Skill diagnostic and pathway recommendation aligned to your trade career goals.",
    icon: "fa-compass",
  },
  {
    step: 2,
    title: "Learn & Practice",
    desc: "Live masterclasses, case studies, and simulation labs with industry mentors.",
    icon: "fa-book-open",
  },
  {
    step: 3,
    title: "Validate & Certify",
    desc: "Proctored assessments and portfolio review for IICCI global certification.",
    icon: "fa-certificate",
  },
  {
    step: 4,
    title: "Deploy & Grow",
    desc: "Placement support, chamber referrals, and ongoing alumni trade desk access.",
    icon: "fa-rocket",
  },
];

const BENEFITS: Benefit[] = [
  {
    icon: "fa-award",
    title: "Globally Recognised Credentials",
    desc: "Credentials trusted by chambers, exporters, and international partners across 50+ markets.",
  },
  {
    icon: "fa-briefcase",
    title: "Career-Ready Curriculum",
    desc: "Job-aligned modules built with practising trade professionals and regulatory experts.",
  },
  {
    icon: "fa-users",
    title: "Mentor & Peer Network",
    desc: "Access to IICCI mentors, alumni circles, and B2B matchmaking from day one.",
  },
  {
    icon: "fa-infinity",
    title: "Lifetime Learning Access",
    desc: "Members enjoy refresher modules, policy updates, and new market playbooks.",
  },
];

const SUCCESS_STATS = [
  { value: 12000, suffix: "+", label: "Certified Professionals", icon: "fa-user-graduate" },
  { value: 50, suffix: "+", label: "Countries Recognised", icon: "fa-globe" },
  { value: 94, suffix: "%", label: "Completion Rate", icon: "fa-chart-simple" },
  { value: 3200, suffix: "+", label: "Placement Referrals", icon: "fa-briefcase" },
];

async function fetchCertificationPrograms() {
  await new Promise((r) => setTimeout(r, 200));
  return { areas: CERTIFICATION_AREAS, journey: JOURNEY_STEPS, benefits: BENEFITS };
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
  const [value, setValue] = useState(suffix === "%" ? "0" : "0");

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

function LearningBackdrop({ uid }: { uid: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id={`gc-glow-${uid}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="40%" stopColor="#d4af37" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`gc-path-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(212,175,55,0)" />
          <stop offset="50%" stopColor="rgba(212,175,55,0.5)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0)" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#gc-glow-${uid})`} />
      <path
        d="M 200 500 Q 500 200, 800 400 T 1400 350"
        fill="none"
        stroke={`url(#gc-path-${uid})`}
        strokeWidth="1.2"
      />
      <path
        d="M 250 600 Q 600 350, 900 550 T 1450 500"
        fill="none"
        stroke={`url(#gc-path-${uid})`}
        strokeWidth="0.8"
      />
    </svg>
  );
}

function FloatingParticles() {
  const pts = [
    { l: "12%", t: "22%", d: 0 },
    { l: "68%", t: "18%", d: 0.5 },
    { l: "42%", t: "72%", d: 1 },
    { l: "85%", t: "48%", d: 1.5 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {pts.map((p, i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/40"
          style={{ left: p.l, top: p.t }}
          animate={{ y: [0, -14, 0], opacity: [0.2, 0.65, 0.2] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: p.d }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   Certification Card
   ============================================================ */

function CertificationCard({
  cert,
  onPreview,
}: {
  cert: CertificationArea;
  onPreview: (c: CertificationArea) => void;
}) {
  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="group relative glass-dark rounded-3xl border border-white/10 overflow-hidden card-lift h-full flex flex-col"
    >
      <div
        className={cx(
          "absolute inset-0 opacity-50 bg-gradient-to-br pointer-events-none",
          cert.accent,
        )}
        aria-hidden
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition" />

      <div className="relative p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-navy-900 border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition duration-400">
            <i
              className={cx("fas", cert.icon, "text-gold text-lg group-hover:text-navy-950 transition")}
              aria-hidden
            />
          </div>
          <span className="shrink-0 px-2.5 py-1 rounded-full bg-gold/15 border border-gold/30 text-[9px] uppercase tracking-[0.16em] text-gold font-bold">
            {cert.badge}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-gold transition leading-snug">
          {cert.title}
        </h3>
        <p className="text-white/55 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {cert.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {cert.highlights.map((h) => (
            <span
              key={h}
              className="px-2 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[10px] text-white/60"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 text-center mb-4 pt-4 border-t border-white/10">
          <div>
            <div className="text-[9px] uppercase tracking-[0.14em] text-white/40">Duration</div>
            <div className="text-xs font-semibold text-white mt-0.5">{cert.duration}</div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-[0.14em] text-white/40">Modules</div>
            <div className="text-xs font-semibold text-gold mt-0.5">{cert.modules}</div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-[0.14em] text-white/40">Scope</div>
            <div className="text-xs font-semibold text-white mt-0.5 truncate" title={cert.accredited}>
              {cert.accredited}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/45">
            {cert.level}
          </span>
          <button
            type="button"
            onClick={() => onPreview(cert)}
            className="text-xs font-semibold text-gold hover:gap-2 inline-flex items-center gap-1.5 transition-all"
          >
            Preview
            <i className="fas fa-arrow-right text-[9px]" aria-hidden />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ============================================================
   Certification Preview Modal
   ============================================================ */

function CertificationModal({
  cert,
  onClose,
}: {
  cert: CertificationArea | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!cert) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [cert, onClose]);

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-navy-950/75 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close"
          />
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={cx(
              "relative w-full max-w-lg glass-dark rounded-3xl border border-white/15 overflow-hidden",
              "bg-gradient-to-br from-navy-900 via-navy-950 to-navy-950",
            )}
          >
            <div className={cx("absolute inset-0 opacity-40 bg-gradient-to-br", cert.accent)} />
            <div className="relative p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-navy-900 border border-gold/40 flex items-center justify-center">
                  <i className={cx("fas", cert.icon, "text-gold text-xl")} aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-gold/90 font-semibold mb-1">
                    {cert.badge}
                  </div>
                  <h3 id="cert-modal-title" className="font-display text-xl font-bold text-white">
                    {cert.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-9 h-9 rounded-lg border border-white/10 text-white/70 hover:text-gold transition"
                  aria-label="Close"
                >
                  <i className="fas fa-xmark" aria-hidden />
                </button>
              </div>
              <p className="text-white/65 text-sm leading-relaxed mb-5">{cert.description}</p>
              <ul className="space-y-2 mb-6">
                {cert.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-white/75">
                    <i className="fas fa-check text-gold text-xs" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="#contact"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold shadow-gold"
                  onClick={onClose}
                >
                  Apply for Certification
                  <i className="fas fa-arrow-right text-xs" aria-hidden />
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-full border border-white/15 text-white text-sm font-semibold hover:border-gold/40 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   Learning Journey Timeline
   ============================================================ */

function LearningJourney() {
  return (
    <motion.div
      variants={itemVariants}
      className="relative glass-dark rounded-3xl border border-white/10 p-6 lg:p-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-[0.05]" aria-hidden />
      <div className="relative">
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold/90 font-semibold mb-2">
          Certification Journey
        </div>
        <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-8">
          Your path to{" "}
          <span className="text-gradient-gold italic font-serif font-normal">
            global credibility.
          </span>
        </h3>

        <div className="hidden lg:block absolute top-[7.5rem] left-[12%] right-[12%] h-px">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-gold/50 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {JOURNEY_STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="relative text-center lg:text-left"
            >
              <div className="relative w-14 h-14 rounded-2xl bg-navy-900 border border-gold/35 flex items-center justify-center mx-auto lg:mx-0 mb-4">
                <i className={cx("fas", s.icon, "text-gold text-lg")} aria-hidden />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold text-navy-950 text-[10px] font-bold flex items-center justify-center">
                  {s.step}
                </span>
              </div>
              <h4 className="font-display font-bold text-white text-base mb-2">{s.title}</h4>
              <p className="text-white/55 text-xs leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   Main Section
   ============================================================ */

export function GlobalCertificationSection({ preview = false }: { preview?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const [previewCert, setPreviewCert] = useState<CertificationArea | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetchCertificationPrograms().then(() => setReady(true));
  }, []);

  const areas = preview ? CERTIFICATION_AREAS.slice(0, 4) : CERTIFICATION_AREAS;

  return (
    <section
      id="global-certification"
      aria-labelledby="global-certification-heading"
      className={cx(
        "relative overflow-hidden bg-gradient-to-b from-navy-950 via-royal-dark to-navy-950",
        preview ? "py-16 lg:py-20" : "page-nav-offset",
      )}
    >
      <LearningBackdrop uid={uid} />
      <div className="absolute inset-0 bg-grid opacity-[0.07] pointer-events-none" />
      <FloatingParticles />
      <motion.div
        className="absolute top-1/4 -left-32 w-[480px] h-[480px] rounded-full bg-royal/12 blur-[140px] pointer-events-none"
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[520px] h-[520px] rounded-full bg-gold/[0.07] blur-[140px] pointer-events-none"
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 z-10">
        {/* Header */}
        <motion.div
          className="grid lg:grid-cols-12 gap-10 items-end mb-12 lg:mb-16"
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
              <i className="fas fa-graduation-cap text-gold text-xs" aria-hidden />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/85 font-semibold">
                Training &amp; Certification
              </span>
              <span className="h-3 w-px bg-white/15" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-royal-light font-semibold">
                Learning Ecosystem
              </span>
            </motion.div>
            <motion.h2
              id="global-certification-heading"
              variants={itemVariants}
              className="display-title font-display font-bold leading-[1.04]"
            >
              <span className="text-white">Global Certification</span>{" "}
              <span className="text-gradient-gold italic font-serif font-normal">
                Program.
              </span>
            </motion.h2>
          </div>
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <p className="text-white/70 text-base md:text-lg font-serif italic mb-3">
              &ldquo;Globally Relevant Certifications for International Business Success.&rdquo;
            </p>
            <p className="text-white/55 text-sm md:text-base leading-relaxed">
              Professional growth, global career readiness, and trade expertise — delivered
              through IICCI&apos;s connected learning ecosystem.
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
            {SUCCESS_STATS.map((s) => (
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

        {/* Benefits */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 lg:mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {BENEFITS.map((b) => (
            <motion.div
              key={b.title}
              variants={itemVariants}
              className="glass rounded-2xl border border-white/10 p-5 hover:border-gold/25 transition group"
            >
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center mb-3 group-hover:bg-gold transition">
                <i
                  className={cx("fas", b.icon, "text-gold text-sm group-hover:text-navy-950 transition")}
                  aria-hidden
                />
              </div>
              <h3 className="font-display font-bold text-white text-sm mb-2">{b.title}</h3>
              <p className="text-white/55 text-xs leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Certification grid */}
        <motion.div
          className="mb-12 lg:mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold/90 font-semibold mb-1">
                Certification Areas
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                8 pathways. One global standard.
              </h3>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Enrolment open
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
            {areas.map((cert) => (
              <CertificationCard key={cert.id} cert={cert} onPreview={setPreviewCert} />
            ))}
          </div>
        </motion.div>

        {/* Journey */}
        {!preview && (
          <div className="mb-12 lg:mb-14">
            <LearningJourney />
          </div>
        )}

        {/* Student success strip */}
        {!preview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-12 gap-6 mb-12 lg:mb-14"
          >
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-gold/10 via-navy-900 to-navy-950 p-6 lg:p-8">
              <div className="text-[10px] uppercase tracking-[0.28em] text-gold/90 font-semibold mb-3">
                Alumni Spotlight
              </div>
              <blockquote className="font-serif italic text-white/80 text-lg leading-relaxed mb-4">
                &ldquo;The Global Certification Program gave me the compliance confidence and
                network to close my first EU export deal within 90 days.&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-bold text-sm">
                  AK
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Ananya Krishnan</div>
                  <div className="text-white/45 text-xs">Export Manager · Certified 2025</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 glass-dark rounded-3xl border border-white/10 p-6 lg:p-8">
              <div className="text-[10px] uppercase tracking-[0.28em] text-white/45 font-semibold mb-4">
                Progress simulation — sample cohort
              </div>
              {[
                { label: "International Trade", pct: 78 },
                { label: "Import–Export Operations", pct: 92 },
                { label: "Trade Compliance", pct: 65 },
              ].map((row, i) => (
                <div key={row.label} className="mb-4 last:mb-0">
                  <div className="flex justify-between text-xs text-white/70 mb-1.5">
                    <span>{row.label}</span>
                    <span className="text-gold font-semibold">{row.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-royal-light to-gold"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-white/40 text-[10px] uppercase tracking-[0.16em] mt-5">
                Live progress tracking in member learning dashboard
              </p>
            </div>
          </motion.div>
        )}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-navy-900 via-royal-dark to-navy-950 p-8 lg:p-10"
        >
          <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-gold/12 blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">
                Ready for{" "}
                <span className="text-gradient-gold italic font-serif font-normal">
                  global business?
                </span>
              </h3>
              <p className="text-white/60 text-sm max-w-xl">
                Join thousands of professionals building international trade careers through
                IICCI&apos;s certification ecosystem.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold shadow-gold hover:scale-[1.02] transition"
              >
                Apply for Certification
                <motion.i
                  className="fas fa-arrow-right text-xs"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  aria-hidden
                />
              </Link>
              <Link
                href="#ai"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white text-sm font-semibold hover:border-gold/40 transition"
              >
                Explore Training Programs
                <i className="fas fa-graduation-cap text-xs text-gold" aria-hidden />
              </Link>
              <Link
                href="#membership"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/[0.04] border border-white/10 text-white text-sm font-semibold hover:border-gold/30 transition"
              >
                Start Learning
                <i className="fas fa-play text-[10px] text-gold" aria-hidden />
              </Link>
            </div>
          </div>
        </motion.div>

        {preview && (
          <p className="text-center mt-8">
            <Link
              href="/services/globalProgram"
              className="text-gold text-sm font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              View full certification ecosystem
              <i className="fas fa-arrow-right text-[10px]" aria-hidden />
            </Link>
          </p>
        )}
      </div>

      <CertificationModal cert={previewCert} onClose={() => setPreviewCert(null)} />
    </section>
  );
}

export default function TrainingCertificationPage() {
  return (
    <main>
      <GlobalCertificationSection />
      <GlobalPlacementSection />
      <BilateralTradeTutorialSection />
    </main>
  );
}
