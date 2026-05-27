"use client";

import { motion, type Variants } from "framer-motion";

const AWARDS = [
  {
    icon: "fa-landmark",
    title: "Govt. of India Recognized",
    body: "Officially recognized chamber advancing India's import community and bilateral trade policy engagement.",
  },
  {
    icon: "fa-certificate",
    title: "ISO 9001 Certified",
    body: "Quality management systems certified for institutional excellence in member services and operations.",
  },
  {
    icon: "fa-globe",
    title: "WTO Affiliated",
    body: "Aligned with World Trade Organization frameworks supporting fair, rules-based international commerce.",
  },
  {
    icon: "fa-leaf",
    title: "UN Global Compact Member",
    body: "Committed to responsible business principles, sustainability, and ethical global trade practices.",
  },
] as const;

const MILESTONES = [
  { year: "2010", label: "Chamber Founded" },
  { year: "2018", label: "50+ Global Chapters" },
  { year: "2024", label: "50,000+ Members" },
  { year: "2047", label: "Viksit Bharat Vision" },
] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
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

function AwardCard({
  icon,
  title,
  body,
  index,
}: {
  icon: string;
  title: string;
  body: string;
  index: number;
}) {
  return (
    <motion.article
      variants={itemVariants}
      className="group relative flex flex-col h-full rounded-3xl p-6 lg:p-7 bg-white border border-navy-950/10 shadow-[0_8px_32px_rgba(8,17,32,0.06)] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-gold/35 hover:shadow-[0_20px_50px_rgba(8,17,32,0.1)] card-lift"
    >
      <div
        className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-gold/20 via-gold to-gold/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
        aria-hidden
      />
      <div
        className="absolute -top-20 -right-16 w-40 h-40 rounded-full bg-gold/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.08),transparent_60%)]"
        aria-hidden
      />

      <div className="relative flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 via-gold/10 to-transparent border border-gold/30 flex items-center justify-center text-gold shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:from-gold group-hover:to-gold-600 group-hover:text-navy-950 group-hover:shadow-gold group-hover:border-gold">
            <i className={`fas ${icon} text-xl`} aria-hidden />
          </div>
          <span className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-navy-950/[0.04] border border-navy-950/10 text-[11px] font-display font-bold text-navy-950/35 group-hover:border-gold/30 group-hover:text-gold/80 transition-colors duration-500">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="font-display font-bold text-navy-950 text-lg leading-snug mb-3 group-hover:text-gold transition-colors duration-300">
          {title}
        </h3>

        <p className="text-sm text-navy-950/65 leading-relaxed flex-1">{body}</p>

        <div className="mt-6 pt-4 border-t border-navy-950/[0.06] flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-navy-950/40 group-hover:text-gold/90 transition-colors duration-300">
          <i className="fas fa-shield-halved text-gold text-[10px]" aria-hidden />
          <span>Verified credential</span>
        </div>
      </div>
    </motion.article>
  );
}

export const RecognitionSection = () => {
  return (
    <section
      id="recognition"
      aria-labelledby="recognition-heading"
      className="relative overflow-hidden bg-white pt-[calc(var(--navbar-height,88px)+3.5rem)] pb-28 lg:pt-[calc(var(--navbar-height,88px)+4.5rem)] lg:pb-32"
    >
      <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />
      <div className="absolute -top-32 -left-24 w-[480px] h-[480px] rounded-full bg-gold/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-royal/5 blur-[140px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/5 border border-navy-950/10 mb-6"
          >
            <i className="fas fa-medal text-gold text-xs" aria-hidden />
            <span className="text-[10px] uppercase tracking-[0.3em] text-navy-950/70 font-semibold">
              Awards &amp; Certifications
            </span>
          </motion.div>

          <motion.h2
            id="recognition-heading"
            variants={itemVariants}
            className="display-title font-display font-bold mb-5 leading-[1.02]"
          >
            <span className="text-navy-950">Institutional</span>{" "}
            <span className="text-gradient-gold italic font-serif font-normal">
              Recognition
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-navy-950/70 text-base md:text-lg leading-relaxed"
          >
            IICCI upholds the highest standards of governance, quality, and
            global trade integrity — recognized by national and international
            institutions.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {AWARDS.map((a, i) => (
            <AwardCard
              key={a.title}
              icon={a.icon}
              title={a.title}
              body={a.body}
              index={i}
            />
          ))}
        </motion.div>

        <motion.div
          className="rounded-3xl border border-gold/20 bg-gradient-to-br from-navy-900/90 to-navy-950 p-8 md:p-12 shadow-premium"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-8 text-center">
            Chamber Milestones
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {MILESTONES.map((m) => (
              <div key={m.year} className="text-center">
                <div className="font-display text-3xl font-bold text-gradient-gold mb-1">
                  {m.year}
                </div>
                <div className="text-sm text-white/60">{m.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecognitionSection;
