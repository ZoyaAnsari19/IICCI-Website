"use client";

import { motion } from "framer-motion";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const LeadershipHero = ({ embedded = false }: { embedded?: boolean }) => {
  const HeadingTag = embedded ? "h2" : "h1";

  return (
    <section
      id="leadership"
      aria-label="Leadership"
      className={cx(
        "relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950",
        embedded
          ? "section-padding border-t border-white/10"
          : "pt-32 pb-16 lg:pt-40 lg:pb-20",
      )}
    >
      <div className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-royal/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-gold/[0.08] blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-semibold">
              IICCI Leadership
            </span>
          </div>

          <HeadingTag
            className="display-title font-display font-bold mb-5 leading-[1.02]"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span className="text-white">Governance, Vision &amp;</span>
            <br />
            <span className="text-gradient-gold italic font-serif font-normal">
              Global Trade Leadership
            </span>
          </HeadingTag>

          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Meet the leadership, honorary directors, and operational teams
            powering India&rsquo;s premier chamber for importers and
            international trade.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadershipHero;
