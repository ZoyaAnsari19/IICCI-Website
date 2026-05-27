"use client";

import { motion, type Variants } from "framer-motion";

type Pillar = {
  icon: string;
  label: string;
};

const MISSION_PILLARS: ReadonlyArray<Pillar> = [
  { icon: "fa-scale-balanced", label: "Policy Advocacy" },
  { icon: "fa-chart-line", label: "Market Intelligence" },
  { icon: "fa-handshake-angle", label: "Trade Facilitation" },
  { icon: "fa-globe", label: "Global Collaboration" },
];

const VISION_METRICS: ReadonlyArray<{ value: string; label: string }> = [
  { value: "Global", label: "Recognition" },
  { value: "Bilateral", label: "Trade" },
  { value: "Economic", label: "Cooperation" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function WorldTradeBackdrop() {
  return (
    <svg
      viewBox="0 0 1600 800"
      className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id="mv-map-glow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#1e40af" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mv-meridian" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(212,175,55,0)" />
          <stop offset="50%" stopColor="rgba(212,175,55,0.32)" />
          <stop offset="100%" stopColor="rgba(212,175,55,0)" />
        </linearGradient>
      </defs>
      <rect width="1600" height="800" fill="url(#mv-map-glow)" />
      <g fill="none" stroke="rgba(212,175,55,0.18)" strokeWidth="0.8">
        <ellipse cx="800" cy="400" rx="700" ry="290" />
        <ellipse cx="800" cy="400" rx="540" ry="220" />
        <ellipse cx="800" cy="400" rx="380" ry="150" />
        <ellipse cx="800" cy="400" rx="220" ry="85" />
      </g>
      <g stroke="url(#mv-meridian)" strokeWidth="1" fill="none">
        <line x1="220" y1="60" x2="220" y2="740" />
        <line x1="520" y1="60" x2="520" y2="740" />
        <line x1="820" y1="60" x2="820" y2="740" />
        <line x1="1120" y1="60" x2="1120" y2="740" />
        <line x1="1420" y1="60" x2="1420" y2="740" />
      </g>
      <g fill="rgba(212,175,55,0.3)">
        {[
          [360, 270],
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
          <circle key={i} cx={cx} cy={cy} r="3" />
        ))}
      </g>
      <g stroke="rgba(212,175,55,0.22)" strokeWidth="1" fill="none">
        <path d="M 360 270 Q 600 160, 820 250" />
        <path d="M 820 250 Q 950 200, 1020 290" />
        <path d="M 1020 290 Q 1180 280, 1240 330" />
        <path d="M 460 500 Q 660 380, 880 470" />
        <path d="M 640 420 Q 760 380, 880 470" />
      </g>
    </svg>
  );
}

function FloatingParticles() {
  const particles = [
    { left: "6%", top: "22%", delay: 0, size: 4 },
    { left: "20%", top: "70%", delay: 0.7, size: 3 },
    { left: "44%", top: "12%", delay: 1.2, size: 5 },
    { left: "60%", top: "32%", delay: 0.4, size: 3 },
    { left: "78%", top: "62%", delay: 1.5, size: 4 },
    { left: "88%", top: "40%", delay: 1.9, size: 2 },
    { left: "52%", top: "84%", delay: 0.6, size: 3 },
    { left: "10%", top: "46%", delay: 1.3, size: 2 },
  ];

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gold/40 blur-[1px]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.25, 0.7, 0.25],
          }}
          transition={{
            duration: 5 + i * 0.4,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function CenterDivider() {
  return (
    <div
      className="relative hidden lg:flex flex-col items-center justify-center w-24 self-stretch shrink-0"
      aria-hidden
    >
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold to-transparent blur-[1px]"
        style={{ top: "-10%" }}
        animate={{ top: ["-10%", "110%"] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 0.4,
        }}
      />

      <motion.div
        className="relative w-16 h-16 rounded-full glass-dark border border-gold/35 shadow-premium flex items-center justify-center"
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(212,175,55,0)",
            "0 0 32px 4px rgba(212,175,55,0.35)",
            "0 0 0 0 rgba(212,175,55,0)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 via-transparent to-royal/20" />
        <div className="absolute inset-1 rounded-full border border-gold/20" />
        <i className="fas fa-compass text-gold text-xl relative" />
      </motion.div>

      <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold/70" />
      <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold/70" />
    </div>
  );
}

function MobileDivider() {
  return (
    <div
      className="relative flex lg:hidden items-center justify-center py-2"
      aria-hidden
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
      <motion.div
        className="mx-4 relative w-12 h-12 rounded-full glass-dark border border-gold/35 flex items-center justify-center shadow-premium"
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(212,175,55,0)",
            "0 0 24px 3px rgba(212,175,55,0.35)",
            "0 0 0 0 rgba(212,175,55,0)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <i className="fas fa-compass text-gold text-base" />
      </motion.div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/35 to-transparent" />
    </div>
  );
}

function MissionCard() {
  return (
    <motion.article
      variants={cardVariants}
      className="group relative flex-1 min-w-0 rounded-3xl p-8 md:p-10 lg:p-12 border border-gold/15 bg-gradient-to-br from-navy-900/80 via-navy-950/85 to-navy-950 backdrop-blur-xl shadow-premium overflow-hidden transition-all duration-500 hover:border-gold/35 hover:shadow-gold"
    >
      <div
        className="absolute -top-32 -right-24 w-80 h-80 rounded-full bg-gold/10 blur-3xl group-hover:bg-gold/20 transition duration-700 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.15),transparent_55%)]"
        aria-hidden
      />

      <div className="relative">
        <div className="flex items-center gap-4 mb-7">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-gold-600 flex items-center justify-center text-navy-950 shadow-gold shrink-0">
            <i className="fas fa-bullseye text-xl" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold">
              Our Mission
            </div>
            <div className="text-[11px] text-white/55 mt-1 tracking-wide">
              The purpose that drives every chamber initiative
            </div>
          </div>
        </div>

        <h3 className="text-2xl md:text-[28px] lg:text-[30px] font-display font-bold text-white leading-tight mb-5">
          Empowering India&rsquo;s import community for a{" "}
          <span className="text-gradient-gold italic font-serif font-normal">
            seamless, sustainable global trade era.
          </span>
        </h3>

        <p className="text-white/70 leading-relaxed text-base md:text-[17px]">
          To empower India&rsquo;s importing community through{" "}
          <span className="text-white font-semibold">policy advocacy</span>,{" "}
          <span className="text-white font-semibold">market intelligence</span>,{" "}
          <span className="text-white font-semibold">
            trade facilitation services
          </span>
          , and{" "}
          <span className="text-white font-semibold">
            strategic global collaborations
          </span>{" "}
          that enable seamless and sustainable international trade.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-2.5">
          {MISSION_PILLARS.map((p) => (
            <div
              key={p.label}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gold/[0.06] border border-gold/20 text-[12px] text-gold/95 font-semibold tracking-wide"
            >
              <i className={`fas ${p.icon} text-gold text-sm`} />
              <span className="truncate">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function VisionCard() {
  return (
    <motion.article
      variants={cardVariants}
      className="group relative flex-1 min-w-0 rounded-3xl p-8 md:p-10 lg:p-12 border border-white/10 bg-gradient-to-br from-royal via-royal-dark to-navy-900 shadow-premium overflow-hidden transition-all duration-500 hover:border-gold/35 hover:shadow-gold"
    >
      <div
        className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-gold/15 blur-3xl group-hover:bg-gold/25 transition duration-700 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-grid opacity-[0.12] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.18),transparent_55%)]"
        aria-hidden
      />

      <div className="relative">
        <div className="flex items-center gap-4 mb-7">
          <div className="w-14 h-14 rounded-2xl glass border border-gold/30 flex items-center justify-center text-gold shrink-0">
            <i className="fas fa-eye text-xl" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold">
              Our Vision
            </div>
            <div className="text-[11px] text-white/65 mt-1 tracking-wide">
              The future IICCI is committed to building
            </div>
          </div>
        </div>

        <h3 className="text-2xl md:text-[28px] lg:text-[30px] font-display font-bold text-white leading-tight mb-5">
          A globally recognized chamber and{" "}
          <span className="text-gradient-gold italic font-serif font-normal">
            trusted catalyst for international growth.
          </span>
        </h3>

        <div className="space-y-4 text-white/80 leading-relaxed text-base md:text-[17px]">
          <p>
            To emerge as a{" "}
            <span className="text-gold font-semibold">
              globally recognized Chamber of Commerce and Industry
            </span>{" "}
            that serves as a trusted catalyst for international business
            growth, bilateral trade promotion, and economic cooperation between
            India and the world.
          </p>
          <p>
            The Chamber envisions building a{" "}
            <span className="text-white font-semibold">
              strong global network of members and overseas offices
            </span>{" "}
            that enables seamless business facilitation, strategic
            partnerships, investment opportunities, and rapid implementation of
            commercial ventures across diverse sectors and international
            markets.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {VISION_METRICS.map((m) => (
            <div
              key={m.label}
              className="rounded-xl bg-white/[0.04] border border-white/10 px-3 py-3 text-center backdrop-blur-md"
            >
              <div className="text-sm font-display font-bold text-gold">
                {m.value}
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/60 mt-0.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export const MissionVisionSection = ({ embedded = false }: { embedded?: boolean }) => {
  return (
    <section
      id="mission-vision"
      aria-labelledby="mission-vision-heading"
      className={
        embedded
          ? "relative section-padding overflow-hidden bg-white border-t border-navy-950/10"
          : "relative overflow-hidden bg-white pt-[calc(var(--navbar-height,88px)+3.5rem)] pb-28 lg:pt-[calc(var(--navbar-height,88px)+4.5rem)] lg:pb-32"
      }
    >
      <WorldTradeBackdrop />
      <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />

      <motion.div
        className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-gold/5 blur-[140px] pointer-events-none"
        animate={{ x: [0, 26, 0], y: [0, -16, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute -bottom-40 -right-24 w-[560px] h-[560px] rounded-full bg-royal/5 blur-[140px] pointer-events-none"
        animate={{ x: [0, -20, 0], y: [0, 18, 0] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        aria-hidden
      />
      <motion.div
        className="absolute inset-x-0 top-1/3 h-px pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.35) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />

      <FloatingParticles />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14 lg:mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/5 border border-navy-950/10 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-navy-950/70 font-semibold">
              The IICCI Compass
            </span>
            <span className="h-3 w-px bg-navy-950/15" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">
              Purpose &amp; Promise
            </span>
          </motion.div>

          <motion.h2
            id="mission-vision-heading"
            variants={itemVariants}
            className="display-title font-display font-bold mb-5 leading-[1.02]"
          >
            <span className="text-navy-950">Mission &amp;</span>{" "}
            <span className="text-gradient-gold italic font-serif font-normal">
              Vision
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-navy-950/70 leading-relaxed font-serif italic"
          >
            &ldquo;Our Purpose and Our Promise.&rdquo;
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-0"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          <MissionCard />
          <CenterDivider />
          <MobileDivider />
          <VisionCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-14 lg:mt-16 flex flex-wrap items-center justify-center gap-4"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-navy-950/5 border border-navy-950/10">
            <i className="fas fa-earth-asia text-gold" aria-hidden />
            <span className="text-sm text-navy-950/80">
              <span className="font-semibold text-navy-950">India</span> to the
              world &middot; the world to India
            </span>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-navy-950/5 border border-navy-950/10">
            <i className="fas fa-shield-halved text-gold" aria-hidden />
            <span className="text-sm text-navy-950/80">
              Built on trust, intelligence &amp; institutional integrity
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
