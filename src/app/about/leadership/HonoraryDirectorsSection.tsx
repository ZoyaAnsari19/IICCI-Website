"use client";

import Image from "next/image";
import { useCallback, useId, useState, type MouseEvent } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

type HonoraryDirector = {
  id: string;
  name: string;
  designation: string;
  expertise: string;
  bio: string;
  image?: string;
  initials?: string;
  linkedin?: string;
};

const DIRECTORS: ReadonlyArray<HonoraryDirector> = [
  {
    id: "arjun-mehta",
    name: "Dr. Arjun Mehta",
    designation: "Honorary Director",
    expertise: "International Trade & Policy",
    bio: "A veteran trade economist and former bilateral negotiator, Dr. Mehta advises IICCI on WTO frameworks, customs modernization, and strategic policy engagement with G20 trade corridors.",
    image: "/images/img1.png",
    linkedin: "#",
  },
  {
    id: "elena-vasquez",
    name: "Mrs. Elena Vasquez",
    designation: "Honorary Director",
    expertise: "Global Supply Chain & Logistics",
    bio: "With three decades leading multinational logistics networks, Mrs. Vasquez strengthens IICCI's facilitation of cross-border supply chains, port partnerships, and integrated trade corridors.",
    image: "/images/img2.png",
    linkedin: "#",
  },
  {
    id: "hiroshi-tanaka",
    name: "Mr. Hiroshi Tanaka",
    designation: "Honorary Director",
    expertise: "Asia-Pacific Commerce",
    bio: "A respected voice in Indo-Pacific trade diplomacy, Mr. Tanaka bridges Japanese and Indian business communities through delegation programs, investment forums, and sectoral alliances.",
    image: "/images/img3.png",
    linkedin: "#",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function WorldTradeBackdrop() {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 1600 800"
      className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id={`hd-map-glow-${uid}`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#1e40af" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="800" fill={`url(#hd-map-glow-${uid})`} />
      <g fill="none" stroke="rgba(212,175,55,0.18)" strokeWidth="0.8">
        <ellipse cx="800" cy="400" rx="700" ry="290" />
        <ellipse cx="800" cy="400" rx="540" ry="220" />
        <ellipse cx="800" cy="400" rx="380" ry="150" />
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
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" />
        ))}
      </g>
      <g stroke="rgba(212,175,55,0.22)" strokeWidth="1" fill="none">
        <path d="M 360 270 Q 600 160, 820 250" />
        <path d="M 820 250 Q 950 200, 1020 290" />
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
    { left: "68%", top: "32%", delay: 0.4, size: 3 },
    { left: "82%", top: "62%", delay: 1.5, size: 4 },
    { left: "92%", top: "40%", delay: 1.9, size: 2 },
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
            y: [0, -12, 0],
            opacity: [0.25, 0.65, 0.25],
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

function DirectorPortrait({ director }: { director: HonoraryDirector }) {
  return (
    <div className="relative aspect-[4/3] max-h-[220px] sm:max-h-[240px] overflow-hidden bg-navy-900 shrink-0">
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy-950 via-navy-950/25 to-royal/10" />
      {director.image ? (
        <Image
          src={director.image}
          alt={director.name}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <span className="font-display font-bold text-5xl text-gradient-gold">
            {director.initials}
          </span>
        </div>
      )}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[2] bg-[linear-gradient(105deg,transparent_40%,rgba(212,175,55,0.14)_50%,transparent_60%)]" />
      <div className="absolute top-4 left-4 z-[3]">
        <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-gold/25 text-[9px] uppercase tracking-[0.2em] text-gold font-bold">
          Honorary
        </span>
      </div>
    </div>
  );
}

function DirectorCard({
  director,
  onOpen,
  onSpotlight,
}: {
  director: HonoraryDirector;
  onOpen: (director: HonoraryDirector) => void;
  onSpotlight: (e: MouseEvent<HTMLElement>) => void;
}) {
  return (
    <motion.article
      variants={cardVariants}
      className="group relative reveal-up"
      onMouseMove={onSpotlight}
    >
      <div
        className={cx(
          "relative flex h-full flex-col rounded-3xl overflow-hidden",
          "border border-white/10 bg-navy-950/45 backdrop-blur-xl shadow-premium",
          "transition-all duration-500",
          "hover:border-gold/45 hover:shadow-gold hover:-translate-y-1",
          "before:absolute before:inset-0 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-500 before:z-10 before:pointer-events-none",
          "before:bg-[radial-gradient(ellipse_at_var(--mx,50%)_var(--my,0%),rgba(212,175,55,0.18),transparent_55%)]",
          "group-hover:before:opacity-100",
        )}
      >
        <DirectorPortrait director={director} />

        <div className="relative flex flex-col p-4 sm:p-5 border-t border-white/8 bg-navy-950/80 backdrop-blur-md">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-display text-lg font-bold text-white leading-snug transition-colors duration-300 group-hover:text-gold">
              {director.name}
            </h3>
            {director.linkedin && (
              <a
                href={director.linkedin}
                aria-label={`${director.name} on LinkedIn`}
                className="shrink-0 w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/40 transition z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <i className="fab fa-linkedin-in text-sm" />
              </a>
            )}
          </div>

          <p className="text-sm font-medium tracking-wide text-gold">
            {director.designation}
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/50 font-semibold">
            {director.expertise}
          </p>

          <p className="mt-2 text-sm text-white/65 leading-relaxed line-clamp-2">
            {director.bio}
          </p>

          <button
            type="button"
            onClick={() => onOpen(director)}
            className="mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/45 hover:text-gold font-semibold transition group/btn"
          >
            <span className="h-px w-8 bg-gold/50 transition-all duration-500 group-hover/btn:w-12" />
            Read full profile
            <i className="fas fa-arrow-right text-[9px]" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function DirectorBioModal({
  director,
  onClose,
}: {
  director: HonoraryDirector;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="director-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close profile"
      />

      <motion.div
        className="relative w-full max-w-lg rounded-3xl border border-gold/25 bg-navy-950 shadow-premium overflow-hidden"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative h-48 sm:h-56 bg-navy-900">
          {director.image ? (
            <Image
              src={director.image}
              alt=""
              fill
              className="object-cover object-top"
              sizes="512px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-800 to-navy-950">
              <span className="font-display font-bold text-6xl text-gradient-gold">
                {director.initials}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass border border-white/15 flex items-center justify-center text-white/80 hover:text-gold transition"
            aria-label="Close"
          >
            <i className="fas fa-times" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="text-[10px] uppercase tracking-[0.28em] text-gold font-bold mb-2">
            Honorary Director
          </div>
          <h3
            id="director-modal-title"
            className="font-display text-2xl font-bold text-white mb-1"
          >
            {director.name}
          </h3>
          <p className="text-sm text-gold font-medium">{director.designation}</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/50">
            {director.expertise}
          </p>
          <p className="mt-5 text-white/75 leading-relaxed text-sm sm:text-base">
            {director.bio}
          </p>
          {director.linkedin && (
            <a
              href={director.linkedin}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-gold/30 text-sm text-gold hover:bg-gold/10 transition"
            >
              <i className="fab fa-linkedin-in" />
              Connect on LinkedIn
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export const HonoraryDirectorsSection = () => {
  const [selected, setSelected] = useState<HonoraryDirector | null>(null);

  const handleSpotlight = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  }, []);

  const handleOpen = useCallback((director: HonoraryDirector) => {
    setSelected(director);
  }, []);

  const handleClose = useCallback(() => {
    setSelected(null);
  }, []);

  return (
    <section
      id="honorary-directors"
      aria-labelledby="honorary-directors-heading"
      className="relative section-padding overflow-hidden bg-white text-navy-950 border-t border-navy-950/10"
    >
      <WorldTradeBackdrop />
      <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none" />

      <motion.div
        className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-gold/[0.07] blur-[140px] pointer-events-none"
        animate={{ x: [0, 22, 0], y: [0, -14, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute -bottom-40 -right-24 w-[560px] h-[560px] rounded-full bg-royal/[0.18] blur-[140px] pointer-events-none"
        animate={{ x: [0, -18, 0], y: [0, 16, 0] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        aria-hidden
      />

      <FloatingParticles />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14 lg:mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={cardVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/5 border border-navy-950/10 mb-6"
          >
            <i className="fas fa-award text-gold text-xs" aria-hidden />
            <span className="text-[10px] uppercase tracking-[0.3em] text-navy-950/70 font-semibold">
              Executive Council
            </span>
            <span className="h-3 w-px bg-navy-950/15" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">
              Honorary Board
            </span>
          </motion.div>

          <motion.h2
            id="honorary-directors-heading"
            variants={cardVariants}
            className="display-title font-display font-bold mb-5 leading-[1.02]"
          >
            <span className="text-navy-950">Honorary</span>{" "}
            <span className="text-gradient-gold italic font-serif font-normal">
              Directors
            </span>
          </motion.h2>

          <motion.p
            variants={cardVariants}
            className="text-base md:text-lg text-navy-950/65 leading-relaxed font-serif italic"
          >
            &ldquo;Distinguished Leaders Guiding IICCI&rsquo;s Global
            Vision.&rdquo;
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {DIRECTORS.map((director) => (
            <DirectorCard
              key={director.id}
              director={director}
              onOpen={handleOpen}
              onSpotlight={handleSpotlight}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-14 lg:mt-16 flex flex-wrap items-center justify-center gap-4"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-navy-950/10 shadow-sm">
            <i className="fas fa-user-tie text-gold" aria-hidden />
            <span className="text-sm text-navy-950/75">
              <span className="font-semibold text-navy-950">3</span> honorary
              directors &amp; global advisors
            </span>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-navy-950/10 shadow-sm">
            <i className="fas fa-handshake text-gold" aria-hidden />
            <span className="text-sm text-navy-950/75">
              Institutional credibility &amp; international expertise
            </span>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <DirectorBioModal director={selected} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default HonoraryDirectorsSection;
