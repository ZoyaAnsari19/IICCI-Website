"use client";

import Image from "next/image";
import {
  useCallback,
  useMemo,
  useState,
  type MouseEvent,
} from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

import {
  OPERATIONAL_TEAM,
  OPERATIONAL_TEAM_DEPARTMENTS,
  OPERATIONAL_TEAM_GOVERNANCE_NOTE,
  type OperationalTeamMember,
  type TeamDepartment,
} from "@/config/operational-team";

type Department = TeamDepartment;

type TeamMember = OperationalTeamMember & {
  email?: string;
  linkedin?: string;
};

const DEPARTMENTS = OPERATIONAL_TEAM_DEPARTMENTS;

const TEAM: ReadonlyArray<TeamMember> = OPERATIONAL_TEAM.map((member) => ({
  ...member,
  linkedin: "#",
}));

const DEPARTMENT_ICONS: Record<Department, string> = {
  Governance: "fa-landmark",
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

function TeamPortrait({ member }: { member: TeamMember }) {
  return (
    <div className="relative h-[280px] sm:h-[300px] lg:h-[320px] overflow-hidden bg-navy-900 shrink-0">
      {member.image ? (
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-[center_18%] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 360px"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <span className="font-display font-bold text-4xl sm:text-5xl text-gradient-gold">
            {member.initials}
          </span>
        </div>
      )}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[2] bg-[linear-gradient(105deg,transparent_40%,rgba(212,175,55,0.08)_50%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-3 right-3 z-[3] max-w-[85%]">
        <span className="inline-block px-2.5 py-1 rounded-lg bg-white/95 text-navy-950 border border-gold/30 text-[9px] font-bold leading-tight shadow-sm line-clamp-2">
          {member.designation}
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
      className="group relative reveal-up"
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

        <div className="relative flex flex-col p-4 sm:p-5 border-t border-white/8 bg-navy-950/85 backdrop-blur-md">
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

          <p className="text-sm font-semibold text-gold">{member.designation}</p>
          <p className="mt-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-white/50 font-semibold">
            <i
              className={cx(
                "fas",
                DEPARTMENT_ICONS[member.department],
                "text-gold/70 text-[9px]",
              )}
            />
            {member.department}
          </p>

          <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed line-clamp-2">
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
      className="relative section-padding overflow-hidden"
    >
      {/* Manifesto-style cinematic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-royal-dark to-navy-950" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gold/15 blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-royal/20 blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
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
              <span className="font-semibold text-white">{TEAM.length}</span> team members
              across governance &amp; operations
            </span>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass border border-white/10">
            <i className="fas fa-heart text-gold" aria-hidden />
            <span className="text-sm text-white/80">
              Committed to member success &amp; seamless operations
            </span>
          </div>
        </motion.div>

        <p className="mt-8 max-w-3xl mx-auto text-center text-sm text-white/50 leading-relaxed px-4">
          {OPERATIONAL_TEAM_GOVERNANCE_NOTE}
        </p>
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
