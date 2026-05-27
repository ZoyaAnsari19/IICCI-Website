"use client";

import { motion, type Variants } from "framer-motion";

const PARTNERS = [
  {
    icon: "fa-handshake",
    region: "Bilateral Trade",
    title: "Government & Embassy Alliances",
    body: "Formal partnerships with trade ministries, embassies, and consulates enabling delegation access and policy dialogue.",
  },
  {
    icon: "fa-building",
    region: "Global Chambers",
    title: "International Chamber Network",
    body: "MoUs with overseas chambers of commerce creating reciprocal member benefits and cross-border B2B platforms.",
  },
  {
    icon: "fa-industry",
    region: "Industry",
    title: "Sector & Trade Associations",
    body: "Alliances with industry bodies across agriculture, manufacturing, pharma, and technology verticals.",
  },
  {
    icon: "fa-university",
    region: "Institutions",
    title: "Academic & Research Partners",
    body: "Collaborations with universities and think tanks for trade intelligence, training, and policy research.",
  },
  {
    icon: "fa-ship",
    region: "Logistics",
    title: "Ports & Trade Corridors",
    body: "Strategic ties with port authorities, shipping lines, and logistics networks streamlining import operations.",
  },
  {
    icon: "fa-chart-pie",
    region: "Finance",
    title: "Investment & Banking Partners",
    body: "Partnerships with financial institutions supporting trade finance, FDI facilitation, and member capital access.",
  },
] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export const PartnershipsSection = () => {
  return (
    <section
      id="partnerships"
      aria-labelledby="partnerships-heading"
      className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 pt-[calc(var(--navbar-height,88px)+3.5rem)] pb-28 lg:pt-[calc(var(--navbar-height,88px)+4.5rem)] lg:pb-32"
    >
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-[0.08] pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-[520px] h-[520px] rounded-full bg-royal/15 blur-[140px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={cardVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-6"
          >
            <i className="fas fa-handshake text-gold text-xs" aria-hidden />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-semibold">
              Strategic Alliances
            </span>
          </motion.div>

          <motion.h2
            id="partnerships-heading"
            variants={cardVariants}
            className="display-title font-display font-bold mb-5 leading-[1.02]"
          >
            <span className="text-white">Global</span>{" "}
            <span className="text-gradient-gold italic font-serif font-normal">
              Partnerships
            </span>
          </motion.h2>

          <motion.p
            variants={cardVariants}
            className="text-white/70 text-base md:text-lg leading-relaxed"
          >
            IICCI builds trusted alliances across governments, chambers,
            industries, and institutions — opening corridors for Indian
            businesses worldwide.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {PARTNERS.map((p) => (
            <motion.article
              key={p.title}
              variants={cardVariants}
              className="group relative rounded-3xl border border-white/10 bg-navy-950/50 backdrop-blur-xl p-6 shadow-premium hover:border-gold/40 hover:shadow-gold hover:-translate-y-1 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.12),transparent_55%)] pointer-events-none" />
              <div className="relative">
                <span className="text-[10px] uppercase tracking-[0.22em] text-gold/80 font-bold">
                  {p.region}
                </span>
                <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center text-gold my-4 group-hover:bg-gold group-hover:text-navy-950 transition">
                  <i className={`fas ${p.icon}`} />
                </div>
                <h3 className="font-display font-bold text-white mb-2 group-hover:text-gold transition">
                  {p.title}
                </h3>
                <p className="text-sm text-white/65 leading-relaxed">{p.body}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#membership"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold tracking-wide shadow-gold hover:opacity-95 transition"
          >
            Become a Partner
            <i className="fas fa-arrow-right text-xs" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass border border-white/15 text-white/80 text-sm font-semibold hover:border-gold/40 hover:text-gold transition"
          >
            Explore Collaboration
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipsSection;
