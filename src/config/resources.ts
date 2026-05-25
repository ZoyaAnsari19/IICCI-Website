export type ResourceFileType = "pdf" | "doc" | "ppt" | "xls";

export type ResourceCategory =
  | "membership-forms"
  | "corporate-profiles"
  | "trade-guides"
  | "event-brochures"
  | "training-resources"
  | "certificates-mou"
  | "annual-reports";

export type ResourceItem = {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  categoryLabel: string;
  fileType: ResourceFileType;
  fileSize: string;
  /** CMS-managed secure download path */
  fileUrl: string;
  updatedAt: string;
  updatedAtISO: string;
  featured?: boolean;
  popular?: boolean;
  downloadCount?: number;
  tags: string[];
};

export const RESOURCE_CATEGORIES: ReadonlyArray<{
  id: ResourceCategory;
  label: string;
  icon: string;
}> = [
  { id: "membership-forms", label: "Membership Forms & Brochures", icon: "fa-file-signature" },
  { id: "corporate-profiles", label: "Corporate Profile PDFs", icon: "fa-building" },
  { id: "trade-guides", label: "Trade Guides & Compliance", icon: "fa-book-open" },
  { id: "event-brochures", label: "Event Brochures & Invitations", icon: "fa-calendar-days" },
  { id: "training-resources", label: "Training Program Resources", icon: "fa-graduation-cap" },
  { id: "certificates-mou", label: "Certificates & MOU Samples", icon: "fa-certificate" },
  { id: "annual-reports", label: "Annual Reports & Newsletters", icon: "fa-chart-pie" },
] as const;

const SEED_RESOURCES: ResourceItem[] = [
  {
    id: "membership-application-2026",
    title: "IICCI Membership Application Form 2026",
    description:
      "Official membership enrollment form for importers, exporters, and trade enterprises seeking IICCI affiliation.",
    category: "membership-forms",
    categoryLabel: "Membership Forms & Brochures",
    fileType: "pdf",
    fileSize: "1.2 MB",
    fileUrl: "/downloads/membership-application-2026.pdf",
    updatedAt: "May 20, 2026",
    updatedAtISO: "2026-05-20",
    featured: true,
    popular: true,
    downloadCount: 4820,
    tags: ["Membership", "Application", "2026"],
  },
  {
    id: "membership-brochure",
    title: "IICCI Membership Benefits Brochure",
    description:
      "Overview of tier benefits, global desk access, certification pathways, and bilateral trade facilitation services.",
    category: "membership-forms",
    categoryLabel: "Membership Forms & Brochures",
    fileType: "pdf",
    fileSize: "3.4 MB",
    fileUrl: "/downloads/membership-brochure.pdf",
    updatedAt: "Apr 15, 2026",
    updatedAtISO: "2026-04-15",
    popular: true,
    downloadCount: 3150,
    tags: ["Brochure", "Benefits"],
  },
  {
    id: "corporate-profile-en",
    title: "IICCI Corporate Profile — English Edition",
    description:
      "Institutional profile covering mission, global chapters, leadership, and flagship trade programs.",
    category: "corporate-profiles",
    categoryLabel: "Corporate Profile PDFs",
    fileType: "pdf",
    fileSize: "8.6 MB",
    fileUrl: "/downloads/corporate-profile-en.pdf",
    updatedAt: "May 10, 2026",
    updatedAtISO: "2026-05-10",
    featured: true,
    downloadCount: 2240,
    tags: ["Corporate", "Profile"],
  },
  {
    id: "corporate-profile-ar",
    title: "IICCI Corporate Profile — Arabic Edition",
    description: "GCC-focused corporate dossier for bilateral delegations and partner onboarding.",
    category: "corporate-profiles",
    categoryLabel: "Corporate Profile PDFs",
    fileType: "pdf",
    fileSize: "7.9 MB",
    fileUrl: "/downloads/corporate-profile-ar.pdf",
    updatedAt: "Mar 28, 2026",
    updatedAtISO: "2026-03-28",
    downloadCount: 890,
    tags: ["Corporate", "GCC"],
  },
  {
    id: "import-export-checklist",
    title: "Import–Export Compliance Checklist",
    description:
      "Step-by-step documentation, customs, and DGFT compliance checklist for first-time global traders.",
    category: "trade-guides",
    categoryLabel: "Trade Guides & Compliance",
    fileType: "pdf",
    fileSize: "2.1 MB",
    fileUrl: "/downloads/import-export-checklist.pdf",
    updatedAt: "May 18, 2026",
    updatedAtISO: "2026-05-18",
    popular: true,
    downloadCount: 5670,
    tags: ["Compliance", "DGFT", "Customs"],
  },
  {
    id: "fta-utilization-guide",
    title: "FTA Utilization & Rules of Origin Guide",
    description:
      "Practical guide for leveraging bilateral and multilateral FTAs across ASEAN, GCC, and EU corridors.",
    category: "trade-guides",
    categoryLabel: "Trade Guides & Compliance",
    fileType: "pdf",
    fileSize: "4.5 MB",
    fileUrl: "/downloads/fta-utilization-guide.pdf",
    updatedAt: "May 05, 2026",
    updatedAtISO: "2026-05-05",
    downloadCount: 1980,
    tags: ["FTA", "RoO", "Trade"],
  },
  {
    id: "gcc-summit-brochure",
    title: "India–GCC Trade Summit 2025 — Event Brochure",
    description:
      "Flagship summit agenda, delegate packages, exhibition floor plan, and registration details.",
    category: "event-brochures",
    categoryLabel: "Event Brochures & Invitations",
    fileType: "pdf",
    fileSize: "5.2 MB",
    fileUrl: "/downloads/gcc-summit-brochure.pdf",
    updatedAt: "Dec 01, 2025",
    updatedAtISO: "2025-12-01",
    popular: true,
    downloadCount: 2410,
    tags: ["Summit", "GCC", "Events"],
  },
  {
    id: "global-importers-invite",
    title: "Global Importers Conference — Invitation Kit",
    description: "VIP invitation templates, venue map, and speaker lineup for the New Delhi conference.",
    category: "event-brochures",
    categoryLabel: "Event Brochures & Invitations",
    fileType: "ppt",
    fileSize: "12.4 MB",
    fileUrl: "/downloads/global-importers-invite.pptx",
    updatedAt: "Jan 10, 2026",
    updatedAtISO: "2026-01-10",
    downloadCount: 760,
    tags: ["Conference", "Invitation"],
  },
  {
    id: "trade-finance-masterclass",
    title: "Trade Finance Masterclass — Course Pack",
    description:
      "Slides, case studies, and worksheets from the IICCI trade finance certification pathway.",
    category: "training-resources",
    categoryLabel: "Training Program Resources",
    fileType: "ppt",
    fileSize: "18.7 MB",
    fileUrl: "/downloads/trade-finance-masterclass.pptx",
    updatedAt: "May 12, 2026",
    updatedAtISO: "2026-05-12",
    downloadCount: 1340,
    tags: ["Training", "Finance"],
  },
  {
    id: "export-documentation-kit",
    title: "Export Documentation Training Kit",
    description: "Module handbook covering shipping bills, e-BRC, and export incentive documentation.",
    category: "training-resources",
    categoryLabel: "Training Program Resources",
    fileType: "doc",
    fileSize: "6.3 MB",
    fileUrl: "/downloads/export-documentation-kit.docx",
    updatedAt: "Apr 22, 2026",
    updatedAtISO: "2026-04-22",
    downloadCount: 980,
    tags: ["Training", "Exports"],
  },
  {
    id: "mou-sample-bilateral",
    title: "Bilateral MoU Sample Template",
    description:
      "Standardized memorandum of understanding template for chamber-to-chamber partnerships.",
    category: "certificates-mou",
    categoryLabel: "Certificates & MOU Samples",
    fileType: "doc",
    fileSize: "890 KB",
    fileUrl: "/downloads/mou-sample-bilateral.docx",
    updatedAt: "Feb 14, 2026",
    updatedAtISO: "2026-02-14",
    downloadCount: 1120,
    tags: ["MoU", "Template"],
  },
  {
    id: "certificate-trade-facilitator",
    title: "Trade Facilitator Certificate — Sample",
    description: "Sample layout for IICCI-recognized trade facilitator certification credentials.",
    category: "certificates-mou",
    categoryLabel: "Certificates & MOU Samples",
    fileType: "pdf",
    fileSize: "1.8 MB",
    fileUrl: "/downloads/certificate-trade-facilitator.pdf",
    updatedAt: "Mar 05, 2026",
    updatedAtISO: "2026-03-05",
    downloadCount: 640,
    tags: ["Certificate", "Sample"],
  },
  {
    id: "annual-report-2025",
    title: "IICCI Annual Report 2024–25",
    description:
      "Comprehensive annual report on trade outcomes, chapter growth, policy advocacy, and member impact.",
    category: "annual-reports",
    categoryLabel: "Annual Reports & Newsletters",
    fileType: "pdf",
    fileSize: "14.2 MB",
    fileUrl: "/downloads/annual-report-2025.pdf",
    updatedAt: "May 01, 2026",
    updatedAtISO: "2026-05-01",
    featured: true,
    popular: true,
    downloadCount: 3890,
    tags: ["Annual Report", "2025"],
  },
  {
    id: "trade-pulse-q1",
    title: "Trade Pulse Newsletter — Q1 2026",
    description: "Quarterly intelligence digest on policy shifts, market signals, and member spotlights.",
    category: "annual-reports",
    categoryLabel: "Annual Reports & Newsletters",
    fileType: "pdf",
    fileSize: "4.8 MB",
    fileUrl: "/downloads/trade-pulse-q1-2026.pdf",
    updatedAt: "Apr 30, 2026",
    updatedAtISO: "2026-04-30",
    downloadCount: 1560,
    tags: ["Newsletter", "Q1"],
  },
  {
    id: "sustainability-report",
    title: "CSR & Sustainability Impact Report",
    description: "SDG-aligned initiatives, community programs, and green trade corridor milestones.",
    category: "annual-reports",
    categoryLabel: "Annual Reports & Newsletters",
    fileType: "pdf",
    fileSize: "9.1 MB",
    fileUrl: "/downloads/sustainability-report-2025.pdf",
    updatedAt: "Mar 18, 2026",
    updatedAtISO: "2026-03-18",
    downloadCount: 720,
    tags: ["CSR", "Sustainability"],
  },
  {
    id: "market-entry-playbook",
    title: "India Market Entry Playbook",
    description:
      "Strategic playbook for foreign enterprises entering India — licensing, partnerships, and sector entry.",
    category: "trade-guides",
    categoryLabel: "Trade Guides & Compliance",
    fileType: "pdf",
    fileSize: "6.7 MB",
    fileUrl: "/downloads/market-entry-playbook.pdf",
    updatedAt: "May 15, 2026",
    updatedAtISO: "2026-05-15",
    downloadCount: 2780,
    tags: ["Market Entry", "India"],
  },
];

export type FetchResourcesParams = {
  category?: ResourceCategory | "all";
  search?: string;
  page?: number;
  pageSize?: number;
  sort?: "newest" | "popular";
};

export type FetchResourcesResult = {
  resources: ResourceItem[];
  featured: ResourceItem | null;
  recent: ResourceItem[];
  popular: ResourceItem[];
  total: number;
};

/** CMS/API stub — swap for headless CMS or secure asset API */
export async function fetchResources(
  params: FetchResourcesParams = {},
): Promise<FetchResourcesResult> {
  const {
    category = "all",
    search = "",
    page = 1,
    pageSize = 8,
    sort = "newest",
  } = params;

  let pool = [...SEED_RESOURCES];

  if (category !== "all") {
    pool = pool.filter((r) => r.category === category);
  }

  const q = search.trim().toLowerCase();
  if (q) {
    pool = pool.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)) ||
        r.categoryLabel.toLowerCase().includes(q),
    );
  }

  pool.sort((a, b) => {
    if (sort === "popular") {
      return (b.downloadCount ?? 0) - (a.downloadCount ?? 0);
    }
    return b.updatedAtISO.localeCompare(a.updatedAtISO);
  });

  const featured =
    pool.find((r) => r.featured) ?? (pool.length > 0 ? pool[0] : null);

  const gridPool = pool.filter((r) => r.id !== featured?.id);
  const start = (page - 1) * pageSize;
  const resources = gridPool.slice(start, start + pageSize);

  const recent = [...SEED_RESOURCES]
    .sort((a, b) => b.updatedAtISO.localeCompare(a.updatedAtISO))
    .slice(0, 4);

  const popular = [...SEED_RESOURCES]
    .filter((r) => r.popular)
    .sort((a, b) => (b.downloadCount ?? 0) - (a.downloadCount ?? 0))
    .slice(0, 5);

  return {
    resources,
    featured,
    recent,
    popular,
    total: gridPool.length,
  };
}

export const FILE_TYPE_META: Record<
  ResourceFileType,
  { label: string; icon: string; color: string }
> = {
  pdf: { label: "PDF", icon: "fa-file-pdf", color: "text-red-400" },
  doc: { label: "DOC", icon: "fa-file-word", color: "text-blue-400" },
  ppt: { label: "PPT", icon: "fa-file-powerpoint", color: "text-orange-400" },
  xls: { label: "XLS", icon: "fa-file-excel", color: "text-emerald-400" },
};
