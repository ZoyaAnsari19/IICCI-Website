"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type TeamTier = "leadership" | "management" | "operations";

type TeamMember = {
  id: string;
  name: string;
  designation: string;
  tier: TeamTier;
  bio: string;
  image?: string;
  initials?: string;
};

const TEAM: TeamMember[] = [
  {
    id: "tk-pandey",
    name: "Mr. T.K. Pandey",
    designation: "Director",
    tier: "leadership",
    image: "/images/tk-pandey.png",
    bio: "Leads organizational direction, bilateral engagement, and high-level partnerships that strengthen IICCI's international trade facilitation mandate.",
  },
  {
    id: "geeta-kumar",
    name: "Mrs. Geeta Kumar",
    designation: "Trustee",
    tier: "leadership",
    initials: "GK",
    bio: "Provides governance oversight and strategic stewardship, ensuring IICCI upholds fiduciary excellence and institutional integrity across all chamber operations.",
  },
  {
    id: "prem-kishore",
    name: "Mr. Prem Kishore",
    designation: "Manager (Accounts & Finance)",
    tier: "management",
    image: "/images/prem-kishore.png",
    bio: "Oversees financial governance, member billing, compliance reporting, and fiscal planning that supports transparent chamber administration.",
  },
  {
    id: "manoj-bhargava",
    name: "Mr. Manoj Kumar Bhargava",
    designation: "Marketing Manager",
    tier: "management",
    image: "/images/manoj-kumar-bhargava.png",
    bio: "Drives brand visibility, member outreach, campaign strategy, and market communications across domestic and international trade ecosystems.",
  },
  {
    id: "pradeep-kumar",
    name: "Mr. Pradeep Kumar",
    designation: "Executive (Office & Field Work)",
    tier: "management",
    image: "/images/pradeep-kumar.png",
    bio: "Coordinates on-ground operations, delegation logistics, and member-facing field activities that keep IICCI programs running seamlessly.",
  },
  {
    id: "anand",
    name: "Mr. Anand",
    designation: "Peon",
    tier: "operations",
    initials: "A",
    bio: "Supports daily office operations and front-desk coordination, ensuring a welcoming, efficient environment for members and visiting delegations.",
  },
];

const TIER_LABEL: Record<TeamTier, string> = {
  leadership: "Leadership",
  management: "Management",
  operations: "Operations",
};

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
          (featured ? "aspect-[4/5]" : compact ? "aspect-[4/3]" : "aspect-[3/4]"),
      )}
    >
      <div
        className={cx(
          "absolute inset-0 z-[1]",
          horizontal
            ? "bg-gradient-to-r from-navy-950/50 via-navy-950/15 to-transparent"
            : "bg-gradient-to-t from-navy-950 via-navy-950/20 to-royal/10",
        )}
      />
      {member.image ? (
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          sizes={
            horizontal
              ? "(max-width: 768px) 40vw, 320px"
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
      <div className="absolute top-4 left-4 z-[3]">
        <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-gold/25 text-[9px] uppercase tracking-[0.2em] text-gold font-bold">
          {TIER_LABEL[member.tier]}
        </span>
      </div>
      {compact && (
        <div className="absolute inset-x-0 bottom-0 z-[4] flex items-end justify-center px-3 pb-4 pt-14 bg-gradient-to-t from-navy-950 via-navy-950/95 to-transparent opacity-100 translate-y-0 transition-all duration-300 pointer-events-none md:opacity-0 md:translate-y-1 md:group-hover:opacity-100 md:group-hover:translate-y-0">
          <p className="font-display text-sm font-bold text-center text-white leading-snug">
            {member.name}
          </p>
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
      <motion.article variants={cardVariants} className="group relative reveal-up h-full">
        <div
          className={cx(
            "relative h-full min-h-[280px] rounded-3xl overflow-hidden border border-white/10",
            "bg-navy-950/40 backdrop-blur-xl shadow-premium",
            "transition-all duration-500",
            "hover:border-gold/45 hover:shadow-gold",
            "before:absolute before:inset-0 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-500 before:z-10 before:pointer-events-none",
            "before:bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.15),transparent_55%)]",
            "group-hover:before:opacity-100",
          )}
        >
          <div className="relative flex h-full flex-row items-stretch">
            <div className="relative w-[38%] shrink-0 overflow-hidden sm:w-[40%] lg:w-[38%] min-w-[120px]">
              <Portrait member={member} horizontal featured={featured} />
            </div>

            <div className="relative flex flex-1 flex-col justify-center border-l border-white/8 bg-navy-950/75 p-5 backdrop-blur-md sm:p-6 lg:p-7">
              <h3 className="font-display text-xl font-bold text-white transition-colors duration-300 group-hover:text-gold sm:text-2xl">
                {member.name}
              </h3>
              <p className="mt-1 text-sm font-medium tracking-wide text-gold">
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
    <motion.article variants={cardVariants} className="group relative reveal-up">
      <div
        className={cx(
          "relative h-full rounded-3xl overflow-hidden border border-white/10",
          "bg-navy-950/40 backdrop-blur-xl shadow-premium",
          "transition-all duration-500",
          "hover:border-gold/45 hover:shadow-gold",
          "before:absolute before:inset-0 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-500",
          "before:bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.15),transparent_55%)]",
          "group-hover:before:opacity-100",
          featured && "lg:min-h-[520px]",
        )}
      >
        <Portrait member={member} featured={featured} compact={compact} />

        <div
          className={cx(
            "relative border-t border-white/8 bg-navy-950/75 backdrop-blur-md",
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
              "mt-1 font-medium tracking-wide text-gold",
              compact ? "text-xs" : "text-sm",
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
  const leadership = TEAM.filter((m) => m.tier === "leadership");
  const management = TEAM.filter((m) => m.tier === "management");
  const operations = TEAM.filter((m) => m.tier === "operations");

  return (
    <section
      id="team"
      className="relative section-padding overflow-hidden"
      aria-labelledby="core-team-heading"
    >
      <div className="absolute inset-0 bg-radial-navy" />
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-25" />
      <div className="absolute inset-0 overflow-hidden">
        <WorldMapBackdrop />
      </div>
      <FloatingParticles />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-royal/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-gold/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4 reveal-up">
            <i className="fas fa-people-group text-gold text-xs" aria-hidden />
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">
              Core Team & Employee Network
            </span>
          </div>
          <h2
            id="core-team-heading"
            className="display-title font-display font-bold mb-4 reveal-up"
          >
            <span className="text-white">The people powering</span>{" "}
            <span className="text-gradient-gold italic font-serif font-normal">
              global trade.
            </span>
          </h2>
          <p className="text-white/65 text-base md:text-lg leading-relaxed reveal-up">
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
          <div>
            <div className="flex items-center gap-3 mb-6 reveal-up">
              <span className="text-[10px] uppercase tracking-[0.28em] text-gold font-bold">
                Leadership
              </span>
              <span className="flex-1 h-px bg-gradient-to-r from-gold/40 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {leadership.map((member) => (
                <TeamCard key={member.id} member={member} horizontal featured />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6 reveal-up">
              <span className="text-[10px] uppercase tracking-[0.28em] text-gold font-bold">
                Management & Operations
              </span>
              <span className="flex-1 h-px bg-gradient-to-r from-gold/40 to-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {[...management, ...operations].map((member) => (
                <TeamCard key={member.id} member={member} compact />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 lg:mt-16 flex flex-wrap items-center justify-center gap-6 reveal-up"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass border border-white/10">
            <i className="fas fa-building-columns text-gold" aria-hidden />
            <span className="text-sm text-white/80">
              <span className="font-semibold text-white">6</span> core team
              members
            </span>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass border border-white/10">
            <i className="fas fa-handshake text-gold" aria-hidden />
            <span className="text-sm text-white/80">
              Institutional strength & corporate governance
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
