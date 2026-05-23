"use client";

import Image from "next/image";
import {
  useCallback,
  useId,
  useMemo,
  useState,
  type MouseEvent,
} from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

type Department =
  | "Trade Facilitation"
  | "Membership"
  | "Operations"
  | "Research"
  | "Administration"
  | "International Coordination";

type TeamMember = {
  id: string;
  name: string;
  designation: string;
  department: Department;
  bio: string;
  image?: string;
  initials?: string;
  email?: string;
  linkedin?: string;
};

const DEPARTMENTS: ReadonlyArray<Department> = [
  "Trade Facilitation",
  "Membership",
  "Operations",
  "Research",
  "Administration",
  "International Coordination",
];

const TEAM: ReadonlyArray<TeamMember> = [
  {
    id: "prem-kishore",
    name: "Mr. Prem Kishore",
    designation: "Manager (Accounts & Finance)",
    department: "Administration",
    bio: "Oversees financial governance, member billing, compliance reporting, and fiscal planning that supports transparent chamber administration.",
    image: "/images/prem-kishor.png",
    linkedin: "#",
  },
  {
    id: "manoj-bhargava",
    name: "Mr. Manoj Kumar Bhargava",
    designation: "Marketing Manager",
    department: "Membership",
    bio: "Drives brand visibility, member outreach, campaign strategy, and market communications across domestic and international trade ecosystems.",
    image: "/images/manoj-kumar-bhargava.png",
    linkedin: "#",
  },
  {
    id: "pradeep-kumar",
    name: "Mr. Pradeep Kumar",
    designation: "Executive (Office & Field Work)",
    department: "Operations",
    bio: "Coordinates on-ground operations, delegation logistics, and member-facing field activities that keep IICCI programs running seamlessly.",
    image: "/images/pradeep-kumar.png",
    linkedin: "#",
  },
  {
    id: "anand",
    name: "Mr. Anand",
    designation: "Office Support Executive",
    department: "Operations",
    bio: "Supports daily office operations and front-desk coordination, ensuring a welcoming, efficient environment for members and visiting delegations.",
    initials: "A",
  },
  {
    id: "kavita-sharma",
    name: "Mrs. Kavita Sharma",
    designation: "Trade Facilitation Officer",
    department: "Trade Facilitation",
    bio: "Manages import-export documentation workflows, customs liaison, and bilateral trade desk coordination for member enterprises.",
    image: "/images/img1.png",
    linkedin: "#",
  },
  {
    id: "rahul-verma",
    name: "Mr. Rahul Verma",
    designation: "Senior Research Analyst",
    department: "Research",
    bio: "Produces market intelligence briefs, sector reports, and policy analyses that empower members with data-driven trade decisions.",
    image: "/images/img2.png",
    linkedin: "#",
  },
  {
    id: "priya-nair",
    name: "Ms. Priya Nair",
    designation: "International Coordination Lead",
    department: "International Coordination",
    bio: "Coordinates overseas chapter communications, foreign delegation schedules, and cross-border partnership programs for IICCI members.",
    image: "/images/img3.png",
    linkedin: "#",
  },
  {
    id: "sanjay-mehta",
    name: "Mr. Sanjay Mehta",
    designation: "Membership Executive",
    department: "Membership",
    bio: "Handles member onboarding, renewal cycles, and relationship management across IICCI's growing importer and trade community network.",
    initials: "SM",
    linkedin: "#",
  },
];

const DEPARTMENT_ICONS: Record<Department, string> = {
  "Trade Facilitation": "fa-ship",
  Membership: "fa-id-card",
  Operations: "fa-gears",
  Research: "fa-magnifying-glass-chart",
  Administration: "fa-building",
  "International Coordination": "fa-earth-americas",
};

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
        <radialGradient id={`ot-map-glow-${uid}`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#1e40af" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="800" fill={`url(#ot-map-glow-${uid})`} />
      <g fill="none" stroke="rgba(212,175,55,0.18)" strokeWidth="0.8">
        <ellipse cx="800" cy="400" rx="700" ry="290" />
        <ellipse cx="800" cy="400" rx="540" ry="220" />
      </g>
      <g stroke="rgba(212,175,55,0.22)" strokeWidth="1" fill="none">
        <path d="M 360 270 Q 600 160, 820 250" />
        <path d="M 820 250 Q 1000 200, 1200 300" />
      </g>
    </svg>
  );
}

function FloatingParticles() {
  const particles = [
    { left: "8%", top: "20%", delay: 0, size: 4 },
    { left: "24%", top: "68%", delay: 0.8, size: 3 },
    { left: "48%", top: "14%", delay: 1.2, size: 5 },
    { left: "72%", top: "30%", delay: 0.4, size: 3 },
    { left: "86%", top: "60%", delay: 1.6, size: 4 },
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

function TeamPortrait({ member }: { member: TeamMember }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-navy-900 shrink-0">
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy-950 via-navy-950/20 to-royal/10" />
      {member.image ? (
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 280px"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <span className="font-display font-bold text-4xl sm:text-5xl text-gradient-gold">
            {member.initials}
          </span>
        </div>
      )}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[2] bg-[linear-gradient(105deg,transparent_40%,rgba(212,175,55,0.12)_50%,transparent_60%)]" />
      <div className="absolute top-3 left-3 z-[3]">
        <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-gold/25 text-[8px] uppercase tracking-[0.18em] text-gold font-bold">
          {member.department.split(" ")[0]}
        </span>
      </div>
    </div>
  );
}

function TeamCard({
  member,
  onOpen,
  onSpotlight,
}: {
  member: TeamMember;
  onOpen: (member: TeamMember) => void;
  onSpotlight: (e: MouseEvent<HTMLElement>) => void;
}) {
  return (
    <motion.article
      layout
      variants={cardVariants}
      className="group relative h-full reveal-up"
      onMouseMove={onSpotlight}
    >
      <div
        className={cx(
          "relative flex h-full flex-col rounded-3xl overflow-hidden",
          "border border-white/10 bg-navy-950/50 backdrop-blur-xl shadow-premium",
          "transition-all duration-500",
          "hover:border-gold/40 hover:shadow-gold hover:-translate-y-1",
          "before:absolute before:inset-0 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-500 before:z-10 before:pointer-events-none",
          "before:bg-[radial-gradient(ellipse_at_var(--mx,50%)_var(--my,0%),rgba(212,175,55,0.16),transparent_55%)]",
          "group-hover:before:opacity-100",
        )}
      >
        <TeamPortrait member={member} />

        <div className="relative flex flex-1 flex-col p-4 sm:p-5 border-t border-white/8 bg-navy-950/85 backdrop-blur-md">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-display text-base sm:text-lg font-bold text-white leading-snug transition-colors duration-300 group-hover:text-gold">
              {member.name}
            </h3>
            <div className="flex gap-1.5 shrink-0">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  aria-label={`${member.name} on LinkedIn`}
                  className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-white/55 hover:text-gold hover:border-gold/40 transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="fab fa-linkedin-in text-xs" />
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  aria-label={`Email ${member.name}`}
                  className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-white/55 hover:text-gold hover:border-gold/40 transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="fas fa-envelope text-xs" />
                </a>
              )}
            </div>
          </div>

          <p className="text-sm font-medium text-gold">{member.designation}</p>
          <p className="mt-1 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-white/50 font-semibold">
            <i
              className={cx(
                "fas",
                DEPARTMENT_ICONS[member.department],
                "text-gold/70 text-[9px]",
              )}
            />
            {member.department}
          </p>

          <p className="mt-2.5 text-xs sm:text-sm text-white/60 leading-relaxed line-clamp-2 flex-1">
            {member.bio}
          </p>

          <button
            type="button"
            onClick={() => onOpen(member)}
            className="mt-3 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/40 hover:text-gold font-semibold transition"
          >
            <span className="h-px w-6 bg-gold/40 group-hover:w-10 transition-all duration-500" />
            View profile
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function TeamMemberModal({
  member,
  onClose,
}: {
  member: TeamMember;
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
      aria-labelledby="team-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close profile"
      />

      <motion.div
        className="relative w-full max-w-md rounded-3xl border border-gold/25 bg-navy-950 shadow-premium overflow-hidden"
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative h-44 bg-navy-900">
          {member.image ? (
            <Image
              src={member.image}
              alt=""
              fill
              className="object-cover object-top"
              sizes="400px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-800 to-navy-950">
              <span className="font-display font-bold text-5xl text-gradient-gold">
                {member.initials}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full glass border border-white/15 flex items-center justify-center text-white/80 hover:text-gold transition"
            aria-label="Close"
          >
            <i className="fas fa-times text-sm" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-gold font-bold mb-2">
            <i className={cx("fas", DEPARTMENT_ICONS[member.department])} />
            {member.department}
          </div>
          <h3
            id="team-modal-title"
            className="font-display text-xl font-bold text-white"
          >
            {member.name}
          </h3>
          <p className="text-sm text-gold mt-1">{member.designation}</p>
          <p className="mt-4 text-white/70 leading-relaxed text-sm">
            {member.bio}
          </p>
          {member.linkedin && (
            <a
              href={member.linkedin}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-gold/30 text-sm text-gold hover:bg-gold/10 transition"
            >
              <i className="fab fa-linkedin-in" />
              LinkedIn
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function TeamStats({ memberCount, departmentCount }: { memberCount: number; departmentCount: number }) {
  const stats = [
    { value: memberCount, label: "Team Members", icon: "fa-people-group" },
    { value: departmentCount, label: "Departments", icon: "fa-sitemap" },
    { value: "24/7", label: "Member Support", icon: "fa-headset" },
    { value: "50+", label: "Global Chapters", icon: "fa-globe" },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 lg:mb-14"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={containerVariants}
    >
      {stats.map((s) => (
        <motion.div
          key={s.label}
          variants={cardVariants}
          className="rounded-2xl glass border border-white/10 p-5 text-center hover:border-gold/30 transition duration-500"
        >
          <i className={cx("fas", s.icon, "text-gold text-lg mb-2 block")} />
          <div className="font-display text-2xl font-bold text-white">
            {s.value}
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1">
            {s.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export const OurTeamSection = () => {
  const [activeDept, setActiveDept] = useState<Department | "all">("all");
  const [selected, setSelected] = useState<TeamMember | null>(null);

  const filtered = useMemo(
    () =>
      activeDept === "all"
        ? TEAM
        : TEAM.filter((m) => m.department === activeDept),
    [activeDept],
  );

  const handleSpotlight = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  }, []);

  return (
    <section
      id="our-team"
      aria-labelledby="our-team-heading"
      className="relative section-padding overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950"
    >
      <WorldTradeBackdrop />
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-[0.08] pointer-events-none" />

      <motion.div
        className="absolute -top-32 right-0 w-[480px] h-[480px] rounded-full bg-royal/[0.15] blur-[140px] pointer-events-none"
        animate={{ x: [0, -20, 0], y: [0, 14, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute -bottom-32 -left-24 w-[500px] h-[500px] rounded-full bg-gold/[0.06] blur-[140px] pointer-events-none"
        animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        aria-hidden
      />

      <FloatingParticles />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 lg:mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={cardVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-6"
          >
            <i className="fas fa-people-group text-gold text-xs" aria-hidden />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-semibold">
              Operational Excellence
            </span>
            <span className="h-3 w-px bg-white/15" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold/90 font-semibold">
              IICCI Staff
            </span>
          </motion.div>

          <motion.h2
            id="our-team-heading"
            variants={cardVariants}
            className="display-title font-display font-bold mb-5 leading-[1.02]"
          >
            <span className="text-white">Our</span>{" "}
            <span className="text-gradient-gold italic font-serif font-normal">
              Team
            </span>
          </motion.h2>

          <motion.p
            variants={cardVariants}
            className="text-base md:text-lg text-white/70 leading-relaxed font-serif italic"
          >
            &ldquo;The People Behind IICCI.&rdquo;
          </motion.p>
        </motion.div>

        <TeamStats
          memberCount={TEAM.length}
          departmentCount={DEPARTMENTS.length}
        />

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10 lg:mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          role="tablist"
          aria-label="Filter by department"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeDept === "all"}
            onClick={() => setActiveDept("all")}
            className={cx(
              "px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition duration-300",
              activeDept === "all"
                ? "bg-gold text-navy-950 shadow-gold"
                : "glass border border-white/10 text-white/70 hover:border-gold/35 hover:text-gold",
            )}
          >
            All Teams
          </button>
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              type="button"
              role="tab"
              aria-selected={activeDept === dept}
              onClick={() => setActiveDept(dept)}
              className={cx(
                "px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.16em] font-bold transition duration-300",
                activeDept === dept
                  ? "bg-gold text-navy-950 shadow-gold"
                  : "glass border border-white/10 text-white/70 hover:border-gold/35 hover:text-gold",
              )}
            >
              {dept}
            </button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          key={activeDept}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((member) => (
              <TeamCard
                key={member.id}
                member={member}
                onOpen={setSelected}
                onSpotlight={handleSpotlight}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-white/50 py-12">
            No team members in this department yet.
          </p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-14 lg:mt-16 flex flex-wrap items-center justify-center gap-4"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass border border-white/10">
            <i className="fas fa-briefcase text-gold" aria-hidden />
            <span className="text-sm text-white/80">
              Dedicated professionals across{" "}
              <span className="font-semibold text-white">6 departments</span>
            </span>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass border border-white/10">
            <i className="fas fa-heart text-gold" aria-hidden />
            <span className="text-sm text-white/80">
              Committed to member success &amp; seamless operations
            </span>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <TeamMemberModal member={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurTeamSection;
