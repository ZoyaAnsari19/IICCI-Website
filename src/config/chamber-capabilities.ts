export type ChamberCapability = {
  id: string;
  icon: string;
  title: string;
  badge: string;
  description: string;
  href?: string;
  cta?: string;
};

export const chamberCapabilities: readonly ChamberCapability[] = [
  {
    id: "ecgc",
    icon: "fa-shield-halved",
    title: "Empanelled with ECGC",
    badge: "ECGC Empanelled",
    description:
      "IICCI is empanelled with the Export Credit Guarantee Corporation of India (ECGC), helping members access export credit insurance, buyer risk cover, and trade finance facilitation.",
  },
  {
    id: "certificate-of-origin",
    icon: "fa-stamp",
    title: "Certificate of Origin",
    badge: "Authorized Issuer",
    description:
      "IICCI can issue Certificates of Origin for importers and exporters — supporting compliant customs clearance and preferential treatment under applicable trade agreements.",
  },
  {
    id: "trade-events",
    icon: "fa-calendar-days",
    title: "Trade Events",
    badge: "Summits & Delegations",
    description:
      "Flagship summits, bilateral delegations, B2B matchmaking, and webinars that connect Indian importers and exporters with global markets and partners.",
    href: "/media/events",
    cta: "View Trade Events",
  },
] as const;
