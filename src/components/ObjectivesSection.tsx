"use client";

import { useCallback, useId, useState, type MouseEvent } from "react";
import { motion, type Variants } from "framer-motion";

type Objective = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

const OBJECTIVES: ReadonlyArray<Objective> = [
  {
    id: "trade",
    icon: "fa-ship",
    title: "Facilitate seamless import & export trade",
    description:
      "Streamlined customs liaison, documentation support, and bilateral desk coordination for members.",
  },
  {
    id: "bilateral",
    icon: "fa-handshake-angle",
    title: "Promote bilateral & multilateral trade cooperation",
    description:
      "Government-to-business forums, trade missions, and chamber-to-chamber alliances worldwide.",
  },
  {
    id: "protect",
    icon: "fa-shield-halved",
    title: "Protect interests of the importing community",
    description:
      "Policy advocacy, dispute resolution guidance, and representation before regulators.",
  },
  {
    id: "connect",
    icon: "fa-globe",
    title: "Connect Indian businesses with global markets",
    description:
      "Matchmaking, foreign desks, and access to 50+ international chapters and partners.",
  },
  {
    id: "msme",
    icon: "fa-lightbulb",
    title: "Support MSMEs, startups, entrepreneurs & farmers",
    description:
      "Inclusive programs that scale small enterprises into export-ready global players.",
  },
  {
    id: "embassies",
    icon: "fa-building-columns",
    title: "Collaborate with embassies & global chambers",
    description:
      "High-trust corridors with diplomatic missions and apex trade bodies across continents.",
  },
  {
    id: "tech",
    icon: "fa-microchip",
    title: "Bring advanced technologies through joint ventures",
    description:
      "Technology transfer, JV structuring, and innovation partnerships for competitive advantage.",
  },
  {
    id: "sustainable",
    icon: "fa-leaf",
    title: "Promote sustainable & ethical trade",
    description:
      "ESG-aligned commerce, responsible sourcing, and SDG-integrated chamber initiatives.",
  },
  {
    id: "training",
    icon: "fa-graduation-cap",
    title: "Build skilled professionals through training programs",
    description:
      "Certified courses, masterclasses, and placement pathways for trade-ready talent.",
  },
];

const HIGHLIGHTS = [
  { value: "9", label: "Core Objectives" },
  { value: "50+", label: "Global Chapters" },
  { value: "47+", label: "Years of Legacy" },
  { value: "10K+", label: "Member Network" },
] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function TradeNetworkBackdrop({ uid }: { uid: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id={`obj-glow-${uid}`} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#1e40af" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#obj-glow-${uid})`} />
      <g fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="0.8">
        <ellipse cx="800" cy="450" rx="680" ry="280" />
        <ellipse cx="800" cy="450" rx="500" ry="200" />
        <ellipse cx="800" cy="450" rx="320" ry="120" />
      </g>
      <g fill="rgba(212,175,55,0.35)">
        {[
          [320, 320],
          [520, 260],
          [800, 240],
          [1080, 280],
          [1280, 360],
          [420, 480],
          [800, 520],
          [1180, 500],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" />
        ))}
      </g>
      <g stroke="rgba(212,175,55,0.25)" strokeWidth="1" fill="none">
        <path d="M 320 320 Q 560 200, 800 240" />
        <path d="M 800 240 Q 940 180, 1080 280" />
        <path d="M 1080 280 Q 1200 320, 1280 360" />
        <path d="M 420 480 Q 620 400, 800 520" />
        <path d="M 800 520 Q 1000 460, 1180 500" />
        <path d="M 800 240 L 800 520" strokeDasharray="4 6" opacity="0.5" />
      </g>
      <motion.circle
        cx="800"
        cy="380"
        r="6"
        fill="#d4af37"
        animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function FloatingParticles() {
  const particles = [
    { left: "6%", top: "18%", delay: 0, size: 4 },
    { left: "18%", top: "72%", delay: 0.6, size: 3 },
    { left: "42%", top: "10%", delay: 1.1, size: 5 },
    { left: "62%", top: "28%", delay: 0.3, size: 3 },
    { left: "78%", top: "65%", delay: 1.4, size: 4 },
    { left: "90%", top: "38%", delay: 1.8, size: 2 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gold/35 blur-[1px]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 5.5 + i * 0.35,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function ObjectiveCard({
  objective,
  index,
  onSpotlight,
}: {
  objective: Objective;
  index: number;
  onSpotlight: (e: MouseEvent<HTMLElement>) => void;
}) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 340, damping: 22 }}
      className="group relative h-full reveal-up"
      onMouseMove={onSpotlight}
    >
      <div
        className={cx(
          "relative flex h-full flex-col rounded-2xl border p-5 sm:p-6 overflow-hidden",
          "bg-navy-950/55 backdrop-blur-xl border-white/10 shadow-premium",
          "transition-all duration-500",
          "hover:border-gold/45 hover:shadow-gold",
          "before:absolute before:inset-0 before:rounded-2xl before:opacity-0 before:transition-opacity before:duration-500 before:pointer-events-none",
          "before:bg-[radial-gradient(ellipse_at_var(--mx,50%)_var(--my,0%),rgba(212,175,55,0.16),transparent_60%)]",
          "group-hover:before:opacity-100",
        )}
      >
        <div
          className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gold/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          aria-hidden
        />

        <div className="relative flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy-950 transition duration-500 shrink-0">
            <i className={cx("fas", objective.icon, "text-lg")} aria-hidden />
          </div>
          <span className="text-[10px] font-mono font-bold text-white/25 group-hover:text-gold/50 transition tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="relative font-display text-sm sm:text-base font-bold text-white leading-snug mb-2 group-hover:text-gold transition-colors duration-300">
          {objective.title}
        </h3>
        <p className="relative text-xs sm:text-sm text-white/55 leading-relaxed flex-1">
          {objective.description}
        </p>

        <div className="relative mt-4 pt-3 border-t border-white/8 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-gold/60 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
          IICCI mandate
        </div>
      </div>
    </motion.article>
  );
}

export const ObjectivesSection = () => {
  const uid = useId().replace(/:/g, "");
  const handleSpotlight = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  }, []);

  return (
    <section
      id="our-objectives"
      aria-labelledby="objectives-heading"
      className="relative section-padding overflow-hidden bg-gradient-to-b from-navy-900 via-navy-950 to-navy-950"
    >
      <TradeNetworkBackdrop uid={uid} />
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-[0.07] pointer-events-none" />
      <FloatingParticles />

      <motion.div
        className="absolute top-1/4 -left-24 w-[480px] h-[480px] rounded-full bg-royal/15 blur-[140px] pointer-events-none"
        animate={{ x: [0, 20, 0], y: [0, -12, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute bottom-1/4 -right-24 w-[520px] h-[520px] rounded-full bg-gold/[0.07] blur-[140px] pointer-events-none"
        animate={{ x: [0, -16, 0], y: [0, 14, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={headerVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-6"
          >
            <i className="fas fa-bullseye text-gold text-xs" aria-hidden />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-semibold">
              Institutional Purpose
            </span>
            <span className="h-3 w-px bg-white/15" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold/90 font-semibold">
              IICCI
            </span>
          </motion.div>

          <motion.h2
            id="objectives-heading"
            variants={headerVariants}
            className="display-title font-display font-bold mb-4 leading-[1.02]"
          >
            <span className="text-white">Our</span>{" "}
            <span className="text-gradient-gold italic font-serif font-normal">
              Objectives
            </span>
          </motion.h2>

          <motion.p
            variants={headerVariants}
            className="text-base md:text-lg text-white/70 leading-relaxed font-serif italic"
          >
            &ldquo;What IICCI Stands For&rdquo;
          </motion.p>

          <motion.p
            variants={headerVariants}
            className="mt-4 text-sm md:text-base text-white/55 leading-relaxed max-w-2xl mx-auto"
          >
            Mission-driven goals that connect India&apos;s importing community to
            global markets through policy, partnership, and professional excellence.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 lg:mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
        >
          {HIGHLIGHTS.map((h) => (
            <motion.div
              key={h.label}
              variants={headerVariants}
              className="rounded-2xl glass border border-white/10 px-4 py-4 sm:py-5 text-center hover:border-gold/30 transition duration-500"
            >
              <div className="font-display text-2xl sm:text-3xl font-bold text-white">
                {h.value}
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/50 mt-1">
                {h.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {OBJECTIVES.map((objective, index) => (
            <ObjectiveCard
              key={objective.id}
              objective={objective}
              index={index}
              onSpotlight={handleSpotlight}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-14 lg:mt-16 flex flex-wrap items-center justify-center gap-4"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass border border-white/10">
            <i className="fas fa-route text-gold" aria-hidden />
            <span className="text-sm text-white/80">
              Trade facilitation rooted in{" "}
              <span className="font-semibold text-white">global chamber standards</span>
            </span>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass border border-white/10">
            <i className="fas fa-handshake text-gold" aria-hidden />
            <span className="text-sm text-white/80">
              Partnerships across embassies, industry &amp; MSME ecosystems
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ObjectivesSection;
