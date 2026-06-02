"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  OPERATIONAL_TEAM,
  OPERATIONAL_TEAM_GOVERNANCE_NOTE,
  type OperationalTeamMember,
  type TeamTier,
} from "@/config/operational-team";

type TeamMember = OperationalTeamMember;

const TEAM: TeamMember[] = [...OPERATIONAL_TEAM];
const TK_PANDEY_ID = "tk-pandey";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function WorldMapBackdrop() {
  return (
    <svg
      viewBox="0 0 1200 600"
      className="absolute inset-0 w-full h-full opacity-[0.07]"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id="team-map-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="600" fill="url(#team-map-glow)" />
      <g fill="none" stroke="rgba(212,175,55,0.25)" strokeWidth="0.8">
        <ellipse cx="600" cy="300" rx="520" ry="220" />
        <ellipse cx="600" cy="300" rx="420" ry="170" />
        <ellipse cx="600" cy="300" rx="300" ry="115" />
        <line x1="80" y1="300" x2="1120" y2="300" />
        <line x1="600" y1="60" x2="600" y2="540" />
      </g>
      <g fill="rgba(59,130,246,0.2)">
        {[
          [320, 220],
          [480, 180],
          [720, 200],
          [880, 260],
          [540, 340],
          [760, 380],
          [400, 400],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" />
        ))}
      </g>
      <g stroke="rgba(212,175,55,0.15)" strokeWidth="1" fill="none">
        <path d="M 320 220 Q 500 150, 720 200" />
        <path d="M 480 180 Q 650 280, 880 260" />
        <path d="M 540 340 Q 700 300, 760 380" />
      </g>
    </svg>
  );
}

function FloatingParticles() {
  const particles = [
    { left: "8%", top: "18%", delay: 0, size: 4 },
    { left: "22%", top: "72%", delay: 0.8, size: 3 },
    { left: "45%", top: "12%", delay: 1.2, size: 5 },
    { left: "68%", top: "28%", delay: 0.4, size: 3 },
    { left: "82%", top: "65%", delay: 1.6, size: 4 },
    { left: "92%", top: "38%", delay: 2, size: 2 },
    { left: "55%", top: "82%", delay: 0.6, size: 3 },
    { left: "12%", top: "48%", delay: 1.4, size: 2 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
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

function Portrait({
  member,
  horizontal,
  featured,
  compact,
}: {
  member: TeamMember;
  horizontal?: boolean;
  featured?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={cx(
        "relative overflow-hidden bg-navy-900 h-full w-full",
        !horizontal &&
          (featured ? "aspect-[4/5]" : compact ? "aspect-[3/4]" : "aspect-[3/4]"),
      )}
    >
      {!compact && (
        <div
          className={cx(
            "absolute inset-0 z-[1] pointer-events-none",
            horizontal
              ? "bg-gradient-to-r from-navy-950/50 via-navy-950/15 to-transparent"
              : "bg-gradient-to-t from-navy-950/40 via-transparent to-transparent",
          )}
        />
      )}
      {member.image ? (
        <Image
          src={member.image}
          alt={member.name}
          fill
          className={cx(
            "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]",
            horizontal ? "object-[center_top]" : compact ? "object-[center_18%]" : "object-top",
          )}
          sizes={
            horizontal
              ? featured
                ? "(max-width: 768px) 50vw, 420px"
                : "(max-width: 768px) 40vw, 320px"
              : featured
                ? "(max-width: 768px) 100vw, 480px"
                : "(max-width: 768px) 50vw, 320px"
          }
          priority={member.id === "tk-pandey"}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <span
            className={cx(
              "font-display font-bold text-gradient-gold",
              featured ? "text-6xl sm:text-7xl" : compact ? "text-4xl" : "text-5xl",
            )}
          >
            {member.initials}
          </span>
        </div>
      )}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[2] bg-[linear-gradient(105deg,transparent_40%,rgba(212,175,55,0.12)_50%,transparent_60%)]" />
      {compact && (
        <div className="absolute top-3 right-3 z-[3] max-w-[85%]">
          <span className="inline-block px-2.5 py-1 rounded-lg bg-white/95 text-navy-950 border border-gold/30 text-[9px] sm:text-[10px] font-bold leading-tight shadow-sm line-clamp-2">
            {member.designation}
          </span>
        </div>
      )}
    </div>
  );
}

function TeamCard({
  member,
  horizontal = false,
  featured = false,
  compact = false,
}: {
  member: TeamMember;
  horizontal?: boolean;
  featured?: boolean;
  compact?: boolean;
}) {
  if (horizontal) {
    return (
      <motion.article variants={cardVariants} className="group relative reveal-up">
        <div
          className={cx(
            "relative rounded-3xl overflow-hidden border border-white/10",
            "bg-navy-950/40 backdrop-blur-xl shadow-premium",
            "transition-all duration-500",
            "hover:border-gold/45 hover:shadow-gold",
            "before:absolute before:inset-0 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-500 before:z-10 before:pointer-events-none",
            "before:bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.15),transparent_55%)]",
            "group-hover:before:opacity-100",
          )}
        >
          <div className="relative flex flex-col lg:flex-row">
            <div
              className={cx(
                "relative w-full lg:w-[44%] shrink-0 overflow-hidden bg-navy-900",
                "h-[260px] sm:h-[320px] lg:h-auto lg:min-h-[320px]",
              )}
            >
              <Portrait member={member} horizontal featured={featured} />
              <div className="absolute top-3 left-3 z-[3] max-w-[85%]">
                <span className="inline-block px-2.5 py-1 rounded-lg bg-white/95 text-navy-950 border border-gold/30 text-[9px] sm:text-[10px] font-bold leading-tight shadow-sm line-clamp-2">
                  {member.designation}
                </span>
              </div>
            </div>

            <div className="relative flex flex-1 flex-col justify-center text-left border-t border-white/8 lg:border-t-0 lg:border-l border-white/8 bg-navy-950/75 p-5 backdrop-blur-md sm:p-6 lg:p-8">
              <h3 className="font-display text-xl font-bold text-white transition-colors duration-300 group-hover:text-gold sm:text-2xl">
                {member.name}
              </h3>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/45 font-semibold">
                Role &amp; designation
              </p>
              <p className="mt-0.5 text-sm font-semibold tracking-wide text-gold">
                {member.designation}
              </p>
              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-white/60">
                {member.bio}
              </p>
              <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/40 transition-colors group-hover:text-gold/80">
                <span className="h-px w-8 bg-gold/50 transition-all duration-500 group-hover:w-12" />
                IICCI Core Team
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article variants={cardVariants} className="group relative reveal-up h-full">
      <div
        className={cx(
          "relative flex h-full flex-col rounded-3xl overflow-hidden border border-white/10",
          "bg-navy-950/40 backdrop-blur-xl shadow-premium",
          "transition-all duration-500",
          "hover:border-gold/45 hover:shadow-gold",
          "before:absolute before:inset-0 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-500",
          "before:bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.15),transparent_55%)]",
          "group-hover:before:opacity-100",
          featured && "lg:min-h-[520px]",
        )}
      >
        <div className={compact ? "shrink-0" : undefined}>
          <Portrait member={member} featured={featured} compact={compact} />
        </div>

        <div
          className={cx(
            "relative flex flex-1 flex-col border-t border-white/8 bg-navy-950/90 backdrop-blur-md",
            compact ? "p-3.5 sm:p-4" : "p-5 sm:p-6",
          )}
        >
          <h3
            className={cx(
              "font-display font-bold text-white transition-colors duration-300 group-hover:text-gold",
              featured ? "text-xl sm:text-2xl" : compact ? "text-base" : "text-lg",
            )}
          >
            {member.name}
          </h3>
          <p
            className={cx(
              "mt-1 font-semibold tracking-wide text-gold",
              compact ? "text-sm leading-snug" : "text-sm",
            )}
          >
            {member.designation}
          </p>
          <p
            className={cx(
              "leading-relaxed text-white/60",
              compact ? "mt-2 line-clamp-2 text-xs" : "mt-3 line-clamp-3 text-sm",
            )}
          >
            {member.bio}
          </p>
          <div
            className={cx(
              "flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/40 transition-colors group-hover:text-gold/80",
              compact ? "mt-3" : "mt-4",
            )}
          >
            <span className="h-px w-8 bg-gold/50 transition-all duration-500 group-hover:w-12" />
            IICCI Core Team
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export const CoreTeam = () => {
  const tkPandey = TEAM.find((m) => m.id === TK_PANDEY_ID);

  return (
    <section
      id="team"
      className="relative section-padding overflow-hidden bg-white"
      aria-labelledby="core-team-heading"
    >
      <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" aria-hidden />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-royal/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/5 border border-navy-950/10 mb-4 reveal-up">
            <i className="fas fa-people-group text-gold text-xs" aria-hidden />
            <span className="text-[10px] uppercase tracking-[0.25em] text-navy-950/70">
              Core Team & Employee Network
            </span>
          </div>
          <h2
            id="core-team-heading"
            className="display-title font-display font-bold mb-4 reveal-up"
          >
            <span className="text-navy-950">The people powering</span>{" "}
            <span className="text-gradient-gold italic font-serif font-normal">
              global trade.
            </span>
          </h2>
          <p className="text-navy-950/70 text-base md:text-lg leading-relaxed reveal-up">
            Meet the dedicated professionals behind IICCI — trustees, directors,
            and operational leaders committed to excellence, trust, and
            international business culture.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-10 lg:space-y-12"
        >
          {tkPandey ? (
            <div className="max-w-4xl mx-auto">
              <TeamCard member={tkPandey} horizontal featured />
            </div>
          ) : (
            <p className="text-center text-navy-950/60 reveal-up">
              Team member not found.
            </p>
          )}
        </motion.div>

        {/* Intentionally trimmed to show only the requested team member. */}
      </div>
    </section>
  );
};
