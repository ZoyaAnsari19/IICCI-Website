"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useState, type MouseEvent } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

/* ============================================================
   Data — replace fetchNarrativeFilm() with CMS/API
   ============================================================ */

export type NarrativeFilmConfig = {
  title: string;
  posterSrc: string;
  posterAlt: string;
  durationLabel: string;
  /** YouTube video ID (nocookie embed) — set when official film is published */
  youtubeId?: string;
  /** Direct MP4/WebM path in /public when self-hosted */
  fileSrc?: string;
  captionsSrc?: string;
};

const NARRATIVE_FILM: NarrativeFilmConfig = {
  title: "The IICCI Story — Official Narrative Film",
  posterSrc: "/images/img1.png",
  posterAlt: "IICCI global trade chamber — narrative film preview",
  durationLabel: "12 min",
  // youtubeId: "YOUR_VIDEO_ID",
};

const MILESTONES = [
  { value: "1985", label: "Importers forum founded", icon: "fa-landmark" },
  { value: "47+", label: "Years of trade excellence", icon: "fa-hourglass-half" },
  { value: "50+", label: "Global markets connected", icon: "fa-globe" },
  { value: "10K+", label: "Member enterprises", icon: "fa-building" },
] as const;

const HIGHLIGHTS = [
  "Global vision & bilateral trade leadership",
  "Institutional credibility since 1985",
  "Innovation-led member ecosystem",
] as const;

async function fetchNarrativeFilm(): Promise<NarrativeFilmConfig> {
  return NARRATIVE_FILM;
}

/* ============================================================
   Motion
   ============================================================ */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: [0.16, 1, 0.3, 1] },
  },
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/* ============================================================
   Visuals
   ============================================================ */

function StoryWorldBackdrop({ uid }: { uid: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className="absolute inset-0 w-full h-full opacity-[0.14] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id={`story-glow-${uid}`} cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
          <stop offset="40%" stopColor="#1e40af" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`story-arc-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(212,175,55,0)" />
          <stop offset="50%" stopColor="rgba(212,175,55,0.65)" />
          <stop offset="100%" stopColor="rgba(212,175,55,0)" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#story-glow-${uid})`} />
      <g fill="none" stroke={`url(#story-arc-${uid})`} strokeWidth="0.9">
        <ellipse cx="800" cy="420" rx="680" ry="260" />
        <ellipse cx="800" cy="420" rx="480" ry="180" />
        <path d="M 200 450 Q 500 200, 800 380 T 1400 320" />
        <path d="M 180 580 Q 480 350, 800 520 T 1420 480" />
      </g>
      {[
        [320, 300],
        [520, 240],
        [800, 280],
        [1080, 320],
        [1280, 400],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="rgba(212,175,55,0.45)" />
      ))}
    </svg>
  );
}

function FloatingParticles() {
  return (
    <motion.div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/50"
          style={{ left: `${8 + i * 15}%`, top: `${20 + (i % 3) * 22}%` }}
          animate={{ y: [0, -14, 0], opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: 5 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
    </motion.div>
  );
}

function CinematicPlayButton({ large }: { large?: boolean }) {
  const size = large ? "w-20 h-20 sm:w-24 sm:h-24" : "w-16 h-16";
  return (
    <div className={cx("relative grid place-items-center", size)}>
      <motion.span
        className="absolute inset-0 rounded-full bg-gold/20"
        animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        aria-hidden
      />
      <motion.span
        className="absolute inset-[-8px] rounded-full border border-gold/40"
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden
      />
      <motion.div
        className="relative w-full h-full rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.35)]"
        whileHover={{
          scale: 1.06,
          backgroundColor: "rgba(212,175,55,0.28)",
          boxShadow: "0 0 56px rgba(212,175,55,0.5)",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
      >
        <i className="fas fa-play text-white text-xl sm:text-2xl ml-1" aria-hidden />
      </motion.div>
    </div>
  );
}

/* ============================================================
   Video modal
   ============================================================ */

function NarrativeVideoModal({
  open,
  onClose,
  film,
}: {
  open: boolean;
  onClose: () => void;
  film: NarrativeFilmConfig;
}) {
  const hasYoutube = Boolean(film.youtubeId?.trim());
  const hasFile = Boolean(film.fileSrc?.trim());

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label={film.title}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-navy-950/92 backdrop-blur-md"
            onClick={onClose}
            aria-label="Close video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-white/15 shadow-premium glass-dark"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-royal/10 pointer-events-none z-10" />
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:border-gold/50 transition"
              aria-label="Close"
            >
              <i className="fas fa-xmark" aria-hidden />
            </button>

            <div className="relative aspect-video bg-navy-950">
              {hasYoutube ? (
                <iframe
                  title={film.title}
                  src={`https://www.youtube-nocookie.com/embed/${film.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : hasFile ? (
                <video
                  src={film.fileSrc}
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  {film.captionsSrc && (
                    <track kind="captions" src={film.captionsSrc} srcLang="en" label="English" />
                  )}
                </video>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <Image
                    src={film.posterSrc}
                    alt=""
                    fill
                    className="object-cover opacity-40"
                    sizes="100vw"
                  />
                  <div className="relative z-10 max-w-md">
                    <i className="fas fa-film text-gold text-3xl mb-4" aria-hidden />
                    <p className="text-white font-display text-lg font-bold mb-2">
                      Official narrative film
                    </p>
                    <p className="text-white/60 text-sm">
                      Configure <code className="text-gold/90">youtubeId</code> or{" "}
                      <code className="text-gold/90">fileSrc</code> in CMS to enable playback.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="relative z-10 px-6 py-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-display font-bold text-white text-sm">{film.title}</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/45 mt-0.5">
                  {film.durationLabel} · IICCI Media
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-gold/80">
                Press Esc to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   Cinematic video showcase
   ============================================================ */

function CinematicVideoShowcase({
  film,
  onPlay,
  onSpotlight,
}: {
  film: NarrativeFilmConfig;
  onPlay: () => void;
  onSpotlight: (e: MouseEvent<HTMLElement>) => void;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onPlay}
      onMouseMove={onSpotlight}
      className="group relative w-full rounded-3xl overflow-hidden border border-white/15 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
      style={
        {
          "--mx": "50%",
          "--my": "50%",
        } as React.CSSProperties
      }
      whileHover={{ scale: reduced ? 1 : 1.008 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      aria-label={`Play ${film.title}`}
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(520px circle at var(--mx) var(--my), rgba(212,175,55,0.18), transparent 55%)",
        }}
        aria-hidden
      />

      <div className="relative aspect-[21/9] sm:aspect-[2.4/1] min-h-[220px] sm:min-h-[280px] lg:min-h-[340px]">
        <motion.div
          className="absolute inset-0"
          animate={reduced ? {} : { scale: [1.02, 1.06, 1.02] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={film.posterSrc}
            alt={film.posterAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1200px"
            priority
          />
        </motion.div>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 via-transparent to-navy-950/40" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,17,32,0.55)_100%)]"
          animate={{ opacity: [0.7, 0.9, 0.7] }}
          transition={{ duration: 6, repeat: Infinity }}
          aria-hidden
        />

        {/* Intro overlay label */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-[3] flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/15">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/80 font-semibold">
            Narrative Film
          </span>
          <span className="text-[10px] text-white/45">· {film.durationLabel}</span>
        </div>

        {/* Center play */}
        <div className="absolute inset-0 z-[3] flex items-center justify-center">
          <CinematicPlayButton large />
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 z-[3] p-5 sm:p-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-gold font-semibold mb-1">
              Watch the Story
            </div>
            <div className="font-display text-lg sm:text-xl font-bold text-white">
              {film.title.split("—")[0].trim()}
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-white/50">
            <i className="fas fa-closed-captioning text-gold/80" aria-hidden />
            Subtitles available
          </div>
        </div>

        {/* Border glow on hover */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 group-hover:ring-gold/30 transition duration-500 pointer-events-none z-[4]" />
      </div>
    </motion.button>
  );
}

/* ============================================================
   Main Section
   ============================================================ */

export function NarrativeFilmSection({
  preview = false,
  stackAfterHero = false,
}: {
  preview?: boolean;
  /** Extra top spacing when rendered directly below the homepage hero */
  stackAfterHero?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const [modalOpen, setModalOpen] = useState(false);
  const [film, setFilm] = useState<NarrativeFilmConfig>(NARRATIVE_FILM);

  useEffect(() => {
    fetchNarrativeFilm().then(setFilm);
  }, []);

  const handleSpotlight = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  }, []);

  return (
    <section
      id="iicci-story"
      aria-labelledby="iicci-story-heading"
      className={cx(
        "relative z-10 overflow-hidden bg-white",
        stackAfterHero && "scroll-mt-24 border-t border-navy-950/10",
        preview
          ? stackAfterHero
            ? "pt-16 sm:pt-20 lg:pt-24 pb-14 lg:pb-16"
            : "py-14 lg:py-16"
          : "section-padding",
      )}
    >
      <StoryWorldBackdrop uid={uid} />
      <div className="absolute inset-0 bg-grid-light bg-grid-fade opacity-40 pointer-events-none" />
      <FloatingParticles />
      <motion.div
        className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-gold/[0.08] blur-[140px] pointer-events-none"
        animate={{ opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 10, repeat: Infinity }}
        aria-hidden
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 z-10">
        <motion.div
          className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-8 lg:mb-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          <div className="lg:col-span-5">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/5 border border-navy-950/10 mb-5"
            >
              <i className="fas fa-film text-gold text-xs" aria-hidden />
              <span className="text-[10px] uppercase tracking-[0.3em] text-navy-950/70 font-semibold">
                Institutional Film
              </span>
            </motion.div>
            <motion.h2
              id="iicci-story-heading"
              variants={itemVariants}
              className="display-title font-display font-bold leading-[1.05] mb-4"
            >
              <span className="text-navy-950">The IICCI</span>{" "}
              <span className="text-gradient-gold italic font-serif font-normal">
                Story.
              </span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-navy-950/80 text-sm md:text-base font-serif italic mb-3"
            >
              Discover Our Vision in Motion
            </motion.p>
            <motion.p variants={itemVariants} className="text-navy-950/65 text-sm leading-relaxed mb-6">
              From a forum of importers in 1985 to a global trade chamber today — watch the IICCI
              story.
            </motion.p>

            {!preview && (
              <motion.ul variants={itemVariants} className="space-y-2 mb-8">
                {HIGHLIGHTS.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-navy-950/70">
                    <i className="fas fa-check text-gold text-xs" aria-hidden />
                    {h}
                  </li>
                ))}
              </motion.ul>
            )}

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold shadow-gold hover:scale-[1.02] transition"
              >
                Watch the Story
                <i className="fas fa-play text-[10px]" aria-hidden />
              </button>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-navy-950/15 text-navy-950 text-sm font-semibold hover:border-gold/40 transition"
              >
                Discover IICCI
                <i className="fas fa-arrow-right text-[10px] text-gold" aria-hidden />
              </Link>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="lg:col-span-7 w-full">
            <CinematicVideoShowcase
              film={film}
              onPlay={() => setModalOpen(true)}
              onSpotlight={handleSpotlight}
            />
          </motion.div>
        </motion.div>

        {/* Milestones */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {MILESTONES.map((m) => (
            <motion.div
              key={m.label}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="glass-light rounded-2xl border border-navy-950/10 px-4 py-5 text-center hover:border-gold/35 shadow-sm hover:shadow-md transition"
            >
              <i className={cx("fas", m.icon, "text-gold text-sm mb-2")} aria-hidden />
              <div className="font-display text-2xl font-bold text-navy-950">{m.value}</div>
              <div className="text-[9px] uppercase tracking-[0.16em] text-navy-950/50 mt-1 leading-snug">
                {m.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {!preview && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/media"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-navy-950/15 text-navy-950 text-sm font-semibold hover:border-gold/40 transition"
            >
              Explore Our Global Vision
              <i className="fas fa-globe text-xs text-gold" aria-hidden />
            </Link>
          </motion.div>
        )}

        {preview && (
          <p className="text-center mt-8">
            <Link
              href="/media/iicci-story"
              className="text-gold text-sm font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              View full narrative experience
              <i className="fas fa-arrow-right text-[10px]" aria-hidden />
            </Link>
          </p>
        )}
      </div>

      <NarrativeVideoModal open={modalOpen} onClose={() => setModalOpen(false)} film={film} />
    </section>
  );
}

export default function IICCIStoryPage() {
  return <NarrativeFilmSection />;
}
