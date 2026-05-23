"use client";

import { useCallback, useId, useState, type ReactNode } from "react";
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
  label?: string;
  nodes: OrgNodeData[];
  layout?: "single" | "row" | "triple";
};

const ORG_TIERS: ReadonlyArray<OrgTier> = [
  {
    id: "tier-advisors",
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
    label: "Executive Leadership",
    layout: "row",
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const tierVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const nodeVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
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
        <radialGradient id={`org-map-glow-${uid}`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#1e40af" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`org-meridian-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(212,175,55,0)" />
          <stop offset="50%" stopColor="rgba(212,175,55,0.32)" />
          <stop offset="100%" stopColor="rgba(212,175,55,0)" />
        </linearGradient>
      </defs>
      <rect width="1600" height="800" fill={`url(#org-map-glow-${uid})`} />
      <g fill="none" stroke="rgba(212,175,55,0.18)" strokeWidth="0.8">
        <ellipse cx="800" cy="400" rx="700" ry="290" />
        <ellipse cx="800" cy="400" rx="540" ry="220" />
        <ellipse cx="800" cy="400" rx="380" ry="150" />
      </g>
      <g stroke={`url(#org-meridian-${uid})`} strokeWidth="1" fill="none">
        <line x1="400" y1="60" x2="400" y2="740" />
        <line x1="800" y1="60" x2="800" y2="740" />
        <line x1="1200" y1="60" x2="1200" y2="740" />
      </g>
      <g fill="rgba(212,175,55,0.3)">
        {[
          [400, 280],
          [800, 240],
          [1200, 300],
          [600, 420],
          [1000, 460],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" />
        ))}
      </g>
      <g stroke="rgba(212,175,55,0.22)" strokeWidth="1" fill="none">
        <path d="M 400 280 Q 600 180, 800 240" />
        <path d="M 800 240 Q 1000 200, 1200 300" />
        <path d="M 600 420 Q 800 360, 1000 460" />
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

function ConnectorStem({ height = 28 }: { height?: number }) {
  return (
    <div
      className="relative flex justify-center w-full shrink-0"
      style={{ height }}
      aria-hidden
    >
      <div className="w-px h-full bg-gradient-to-b from-gold/50 via-gold/25 to-gold/50" />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold"
        animate={{ top: ["0%", "100%", "0%"], opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

function MobileConnector() {
  return (
    <div className="flex justify-center py-1" aria-hidden>
      <div className="flex flex-col items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-gold/70" />
        <span className="w-px h-6 bg-gradient-to-b from-gold/50 to-gold/20" />
        <span className="w-1.5 h-1.5 rounded-full bg-gold/40" />
      </div>
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
        "group relative w-full text-left rounded-2xl border backdrop-blur-xl transition-all duration-500",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4",
        node.featured
          ? "p-6 md:p-7 border-gold/40 bg-gradient-to-br from-navy-900/90 via-navy-950/95 to-navy-950 shadow-gold max-w-md mx-auto"
          : compact
            ? "p-4 border-white/10 bg-navy-950/50 shadow-premium"
            : "p-5 md:p-6 border-white/10 bg-navy-950/55 shadow-premium max-w-sm mx-auto",
        isActive
          ? "border-gold/50 shadow-gold ring-1 ring-gold/25"
          : "hover:border-gold/35 hover:shadow-gold",
      )}
    >
      {node.pulse && (
        <motion.span
          className="absolute -inset-1 rounded-2xl border border-gold/30 pointer-events-none"
          animate={{
            opacity: [0.35, 0.75, 0.35],
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
      )}

      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.14),transparent_55%)]"
        aria-hidden
      />

      <div className="relative flex gap-4">
        <div
          className={cx(
            "shrink-0 rounded-xl flex items-center justify-center transition duration-500",
            node.featured
              ? "w-14 h-14 bg-gradient-to-br from-gold to-gold-600 text-navy-950 shadow-gold"
              : "w-11 h-11 bg-gold/10 border border-gold/25 text-gold group-hover:bg-gold group-hover:text-navy-950",
          )}
        >
          <i className={cx("fas", node.icon, node.featured ? "text-xl" : "text-base")} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cx(
                "font-display font-bold text-white leading-snug transition-colors group-hover:text-gold",
                node.featured ? "text-lg md:text-xl" : "text-sm md:text-base",
              )}
            >
              {node.title}
            </h3>
            <i
              className={cx(
                "fas fa-chevron-down text-[10px] text-gold/60 transition-transform duration-300 mt-1 shrink-0",
                isActive && "rotate-180",
              )}
              aria-hidden
            />
          </div>
          <p
            className={cx(
              "mt-1.5 text-white/60 leading-relaxed",
              compact ? "text-xs line-clamp-2" : "text-xs md:text-sm line-clamp-3",
            )}
          >
            {node.description}
          </p>
          <span className="mt-2 inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.22em] text-gold/70 font-semibold">
            <span className="h-px w-5 bg-gold/40 group-hover:w-8 transition-all duration-500" />
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
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden"
    >
      <div className="mt-3 rounded-xl glass-dark border border-gold/20 p-4 md:p-5 text-sm text-white/75 leading-relaxed">
        <div className="flex items-center gap-2 mb-2">
          <i className={cx("fas", node.icon, "text-gold text-sm")} />
          <span className="text-[10px] uppercase tracking-[0.28em] text-gold font-bold">
            Governance Detail
          </span>
        </div>
        {node.detail}
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
      <div className="absolute left-1/2 top-8 bottom-8 w-px -translate-x-1/2 bg-gradient-to-b from-gold/10 via-gold/25 to-gold/10 pointer-events-none" aria-hidden />

      <motion.div
        className="relative flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {ORG_TIERS.map((tier, tierIndex) => {
          const isTriple = tier.layout === "triple";
          const isRow = tier.layout === "row";

          return (
            <motion.div
              key={tier.id}
              variants={tierVariants}
              className="w-full flex flex-col items-center"
            >
              {tierIndex > 0 && <ConnectorStem height={isTriple ? 36 : 32} />}

              {tier.label && (
                <div className="mb-4 flex items-center gap-3 w-full max-w-4xl px-4">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-gold font-bold shrink-0">
                    {tier.label}
                  </span>
                  <span className="flex-1 h-px bg-gradient-to-r from-gold/40 to-transparent" />
                </div>
              )}

              {isTriple ? (
                <div className="relative w-full max-w-5xl">
                  <div
                    className="absolute top-0 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent pointer-events-none"
                    aria-hidden
                  />
                  <div className="grid grid-cols-3 gap-5 pt-6">
                    {tier.nodes.map((node) => (
                      <div key={node.id} className="flex flex-col">
                        <div className="flex justify-center mb-3" aria-hidden>
                          <span className="w-px h-5 bg-gradient-to-b from-gold/40 to-transparent" />
                        </div>
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
                <div
                  className={cx(
                    "w-full flex justify-center px-4",
                    isRow && "max-w-2xl",
                  )}
                >
                  {tier.nodes.map((node) => (
                    <div
                      key={node.id}
                      className={cx("w-full", isRow ? "max-w-lg" : "max-w-md")}
                    >
                      <OrgNodeCard
                        node={node}
                        isActive={activeId === node.id}
                        onSelect={onSelect}
                      />
                      <AnimatePresence>
                        {activeId === node.id && <OrgDetailPanel node={node} />}
                      </AnimatePresence>
                    </div>
                  ))}
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
            <div
              key={`label-${tier.id}`}
              className="flex items-center gap-3 py-2"
            >
              <span className="text-[10px] uppercase tracking-[0.28em] text-gold font-bold">
                {tier.label}
              </span>
              <span className="flex-1 h-px bg-gradient-to-r from-gold/40 to-transparent" />
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

function NetworkFlowLines() {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 hidden lg:block"
      viewBox="0 0 1200 1400"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id={`org-line-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(212,175,55,0.1)" />
          <stop offset="50%" stopColor="rgba(212,175,55,0.55)" />
          <stop offset="100%" stopColor="rgba(212,175,55,0.1)" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 600 80 L 600 1320"
        fill="none"
        stroke={`url(#org-line-${uid})`}
        strokeWidth="1.5"
        strokeDasharray="6 8"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M 280 980 L 600 920 L 920 980"
        fill="none"
        stroke="rgba(212,175,55,0.35)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
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
      className="relative section-padding overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950"
    >
      <WorldTradeBackdrop />
      <NetworkFlowLines />
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-[0.08] pointer-events-none" />

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
            variants={tierVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-6"
          >
            <i className="fas fa-sitemap text-gold text-xs" aria-hidden />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-semibold">
              Governance Framework
            </span>
            <span className="h-3 w-px bg-white/15" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold/90 font-semibold">
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
            className="text-base md:text-lg text-white/70 leading-relaxed font-serif italic"
          >
            &ldquo;A Clear Governance Framework Built for Global Trade
            Leadership.&rdquo;
          </motion.p>
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
              <div className="rounded-2xl glass border border-gold/25 p-6 md:p-8 shadow-premium">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
                    <i className={cx("fas", activeNode.icon)} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-gold font-bold">
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
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-14 lg:mt-16 flex flex-wrap items-center justify-center gap-4"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass border border-white/10">
            <i className="fas fa-diagram-project text-gold" aria-hidden />
            <span className="text-sm text-white/80">
              <span className="font-semibold text-white">10-tier</span> governance
              hierarchy
            </span>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass border border-white/10">
            <i className="fas fa-network-wired text-gold" aria-hidden />
            <span className="text-sm text-white/80">
              National leadership &amp; global chapter network
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrganizationalStructureSection;
