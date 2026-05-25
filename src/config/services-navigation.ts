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
  {
    slug: "farmer-support",
    title: "Farmer Support",
    description: "Empowering farmers with global agri-trade",
    icon: "fa-tractor",
    href: "/services/farmerSupport",
  },
  {
    slug: "upcoming-projects",
    title: "Upcoming Projects",
    description: "Live trade & investment opportunities",
    icon: "fa-rocket",
    href: "/services/upcomingProjects",
  },
  {
    slug: "monthly-services",
    title: "Monthly Performance",
    description: "Transparent institutional analytics",
    icon: "fa-chart-pie",
    href: "/services/monthlyServices",
  },
  {
    slug: "global-certification",
    title: "Global Certification",
    description: "International trade credentials",
    icon: "fa-certificate",
    href: "/services/globalProgram",
  },
  {
    slug: "global-placement",
    title: "Global Placement",
    description: "Global career & hiring network",
    icon: "fa-briefcase",
    href: "/services/globalPlacement",
  },
  {
    slug: "bilateral-trade",
    title: "Bilateral Trade Tutorial",
    description: "Step-by-step cross-border trade learning",
    icon: "fa-globe",
    href: "/services/bilateralTrade",
  },
] as const;
