"use client";

import Link from "next/link";
import { useCallback, useId, useMemo, useState, type MouseEvent } from "react";
import { motion, type Variants } from "framer-motion";
import {
  TRADE_VERTICALS,
  TOTAL_VERTICAL_COUNT,
  VERTICAL_CATEGORIES,
  type VerticalCategory,
} from "@/config/trade-verticals";
import { VerticalCard } from "@/components/VerticalCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.03 },
  },
};

const headerVariants: Variants = {
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

export function TradeVerticalsFull() {
  const uid = useId().replace(/:/g, "");
  const [activeCategory, setActiveCategory] = useState<VerticalCategory | "all">(
    "all",
  );

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? TRADE_VERTICALS
        : TRADE_VERTICALS.filter((v) => v.category === activeCategory),
    [activeCategory],
  );

  const handleSpotlight = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  }, []);

  return (
  <>
    <section className="relative pt-28 pb-10 lg:pt-32 lg:pb-12 overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950">
      <motion.div
        className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none"
        animate={{ opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <div className="absolute top-1/3 -right-32 w-[420px] h-[420px] rounded-full bg-royal/12 blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <nav
            className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/45 mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-gold transition">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="text-gold/80">Trade Verticals</span>
          </nav>

          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-semibold">
              Global Trade Ecosystem
            </span>
          </motion.div>

          <h1 className="display-title font-display font-bold text-white mb-4 leading-[1.02]">
            Trade{" "}
            <span className="text-gradient-gold italic font-serif font-normal">
              Verticals
            </span>
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed font-serif italic">
            &ldquo;Driving Growth Across 35+ High-Potential Sectors&rdquo;
          </p>
          <p className="mt-4 text-sm md:text-base text-white/55 max-w-3xl leading-relaxed">
            Explore IICCI&apos;s comprehensive sector coverage — from agriculture
            and pharmaceuticals to AI, defence, and renewable energy. Each
            vertical is supported by dedicated trade desks, policy advocacy, and
            global matchmaking.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="relative section-padding overflow-hidden bg-white">
      <svg
        viewBox="0 0 1600 400"
        className="absolute inset-x-0 top-0 h-48 opacity-[0.04] pointer-events-none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <pattern
            id={`tv-grid-${uid}`}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(8,17,32,0.15)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="1600" height="400" fill={`url(#tv-grid-${uid})`} />
      </svg>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 lg:mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
        >
          {[
            { value: `${TOTAL_VERTICAL_COUNT}+`, label: "Industry Sectors" },
            { value: "8", label: "Core Categories" },
            { value: "50+", label: "Global Chapters" },
            { value: "10K+", label: "Member Companies" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={headerVariants}
              className="rounded-2xl glass-light border border-navy-950/10 px-4 py-5 text-center hover:border-gold/30 transition duration-500"
            >
              <div className="font-display text-2xl sm:text-3xl font-bold text-navy-950">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-navy-950/50 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2 mb-10 lg:mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={containerVariants}
          role="tablist"
          aria-label="Filter trade verticals by category"
        >
          {VERTICAL_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              variants={headerVariants}
              onClick={() => setActiveCategory(cat.id)}
              className={cx(
                "px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300",
                activeCategory === cat.id
                  ? "bg-navy-950 text-white border-navy-950 shadow-premium"
                  : "bg-navy-950/5 text-navy-950/70 border-navy-950/10 hover:border-gold/40",
              )}
            >
              {cat.label}
              {cat.id !== "all" && (
                <span className="ml-1.5 text-[10px] opacity-60">
                  (
                  {
                    TRADE_VERTICALS.filter((v) => v.category === cat.id)
                      .length
                  }
                  )
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {filtered.map((vertical, index) => (
            <VerticalCard
              key={vertical.id}
              vertical={vertical}
              index={index}
              variant="light"
              onSpotlight={handleSpotlight}
            />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-navy-950/60 py-16">
            No sectors found in this category.
          </p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/#membership"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-navy-950 text-white text-sm font-semibold border border-navy-950/10 hover:border-gold/40 hover:shadow-gold transition-all duration-300"
          >
            Join IICCI Membership
            <i className="fas fa-arrow-right text-[10px] text-gold" aria-hidden />
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-navy-950/5 border border-navy-950/10 text-navy-950 text-sm font-semibold hover:border-gold/40 transition-all duration-300"
          >
            Connect with a Sector Desk
            <i className="fas fa-headset text-[10px] text-gold" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  </>
  );
}

export default TradeVerticalsFull;
