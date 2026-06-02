"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

import {
  OPERATIONAL_TEAM,
  type OperationalTeamMember,
} from "@/config/operational-team";

type TeamMember = OperationalTeamMember & {
  email?: string;
  linkedin?: string;
};

const TK_PANDEY_ID = "tk-pandey";

const TEAM: ReadonlyArray<TeamMember> = OPERATIONAL_TEAM.map((member) => ({
  ...member,
  linkedin: "#",
}));

const DEPARTMENT_ICONS: Record<TeamMember["department"], string> = {
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
}: {
  member: TeamMember;
  onOpen: (member: TeamMember) => void;
}) {
  return (
    <motion.article
      layout
      variants={cardVariants}
      className="group relative reveal-up"
    >
      <div
        className={cx(
          "relative flex flex-col rounded-3xl overflow-hidden",
          "border border-white/10 bg-navy-950/50 backdrop-blur-xl shadow-premium",
          "transition-all duration-500",
          "hover:border-gold/40 hover:shadow-gold hover:-translate-y-1",
        )}
      >
        <div className="relative flex flex-col lg:flex-row">
          <div className="relative w-full lg:w-[44%] h-[260px] sm:h-[320px] lg:h-auto lg:min-h-[320px] overflow-hidden bg-navy-900 shrink-0">
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-[center_18%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 520px"
                priority={member.id === TK_PANDEY_ID}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950">
                <span className="font-display font-bold text-5xl text-gradient-gold">
                  {member.initials}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/40 via-navy-950/15 to-transparent pointer-events-none" />
            <div className="absolute top-3 right-3 z-[3] max-w-[85%]">
              <span className="inline-block px-2.5 py-1 rounded-lg bg-white/95 text-navy-950 border border-gold/30 text-[9px] font-bold leading-tight shadow-sm line-clamp-2">
                {member.designation}
              </span>
            </div>
          </div>

          <div className="relative flex flex-1 flex-col justify-center p-5 sm:p-6 lg:p-8 border-t border-white/8 lg:border-t-0 lg:border-l bg-navy-950/85 backdrop-blur-md">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug transition-colors duration-300 group-hover:text-gold">
                  {member.name}
                </h3>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/45 font-semibold">
                  Role &amp; designation
                </p>
                <p className="mt-0.5 text-sm font-semibold tracking-wide text-gold">
                  {member.designation}
                </p>
              </div>

              <div className="flex gap-1.5 shrink-0 pt-0.5">
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

            <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-white/60">
              {member.bio}
            </p>

            <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/40 transition-colors group-hover:text-gold/80">
              <span className="h-px w-8 bg-gold/50 transition-all duration-500 group-hover:w-12" />
              <i className={cx("fas", DEPARTMENT_ICONS[member.department], "text-[9px]")} />
              {member.department}
            </div>

            <button
              type="button"
              onClick={() => onOpen(member)}
              className="mt-5 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/40 hover:text-gold font-semibold transition"
            >
              <span className="h-px w-6 bg-gold/40 group-hover:w-10 transition-all duration-500" />
              View profile
            </button>
          </div>
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
  const [selected, setSelected] = useState<TeamMember | null>(null);

  const tkPandey = useMemo(
    () => TEAM.find((member) => member.id === TK_PANDEY_ID) ?? null,
    [],
  );

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

        {tkPandey ? (
          <motion.div
            layout
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
          >
            <TeamCard
              member={tkPandey}
              onOpen={setSelected}
            />
          </motion.div>
        ) : (
          <p className="text-center text-white/50 py-12">
            Team member not found.
          </p>
        )}
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
