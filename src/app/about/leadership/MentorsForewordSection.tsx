"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

type MentorProfile = {
  name: string;
  designation: string;
  organization: string;
  initials: string;
  image?: string;
};

const MENTOR: MentorProfile = {
  name: "Dr. R.K. Sinha",
  designation: "Chief Mentor & Strategic Advisor",
  organization: "Indian Importers Chambers of Commerce & Industry",
  initials: "RKS",
};

const FOREWORD: ReadonlyArray<string> = [
  "Mentorship in global trade is not a title — it is a quiet responsibility to safeguard institutions, nurture leaders, and protect the long view. As Mentor to IICCI, my role is to ensure that every decision we take today strengthens India's position in the international order of tomorrow.",
  "We are building a chamber that does not merely represent importers, but elevates them — through diplomacy, intelligence, and disciplined partnerships across continents. The next decade will reward institutions that combine cultural fluency with operational rigour, and IICCI is being shaped to do exactly that.",
  "To our members, partners, and the wider trade community: walk with us. The journey ahead is generational, and the seat India will hold in global commerce will be defined by the chambers, mentors, and members who chose to build it with integrity.",
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

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
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
        <radialGradient id="mentor-map-glow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#1e40af" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mentor-meridian" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(212,175,55,0)" />
          <stop offset="50%" stopColor="rgba(212,175,55,0.32)" />
          <stop offset="100%" stopColor="rgba(212,175,55,0)" />
        </linearGradient>
      </defs>
      <rect width="1600" height="800" fill="url(#mentor-map-glow)" />
      <g fill="none" stroke="rgba(212,175,55,0.18)" strokeWidth="0.8">
        <ellipse cx="800" cy="400" rx="700" ry="290" />
        <ellipse cx="800" cy="400" rx="540" ry="220" />
        <ellipse cx="800" cy="400" rx="380" ry="150" />
        <ellipse cx="800" cy="400" rx="220" ry="85" />
      </g>
      <g stroke="url(#mentor-meridian)" strokeWidth="1" fill="none">
        <line x1="220" y1="60" x2="220" y2="740" />
        <line x1="520" y1="60" x2="520" y2="740" />
        <line x1="820" y1="60" x2="820" y2="740" />
        <line x1="1120" y1="60" x2="1120" y2="740" />
        <line x1="1420" y1="60" x2="1420" y2="740" />
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
          <circle key={i} cx={cx} cy={cy} r="3" />
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

function FloatingParticles() {
  const particles = [
    { left: "6%", top: "22%", delay: 0, size: 4 },
    { left: "18%", top: "68%", delay: 0.7, size: 3 },
    { left: "42%", top: "10%", delay: 1.2, size: 5 },
    { left: "62%", top: "30%", delay: 0.4, size: 3 },
    { left: "78%", top: "62%", delay: 1.5, size: 4 },
    { left: "88%", top: "38%", delay: 1.9, size: 2 },
    { left: "52%", top: "84%", delay: 0.6, size: 3 },
    { left: "10%", top: "44%", delay: 1.3, size: 2 },
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

function MentorPortrait({ mentor }: { mentor: MentorProfile }) {
  return (
    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-gradient shadow-premium bg-navy-950 group-hover:shadow-gold transition-shadow duration-700">
      {mentor.image ? (
        <Image
          src={mentor.image}
          alt={`${mentor.name}, ${mentor.designation} of IICCI`}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) 100vw, 480px"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <span className="font-display font-bold text-6xl sm:text-7xl text-gradient-gold tracking-tight">
            {mentor.initials}
          </span>
        </div>
      )}

      <div
        className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-navy-950/10 pointer-events-none"
        aria-hidden
      />

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[linear-gradient(105deg,transparent_40%,rgba(212,175,55,0.14)_50%,transparent_60%)]"
        aria-hidden
      />

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy-950 via-navy-950/85 to-transparent">
        <div className="text-gold text-2xl font-serif italic leading-none">
          {mentor.name}
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-white/55 font-semibold">
          Signature of Stewardship
        </div>
      </div>

      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-gold text-navy-950 text-[10px] uppercase tracking-widest font-bold shadow-gold">
        Mentor
      </div>
    </div>
  );
}

export const MentorsForewordSection = () => {
  return (
    <section
      id="mentors-foreword"
      aria-labelledby="mentors-foreword-heading"
      className="relative section-padding overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950"
    >
      <WorldTradeBackdrop />
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-[0.08] pointer-events-none" />

      <motion.div
        className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-gold/[0.07] blur-[140px] pointer-events-none"
        animate={{ x: [0, 24, 0], y: [0, -14, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute -bottom-40 -right-24 w-[560px] h-[560px] rounded-full bg-royal/[0.18] blur-[140px] pointer-events-none"
        animate={{ x: [0, -18, 0], y: [0, 18, 0] }}
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
          className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.div
            className="lg:col-span-5 order-1 lg:order-1"
            variants={imageVariants}
          >
            <div className="group relative max-w-md mx-auto">
              <div
                className="absolute -inset-4 rounded-[2rem] border border-gold/25 pointer-events-none"
                aria-hidden
              />
              <div
                className="absolute -inset-8 rounded-[2.5rem] border border-gold/10 pointer-events-none"
                aria-hidden
              />

              <motion.div
                className="absolute -inset-10 rounded-[3rem] bg-gold/10 blur-3xl opacity-60 pointer-events-none"
                animate={{ opacity: [0.45, 0.75, 0.45] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                aria-hidden
              />

              <MentorPortrait mentor={MENTOR} />

              <motion.div
                className="absolute -bottom-6 -left-6 glass-dark rounded-2xl p-4 shadow-premium max-w-[220px] border border-gold/25"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <i className="fas fa-quote-right text-gold text-2xl mb-2" />
                <div className="text-xs text-white/85 italic leading-snug">
                  &ldquo;Institutions endure when mentorship outlives any single
                  tenure.&rdquo;
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-5 -right-5 glass-dark rounded-2xl px-3.5 py-2.5 shadow-premium border border-gold/25 flex items-center gap-2"
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
              >
                <i className="fas fa-globe text-gold text-sm" />
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/80 font-semibold">
                  Global Trade Council
                </span>
              </motion.div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 order-2 lg:order-2">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-semibold">
                Leadership Voice
              </span>
              <span className="h-3 w-px bg-white/15" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold/90 font-semibold">
                Mentor
              </span>
            </motion.div>

            <motion.h2
              id="mentors-foreword-heading"
              variants={itemVariants}
              className="display-title font-display font-bold mb-5 leading-[1.02]"
            >
              <span className="text-white">Mentor&rsquo;s</span>{" "}
              <span className="text-gradient-gold italic font-serif font-normal">
                Foreword
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-white/75 leading-relaxed mb-8 max-w-2xl font-serif italic"
            >
              &ldquo;Guiding IICCI Towards a Stronger Global Trade Future.&rdquo;
            </motion.p>

            <motion.div
              className="relative pl-5 mb-10 max-w-2xl"
              variants={itemVariants}
            >
              <span
                className="absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-gold/60 via-gold/20 to-transparent"
                aria-hidden
              />
              <motion.div
                variants={containerVariants}
                className="space-y-5 text-white/70 leading-relaxed"
              >
                {FOREWORD.map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    variants={itemVariants}
                    className={
                      idx === FOREWORD.length - 1
                        ? "text-white/85 font-medium"
                        : undefined
                    }
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-end justify-between gap-6 pt-8 border-t border-white/10 max-w-2xl"
            >
              <div className="min-w-0">
                <div
                  className="font-serif italic text-3xl md:text-4xl text-gradient-gold leading-none mb-3 select-none"
                  aria-hidden
                >
                  {MENTOR.name}
                </div>
                <div className="text-lg font-display font-bold text-white leading-tight">
                  {MENTOR.name}
                </div>
                <div className="text-sm text-gold mt-1">
                  {MENTOR.designation}
                </div>
                <div className="text-xs text-white/50 mt-0.5">
                  {MENTOR.organization}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Mentor on LinkedIn"
                  className="w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/40 hover:shadow-gold transition"
                >
                  <i className="fab fa-linkedin-in" />
                </a>
                <a
                  href="#"
                  aria-label="Mentor on X"
                  className="w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/40 hover:shadow-gold transition"
                >
                  <i className="fab fa-x-twitter" />
                </a>
                <a
                  href="#"
                  aria-label="Email the Mentor"
                  className="w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/40 hover:shadow-gold transition"
                >
                  <i className="fas fa-envelope" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MentorsForewordSection;
