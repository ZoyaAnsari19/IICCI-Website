"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const credentials = [
  "Govt. of India Recognized",
  "ISO 9001 Certified",
  "WTO Affiliated",
  "UN Compact Member",
];

function WorldMapBackdrop() {
  return (
    <svg
      viewBox="0 0 1600 800"
      className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id="about-map-glow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#1e40af" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="about-meridian" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(212,175,55,0)" />
          <stop offset="50%" stopColor="rgba(212,175,55,0.35)" />
          <stop offset="100%" stopColor="rgba(212,175,55,0)" />
        </linearGradient>
      </defs>
      <rect width="1600" height="800" fill="url(#about-map-glow)" />
      <g fill="none" stroke="rgba(212,175,55,0.18)" strokeWidth="0.8">
        <ellipse cx="800" cy="400" rx="720" ry="300" />
        <ellipse cx="800" cy="400" rx="560" ry="230" />
        <ellipse cx="800" cy="400" rx="400" ry="160" />
        <ellipse cx="800" cy="400" rx="240" ry="95" />
      </g>
      <g stroke="url(#about-meridian)" strokeWidth="1" fill="none">
        <line x1="200" y1="50" x2="200" y2="750" />
        <line x1="500" y1="50" x2="500" y2="750" />
        <line x1="800" y1="50" x2="800" y2="750" />
        <line x1="1100" y1="50" x2="1100" y2="750" />
        <line x1="1400" y1="50" x2="1400" y2="750" />
      </g>
      <g fill="rgba(212,175,55,0.35)">
        {[
          [380, 280],
          [560, 230],
          [820, 250],
          [1020, 290],
          [1240, 330],
          [640, 420],
          [880, 470],
          [460, 500],
          [1140, 510],
          [760, 360],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" />
        ))}
      </g>
      <g stroke="rgba(212,175,55,0.22)" strokeWidth="1" fill="none">
        <path d="M 380 280 Q 600 160, 820 250" />
        <path d="M 820 250 Q 950 200, 1020 290" />
        <path d="M 1020 290 Q 1180 280, 1240 330" />
        <path d="M 460 500 Q 660 380, 880 470" />
        <path d="M 640 420 Q 760 380, 880 470" />
      </g>
    </svg>
  );
}

export const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-950 to-navy-900 pt-[calc(var(--navbar-height,88px)+3.5rem)] pb-28 lg:pt-[calc(var(--navbar-height,88px)+4.5rem)] lg:pb-32"
    >
      <WorldMapBackdrop />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-royal/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-[520px] h-[520px] rounded-full bg-gold/[0.06] blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.08] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16 lg:mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6"
            variants={itemVariants}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/75 font-semibold">
              About the Chamber
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold/90 font-semibold">
              IICCI
            </span>
          </motion.div>

          <motion.h2
            className="display-title font-display font-bold mb-6 leading-[0.95]"
            style={{ letterSpacing: "-0.02em" }}
            variants={itemVariants}
          >
            <span className="text-white">A bridge between</span>
            <br />
            <span className="text-gradient-gold italic font-serif font-normal">
              India &amp; the world.
            </span>
          </motion.h2>

          <motion.p
            className="text-white/70 text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
            variants={itemVariants}
          >
            The{" "}
            <span className="text-white font-semibold">
              Indian Importers Chambers of Commerce &amp; Industry (IICCI)
            </span>{" "}
            is committed to empowering India's importing community through
            policy advocacy, market intelligence, trade facilitation services,
            and strategic global collaborations that enable seamless and
            sustainable international trade.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-2.5 mt-8"
            variants={itemVariants}
          >
            {credentials.map((c) => (
              <span
                key={c}
                className="px-3.5 py-1.5 rounded-full glass border border-white/10 text-[11px] text-white/85 font-medium tracking-wide"
              >
                {c}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.figure
          className="relative max-w-5xl mx-auto mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />
            <i className="fas fa-quote-left text-gold/70 text-sm" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
          <blockquote className="relative glass-dark border border-white/10 rounded-3xl px-8 md:px-14 py-10 md:py-12 text-center shadow-premium">
            <p className="font-serif italic text-xl md:text-2xl lg:text-3xl text-white/90 leading-snug">
              Global trade today is no longer limited by borders — it is driven
              by{" "}
              <span className="text-gradient-gold not-italic font-display font-semibold">
                collaboration, innovation, and trusted partnerships.
              </span>
            </p>
            <figcaption className="mt-6 text-[10px] uppercase tracking-[0.35em] text-gold/80 font-semibold">
              The IICCI Philosophy
            </figcaption>
          </blockquote>
        </motion.figure>

        <motion.div
          className="grid lg:grid-cols-2 gap-6 lg:gap-7 mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          <motion.article
            variants={itemVariants}
            className="group relative rounded-3xl p-8 md:p-10 border border-gold/15 bg-gradient-to-br from-navy-900/90 via-navy-950/80 to-navy-950 backdrop-blur-xl card-lift overflow-hidden shadow-premium"
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gold/10 blur-3xl group-hover:bg-gold/20 transition duration-700" />
            <div className="absolute inset-0 bg-grid opacity-[0.05]" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-gold-600 flex items-center justify-center text-navy-950 shadow-gold">
                  <i className="fas fa-bullseye text-xl" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold">
                    Our Mission
                  </div>
                  <div className="text-[11px] text-white/50 mt-1 tracking-wide">
                    Empowering India's import community
                  </div>
                </div>
              </div>
              <h3 className="text-2xl md:text-[28px] font-display font-bold text-white leading-tight mb-4">
                Enable seamless and sustainable international trade for India.
              </h3>
              <p className="text-white/70 leading-relaxed">
                IICCI empowers India's importing community through{" "}
                <span className="text-white font-semibold">
                  policy advocacy
                </span>
                ,{" "}
                <span className="text-white font-semibold">
                  market intelligence
                </span>
                ,{" "}
                <span className="text-white font-semibold">
                  trade facilitation services
                </span>
                , and{" "}
                <span className="text-white font-semibold">
                  strategic global collaborations
                </span>{" "}
                that connect Indian businesses to the world.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  "Policy Advocacy",
                  "Market Intelligence",
                  "Trade Facilitation",
                  "Global Collaboration",
                ].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] text-gold/90 bg-gold/[0.08] border border-gold/20 font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.article
            variants={itemVariants}
            className="group relative rounded-3xl p-8 md:p-10 overflow-hidden card-lift shadow-premium border border-white/10 bg-gradient-to-br from-royal via-royal-dark to-navy-900"
          >
            <div className="absolute inset-0 bg-grid opacity-[0.12]" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gold/15 blur-3xl group-hover:bg-gold/25 transition duration-700" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl glass border border-gold/30 flex items-center justify-center text-gold">
                  <i className="fas fa-eye text-xl" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold">
                    Our Vision
                  </div>
                  <div className="text-[11px] text-white/60 mt-1 tracking-wide">
                    A globally recognized Chamber
                  </div>
                </div>
              </div>
              <h3 className="text-2xl md:text-[28px] font-display font-bold text-white leading-tight mb-4">
                A trusted catalyst for international business growth.
              </h3>
              <p className="text-white/80 leading-relaxed">
                To emerge as a{" "}
                <span className="text-gold font-semibold">
                  globally recognized Chamber of Commerce and Industry
                </span>{" "}
                — serving as a trusted catalyst for international business
                growth, bilateral trade promotion, and economic cooperation
                between India and the world.
              </p>
              <div className="mt-7 grid grid-cols-3 gap-3">
                {[
                  { v: "Global", l: "Recognition" },
                  { v: "Bilateral", l: "Trade" },
                  { v: "Economic", l: "Cooperation" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-xl bg-white/[0.04] border border-white/10 px-3 py-3 text-center backdrop-blur-md"
                  >
                    <div className="text-sm font-display font-bold text-gold">
                      {s.v}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/60 mt-0.5">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
};
