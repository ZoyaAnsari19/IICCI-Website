"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type SubpageHeroProps = {
  title: string;
  tagline: string;
  badge?: string;
};

export function SubpageHero({ title, tagline, badge = "About IICCI" }: SubpageHeroProps) {
  return (
    <section className="relative pt-28 pb-10 lg:pt-32 lg:pb-12 overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950">
      <div className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none" />
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
            <Link href="/about" className="hover:text-gold transition">
              About
            </Link>
            <span aria-hidden>/</span>
            <span className="text-gold/80">{title}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-semibold">
              {badge}
            </span>
          </div>

          <h1 className="display-title font-display font-bold text-white mb-4 leading-[1.02]">
            {title}
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed font-serif italic">
            &ldquo;{tagline}&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
