"use client";

import { motion } from "framer-motion";

const SDG_PILLARS = [
  {
    icon: "fa-venus",
    title: "Women Empowerment",
    sdg: "SDG 5",
    desc: "Women Entrepreneurship Wing, leadership forums, mentorship, and market access for women-led enterprises.",
    color: "from-pink-500 to-rose-700",
    glow: "group-hover:shadow-[0_0_40px_rgba(236,72,153,0.25)]",
  },
  {
    icon: "fa-graduation-cap",
    title: "Education",
    sdg: "SDG 4",
    desc: "Trade literacy, import–export education, and chamber-led learning for members and young professionals.",
    color: "from-rose-500 to-rose-700",
    glow: "group-hover:shadow-[0_0_40px_rgba(244,63,94,0.2)]",
  },
  {
    icon: "fa-screwdriver-wrench",
    title: "Skill Development",
    sdg: "SDG 8",
    desc: "Certified training, drone operations, digital trade skills, and employability programs across member networks.",
    color: "from-orange-500 to-orange-700",
    glow: "group-hover:shadow-[0_0_40px_rgba(249,115,22,0.22)]",
  },
  {
    icon: "fa-leaf",
    title: "Green Initiatives",
    sdg: "SDG 13",
    desc: "Climate-conscious trade advocacy, green supply chains, and sustainability awareness for responsible commerce.",
    color: "from-emerald-500 to-emerald-700",
    glow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.28)]",
  },
  {
    icon: "fa-recycle",
    title: "ESG Projects",
    sdg: "SDG 12",
    desc: "ESG advisory, responsible production, and circular-economy partnerships aligned with global standards.",
    color: "from-teal-500 to-teal-700",
    glow: "group-hover:shadow-[0_0_40px_rgba(20,184,166,0.22)]",
  },
  {
    icon: "fa-tractor",
    title: "Rural Development",
    sdg: "SDG 2",
    desc: "Farmer support services, agri-export enablement, and rural entrepreneurship across tier-2 and tier-3 India.",
    color: "from-amber-500 to-amber-700",
    glow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.22)]",
  },
  {
    icon: "fa-heart-pulse",
    title: "Healthcare",
    sdg: "SDG 3",
    desc: "Community health outreach, wellness camps, and access initiatives for members and trade communities.",
    color: "from-red-500 to-red-700",
    glow: "group-hover:shadow-[0_0_40px_rgba(239,68,68,0.2)]",
  },
  {
    icon: "fa-lightbulb",
    title: "Entrepreneurship",
    sdg: "SDG 9",
    desc: "MSME acceleration, innovation corridors, and the IICCI mission to nurture globally competitive Indian enterprise.",
    color: "from-yellow-500 to-yellow-600",
    glow: "group-hover:shadow-[0_0_40px_rgba(234,179,8,0.22)]",
  },
] as const;

const IMPACT_STATS = [
  { value: 10000, suffix: "+", label: "Member Ecosystem Engaged", desc: "Active importers & partners" },
  { value: 50, suffix: "+", label: "Nations in SDG Outreach", desc: "Bilateral & global chapters" },
  { value: 200, suffix: "+", label: "CSR Programs Facilitated", desc: "Chamber-led initiatives" },
  { value: 47, suffix: "+", label: "Years of Institutional Service", desc: "Since 1978" },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function SustainabilityParticles() {
  const particles = [
    { left: "6%", top: "14%", delay: 0, size: 5, color: "bg-emerald-400/50" },
    { left: "18%", top: "68%", delay: 0.7, size: 4, color: "bg-gold/45" },
    { left: "42%", top: "8%", delay: 1.1, size: 3, color: "bg-emerald-300/40" },
    { left: "58%", top: "22%", delay: 0.3, size: 4, color: "bg-gold/35" },
    { left: "78%", top: "58%", delay: 1.5, size: 5, color: "bg-emerald-500/35" },
    { left: "88%", top: "32%", delay: 0.9, size: 3, color: "bg-gold/40" },
    { left: "32%", top: "78%", delay: 1.8, size: 2, color: "bg-emerald-400/30" },
    { left: "72%", top: "82%", delay: 0.5, size: 3, color: "bg-gold/30" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className={`absolute rounded-full blur-[1px] ${p.color}`}
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -16, 0], opacity: [0.2, 0.65, 0.2] }}
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

function AnimatedGlobe() {
  return (
    <motion.div
      className="relative w-full max-w-[320px] md:max-w-[360px] aspect-square mx-auto"
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="absolute inset-[-8%] rounded-full bg-gradient-to-br from-emerald-400/15 via-royal/10 to-gold/15 blur-2xl"
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.04, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-2xl"
          role="img"
          aria-label="Animated globe representing IICCI global sustainability outreach"
        >
          <defs>
            <radialGradient id="csr-ocean" cx="32%" cy="28%" r="68%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="40%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e3a5f" />
            </radialGradient>
            <radialGradient id="csr-shine" cx="28%" cy="22%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <clipPath id="csr-globe-clip">
              <circle cx="200" cy="200" r="158" />
            </clipPath>
          </defs>

          <ellipse cx="200" cy="218" rx="150" ry="18" fill="rgba(8,17,32,0.06)" />

          <circle
            cx="200"
            cy="200"
            r="158"
            fill="url(#csr-ocean)"
            stroke="#d4af37"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />

          <g clipPath="url(#csr-globe-clip)">
            <g fill="#22c55e" stroke="#15803d" strokeWidth="0.8">
              <path d="M 48 92 C 62 68 98 62 122 74 L 128 108 C 124 132 102 148 82 142 C 62 130 48 112 48 92 Z" />
              <path d="M 118 58 L 148 54 L 154 70 L 136 78 L 118 72 Z" />
              <path d="M 94 148 L 118 142 L 128 178 L 122 222 L 104 242 L 90 218 L 94 148 Z" />
              <path d="M 164 80 L 200 74 L 210 94 L 196 110 L 168 106 Z" />
              <path d="M 166 112 L 214 106 L 226 162 L 220 214 L 196 226 L 168 202 L 162 158 Z" />
              <path d="M 206 104 L 234 108 L 240 132 L 216 140 Z" />
              <path d="M 214 64 L 302 58 L 318 88 L 312 132 L 276 148 L 232 132 L 214 98 Z" />
              <path d="M 244 126 L 268 120 L 274 152 L 250 158 Z" />
              <path d="M 276 140 L 302 136 L 308 162 L 284 168 Z" />
              <path d="M 272 196 L 316 190 L 324 214 L 296 226 L 272 210 Z" />
              <path d="M 124 262 L 276 260 L 282 276 L 118 278 Z" opacity="0.55" />
            </g>
            <g fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.7">
              <ellipse cx="200" cy="200" rx="158" ry="42" />
              <ellipse cx="200" cy="200" rx="158" ry="82" />
              <ellipse cx="200" cy="200" rx="158" ry="122" />
              <line x1="42" y1="200" x2="358" y2="200" />
              <line x1="200" y1="42" x2="200" y2="358" />
            </g>
            <circle cx="200" cy="200" r="158" fill="url(#csr-shine)" pointerEvents="none" />
          </g>

          <motion.circle
            cx="200"
            cy="200"
            r="168"
            fill="none"
            stroke="#d4af37"
            strokeWidth="1"
            strokeOpacity="0.25"
            animate={{ strokeOpacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <circle cx="200" cy="200" r="182" fill="none" stroke="#22c55e" strokeWidth="0.5" strokeOpacity="0.2" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-[12%] left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass-light border border-emerald-500/20 text-[10px] uppercase tracking-[0.2em] text-navy-950/70 font-semibold whitespace-nowrap shadow-sm"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <span className="text-emerald-600">●</span> Global SDG Commitment
      </motion.div>
    </motion.div>
  );
}

export const CSR = ({ standalone = false }: { standalone?: boolean }) => {
  return (
    <section
      id="csr"
      className={`relative overflow-hidden bg-white ${standalone ? "page-nav-offset" : "section-padding"}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/40 via-white to-white pointer-events-none" aria-hidden />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-400/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gold/8 blur-3xl pointer-events-none" />
      <SustainabilityParticles />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-14 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/5 border border-emerald-500/20 mb-4">
              <i className="fas fa-seedling text-emerald-500 text-xs" aria-hidden />
              <span className="text-[10px] uppercase tracking-[0.25em] text-navy-950/70">
                CSR & UN Sustainable Development Goals
              </span>
            </div>
            <h2 className="display-title font-display font-bold mb-6 leading-tight text-navy-950">
              Corporate Social Responsibility &{" "}
              <span className="text-gradient-gold italic font-serif font-normal">
                Sustainable Development Goals
              </span>
            </h2>
            <p className="text-navy-950/75 text-base md:text-lg leading-relaxed max-w-xl">
              As a nationally recognized apex chamber, the{" "}
              <span className="text-navy-950 font-semibold">
                Indian Importers Chambers of Commerce & Industry (IICCI)
              </span>{" "}
              integrates Corporate Social Responsibility and the United Nations Sustainable Development Goals into its
              institutional mandate. Beyond trade facilitation, IICCI channels member networks, bilateral partnerships,
              and chamber resources toward inclusive growth — empowering women entrepreneurs, strengthening rural and
              agri-trade ecosystems, advancing education and skill development, and promoting environmental stewardship
              through responsible business practices. Our CSR & SDG framework aligns initiatives with measurable
              outcomes that uplift communities, strengthen livelihoods, and advance a resilient, globally competitive
              India in line with <span className="text-emerald-700 font-medium">Viksit Bharat 2047</span>.
            </p>
          </motion.div>

          <div className="relative flex items-center justify-center min-h-[280px] md:min-h-[340px]">
            <AnimatedGlobe />
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
        >
          {SDG_PILLARS.map((c) => (
            <motion.article
              key={c.title}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className={`group relative glass-light rounded-2xl p-6 border border-navy-950/10 overflow-hidden cursor-default ${c.glow} transition-shadow duration-500`}
            >
              <div
                className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${c.color} opacity-15 blur-2xl group-hover:opacity-35 transition-opacity duration-500`}
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-105 transition-transform duration-500`}
                >
                  <i className={`fas ${c.icon} text-base`} aria-hidden />
                </div>
                <div className="text-[10px] uppercase tracking-wider text-gold font-bold mb-1">{c.sdg}</div>
                <h3 className="text-navy-950 font-display font-bold text-base mb-2">{c.title}</h3>
                <p className="text-sm text-navy-950/65 leading-relaxed">{c.desc}</p>
                <div className="mt-4 h-px w-10 bg-gold/40 group-hover:w-16 transition-all duration-500" />
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 lg:mt-14 rounded-3xl p-8 lg:p-12 relative overflow-hidden border border-navy-950/10 shadow-premium"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950/[0.03] via-emerald-50/50 to-gold/5 pointer-events-none" aria-hidden />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden />

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-center">
            {IMPACT_STATS.map((s) => (
              <div key={s.label} className="min-w-0">
                <div className="flex flex-wrap items-baseline justify-center gap-x-1">
                  <span
                    className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gold tabular-nums counter"
                    data-target={s.value}
                  >
                    0
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gold">
                    {s.suffix}
                  </span>
                </div>
                <div className="text-sm text-navy-950 font-semibold mt-2 uppercase tracking-wide">{s.label}</div>
                <div className="text-xs text-navy-950/50 mt-1">{s.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
