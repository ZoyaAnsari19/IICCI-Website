"use client";

import { useCallback, useState, type ReactNode } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

type OrgNodeData = {
  id: string;
  title: string;
  description: string;
  icon: string;
  detail: string;
  pulse?: boolean;
  featured?: boolean;
};

type OrgTier = {
  id: string;
  level: number;
  label?: string;
  nodes: OrgNodeData[];
  layout?: "single" | "row" | "triple";
};

const ORG_TIERS: ReadonlyArray<OrgTier> = [
  {
    id: "tier-advisors",
    level: 1,
    label: "Strategic Guidance",
    layout: "single",
    nodes: [
      {
        id: "advisors",
        title: "Board of Advisors & Mentors",
        description:
          "Senior statesmen, trade diplomats, and industry veterans providing institutional wisdom and global perspective.",
        icon: "fa-user-tie",
        detail:
          "The Advisory Board shapes long-term chamber policy, mentors leadership, and opens high-trust corridors with governments and multilateral institutions worldwide.",
      },
    ],
  },
  {
    id: "tier-president",
    level: 2,
    layout: "single",
    nodes: [
      {
        id: "president",
        title: "President",
        description:
          "Chief executive authority representing IICCI nationally and internationally with full strategic mandate.",
        icon: "fa-crown",
        detail:
          "The President chairs the Executive Committee, leads bilateral engagements, and serves as the principal voice of India's importing community on the global stage.",
        pulse: true,
        featured: true,
      },
    ],
  },
  {
    id: "tier-vp",
    level: 3,
    label: "Executive Leadership",
    layout: "single",
    nodes: [
      {
        id: "vp-domestic",
        title: "Vice Presidents",
        description:
          "Regional and functional vice presidents driving domestic outreach, policy, and member engagement.",
        icon: "fa-users",
        detail:
          "Vice Presidents oversee designated portfolios — trade policy, membership growth, sector development — and deputize for the President across key forums.",
      },
    ],
  },
  {
    id: "tier-sg",
    level: 4,
    layout: "single",
    nodes: [
      {
        id: "secretary-general",
        title: "Secretary General / Director General",
        description:
          "Chief administrative officer ensuring operational excellence, compliance, and institutional continuity.",
        icon: "fa-building-columns",
        detail:
          "The Secretary General manages day-to-day chamber administration, international correspondence, and coordination between councils, chapters, and support teams.",
      },
    ],
  },
  {
    id: "tier-council",
    level: 5,
    layout: "single",
    nodes: [
      {
        id: "governing-council",
        title: "Governing Council / Executive Committee",
        description:
          "Elected and appointed leaders governing policy, budgets, and strategic chamber initiatives.",
        icon: "fa-gavel",
        detail:
          "The Governing Council approves major trade missions, membership standards, and partnership frameworks while ensuring fiduciary and ethical governance.",
      },
    ],
  },
  {
    id: "tier-honorary",
    level: 6,
    layout: "single",
    nodes: [
      {
        id: "honorary-directors",
        title: "Honorary Directors",
        description:
          "Distinguished leaders lending credibility, networks, and ceremonial representation to IICCI.",
        icon: "fa-award",
        detail:
          "Honorary Directors strengthen the chamber's public standing through thought leadership, patronage of flagship programs, and ambassadorial presence at global forums.",
      },
    ],
  },
  {
    id: "tier-chapters",
    level: 7,
    label: "Global & Sector Operations",
    layout: "triple",
    nodes: [
      {
        id: "sector-heads",
        title: "Sector-Specific Cell Heads",
        description:
          "Leaders of vertical industry cells — agriculture, pharma, electronics, textiles, and more.",
        icon: "fa-industry",
        detail:
          "Sector Cell Heads curate trade intelligence, organize B2B matchmaking, and advocate sector-specific policy reforms with ministries and trade bodies.",
      },
      {
        id: "state-chairs",
        title: "State Chapter Chairpersons",
        description:
          "State-level leadership anchoring membership, events, and regional trade facilitation.",
        icon: "fa-map-location-dot",
        detail:
          "State Chapter Chairpersons mobilize local importers, host regional conclaves, and connect members to national and international chamber programs.",
      },
      {
        id: "intl-heads",
        title: "International Chapter Heads",
        description:
          "Overseas representatives building bilateral corridors and foreign-desk partnerships.",
        icon: "fa-earth-americas",
        detail:
          "International Chapter Heads maintain overseas offices, host inbound delegations, and secure investment and sourcing opportunities for Indian members abroad.",
      },
    ],
  },
  {
    id: "tier-support",
    level: 8,
    layout: "single",
    nodes: [
      {
        id: "support-teams",
        title: "Membership, Operations & Support Teams",
        description:
          "Dedicated professionals powering member services, finance, marketing, and field operations.",
        icon: "fa-people-group",
        detail:
          "Support teams deliver onboarding, billing, event logistics, digital communications, and front-office excellence — the operational backbone of IICCI.",
      },
    ],
  },
];

const FLOW_SUMMARY = [
  "Advisors",
  "President",
  "Vice Presidents",
  "Secretary General",
  "Governing Council",
  "Honorary Directors",
  "Chapters & Cells",
  "Support Teams",
] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

const tierVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const nodeVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function LightGridBackdrop() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.25]"
      aria-hidden
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }}
    />
  );
}

function ConnectorStem({ height = 32 }: { height?: number }) {
  return (
    <div
      className="relative flex justify-center w-full shrink-0"
      style={{ height }}
      aria-hidden
    >
      <div className="w-0.5 h-full rounded-full bg-gradient-to-b from-gold/70 via-navy-200 to-gold/70" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-white bg-gold shadow-sm" />
    </div>
  );
}

function MobileConnector() {
  return (
    <div className="flex justify-center py-1" aria-hidden>
      <div className="flex flex-col items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-gold border-2 border-white shadow-sm" />
        <span className="w-0.5 h-7 bg-gradient-to-b from-gold/80 to-navy-200" />
        <span className="w-2 h-2 rounded-full bg-navy-200 border-2 border-white" />
      </div>
    </div>
  );
}

function TierLabel({
  level,
  label,
}: {
  level: number;
  label: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3 w-full max-w-5xl mx-auto px-2">
      <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-gold text-[11px] font-bold font-mono shadow-sm border border-white/10">
        L{level}
      </span>
      <span className="text-[11px] uppercase tracking-[0.22em] text-white/80 font-bold shrink-0">
        {label}
      </span>
      <span className="flex-1 h-px bg-gradient-to-r from-gold/60 via-white/25 to-transparent" />
    </div>
  );
}

function OrgNodeCard({
  node,
  isActive,
  onSelect,
  compact,
}: {
  node: OrgNodeData;
  isActive: boolean;
  onSelect: (id: string) => void;
  compact?: boolean;
}) {
  return (
    <motion.button
      type="button"
      variants={nodeVariants}
      onClick={() => onSelect(node.id)}
      aria-expanded={isActive}
      aria-controls={isActive ? `org-detail-${node.id}` : undefined}
      className={cx(
        "group relative w-full text-left rounded-2xl border bg-white/5 backdrop-blur-md transition-all duration-300",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4",
        "shadow-[0_10px_38px_rgba(0,0,0,0.35)]",
        node.featured
          ? "p-6 md:p-7 border-gold/50 ring-2 ring-gold/15 max-w-lg mx-auto"
          : compact
            ? "p-4 border-white/10"
            : "p-5 md:p-6 border-white/10 max-w-md mx-auto",
        isActive
          ? "border-gold shadow-[0_14px_44px_rgba(212,175,55,0.18)] ring-2 ring-gold/20"
          : "hover:border-gold/40 hover:bg-white/8 hover:shadow-[0_14px_44px_rgba(0,0,0,0.45)]",
      )}
    >
      {node.pulse && (
        <motion.span
          className="absolute -inset-1 rounded-2xl border-2 border-gold/30 pointer-events-none"
          animate={{ opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
      )}

      <div className="relative flex gap-4">
        <div
          className={cx(
            "shrink-0 rounded-xl flex items-center justify-center transition duration-300",
            node.featured
              ? "w-14 h-14 bg-gradient-to-br from-gold to-gold-600 text-navy-950 shadow-gold"
              : "w-11 h-11 bg-gold/10 border border-gold/30 text-gold-700 group-hover:bg-gold group-hover:text-navy-950",
          )}
        >
          <i className={cx("fas", node.icon, node.featured ? "text-xl" : "text-base")} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cx(
                "font-display font-bold text-white leading-snug transition-colors group-hover:text-gold-200",
                node.featured ? "text-lg md:text-xl" : "text-sm md:text-base",
              )}
            >
              {node.title}
            </h3>
            <i
              className={cx(
                "fas fa-chevron-down text-[10px] text-gold/70 transition-transform duration-300 mt-1 shrink-0",
                isActive && "rotate-180",
              )}
              aria-hidden
            />
          </div>
          <p
            className={cx(
              "mt-1.5 text-white/70 leading-relaxed",
              compact ? "text-xs line-clamp-2" : "text-xs md:text-sm line-clamp-3",
            )}
          >
            {node.description}
          </p>
          <span className="mt-2.5 inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-gold/90 font-bold">
            <span className="h-px w-5 bg-gold/50 group-hover:w-8 transition-all duration-300" />
            {isActive ? "Hide detail" : "View detail"}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function OrgDetailPanel({ node }: { node: OrgNodeData }) {
  return (
    <motion.div
      id={`org-detail-${node.id}`}
      role="region"
      aria-label={`Details for ${node.title}`}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden"
    >
      <div className="mt-3 rounded-xl bg-white/5 border border-gold/25 p-4 md:p-5 text-sm text-white/75 leading-relaxed backdrop-blur-md">
        <div className="flex items-center gap-2 mb-2">
          <i className={cx("fas", node.icon, "text-gold text-sm")} />
          <span className="text-[10px] uppercase tracking-[0.24em] text-gold/90 font-bold">
            Governance Detail
          </span>
        </div>
        {node.detail}
      </div>
    </motion.div>
  );
}

function FlowSummaryStrip() {
  return (
    <motion.div
      variants={tierVariants}
      className="mb-12 lg:mb-14 overflow-x-auto no-scrollbar"
    >
      <div className="flex items-center justify-center gap-1 sm:gap-2 min-w-max mx-auto px-2">
        {FLOW_SUMMARY.map((step, i) => (
          <div key={step} className="flex items-center gap-1 sm:gap-2">
            <span className="px-2.5 sm:px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] sm:text-[10px] uppercase tracking-[0.12em] font-bold text-white/80 whitespace-nowrap shadow-sm backdrop-blur-md">
              {step}
            </span>
            {i < FLOW_SUMMARY.length - 1 && (
              <i
                className="fas fa-chevron-right text-[8px] text-gold/70 shrink-0"
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function DesktopOrgChart({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="hidden lg:block relative">
      {/* Central spine */}
      <div
        className="absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-navy-200 to-transparent pointer-events-none"
        aria-hidden
      />

      <motion.div
        className="relative flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {ORG_TIERS.map((tier, tierIndex) => {
          const isTriple = tier.layout === "triple";

          return (
            <motion.div
              key={tier.id}
              variants={tierVariants}
              className="w-full flex flex-col items-center"
            >
              {tierIndex > 0 && <ConnectorStem height={isTriple ? 40 : 36} />}

              {tier.label && (
                <TierLabel level={tier.level} label={tier.label} />
              )}

              {isTriple ? (
                <div className="relative w-full max-w-5xl px-4">
                  {/* Horizontal branch */}
                  <div
                    className="absolute top-3 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-gold/70 to-transparent pointer-events-none"
                    aria-hidden
                  />
                  <div className="grid grid-cols-3 gap-6 pt-8">
                    {tier.nodes.map((node) => (
                      <div key={node.id} className="relative flex flex-col">
                        <div
                          className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-gold/80 to-navy-200 pointer-events-none"
                          aria-hidden
                        />
                        <OrgNodeCard
                          node={node}
                          isActive={activeId === node.id}
                          onSelect={onSelect}
                          compact
                        />
                        <AnimatePresence>
                          {activeId === node.id && (
                            <OrgDetailPanel node={node} />
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-center px-4">
                  <div
                    className={cx(
                      "w-full",
                      tier.nodes[0]?.featured ? "max-w-lg" : "max-w-md",
                    )}
                  >
                    {!tier.label && (
                      <div className="flex justify-center mb-3" aria-hidden>
                        <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono font-bold text-white/60 border border-white/10">
                          L{tier.level}
                        </span>
                      </div>
                    )}
                    {tier.nodes.map((node) => (
                      <div key={node.id}>
                        <OrgNodeCard
                          node={node}
                          isActive={activeId === node.id}
                          onSelect={onSelect}
                        />
                        <AnimatePresence>
                          {activeId === node.id && (
                            <OrgDetailPanel node={node} />
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

function MobileOrgChart({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <motion.div
      className="lg:hidden flex flex-col"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {ORG_TIERS.flatMap((tier, tierIndex) => {
        const items: ReactNode[] = [];

        if (tierIndex > 0) {
          items.push(<MobileConnector key={`conn-${tier.id}`} />);
        }

        if (tier.label) {
          items.push(
            <TierLabel
              key={`label-${tier.id}`}
              level={tier.level}
              label={tier.label}
            />,
          );
        } else {
          items.push(
            <div key={`level-${tier.id}`} className="flex justify-center py-1">
              <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono font-bold text-white/60 border border-white/10">
                Level {tier.level}
              </span>
            </div>,
          );
        }

        tier.nodes.forEach((node) => {
          items.push(
            <motion.div key={node.id} variants={tierVariants} className="w-full">
              <OrgNodeCard
                node={node}
                isActive={activeId === node.id}
                onSelect={onSelect}
                compact={tier.layout === "triple"}
              />
              <AnimatePresence>
                {activeId === node.id && <OrgDetailPanel node={node} />}
              </AnimatePresence>
            </motion.div>,
          );
        });

        return items;
      })}
    </motion.div>
  );
}

export const OrganizationalStructureSection = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleSelect = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  const activeNode = ORG_TIERS.flatMap((t) => t.nodes).find(
    (n) => n.id === activeId,
  );

  return (
    <section
      id="organizational-structure"
      aria-labelledby="org-structure-heading"
      className="relative section-padding overflow-hidden bg-navy-950 text-white"
    >
      <LightGridBackdrop />

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/60 to-transparent pointer-events-none" />
      <div className="absolute -top-24 right-0 w-[400px] h-[400px] rounded-full bg-gold/[0.06] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-[360px] h-[360px] rounded-full bg-royal/[0.05] blur-[100px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 lg:mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={tierVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-gold/25 mb-6"
          >
            <i className="fas fa-sitemap text-gold-700 text-xs" aria-hidden />
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/80 font-semibold">
              Governance Framework
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-gold-700 font-bold">
              IICCI
            </span>
          </motion.div>

          <motion.h2
            id="org-structure-heading"
            variants={tierVariants}
            className="display-title font-display font-bold mb-5 leading-[1.02]"
          >
            <span className="text-white">Organizational</span>{" "}
            <span className="text-gradient-gold italic font-serif font-normal">
              Structure
            </span>
          </motion.h2>

          <motion.p
            variants={tierVariants}
            className="text-base md:text-lg text-white/70 leading-relaxed"
          >
            A clear, tiered governance hierarchy — from strategic advisors to
            global chapters and operational support teams.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <FlowSummaryStrip />
        </motion.div>

        <DesktopOrgChart activeId={activeId} onSelect={handleSelect} />
        <MobileOrgChart activeId={activeId} onSelect={handleSelect} />

        <AnimatePresence mode="wait">
          {activeNode && (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="hidden lg:block mt-10 max-w-3xl mx-auto"
            >
              <div className="rounded-2xl bg-white/5 border border-gold/30 p-6 md:p-8 shadow-[0_18px_55px_rgba(0,0,0,0.45)] backdrop-blur-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                    <i className={cx("fas", activeNode.icon)} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.24em] text-gold/90 font-bold">
                      Selected Role
                    </div>
                    <div className="font-display font-bold text-white text-lg">
                      {activeNode.title}
                    </div>
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed text-sm md:text-base">
                  {activeNode.detail}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-14 lg:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { icon: "fa-layer-group", label: "8 governance levels", sub: "Top to bottom hierarchy" },
            { icon: "fa-diagram-project", label: "3-branch operations", sub: "Sector, state & international" },
            { icon: "fa-network-wired", label: "50+ chapters", sub: "National & global network" },
            { icon: "fa-people-group", label: "Support teams", sub: "Member & field operations" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 shadow-[0_10px_32px_rgba(0,0,0,0.35)] backdrop-blur-md"
            >
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center text-gold shrink-0">
                <i className={cx("fas", stat.icon, "text-sm")} aria-hidden />
              </div>
              <div>
                <div className="text-sm font-bold text-white">{stat.label}</div>
                <div className="text-xs text-white/60 mt-0.5">{stat.sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OrganizationalStructureSection;
