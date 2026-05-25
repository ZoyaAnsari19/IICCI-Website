export type CircularPriority = "urgent" | "high" | "standard";

export type CircularCategory =
  | "dgft-updates"
  | "customs-notifications"
  | "trade-policy-circulars"
  | "compliance-alerts"
  | "tariff-duty-updates"
  | "government-announcements"
  | "international-advisories";

export type TradeCircular = {
  id: string;
  title: string;
  summary: string;
  category: CircularCategory;
  categoryLabel: string;
  publishDate: string;
  publishDateISO: string;
  priority: CircularPriority;
  pdfUrl: string;
  pinned?: boolean;
  featured?: boolean;
  tags: string[];
};

export const CIRCULAR_CATEGORIES: ReadonlyArray<{
  id: CircularCategory;
  label: string;
  icon: string;
}> = [
  { id: "dgft-updates", label: "DGFT Updates", icon: "fa-file-lines" },
  { id: "customs-notifications", label: "Customs Notifications", icon: "fa-landmark" },
  { id: "trade-policy-circulars", label: "Trade Policy Circulars", icon: "fa-scroll" },
  { id: "compliance-alerts", label: "Compliance Alerts", icon: "fa-triangle-exclamation" },
  { id: "tariff-duty-updates", label: "Tariff & Duty Updates", icon: "fa-scale-balanced" },
  { id: "government-announcements", label: "Government Trade Announcements", icon: "fa-building-columns" },
  { id: "international-advisories", label: "International Trade Advisories", icon: "fa-globe" },
] as const;

export const PRIORITY_META: Record<
  CircularPriority,
  { label: string; className: string; pulse?: boolean }
> = {
  urgent: {
    label: "Urgent",
    className: "bg-red-500/20 border-red-400/40 text-red-300",
    pulse: true,
  },
  high: {
    label: "High Priority",
    className: "bg-gold/20 border-gold/40 text-gold",
  },
  standard: {
    label: "Standard",
    className: "bg-white/10 border-white/15 text-white/60",
  },
};

const TICKER_CIRCULARS = [
  "DGFT extends RoDTEP filing window for Q1 export shipments",
  "CBIC clarifies HS classification for dual-use electronics components",
  "India–UAE CEPA: revised tariff schedules under consultation",
  "New compliance alert: e-BRC integration mandatory from June 2026",
] as const;

export { TICKER_CIRCULARS };

const SEED_CIRCULARS: TradeCircular[] = [
  {
    id: "dgft-rodtep-q1",
    title: "DGFT Notification: RoDTEP claim filing window extended for Q1 shipments",
    summary:
      "Exporters receive additional timeline to reconcile shipping bills and submit remission claims under the latest trade notice.",
    category: "dgft-updates",
    categoryLabel: "DGFT Updates",
    publishDate: "May 24, 2026",
    publishDateISO: "2026-05-24",
    priority: "urgent",
    pdfUrl: "/downloads/circulars/dgft-rodtep-q1.pdf",
    pinned: true,
    featured: true,
    tags: ["RoDTEP", "DGFT", "Exports"],
  },
  {
    id: "customs-hs-electronics",
    title: "CBIC Circular: Revised HS mappings for electronics & pharma inputs",
    summary:
      "Customs classification update affects import duty structures for dual-use components across key industrial corridors.",
    category: "customs-notifications",
    categoryLabel: "Customs Notifications",
    publishDate: "May 23, 2026",
    publishDateISO: "2026-05-23",
    priority: "high",
    pdfUrl: "/downloads/circulars/customs-hs-electronics.pdf",
    featured: true,
    tags: ["HS Code", "CBIC", "Customs"],
  },
  {
    id: "ftp-review-2026",
    title: "Trade Policy Circular: Foreign Trade Policy review consultation open",
    summary:
      "Commerce ministry invites stakeholder inputs on FTP incentives aligned to priority export sectors and services trade.",
    category: "trade-policy-circulars",
    categoryLabel: "Trade Policy Circulars",
    publishDate: "May 22, 2026",
    publishDateISO: "2026-05-22",
    priority: "high",
    pdfUrl: "/downloads/circulars/ftp-review-2026.pdf",
    pinned: true,
    tags: ["FTP", "Policy", "Consultation"],
  },
  {
    id: "ebrc-compliance",
    title: "Compliance Alert: e-BRC integration mandatory for export realization",
    summary:
      "Members must complete digital bank linkage for outward remittance tracking effective 1 June 2026.",
    category: "compliance-alerts",
    categoryLabel: "Compliance Alerts",
    publishDate: "May 21, 2026",
    publishDateISO: "2026-05-21",
    priority: "urgent",
    pdfUrl: "/downloads/circulars/ebrc-compliance.pdf",
    tags: ["e-BRC", "Compliance", "Banking"],
  },
  {
    id: "steel-safeguard",
    title: "Tariff Update: Provisional safeguard duty review on select steel imports",
    summary:
      "Importers advised to monitor sunset review timelines and bonded warehousing options for inventory planning.",
    category: "tariff-duty-updates",
    categoryLabel: "Tariff & Duty Updates",
    publishDate: "May 20, 2026",
    publishDateISO: "2026-05-20",
    priority: "high",
    pdfUrl: "/downloads/circulars/steel-safeguard.pdf",
    tags: ["Steel", "Safeguard", "Duty"],
  },
  {
    id: "pli-disbursal",
    title: "Government Announcement: PLI tranche disbursal timeline for electronics PLI",
    summary:
      "MeitY guidance outlines eligibility checks and audit milestones for manufacturers scaling component localization.",
    category: "government-announcements",
    categoryLabel: "Government Trade Announcements",
    publishDate: "May 19, 2026",
    publishDateISO: "2026-05-19",
    priority: "standard",
    pdfUrl: "/downloads/circulars/pli-disbursal.pdf",
    tags: ["PLI", "Electronics", "MeitY"],
  },
  {
    id: "eu-tta-advisory",
    title: "International Advisory: India–EU services & GIs on negotiating table",
    summary:
      "Delegation briefings highlight mutual recognition frameworks and GI protections for premium export categories.",
    category: "international-advisories",
    categoryLabel: "International Trade Advisories",
    publishDate: "May 18, 2026",
    publishDateISO: "2026-05-18",
    priority: "standard",
    pdfUrl: "/downloads/circulars/eu-tta-advisory.pdf",
    tags: ["EU", "Bilateral", "Services"],
  },
  {
    id: "dgft-ebrc-enable",
    title: "DGFT Update: e-BRC portal integration enabled for faster export tracking",
    summary:
      "Digital linkage reduces reconciliation delays between banks, exporters, and trade regulators.",
    category: "dgft-updates",
    categoryLabel: "DGFT Updates",
    publishDate: "May 17, 2026",
    publishDateISO: "2026-05-17",
    priority: "standard",
    pdfUrl: "/downloads/circulars/dgft-ebrc-enable.pdf",
    tags: ["DGFT", "e-BRC", "Digital"],
  },
  {
    id: "customs-icegate",
    title: "Customs Notification: ICEGATE document upload format changes",
    summary:
      "Revised XML schema for shipping bill attachments effective from next customs cycle.",
    category: "customs-notifications",
    categoryLabel: "Customs Notifications",
    publishDate: "May 16, 2026",
    publishDateISO: "2026-05-16",
    priority: "high",
    pdfUrl: "/downloads/circulars/customs-icegate.pdf",
    tags: ["ICEGATE", "Customs", "Digital"],
  },
  {
    id: "asean-fta-roo",
    title: "Trade Circular: ASEAN FTA rules-of-origin compliance tools rollout",
    summary:
      "Certificate workflows and sector-specific concession maps published for consumer goods exporters.",
    category: "trade-policy-circulars",
    categoryLabel: "Trade Policy Circulars",
    publishDate: "May 15, 2026",
    publishDateISO: "2026-05-15",
    priority: "standard",
    pdfUrl: "/downloads/circulars/asean-fta-roo.pdf",
    tags: ["ASEAN", "FTA", "RoO"],
  },
  {
    id: "kyc-export",
    title: "Compliance Alert: Enhanced KYC norms for high-value export consignments",
    summary:
      "Additional documentation required for consignments exceeding prescribed FOB thresholds.",
    category: "compliance-alerts",
    categoryLabel: "Compliance Alerts",
    publishDate: "May 14, 2026",
    publishDateISO: "2026-05-14",
    priority: "high",
    pdfUrl: "/downloads/circulars/kyc-export.pdf",
    tags: ["KYC", "Compliance", "Exports"],
  },
  {
    id: "bcd-pharma",
    title: "Duty Update: BCD revision on select pharmaceutical API imports",
    summary:
      "Revised basic customs duty rates for listed APIs under pharma incentive framework.",
    category: "tariff-duty-updates",
    categoryLabel: "Tariff & Duty Updates",
    publishDate: "May 13, 2026",
    publishDateISO: "2026-05-13",
    priority: "standard",
    pdfUrl: "/downloads/circulars/bcd-pharma.pdf",
    tags: ["Pharma", "BCD", "API"],
  },
  {
    id: "apeda-coldchain",
    title: "Government Announcement: Cold-chain subsidies for perishable export corridors",
    summary:
      "APEDA circular supports air-freight slots and inspection fast-tracks for horticulture to GCC markets.",
    category: "government-announcements",
    categoryLabel: "Government Trade Announcements",
    publishDate: "May 12, 2026",
    publishDateISO: "2026-05-12",
    priority: "standard",
    pdfUrl: "/downloads/circulars/apeda-coldchain.pdf",
    tags: ["APEDA", "Agri", "GCC"],
  },
  {
    id: "gcc-shipping-advisory",
    title: "International Advisory: GCC shipping surcharge adjustments on Asia lanes",
    summary:
      "Freight forwarders report bunker-linked revisions; members advised to review Incoterms clauses.",
    category: "international-advisories",
    categoryLabel: "International Trade Advisories",
    publishDate: "May 11, 2026",
    publishDateISO: "2026-05-11",
    priority: "standard",
    pdfUrl: "/downloads/circulars/gcc-shipping-advisory.pdf",
    tags: ["GCC", "Shipping", "Freight"],
  },
];

export type FetchCircularsParams = {
  category?: CircularCategory | "all";
  search?: string;
  page?: number;
  pageSize?: number;
  sort?: "newest" | "priority";
};

export type FetchCircularsResult = {
  circulars: TradeCircular[];
  featured: TradeCircular | null;
  pinned: TradeCircular[];
  urgent: TradeCircular[];
  total: number;
};

/** CMS/API stub — swap for headless CMS or regulatory feed API */
export async function fetchTradeCirculars(
  params: FetchCircularsParams = {},
): Promise<FetchCircularsResult> {
  const {
    category = "all",
    search = "",
    page = 1,
    pageSize = 8,
    sort = "newest",
  } = params;

  let pool = [...SEED_CIRCULARS];

  if (category !== "all") {
    pool = pool.filter((c) => c.category === category);
  }

  const q = search.trim().toLowerCase();
  if (q) {
    pool = pool.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.categoryLabel.toLowerCase().includes(q),
    );
  }

  const priorityOrder: Record<CircularPriority, number> = {
    urgent: 0,
    high: 1,
    standard: 2,
  };

  pool.sort((a, b) => {
    if (sort === "priority") {
      const p = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (p !== 0) return p;
    }
    return b.publishDateISO.localeCompare(a.publishDateISO);
  });

  const featured =
    pool.find((c) => c.featured) ?? (pool.length > 0 ? pool[0] : null);

  const pinned = pool.filter((c) => c.pinned && c.id !== featured?.id);
  const gridPool = pool.filter(
    (c) => c.id !== featured?.id && !c.pinned,
  );

  const start = (page - 1) * pageSize;
  const circulars = gridPool.slice(start, start + pageSize);

  const urgent = [...SEED_CIRCULARS]
    .filter((c) => c.priority === "urgent")
    .sort((a, b) => b.publishDateISO.localeCompare(a.publishDateISO))
    .slice(0, 4);

  return {
    circulars,
    featured,
    pinned,
    urgent,
    total: gridPool.length,
  };
}
