"use client";

import Link from "next/link";
import { useCallback, useId, type MouseEvent } from "react";
import { motion, type Variants } from "framer-motion";
import {
  FEATURED_VERTICALS,
  TOTAL_VERTICAL_COUNT,
} from "@/config/trade-verticals";
import { VerticalCard } from "@/components/VerticalCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
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

function TradeGridBackdrop({ uid }: { uid: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id={`iv-glow-${uid}`} cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.45" />
          <stop offset="45%" stopColor="#1e40af" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
        <pattern
          id={`iv-grid-${uid}`}
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 48 0 L 0 0 0 48"
            fill="none"
            stroke="rgba(212,175,55,0.12)"
            strokeWidth="0.6"
          />
        </pattern>
      </defs>
      <rect width="1600" height="900" fill={`url(#iv-glow-${uid})`} />
      <rect width="1600" height="900" fill={`url(#iv-grid-${uid})`} />
      <g stroke="rgba(212,175,55,0.18)" strokeWidth="0.8" fill="none">
        <path d="M 200 450 Q 500 200, 800 350 T 1400 400" />
        <path d="M 150 550 Q 450 300, 750 500 T 1350 550" />
        <path d="M 250 350 Q 550 150, 850 280 T 1450 320" />
      </g>
      <g fill="rgba(212,175,55,0.4)">
        {[
          [400, 280],
          [650, 220],
          [800, 380],
          [950, 260],
          [1100, 420],
          [1250, 320],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" />
        ))}
      </g>
    </svg>
  );
}

function FloatingParticles() {
  const particles = [
    { left: "8%", top: "22%", delay: 0, size: 4 },
    { left: "22%", top: "68%", delay: 0.8, size: 3 },
    { left: "48%", top: "14%", delay: 1.2, size: 5 },
    { left: "68%", top: "32%", delay: 0.4, size: 3 },
    { left: "82%", top: "58%", delay: 1.6, size: 4 },
    { left: "92%", top: "28%", delay: 2, size: 2 },
  ];

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gold/30 blur-[1px]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -16, 0],
            opacity: [0.15, 0.55, 0.15],
          }}
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

export function IndustryVerticalsSection() {
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
      id="industry-verticals"
      aria-labelledby="industry-verticals-heading"
      className="relative section-padding overflow-hidden bg-gradient-to-b from-navy-900 via-navy-950 to-navy-950"
    >
      <TradeGridBackdrop uid={uid} />
      <motion.div
        className="absolute inset-0 bg-grid bg-grid-fade opacity-[0.06] pointer-events-none"
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <FloatingParticles />

      <motion.div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-royal/12 blur-[140px] pointer-events-none"
        animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[540px] h-[540px] rounded-full bg-gold/[0.06] blur-[140px] pointer-events-none"
        animate={{ x: [0, -20, 0], y: [0, 18, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,900px)] h-[min(50vw,500px)] opacity-[0.04] pointer-events-none"
        aria-hidden
      >
        <svg viewBox="0 0 900 500" className="w-full h-full" fill="none">
          <ellipse
            cx="450"
            cy="250"
            rx="420"
            ry="180"
            stroke="rgba(212,175,55,0.5)"
            strokeWidth="0.8"
          />
          <ellipse
            cx="450"
            cy="250"
            rx="300"
            ry="120"
            stroke="rgba(59,130,246,0.35)"
            strokeWidth="0.6"
          />
          {[
            [180, 200],
            [320, 160],
            [450, 140],
            [580, 170],
            [720, 210],
            [250, 320],
            [450, 350],
            [650, 310],
          ].map(([cx, cy], i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="4"
              fill="#d4af37"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{
                duration: 2.5 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </motion.div>

      <motion.div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <div className="max-w-2xl">
            <motion.div
              variants={headerVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-5"
            >
              <i className="fas fa-layer-group text-gold text-xs" aria-hidden />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-semibold">
                Industry Verticals
              </span>
              <span className="h-3 w-px bg-white/15" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold/90 font-semibold">
                {TOTAL_VERTICAL_COUNT}+ Sectors
              </span>
            </motion.div>

            <motion.h2
              id="industry-verticals-heading"
              variants={headerVariants}
              className="display-title font-display font-bold mb-4 leading-[1.02]"
            >
              <span className="text-white">Industry</span>{" "}
              <span className="text-gradient-gold italic font-serif font-normal">
                Verticals
              </span>
            </motion.h2>

            <motion.p
              variants={headerVariants}
              className="text-base md:text-lg text-white/65 leading-relaxed"
            >
              Driving Growth Across 35+ High-Potential Sectors
            </motion.p>

            <motion.p
              variants={headerVariants}
              className="mt-3 text-sm md:text-base text-white/50 leading-relaxed max-w-xl"
            >
              From agriculture to aerospace — IICCI connects Indian importers to
              global supply chains across every major trade vertical.
            </motion.p>
          </div>

          <motion.div
            variants={headerVariants}
            className="flex flex-wrap items-center gap-3 lg:gap-4"
          >
            {[
              { value: `${TOTAL_VERTICAL_COUNT}+`, label: "Trade Verticals" },
              { value: "50+", label: "Global Markets" },
              { value: "10K+", label: "Member Network" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="rounded-2xl glass border border-white/10 px-5 py-4 text-center min-w-[100px] hover:border-gold/30 transition duration-500"
                whileHover={{ y: -3 }}
              >
                <motion.div
                  className="font-display text-2xl font-bold text-white"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {stat.value}
                </motion.div>
                <motion.div className="text-[9px] uppercase tracking-[0.18em] text-white/45 mt-1">
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {FEATURED_VERTICALS.map((vertical, index) => (
            <VerticalCard
              key={vertical.id}
              vertical={vertical}
              index={index}
              variant="dark"
              onSpotlight={handleSpotlight}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/trade-verticals"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold text-navy-950 text-sm font-bold border border-gold/20 hover:shadow-gold hover:scale-[1.02] transition-all duration-300"
          >
            Explore All Trade Verticals
            <motion.i
              className="fas fa-arrow-right text-[10px]"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
          </Link>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass border border-white/10">
            <i className="fas fa-globe text-gold" aria-hidden />
            <span className="text-sm text-white/70">
              Sector-specific desks across{" "}
              <span className="font-semibold text-white">6 continents</span>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function IndustryVerticalsPage() {
  return (
    <main>
      <IndustryVerticalsSection />
    </main>
  );
}
