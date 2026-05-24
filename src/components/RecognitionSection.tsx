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

export const RecognitionSection = () => {
  return (
    <section
      id="recognition"
      aria-labelledby="recognition-heading"
      className="relative section-padding overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950"
    >
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-[0.08] pointer-events-none" />
      <div className="absolute -top-32 -left-24 w-[480px] h-[480px] rounded-full bg-gold/[0.07] blur-[140px] pointer-events-none" />

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
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-6"
          >
            <i className="fas fa-medal text-gold text-xs" aria-hidden />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-semibold">
              Awards &amp; Certifications
            </span>
          </motion.div>

          <motion.h2
            id="recognition-heading"
            variants={itemVariants}
            className="display-title font-display font-bold mb-5 leading-[1.02]"
          >
            <span className="text-white">Institutional</span>{" "}
            <span className="text-gradient-gold italic font-serif font-normal">
              Recognition
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-white/70 text-base md:text-lg leading-relaxed"
          >
            IICCI upholds the highest standards of governance, quality, and
            global trade integrity — recognized by national and international
            institutions.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {AWARDS.map((a) => (
            <motion.article
              key={a.title}
              variants={itemVariants}
              className="group rounded-3xl glass-dark border border-white/10 p-6 shadow-premium hover:border-gold/35 hover:shadow-gold transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center text-gold mb-5 group-hover:bg-gold group-hover:text-navy-950 transition">
                <i className={`fas ${a.icon} text-lg`} />
              </div>
              <h3 className="font-display font-bold text-white mb-2 group-hover:text-gold transition">
                {a.title}
              </h3>
              <p className="text-sm text-white/65 leading-relaxed">{a.body}</p>
            </motion.article>
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
