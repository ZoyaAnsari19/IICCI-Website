export type ServicesNavItem = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  href: string;
};

export const SERVICES_NAV: ReadonlyArray<ServicesNavItem> = [
  {
    slug: "our-services",
    title: "Our Services",
    description: "15+ enterprise services for global trade",
    icon: "fa-briefcase",
    href: "/services",
  },
  {
    slug: "industry-verticals",
    title: "Industry Verticals",
    description: "35+ high-potential trade sectors",
    icon: "fa-layer-group",
    href: "/services/industryVerticals",
  },
] as const;

export const SERVICE_QUICK_LINKS = [
  { icon: "fa-globe", t: "Trade Facilitation" },
  { icon: "fa-ship", t: "Import Export" },
  { icon: "fa-certificate", t: "Global Certification" },
  { icon: "fa-briefcase", t: "Placement Program" },
  { icon: "fa-microchip", t: "AI & ML Services" },
  { icon: "fa-people-arrows", t: "Business Matchmaking" },
  { icon: "fa-handshake-angle", t: "Bilateral Trade" },
  { icon: "fa-chart-line", t: "Market Research" },
  { icon: "fa-link", t: "Joint Ventures" },
] as const;
