"use client";

import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { motion, type Variants } from "framer-motion";

type SocialLink = {
  href: string;
  label: string;
  icon: string;
};

type LeadershipProfile = {
  badge: string;
  badgeVariant: "current" | "legacy";
  name: string;
  designation: string;
  organization: string;
  imageSrc: string;
  imageAlt: string;
  floatingQuote: string;
  headline: string;
  headlineAccent?: string;
  headlineSuffix?: string;
  paragraphs: ReadonlyArray<string>;
  closingLine?: string;
  socials: ReadonlyArray<SocialLink>;
};

const CURRENT_PRESIDENT: LeadershipProfile = {
  badge: "President",
  badgeVariant: "current",
  name: "Rajesh Kaithwas",
  designation: "President",
  organization: "Indian Importers Chambers of Commerce & Industry",
  imageSrc: "/images/RK sir.png",
  imageAlt: "Rajesh Kaithwas, President of IICCI",
  floatingQuote: "We don't just connect businesses, we connect futures.",
  headline: "India is poised to be the",
  headlineAccent: "trade superpower",
  headlineSuffix: "of the 21st century — and IICCI will lead the charge.",
  paragraphs: [
    "The world is witnessing an unprecedented shift in global trade dynamics. India, with its $3.7 trillion economy and Viksit Bharat 2047 vision, sits at the heart of this transformation.",
    "As President of IICCI, my commitment is to ensure every Indian importer, manufacturer, and entrepreneur has access to the global stage — through trusted partnerships, advanced trade intelligence, and a chamber that fights for their interests.",
  ],
  closingLine: "Together, we will build the next generation of global trade leaders from India.",
  socials: [
    { href: "#", label: "LinkedIn", icon: "fab fa-linkedin-in" },
    { href: "#", label: "Twitter", icon: "fab fa-x-twitter" },
    { href: "#", label: "Email", icon: "fas fa-envelope" },
  ],
};

const EX_PRESIDENT: LeadershipProfile = {
  badge: "Ex President",
  badgeVariant: "legacy",
  name: "Shri Atul Saxena",
  designation: "Ex President",
  organization: "Indian Importers Chambers of Commerce & Industry",
  imageSrc: "/images/shri-atul-saxena.jpeg",
  imageAlt: "Shri Atul Saxena, Ex President of IICCI",
  floatingQuote: "Institutions endure when leadership builds trust across generations.",
  headline: "A legacy of",
  headlineAccent: "institutional excellence",
  paragraphs: [
    "Under distinguished stewardship, IICCI strengthened its foundations in policy advocacy, bilateral trade corridors, and member-centric governance — earning the confidence of importers and global partners alike.",
    "The chamber's growth into a credible voice for India's importing community reflects decades of disciplined leadership, diplomatic engagement, and an unwavering commitment to ethical global commerce.",
  ],
  closingLine: "The path we charted continues to guide IICCI's global ambitions today.",
  socials: [
    { href: "#", label: "LinkedIn", icon: "fab fa-linkedin-in" },
    { href: "#", label: "Email", icon: "fas fa-envelope" },
  ],
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function TradeRouteBackdrop({ uid }: { uid: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className="absolute inset-0 w-full h-full opacity-[0.14] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id={`lv-glow-${uid}`} cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#1e40af" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#lv-glow-${uid})`} />
      <g fill="none" stroke="rgba(212,175,55,0.22)" strokeWidth="0.9">
        <ellipse cx="800" cy="450" rx="720" ry="300" />
        <ellipse cx="800" cy="450" rx="520" ry="210" />
        <ellipse cx="800" cy="450" rx="320" ry="125" />
      </g>
      <g stroke="rgba(212,175,55,0.28)" strokeWidth="1" fill="none">
        <path d="M 200 450 Q 500 280, 800 450" />
        <path d="M 800 450 Q 1100 280, 1400 450" />
        <path d="M 800 200 L 800 700" strokeDasharray="5 8" opacity="0.45" />
      </g>
      <motion.circle
        cx="800"
        cy="450"
        r="5"
        fill="#d4af37"
        animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.25, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function FloatingParticles() {
  const particles = [
    { left: "8%", top: "20%", delay: 0, size: 4 },
    { left: "22%", top: "68%", delay: 0.5, size: 3 },
    { left: "48%", top: "12%", delay: 1, size: 5 },
    { left: "72%", top: "32%", delay: 0.3, size: 3 },
    { left: "88%", top: "62%", delay: 1.4, size: 4 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gold/50 blur-[1px]"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -16, 0], opacity: [0.15, 0.55, 0.15] }}
          transition={{
            duration: 5.5 + i * 0.4,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function LeadershipTimeline() {
  return (
    <div
      className="hidden lg:flex absolute left-1/2 top-[280px] bottom-[120px] -translate-x-1/2 flex-col items-center z-10 pointer-events-none"
      aria-hidden
    >
      <motion.div
        className="w-px flex-1 bg-gradient-to-b from-transparent via-gold/40 to-gold/20"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ originY: 0 }}
      />
      <motion.div
        className="my-3 px-3 py-1.5 rounded-full bg-white border border-gold/35 shadow-sm shrink-0"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <span className="text-[9px] uppercase tracking-[0.2em] text-gold font-bold whitespace-nowrap">
          Legacy → Vision
        </span>
      </motion.div>
      <motion.div
        className="w-px flex-1 bg-gradient-to-b from-gold/20 via-gold/40 to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ originY: 0 }}
      />
    </div>
  );
}

function LeadershipCard({
  profile,
  order,
}: {
  profile: LeadershipProfile;
  order: "first" | "second";
}) {
  const isCurrent = profile.badgeVariant === "current";

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={cx(
        "group relative flex flex-col h-full rounded-3xl border overflow-hidden",
        "glass-light shadow-premium bg-white",
        "before:absolute before:inset-0 before:rounded-3xl before:p-[1px] before:pointer-events-none",
        "before:bg-gradient-to-br before:from-gold/40 before:via-navy-950/5 before:to-royal-light/20",
        "before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
        "before:[mask-composite:exclude]",
        isCurrent
          ? "border-gold/30 hover:border-gold/50 hover:shadow-gold"
          : "border-navy-950/10 hover:border-gold/35",
        order === "second" && "lg:mt-0",
      )}
    >
      <div
        className={cx(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
          "bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.14),transparent_65%)]",
        )}
        aria-hidden
      />

      <div className="relative p-5 sm:p-6 lg:p-7 flex flex-col h-full">
        {/* Portrait */}
        <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] mb-5 sm:mb-6">
          <div
            className="absolute -inset-2 sm:-inset-3 rounded-[1.75rem] border border-gold/15 pointer-events-none"
            aria-hidden
          />
          <div
            className="absolute -inset-4 sm:-inset-5 rounded-[2rem] border border-gold/8 pointer-events-none"
            aria-hidden
          />

          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-navy-950 border border-white/10">
            <motion.div
              className="relative w-full h-full"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={profile.imageSrc}
                alt={profile.imageAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 380px, 420px"
              />
            </motion.div>
            <div
              className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent pointer-events-none"
              aria-hidden
            />

            <div
              className={cx(
                "absolute top-3 right-3 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold",
                isCurrent ? "bg-gold text-navy-950" : "bg-white/10 border border-white/20 text-white backdrop-blur-sm",
              )}
            >
              {profile.badge}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
              <div className="font-serif italic text-gold text-lg sm:text-xl">{profile.name}</div>
            </div>
          </div>

          <motion.div
            className="absolute -bottom-4 left-3 right-3 sm:left-0 sm:right-auto sm:-left-4 sm:max-w-[240px] glass-light rounded-2xl p-3 sm:p-4 border border-gold/25 shadow-premium bg-white/95 backdrop-blur-sm"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <i className="fas fa-quote-right text-gold text-lg sm:text-xl mb-1.5 block" aria-hidden />
            <p className="text-[11px] sm:text-xs text-navy-950/70 italic leading-snug">
              &ldquo;{profile.floatingQuote}&rdquo;
            </p>
          </motion.div>
        </div>

        {/* Copy */}
        <div className="relative flex flex-col flex-1 pt-6 sm:pt-8">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold/80 font-semibold mb-2">
            {isCurrent ? "Current President" : "Institutional Legacy"}
          </span>

          <h3 className="font-display font-bold text-navy-950 text-lg sm:text-xl leading-snug mb-3 group-hover:text-gold transition-colors duration-300">
            <span>{profile.headline} </span>
            {profile.headlineAccent && (
              <span className="text-gradient-gold italic font-serif font-normal">
                {profile.headlineAccent}
              </span>
            )}
            {profile.headlineSuffix && (
              <span className="text-navy-950"> {profile.headlineSuffix}</span>
            )}
          </h3>

          <div className="space-y-3 text-navy-950/65 text-xs sm:text-sm leading-relaxed flex-1 mb-5">
            {profile.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {profile.closingLine && (
              <p className="text-navy-950/80 font-medium italic">{profile.closingLine}</p>
            )}
          </div>

          <div className="pt-4 border-t border-navy-950/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="font-display font-bold text-navy-950 text-base">{profile.name}</div>
              <div className="text-sm text-gold mt-0.5">{profile.designation}</div>
              <div className="text-[10px] text-navy-950/45 mt-0.5 uppercase tracking-wider">
                {profile.organization}
              </div>
            </div>
            <div className="flex gap-2">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-10 h-10 rounded-full border border-navy-950/10 bg-navy-950/5 flex items-center justify-center text-navy-950/60 hover:text-gold hover:border-gold/40 transition"
                  aria-label={s.label}
                >
                  <i className={cx(s.icon, "text-sm")} aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export const LeadershipVisionSection = () => {
  const uid = useId().replace(/:/g, "");

  return (
    <section
      id="leadership-vision"
      aria-labelledby="leadership-vision-heading"
      className="relative section-padding overflow-hidden bg-white border-t border-navy-950/10"
    >
      <TradeRouteBackdrop uid={uid} />
      <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />
      <FloatingParticles />

      <motion.div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-gold/8 blur-[140px] pointer-events-none"
        animate={{ x: [0, 18, 0], y: [0, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[520px] h-[520px] rounded-full bg-royal/5 blur-[140px] pointer-events-none"
        animate={{ x: [0, -14, 0], y: [0, 12, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={headerVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/5 border border-navy-950/10 mb-6"
          >
            <i className="fas fa-crown text-gold text-xs" aria-hidden />
            <span className="text-[10px] uppercase tracking-[0.3em] text-navy-950/70 font-semibold">
              Institutional Leadership
            </span>
            <span className="h-3 w-px bg-navy-950/15" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">
              IICCI
            </span>
          </motion.div>

          <motion.h2
            id="leadership-vision-heading"
            variants={headerVariants}
            className="display-title font-display font-bold mb-4 leading-[1.02]"
          >
            <span className="text-navy-950">Leadership</span>{" "}
            <span className="text-gradient-gold italic font-serif font-normal">Vision</span>
          </motion.h2>

          <motion.p
            variants={headerVariants}
            className="text-base md:text-lg text-navy-950/65 leading-relaxed font-serif italic"
          >
            Guided by Experience, Driven by Global Trade Excellence
          </motion.p>

          <motion.p
            variants={headerVariants}
            className="mt-4 text-sm text-navy-950/50 max-w-2xl mx-auto"
          >
            A dual executive showcase honouring institutional legacy and the forward-looking
            presidency guiding India&apos;s importing community into global markets.
          </motion.p>
        </motion.div>

        <div className="relative">
          <LeadershipTimeline />

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
          >
            <LeadershipCard profile={CURRENT_PRESIDENT} order="first" />
            <LeadershipCard profile={EX_PRESIDENT} order="second" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link
            href="/about/leadership"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold shadow-gold hover:scale-[1.02] active:scale-[0.98] transition"
          >
            Meet Our Leadership
            <i className="fas fa-arrow-right text-xs" aria-hidden />
          </Link>
          <Link
            href="/about/mission-vision"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full border border-navy-950/15 text-navy-950 text-sm font-semibold hover:border-gold/40 hover:text-gold transition"
          >
            Explore IICCI Vision
            <i className="fas fa-compass text-xs text-gold" aria-hidden />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full border border-navy-950/10 text-navy-950/80 text-sm font-semibold hover:border-gold/30 hover:text-navy-950 transition"
          >
            Discover Our Journey
            <i className="fas fa-route text-xs text-gold" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadershipVisionSection;
